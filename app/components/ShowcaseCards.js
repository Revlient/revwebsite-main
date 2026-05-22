"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Projects carousel — same coverflow/globe alignment as the original
   testimonial deck, but each card is now a logo-only thumbnail of a
   real client project. Vanilla JS + plain CSS, no deps.

   PROOF RULE: only real clients supplied by Revlient. Each entry's
   `logo` is rendered as a hand-built inline mark + wordmark in the
   brand's actual colours so we don't ship a fabricated/mis-aligned
   PNG. To swap to a real exported logo file later, drop the asset at
   /public/work/<slug>.<ext> and replace the entry's `logo` field
   with `<img src="/work/<slug>.png" alt={name} />`. */

function Study2IndiaLogo() {
  return (
    <span className="pscard__logo pscard__logo--s2i" aria-hidden="true">
      <svg viewBox="0 0 96 56" className="pscard__logo-mark">
        {/* mortarboard cap */}
        <path
          d="M48 6 L86 22 L48 38 L10 22 Z"
          fill="#111418"
        />
        <path
          d="M30 28 L30 40 C30 46 38 49 48 49 C58 49 66 46 66 40 L66 28"
          fill="none"
          stroke="#111418"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* tassel */}
        <line x1="84" y1="22" x2="84" y2="36" stroke="#f78a1f" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="84" cy="38" r="2.4" fill="#f78a1f" />
      </svg>
      <span className="pscard__logo-wm">
        <span className="pscard__logo-wm-a">Study</span>
        <span className="pscard__logo-wm-accent">2</span>
        <span className="pscard__logo-wm-a">India</span>
      </span>
    </span>
  );
}

function GloriaLogo() {
  return (
    <span className="pscard__logo pscard__logo--gloria" aria-hidden="true">
      <svg viewBox="0 0 80 80" className="pscard__logo-mark pscard__logo-mark--lg">
        {/* stylised G — partial ring with a tongue inward */}
        <path
          d="M70 40 A30 30 0 1 1 40 10"
          fill="none"
          stroke="#0f9b8e"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M70 40 L52 40 L52 30"
          fill="none"
          stroke="#0f9b8e"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="pscard__logo-wm pscard__logo-wm--stacked">
        <span>GLORIA</span>
        <span>GLOBAL</span>
        <span>VENTURES</span>
      </span>
    </span>
  );
}

function StumigoLogo() {
  return (
    <span className="pscard__logo pscard__logo--stumigo" aria-hidden="true">
      <svg viewBox="0 0 72 72" className="pscard__logo-mark pscard__logo-mark--lg">
        {/* folded ribbon / quad mark */}
        <path
          d="M14 18 L40 14 L58 30 L32 34 Z"
          fill="#f08a1c"
        />
        <path
          d="M32 34 L58 30 L52 56 L26 60 Z"
          fill="#d97316"
        />
        <path
          d="M14 18 L32 34 L26 60 L8 44 Z"
          fill="#f7a544"
        />
      </svg>
      <span className="pscard__logo-wm">
        <span className="pscard__logo-wm-a">Stumigo</span>
      </span>
    </span>
  );
}

function StumigoMarkLogo() {
  return (
    <span className="pscard__logo pscard__logo--stumark" aria-hidden="true">
      <svg viewBox="0 0 96 96" className="pscard__logo-mark pscard__logo-mark--xl">
        <circle cx="48" cy="48" r="44" fill="#f08a1c" />
        <path
          d="M28 32 L52 28 L70 44 L46 48 Z"
          fill="#fff"
        />
        <path
          d="M46 48 L70 44 L64 68 L40 72 Z"
          fill="#fdecd0"
        />
        <path
          d="M28 32 L46 48 L40 72 L22 56 Z"
          fill="#ffffffcc"
        />
      </svg>
    </span>
  );
}

