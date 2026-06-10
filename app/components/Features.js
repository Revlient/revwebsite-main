"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { CTA_HREF, BRAND, CONTACT_EMAIL, PHONE_DISPLAY } from "../lib/site";

/* ─────────────────────────────────────────────────────────
   Immersive Features bento grid — v2 premium redesign.
   Ambient floating gradient orbs, glassmorphic cards with
   animated gradient borders, mouse-tracking perspective
   tilt, animated counter, scroll-driven stagger reveals,
   and a refined deep-purple / cyan accent palette.
   ───────────────────────────────────────────────────────── */

const SOFTWARE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4";
const BACKGROUND_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4";
const METRIC_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4";

const TIMELINE = [
  { period: "2023–Now", role: "Multidisciplinary studio", org: "Revlient" },
  { period: "2020–2023", role: "Brand & product design", org: "Predecessor studio" },
  { period: "2017–2020", role: "Visual systems & craft", org: "Independent practice" },
];

const TOOL_KEYS_A = ["figma", "framer", "palette", "pen", "layers", "type", "aperture", "chrome"];
const TOOL_KEYS_B = ["camera", "brush", "box", "wand", "figma", "framer", "type", "layers"];

/* ── Utility: IntersectionObserver reveal ─────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Utility: mouse tilt on card ─────────────────────── */
function useTilt() {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.01)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}

