"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Reveal from "./Reveal";
import Nav from "./Nav";
import { BRAND, CTA_HREF, CTA_LABEL, CONTACT_EMAIL } from "../lib/site";

/* /studio landing page. Dark navy + electric-blue glow aesthetic.
   Scoped under .studiopage so the cooler palette doesn't bleed
   into the rest of the site. PROOF RULE: pricing numbers, founder
   names where not real, and any metric are marked TODO. */


/* -----------------------------------------------------------
 * Hero
 * --------------------------------------------------------- */
function StudioHero() {
  return (
    <section className="stp-hero" aria-label="Studio hero">
      <div className="stp-hero__glow stp-hero__glow--horizon" aria-hidden="true" />
      <div className="stp-hero__glow stp-hero__glow--left" aria-hidden="true" />
      <div className="stp-hero__grid" aria-hidden="true" />

      <div className="stp-container stp-hero__inner">
        <Reveal>
          <span className="stp-eyebrow">
            <span className="stp-eyebrow__dot" />
            The Studio
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="stp-hero__title">
            Design that ships.
            <br />
            <em>Brands that scale.</em>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="stp-hero__sub">
            A small senior studio shipping serious products — design,
            engineering and motion under one roof. No handoffs, no
            template work, no excuses.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="stp-hero__cta">
            <a href={CTA_HREF} className="stp-btn stp-btn--primary">
              Start a project
              <span className="stp-btn__arrow" aria-hidden="true">→</span>
            </a>
            <a href="/work" className="stp-btn stp-btn--ghost">
              See the work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Why Studios Choose Us — 2×2 isometric icon cards
 * --------------------------------------------------------- */
function IsoCapabilities() {
  return (
    <svg viewBox="0 0 80 80" className="stp-iso" aria-hidden="true">
      <defs>
        <linearGradient id="iso-cap" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6EC1FF" />
          <stop offset="1" stopColor="#2E7BFF" />
        </linearGradient>
      </defs>
      {/* base plate */}
      <polygon points="40,12 68,28 40,44 12,28" fill="url(#iso-cap)" opacity="0.7" />
      <polygon points="68,28 68,52 40,68 40,44" fill="#2E7BFF" opacity="0.45" />
      <polygon points="12,28 12,52 40,68 40,44" fill="rgba(255,255,255,0.08)" opacity="0.85" />
      {/* top stacked tile */}
      <polygon points="40,2 60,14 40,26 20,14" fill="#6EC1FF" opacity="0.7" />
      <circle cx="40" cy="14" r="2.5" fill="#fff" />
    </svg>
  );
}
function IsoCraft() {
  return (
    <svg viewBox="0 0 80 80" className="stp-iso" aria-hidden="true">
      <defs>
        <linearGradient id="iso-craft" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#6EC1FF" />
          <stop offset="1" stopColor="#2E7BFF" />
        </linearGradient>
      </defs>
      <polygon points="40,8 70,24 70,56 40,72 10,56 10,24" fill="url(#iso-craft)" opacity="0.18" />
      <polygon points="40,8 70,24 70,56 40,72 10,56 10,24" fill="none" stroke="#6EC1FF" strokeOpacity="0.55" strokeWidth="1.2" />
      <polygon points="40,8 40,72" stroke="#2E7BFF" strokeOpacity="0.5" strokeWidth="0.8" />
      <polygon points="10,24 70,56" stroke="#2E7BFF" strokeOpacity="0.4" strokeWidth="0.8" />
      <polygon points="70,24 10,56" stroke="#2E7BFF" strokeOpacity="0.4" strokeWidth="0.8" />
      <circle cx="40" cy="40" r="6" fill="#6EC1FF" opacity="0.9" />
      <circle cx="40" cy="40" r="11" fill="none" stroke="#6EC1FF" strokeOpacity="0.4" strokeWidth="0.8" />
    </svg>
  );
}
function IsoSpeed() {
  return (
    <svg viewBox="0 0 80 80" className="stp-iso" aria-hidden="true">
      <defs>
        <linearGradient id="iso-speed" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#6EC1FF" />
          <stop offset="1" stopColor="#2E7BFF" />
        </linearGradient>
      </defs>
      <polygon points="42,8 18,46 36,46 30,72 60,32 42,32" fill="url(#iso-speed)" />
      <polygon points="42,8 18,46 36,46 30,72 60,32 42,32" fill="none" stroke="#6EC1FF" strokeWidth="0.8" strokeOpacity="0.7" />
      <circle cx="50" cy="24" r="2" fill="#fff" opacity="0.85" />
    </svg>
  );
}
function IsoRoi() {
  return (
    <svg viewBox="0 0 80 80" className="stp-iso" aria-hidden="true">
      <defs>
        <linearGradient id="iso-roi" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#2E7BFF" />
          <stop offset="1" stopColor="#6EC1FF" />
        </linearGradient>
      </defs>
      <rect x="12" y="46" width="12" height="22" rx="2" fill="url(#iso-roi)" opacity="0.55" />
      <rect x="30" y="34" width="12" height="34" rx="2" fill="url(#iso-roi)" opacity="0.75" />
      <rect x="48" y="20" width="12" height="48" rx="2" fill="url(#iso-roi)" />
      <polyline points="18,42 36,30 54,16 66,10" fill="none" stroke="#6EC1FF" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="66" cy="10" r="3" fill="#6EC1FF" />
      <circle cx="66" cy="10" r="6" fill="none" stroke="#6EC1FF" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
}

const WHY = [
  {
    icon: IsoCapabilities,
    title: "Full-stack capability",
    body:
      "Brand, web, app and motion built by the same team — no agency-to-vendor handoff, no broken telephone.",
  },
  {
    icon: IsoCraft,
    title: "Obsessive craft",
    body:
      "Pixel-level attention, real-device QA, micro-interactions tuned by hand. Polish isn't a phase — it's the standard.",
  },
  {
    icon: IsoSpeed,
    title: "Studio velocity",
    body:
      "Weekly cycles, staging from day one. You see the build move every Friday, not on launch day.",
  },
  {
    icon: IsoRoi,
    title: "Built to compound",
    body:
      "Components scale, motion runs lean, SEO is structural. The site you ship today still earns its keep two years out.",
  },
];

function StudioWhy() {
  return (
    <section className="stp-section stp-why" aria-label="Why studios choose us">
      <div className="stp-container">
        <Reveal className="stp-head">
          <span className="stp-eyebrow">
            <span className="stp-eyebrow__dot" />
            Why us
          </span>
          <h2 className="stp-h2">
            Why teams pick <em>this studio.</em>
          </h2>
          <p className="stp-sub">
            Four reasons clients keep coming back — and refer the next one
            without being asked.
          </p>
        </Reveal>

        <div className="stp-why__grid">
          {WHY.map((w, i) => {
            const Icon = w.icon;
            return (
              <Reveal key={w.title} className="stp-card stp-why__card" delay={i * 90}>
                <div className="stp-card__glow" aria-hidden="true" />
                <div className="stp-why__icon">
                  <Icon />
                </div>
                <h3 className="stp-card__title">{w.title}</h3>
                <p className="stp-card__body">{w.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Process — 3 horizontal Discover · Design · Deliver cards
 * --------------------------------------------------------- */
function ProcDiscover() {
  return (
    <svg viewBox="0 0 120 80" className="stp-proc__art" aria-hidden="true">
      <defs>
        <radialGradient id="proc-disc" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#6EC1FF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#6EC1FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="40" r="32" fill="url(#proc-disc)" />
      <circle cx="60" cy="40" r="22" fill="none" stroke="#6EC1FF" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="60" cy="40" r="14" fill="none" stroke="#6EC1FF" strokeOpacity="0.45" strokeWidth="1" />
      <circle cx="60" cy="40" r="6" fill="#6EC1FF" />
      <line x1="60" y1="40" x2="92" y2="20" stroke="#6EC1FF" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="92" cy="20" r="3" fill="#6EC1FF" />
    </svg>
  );
}
function ProcDesign() {
  return (
    <svg viewBox="0 0 120 80" className="stp-proc__art" aria-hidden="true">
      <defs>
        <linearGradient id="proc-des" x1="0" x2="1">
          <stop offset="0" stopColor="#2E7BFF" />
          <stop offset="1" stopColor="#6EC1FF" />
        </linearGradient>
      </defs>
      <rect x="22" y="14" width="76" height="52" rx="6" fill="none" stroke="url(#proc-des)" strokeWidth="1.2" />
      <rect x="30" y="22" width="28" height="6" rx="3" fill="#6EC1FF" opacity="0.85" />
      <rect x="30" y="34" width="60" height="3" rx="1.5" fill="#2E7BFF" opacity="0.6" />
      <rect x="30" y="42" width="44" height="3" rx="1.5" fill="#2E7BFF" opacity="0.45" />
      <rect x="30" y="50" width="20" height="10" rx="2" fill="#6EC1FF" opacity="0.9" />
      <rect x="56" y="50" width="20" height="10" rx="2" fill="none" stroke="#6EC1FF" strokeWidth="1" opacity="0.7" />
    </svg>
  );
}
function ProcDeliver() {
  return (
    <svg viewBox="0 0 120 80" className="stp-proc__art" aria-hidden="true">
      <defs>
        <linearGradient id="proc-del" x1="0" x2="1">
          <stop offset="0" stopColor="#2E7BFF" />
          <stop offset="1" stopColor="#6EC1FF" />
        </linearGradient>
      </defs>
      <path d="M 18 60 L 50 60 L 70 30 L 102 30" fill="none" stroke="url(#proc-del)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 92 22 L 102 30 L 92 38" fill="none" stroke="#6EC1FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="60" r="4" fill="#2E7BFF" />
      <circle cx="50" cy="60" r="4" fill="#6EC1FF" />
      <circle cx="70" cy="30" r="4" fill="#6EC1FF" />
      <circle cx="102" cy="30" r="6" fill="none" stroke="#6EC1FF" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  );
}

const PROCESS = [
  {
    n: "01",
    title: "Discover",
    body:
      "We dig into the goal, the audience and the constraints. Out the other end: a written shape, a budget range, a timeline.",
    art: ProcDiscover,
  },
  {
    n: "02",
    title: "Design",
    body:
      "Weekly cycles, working in the real medium. Brand, surfaces and motion designed together — never in isolation.",
    art: ProcDesign,
  },
  {
    n: "03",
    title: "Deliver",
    body:
      "Build, polish, launch. Staging from day one, real-device QA, and a post-launch support window baked into every engagement.",
    art: ProcDeliver,
  },
];

function StudioProcess() {
  return (
    <section className="stp-section stp-proc" aria-label="Our process">
      <div className="stp-container">
        <Reveal className="stp-head">
          <span className="stp-eyebrow">
            <span className="stp-eyebrow__dot" />
            Process
          </span>
          <h2 className="stp-h2">
            Three movements. <em>One studio.</em>
          </h2>
          <p className="stp-sub">
            From the first conversation to the live URL — what every
            engagement actually looks like.
          </p>
        </Reveal>

        <div className="stp-proc__grid">
          {PROCESS.map((p, i) => {
            const Art = p.art;
            return (
              <Reveal key={p.title} className="stp-card stp-proc__card" delay={i * 100}>
                <div className="stp-card__glow" aria-hidden="true" />
                <span className="stp-proc__n">{p.n}</span>
                <div className="stp-proc__art-wrap">
                  <Art />
                </div>
                <h3 className="stp-card__title">{p.title}</h3>
                <p className="stp-card__body">{p.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Philosophy — 2-up: statement + abstract node constellation
 * --------------------------------------------------------- */
function NodeConstellation() {
  // Static SVG constellation; nodes pulse via CSS.
  const nodes = [
    { x: 18, y: 30, r: 4, k: 1 },
    { x: 38, y: 14, r: 3, k: 2 },
    { x: 62, y: 22, r: 5, k: 3 },
    { x: 82, y: 38, r: 3, k: 4 },
    { x: 30, y: 62, r: 3, k: 5 },
    { x: 52, y: 78, r: 5, k: 6 },
    { x: 74, y: 64, r: 3, k: 7 },
    { x: 50, y: 46, r: 7, k: 8 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5],
    [5, 6], [3, 6], [7, 0], [7, 2], [7, 5], [7, 6], [7, 1],
  ];
  return (
    <svg viewBox="0 0 100 100" className="stp-phil__art" aria-hidden="true">
      <defs>
        <radialGradient id="stp-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#6EC1FF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#6EC1FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="46" r="40" fill="url(#stp-node-glow)" opacity="0.6" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#6EC1FF"
          strokeOpacity="0.35"
          strokeWidth="0.5"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i} className={`stp-phil__node stp-phil__node--${n.k}`}>
          <circle cx={n.x} cy={n.y} r={n.r + 4} fill="#6EC1FF" opacity="0.18" />
          <circle cx={n.x} cy={n.y} r={n.r} fill="#6EC1FF" />
          <circle cx={n.x} cy={n.y} r={n.r * 0.45} fill="#fff" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

function StudioPhilosophy() {
  return (
    <section className="stp-section stp-phil" aria-label="Studio philosophy">
      <div className="stp-container stp-phil__grid">
        <Reveal className="stp-card stp-phil__statement">
          <div className="stp-card__glow" aria-hidden="true" />
          <span className="stp-eyebrow">
            <span className="stp-eyebrow__dot" />
            Philosophy
          </span>
          <h2 className="stp-phil__h">
            We don&apos;t do <em>template work.</em>
          </h2>
          <p className="stp-phil__p">
            Every engagement gets designed from the goal up. We refuse
            page-builder shortcuts, recycled component dumps and
            &ldquo;industry-standard&rdquo; layouts that look like
            everyone else&apos;s.
          </p>
          <p className="stp-phil__p">
            What you ship feels like yours — because it is. Built once,
            built right, built to compound.
          </p>
        </Reveal>

        <Reveal className="stp-card stp-phil__render" delay={120}>
          <div className="stp-card__glow" aria-hidden="true" />
          <NodeConstellation />
          <div className="stp-phil__caption">
            <span>Studio · connected craft</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Testimonials — dark card stack with active blue halo
 * --------------------------------------------------------- */
const VOICES = [
  {
    name: "Anil Chakkrapani",
    role: "Founder, Medcity International Academy",
    quote:
      "Placeholder testimonial TODO — real, approved quote from Medcity lands here before launch. Style notes: 2–3 sentences, founder-voiced, specific about the working relationship.",
    initials: "AC",
  },
  {
    name: "Aswin Pradeep",
    role: "Magnate Study Abroad",
    quote:
      "Placeholder testimonial TODO — replace with approved quote. Should reference a concrete outcome or moment from the engagement.",
    initials: "AP",
  },
  {
    name: "Johnson",
    role: "Founder, IBS Consultancy",
    quote:
      "Placeholder testimonial TODO — final wording pending. Expected length: 2 sentences, plain spoken.",
    initials: "J",
  },
];

function StudioVoices() {
  const [active, setActive] = useState(0);
  return (
    <section className="stp-section stp-voices" aria-label="Client voices">
      <div className="stp-container">
        <Reveal className="stp-head">
          <span className="stp-eyebrow">
            <span className="stp-eyebrow__dot" />
            Voices
          </span>
          <h2 className="stp-h2">
            What founders <em>actually say.</em>
          </h2>
          <p className="stp-sub">
            Selected words from the people we&apos;ve built with. Quotes
            below are placeholders until each is permission-cleared.
          </p>
        </Reveal>

        <div className="stp-voices__stack" role="list">
          {VOICES.map((v, i) => (
            <Reveal
              key={v.name}
              as="article"
              className={`stp-card stp-voices__card${active === i ? " is-active" : ""}`}
              delay={i * 80}
            >
              <div className="stp-card__glow" aria-hidden="true" />
              <button
                type="button"
                className="stp-voices__btn"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <header className="stp-voices__head">
                  <span className="stp-voices__avatar" aria-hidden="true">
                    {v.initials}
                  </span>
                  <span className="stp-voices__id">
                    <span className="stp-voices__name">{v.name}</span>
                    <span className="stp-voices__role">{v.role}</span>
                  </span>
                </header>
                <blockquote className="stp-voices__quote">
                  &ldquo;{v.quote}&rdquo;
                </blockquote>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Pricing — 3 honeycomb-textured tier cards
 * --------------------------------------------------------- */
const TIERS = [
  {
    name: "Starter",
    sub: "Single surface · fixed scope",
    price: "Pricing on request",
    features: [
      "Marketing site or landing page",
      "Brand polish + responsive design",
      "Up to 6 sections, CMS-light",
      "2 cycles of revisions",
      "30-day post-launch support",
    ],
    cta: "Start small",
  },
  {
    name: "Studio",
    featured: true,
    sub: "Most picked · full product surface",
    price: "Pricing on request",
    features: [
      "Full marketing site or product app",
      "Custom motion + interactions",
      "CMS / dashboard integrations",
      "Weekly cycles · staging from day 1",
      "60-day post-launch support",
    ],
    cta: "Talk to the studio",
  },
  {
    name: "Enterprise",
    sub: "Multi-surface · ongoing retainer",
    price: "Pricing on request",
    features: [
      "Multi-surface system or platform",
      "Design + engineering retainer",
      "Dedicated workstream + PM",
      "SLA-backed support window",
      "Quarterly performance audits",
    ],
    cta: "Request a brief",
  },
];

function StudioPricing() {
  return (
    <section className="stp-section stp-tiers" aria-label="Engagement tiers">
      <div className="stp-container">
        <Reveal className="stp-head">
          <span className="stp-eyebrow">
            <span className="stp-eyebrow__dot" />
            Engagement
          </span>
          <h2 className="stp-h2">
            Pick a shape. <em>We&apos;ll quote the rest.</em>
          </h2>
          <p className="stp-sub">
            Three starting shapes — the right fit usually emerges on the
            discovery call. Prices below are placeholder ranges until
            published.
          </p>
        </Reveal>

        <div className="stp-tiers__grid">
          {TIERS.map((t, i) => (
            <Reveal
              key={t.name}
              className={`stp-card stp-tier${t.featured ? " stp-tier--featured" : ""}`}
              delay={i * 100}
            >
              <div className="stp-tier__hex" aria-hidden="true" />
              <div className="stp-card__glow" aria-hidden="true" />
              {t.featured && (
                <span className="stp-tier__badge">Most picked</span>
              )}
              <header className="stp-tier__head">
                <h3 className="stp-tier__name">{t.name}</h3>
                <p className="stp-tier__sub">{t.sub}</p>
                <p className="stp-tier__price">{t.price}</p>
              </header>
              <ul className="stp-tier__list">
                {t.features.map((f) => (
                  <li key={f}>
                    <span className="stp-tier__tick" aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={CTA_HREF}
                className={`stp-btn ${t.featured ? "stp-btn--primary" : "stp-btn--ghost"} stp-tier__cta`}
              >
                {t.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * FAQ — pill rows, active row glows electric blue
 * --------------------------------------------------------- */
const STP_FAQ = [
  {
    q: "How quickly can we start?",
    a: "Discovery calls within a week, kickoff typically 2–3 weeks out depending on current load. We never take on more than we can finish well.",
  },
  {
    q: "Do you work with non-tech founders?",
    a: "Most of our clients are. We translate goals into surfaces, run the technical decisions, and explain trade-offs in plain language.",
  },
  {
    q: "Do you handle hosting and ongoing performance?",
    a: "Yes — through a retainer. We host, monitor, patch, and run quarterly performance audits on every active retainer.",
  },
  {
    q: "Can you slot into our existing team?",
    a: "Often. We've embedded with in-house product teams for design sprints, frontend leadership and motion / 3D specialist passes.",
  },
  {
    q: "What's not a good fit?",
    a: "Pure throughput work, page-builder rebuilds, or projects where the brief is 'copy this competitor'. We'll point you somewhere better.",
  },
];

function StudioFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="stp-section stp-faq" aria-label="Studio FAQ">
      <div className="stp-container">
        <Reveal className="stp-head">
          <span className="stp-eyebrow">
            <span className="stp-eyebrow__dot" />
            FAQ
          </span>
          <h2 className="stp-h2">
            Common <em>questions.</em>
          </h2>
        </Reveal>

        <ul className="stp-faq__list">
          {STP_FAQ.map((f, i) => {
            const isOpen = open === i;
            const id = `stp-faq-${i}`;
            return (
              <li
                key={f.q}
                className={`stp-faq__row${isOpen ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="stp-faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-a`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className="stp-faq__sign" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  id={`${id}-a`}
                  className="stp-faq__a-wrap"
                  aria-hidden={!isOpen}
                >
                  <div className="stp-faq__a">{f.a}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
 * Final CTA + Footer
 * --------------------------------------------------------- */
function StudioCta() {
  return (
    <section
      className="stp-section stp-cta"
      id="stp-contact"
      aria-label="Start a project"
    >
      <div className="stp-cta__halo" aria-hidden="true" />
      <div className="stp-container stp-cta__inner">
        <Reveal>
          <h2 className="stp-cta__h">
            Ready to build something <em>worth showing off?</em>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="stp-cta__p">
            One discovery call. A written shape. Honest answers about
            whether we&apos;re the studio for it.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <a href={CTA_HREF} className="stp-btn stp-btn--primary stp-cta__btn">
            Start a project
            <span className="stp-btn__arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function StudioFooter() {
  return (
    <footer className="stp-foot">
      <div className="stp-container stp-foot__inner">
        <div className="stp-foot__brand">
          <Logo className="brand__mark" />
          <div>
            <p className="stp-foot__name">{BRAND.name}</p>
            <p className="stp-foot__tag">Design that ships. Brands that scale.</p>
          </div>
        </div>
        <div className="stp-foot__cols">
          <div>
            <p className="stp-foot__h">Studio</p>
            <a href="/work">Work</a>
            <a href="/services">Services</a>
            <a href="/process">Process</a>
          </div>
          <div>
            <p className="stp-foot__h">Reach</p>
            <a href={CTA_HREF}>Start a project</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href="/blog">Journal</a>
          </div>
        </div>
        <p className="stp-foot__copy">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* -----------------------------------------------------------
 * Page composition
 * --------------------------------------------------------- */
export default function StudioPage() {
  return (
    <div className="studiopage">
      <Nav />
      <main>
        <StudioHero />
        <StudioWhy />
        <StudioProcess />
        <StudioPhilosophy />
        <StudioVoices />
        <StudioPricing />
        <StudioFaq />
        <StudioCta />
      </main>
      <StudioFooter />
    </div>
  );
}
