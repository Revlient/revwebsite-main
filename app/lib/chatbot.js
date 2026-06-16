// Conversion-focused chat logic. Powers the rule-based fallback when
// the Groq API is unavailable, and seeds quick-reply chips that funnel
// visitors into a clear service path. Keep replies short, qualify the
// visitor in 1–2 exchanges, then route them to /contact (Cal embed).
import { CTA_HREF, CONTACT_EMAIL } from "./site";

export const GREETING =
  "Hi — welcome to Revlient. We craft websites, apps and ERP / CRM systems for founders and operators. What can I point you to today?";

// Service-oriented chips. These match the home-page capability grid so
// the visitor selects the path they actually want, not a generic CTA.
export const QUICK_REPLIES = [
  "Build a website",
  "Build a web / mobile app",
  "ERP or CRM system",
  "AI automations",
  "Pricing & timeline",
  "Talk to a human",
];

const BOOK_CTA = { label: "Book a 30-min call", href: CTA_HREF };
const EMAIL_CTA = {
  label: `Email ${CONTACT_EMAIL}`,
  href: `mailto:${CONTACT_EMAIL}`,
};

export function botReply(input) {
  const q = (input || "").toLowerCase().trim();

  // --- Greeting -----------------------------------------------------
  if (!q || /^(hi|hello|hey|yo|hola|good\s*(morning|afternoon|evening))/.test(q)) {
    return {
      text:
        "Hi — welcome to Revlient. We craft websites, apps and ERP / CRM systems for founders and operators. What brings you here today? Pick one below or tell me about your project.",
      actions: [
        { label: "Build a website", href: "?service=website" },
        { label: "Build an app", href: "?service=app" },
        { label: "ERP or CRM", href: "?service=erp" },
        { label: "AI automations", href: "?service=ai" },
        BOOK_CTA,
      ],
    };
  }

  // --- Website ------------------------------------------------------
  if (/(website|web\s*site|landing|redesign|marketing\s*site|webflow|next\.?js)/.test(q)) {
    return {
      text:
        "Got it — a website project. To give you a useful answer in one call, I'd love to know: (1) is this a new build or a redesign? (2) what does the site need to do — sell, qualify leads, showcase work, all three? (3) what's your launch window?",
      actions: [BOOK_CTA, { label: "See our work", href: "/work" }],
    };
  }

  // --- App ---------------------------------------------------------
  if (/(app|mobile|ios|android|react.?native|flutter|saas|product)/.test(q)) {
    return {
      text:
        "Apps are our home turf. A few quick reads: (1) web app, mobile app, or both? (2) is this a fresh build or an upgrade to something existing? (3) roughly how many users at launch — internal team, hundreds, thousands?",
      actions: [BOOK_CTA, { label: "App services", href: "/services" }],
    };
  }

  // --- ERP / CRM ---------------------------------------------------
  if (/(erp|crm|operations|ops|workflow|backend\s*system|admin\s*panel|dashboard|internal\s*tool)/.test(q)) {
    return {
      text:
        "Most of our ERP / CRM builds replace a stack of spreadsheets + tabs. Quick questions: (1) which team uses it day-to-day — sales, ops, finance, HR, multiple? (2) how many seats? (3) any tools it must talk to (e.g. Tally, Zoho, HubSpot, Stripe)?",
      actions: [BOOK_CTA, { label: "Revlient Systems", href: "https://systems.revlient.com" }],
    };
  }

  // --- AI / Automation ---------------------------------------------
  if (/(ai|automat|gpt|llm|chatbot|agent|workflow\s*automation|n8n|zapier)/.test(q)) {
    return {
      text:
        "Two flavours: (1) ship an AI feature inside your product (chat, search, summarisation), or (2) automate a back-office workflow (lead routing, document parsing, ops). Which is closer? And what's the painful manual step right now?",
      actions: [BOOK_CTA],
    };
  }

  // --- Pricing / Timeline -----------------------------------------
  if (/(price|pricing|cost|budget|quote|timeline|how\s*long|estimate|how\s*much)/.test(q)) {
    return {
      text:
        "Honest answer: pricing depends on scope, integrations and timeline. Typical engagements: a focused marketing site (~3–5 weeks), an MVP app (6–10 weeks), an ERP / CRM (8–14 weeks). Share what you're building and I'll come back with a real number.",
      actions: [BOOK_CTA, EMAIL_CTA],
    };
  }

  // --- Work / Case studies ----------------------------------------
  if (/(work|portfolio|case|example|previous|past\s*project|projects you|clients)/.test(q)) {
    return {
      text:
        "We've shipped for builders across education, healthcare, construction, retail, and interior design. The Work section has the case studies — want me to pull up something close to your industry?",
      actions: [{ label: "See our work", href: "/work" }, BOOK_CTA],
    };
  }

  // --- Industry / sector ------------------------------------------
  if (/(industry|sector|education|edtech|healthcare|construction|retail|ecommerce|interior|fintech)/.test(q)) {
    return {
      text:
        "Good — industry context shapes the build. Quick: are you serving B2C, B2B, or both? And what's the single biggest operational friction you'd like the new system to remove?",
      actions: [BOOK_CTA],
    };
  }

  // --- Human / contact channels -----------------------------------
  if (/(human|person|talk|speak|sales|founder|whatsapp|call|email|contact)/.test(q)) {
    return {
      text:
        "Easiest: book a 30-minute call — you pick the slot, we walk through your project together. Or drop us an email.",
      actions: [BOOK_CTA, EMAIL_CTA],
    };
  }

  // --- Start / proceed --------------------------------------------
  if (/(start|begin|kick\s*off|engage|hire|proceed|ready|let'?s\s*go|sign\s*up|onboard)/.test(q)) {
    return {
      text:
        "Brilliant. The fastest path is a 30-min consult — we'll scope the project together, you'll leave with a clear next step. Shall I open the calendar?",
      actions: [BOOK_CTA],
    };
  }

  // --- Lead-capture handoff ---------------------------------------
  if (/(my name is|i\s*am|i'm|email|phone|reach me|@)/.test(q)) {
    return {
      text:
        "Got it — thanks. Easiest next step is to pick a slot on the calendar so we can walk through your project properly. Otherwise the team will reply by email shortly.",
      actions: [BOOK_CTA, EMAIL_CTA],
    };
  }

  // --- Default qualifier ------------------------------------------
  return {
    text:
      "Tell me a bit more — what are you building, who is it for, and what's the timeline? With that I can point you to the right service and a real ballpark.",
    actions: [BOOK_CTA, EMAIL_CTA],
  };
}
