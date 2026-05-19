// The four core services. Shared by the homepage Services section and
// the per-service detail routes (/services/<slug>) so the name, summary
// and capability list stay in one place. Framed as the outcome the
// client gets — not the framework we happen to use.

export const SERVICES = [
  {
    slug: "website-development",
    icon: "web",
    title: "Website Development",
    summary:
      "High-end marketing and brand sites — 3D-grade visuals, fast on every device, engineered to convert and to last.",
    capabilities: [
      "Brand & marketing sites",
      "3D / WebGL experiences",
      "Performance-first builds",
    ],
  },
  {
    slug: "application-development",
    icon: "app",
    title: "Application Development",
    summary:
      "Web and mobile products built around the job to be done — quick to learn, quietly powerful, ready to scale with you.",
    capabilities: [
      "Web applications",
      "Mobile applications",
      "UX & product design",
    ],
  },
  {
    slug: "software-development",
    icon: "code",
    title: "Software Development",
    summary:
      "Custom software and platforms shaped around how your business actually works — from APIs to the tools your team lives in.",
    capabilities: [
      "Custom platforms",
      "APIs & integrations",
      "Internal tools",
    ],
  },
  {
    slug: "automation-systems",
    icon: "automation",
    title: "Automation Systems",
    summary:
      "The repetitive glue between your tools, quietly handled — so your people spend their hours on judgement, not busywork.",
    capabilities: [
      "Workflow automation",
      "Process & ops",
      "Tool integrations",
    ],
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
