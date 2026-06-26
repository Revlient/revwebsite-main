// Smart follow-up cron — Vercel runs this hourly (see vercel.json).
//
// Strategy (cost-aware):
// - For each lead where last_inbound_at is 22-24h ago AND no follow-up
//   has been sent yet AND the admin has NOT taken over, send ONE
//   personalised follow-up using Aleena (LLM) with the full chat
//   history as context.
// - 22h window is intentional: still inside Meta's 24h free service
//   window, so the follow-up costs ₹0. After 24h would require a
//   pre-approved marketing template.
// - The follow-up can include property photos via the same
//   [SEND_PHOTOS:id] marker the main bot uses.
//
// Authorization: Vercel cron sends `Authorization: Bearer <CRON_SECRET>`.
// We also accept the dashboard password for manual runs from the
// dashboard.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
const CRON_SECRET = process.env.CRON_SECRET;

const WINDOW_MIN_HOURS = 22;
const WINDOW_MAX_HOURS = 24;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function authorized(request) {
  const auth = request.headers.get("authorization");
  if (CRON_SECRET && auth === `Bearer ${CRON_SECRET}`) return true;
  const key = request.headers.get("x-dashboard-key");
  if (DASHBOARD_PASSWORD && key === DASHBOARD_PASSWORD) return true;
  return false;
}

async function loadPrograms() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/programs?status=eq.available&select=id,title,type,country,university,location,tuition_fees,intake_months,ielts_required,duration,description`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return { listText: "No programs currently listed.", byId: new Map() };
    }
    const byId = new Map();
    const listText = rows
      .map((p, i) => {
        byId.set(p.id, p);
        return (
          `${i + 1}. [id:${p.id}] ${p.title}${p.university ? ' at ' + p.university : ''} — ${p.type} in ${p.location}. Fees: ${p.tuition_fees}.${p.duration ? ' Duration: ' + p.duration + '.' : ''}${p.ielts_required ? ' IELTS: ' + p.ielts_required + '.' : ''} ${p.description || ''}`
        );
      })
      .join("\n");
    return { listText, byId };
  } catch {
    return { listText: "Program list unavailable.", byId: new Map() };
  }
}

async function loadProgramImages(programId) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/program_images?program_id=eq.${encodeURIComponent(programId)}` +
        `&select=url,display_order&order=display_order.asc&limit=3`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const rows = await res.json();
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => r.url).filter(Boolean).slice(0, 3);
  } catch {
    return [];
  }
}

function buildFollowupPrompt(propertyList) {
  return `You're Aleena, a warm property consultant for Revlient Realty. This is a FOLLOW-UP message — the customer chatted with you ~22 hours ago and hasn't replied since. Send a single short, warm, non-pushy nudge that references the last thing they were discussing.

RULES:
- 1-2 short sentences. Friendly, not desperate. Light emoji OK.
- Reference the specific property or topic from the chat below. Don't repeat their last message verbatim.
- End with a gentle question or a soft CTA (site visit, more details, photos).
- If a specific property fits, end with a marker on its own line: [SEND_PHOTOS:{id}] where {id} is the property id from the listings below. Only one marker, only if showing photos makes sense.
- NEVER mention "follow-up", "I'm checking in", "just wanted to say". Sound natural.
- Only use these listings; never invent properties or prices.

AVAILABLE PROPERTIES:
${propertyList}`;
}

async function getAIReply(history, systemPrompt) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        max_tokens: 220,
        temperature: 0.65,
        reasoning_effort: "low",
        include_reasoning: false,
        messages: [{ role: "system", content: systemPrompt }, ...history],
      }),
    });
    const data = await res.json();
    return data?.choices?.[0]?.message?.content?.trim() || "";
  } catch {
    return "";
  }
}

async function sendWhatsApp(to, text) {
  await fetch(
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
}

async function sendWhatsAppImage(to, imageUrl, caption) {
  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "image",
    image: { link: imageUrl },
  };
  if (caption) payload.image.caption = caption;
  await fetch(
    `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
}

function extractPhotoMarkers(text) {
  const ids = [];
  const re = /\[SEND_PHOTOS:(\d+)\]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > 0 && !ids.includes(n)) ids.push(n);
  }
  const cleanText = text.replace(re, "").replace(/\n{3,}/g, "\n\n").trim();
  return { cleanText, ids };
}

async function pickEligibleLeads() {
  const now = Date.now();
  const minIso = new Date(now - WINDOW_MAX_HOURS * 3600_000).toISOString();
  const maxIso = new Date(now - WINDOW_MIN_HOURS * 3600_000).toISOString();

  const url =
    `${SUPABASE_URL}/rest/v1/wa_conversations` +
    `?select=phone,messages,last_inbound_at,followup_stage,bot_paused` +
    `&bot_paused=eq.false` +
    `&followup_stage=eq.0` +
    `&last_inbound_at=gte.${encodeURIComponent(minIso)}` +
    `&last_inbound_at=lt.${encodeURIComponent(maxIso)}`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
}

async function markFollowupSent(phone, messages, stage) {
  const now = new Date().toISOString();
  await fetch(`${SUPABASE_URL}/rest/v1/wa_conversations`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      phone,
      messages,
      followup_stage: stage,
      last_followup_at: now,
      updated_at: now,
    }),
  });
}

export async function GET(request) {
  if (!authorized(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  const leads = await pickEligibleLeads();
  if (leads.length === 0) return json({ ok: true, sent: 0 });

  const { listText, byId } = await loadPrograms();
  const prompt = buildFollowupPrompt(listText);

  let sent = 0;
  const results = [];

  for (const lead of leads) {
    try {
      const history = Array.isArray(lead.messages) ? lead.messages.slice(-10) : [];
      // Nudge the LLM with an explicit user-shaped cue so it knows to follow up.
      const cueHistory = [
        ...history,
        { role: "user", content: "[SYSTEM_CUE] The lead has gone quiet for ~22h. Write a single short, warm follow-up message now." },
      ];

      const reply = await getAIReply(cueHistory, prompt);
      if (!reply) { results.push({ phone: lead.phone, status: "empty_reply" }); continue; }

      const { cleanText, ids } = extractPhotoMarkers(reply);

      // Photos first
      for (const id of ids) {
        const program = byId.get(id);
        const urls = await loadProgramImages(id);
        if (urls.length === 0) continue;
        const caption = program
          ? `${program.title}${program.tuition_fees ? ` — ${program.tuition_fees}` : ""}`
          : "";
        for (let i = 0; i < urls.length; i++) {
          await sendWhatsAppImage(lead.phone, urls[i], i === 0 ? caption : "");
        }
      }

      const textToSend = cleanText || reply;
      await sendWhatsApp(lead.phone, textToSend);

      const newMessages = [
        ...history,
        { role: "assistant", content: textToSend, by: "followup" },
      ].slice(-50);
      await markFollowupSent(lead.phone, newMessages, 1);

      sent += 1;
      results.push({ phone: lead.phone, status: "sent" });
    } catch (err) {
      results.push({ phone: lead.phone, status: "error", detail: String(err?.message || err) });
    }
  }

  return json({ ok: true, sent, total: leads.length, results });
}
