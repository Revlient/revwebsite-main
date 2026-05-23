"use client";

import { CTA_HREF } from "../lib/site";
import Logo from "./Logo";

/* "Something worth crafting" — full-bleed dark section inspired by
   the Qintara hero, beefed up with loop animations. Layered visual:
   - ambient grid + drifting particle field in the background
   - two stippled hand silhouettes (robotic left, human right) with a
     subtle dot-pulse breath
   - animated energy beams flowing along the line that connects each
     hand to the central core
   - a multi-layer pixel cross at centre: pulsing halo, slow spin,
     drop-shadow that breathes with the halo
   Everything is plain SVG + CSS keyframes. Reduced-motion freezes
   all four loops. */

function RoboticHand() {
  return (
    <svg
      className="worth__hand worth__hand--left"
      viewBox="0 0 320 280"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="worth-dots-bot" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.2" fill="rgba(218, 224, 232, 0.85)" />
        </pattern>
        <linearGradient id="worth-hand-bot-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(218, 224, 232, 0.55)" />
          <stop offset="1" stopColor="rgba(218, 224, 232, 1)" />
        </linearGradient>
        <mask id="worth-hand-bot-mask">
          <rect width="100%" height="100%" fill="url(#worth-hand-bot-grad)" />
        </mask>
      </defs>
      {/* angular pixel-style hand, refined: forearm + palm + extended
         index finger, with hinted joint segments */}
      <g mask="url(#worth-hand-bot-mask)">
        <path
          fill="url(#worth-dots-bot)"
          d="
            M 0 130 L 0 210 L 35 210 L 35 245 L 85 245
            L 85 225 L 125 225 L 125 210 L 160 210
            L 160 195 L 188 195 L 188 180 L 210 180
            L 210 165 L 232 165 L 232 150 L 258 150
            L 280 148 L 305 146 L 318 146 L 318 138
            L 298 138 L 272 136 L 246 136 L 218 136
            L 200 136 L 200 122 L 178 122 L 178 104
            L 162 88 L 146 76 L 130 72 L 112 72
            L 96 76 L 86 88 L 76 88 L 76 108
            L 60 108 L 60 120 L 30 120 L 30 130 Z
          "
        />
        {/* segmented joint hints — slim darker bands */}
        <rect x="178" y="98" width="2" height="32" fill="rgba(0,0,0,0.35)" />
        <rect x="160" y="120" width="2" height="80" fill="rgba(0,0,0,0.3)" />
        <rect x="125" y="135" width="2" height="80" fill="rgba(0,0,0,0.3)" />
      </g>
    </svg>
  );
}

function HumanHand() {
  return (
    <svg
      className="worth__hand worth__hand--right"
      viewBox="0 0 320 280"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="worth-dots-human" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.5" fill="rgba(228, 196, 174, 0.92)" />
        </pattern>
        <linearGradient id="worth-hand-human-grad" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="rgba(228, 196, 174, 0.55)" />
          <stop offset="1" stopColor="rgba(228, 196, 174, 1)" />
        </linearGradient>
        <mask id="worth-hand-human-mask">
          <rect width="100%" height="100%" fill="url(#worth-hand-human-grad)" />
        </mask>
      </defs>
      {/* organic hand pointing left, refined silhouette with knuckle
         hint along the index finger */}
      <g mask="url(#worth-hand-human-mask)">
        <path
          fill="url(#worth-dots-human)"
          d="
            M 320 112
            C 296 104 268 110 244 118
            C 220 126 200 138 182 146
            C 168 152 150 156 132 156
            C 116 156 102 154 90 150
            C 78 146 66 140 56 132
            C 48 126 44 118 44 108
            L 26 108 L 16 98 L 6 92 L 0 92
            L 0 116 L 0 168
            C 6 180 20 190 38 198
            C 58 208 84 214 116 216
            C 148 218 178 214 204 206
            C 230 198 254 186 276 174
            C 290 164 302 152 312 138
            C 318 128 320 118 320 112
            Z
          "
        />
        {/* index-finger knuckle hint */}
        <ellipse cx="244" cy="124" rx="14" ry="3" fill="rgba(0,0,0,0.3)" />
        <ellipse cx="200" cy="138" rx="16" ry="3" fill="rgba(0,0,0,0.28)" />
      </g>
    </svg>
  );
}