const PROJECTS = [
  {
    slug: "study2india",
    name: "Study2India",
    sector: "Overseas education platform",
    logo: <Study2IndiaLogo />,
  },
  {
    slug: "gloria-global-ventures",
    name: "Gloria Global Ventures",
    sector: "Global ventures group",
    logo: <GloriaLogo />,
  },
  {
    slug: "stumigo",
    name: "Stumigo",
    sector: "Student migration platform",
    logo: <StumigoLogo />,
  },
  {
    slug: "stumigo-app",
    name: "Stumigo — App",
    sector: "Mobile experience",
    logo: <StumigoMarkLogo />,
  },
];
const TONES = ["a", "b", "c"];
const PROJECTS_WITH_TONE = PROJECTS.map((p, i) => ({
  ...p,
  tone: TONES[i % 3],
}));
const N = PROJECTS_WITH_TONE.length;

const Arrow = ({ dir = 1 }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      d={dir === 1 ? "M5 12h13M12 6l6 6-6 6" : "M19 12H6M12 6l-6 6 6 6"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ShowcaseCards() {
  const [active, setActive] = useState(0);
  const go = (step) => setActive((a) => (a + step + N) % N);

  return (
    <section className="section pscard" aria-label="Selected projects">
      <div className="pscard__lights" aria-hidden="true">
        <span className="pscard__streak s1" />
        <span className="pscard__streak s2" />
        <span className="pscard__streak s3" />
        <span className="pscard__streak s4" />
      </div>

      <div className="container">
        <Reveal>
          <div className="pscard__head">
            <h2>Selected projects.</h2>
            <p className="pscard__sub">Recent work.</p>
            <p className="pscard__desc">
              A glimpse of the teams we&apos;ve partnered with — products,
              platforms and brands shipped end-to-end through the
              Revlient stack.
            </p>
            <a href={CTA_HREF} className="pscard__cta">
              <span>Start a project</span>
              <span className="pscard__cta-badge" aria-hidden="true">
                <Arrow />
              </span>
            </a>
          </div>
        </Reveal>

        <div className="pscard__stage">
          <div className="pscard__deck">
            {PROJECTS_WITH_TONE.map((c, i) => {
              // signed wrap distance from the active card (-3..3)
              let o = (i - active + N) % N;
              if (o > N / 2) o -= N;
              const a = Math.abs(o);
              const visible = a <= 2;
              return (
                <div
                  key={c.slug}
                  aria-hidden={visible ? undefined : "true"}
                  className={`pscard__card t-${c.tone} ${
                    o === 0 ? "is-active" : ""
                  }`}
                  style={{
                    // Locked coverflow math (do not change): 114% step,
                    // a*a*9 lift, globe-curve rotation, ±46° end-card
                    // bend at a>=2 with blur.
                    transform: `translate(-50%, -50%) translateX(${
                      o * 114
                    }%) translateY(${a * a * 9}px) translateZ(${
                      a >= 2 ? -170 : -a * 55
                    }px) rotateY(${
                      a >= 2 ? (o < 0 ? 46 : -46) : o * -11
                    }deg) scale(${a >= 2 ? 0.8 : 1 - a * 0.05})`,
                    opacity: visible
                      ? a === 0
                        ? 1
                        : a === 1
                        ? 0.95
                        : 0.3
                      : 0,
                    filter: a >= 2 ? "blur(4px)" : "none",
                    zIndex: 20 - a,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <div className="pscard__thumb">{c.logo}</div>
                  <div className="pscard__meta">
                    <span className="pscard__projname">{c.name}</span>
                    <span className="pscard__projsector">{c.sector}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pscard__nav">
            <button
              type="button"
              className="pscard__navbtn"
              aria-label="Previous project"
              onClick={() => go(-1)}
            >
              <Arrow dir={-1} />
            </button>
            <span className="pscard__count">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(N).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="pscard__navbtn pscard__navbtn--next"
              aria-label="Next project"
              onClick={() => go(1)}
            >
              Next
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