/* ── Animated counter ────────────────────────────────── */
function AnimatedCounter({ value, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const [counterRef, isVisible] = useReveal(0.3);

  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return <span ref={counterRef}>{count}</span>;
}

/* ── Sparkle icon ────────────────────────────────────── */
function Sparkle({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
  );
}

/* ── Tool icons ──────────────────────────────────────── */
function ToolIcon({ kind }) {
  const common = {
    viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
  };
  switch (kind) {
    case "figma": return (<svg {...common}><path d="M9 4 H12 V10 H9 a3 3 0 0 1 0 -6 Z" /><path d="M12 4 H15 a3 3 0 0 1 0 6 H12 Z" /><circle cx="14" cy="13" r="3" /><path d="M9 10 H12 V16 H9 a3 3 0 0 1 0 -6 Z" /><path d="M9 16 H12 V19 a3 3 0 0 1 -3 0 a3 3 0 0 1 0 -3 Z" /></svg>);
    case "framer": return (<svg {...common}><path d="M6 3 H18 V9 H10 L18 17 H12 V21 L6 15 V9 H14" /></svg>);
    case "palette": return (<svg {...common}><path d="M12 3 a9 9 0 1 0 0 18 a3 3 0 0 0 0 -6 h-1 a3 3 0 0 1 0 -6 h2 a4 4 0 0 0 4 -4 a3 3 0 0 0 -3 -2 Z" /><circle cx="7" cy="10" r="1" /><circle cx="9" cy="6" r="1" /><circle cx="14" cy="6" r="1" /><circle cx="17" cy="10" r="1" /></svg>);
    case "pen": return (<svg {...common}><path d="M12 3 L18 9 L13 14 L7 14 L7 8 Z" /><path d="M7 14 L4 20 L10 17" /><circle cx="10" cy="17" r="1.4" /></svg>);
    case "layers": return (<svg {...common}><path d="M3 7 L12 3 L21 7 L12 11 Z" /><path d="M3 12 L12 16 L21 12" /><path d="M3 17 L12 21 L21 17" /></svg>);
    case "type": return (<svg {...common}><path d="M5 7 V5 H19 V7" /><path d="M12 5 V20" /><path d="M9 20 H15" /></svg>);
    case "aperture": return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 3 L17 12 L7 18" /><path d="M21 12 L12 12 L8 4" /><path d="M3 12 L12 12 L16 20" /></svg>);
    case "chrome": return (<svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="M12 8.5 L21 8.5" /><path d="M8.7 14 L4 21" /><path d="M15.3 14 L20 21" /></svg>);
    case "camera": return (<svg {...common}><path d="M4 7 H8 L10 5 H14 L16 7 H20 V19 H4 Z" /><circle cx="12" cy="13" r="4" /></svg>);
    case "brush": return (<svg {...common}><path d="M14 3 L21 10 L13 18 L8 18 L8 13 Z" /><path d="M8 18 L5 21" /><path d="M8 13 L4 17 L7 20" /></svg>);
    case "box": return (<svg {...common}><path d="M12 3 L21 7.5 L21 16.5 L12 21 L3 16.5 L3 7.5 Z" /><path d="M3 7.5 L12 12 L21 7.5" /><path d="M12 12 V21" /></svg>);
    case "wand": return (<svg {...common}><path d="M5 19 L17 7" /><path d="M15 5 L17 7 L19 5" /><path d="M19 13 L20 15 L22 16 L20 17 L19 19 L18 17 L16 16 L18 15 Z" /></svg>);
    default: return null;
  }
}

function ToolTile({ kind }) {
  return (
    <span className="feat-tile liquid-glass" aria-hidden="true">
      <ToolIcon kind={kind} />
    </span>
  );
}

function Marquee({ keys, direction }) {
  const loop = [...keys, ...keys];
  return (
    <div className={`feat-marquee feat-marquee--${direction}`} aria-hidden="true">
      <div className={`feat-marquee__track feat-marquee__track--${direction}`}>
        {loop.map((k, i) => (
          <ToolTile key={`${k}-${i}`} kind={k} />
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children, align = "center" }) {
  return (
    <span className={`feat-label feat-label--${align}`}>
      <Sparkle className="feat-label__icon" />
      <span>{children}</span>
      <Sparkle className="feat-label__icon" />
    </span>
  );
}

/* ── Bento Card wrapper with reveal + tilt ───────────── */
function BentoCard({ children, className = "", delay = 0, noTilt = false }) {
  const [revealRef, visible] = useReveal(0.12);
  const tilt = useTilt();
  const combinedRef = useCallback(
    (node) => {
      revealRef.current = node;
      if (!noTilt) tilt.ref.current = node;
    },
    [revealRef, tilt.ref, noTilt]
  );

  return (
    <article
      ref={combinedRef}
      className={`feat-card2 ${className} ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...(!noTilt ? { onMouseMove: tilt.onMouseMove, onMouseLeave: tilt.onMouseLeave } : {})}
    >
      {/* Animated gradient border */}
      <span className="feat-card2__border" aria-hidden="true" />
      {/* Inner glow */}
      <span className="feat-card2__glow" aria-hidden="true" />
      {children}
    </article>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                        */
/* ═══════════════════════════════════════════════════════ */
export default function Features() {
  return (
    <section className="feat2-section" id="features" aria-label="Studio features">
      {/* Ambient floating gradient orbs */}
      <div className="feat2-orbs" aria-hidden="true">
        <span className="feat2-orb feat2-orb--1" />
        <span className="feat2-orb feat2-orb--2" />
        <span className="feat2-orb feat2-orb--3" />
        <span className="feat2-orb feat2-orb--4" />
      </div>

      {/* Noise texture overlay */}
      <div className="feat2-noise" aria-hidden="true" />

      <div className="feat2-shell">
        {/* ── Section header ───────────────────────── */}
        <header className="feat2-header">
          <div className="feat2-header__copy">
            <span className="feat2-header__eyebrow">
              <span className="feat2-header__dot" />
              About the Studio
            </span>
            <h2 className="feat2-header__title">
              Hi, we&apos;re <span className="feat2-header__brand">{BRAND.name}.</span>
            </h2>
            <p className="feat2-header__sub">
              A multidisciplinary studio crafting 3D-grade websites,
              software and applications. With a senior team behind every
              project, we help ambitious ideas move with focus and
              intention.
            </p>
          </div>
          <a href={CTA_HREF} className="feat2-cta">
            <span className="feat2-cta__glow" />
            <span className="feat2-cta__text">Let&apos;s Team Up Today</span>
            <ArrowUpRight className="feat2-cta__arrow" />
          </a>
        </header>

        {/* ── Bento grid ───────────────────────────── */}
        <div className="feat2-grid">

          {/* ─── Card 1: BACKGROUND (tall video card) ── */}
          <BentoCard className="feat2-card--bg" delay={0}>
            <video
              className="feat2-card__video"
              src={BACKGROUND_VIDEO}
              autoPlay loop muted playsInline preload="metadata"
            />
            <div className="feat2-card__overlay feat2-card__overlay--gradient" />
            <div className="feat2-card__inner feat2-card__inner--between">
              <SectionLabel>BACKGROUND</SectionLabel>
              <div className="feat2-timeline">
                {TIMELINE.map((row, i) => (
                  <div className="feat2-timeline__row" key={row.period} style={{ animationDelay: `${i * 150 + 600}ms` }}>
                    <span className="feat2-timeline__period">{row.period}</span>
                    <span className="feat2-timeline__dot" />
                    <span className="feat2-timeline__role">{row.role}</span>
                    <span className="feat2-timeline__org">{row.org}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* ─── Column 2 (voice + metric) ──────────── */}
          <div className="feat2-col">

            {/* Client Voice */}
            <BentoCard className="feat2-card--voice" delay={80}>
              <div className="feat2-card__inner">
                <SectionLabel align="start">CLIENT VOICE</SectionLabel>
                <blockquote className="feat2-voice__quote">
                  <span className="feat2-voice__quotemark" aria-hidden="true">&ldquo;</span>
                  Revlient delivered our platform ahead of schedule with zero handoff friction. Their focus on clean engineering and responsive design has made Medcity's digital portal a key competitive advantage.
                </blockquote>
                <figcaption className="feat2-voice__meta">
                  <span className="feat2-voice__avatar" aria-hidden="true">AC</span>
                  <div>
                    <strong>Anil Chakkrapani</strong>
                    <span>Founder — Medcity International Academy</span>
                  </div>
                </figcaption>
              </div>
            </BentoCard>

            {/* Metric (4 pillars) */}
            <BentoCard className="feat2-card--metric" delay={160}>
              <video
                className="feat2-card__video"
                src={METRIC_VIDEO}
                autoPlay loop muted playsInline preload="metadata"
              />
              <div className="feat2-card__overlay" />
              <div className="feat2-card__inner feat2-card__inner--center">
                <span className="feat2-metric__big">
                  <AnimatedCounter value={4} duration={1200} />
                </span>
                <span className="feat2-metric__ring" aria-hidden="true" />
                <span className="feat2-metric__cap">
                  Service pillars connected by one core
                </span>
              </div>
            </BentoCard>
          </div>

          {/* ─── Column 3 (software + reach) ────────── */}
          <div className="feat2-col">

            {/* Daily Software */}
            <BentoCard className="feat2-card--software" delay={240}>
              <video
                className="feat2-card__video"
                src={SOFTWARE_VIDEO}
                autoPlay loop muted playsInline preload="metadata"
              />
              <div className="feat2-card__overlay" />
              <div className="feat2-card__inner">
                <SectionLabel>DAILY SOFTWARE</SectionLabel>
                <div className="feat2-marquees">
                  <Marquee keys={TOOL_KEYS_A} direction="left" />
                  <Marquee keys={TOOL_KEYS_B} direction="right" />
                </div>
              </div>
            </BentoCard>

            {/* Reach Me */}
            <BentoCard className="feat2-card--reach" delay={320} noTilt>
              <div className="feat2-card__inner">
                <SectionLabel align="start">REACH ME</SectionLabel>
                <div className="feat2-reach__lines">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="feat2-reach__line">
                    <span className="feat2-reach__line-icon">✉</span>
                    {CONTACT_EMAIL}
                  </a>
                  <span className="feat2-reach__line">
                    <span className="feat2-reach__line-icon">☎</span>
                    {PHONE_DISPLAY}
                  </span>
                </div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="feat2-reach__cta"
                  aria-label={`Email ${CONTACT_EMAIL}`}
                >
                  <span className="feat2-reach__cta-glow" />
                  <ArrowUpRight className="feat2-reach__cta-icon" />
                  <span>Get in Touch</span>
                </a>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}
