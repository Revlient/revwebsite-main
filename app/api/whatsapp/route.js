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

const SYSTEM_PROMPT = `You're a real person texting on WhatsApp for Revlient, helping students who want to study abroad.
Reply like a human texting — short, warm, casual. Use contractions. Usually 1-2 sentences, often just one line.
No corporate tone, no bullet points, no essays. Get to the point, then ask one quick question to keep the chat going.
A light emoji here and there is fine, don't overdo it. For exact fees/deadlines/visa rules, say you'll connect them with a counsellor.`;

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
        max_tokens: 120,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userText },
        ],
      }),
    });
    const data = await res.json();
    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      "Hey! How can I help with your study abroad plans?"
    );
  } catch (e) {
    console.error("Groq error:", e);
    return "Hey! How can I help with your study abroad plans?";
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
