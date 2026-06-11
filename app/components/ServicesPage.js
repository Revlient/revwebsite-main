"use client";

import Reveal from "./Reveal";
import Nav from "./Nav";
import WorkFeatureSection from "./WorkFeatureSection";
import AppShowcaseServices from "./services/AppShowcaseServices";
import BundleShowcaseServices from "./services/BundleShowcaseServices";
import BlueGlobe from "./BlueGlobe";
import ProjectMockup from "./work/ProjectMockups";
import { CTA_HREF, CONTACT_EMAIL } from "../lib/site";

/* /services — Proxima-style dark + magenta landing.
   Four service sections (Study abroad ERP / Websites / Apps /
   ERP+CRM bundle) below the hero + logo marquee, then the closing
   CTA. Theme + styles locked from the previous v2 pass. */

const VIDEO_SRC = "/whyrev/blackhole.mp4";

const LOGOS = [
  { name: "House of Eleven", src: "/logos/houseof11.png", grad: "linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)" },
  { name: "IBS Consultants", src: "/logos/ibs.jpg", grad: "linear-gradient(135deg, #4dabf7 0%, #1971c2 100%)" },
  { name: "Covspace", src: "/logos/covspace.png", grad: "linear-gradient(135deg, #37b24d 0%, #2b8a3e 100%)" },
  { name: "Ronspire", src: "/logos/ronspire.svg", grad: "linear-gradient(135deg, #f783ac 0%, #d6336c 100%)" },
  { name: "Perpex B-School", src: "/logos/perpexbschool.svg", grad: "linear-gradient(135deg, #7048e8 0%, #5f3dc4 100%)" },
  { name: "Perpex Group", src: "/logos/perpex.png", grad: "linear-gradient(135deg, #ae3ec9 0%, #862e9c 100%)" },
  { name: "Mathlete", src: "/logos/mathlete.png", grad: "linear-gradient(135deg, #f76707 0%, #d9480f 100%)" },
  { name: "The Magnates", src: "/logos/themagnates.svg", grad: "linear-gradient(135deg, #fcc419 0%, #e67700 100%)" },
  { name: "UniGo", src: "/logos/unigo.png", grad: "linear-gradient(135deg, #2b8a3e 0%, #097969 100%)" },
  { name: "Soumya Shyam", src: "/logos/soumyashyam.png", grad: "linear-gradient(135deg, #ffd43b 0%, #f59f00 100%)" },
  { name: "Nutriboxx", src: "/logos/nutriboxx.png", grad: "linear-gradient(135deg, #20c997 0%, #0ca678 100%)" },
  { name: "Bambrush", src: "/logos/bambrush.webp", grad: "linear-gradient(135deg, #15aabf 0%, #0b7285 100%)" },
  { name: "Magnate Academy", src: "/logos/magnateacademy.svg", grad: "linear-gradient(135deg, #4c6ef5 0%, #364fc7 100%)" },
  { name: "Magnate Study Abroad", src: "/logos/magnatestudyabroad.svg", grad: "linear-gradient(135deg, #228be6 0%, #1864ab 100%)" },
  { name: "Magnate Global", src: "/logos/magnateglobal.svg", grad: "linear-gradient(135deg, #12b886 0%, #087f5b 100%)" },
];

/* ----- Service 1 props (study abroad ERP) ----- */
export const STUDY_ABROAD_PROPS = {
  pill: "AI-integrated · 10× faster operations",
  heading: "Service No 1 — Automating study abroad industry.",
  sub: "Quotations, students, agents, applications, invoicing, visa tracking, finance — all on one system tuned for the ground reality of the industry.",
  greeting: "Good afternoon, Aswin",
  showcaseLabel: "Study abroad ERP · Live module",
};

