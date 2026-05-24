"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import WorkFeatureSection from "./WorkFeatureSection";
import { CTA_HREF, CONTACT_EMAIL } from "../lib/site";

/* /services — Proxima-style dark-magenta landing.
   - Hero: pill + huge sans heading + gradient CTA + glowing dashboard
     preview, with the black-hole video bleeding behind it (screen blend).
   - Logo marquee strip.
   - "Faster. Smarter." 3+2 feature-tile grid with glowing icons.
   - WorkFeatureSection (locked) reused with CRM-for-clients props as
     the centerpiece for the major service.
   - Compact "other pillars" strip for Web / Software / App / Automation.
   - Closing CTA with a second black-hole video bleed at low opacity. */

const VIDEO_SRC = "/whyrev/blackhole.mp4";

const CRM_PROPS = {
  pill: "Included with every active project",
  heading: "CRM access for clients.",
  sub: "Every active engagement comes with a private CRM workspace — track project phases live, transfer assets, raise enquiries, and watch the build pulse in real time.",
  greeting: "Good afternoon, Kevin",
  showcaseLabel: "Client portal · Project phases · Asset transfer · Enquiries",
};

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

const OTHER_SERVICES = [
  { slug: "web-development", title: "Web Development", body: "Brand & marketing sites, 3D / WebGL, performance-first builds." },
  { slug: "software-development", title: "Software Development", body: "Custom platforms, APIs & integrations, internal tools." },
  { slug: "application-development", title: "Application Development", body: "Web + mobile products, UX research, product design." },
  { slug: "automation-systems", title: "Automation Systems", body: "Workflow automation, AI integrations, process & ops." },
];

const FEATURES = [
  {
    span: "sm",
    label: "Real-time CRM updates",
    body: "Every project phase, asset and enquiry shows up the moment it changes — no refresh, no chasing.",
    icon: "ring",
  },
  {
    span: "sm",
    label: "Instant insights",
    body: "Dashboards your team will actually open. Metrics they can act on, not screenshots from a deck.",
    icon: "chart",
  },
  {
    span: "sm",
    label: "Effortless reporting",
    body: "Reports that compose themselves from the live data. Send them, embed them, schedule them — no design pass needed.",
    icon: "doc",
  },
  {
    span: "lg",
    label: "Lightning fast onboarding",
    body: "From handshake to active workspace in days, not quarters. Your team's first login feels considered, not generic.",
    icon: "bolt",
  },
  {
    span: "lg",
    label: "Intelligent targeting",
    body: "AI-assisted segmentation, scoring and routing — built around your funnel, not on top of a generic SaaS schema.",
    icon: "grid",
  },
];

/* ----- Small icon set ----- */
function IconRing() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <radialGradient id="ring-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f0d3ff" />
          <stop offset="55%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="rgba(192,132,252,0)" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(192,132,252,0.4)" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(192,132,252,0.7)" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="14" fill="url(#ring-glow)" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <rect x="14" y="44" width="10" height="22" rx="2" fill="#c084fc" opacity="0.85" />
      <rect x="30" y="32" width="10" height="34" rx="2" fill="#c084fc" opacity="0.95" />
      <rect x="46" y="22" width="10" height="44" rx="2" fill="#a855f7" />
      <circle cx="58" cy="20" r="8" fill="rgba(192,132,252,0.25)" stroke="rgba(192,132,252,0.7)" strokeWidth="1" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <rect x="20" y="14" width="40" height="52" rx="4" fill="none" stroke="rgba(192,132,252,0.7)" strokeWidth="1.5" />
      <line x1="28" y1="28" x2="52" y2="28" stroke="rgba(192,132,252,0.7)" strokeWidth="2" />
      <line x1="28" y1="38" x2="46" y2="38" stroke="rgba(192,132,252,0.5)" strokeWidth="2" />
      <line x1="28" y1="48" x2="50" y2="48" stroke="rgba(192,132,252,0.5)" strokeWidth="2" />
      <line x1="28" y1="58" x2="40" y2="58" stroke="rgba(192,132,252,0.5)" strokeWidth="2" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="bolt-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(192,132,252,0.85)" />
          <stop offset="100%" stopColor="rgba(192,132,252,0)" />
        </radialGradient>
        <linearGradient id="bolt-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d3ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#bolt-glow)" />
      <polygon
        points="58 18, 38 64, 56 64, 52 102, 80 50, 60 50, 64 18"
        fill="url(#bolt-fill)"
      />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="grid-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(240, 211, 255, 0.95)" />
          <stop offset="60%" stopColor="rgba(192,132,252,0.35)" />
          <stop offset="100%" stopColor="rgba(192,132,252,0)" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#grid-glow)" />
      <rect x="38" y="38" width="44" height="44" rx="10" fill="rgba(255,255,255,0.92)" />
      <g fill="#c084fc">
        <rect x="48" y="48" width="10" height="10" rx="2" />
        <rect x="62" y="48" width="10" height="10" rx="2" />
        <rect x="48" y="62" width="10" height="10" rx="2" />
        <rect x="62" y="62" width="10" height="10" rx="2" />
      </g>
    </svg>
  );
}

