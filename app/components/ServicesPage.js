"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import { CTA_HREF, CONTACT_EMAIL } from "../lib/site";

/* Arcane Finance-style /services landing — adapted to vanilla JS +
   plain CSS. framer-motion's whileInView is replaced by the existing
   Reveal IntersectionObserver; continuous loops run on CSS keyframes;
   lucide-react becomes inline SVG. Pure CSS for the arch + orb (no
   images, no 3D libs). prefers-reduced-motion freezes every loop. */

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
  );
}

function DustParticles() {
  // 26 deterministic positions so SSR + hydrate agree.
  const dust = useMemo(() => {
    const out = [];
    for (let i = 0; i < 26; i++) {
      out.push({
        left: (i * 37 + 7) % 100,
        size: 1.5 + ((i * 0.7) % 2.5),
        delay: -((i * 0.83) % 14),
        dur: 14 + ((i * 1.3) % 8),
      });
    }
    return out;
  }, []);
  return (
    <div className="svc-dust" aria-hidden="true">
      {dust.map((d, i) => (
        <span
          key={i}
          className="svc-dust__p"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function Starfield() {
  const stars = useMemo(() => {
    const out = [];
    for (let i = 0; i < 38; i++) {
      out.push({
        top: (i * 53) % 100,
        left: (i * 71 + 11) % 100,
        size: 1 + ((i * 0.4) % 1.5),
        delay: -((i * 0.91) % 5),
        dur: 3 + ((i * 1.1) % 4),
      });
    }
    return out;
  }, []);
  return (
    <div className="svc-stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="svc-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    // Touch / coarse-pointer devices: skip the glow entirely.
    const fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let raf = 0;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      node.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} className="svc-cursor" aria-hidden="true" />;
}

function Arch() {
  return (
    <div className="svc-arch" aria-hidden="true">
      <span className="svc-arch__halo" />
      <span className="svc-arch__shape" />
      <span className="svc-arch__inner" />
      <div className="svc-arch__particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${10 + (i * 6.5) % 80}%`,
              animationDelay: `${-((i * 0.43) % 5)}s`,
              animationDuration: `${4 + ((i * 0.9) % 4)}s`,
            }}
          />
        ))}
      </div>
      <span className="svc-arch__floor" />
    </div>
  );
}

function Orb() {
  return (
    <div className="svc-orb" aria-hidden="true">
      <span className="svc-orb__halo" />
      <span className="svc-orb__ring" />
      <span className="svc-orb__core" />
      <span className="svc-orb__hi" />
      <span className="svc-orb__floor" />
    </div>
  );
}

function EditorialHeading({ before, italic, after, className = "" }) {
  return (
    <h2 className={`svc-edit ${className}`.trim()}>
      {before}
      <em>{italic}</em>
      {after}
    </h2>
  );
}

const SERVICES = [
  {
    name: "Web Development",
    body:
      "Production-grade websites and web apps built on Next.js, Django, and modern frontends. Performance, accessibility, and SEO baked in from the first commit.",
    glow: "tl",
  },
  {
    name: "CRM Systems",
    body:
      "Custom CRMs designed around your actual sales pipeline. Multi-role access, automation, and dashboards your team will genuinely use.",
    glow: "tr",
  },
  {
    name: "E-Commerce",
    body:
      "Headless or CMS-driven storefronts that convert. Payment, inventory, and fulfilment integrations handled end-to-end.",
    glow: "c",
  },
  {
    name: "UI/UX Design",
    body:
      "Research-led interface design that respects your users and your brand. Wireframes, prototypes, and a design system that scales.",
    glow: "tr",
  },
  {
    name: "Mobile Applications",
    body:
      "Cross-platform mobile apps with native-grade polish. From MVP to store, with analytics and crash reporting wired in.",
    glow: "tl",
  },
  {
    name: "Custom Software",
    body:
      "Bespoke internal tools, automation, and integrations. Built for the workflows that don't fit off-the-shelf software.",
    glow: "c",
  },
];