/* ----- Service 4 props (industry-neutral bundle) ----- */
export const BUNDLE_PROPS = {
  pill: "Customisable per industry",
  heading: "Shaped around your industry.",
  sub: "Projects, clients, quotations, invoicing, tally, timesheets, finance — every module customised, AI-accelerated, and yours to evolve.",
  greeting: "Good afternoon, Operations",
  showcaseLabel: "ERP + CRM bundle · Customisable · AI-integrated",
};

/* ----- Detail tile data ----- */
export const STUDY_ABROAD_TILES = [
  { icon: "quote", label: "Quotations", body: "Send branded quotes in seconds with auto-updated tuition + currency." },
  { icon: "applications", label: "Applications", body: "Every student application tracked from enquiry to enrollment." },
  { icon: "visa", label: "Visa tracking", body: "Live status board with deadlines, document checklist, and reminders." },
  { icon: "finance", label: "Finance", body: "Invoicing, agent commissions and tally — all on one ledger." },
];

export const WEB_TILES = [
  { icon: "delivery", label: "Fast delivery", body: "From kickoff to launch in weeks, not quarters." },
  { icon: "perf", label: "Performance-first", body: "Lighthouse 95+ baseline. Real users, real devices." },
  { icon: "cms", label: "Editable CMS", body: "Your team owns the content. No tickets for typo fixes." },
  { icon: "analytics", label: "Analytics from day 1", body: "Events wired, dashboards live, decisions data-led." },
];

export const APP_TILES = [
  { icon: "platforms", label: "iOS + Android build", body: "One codebase, native-grade polish on both stores." },
  { icon: "push", label: "Push notifications", body: "Targeted, scheduled, segmented — never spammy." },
  { icon: "offline", label: "Offline-first", body: "Designs that respect tunnels, lifts and bad signal." },
  { icon: "crash", label: "Crash reporting", body: "Sentry-wired from commit one. We see issues before users do." },
];

const INDUSTRIES = ["Healthcare", "Study Abroad", "Consulting", "Retail", "Logistics"];

/* ----- Website project mockups ----- */
const WEB_PROJECTS = [
  {
    name: "Aurora Commerce",
    mockup: "aurora",
    about: "Headless storefront for a boutique outdoor-gear brand. Next.js + Stripe + warehouse sync.",
    url: "https://example.com/aurora",
  },
  {
    name: "Lumen Studio",
    mockup: "lumen",
    about: "Portfolio for an architecture practice. Editorial layout, custom CMS.",
    url: "https://example.com/lumen",
  },
  {
    name: "Mesa Roastery",
    mockup: "mesa",
    about: "D2C coffee subscription. Stripe billing + warehouse fulfilment.",
    url: "https://example.com/mesa",
  },
  {
    name: "Medcity Portal",
    mockup: "vertex",
    about: "Learning management and student visa portal for a major test-prep institute. Next.js + Tailwind + Node.js backend.",
    url: "https://medcityinternationalacademy.com",
  },
];

