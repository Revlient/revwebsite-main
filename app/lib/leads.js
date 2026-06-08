// Lead capture for the website assistant.
//
// The assistant funnels each visitor through a short data-collection phase.
// This module turns that conversation into a structured ERP lead.
//
// Extraction is DETERMINISTIC (regex + light heuristics) on purpose —
// we never rely on the LLM to emit clean JSON, so capture works the same
// whether Groq answers or the local fallback does.
//
// `saveLead` is the single server-side integration point for the ERP.

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const EMAIL_RE_G = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
const EMPTY_FIELD_RE = /^(?:n\/?a|none|no|skip|not applicable|not sure|-+)$/i;

// Ways people introduce themselves. Each captures up to three words after
// the lead-in; we sanitize the capture afterwards.
const NAME_PATTERNS = [
  /\bmy name(?:'s| is)?\s+([a-z][a-z'’.\- ]{1,40})/i,
  /\bthis is\s+([a-z][a-z'’.\- ]{1,40})/i,
  /\bcall me\s+([a-z][a-z'’.\- ]{1,40})/i,
  /\bi am\s+([a-z][a-z'’.\- ]{1,40})/i,
  /\bi'?m\s+([a-z][a-z'’.\- ]{1,40})/i,
  /\bname\s*[:\-]\s*([a-z][a-z'’.\- ]{1,40})/i,
];

// First word disqualifies a "name" — these are how a sentence usually
// starts, not how a person is called.
const NON_NAME = new Set([
  "interested", "looking", "trying", "not", "just", "here", "good", "fine",
  "ok", "okay", "sorry", "still", "really", "very", "yes", "no", "sure",
  "hi", "hello", "hey", "thanks", "thank", "maybe", "idk", "nothing", "none",
  "skip",
  "yeah", "yep", "nope", "hmm", "well", "actually", "please", "wondering",
  "planning", "building", "working", "hoping", "asking", "reaching", "from",
  "about", "the", "a", "an", "we", "our", "your",
]);

// Connector words that end a name (e.g. "Sarah from Acme" -> "Sarah").
const NAME_STOP = new Set([
  "from", "at", "and", "with", "here", "the", "of", "in", "on", "for",
  "to", "please", "thanks", "thank", "im", "a", "an",
]);

const titleCase = (s) =>
  s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

const sanitizeName = (raw) => {
  const tokens = String(raw)
    .trim()
    .replace(/[.,!?]+$/, "")
    .split(/\s+/);
  const out = [];
  for (const token of tokens) {
    const clean = token.replace(/[^a-zA-Z'’.\-]/g, "");
    const low = clean.toLowerCase();
    if (!clean) break;
    if (out.length && NAME_STOP.has(low)) break; // cut at a connector
    out.push(clean);
    if (out.length >= 3) break;
  }
  return out.join(" ");
};

const isLikelyName = (name) => {
  if (!name) return false;
  const first = name.split(/\s+/)[0]?.toLowerCase();
  if (!first || first.length < 2) return false;
  if (NON_NAME.has(first)) return false;
  return /^[a-z][a-z'’.\-]+$/i.test(name.split(/\s+/)[0]);
};

const askedForName = (content = "") =>
  /\byour name\b|who am i (?:speaking|chatting) (?:with|to)|may i (?:have|get|ask) your name|what'?s your name|can i (?:have|get) your name|who'?s this/i.test(
    content
  );

// A short reply that is plausibly just a name (the turn right after the
// assistant asked for it).
const looksLikeBareName = (text = "") => {
  const trimmed = text.trim();
  if (!trimmed || /[@\d]/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  if (words.length < 1 || words.length > 3) return false;
  if (!/^[a-z][a-z'’.\- ]*$/i.test(trimmed)) return false;
  return !NON_NAME.has(words[0].toLowerCase());
};

const extractPhone = (text) => {
  // Drop emails first so their digits/dots don't masquerade as a number.
  const cleaned = String(text).replace(EMAIL_RE_G, " ");
  const candidates = cleaned.match(/\+?\d[\d\s().\-]{5,}\d/g) || [];
  for (const candidate of candidates) {
    const digits = candidate.replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15) {
      return candidate.trim().replace(/\s+/g, " ");
    }
  }
  return null;
};

const matchLabeledField = (text, labels) => {
  const escaped = labels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return String(text).match(
    new RegExp(`(?:^|\\n)\\s*(?:${escaped.join("|")})\\s*[:=-]\\s*(.+)\\s*$`, "im")
  );
};

const extractLabeledField = (text, labels) => {
  const match = matchLabeledField(text, labels);
  const value = match?.[1]?.trim();
  return value && !EMPTY_FIELD_RE.test(value) ? value : null;
};

// Walk the conversation and pull out lead details shared so far. Later turns
// override earlier ones, so corrections win. The labeled fields match the
// compact template requested during the Lead Data Collection phase.
// `messages` is the [{ role, content }] array sent to the chat API.
export function extractLead(messages = []) {
  let name = null;
  let email = null;
  let phone = null;
  let company = null;
  let project = null;
  let message = null;
  let budget = null;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (!msg || msg.role !== "user" || typeof msg.content !== "string") continue;
    const text = msg.content;

    const emailMatch = text.match(EMAIL_RE);
    if (emailMatch) email = emailMatch[0].toLowerCase();

    const labeledPhone = matchLabeledField(text, ["phone", "phone number", "mobile"]);
    const foundPhone = labeledPhone
      ? extractPhone(labeledPhone[1])
      : extractPhone(text);
    if (foundPhone) phone = foundPhone;

    company = extractLabeledField(text, ["company", "organization"]) || company;
    project = extractLabeledField(text, ["project", "project type"]) || project;
    message = extractLabeledField(text, ["message", "brief", "project brief"]) || message;
    budget = extractLabeledField(text, ["budget", "budget range"]) || budget;

    // 1) Explicit "my name is …" style.
    let candidate = null;
    for (const re of NAME_PATTERNS) {
      const m = text.match(re);
      if (m) {
        const sane = sanitizeName(m[1]);
        if (isLikelyName(sane)) {
          candidate = sane;
          break;
        }
      }
    }
    // 2) Otherwise: assistant just asked for the name and this is a short
    //    bare reply.
    if (!candidate) {
      const prev = messages[i - 1];
      if (prev && prev.role === "assistant" && askedForName(prev.content) && looksLikeBareName(text)) {
        candidate = sanitizeName(text);
      }
    }
    if (candidate) name = titleCase(candidate);
  }

  return { name, email, phone, company, project, message, budget };
}

export const hasContact = (lead) => Boolean(lead && (lead.email || lead.phone));
export const isLeadComplete = (lead) =>
  Boolean(lead && lead.name && lead.email && lead.phone);

// Send leads from server-side code only so the ERP secret is never exposed
// to the browser.
const LEADS_ENDPOINT =
  process.env.LEADS_INBOUND_URL || "https://erp.revlient.com/api/leads/inbound";

export async function saveLead(lead, meta = {}) {
  if (!lead?.name || !lead?.email) return null;

  const secret = process.env.LEADS_INBOUND_SECRET;
  if (!secret) {
    throw new Error("Missing LEADS_INBOUND_SECRET");
  }

  const record = {
    name: lead.name,
    email: lead.email,
    ...(lead.phone ? { phone: lead.phone } : {}),
    ...(lead.company ? { company: lead.company } : {}),
    ...(lead.project ? { project: lead.project } : {}),
    ...(lead.message ? { message: lead.message } : {}),
    ...(lead.budget ? { budget: lead.budget } : {}),
  };

  const response = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-lead-secret": secret,
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Lead ERP request failed (${response.status}): ${body}`);
  }

  let resData = {};
  try {
    resData = await response.json();
  } catch (err) {
    // Ignore JSON parse error if ERP doesn't return JSON
  }

  console.log("[lead] sent to ERP", { sessionId: meta.sessionId || null, resData });
  return { ...record, ...resData };
}
