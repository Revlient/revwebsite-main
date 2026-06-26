// Per-conversation actions for the dashboard:
//   PATCH /api/conversations/[phone]     → toggle bot_paused
//   POST  /api/conversations/[phone]/send → send a message as admin
//
// Both are password-gated. Service-role key stays server-side. The
// admin send flow auto-pauses the bot for that lead so the next
// inbound message doesn't trigger an Aleena reply on top of the
// admin's message.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function checkAuth(req) {
  const key = req.headers.get("x-dashboard-key");
  return Boolean(DASHBOARD_PASSWORD) && key === DASHBOARD_PASSWORD;
}

async function loadOne(phone) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/wa_conversations?phone=eq.${encodeURIComponent(phone)}` +
      `&select=phone,messages,bot_paused,updated_at`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] || null : null;
}

async function upsertConversation(payload) {
  return fetch(`${SUPABASE_URL}/rest/v1/wa_conversations`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(payload),
  });
}

export async function PATCH(request, { params }) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  const { phone } = await params;
  if (!phone) return json({ error: "Missing phone" }, 400);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  if (typeof body?.bot_paused !== "boolean") {
    return json({ error: "bot_paused (boolean) required" }, 400);
  }

  try {
    const existing = await loadOne(phone);
    const messages = existing?.messages || [];
    const res = await upsertConversation({
      phone,
      messages,
      bot_paused: body.bot_paused,
      updated_at: new Date().toISOString(),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return json({ error: "Update failed", detail }, 502);
    }
    return json({ ok: true, bot_paused: body.bot_paused });
  } catch (err) {
    return json({ error: "Update failed", detail: String(err?.message || err) }, 500);
  }
}
