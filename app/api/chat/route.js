import { botReply } from "../../lib/chatbot";
import { extractLead, saveLead } from "../../lib/leads";

const GROQ_API_BASE = process.env.GROQ_API_HOST || "https://api.groq.com/openai/v1";
const GROQ_API_URLS = [`${GROQ_API_BASE}/chat/completions`];
const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const LEAD_COLLECTION_COMPLETE_MARKER = "[[LEAD_COLLECTION_COMPLETE]]";
const LEAD_COLLECTION_COMPLETE_TEXT = "Lead Data Collection phase is complete.";

const SYSTEM_PROMPT = `You are Revlient's website assistant — the voice of a premium digital studio: concise, warm, and professional.

You have two jobs, in this order:
1) Genuinely help. Answer questions about our services, work, pricing approach and timelines honestly and briefly. Never invent client names, prices, or internal details.
2) When a visitor wants to discuss, quote, or start a project, run a short phase named exactly "Lead Data Collection".

Lead Data Collection rules:
- Clearly say that the Lead Data Collection phase is starting.
- Collect the details in ONE compact request whenever possible: Name and Email are required. Also ask for Phone, Company, Project, Budget, and Message / short brief. Tell the visitor they may write "skip" for optional fields.
- Ask the visitor to reply using exactly this compact template so their details are recorded accurately:
Name:
Email:
Phone:
Company:
Project:
Budget:
Message:
- If required or useful details are still missing, ask ONE concise follow-up listing all remaining fields together. Finish collection within 1–2 visitor replies. Never ask for fields one by one.
- When Name and Email are available and the visitor has answered the collection request, close the phase. Briefly confirm that the team will follow up, include the exact sentence "${LEAD_COLLECTION_COMPLETE_TEXT}", and append ${LEAD_COLLECTION_COMPLETE_MARKER} on its own line.
- Never append ${LEAD_COLLECTION_COMPLETE_MARKER} before the phase is over. Append it only once. Do not mention the marker.

Keep replies short (1–3 sentences). Be human, never pushy.`;

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
