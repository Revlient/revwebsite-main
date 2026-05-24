"use client";

import { useMemo } from "react";
import Reveal from "./Reveal";
import Specimen from "./whyrevlient/Specimens";
import { CTA_HREF } from "../lib/site";

/* Why-Revlient hero. Gargantua-style accretion disk on the left;
   large glassmorphic tile on top carrying the heading + three
   "design specimen" rows; right half stays intentionally empty
   (white-space rule).

   Each Capability / Reliability / Loyalty pillar shows a small
   inline-SVG UI specimen (dashboard / deploy panel / chat thread)
   instead of an icon. Text underneath each specimen becomes a
   short caption — the specimen does the heavy lifting. */

const PILLARS = [
  {
    key: "capability",
    label: "Capability",
    body:
      "Design, engineering, and shipping under one roof — not handed off between vendors.",
  },
  {
    key: "reliability",
    label: "Reliability",
    body:
      "Builds that hold up under real load. We're still on call months after launch.",
  },
  {
    key: "loyalty",
    label: "Loyalty",
    body:
      "We treat every engagement like our reputation rides on it. Because it does.",
  },
];

function BlackHole() {
  // 12 deterministic-position dust particles spiraling inward.
  // Each sets CSS variables on its inline style; the keyframe reads
  // them so paths differ per particle without per-particle keyframes.
  const dust = useMemo(() => {
    const out = [];
    for (let i = 0; i < 12; i++) {
      out.push({
        ang: (i * 137) % 360,
        dist: 38 + ((i * 11) % 24),
        dur: 8 + ((i * 1.3) % 6),
        delay: -((i * 0.83) % 6),
        size: 2 + (i % 3) * 0.5,
        tint: i % 5 === 0 ? "bright" : "soft",
      });
    }
    return out;
  }, []);

  return (
    <div className="whyrev__hole" aria-hidden="true">
      <span className="whyrev__halo" />

      <svg
        className="whyrev__svg"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient running along the accretion arc — soft → bright
              → soft so the arc reads brightest at the centre. */}
          <linearGradient id="bh-arc-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(192, 132, 252, 0.15)" />
            <stop offset="50%" stopColor="rgba(214, 178, 252, 0.98)" />
            <stop offset="100%" stopColor="rgba(192, 132, 252, 0.15)" />
          </linearGradient>

          {/* Linear gradients for the two equatorial flares — brightest
              near the void's edge, fading to transparent away from it. */}
          <linearGradient id="bh-flare-l" x1="0" x2="1" y1="0.5" y2="0.5">
            <stop offset="0%" stopColor="rgba(192, 132, 252, 0)" />
            <stop offset="70%" stopColor="rgba(192, 132, 252, 0.55)" />
            <stop offset="100%" stopColor="rgba(214, 178, 252, 0.85)" />
          </linearGradient>
          <linearGradient id="bh-flare-r" x1="0" x2="1" y1="0.5" y2="0.5">
            <stop offset="0%" stopColor="rgba(214, 178, 252, 0.85)" />
            <stop offset="30%" stopColor="rgba(192, 132, 252, 0.55)" />
            <stop offset="100%" stopColor="rgba(192, 132, 252, 0)" />
          </linearGradient>

          {/* Soft inset depth on the void itself. */}
          <radialGradient id="bh-void" cx="0.5" cy="0.5" r="0.55">
            <stop offset="60%" stopColor="#000000" />
            <stop offset="92%" stopColor="rgba(20, 8, 36, 0.92)" />
            <stop offset="100%" stopColor="rgba(40, 18, 64, 0.7)" />
          </radialGradient>

          {/* Heavy glow used by both arcs to bloom the gradient stroke. */}
          <filter
            id="bh-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sharp small glow for the rim spark only. */}
          <filter id="bh-rim" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {/* 3. Equatorial light flares — bleed outward from the void's
              equator. Behind the upper arc so the front arc occludes
              them, selling the "light bends behind the disk" feel. */}
        <ellipse
          className="whyrev__flare whyrev__flare--left"
          cx="200"
          cy="400"
          rx="260"
          ry="42"
          fill="url(#bh-flare-l)"
        />
        <ellipse
          className="whyrev__flare whyrev__flare--right"
          cx="600"
          cy="400"
          rx="260"
          ry="42"
          fill="url(#bh-flare-r)"
        />

        {/* 4. Lower accretion arc — half-ellipse below the void's centre,
              drawn FIRST so the void renders OVER it. */}
        <path
          className="whyrev__arc whyrev__arc--lower"
          d="M 80 400 A 320 110 0 0 1 720 400"
          fill="none"
          stroke="url(#bh-arc-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#bh-glow)"
        />

        {/* 5. Central void — solid black ellipse with a faint radial
              gradient on top giving the rim a hint of depth. */}
        <ellipse
          className="whyrev__void"
          cx="400"
          cy="400"
          rx="200"
          ry="80"
          fill="#000"
        />
        <ellipse
          cx="400"
          cy="400"
          rx="200"
          ry="80"
          fill="url(#bh-void)"
        />

        {/* 7. Inner rim spark — bright thin outline of the void implies
              light bending around the event horizon. */}
        <ellipse
          className="whyrev__rim"
          cx="400"
          cy="400"
          rx="200"
          ry="80"
          fill="none"
          stroke="rgba(214, 178, 252, 0.7)"
          strokeWidth="1.5"
          filter="url(#bh-rim)"
        />

        {/* 6. Upper accretion arc — same half-ellipse curving above the
              void's centre, drawn AFTER the void so it occludes the
              front of the singularity (the lensing payoff). */}
        <path
          className="whyrev__arc whyrev__arc--upper"
          d="M 80 400 A 320 110 0 0 0 720 400"
          fill="none"
          stroke="url(#bh-arc-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#bh-glow)"
        />
      </svg>

      {/* 8. Dust spiral — 12 HTML spans, CSS-only animation. Sits
            above everything for visibility. */}
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
              <div className="whyrev__specimen">
                <Specimen kind={p.key} />
              </div>
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