function ServiceCard({ idx, name, body, glow }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      node.style.setProperty("--mx", `${e.clientX - r.left}px`);
      node.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Reveal as="a" href={CTA_HREF} className={`svc-card svc-card--${glow}`}>
      <span ref={ref} className="svc-card__inner">
        <span className="svc-card__idx">{String(idx).padStart(2, "0")}</span>
        <span className="svc-card__name">
          <em>{name}</em>
        </span>
        <span className="svc-card__body">{body}</span>
        <span className="svc-card__arrow" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </span>
    </Reveal>
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
    <div className="svc-shell">
      <div className="svc-noise" aria-hidden="true" />
      <div className="svc-wash" aria-hidden="true" />
      <Starfield />
      <DustParticles />
      <CursorGlow />

      {/* in-page nav (the global Nav is dropped on /services) */}
      <header className={`svc-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a href="/" className="svc-nav__brand">
          Revlient
        </a>
        <nav className="svc-nav__links" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/process">Process</a>
          <a href="/work">Work</a>
          <a href={CTA_HREF}>Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="svc-hero">
        <Arch />

        <Reveal className="svc-hero__cta-wrap">
          <a href={CTA_HREF} className="svc-hero__cta">
            <em>Explore</em>
          </a>
        </Reveal>

        <Reveal className="svc-hero__left">
          <p>
            <em>Revlient Intercontinental</em>
            <br />
            <strong>Digital craft studio</strong>
            <br />
            building enduring software.
          </p>
        </Reveal>

        <Reveal className="svc-hero__right" delay={200}>
          <p>
            We partner with founders, ops teams and product builders to ship
            websites, custom software and AI-integrated systems that hold up
            under real use. One small senior team, end-to-end.
          </p>
        </Reveal>
      </section>

      {/* PHILOSOPHY */}
      <section className="svc-philo">
        <span className="svc-label">Philosophy</span>

        <EditorialHeading
          before={<em>Software</em>}
          italic=" is not built. It is "
          after={<strong>crafted.</strong>}
          className="svc-philo__heading"
        />

        <Orb />

        <div className="svc-philo__grid">
          {[
            {
              title: "Intentional",
              body: "Every system we ship begins with sharp questions and ends with measurable outcomes.",
            },
            {
              title: "Durable",
              body: "Clean architecture, considered tooling, and code written to live for years — not quarters.",
            },
            {
              title: "Honest",
              body: "Plain estimates, real timelines, and transparent process. No surprises in invoices or scope.",
            },
            {
              title: "Partnered",
              body: "We work as an embedded extension of your team — not a faceless vendor at arm's length.",
            },
          ].map((p, i) => (
            <Reveal className="svc-philo__col" key={p.title} delay={i * 100}>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="svc-grid-section">
        <span className="svc-label">Services</span>
        <Reveal as="h2" className="svc-grid-section__head">
          Our <em>Services</em>
        </Reveal>

        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.name}
              idx={i + 1}
              name={s.name}
              body={s.body}
              glow={s.glow}
            />
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="svc-cta-section">
        <Reveal>
          <EditorialHeading
            before="Let's build something "
            italic="lasting"
            after="."
            className="svc-cta-section__head"
          />
          <p className="svc-cta-section__sub">
            Tell us what you&apos;re building. The first conversation is
            always free.
          </p>
          <a href={CTA_HREF} className="svc-cta-section__btn">
            <span>Start a Project</span>
            <ArrowUpRight className="svc-cta-section__icon" />
          </a>
        </Reveal>

        <div className="svc-meta">
          <a href={`mailto:${CONTACT_EMAIL}`} className="svc-meta__email">
            {CONTACT_EMAIL}
          </a>
          <span className="svc-meta__loc">Kerala, India</span>
          <div className="svc-meta__socials" aria-label="Social links">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">◌</a>
          </div>
        </div>
      </section>
    </div>
  );
}
