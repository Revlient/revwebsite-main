// The four core services. Shared by the homepage Services section and
// the per-service detail routes (/services/<slug>). Order matters —
// the homepage ecosystem renders them at positions tl/tr/bl/br
// (top-left / top-right / bottom-left / bottom-right) around the
// central Intelligence Core.

export const SERVICES = [
  {
    slug: "web-development",
    pos: "tl",
    icon: "web",
    preview: "browser",
    title: "Web Development",
    summary:
      "Custom high-performance websites and platforms built for scale.",
    capabilities: [
      "Brand & marketing sites",
      "3D / WebGL experiences",
      "Performance-first builds",
    ],
  },
  {
    slug: "branding-ux",
    pos: "tr",
    icon: "brand",
    preview: "swatch",
    title: "Branding & UI/UX",
    summary:
      "Premium visual identity and conversion-focused interface systems.",
    capabilities: [
      "Visual identity",
      "Product UI / UX",
      "Design systems",
    ],
  },
  {
    slug: "seo-growth",
    pos: "bl",
    icon: "growth",
    preview: "chart",
    title: "SEO & Growth",
    summary:
      "Search optimization and growth strategies for visibility and lead generation.",
    capabilities: [
      "Technical SEO",
      "Content & keywords",
      "Lead funnels",
    ],
  },
  {
    slug: "ai-automation",
    pos: "br",
    icon: "ai",
    preview: "flow",
    title: "AI Automation",
    summary:
      "Intelligent workflows, AI integrations, and business automation systems.",
    capabilities: [
      "Workflow automation",
      "AI integrations",
      "Process & ops",
    ],
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
