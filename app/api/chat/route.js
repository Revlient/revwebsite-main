import { botReply } from "../../lib/chatbot";
import { extractLead, saveLead } from "../../lib/leads";
import { CONTACT_EMAIL } from "../../lib/site";

const GROQ_API_BASE = process.env.GROQ_API_HOST || "https://api.groq.com/openai/v1";
const GROQ_API_URLS = [`${GROQ_API_BASE}/chat/completions`];
const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const LEAD_COLLECTION_COMPLETE_MARKER = "[[LEAD_COLLECTION_COMPLETE]]";
const LEAD_COLLECTION_COMPLETE_TEXT = "Lead Data Collection phase is complete.";

const SYSTEM_PROMPT = `You are Revlient's website assistant — the voice of a premium creative + engineering studio. You are concise, warm, sharp, and conversion-focused. Your job is to turn curious visitors into qualified leads who book a 30-minute consultation.

ABOUT REVLIENT
- We craft websites, web & mobile apps, and ERP / CRM systems, plus AI automations.
- We work with founders and operators in education, healthcare, construction, retail / e-commerce, and interior design.
- The 30-min Cal.com consultation lives at /contact. The CTA to push everywhere is "Book a 30-min call".

CONVERSATION FLOW
1) WARM WELCOME
   - If the visitor says "hi" / "hello" / generic open, respond with a brief welcome and present the four service options as a sentence: "Are you here about a website, an app, an ERP / CRM, or AI automations?"
   - Never list more than 4 options.

2) QUALIFY IN 2–3 EXCHANGES — choose questions that match the service:
   - Websites: new build or redesign? Goal (sell / qualify / showcase)? Launch window?
   - Apps: web, mobile or both? Greenfield or upgrade? Users at launch?
   - ERP / CRM: which team uses it (sales / ops / finance / hr)? Seat count? Integrations (Tally, Zoho, Stripe, HubSpot)?
   - AI automations: is it an in-product feature or a back-office workflow? What's the painful manual step?
   - Always ask: industry, rough budget range, decision timeline.
   - Ask AT MOST TWO questions per reply. Be conversational, not interrogative.

3) NUDGE TO BOOK
   - After 2–3 exchanges, OR when the visitor signals intent ("start", "hire", "ready", "let's go", "quote", "begin", "kick off"), recommend booking the 30-min call at /contact. Make it the primary CTA.
   - For pricing questions, give honest scope-based ranges (focused marketing site ~3–5 weeks; MVP app 6–10 weeks; ERP / CRM 8–14 weeks) and steer to the consultation for a real number.

4) LEAD DATA COLLECTION (only when the visitor explicitly wants the team to reach out by email instead of booking)
   - Say clearly that the Lead Data Collection phase is starting.
   - Ask in ONE compact request: Name and Email are required; also ask Phone, Company, Project, Budget, Message. Tell them they may write "skip" for optional fields.
   - Use this exact template so the details parse correctly:
Name:
Email:
Phone:
Company:
Project:
Budget:
Message:
   - Finish collection in ≤2 visitor replies. Never ask for fields one at a time.
   - When Name and Email are in, close the phase. Confirm the team will follow up, include the exact sentence "${LEAD_COLLECTION_COMPLETE_TEXT}", then on its own line append ${LEAD_COLLECTION_COMPLETE_MARKER}. Only once. Never mention the marker.

RULES
- Replies stay short (1–3 sentences). One idea per message.
- Never invent client names, prices, testimonials, or internal details.
- Never list our services as a long bulleted dump — keep it conversational.
- If they want a human channel beyond the Cal embed, point to email ${CONTACT_EMAIL || "Connect@revlient.com"}.
- Default close every reply with a soft nudge toward the 30-min call when it fits.`;

const hasCompletedLeadCollection = (messages) =>
  messages.some(
    (message) =>
      message.role === "assistant" &&
      typeof message.content === "string" &&
      message.content.includes(LEAD_COLLECTION_COMPLETE_TEXT)
  );

