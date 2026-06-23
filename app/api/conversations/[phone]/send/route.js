// Admin → customer message send. Posts to WhatsApp Cloud API, appends
// to the conversation history, and auto-pauses the bot so it doesn't
// reply on top of the admin's message.
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

async function sendWhatsApp(to, text) {
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messaging_product: "whatsapp", to, text: { body: text } }),
    }
  );
  return res;
}

async function loadMessages(phone) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/wa_conversations?phone=eq.${encodeURIComponent(phone)}&select=messages`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  const rows = await res.json();
  return rows?.[0]?.messages || [];
}

export async function POST(request, { params }) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);
  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    return json({ error: "WhatsApp not configured" }, 500);
  }

  const { phone } = await params;
  if (!phone) return json({ error: "Missing phone" }, 400);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const text = String(body?.text || "").trim();
  if (!text) return json({ error: "text is required" }, 400);

  try {
    const waRes = await sendWhatsApp(phone, text);
    if (!waRes.ok) {
      const detail = await waRes.text().catch(() => "");
      return json({ error: "WhatsApp send failed", status: waRes.status, detail }, 502);
    }

    const existing = await loadMessages(phone);
    // role: "assistant" so it lines up with the bot's bubble style — the
    // customer doesn't see any distinction either way.
    const newMessages = [...existing, { role: "assistant", content: text, by: "admin" }].slice(-50);

    const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/wa_conversations`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        phone,
        messages: newMessages,
        bot_paused: true,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!upsertRes.ok) {
      const detail = await upsertRes.text().catch(() => "");
      return json({ error: "Persist failed", detail }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ error: "Send failed", detail: String(err?.message || err) }, 500);
  }
}
