import { NextResponse } from "next/server";

export async function GET(req) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Verification failed", { status: 403 });
}

const SYSTEM_PROMPT = `You are Revlient's friendly WhatsApp assistant helping students explore studying abroad.
Be warm, concise, and helpful — keep replies to 2-4 sentences, WhatsApp-style.
Answer questions about destinations, courses, costs, intakes, and visas at a high level.
Never invent exact fees, deadlines, or visa rules — keep guidance general and offer to connect them with a Revlient counsellor for specifics.`;

async function getAIReply(userText) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        max_tokens: 300,
        temperature: 0.6,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userText },
        ],
      }),
    });
    const data = await res.json();
    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      "Thanks for reaching out to Revlient! How can I help you today?"
    );
  } catch (e) {
    console.error("Groq error:", e);
    return "Thanks for reaching out to Revlient! How can I help you today?";
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
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        text: { body: text },
      }),
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
    if (message && message.type === "text") {
      const reply = await getAIReply(message.text.body);
      await sendWhatsApp(message.from, reply);
    }
  } catch (err) {
    console.error("Handler error:", err);
  }

  return NextResponse.json({ ok: true });
}
