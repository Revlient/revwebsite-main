"use client";

import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Huly-second-section homage. Typography-led — large category
   number, big bold sans-serif title, body, subtle motif. Three
   curved glass cards on white. No crude SVG mockups. */

const CARDS = [
  {
    n: "01",
    eyebrow: "Brand",
    title: "Ship the brand.",
    body: "Identity, voice and asset systems engineered together — so the first impression and the tenth still match.",
    bullets: ["Identity systems", "Voice & messaging", "Asset libraries"],
  },
  {
    n: "02",
    eyebrow: "Product",
    title: "Ship the product.",
    body: "Marketing surfaces, dashboards, apps. Designed and engineered by the same team, on the same desk.",
    bullets: ["Sites & landings", "Dashboards & apps", "Motion & 3D"],
  },
  {
    n: "03",
    eyebrow: "System",
    title: "Ship the system.",
    body: "CRMs, ERPs and the workflow plumbing nobody else wants to touch. Built to outlast your stack rewrite.",
    bullets: ["CRM workspaces", "Internal tooling", "Integrations"],
  },
];

function CardMotif({ n }) {
  // Big quiet motif anchored to the card corner. Same vocabulary
  // across all three cards — just rotates.
  return (
    <svg viewBox="0 0 200 200" className="h2-trio__motif" aria-hidden="true">
      <defs>
        <linearGradient id={`trio-motif-${n}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#2E7BFF" stopOpacity="0.18" />
          <stop offset="1" stopColor="#C084FC" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <circle cx="160" cy="40" r="120" fill={`url(#trio-motif-${n})`} />
      <circle cx="160" cy="40" r="80" fill="none" stroke="rgba(46,123,255,0.16)" strokeWidth="1" />
      <circle cx="160" cy="40" r="50" fill="none" stroke="rgba(46,123,255,0.22)" strokeWidth="1" />
    </svg>
  );
}

export default function ShipTrio() {
  return (
    <section className="h2-section h2-trio" aria-label="What we ship">
      <div className="container">
        <Reveal className="h2-head">
          <span className="h2-eyebrow">
            <span className="h2-eyebrow__dot" />
            What we ship
          </span>
          <h2 className="h2-h2">
            Three shapes. <span className="h2-accent">One studio.</span>
          </h2>
          <p className="h2-sub">
            Most engagements land in one of these. Tell us which — or
            tell us it&apos;s a mix — and we&apos;ll shape it from there.
          </p>
        </Reveal>

        <div className="h2-trio__grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} className="h2-card h2-trio__card" delay={i * 110}>
              <CardMotif n={c.n} />
              <span className="h2-trio__n">{c.n}</span>
              <span className="h2-trio__eyebrow">{c.eyebrow}</span>
              <h3 className="h2-trio__title">{c.title}</h3>
              <p className="h2-trio__body">{c.body}</p>
              <ul className="h2-trio__bullets">
                {c.bullets.map((b) => (
                  <li key={b}>
                    <span className="h2-trio__dot" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <a href={CTA_HREF} className="h2-trio__link">
                Start here <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
