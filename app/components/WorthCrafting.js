"use client";

import { CTA_HREF } from "../lib/site";

/* "Something worth crafting" — full-bleed dark section inspired by
   the Qintara hero. Two stippled hand silhouettes (robotic left,
   human right) reach toward a glowing pixel cross at centre, under
   a centred title + lyrical sub + a CTA pill. The hands and the
   cross are built from inline SVG so nothing depends on external
   image assets. */

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
          <circle cx="3" cy="3" r="1.6" fill="rgba(220, 220, 224, 0.92)" />
        </pattern>
      </defs>
      {/* angular pixel-style hand pointing right with extended index finger */}
      <path
        fill="url(#worth-dots-bot)"
        d="
          M 0 120
          L 0 220
          L 40 220
          L 40 250
          L 90 250
          L 90 230
          L 130 230
          L 130 215
          L 165 215
          L 165 200
          L 195 200
          L 195 185
          L 215 185
          L 215 170
          L 235 170
          L 235 155
          L 260 155
          L 280 152
          L 300 150
          L 315 150
          L 315 140
          L 295 140
          L 270 138
          L 245 138
          L 215 138
          L 195 138
          L 195 125
          L 175 125
          L 175 108
          L 160 92
          L 145 80
          L 130 76
          L 115 76
          L 100 80
          L 90 90
          L 80 90
          L 80 110
          L 65 110
          L 65 120
          Z
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
          <circle cx="3.5" cy="3.5" r="1.7" fill="rgba(225, 195, 170, 0.95)" />
        </pattern>
      </defs>
      {/* organic hand pointing left, more rounded curves than the
         robotic counterpart */}
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
          L 25 110
          L 18 100
          L 8 95
          L 0 95
          L 0 115
          L 0 165
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

function PixelCross() {
  return (
    <div className="worth__core" aria-hidden="true">
      <span className="worth__halo" />
      <svg
        className="worth__cross"
        viewBox="0 0 140 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="worth-pixel-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c084fc" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="worth-pixel-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a855f7" />
            <stop offset="1" stopColor="#5b21b6" />
          </linearGradient>
          <linearGradient id="worth-pixel-c" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#3730a3" />
          </linearGradient>
        </defs>
        {/* central + with isometric chamfers */}
        <g transform="translate(70 70) rotate(45)">
          {/* vertical bar — front face */}
          <rect x="-12" y="-44" width="24" height="88" fill="url(#worth-pixel-a)" />
          {/* horizontal bar — right face */}
          <rect x="-44" y="-12" width="88" height="24" fill="url(#worth-pixel-b)" />
          {/* small chamfer accents at the ends */}
          <rect x="-8" y="-44" width="16" height="6" fill="#e9d5ff" opacity="0.85" />
          <rect x="38" y="-8" width="6" height="16" fill="#e9d5ff" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}

export default function WorthCrafting() {
  return (
    <section className="worth" aria-label="Something worth crafting">
      <div className="worth__inner">
        <header className="worth__head">
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
          <PixelCross />
          <HumanHand />
        </div>
      </div>
    </section>
  );
}
