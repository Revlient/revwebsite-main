"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import WorkFeatureSection from "./WorkFeatureSection";
import AppShowcase from "./AppShowcase";
import AppFeatures from "./AppFeatures";
import BlueGlobe from "./BlueGlobe";
import ProjectMockup from "./work/ProjectMockups";
import { CTA_HREF, CONTACT_EMAIL } from "../lib/site";

/* /services — Proxima-style dark + magenta landing.
   Four service sections (Study abroad ERP / Websites / Apps /
   ERP+CRM bundle) below the hero + logo marquee, then the closing
   CTA. Theme + styles locked from the previous v2 pass. */

const VIDEO_SRC = "/whyrev/blackhole.mp4";

const LOGOS = [
  { name: "Procure", src: "https://svgl.app/library/procure.svg", grad: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" },
  { name: "Shopify", src: "https://svgl.app/library/shopify.svg", grad: "linear-gradient(135deg, #fde047 0%, #ca8a04 100%)" },
  { name: "Blender", src: "https://svgl.app/library/blender.svg", grad: "linear-gradient(135deg, #60a5fa 0%, #1e40af 100%)" },
  { name: "Figma", src: "https://svgl.app/library/figma.svg", grad: "linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)" },
  { name: "Spotify", src: "https://svgl.app/library/spotify.svg", grad: "linear-gradient(135deg, #fb7185 0%, #be123c 100%)" },
  { name: "Lottielab", src: "https://svgl.app/library/lottielab.svg", grad: "linear-gradient(135deg, #facc15 0%, #65a30d 100%)" },
  { name: "Google Cloud", src: "https://svgl.app/library/google-cloud.svg", grad: "linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)" },
  { name: "Bing", src: "https://svgl.app/library/bing.svg", grad: "linear-gradient(135deg, #67e8f9 0%, #0891b2 100%)" },
];

/* ----- Service 1 props (study abroad ERP) ----- */
const STUDY_ABROAD_PROPS = {
  pill: "AI-integrated · 10× faster operations",
  heading: "Built for study abroad agencies.",
  sub: "Quotations, students, agents, applications, invoicing, visa tracking, finance — all on one system tuned for the ground reality of the industry.",
  greeting: "Good afternoon, Aswin",
  showcaseLabel: "Study abroad ERP · Live module",
};

/* ----- Service 4 props (industry-neutral bundle) ----- */
const BUNDLE_PROPS = {
  pill: "Customisable per industry",
  heading: "Shaped around your industry.",
  sub: "Projects, clients, quotations, invoicing, tally, timesheets, finance — every module customised, AI-accelerated, and yours to evolve.",
  greeting: "Good afternoon, Operations",
  showcaseLabel: "ERP + CRM bundle · Customisable · AI-integrated",
};

/* ----- Detail tile data ----- */
const STUDY_ABROAD_TILES = [
  { icon: "quote", label: "Quotations", body: "Send branded quotes in seconds with auto-updated tuition + currency." },
  { icon: "applications", label: "Applications", body: "Every student application tracked from enquiry to enrollment." },
  { icon: "visa", label: "Visa tracking", body: "Live status board with deadlines, document checklist, and reminders." },
  { icon: "finance", label: "Finance", body: "Invoicing, agent commissions and tally — all on one ledger." },
];

const WEB_TILES = [
  { icon: "delivery", label: "Fast delivery", body: "From kickoff to launch in weeks, not quarters." },
  { icon: "perf", label: "Performance-first", body: "Lighthouse 95+ baseline. Real users, real devices." },
  { icon: "cms", label: "Editable CMS", body: "Your team owns the content. No tickets for typo fixes." },
  { icon: "analytics", label: "Analytics from day 1", body: "Events wired, dashboards live, decisions data-led." },
];

const APP_TILES = [
  { icon: "platforms", label: "iOS + Android build", body: "One codebase, native-grade polish on both stores." },
  { icon: "push", label: "Push notifications", body: "Targeted, scheduled, segmented — never spammy." },
  { icon: "offline", label: "Offline-first", body: "Designs that respect tunnels, lifts and bad signal." },
  { icon: "crash", label: "Crash reporting", body: "Sentry-wired from commit one. We see issues before users do." },
];

const INDUSTRIES = ["Healthcare", "Study Abroad", "Consulting", "Retail", "TODO industry"];

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
    name: "Client Project",
    mockup: "vertex",
    about: "TODO — placeholder project. Replace with real case study before launch.",
    url: "https://example.com/todo",
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
function ServiceBlock({ pill, headingNode, sub, children, id }) {
  return (
    <section className="svc-block" id={id}>
      <Reveal className="svc-block__head">
        <span className="svc-block__pill">{pill}</span>
        <h2 className="svc-block__title">{headingNode}</h2>
        {sub && <p className="svc-block__sub">{sub}</p>}
      </Reveal>
      {children}
      <span className="svc-block__rule" aria-hidden="true" />
    </section>
  );
}

function DetailTiles({ tiles }) {
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
function BeforeAfter() {
  const TASKS = ["Quotations", "Application tracking", "Invoicing", "Reporting", "Follow-ups"];
  const beforeBars = [88, 72, 80, 64, 76]; // visual lengths (%) for "long" bars
  const afterBars = [22, 18, 26, 16, 20]; // short bars
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
              <span className="svc-ba__row-val">TODO hrs/wk</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="svc-ba__card svc-ba__card--after" delay={140}>
        <header className="svc-ba__head svc-ba__head--after">
          <span className="svc-ba__tag svc-ba__tag--after">After Revlient</span>
          <span className="svc-ba__kpi">~TODO% time saved</span>
        </header>
        <ul className="svc-ba__list">
          {TASKS.map((task, i) => (
            <li key={task} className="svc-ba__row">
              <span className="svc-ba__row-label">{task}</span>
              <span className="svc-ba__bar svc-ba__bar--after">
                <span style={{ width: `${afterBars[i]}%` }} />
              </span>
              <span className="svc-ba__row-val svc-ba__row-val--after">TODO hrs/wk</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/* ----- Website projects bento (4 cards) ----- */
function WebProjects() {
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
function WebClientMarquee() {
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

/* ----- Hero ----- */
function HeroV2() {
  return (
    <section className="svc-hero-v2">
      <video
        className="svc-hero-v2__video"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <span className="svc-hero-v2__halo" aria-hidden="true" />
      <span className="svc-hero-v2__grid" aria-hidden="true" />

      <div className="svc-hero-v2__inner">
        <Reveal>
          <span className="svc-hero-v2__pill">
            <span className="svc-hero-v2__pill-dot">Services</span>
            Our services — what we build, end-to-end
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="svc-hero-v2__title">
            What we build,<br />
            end-to-end.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="svc-hero-v2__sub">
            ERP, websites, apps and automation — designed and shipped by one
            studio. No handoffs, no agency stitching.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <a href={CTA_HREF} className="svc-hero-v2__cta">
            Talk to the studio
          </a>
        </Reveal>

        <Reveal delay={400}>
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}

/* Hero dashboard preview (smaller browser-frame mockup that echoes
   the WorkFeatureSection visual without rendering the whole locked
   component twice on the page). */
function HeroDashboard() {
  return (
    <div className="svc-hero-v2__dashboard" aria-hidden="true">
      <div className="svc-hero-v2__dashboard-frame">
        <div className="svc-hero-v2__dash-bar">
          <span className="svc-hero-v2__dash-dot" />
          <span className="svc-hero-v2__dash-dot" />
          <span className="svc-hero-v2__dash-dot" />
          <span className="svc-hero-v2__dash-url">erp.revlient.com</span>
        </div>
        <div className="svc-hero-v2__dash-body">
          <aside className="svc-hero-v2__dash-side">
            <div className="svc-hero-v2__dash-brand">
              <span className="svc-hero-v2__dash-mark" />
              <span>Revlient</span>
            </div>
            {["Dashboard", "Pipeline", "Projects", "Assets", "Reports", "Settings"].map((l) => (
              <div key={l} className="svc-hero-v2__dash-link">{l}</div>
            ))}
          </aside>
          <div className="svc-hero-v2__dash-main">
            <div className="svc-hero-v2__dash-title">Good afternoon, Kevin</div>
            <div className="svc-hero-v2__dash-meta">Saturday · Mission control</div>
            <div className="svc-hero-v2__dash-kpis">
              {[
                { label: "REVENUE", val: "TODO L", delta: "+TODO%" },
                { label: "PIPELINE", val: "TODO L", delta: "+TODO%" },
                { label: "QUOTATIONS", val: "TODO", delta: "TODO open" },
                { label: "ACTIVE PROJECTS", val: "TODO", delta: "TODO milestone" },
              ].map((k) => (
                <div key={k.label} className="svc-hero-v2__dash-kpi">
                  <span className="svc-hero-v2__dash-kpi-label">{k.label}</span>
                  <span className="svc-hero-v2__dash-kpi-val">{k.val}</span>
                  <span className="svc-hero-v2__dash-kpi-delta">{k.delta}</span>
                </div>
              ))}
            </div>
            <div className="svc-hero-v2__dash-chart">
              <svg viewBox="0 0 400 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dash-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(192,132,252,0.5)" />
                    <stop offset="100%" stopColor="rgba(192,132,252,0)" />
                  </linearGradient>
                </defs>
                <polyline points="0,80 50,72 100,76 150,60 200,52 250,40 300,46 350,28 400,32" fill="none" stroke="#c084fc" strokeWidth="2" />
                <polygon points="0,80 50,72 100,76 150,60 200,52 250,40 300,46 350,28 400,32 400,100 0,100" fill="url(#dash-grad)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <span className="svc-hero-v2__dashboard-halo" />
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
        <a href={CTA_HREF} className="svc-cta-v2__btn">
          Start a project
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="svc-shell svc-shell--v2">
      <header className={`svc-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a href="/" className="svc-nav__brand">Revlient</a>
        <nav className="svc-nav__links" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/process">Process</a>
          <a href="/work">Work</a>
          <a href={CTA_HREF}>Contact</a>
        </nav>
      </header>

      <HeroV2 />
      <LogoMarquee />

      {/* Service 1 — Study abroad ERP (major) */}
      <ServiceBlock
        id="study-abroad-erp"
        pill="Nº 01 · Major product"
        headingNode={
          <>
            Automation for study abroad <em>agencies.</em>
          </>
        }
        sub="Our flagship ERP — tuned for the messy, paper-heavy ground reality of running a study abroad agency."
      >
        {/* full-bleed ERP showcase with BlueGlobe behind — ~35% peeks
            above the frame, ~65% sits behind the glassmorphic
            dashboard. */}
        <div className="svc-erp-stage">
          <div className="svc-erp-stage__globe" aria-hidden="true">
            <BlueGlobe />
          </div>
          <div className="svc-erp-stage__frame">
            <WorkFeatureSection {...STUDY_ABROAD_PROPS} />
          </div>
        </div>
        {/* constrained tiles + chart */}
        <div className="svc-block__inner">
          <DetailTiles tiles={STUDY_ABROAD_TILES} />
          <BeforeAfter />
        </div>
      </ServiceBlock>

      {/* Service 2 — Websites */}
      <ServiceBlock
        id="websites"
        pill="Nº 02 · Web"
        headingNode={
          <>
            Websites that <em>convert,</em> and last.
          </>
        }
        sub="Brand, marketing and product sites built for performance, accessibility, and the long haul."
      >
        <div className="svc-block__inner">
          <DetailTiles tiles={WEB_TILES} />
          <WebProjects />
        </div>
        {/* full-bleed marquee */}
        <WebClientMarquee />
      </ServiceBlock>

      {/* Service 3 — Apps */}
      <ServiceBlock
        id="apps"
        pill="Nº 03 · Mobile / Web apps"
        headingNode={
          <>
            Apps that feel <em>native,</em> on every screen.
          </>
        }
        sub="Product-grade applications — iOS, Android and web — with the polish stores reward."
      >
        {/* full-bleed app sections */}
        <AppShowcase />
        <AppFeatures />
        {/* constrained chip row */}
        <div className="svc-block__inner">
          <DetailTiles tiles={APP_TILES} />
        </div>
      </ServiceBlock>

      {/* Service 4 — ERP + CRM bundle */}
      <ServiceBlock
        id="bundle"
        pill="Nº 04 · Bundle"
        headingNode={
          <>
            The ERP + CRM <em>bundle,</em> for any industry.
          </>
        }
        sub="One workspace shaped around how your industry actually works. We've shipped it for healthcare, study abroad, consulting, retail — and we'll shape one for yours."
      >
        {/* full-bleed bundle showcase */}
        <WorkFeatureSection {...BUNDLE_PROPS} />
        <div className="svc-block__inner">
          <div className="svc-industries">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind}
                className={`svc-industries__pill${
                  ind.startsWith("TODO") ? " svc-industries__pill--todo" : ""
                }`}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </ServiceBlock>

      <ClosingCTA />
    </div>
  );
}
