"use client";

import Reveal from "./Reveal";

/* /work projects grid. Every card here is a visibly-flagged DEMO
   placeholder so the layout can be reviewed before real case studies
   land. Cover images come from picsum (deterministic seed → stable
   URL), demo links resolve to the RFC-reserved example.com so no live
   destination is implied. Replace each entry's name / about / cover /
   url with the real client data before launch — and drop the
   .work-projects__todo banner + the .work-project__demo pill at the
   same time. */

const PROJECTS = [
  {
    name: "Aurora Commerce",
    about:
      "Headless storefront for a boutique outdoor-gear brand. Next.js front end, Stripe checkout, real-time inventory sync with the warehouse system.",
    cover: "https://picsum.photos/seed/revlient-aurora/1200/800",
    url: "https://example.com/aurora",
  },
  {
    name: "Vertex CRM",
    about:
      "Sales-pipeline tool for a regional insurance group. Multi-role access, automated follow-up sequences, and a Slack-style team inbox.",
    cover: "https://picsum.photos/seed/revlient-vertex/1200/800",
    url: "https://example.com/vertex",
  },
  {
    name: "Lumen Studio",
    about:
      "Portfolio site for an architecture practice. Image-led editorial layout, custom CMS, hand-tuned typography for long-form project writeups.",
    cover: "https://picsum.photos/seed/revlient-lumen/1200/800",
    url: "https://example.com/lumen",
  },
  {
    name: "Northwind Ops",
    about:
      "Internal dashboard for fleet operations. Real-time vehicle tracking, dispatch automation, and a driver mobile app with offline sync.",
    cover: "https://picsum.photos/seed/revlient-northwind/1200/800",
    url: "https://example.com/northwind",
  },
  {
    name: "Folio Health",
    about:
      "Patient-intake and records app for a small clinic group. Mobile-first design, role-scoped access, and a clean handoff to their billing tool.",
    cover: "https://picsum.photos/seed/revlient-folio/1200/800",
    url: "https://example.com/folio",
  },
  {
    name: "Mesa Roastery",
    about:
      "D2C coffee subscription shop. Stripe billing, warehouse-side fulfilment, and a roast-schedule view the team actually opens every morning.",
    cover: "https://picsum.photos/seed/revlient-mesa/1200/800",
    url: "https://example.com/mesa",
  },
];

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
  );
}

export default function WorkProjects() {
  return (
    <section className="work-projects" id="projects">
      <div className="container">
        <Reveal className="work-projects__head">
          <span className="work-projects__eyebrow">Selected work</span>
          <h2 className="work-projects__title">
            Recent projects we&apos;ve shipped.
          </h2>
          <p className="work-projects__sub">
            A snapshot of the studio&apos;s build range — websites, internal
            tools, and end-to-end product work.
          </p>
          <span className="work-projects__todo">
            Demo content — placeholder projects shown while real case studies
            are prepared
          </span>
        </Reveal>

        <div className="work-projects__grid">
          {PROJECTS.map((p, i) => (
            <Reveal
              as="a"
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work-project"
              delay={(i % 3) * 80}
            >
              <div className="work-project__cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                />
                <span className="work-project__demo">Demo</span>
              </div>
              <div className="work-project__body">
                <div className="work-project__row">
                  <h3 className="work-project__name">{p.name}</h3>
                  <span className="work-project__arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <p className="work-project__about">{p.about}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
