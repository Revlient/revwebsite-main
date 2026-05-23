// The four core services. Shared by the homepage Services section and
// the per-service detail routes (/services/<slug>). Order matters —
// the homepage ecosystem renders them at positions tl/tr/bl/br
// (top-left / top-right / bottom-left / bottom-right) around the
// central Intelligence Core.
//
// `chips` = technology / capability tags shown in the home card.
// `deliverables` = "what you get" bullets in the same card. Both are
// description of what the studio builds — never invented metrics,
// timelines, or client outcomes. Replace freely; do not add fake
// proof.

export const SERVICES = [
  {
    slug: "web-development",
    pos: "tl",
    icon: "web",
    preview: "browser",
    title: "Web Development",
    summary:
      "High-end marketing and brand sites — 3D-grade visuals, fast on every device, engineered to convert and to last.",
    capabilities: [
      "Brand & marketing sites",
      "3D / WebGL experiences",
      "Performance-first builds",
    ],
    chips: ["Next.js", "CMS", "Stripe", "Analytics", "CDN"],
    deliverables: [
      "Production site",
      "Editable CMS",
      "Performance baseline",
    ],
  },
  {
    slug: "software-development",
    pos: "tr",
    icon: "code",
    preview: "code",
    title: "Software Development",
    summary:
      "Custom software and platforms shaped around how your business actually works — from APIs to the tools your team lives in.",
    capabilities: [
      "Custom platforms",
      "APIs & integrations",
      "Internal tools",
    ],
    chips: ["Django", "Postgres", "API", "Auth", "Webhooks"],
    deliverables: [
      "Cloud deploy",
      "Auth + roles",
      "API docs + tests",
    ],
  },
  {
    slug: "application-development",
    pos: "bl",
    icon: "app",
    preview: "app",
    title: "Application Development",
    summary:
      "Web and mobile products built around the job to be done — quick to learn, quietly powerful, ready to scale with you.",
    capabilities: [
      "Web applications",
      "Mobile applications",
      "UX & product design",
    ],
    chips: ["React Native", "Push", "Offline", "Store"],
    deliverables: [
      "iOS + Android build",
      "In-app analytics",
      "Crash reporting",
    ],
  },
  {
    slug: "automation-systems",
    pos: "br",
    icon: "automation",
    preview: "flow",
    title: "Automation Systems",
    summary:
      "Intelligent workflows, AI integrations and the repetitive glue between your tools — quietly handled.",
    capabilities: [
      "Workflow automation",
      "AI integrations",
      "Process & ops",
    ],
    chips: ["Workflows", "Integrations", "Schedulers", "Dashboards"],
    deliverables: [
      "Mapped workflows",
      "Live dashboards",
      "Alerts",
    ],
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
