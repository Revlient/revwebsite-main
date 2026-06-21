import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SYSTEM_PROMPT = `You're a friendly, knowledgeable Revlient assistant on WhatsApp, helping students who want to study abroad.
Answer every question helpfully — budget, tuition, living costs, part-time work, placements, visas, intakes, courses, everything.
Always give a useful ballpark estimate or range. Never refuse or say you can't — these are rough figures that naturally vary, so an approximate answer is exactly what's wanted. Make clear they're estimates with words like "roughly", "around", or "typically".
Reply like a human texting — short, warm, casual, 1-2 sentences. Use contractions; the odd emoji is fine. Use the conversation so far for context — don't re-ask things they already told you.
Only mention a counsellor for precise, personalised planning — as a bonus, never as a reason to dodge the question.`;
export async function GET(req) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Verification failed", { status: 403 });
}

// --- Voice note: download from Meta + transcribe with Groq Whisper ---
async function transcribeAudio(mediaId) {
  try {
    // 1. Get the media URL from Meta
    const metaRes = await fetch(`https://graph.facebook.com/v21.0/${mediaId}`, {
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
    });
    const meta = await metaRes.json();
    if (!meta?.url) {
      console.log("⚠️ MEDIA URL MISSING:", JSON.stringify(meta));
      return "";
    }
    // 2. Download the audio bytes (this URL needs the same auth header)
    const audioRes = await fetch(meta.url, {
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
    });
    const audioBlob = await audioRes.blob();
    // 3. Transcribe with Groq
    const form = new FormData();
    form.append("file", audioBlob, "voice.ogg");
    form.append("model", "whisper-large-v3-turbo");
    const trRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: form,
    });
    const tr = await trRes.json();
    if (!tr?.text) console.log("⚠️ TRANSCRIBE NON-SUCCESS:", trRes.status, JSON.stringify(tr));
    return tr?.text?.trim() || "";
  } catch (e) {
    console.error("transcribe error:", e);
    return "";
  }
}

async function loadHistory(phone) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/wa_conversations?phone=eq.${phone}&select=messages`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const rows = await res.json();
    return rows?.[0]?.messages || [];
  } catch (e) {
    console.error("loadHistory error:", e);
    return [];
  }
}

async function saveHistory(phone, messages) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/wa_conversations`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({ phone, messages, updated_at: new Date().toISOString() }),
    });
  } catch (e) {
    console.error("saveHistory error:", e);
  }
}

async function getAIReply(history) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        max_tokens: 120,
        temperature: 0.7,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
      }),
    });
    const data = await res.json();
    if (!data?.choices?.[0]) {
      console.log("⚠️ GROQ NON-SUCCESS:", res.status, JSON.stringify(data));
    }
    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I dropped that — can you say it again?"
    );
  } catch (e) {
    console.error("Groq error:", e);
    return "Sorry, I dropped that — can you say it again?";
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

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  console.log("🔥 WEBHOOK RECEIVED:", JSON.stringify(body, null, 2));

  try {
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    // Get text from either a typed message or a voice note
    let userText = null;
    if (message?.type === "text") {
      userText = message.text.body;
    } else if (message?.type === "audio") {
      userText = await transcribeAudio(message.audio.id);
    }

    if (message && userText) {
      const phone = message.from;

      const history = await loadHistory(phone);
      history.push({ role: "user", content: userText });

      const recent = history.slice(-10);
      const reply = await getAIReply(recent);

      recent.push({ role: "assistant", content: reply });
      await saveHistory(phone, recent.slice(-10));

      await sendWhatsApp(phone, reply);
    }
  } catch (err) {
    console.error("Handler error:", err);
  }

  return NextResponse.json({ ok: true });
}
