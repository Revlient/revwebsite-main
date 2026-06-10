// Shared rule-based chat bot logic, used by the floating ContactWidget
// and by the prompt-box section's inline chat. Self-contained: keyword
// matching with canned answers that route to the real channels —
// honest assistant, not an LLM.
import {
  CTA_HREF,
  WHATSAPP_URL,
  PHONE_TEL,
  PHONE_DISPLAY,
  CONTACT_EMAIL,
} from "./site";

export const GREETING =
  "Hi — I'm the Revlient assistant. What can I point you to?";

export const QUICK_REPLIES = [
  "Free consultation",
  "What do you do?",
  "Pricing & timeline",
  "Talk to a human",
];

export function botReply(input) {
  const q = input.toLowerCase();
  if (/(price|pricing|cost|budget|quote|timeline|how long)/.test(q)) {
    return {
      text: "Every project is scoped to its goals, so we don't list flat prices. Share a short brief and we'll come back with a clear estimate and timeline.",
      actions: [{ label: "Free consultation", href: CTA_HREF }],
    };
  }
  if (/(human|person|call|whatsapp|talk|contact|speak|sales)/.test(q)) {
    return {
      text: "Happy to connect you with the team directly:",
      actions: [
        { label: "WhatsApp us", href: WHATSAPP_URL, external: true },
        { label: `Call ${PHONE_DISPLAY}`, href: `tel:${PHONE_TEL}` },
        { label: `Email ${CONTACT_EMAIL}`, href: `mailto:${CONTACT_EMAIL}` },
      ],
    };
  }
  if (/(what|do you|service|offer|build|design|app|website|3d)/.test(q)) {
    return {
      text: "Revlient is a creative studio: 3D-grade websites and web/app development, plus CRM and automation through our systems division. The Services section has the detail.",
      actions: [
        { label: "See services", href: "#services" },
        { label: "See our work", href: "#work" },
      ],
    };
  }
  if (/(work|portfolio|case|example|project you)/.test(q)) {
    return {
      text: "There are three short case studies (problem → built → result) in the Work section.",
      actions: [{ label: "Jump to Work", href: "#work" }],
    };
  }
  if (/(start|project|hire|engage|brief|begin|quote me)/.test(q)) {
    return {
      text: "Great — tell us the goal, budget range and a short brief and we'll take it from there.",
      actions: [
        { label: "Free consultation", href: CTA_HREF },
        { label: "WhatsApp us", href: WHATSAPP_URL, external: true },
      ],
    };
  }
  if (/(hi|hello|hey|yo|good)/.test(q)) {
    return {
      text: "Hello! Ask me about what we do, pricing, or getting a free consultation — or tap a human channel below.",
    };
  }
  return {
    text: "Thanks for the detail — I'll route this to the team. Meanwhile:",
    actions: [
      { label: "Free consultation", href: CTA_HREF },
      { label: "WhatsApp us", href: WHATSAPP_URL, external: true },
    ],
  };
}
