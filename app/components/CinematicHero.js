"use client";

import { useEffect, useRef, useState } from "react";
import FadingVideo from "./FadingVideo";

/* Cinematic hero. The global <Nav /> renders the header. */

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

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

export default function CinematicHero() {
  return (
    <div className="cinhero-wrap">
      <section className="cinhero" aria-label="Hero">
        <FadingVideo
          src={HERO_VIDEO}
          className="cinhero__video"
          style={{ width: "120%", height: "120%" }}
        />

        <div className="cinhero__shell">
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
    </div>
  );
}
