import { botReply } from "../../lib/chatbot";
import { extractLead, saveLead } from "../../lib/leads";

const GROQ_API_BASE = process.env.GROQ_API_HOST || "https://api.groq.com/openai/v1";
const GROQ_API_URLS = [`${GROQ_API_BASE}/chat/completions`];
const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

const SYSTEM_PROMPT = `You are Revlient's website assistant — the voice of a premium digital studio: concise, warm, and professional.

You have two jobs, in this order:
1) Genuinely help. Answer questions about our services, work, pricing approach and timelines honestly and briefly. Never invent client names, prices, or internal details.
2) Qualify and capture the lead. As the conversation develops, naturally collect the visitor's contact details so the team can follow up — in this order: their NAME, then EMAIL, then PHONE number.

How to capture details, naturally:
- Lead with value: answer their question before asking for anything.
- Ask for ONE detail at a time, in context — never present a form. For example, after helping: "Happy to put together a tailored proposal — who am I speaking with?", then "Great, [name] — what's the best email to send it to?", then "And a phone number in case the team wants to talk it through?".
- If they volunteer a detail unprompted, acknowledge it and move to the next missing one.
- Never re-ask for something they already gave. If they decline, respect it and keep helping.
- Once you have name, email and phone, briefly confirm them back and tell them the team will follow up with a tailored proposal — then stop asking.

Keep replies short (1–3 sentences). Be human, never pushy.`;

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

  // Capture the lead from the conversation BEFORE answering, so a contact
  // detail is never lost even if the model call later fails. We only save
  // when this turn introduced something new (save-on-change), which keeps
  // the DB upserting one evolving row per conversation.
  let lead = { name: null, email: null, phone: null };
  try {
    lead = extractLead(messages);
    const prior = extractLead(messages.slice(0, -1)); // before this user turn
    const newInfo =
      (lead.name && lead.name !== prior.name) ||
      (lead.email && lead.email !== prior.email) ||
      (lead.phone && lead.phone !== prior.phone);
    if (newInfo) {
      await saveLead(lead, { sessionId, source: "chat" });
    }
  } catch (captureError) {
    console.error("[lead] capture failed", captureError);
  }

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
