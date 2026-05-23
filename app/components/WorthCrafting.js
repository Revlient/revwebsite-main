"use client";

import { CTA_HREF } from "../lib/site";

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
        <pattern id="worth-dots-bot" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.6" fill="rgba(218, 224, 232, 0.95)" />
        </pattern>
      </defs>
      <path
        fill="url(#worth-dots-bot)"
        d="
          M 0 120 L 0 220 L 40 220 L 40 250 L 90 250
          L 90 230 L 130 230 L 130 215 L 165 215
          L 165 200 L 195 200 L 195 185 L 215 185
          L 215 170 L 235 170 L 235 155 L 260 155
          L 280 152 L 300 150 L 315 150 L 315 140
          L 295 140 L 270 138 L 245 138 L 215 138
          L 195 138 L 195 125 L 175 125 L 175 108
          L 160 92 L 145 80 L 130 76 L 115 76
          L 100 80 L 90 90 L 80 90 L 80 110
          L 65 110 L 65 120 Z
        "
      />
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
        <pattern id="worth-dots-human" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.8" fill="rgba(228, 196, 174, 0.95)" />
        </pattern>
      </defs>
      <path
        fill="url(#worth-dots-human)"
        d="
          M 320 100
          C 295 95 270 100 250 105
          C 230 110 215 120 200 130
          C 190 138 175 145 160 150
          C 145 155 130 158 115 158
          C 100 158 88 156 78 152
          C 65 148 55 142 50 135
          C 45 128 42 120 42 110
          L 25 110 L 18 100 L 8 95 L 0 95
          L 0 115 L 0 165
          C 5 178 18 188 35 195
          C 55 205 80 212 110 215
          C 140 218 170 215 195 208
          C 225 200 250 188 270 175
          C 285 165 298 155 308 145
          C 315 135 320 122 320 110
          Z
        "
      />
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

function PixelCore() {
  return (
    <div className="worth__core" aria-hidden="true">
      <span className="worth__halo worth__halo--outer" />
      <span className="worth__halo worth__halo--inner" />
      <span className="worth__ring" />
      <svg
        className="worth__cross"
        viewBox="0 0 140 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="worth-pixel-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e9d5ff" />
            <stop offset="0.45" stopColor="#a855f7" />
            <stop offset="1" stopColor="#5b21b6" />
          </linearGradient>
          <linearGradient id="worth-pixel-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c084fc" />
            <stop offset="1" stopColor="#3730a3" />
          </linearGradient>
        </defs>
        <g transform="translate(70 70) rotate(45)">
          <rect x="-12" y="-44" width="24" height="88" fill="url(#worth-pixel-a)" />
          <rect x="-44" y="-12" width="88" height="24" fill="url(#worth-pixel-b)" />
          {/* chamfer highlights */}
          <rect x="-9" y="-44" width="18" height="6" fill="#f5e6ff" opacity="0.9" />
          <rect x="38" y="-9" width="6" height="18" fill="#f5e6ff" opacity="0.9" />
          <rect x="-9" y="38" width="18" height="6" fill="rgba(255, 255, 255, 0.18)" />
          <rect x="-44" y="-9" width="6" height="18" fill="rgba(255, 255, 255, 0.18)" />
        </g>
      </svg>
      {/* orbiting accent dots */}
      <span className="worth__orbit worth__orbit--a" />
      <span className="worth__orbit worth__orbit--b" />
      <span className="worth__orbit worth__orbit--c" />
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
          <PixelCore />
          <HumanHand />
          <EnergyBeams />
        </div>
      </div>
    </section>
  );
}
