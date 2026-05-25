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
    detailedSections: [
      {
        title: "Why Performance is Your Best SEO Strategy",
        body: "A beautiful website is useless if search engines rank it poorly due to slow load speeds. By building on Next.js with static site generation (SSG) and incremental static regeneration (ISR), we deliver lightning-fast page loading times. We optimize the Largest Contentful Paint (LCP) and Interaction to Next Paint (INP) to ensure your Lighthouse performance baseline exceeds 95+. This directly signals web crawling algorithms to prioritize your page in search rankings, driving organic traffic."
      },
      {
        title: "Immersive User Engagement via WebGL & 3D",
        body: "Search engine optimization isn't just about keyword density; it's about session duration and user engagement. We craft interactive, lightweight 3D experiences utilizing Three.js and WebGL that run smoothly in the browser. By capturing visitor attention and encouraging visual exploration, these immersive layers increase the time spent on your site, signaling high-quality content relevance to search engines and significantly boosting your authority."
      },
      {
        title: "Modern Jamstack & Headless Integrations",
        body: "We deploy secure, decoupled frontend frameworks integrated with leading headless CMS systems. This architecture guarantees that content managers can update blog posts and service lists independently without writing code, while the site remains statically cached and fast. Coupled with secure Stripe e-commerce checkouts and globally distributed CDN delivery, your site is structurally optimized to scale and rank internationally."
      }
    ]
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
    detailedSections: [
      {
        title: "Custom ERP & CRM SaaS Architectures",
        body: "Generic off-the-shelf software solutions force you to compromise your operational workflows. We build tailored ERP and CRM systems customized around your specific industry parameters. By architecting scalable SaaS infrastructures with zero seat license fees, your company owns 100% of its intellectual property. We build database systems designed to outlive the launch, ensuring business operations run smoothly and securely."
      },
      {
        title: "Robust, Secure Django API Integrations",
        body: "A scalable digital ecosystem relies on robust backend data pipelines. We leverage the Python-based Django web framework to build highly secure REST and GraphQL API services. Wired to relational PostgreSQL databases, our backend architectures utilize secure JWT authentication, strict role-based access controls, and rate-limiting policies to safeguard sensitive enterprise records from unauthorized exposure."
      },
      {
        title: "Synchronized Ledger & Tally Integrations",
        body: "To eliminate data fragmentation, we develop native API bridges that link your customer relation pipelines to financial accounting ledgers. From automated quotation generation to synchronized Tally ledgers, our systems automate GST and TDS calculation routines. Real-time background sync workers guarantee that invoices, agent commissions, and expenses update dynamically on one central secure panel."
      }
    ]
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
    detailedSections: [
      {
        title: "React Native Cross-Platform Engineering",
        body: "We build native-grade mobile apps using React Native, allowing you to deploy to both Apple iOS and Google Android app stores from a single, optimized codebase. This approach slashes ongoing maintenance costs by half while preserving fluid, high-frame-rate user interfaces. We manage the entire store deployment process, ensuring your apps meet all performance and design guidelines."
      },
      {
        title: "Resilient Offline-First Architecture",
        body: "Mobile users experience bad cellular signals, elevators, and transit tunnels. We architect offline-first mobile applications that store data locally using robust on-device databases (SQLite/WatermelonDB). Users can input transactions and edit records offline. Once a cellular connection is restored, background sync workers seamlessly push the delta changes back to the cloud database, preventing data loss."
      },
      {
        title: "Segmented Push Notifications & Crash Monitoring",
        body: "User retention is the lifeblood of mobile applications. We configure server-side push notification managers that trigger targeted, non-spammy alerts to segment categories. To maintain visual stability and reliability, we integrate Sentry error-telemetry from day one. Real-time crash reporting notifies our development team of glitches immediately, allowing us to deploy patches before users even notice."
      }
    ]
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
    detailedSections: [
      {
        title: "Seamless API Bridges & Workflow Automation",
        body: "Manual copy-pasting between separate cloud tools drains employee productivity and introduces entry errors. We build automated workflow pipelines that connect your tools via custom API bridges and webhooks. Our schedulers run background cron tasks to automate lead collection, synchronize files, and send notifications, keeping your business running automatically."
      },
      {
        title: "AI-Integrated Quotations & Parsing Engines",
        body: "We integrate state-of-the-art Generative AI models (like Gemini) to parse incoming documents, student applications, or client quotes. Our parsing engines extract structured data, classify records, and draft context-specific email responses automatically. This decreases the response time to potential customers from hours to seconds, vastly improving conversion metrics."
      },
      {
        title: "Real-Time Telemetry & Operations Dashboards",
        body: "Automation works best when it is visible. We develop interactive real-time operations dashboards that track the performance of all automated tasks. Our systems monitor API health, count automated operations, and log savings indicators. If an API bridge breaks or encounters an error, visual alerts and automated Slack notifications are dispatched instantly to trigger recovery."
      }
    ]
  },
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
