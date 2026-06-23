// SSE endpoint — streams wa_conversations updates to the dashboard.
// Polls Supabase every 2 s and pushes a "data:" event when the
// payload changes. Service-role key stays server-side; the browser
// authenticates via ?key= query param (EventSource can't send headers).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
const POLL_MS = 2000;

async function fetchRows() {
  const url =
    `${SUPABASE_URL}/rest/v1/wa_conversations` +
    `?select=phone,messages,updated_at` +
    `&order=updated_at.desc`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!DASHBOARD_PASSWORD || key !== DASHBOARD_PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response("Server not configured", { status: 500 });
  }

  let closed = false;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let lastJson = null;

      const send = (data) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {}
      };

      // Heartbeat comment every 20 s keeps the connection alive through proxies
      const heartbeat = setInterval(() => {
        if (closed) return;
        try { controller.enqueue(encoder.encode(": heartbeat\n\n")); } catch {}
      }, 20_000);

      while (!closed) {
        try {
          const rows = await fetchRows();
          const json = JSON.stringify(rows);
          if (json !== lastJson) {
            lastJson = json;
            send({ conversations: Array.isArray(rows) ? rows : [] });
          }
        } catch (err) {
          send({ error: String(err?.message || err) });
        }
        await new Promise((r) => setTimeout(r, POLL_MS));
      }

      clearInterval(heartbeat);
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
