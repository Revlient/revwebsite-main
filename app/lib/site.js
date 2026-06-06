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
export const CTA_HREF = "/contact";
export const CTA_LABEL = "Start a project";

// Revlient Systems — the separate site that serves ERP / CRM / automation buyers.
// TODO: confirm the real production URL with the team before launch.
export const SYSTEMS_URL = "https://systems.revlient.com";

// Contact channels for the floating widget.
// TODO: replace with the studio's real numbers before launch.
// wa.me requires international format, digits only (no +, spaces or dashes).
export const WHATSAPP_NUMBER = "916238714197"; // WhatsApp number (digits only)
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_TEL = "+916238714197";
export const PHONE_DISPLAY = "+91 62387 14197";
export const CONTACT_EMAIL = "Connect@revlient.com";

// In-page navigation. Each entry either scrolls to a homepage section
// (id matches a <section id="…">) or routes to a dedicated page.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
];
