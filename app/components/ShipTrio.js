"use client";

import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Huly-second-section homage. Three large curved glass cards on a
   light surface — each card stages a small product surface mockup
   inline (pure SVG) above a short Cormorant heading + body.
   PROOF RULE: surfaces are clearly stylised mockups, no real
   client work shown. */

function ArtBrand() {
  return (
    <svg viewBox="0 0 320 200" className="h2-trio__art" aria-hidden="true">
      <defs>
        <linearGradient id="trio-brand" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#C084FC" stopOpacity="0.55" />
          <stop offset="1" stopColor="#6EC1FF" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect x="14" y="14" width="292" height="172" rx="14" fill="#ffffff" stroke="rgba(15,20,35,0.08)" />
      <rect x="34" y="38" width="76" height="76" rx="38" fill="url(#trio-brand)" />
      <rect x="130" y="46" width="146" height="10" rx="5" fill="rgba(15,20,35,0.78)" />
      <rect x="130" y="64" width="120" height="6" rx="3" fill="rgba(15,20,35,0.32)" />
      <rect x="130" y="78" width="100" height="6" rx="3" fill="rgba(15,20,35,0.18)" />
      <rect x="34" y="132" width="124" height="32" rx="16" fill="#0F1423" />
      <rect x="170" y="132" width="106" height="32" rx="16" fill="none" stroke="rgba(15,20,35,0.16)" />
      <text x="96" y="152" fontFamily="ui-sans-serif" fontSize="11" fill="#fff" textAnchor="middle">Brand kit</text>
    </svg>
  );
}

function ArtProduct() {
  return (
    <svg viewBox="0 0 320 200" className="h2-trio__art" aria-hidden="true">
      <defs>
        <linearGradient id="trio-prod" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6EC1FF" stopOpacity="0.18" />
          <stop offset="1" stopColor="#6EC1FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="14" y="14" width="292" height="172" rx="14" fill="#ffffff" stroke="rgba(15,20,35,0.08)" />
      <rect x="34" y="34" width="252" height="22" rx="6" fill="rgba(15,20,35,0.04)" />
      <circle cx="46" cy="45" r="3" fill="#FF6A6A" /><circle cx="58" cy="45" r="3" fill="#F5C24A" /><circle cx="70" cy="45" r="3" fill="#5BD68C" />
      <rect x="34" y="70" width="120" height="98" rx="10" fill="url(#trio-prod)" stroke="rgba(46,123,255,0.18)" />
      <rect x="46" y="86" width="48" height="6" rx="3" fill="rgba(46,123,255,0.55)" />
      <rect x="46" y="100" width="92" height="4" rx="2" fill="rgba(15,20,35,0.22)" />
      <rect x="46" y="110" width="72" height="4" rx="2" fill="rgba(15,20,35,0.16)" />
      <polyline points="46,150 64,138 82,142 100,130 118,124 138,118" fill="none" stroke="#2E7BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="170" y="70" width="116" height="44" rx="10" fill="#fff" stroke="rgba(15,20,35,0.08)" />
      <rect x="184" y="84" width="80" height="6" rx="3" fill="rgba(15,20,35,0.7)" />
      <rect x="184" y="96" width="60" height="4" rx="2" fill="rgba(15,20,35,0.28)" />
      <rect x="170" y="124" width="116" height="44" rx="10" fill="#fff" stroke="rgba(15,20,35,0.08)" />
      <rect x="184" y="138" width="64" height="6" rx="3" fill="rgba(15,20,35,0.7)" />
      <rect x="184" y="150" width="84" height="4" rx="2" fill="rgba(15,20,35,0.28)" />
    </svg>
  );
}

function ArtSystem() {
  return (
    <svg viewBox="0 0 320 200" className="h2-trio__art" aria-hidden="true">
      <rect x="14" y="14" width="292" height="172" rx="14" fill="#ffffff" stroke="rgba(15,20,35,0.08)" />
      {/* node graph */}
      <g stroke="rgba(46,123,255,0.35)" strokeWidth="1">
        <line x1="80" y1="60" x2="160" y2="100" />
        <line x1="240" y1="60" x2="160" y2="100" />
        <line x1="80" y1="140" x2="160" y2="100" />
        <line x1="240" y1="140" x2="160" y2="100" />
        <line x1="160" y1="40" x2="160" y2="100" />
        <line x1="160" y1="160" x2="160" y2="100" />
      </g>
      {[
        { x: 160, y: 40 }, { x: 80, y: 60 }, { x: 240, y: 60 },
        { x: 80, y: 140 }, { x: 240, y: 140 }, { x: 160, y: 160 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="14" fill="#fff" stroke="rgba(15,20,35,0.1)" />
          <circle cx={p.x} cy={p.y} r="5" fill="#6EC1FF" />
        </g>
      ))}
      <circle cx="160" cy="100" r="22" fill="#0F1423" />
      <circle cx="160" cy="100" r="8" fill="#C084FC" />
      <circle cx="160" cy="100" r="32" fill="none" stroke="rgba(192,132,252,0.25)" strokeDasharray="3 4" />
    </svg>
  );
}

const CARDS = [
  {
    art: ArtBrand,
    eyebrow: "Brand",
    title: "Ship the brand.",
    body: "Identity, voice and assets engineered together — so the first impression and the tenth still match.",
  },
  {
    art: ArtProduct,
    eyebrow: "Product",
    title: "Ship the product.",
    body: "Marketing surfaces, dashboards, apps. Designed and engineered by the same team, on the same desk.",
  },
  {
    art: ArtSystem,
    eyebrow: "System",
    title: "Ship the system.",
    body: "CRMs, ERPs and the workflow plumbing nobody else wants to touch. Built to outlast your stack rewrite.",
  },
];

export default function ShipTrio() {
  return (
    <section className="h2-section h2-trio" aria-label="What we ship">
      <div className="h2-trio__orb h2-trio__orb--a" aria-hidden="true" />
      <div className="h2-trio__orb h2-trio__orb--b" aria-hidden="true" />

      <div className="container">
        <Reveal className="h2-head">
          <span className="h2-eyebrow">
            <span className="h2-eyebrow__dot" />
            What we ship
          </span>
          <h2 className="h2-h2">
            Three shapes. <em>One studio.</em>
          </h2>
          <p className="h2-sub">
            Most engagements land in one of these. Tell us which — or
            tell us it&apos;s a mix — and we&apos;ll shape it from there.
          </p>
        </Reveal>

        <div className="h2-trio__grid">
          {CARDS.map((c, i) => {
            const Art = c.art;
            return (
              <Reveal key={c.title} className="h2-card h2-trio__card" delay={i * 110}>
                <div className="h2-trio__art-wrap">
                  <Art />
                </div>
                <div className="h2-trio__body">
                  <span className="h2-trio__eyebrow">{c.eyebrow}</span>
                  <h3 className="h2-card__title">{c.title}</h3>
                  <p className="h2-card__body">{c.body}</p>
                  <a href={CTA_HREF} className="h2-trio__link">
                    Start here <span aria-hidden="true">→</span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