const ICONS = { ring: IconRing, chart: IconChart, doc: IconDoc, bolt: IconBolt, grid: IconGrid };

/* ----- Hero dashboard preview (a smaller in-card mockup that mirrors
   WorkFeatureSection's visual without duplicating the full section) ----- */
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

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
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
            <span className="svc-hero-v2__pill-dot">New</span>
            TODO CRM release line · book a demo
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="svc-hero-v2__title">
            Revolutionising the way<br />
            studios ship CRM systems.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="svc-hero-v2__sub">
            One workspace for projects, assets and clients — built for the
            studios that build everything else.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <a href={CTA_HREF} className="svc-hero-v2__cta">
            Book a demo
          </a>
        </Reveal>

        <Reveal delay={400}>
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}

/* ----- Logo marquee (reused logic from VideoHero) ----- */
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

/* ----- Feature tiles (3 + 2) ----- */
function Features() {
  return (
    <section className="svc-feat">
      <Reveal className="svc-feat__head">
        <span className="svc-feat__pill">Why teams choose us</span>
        <h2 className="svc-feat__title">
          Faster. <em>Smarter.</em>
          <br />
          Built for studio teams.
        </h2>
        <p className="svc-feat__sub">
          Every tile here is a design decision we've already made for you.
        </p>
      </Reveal>

      <div className="svc-feat__grid">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon];
          return (
            <Reveal
              key={f.label}
              className={`svc-feat__tile svc-feat__tile--${f.span}`}
              delay={i * 80}
            >
              <span className="svc-feat__icon">
                <Icon />
              </span>
              <h3 className="svc-feat__tile-label">{f.label}</h3>
              <p className="svc-feat__tile-body">{f.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ----- Other pillars strip ----- */
function OtherPillars() {
  return (
    <section className="svc-others">
      <Reveal className="svc-others__head">
        <span className="svc-feat__pill">More we ship</span>
        <h2 className="svc-feat__title">
          The other <em>pillars.</em>
        </h2>
      </Reveal>
      <div className="svc-others__strip">
        {OTHER_SERVICES.map((s, i) => (
          <Reveal as="a" key={s.slug} href={`/services/${s.slug}`} className="svc-others__card" delay={i * 60}>
            <div className="svc-others__card-row">
              <h3 className="svc-others__card-title">{s.title}</h3>
              <span className="svc-others__card-arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </div>
            <p className="svc-others__card-body">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----- Closing CTA section with second video bleed ----- */
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
          Let's build something <em>lasting.</em>
        </h2>
        <p className="svc-cta-v2__sub">
          Tell us what you&apos;re building. The first conversation is always
          free.
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
      <Features />
      <WorkFeatureSection {...CRM_PROPS} />
      <OtherPillars />
      <ClosingCTA />
    </div>
  );
}
