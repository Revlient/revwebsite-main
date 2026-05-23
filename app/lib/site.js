// Cross-cutting site configuration.
// Section *content* lives in data arrays inside each section component.
// This file only holds constants shared across many components
// (brand, the persistent CTA target, the systems-site fork URL, nav links).

export const BRAND = {
  name: "Revlient",
  legalName: "Revlient Intercontinental LLP",
  tagline: "We Craft Digital Legacies",
};

// The persistent "Start a project" target.
// FOLLOW-ON TASK: point this at the dedicated /start enquiry form once built.
// For now it scrolls to the closing CTA section so the homepage has no dead links.
export const CTA_HREF = "#start";
export const CTA_LABEL = "Start a project";

// Revlient Systems — the separate site that serves ERP / CRM / automation buyers.
// TODO: confirm the real production URL with the team before launch.
export const SYSTEMS_URL = "https://systems.revlient.com";

// Contact channels for the floating widget.
// TODO: replace with the studio's real numbers before launch.
// wa.me requires international format, digits only (no +, spaces or dashes).
export const WHATSAPP_NUMBER = "910000000000"; // TODO: real WhatsApp number
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_TEL = "+910000000000"; // TODO: real phone number
export const PHONE_DISPLAY = "+91 00000 00000"; // TODO: real phone number
export const CONTACT_EMAIL = "hello@revlient.com"; // TODO: real enquiry inbox

// In-page navigation. Each entry either scrolls to a homepage section
// (id matches a <section id="…">) or routes to a dedicated page.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "/process" },
  { label: "Studio", href: "/studio" },
];