const stripLeadCollectionMarker = (text) =>
  text.replace(LEAD_COLLECTION_COMPLETE_MARKER, "").trim();

const formatConversation = (messages) => {
  const lines = [`${SYSTEM_PROMPT}`, `Conversation:`];
  for (const message of messages) {
    const role = message.role === "assistant" ? "Assistant" : "User";
    lines.push(`${role}: ${message.content}`);
  }
  lines.push(`Assistant:`);
  return lines.join("\n");
};

const parseGroqResponse = (data) => {
  if (!data) return "";

  if (typeof data.output === "string") {
    return data.output.trim();
  }

  if (Array.isArray(data.output)) {
    const out = data.output
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") return JSON.stringify(item);
        return "";
      })
      .join(" ")
      .trim();
    if (out) return out;
  }

  if (typeof data.output_text === "string") {
    return data.output_text.trim();
  }

  if (Array.isArray(data.choices) && data.choices[0]) {
    const choice = data.choices[0];
    if (typeof choice.text === "string") return choice.text.trim();
    if (choice.message?.content) return String(choice.message.content).trim();
  }

  return "";
};

const getLastUserMessage = (prompt) => {
  if (!prompt) return "";
  const matches = Array.from(prompt.matchAll(/^User:\s*(.*)$/gim)).map((m) => m[1].trim());
  return matches.length ? matches[matches.length - 1] : "";
};

const tryGroqApi = async (url, payload) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`Groq request failed (${res.status}): ${body}`);
  }

  return JSON.parse(body);
};

const buildChatPayload = (messages) => ({
  model: MODEL,
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ],
  temperature: 0.2,
  top_p: 0.95,
  max_completion_tokens: 256,
  n: 1,
});

const buildPayloadForUrl = (url, messages) => {
  return buildChatPayload(messages);
};

export async function POST(request) {
  const apiKey = process.env.GROQ_API_KEY;

  let payload;
  let messages;
  let sessionId = null;
  try {
    const body = await request.json();
    messages = Array.isArray(body.messages) ? body.messages : [];
    sessionId = typeof body.sessionId === "string" ? body.sessionId : null;
    if (!messages.length) {
      return new Response(JSON.stringify({ error: "Missing messages" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Extract before answering, but submit only when the assistant explicitly
  // closes the Lead Data Collection phase below.
  const lead = extractLead(messages);

  if (!apiKey) {
    const lastUser = getLastUserMessage(formatConversation(messages));
    const fallback = botReply(lastUser);
    return new Response(JSON.stringify({ text: fallback.text, source: "fallback", lead }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  let lastError = null;
  for (const url of GROQ_API_URLS) {
    try {
      const endpointPayload = buildPayloadForUrl(url, messages);
      const data = await tryGroqApi(url, endpointPayload);
      let text = parseGroqResponse(data);
      if (!text && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
        text = String(data.choices[0].message.content).trim();
      }
      if (!text) {
        throw new Error("Empty response from Groq API");
      }
      const completedNow = text.includes(LEAD_COLLECTION_COMPLETE_MARKER);
      if (completedNow && !hasCompletedLeadCollection(messages)) {
        try {
          await saveLead(lead, { sessionId, source: "chat" });
        } catch (captureError) {
          console.error("[lead] ERP submission failed", captureError);
        }
      }
      text = stripLeadCollectionMarker(text);
      return new Response(JSON.stringify({ text, source: "groq", host: url, lead }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      lastError = error;
    }
  }

  const lastUser = getLastUserMessage(payload?.prompt);
  const fallback = botReply(lastUser || "");
  return new Response(
    JSON.stringify({
      text: fallback.text,
      actions: fallback.actions,
      source: "fallback",
      error: lastError?.message || "Groq request failed",
      lead,
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}
