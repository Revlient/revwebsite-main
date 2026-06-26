// Internal dashboard endpoint — returns all WhatsApp conversations
// from the wa_conversations Supabase table. Service-role access is
// gated on a shared password header so the key never reaches the
// browser. Mark the route dynamic so it isn't statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

export async function GET(request) {
  const key = request.headers.get("x-dashboard-key");

  if (!DASHBOARD_PASSWORD || key !== DASHBOARD_PASSWORD) {
    return json({ error: "Unauthorized" }, 401);
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json({ error: "Server is not configured" }, 500);
  }

  const url =
    `${SUPABASE_URL}/rest/v1/wa_conversations` +
    `?select=phone,messages,updated_at,bot_paused` +
    `&order=updated_at.desc`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return json(
        { error: "Supabase request failed", status: res.status, detail: text },
        502
      );
    }

    const rows = await res.json();
    return json({ conversations: Array.isArray(rows) ? rows : [] });
  } catch (err) {
    return json({ error: "Fetch failed", detail: String(err?.message || err) }, 500);
  }
}
