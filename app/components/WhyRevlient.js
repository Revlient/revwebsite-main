"use client";

import { useMemo } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Why-Revlient hero. A looping blueish black-hole visual fills the
   left half of the section; a large glassmorphic tile sits over it
   carrying the heading + three pillars. The right half stays
   intentionally empty — that's the white-space rule.

   Black hole is pure CSS: dark void with an inset shadow, a
   conic-gradient accretion ring rotating slowly, a soft blue halo
   that pulses, and 12 deterministic-position dust particles
   spiraling inward. Reduced-motion freezes every loop. */

const PILLARS = [
  {
    key: "capability",
    label: "Capability",
    body:
      "Senior multidisciplinary team. We design, build, and ship the whole stack — not just one slice.",
    Icon: IconStack,
  },
  {
    key: "reliability",
    label: "Reliability",
    body:
      "Plain timelines, real estimates, code that holds up after the demo. We're still on call months after launch.",
    Icon: IconShield,
  },
  {
    key: "loyalty",
    label: "Loyalty",
    body:
      "We treat every engagement like our own reputation rides on it. Because it does.",
    Icon: IconHandshake,
  },
];

function IconStack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 3 21 8 12 13 3 8 12 3" />
      <polyline points="3 12 12 17 21 12" />
      <polyline points="3 16 12 21 21 16" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 L20 6 V12 C20 16.5 16.5 19.8 12 21 C7.5 19.8 4 16.5 4 12 V6 Z" />
      <path d="M9 12 L11 14 L15 10" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12 L7 8 L11 10 L13 8 L17 10 L21 12" />
      <path d="M7 14 L10 17 L13 15" />
      <path d="M13 15 L15 17 L18 14" />
      <path d="M3 12 L3 16" />
      <path d="M21 12 L21 16" />
    </svg>
  );
}

function BlackHole() {
  // 12 deterministic-position dust particles spiraling inward. Each
  // sets CSS variables on its inline style; the keyframe reads them
  // so paths differ per particle without per-particle keyframes.
  const dust = useMemo(() => {
    const out = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * 137) % 360; // deterministic spread
      const dist = 38 + ((i * 11) % 24); // start distance from centre %
      const dur = 8 + ((i * 1.3) % 6); // seconds
      const delay = -((i * 0.83) % 6);
      out.push({
        // Start position offset from centre, in %, along a deterministic
        // ray. We compute final x/y once via CSS calc using these vars.
        ang: angle,
        dist,
        dur,
        delay,
        size: 2 + (i % 3) * 0.5,
        tint: i % 5 === 0 ? "bright" : "soft",
      });
    }
    return out;
  }, []);

  return (
    <div className="whyrev__hole" aria-hidden="true">
      <span className="whyrev__halo" />
      <span className="whyrev__ring" />
      <span className="whyrev__void" />
      <div className="whyrev__dust">
        {dust.map((d, i) => (
          <span
            key={i}
            className={`whyrev__dot whyrev__dot--${d.tint}`}
            style={{
              "--ang": `${d.ang}deg`,
              "--dist": `${d.dist}%`,
              "--size": `${d.size}px`,
              animationDuration: `${d.dur}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function WhyRevlient() {
  return (
    <section className="whyrev" id="why" aria-label="Why Revlient">
      <BlackHole />

      <Reveal className="whyrev__tile">
        <span className="whyrev__eyebrow">
          <span className="whyrev__eyebrow-dot" />
          <em>Nº</em>&nbsp; Why Revlient
        </span>
        <h2 className="whyrev__title">
          Most studios choose flash <em>or</em>
          <br />
          function. <em>We refuse to.</em>
        </h2>
        <p className="whyrev__sub">
          Pure-flash work wins admiration and loses serious buyers. Pure-
          corporate work wins trust and looks like everyone else. We build
          for the people who need both.
        </p>

        <ul className="whyrev__pillars">
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.key} className="whyrev__pillar" delay={i * 120}>
              <span className="whyrev__pillar-ico">
                <p.Icon />
              </span>
              <div className="whyrev__pillar-text">
                <h3 className="whyrev__pillar-label">{p.label}</h3>
                <p className="whyrev__pillar-body">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <a href={CTA_HREF} className="whyrev__cta">
          <span>Talk to the studio</span>
          <span className="whyrev__cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
