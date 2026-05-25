"use client";

import { useEffect, useRef, useState } from "react";
import FadingVideo from "./FadingVideo";

/* Cinematic space-travel hero + capabilities sections.
   Vanilla CSS implementation of the supplied brief — liquid-glass
   utilities, FadingVideo crossfade, IntersectionObserver-driven
   blur-in animations, no framer-motion / no tailwind. */

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";
const CAPS_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

const NAV_LINKS = [
  { href: "#", label: "Home" },
  { href: "#voyages", label: "Voyages" },
  { href: "#worlds", label: "Worlds" },
  { href: "#innovation", label: "Innovation" },
  { href: "#plan", label: "Plan Launch" },
];

const PARTNERS = ["Aeon", "Vela", "Apex", "Orbit", "Zeno"];

function ArrowUpRight({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function PlayIcon({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 010 18" />
      <path d="M12 3a14 14 0 000 18" />
    </svg>
  );
}

function IconImage() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z" />
    </svg>
  );
}

function IconMovie() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
    </svg>
  );
}

function IconBulb() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
    </svg>
  );
}

/* Word-by-word blur-in headline. IntersectionObserver triggers on
   10% visibility. Each word is span with its own delay. */
function BlurText({ text, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const words = text.split(/\s+/);
  return (
    <p ref={ref} className={`cinhero-blur ${visible ? "is-in" : ""} ${className}`.trim()}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="cinhero-blur__w"
          style={{ animationDelay: `${(i * 100) / 1000}s` }}
        >
          {w}
        </span>
      ))}
    </p>
  );
}

const CAPS = [
  {
    Icon: IconImage,
    title: "AI Scenery",
    tags: ["Natural Context", "Photo Realism", "Infinite Settings", "Eco-Vibe"],
    body:
      "AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests.",
  },
  {
    Icon: IconMovie,
    title: "Batch Production",
    tags: ["Scale Fast", "Visual Consistency", "Time Saver", "Ready to Post"],
    body:
      "Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.",
  },
  {
    Icon: IconBulb,
    title: "Smart Lighting",
    tags: ["Ray Tracing", "Physical Shadows", "Studio Quality", "Sunlight Sync"],
    body:
      "Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.",
  },
];

export default function CinematicHero() {
  return (
    <div className="cinhero-wrap">
      {/* ============================== Hero =============================== */}
      <section className="cinhero" aria-label="Hero">
        <FadingVideo
          src={HERO_VIDEO}
          className="cinhero__video"
          style={{ width: "120%", height: "120%" }}
        />

        <div className="cinhero__shell">
          <header className="cinhero-nav">
            <a href="/" className="cinhero-nav__logo liquid-glass" aria-label="Home">
              a
            </a>

            <nav className="cinhero-nav__center liquid-glass" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="cinhero-nav__link">
                  {l.label}
                </a>
              ))}
              <a href="#claim" className="cinhero-nav__cta">
                Claim a Spot <ArrowUpRight size={14} />
              </a>
            </nav>

            <span className="cinhero-nav__spacer" aria-hidden="true" />
          </header>

          <div className="cinhero__content">
            <span className="cinhero-badge liquid-glass cinhero-anim" style={{ animationDelay: "0.4s" }}>
              <span className="cinhero-badge__new">New</span>
              <span className="cinhero-badge__txt">
                Maiden Crewed Voyage to Mars Arrives 2026
              </span>
            </span>

            <BlurText
              text="Venture Past Our Sky Across the Universe"
              className="cinhero__title"
            />

            <p className="cinhero__sub cinhero-anim" style={{ animationDelay: "0.8s" }}>
              Discover the universe in ways once unimaginable. Our pioneering
              vessels and breakthrough engineering bring deep-space exploration
              within reach — secure and extraordinary.
            </p>

            <div className="cinhero__ctas cinhero-anim" style={{ animationDelay: "1.1s" }}>
              <a href="#voyage" className="cinhero__cta-primary liquid-glass-strong">
                Start Your Voyage <ArrowUpRight size={18} />
              </a>
              <a href="#liftoff" className="cinhero__cta-secondary">
                View Liftoff <PlayIcon size={14} />
              </a>
            </div>

            <div className="cinhero__stats cinhero-anim" style={{ animationDelay: "1.3s" }}>
              <div className="cinhero-stat liquid-glass">
                <ClockIcon />
                <div>
                  <p className="cinhero-stat__num">34.5 Min</p>
                  <p className="cinhero-stat__lbl">Average Videos Watch Time</p>
                </div>
              </div>
              <div className="cinhero-stat liquid-glass">
                <GlobeIcon />
                <div>
                  <p className="cinhero-stat__num">2.8B+</p>
                  <p className="cinhero-stat__lbl">Users Across the Globe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cinhero__partners cinhero-anim" style={{ animationDelay: "1.4s" }}>
            <span className="cinhero-partners__pill liquid-glass">
              Collaborating with top aerospace pioneers globally
            </span>
            <div className="cinhero-partners__row">
              {PARTNERS.map((p) => (
                <span key={p} className="cinhero-partners__name">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================== Capabilities =========================== */}
      <section className="cincap" aria-label="Capabilities">
        <FadingVideo src={CAPS_VIDEO} className="cincap__video" />

        <div className="cincap__inner">
          <div className="cincap__head">
            <p className="cincap__kicker">// Capabilities</p>
            <h2 className="cincap__h">
              Production
              <br />
              evolved
            </h2>
          </div>

          <div className="cincap__grid">
            {CAPS.map((c) => (
              <article key={c.title} className="cincap-card liquid-glass">
                <header className="cincap-card__top">
                  <span className="cincap-card__icon liquid-glass">
                    <c.Icon />
                  </span>
                  <div className="cincap-card__tags">
                    {c.tags.map((t) => (
                      <span key={t} className="cincap-card__tag liquid-glass">
                        {t}
                      </span>
                    ))}
                  </div>
                </header>
                <div className="cincap-card__spacer" />
                <div className="cincap-card__bottom">
                  <h3 className="cincap-card__title">{c.title}</h3>
                  <p className="cincap-card__body">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
