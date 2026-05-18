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

// In-page navigation. Each id matches a <section id="…"> in the homepage.
export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
];