/* ----- Inline icon set for detail tiles ----- */
function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  switch (name) {
    case "quote":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="14" rx="2" />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="13" y2="15" />
        </svg>
      );
    case "applications":
      return (
        <svg {...common}>
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case "visa":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "finance":
      return (
        <svg {...common}>
          <rect x="2" y="6" width="20" height="13" rx="2" />
          <circle cx="12" cy="12.5" r="2.5" />
          <line x1="6" y1="9.5" x2="6.5" y2="9.5" />
          <line x1="17.5" y1="9.5" x2="18" y2="9.5" />
        </svg>
      );
    case "delivery":
      return (
        <svg {...common}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none" opacity="0.6" />
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "perf":
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 0 1 18 0" />
          <line x1="12" y1="12" x2="16" y2="8" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "cms":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="7" y1="14" x2="12" y2="14" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...common}>
          <polyline points="3 18 9 12 13 16 21 6" />
          <polyline points="15 6 21 6 21 12" />
        </svg>
      );
    case "platforms":
      return (
        <svg {...common}>
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <line x1="11" y1="18" x2="13" y2="18" />
        </svg>
      );
    case "push":
      return (
        <svg {...common}>
          <path d="M6 10a6 6 0 0 1 12 0v4l2 3H4l2-3z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "offline":
      return (
        <svg {...common}>
          <path d="M5 12a7 7 0 0 1 12-5" />
          <path d="M19 12a7 7 0 0 1-12 5" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      );
    case "crash":
      return (
        <svg {...common}>
          <path d="M12 3l2 6h6l-5 4 2 7-5-4-5 4 2-7-5-4h6z" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

/* ----- Reusable Service block wrapper ----- */
function ServiceBlock({ pill, headingNode, sub, children, id, slug }) {
  return (
    <section className="svc-block" id={id}>
      <Reveal className="svc-block__head">
        <span className="svc-block__pill">{pill}</span>
        <h2 className="svc-block__title">{headingNode}</h2>
        {sub && <p className="svc-block__sub">{sub}</p>}
        {slug && (
          <a href={`/services/${slug}`} className="svc-block__link-btn">
            View service details
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </Reveal>
      {children}
      <span className="svc-block__rule" aria-hidden="true" />
    </section>
  );
}

export function DetailTiles({ tiles }) {
  return (
    <div className="svc-tiles">
      {tiles.map((t, i) => (
        <Reveal key={t.label} className="svc-tile" delay={i * 60}>
          <span className="svc-tile__ico">
            <Icon name={t.icon} />
          </span>
          <h3 className="svc-tile__label">{t.label}</h3>
          <p className="svc-tile__body">{t.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

/* ----- Before/After bar chart for Service 1 ----- */
export function BeforeAfter() {
  const TASKS = ["Quotations", "Application tracking", "Invoicing", "Reporting", "Follow-ups"];
  const beforeBars = [88, 72, 80, 64, 76]; // visual lengths (%) for "long" bars
  const afterBars = [22, 18, 26, 16, 20]; // short bars
  const beforeHours = ["12 hrs/wk", "16 hrs/wk", "10 hrs/wk", "8 hrs/wk", "14 hrs/wk"];
  const afterHours = ["1 hr/wk", "2 hrs/wk", "1 hr/wk", "1 hr/wk", "1.5 hrs/wk"];
  return (
    <div className="svc-ba">
      <Reveal className="svc-ba__card svc-ba__card--before">
        <header className="svc-ba__head">
          <span className="svc-ba__tag">Before</span>
          <span className="svc-ba__label">Manual workflows</span>
        </header>
        <ul className="svc-ba__list">
          {TASKS.map((task, i) => (
            <li key={task} className="svc-ba__row">
              <span className="svc-ba__row-label">{task}</span>
              <span className="svc-ba__bar svc-ba__bar--before">
                <span style={{ width: `${beforeBars[i]}%` }} />
              </span>
              <span className="svc-ba__row-val">{beforeHours[i]}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="svc-ba__card svc-ba__card--after" delay={140}>
        <header className="svc-ba__head svc-ba__head--after">
          <span className="svc-ba__tag svc-ba__tag--after">After Revlient</span>
          <span className="svc-ba__kpi">~90% time saved</span>
        </header>
        <ul className="svc-ba__list">
          {TASKS.map((task, i) => (
            <li key={task} className="svc-ba__row">
              <span className="svc-ba__row-label">{task}</span>
              <span className="svc-ba__bar svc-ba__bar--after">
                <span style={{ width: `${afterBars[i]}%` }} />
              </span>
              <span className="svc-ba__row-val svc-ba__row-val--after">{afterHours[i]}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/* ----- Website projects bento (4 cards) ----- */
export function WebProjects() {
  return (
    <div className="svc-webproj">
      {WEB_PROJECTS.map((p, i) => (
        <Reveal
          as="a"
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="svc-webproj__card work-project work-project--standard"
          delay={i * 70}
        >
          <div className="work-project__cover">
            <div className="work-project__live">
              <ProjectMockup kind={p.mockup} />
            </div>
            <span className="work-project__live-badge" aria-hidden="true">
              <span className="work-project__live-dot" />
              Live preview
            </span>
            <span className="work-project__demo">Demo</span>
          </div>
          <div className="work-project__body">
            <div className="work-project__row">
              <h3 className="work-project__name">{p.name}</h3>
              <span className="work-project__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 L17 7" />
                  <path d="M8 7 L17 7 L17 16" />
                </svg>
              </span>
            </div>
            <p className="work-project__about">{p.about}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ----- Web-client marquee (placeholder client wordmarks) ----- */
export function WebClientMarquee() {
  return (
    <div className="svc-webclients">
      <div className="svc-webclients__track">
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <div key={i} className="svc-webclients__card">
            <span className="svc-webclients__grad" style={{ background: l.grad }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="svc-webclients__logo" src={l.src} alt={l.name} loading="lazy" />
            <span className="svc-webclients__sub">CLIENT NAME · WEBSITE</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesHero() {
  const revealWords = "Interfaces, automations, and internal systems shaped with the discipline of product design and the speed of a focused studio.".split(" ");

  return (
    <section className="svc-hero-v2" id="services-hero" aria-labelledby="services-hero-title">
      <div className="svc-hero-v2__backdrop" aria-hidden="true" />
      <div className="svc-hero-v2__grain" aria-hidden="true" />
      <div className="svc-hero-v2__grid">
        <Reveal className="svc-hero-v2__copy">
          <h1 id="services-hero-title" className="svc-hero-v2__title">
            Digital systems
            <span
              className="svc-hero-v2__inline-image"
              aria-hidden="true"
            />
            built with restraint.
          </h1>
          <p className="svc-hero-v2__sub">
            {revealWords.map((word, index) => (
              <span key={`${word}-${index}`} style={{ "--word-index": index }}>
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="svc-hero-v2__cta-row">
            <a href={CTA_HREF} className="svc-hero-v2__cta svc-hero-v2__cta--primary cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
              Free consultation
            </a>
            <a href="#study-abroad-erp" className="svc-hero-v2__cta svc-hero-v2__cta--secondary">
              View services
            </a>
          </div>
        </Reveal>

      </div>
      <div className="svc-hero-v2__marquee" aria-hidden="true">
        <div className="svc-hero-v2__marquee-track">
          {["Websites", "Applications", "ERP", "CRM", "Automation", "Interfaces", "Websites", "Applications", "ERP", "CRM", "Automation", "Interfaces"].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Hero ----- */
function HeroV2() {
  return (
    <section className="svc-hero-v2" id="hero-futuristic">
      {/* Background layers */}
      <div className="svc-hero-v2__bg-deep" aria-hidden="true" />
      <div className="svc-hero-v2__grid" aria-hidden="true" />
      <div className="svc-hero-v2__glow svc-hero-v2__glow--center" aria-hidden="true" />
      <div className="svc-hero-v2__glow svc-hero-v2__glow--left" aria-hidden="true" />
      <div className="svc-hero-v2__glow svc-hero-v2__glow--right" aria-hidden="true" />
      <div className="svc-hero-v2__beam svc-hero-v2__beam--1" aria-hidden="true" />
      <div className="svc-hero-v2__beam svc-hero-v2__beam--2" aria-hidden="true" />

      {/* Floating particles */}
      <div className="svc-hero-v2__particles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => {
          const left = (i * 17) % 91 + 5;
          const top = (i * 23 + 11) % 86 + 5;
          const delay = ((i * 0.7) % 8).toFixed(1);
          const duration = (4 + (i * 1.3) % 6).toFixed(1);
          const size = (1.5 + (i * 0.3) % 2).toFixed(1);
          return (
            <span
              key={i}
              className="svc-hero-v2__particle"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
      </div>

      {/* Scan line */}
      <div className="svc-hero-v2__scanline" aria-hidden="true" />

      <div className="svc-hero-v2__inner">
        {/* Status bar */}
        <Reveal>
          <div className="svc-hero-v2__status-bar">
            <span className="svc-hero-v2__status-indicator">
              <span className="svc-hero-v2__status-dot" />
              Systems Online
            </span>
            <span className="svc-hero-v2__status-separator" />
            <span className="svc-hero-v2__status-tag">v3.2 · Infrastructure</span>
          </div>
        </Reveal>

        {/* Pill */}
        <Reveal delay={80}>
          <span className="svc-hero-v2__pill">
            <span className="svc-hero-v2__pill-dot">Services</span>
            What we design, engineer and ship
          </span>
        </Reveal>

        {/* Title */}
        <Reveal delay={160}>
          <h1 className="svc-hero-v2__title">
            What we build,<br />
            <span className="svc-hero-v2__title-accent">end-to-end.</span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={240}>
          <p className="svc-hero-v2__sub">
            ERP, websites, apps and automation — designed and shipped by one
            studio. No handoffs, no agency stitching.
          </p>
        </Reveal>

        {/* CTA Row */}
        <Reveal delay={320}>
          <div className="svc-hero-v2__cta-row">
            <a href={CTA_HREF} className="svc-hero-v2__cta">
              <span className="svc-hero-v2__cta-glow" />
              Talk to the studio
            </a>
            <a href="#study-abroad-erp" className="svc-hero-v2__cta-secondary">
              Explore services
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14" /><path d="M6 11l6 6 6-6" /></svg>
            </a>
          </div>
        </Reveal>

        {/* Metrics strip */}
        <Reveal delay={380}>
          <div className="svc-hero-v2__metrics">
            {[
              { val: "4", label: "Service pillars" },
              { val: "10×", label: "Faster operations" },
              { val: "99.9%", label: "Uptime SLA" },
              { val: "AI", label: "Accelerated" },
            ].map((m) => (
              <div key={m.label} className="svc-hero-v2__metric">
                <span className="svc-hero-v2__metric-val">{m.val}</span>
                <span className="svc-hero-v2__metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Dashboard */}
        <Reveal delay={450}>
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}

/* Ultra-premium futuristic dashboard mockup with electric blue
   accent lighting, perspective tilt, and glassmorphic surfaces. */
function HeroDashboard() {
  return (
    <div className="svc-hero-v2__dashboard" aria-hidden="true">
      <div className="svc-hero-v2__dashboard-halo" />
      <div className="svc-hero-v2__dashboard-frame">
        {/* Browser chrome */}
        <div className="svc-hero-v2__dash-bar">
          <span className="svc-hero-v2__dash-dot svc-hero-v2__dash-dot--red" />
          <span className="svc-hero-v2__dash-dot svc-hero-v2__dash-dot--yellow" />
          <span className="svc-hero-v2__dash-dot svc-hero-v2__dash-dot--green" />
          <span className="svc-hero-v2__dash-url">
            <span className="svc-hero-v2__dash-lock">🔒</span>
            erp.revlient.com
          </span>
        </div>

        {/* Dashboard body */}
        <div className="svc-hero-v2__dash-body">
          {/* Sidebar */}
          <aside className="svc-hero-v2__dash-side">
            <div className="svc-hero-v2__dash-brand">
              <span className="svc-hero-v2__dash-mark" />
              <span>Revlient</span>
            </div>
            {["Dashboard", "Pipeline", "Projects", "Assets", "Reports", "Settings"].map((l, i) => (
              <div key={l} className={`svc-hero-v2__dash-link ${i === 0 ? "is-active" : ""}`}>
                <span className="svc-hero-v2__dash-link-icon" />
                {l}
              </div>
            ))}
            <div className="svc-hero-v2__dash-side-footer">
              <span className="svc-hero-v2__dash-avatar" />
              <div className="svc-hero-v2__dash-user">
                <span className="svc-hero-v2__dash-username">Kevin R.</span>
                <span className="svc-hero-v2__dash-role">Admin</span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="svc-hero-v2__dash-main">
            <div className="svc-hero-v2__dash-main-top">
              <div>
                <div className="svc-hero-v2__dash-title">Good afternoon, Kevin</div>
                <div className="svc-hero-v2__dash-meta">
                  <span className="svc-hero-v2__dash-meta-dot" />
                  Saturday · Mission control
                </div>
              </div>
              <div className="svc-hero-v2__dash-actions">
                <span className="svc-hero-v2__dash-action-btn">+ New project</span>
                <span className="svc-hero-v2__dash-action-btn svc-hero-v2__dash-action-btn--ghost">Export</span>
              </div>
            </div>

            {/* KPI row */}
            <div className="svc-hero-v2__dash-kpis">
              {[
                { label: "REVENUE", val: "₹24.8L", delta: "+18.2%", up: true },
                { label: "PIPELINE", val: "₹12.4L", delta: "+9.6%", up: true },
                { label: "QUOTATIONS", val: "47", delta: "12 open", up: true },
                { label: "ACTIVE PROJECTS", val: "8", delta: "3 milestones", up: true },
              ].map((k) => (
                <div key={k.label} className="svc-hero-v2__dash-kpi">
                  <span className="svc-hero-v2__dash-kpi-label">{k.label}</span>
                  <span className="svc-hero-v2__dash-kpi-val">{k.val}</span>
                  <span className={`svc-hero-v2__dash-kpi-delta ${k.up ? "is-up" : ""}`}>
                    {k.up && "↑ "}{k.delta}
                  </span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="svc-hero-v2__dash-chart">
              <div className="svc-hero-v2__dash-chart-header">
                <span className="svc-hero-v2__dash-chart-title">Revenue Overview</span>
                <span className="svc-hero-v2__dash-chart-period">Last 12 months</span>
              </div>
              <svg viewBox="0 0 400 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dash-grad-purple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </linearGradient>
                  <linearGradient id="line-grad-purple" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f0d3ff" />
                  </linearGradient>
                </defs>
                <polygon points="0,85 30,78 70,80 110,68 150,60 190,52 230,44 270,38 310,42 350,30 390,26 400,24 400,100 0,100" fill="url(#dash-grad-purple)" />
                <polyline points="0,85 30,78 70,80 110,68 150,60 190,52 230,44 270,38 310,42 350,30 390,26 400,24" fill="none" stroke="url(#line-grad-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Glow dot on latest point */}
                <circle cx="400" cy="24" r="4" fill="#ffffff" opacity="0.8" />
                <circle cx="400" cy="24" r="8" fill="#ffffff" opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection line at base */}
      <div className="svc-hero-v2__dashboard-reflection" />
    </div>
  );
}

function LogoMarquee() {
  return (
    <section className="svc-marquee-v2">
      <div className="svc-marquee-v2__track">
        {[...LOGOS, ...LOGOS].map((l, i) => (
          <a
            key={i}
            href="#"
            className="svc-marquee-v2__card"
            aria-label={l.name}
            onClick={(e) => e.preventDefault()}
          >
            <span className="svc-marquee-v2__grad" style={{ background: l.grad }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="svc-marquee-v2__logo" src={l.src} alt={l.name} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="svc-cta-v2">
      <video
        className="svc-cta-v2__video"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <Reveal className="svc-cta-v2__inner">
        <h2 className="svc-cta-v2__title">
          Let&apos;s build something <em>lasting.</em>
        </h2>
        <p className="svc-cta-v2__sub">
          Tell us what you&apos;re building. The first conversation is always free.
        </p>
        <a href={CTA_HREF} className="svc-cta-v2__btn cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
          Free consultation
        </a>
        <div className="svc-cta-v2__meta">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span>·</span>
          <span>Kerala, India</span>
        </div>
      </Reveal>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div className="services-page-v3">
      <Nav className="services-page-v3-nav" />

      {/* Hero Section */}
      <section className="services-hero-v3">
        <div className="services-hero-v3__bg" aria-hidden="true" />
        <div className="services-hero-v3__content">
          <Reveal>
            <h1 className="services-hero-v3__title">Our Services</h1>
          </Reveal>
        </div>
      </section>

      {/* Services Grid List */}
      <section className="services-list-v3">
        <div className="services-list-v3__container">
          
          {/* Service 1: Web Design */}
          <div className="services-row-v3" id="web-design">
            <div className="services-row-v3__content-col">
              <Reveal>
                <span className="services-row-v3__tag">Layout & Aesthetics</span>
                <h2 className="services-row-v3__title">Web Design</h2>
                <p className="services-row-v3__desc">
                  Tailored interface layouts and responsive web designs crafted to reflect your brand's unique narrative. We focus on premium aesthetics, clean typography, and interactive fluidity.
                </p>
                <div className="services-row-v3__details">
                  <span className="services-row-v3__detail-item">Responsive Layouts</span>
                  <span className="services-row-v3__detail-item">Custom Typography</span>
                  <span className="services-row-v3__detail-item">Interactive Prototypes</span>
                </div>
                <a href={CTA_HREF} className="services-row-v3__link cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
                  <span>Free consultation</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            </div>
            <div className="services-row-v3__visual-col">
              <Reveal className="services-row-v3__mockup-wrapper">
                <img 
                  src="/services/webdevservice.png" 
                  alt="Web Design Visual Mockup" 
                  className="services-row-v3__img"
                />
              </Reveal>
            </div>
          </div>

          {/* Service 2: Study abroad OS */}
          <div className="services-row-v3" id="study-abroad-os">
            <div className="services-row-v3__content-col">
              <Reveal>
                <span className="services-row-v3__tag">ERP & CRM Architectures</span>
                <h2 className="services-row-v3__title">Study abroad OS</h2>
                <p className="services-row-v3__desc">
                  A complete operational engine for study abroad agencies. Manage quotations, students, applications, invoicing, visa tracking, and partner commissions in real-time.
                </p>
                <div className="services-row-v3__details">
                  <span className="services-row-v3__detail-item">Student Pipeline</span>
                  <span className="services-row-v3__detail-item">Automated Invoicing</span>
                  <span className="services-row-v3__detail-item">Visa Document Checklists</span>
                </div>
                <a href="/services/automation-systems" className="services-row-v3__link">
                  <span>View system details</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            </div>
            <div className="services-row-v3__visual-col">
              <Reveal className="services-row-v3__mockup-wrapper">
                <video
                  src="/work/saas-demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="services-row-v3__img"
                  style={{ borderRadius: "20px", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Reveal>
            </div>
          </div>

          {/* Service 3: App Development */}
          <div className="services-row-v3" id="app-development">
            <div className="services-row-v3__content-col">
              <Reveal>
                <span className="services-row-v3__tag">iOS / Android / Web</span>
                <h2 className="services-row-v3__title">App Development</h2>
                <p className="services-row-v3__desc">
                  High-performance mobile and cross-platform apps designed to feel natively polished on every screen. Backed by offline-first architectures and instant notifications.
                </p>
                <div className="services-row-v3__details">
                  <span className="services-row-v3__detail-item">Native Performance</span>
                  <span className="services-row-v3__detail-item">Cross-Platform Builds</span>
                  <span className="services-row-v3__detail-item">Offline-First Sync</span>
                </div>
                <a href="/services/application-development" className="services-row-v3__link">
                  <span>View application services</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            </div>
            <div className="services-row-v3__visual-col">
              <Reveal className="services-row-v3__mockup-wrapper">
                <img 
                  src="/services/app_development_service.png" 
                  alt="App Development Mockup" 
                  className="services-row-v3__img"
                />
              </Reveal>
            </div>
          </div>

          {/* Service 4: E-commerce setup */}
          <div className="services-row-v3" id="ecommerce-setup">
            <div className="services-row-v3__content-col">
              <Reveal>
                <span className="services-row-v3__tag">Storefronts & Billing</span>
                <h2 className="services-row-v3__title">E-commerce setup</h2>
                <p className="services-row-v3__desc">
                  Sleek, headless e-commerce architectures integrated with Stripe billing, real-time inventory tracking, and automated fulfillment workflows.
                </p>
                <div className="services-row-v3__details">
                  <span className="services-row-v3__detail-item">Headless Storefronts</span>
                  <span className="services-row-v3__detail-item">Stripe Integration</span>
                  <span className="services-row-v3__detail-item">Inventory Automation</span>
                </div>
                <a href="/services/web-development" className="services-row-v3__link">
                  <span>View e-commerce storefronts</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            </div>
            <div className="services-row-v3__visual-col">
              <Reveal className="services-row-v3__mockup-wrapper">
                <img 
                  src="/services/ecom.png" 
                  alt="E-commerce setup" 
                  className="services-row-v3__img"
                />
              </Reveal>
            </div>
          </div>

          {/* Service 5: AI automation */}
          <div className="services-row-v3" id="ai-automation">
            <div className="services-row-v3__content-col">
              <Reveal>
                <span className="services-row-v3__tag">Chatbots & Integrations</span>
                <h2 className="services-row-v3__title">AI automation</h2>
                <p className="services-row-v3__desc">
                  Intelligent AI WhatsApp chatbots integrated directly with your ERP, custom databases, and existing operations to handle customer queries, bookings, and notifications.
                </p>
                <div className="services-row-v3__details">
                  <span className="services-row-v3__detail-item">WhatsApp API Chatbots</span>
                  <span className="services-row-v3__detail-item">ERP Database Integration</span>
                  <span className="services-row-v3__detail-item">Custom LLM Workflows</span>
                </div>
                <a href={CTA_HREF} className="services-row-v3__link cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
                  <span>Free consultation</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            </div>
            <div className="services-row-v3__visual-col">
              <Reveal className="services-row-v3__mockup-wrapper">
                <img 
                  src="/services/aiassistant.png" 
                  alt="AI assistant setup" 
                  className="services-row-v3__img"
                />
              </Reveal>
            </div>
          </div>

          {/* Service 6: UI/UX */}
          <div className="services-row-v3" id="ui-ux">
            <div className="services-row-v3__content-col">
              <Reveal>
                <span className="services-row-v3__tag">UI/UX Design</span>
                <h2 className="services-row-v3__title">UI/UX Design</h2>
                <p className="services-row-v3__desc">
                  We shape high-fidelity interfaces and custom design systems. Our digital blueprints blend elegant brand storytelling with intuitive interaction mechanics.
                </p>
                <div className="services-row-v3__details">
                  <span className="services-row-v3__detail-item">Interactive Mockups</span>
                  <span className="services-row-v3__detail-item">Vector Style Guides</span>
                  <span className="services-row-v3__detail-item">Typographic Scales</span>
                </div>
                <a href={CTA_HREF} className="services-row-v3__link cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
                  <span>Free consultation</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </Reveal>
            </div>
            <div className="services-row-v3__visual-col">
              <Reveal className="services-row-v3__mockup-wrapper">
                <img 
                  src="/experience-design-mockup.png" 
                  alt="Experience Design Map Mockup" 
                  className="services-row-v3__img"
                />
              </Reveal>
            </div>
          </div>

        </div>
      </section>

      <LogoMarquee />
    </div>
  );
}