function EnergyBeams() {
  return (
    <svg
      className="worth__beams"
      viewBox="0 0 1200 480"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="worth-beam-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c084fc" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a855f7" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="worth-beam-right" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a855f7" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
        <filter id="worth-beam-glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint guide tracks from hand-tip → centre and back out */}
      <path
        className="worth__beam-track"
        d="M 280 240 Q 480 280 600 240"
        fill="none"
        stroke="rgba(255, 255, 255, 0.06)"
        strokeWidth="1"
      />
      <path
        className="worth__beam-track"
        d="M 920 240 Q 720 280 600 240"
        fill="none"
        stroke="rgba(255, 255, 255, 0.06)"
        strokeWidth="1"
      />

      {/* glowing energy dashes that slide along each track */}
      <path
        className="worth__beam worth__beam--left"
        d="M 280 240 Q 480 280 600 240"
        fill="none"
        stroke="url(#worth-beam-left)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="14 360"
        filter="url(#worth-beam-glow)"
      />
      <path
        className="worth__beam worth__beam--right"
        d="M 920 240 Q 720 280 600 240"
        fill="none"
        stroke="url(#worth-beam-right)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="14 360"
        filter="url(#worth-beam-glow)"
      />
    </svg>
  );
}

function Particles() {
  // 26 absolutely-positioned dots floating slowly upward, each with
  // its own delay/duration via CSS variables on the inline style.
  const cells = Array.from({ length: 26 }, (_, i) => i);
  return (
    <div className="worth__particles" aria-hidden="true">
      {cells.map((i) => {
        const left = (i * 53) % 100;
        const delay = -((i * 0.97) % 14);
        const dur = 14 + ((i * 1.7) % 8);
        const size = 1.5 + ((i * 0.7) % 2);
        return (
          <span
            key={i}
            className="worth__particle"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function BrandCore() {
  return (
    <div className="worth__core" aria-hidden="true">
      <span className="worth__halo worth__halo--outer" />
      <span className="worth__halo worth__halo--inner" />
      <span className="worth__ring worth__ring--outer" />
      <span className="worth__ring worth__ring--inner" />

      {/* Revlient brand mark replaces the generic pixel cross */}
      <div className="worth__mark">
        <Logo className="worth__mark-svg" />
      </div>

      {/* constellation: three small accent dots orbiting on different
         periods + a sparkle ring */}
      <span className="worth__orbit worth__orbit--a" />
      <span className="worth__orbit worth__orbit--b" />
      <span className="worth__orbit worth__orbit--c" />
      <span className="worth__orbit worth__orbit--d" />
    </div>
  );
}

export default function WorthCrafting() {
  return (
    <section className="worth" aria-label="Something worth crafting">
      <div className="worth__grid" aria-hidden="true" />
      <Particles />

      <div className="worth__inner">
        <header className="worth__head">
          <span className="worth__eyebrow">
            <span className="worth__eyebrow-dot" />
            Worth crafting
          </span>
          <h2 className="worth__title">
            Something worth crafting,<br />
            where instinct meets craft.
          </h2>
          <p className="worth__sub">
            An unlikely alliance — where the studio&apos;s precision
            and a client&apos;s instinct move as one.
          </p>
          <a href={CTA_HREF} className="worth__cta">
            <span>See it in action</span>
            <span className="worth__cta-arrow" aria-hidden="true">→</span>
          </a>
        </header>

        <div className="worth__stage">
          <RoboticHand />
          <BrandCore />
          <HumanHand />
          <EnergyBeams />
        </div>
      </div>
    </section>
  );
}
