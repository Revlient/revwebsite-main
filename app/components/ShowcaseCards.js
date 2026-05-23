"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import NebulaBackdrop from "./showcase/NebulaBackdrop";
import { CTA_HREF } from "../lib/site";

/* Constellation map: seven client "stars" arranged in a 2D shape,
   connected by a thin silver polyline. Hover/click any star and its
   testimonial tile slides in beside it. Scroll-driven first draw via
   an IntersectionObserver that toggles `.is-drawn` on the container.
   No auto-rotate — the constellation is a chart you read, not a reel
   you watch.

   PROOF RULE: real client identities only when supplied by Revlient.
   Quote text + service field stay placeholders (amber 'TODO: service'
   chips) until permission-cleared content lands. No fabricated faces
   — empty `img` falls back to tone-coloured initials. */

const TONES = ["a", "b", "c"];

const TESTIMONIALS = [
  {
    quote:
      "Placeholder testimonial — replace with the real, approved quote before launch.",
    name: "Anil Chakkrapani",
    role: "Founder, Medcity International Academy",
    service: "TODO: service",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real, approved quote before launch.",
    name: "Aswin Pradeep",
    role: "Magnate Study Abroad",
    service: "TODO: service",
    img: "",
  },
  // TODO(content): real client — replace before launch
  {
    quote:
      "Placeholder testimonial — replace with the real, approved quote before launch.",
    name: "Client Name",
    role: "Founder, Company",
    service: "TODO: service",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real, approved quote before launch.",
    name: "Client Name",
    role: "Managing Director, Company",
    service: "TODO: service",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real, approved quote before launch.",
    name: "Client Name",
    role: "Co-founder, Company",
    service: "TODO: service",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real, approved quote before launch.",
    name: "Client Name",
    role: "CEO, Company",
    service: "TODO: service",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with the real, approved quote before launch.",
    name: "Johnson",
    role: "Founder, IBS Consultancy",
    service: "TODO: service",
    img: "",
  },
].map((t, i) => ({
  ...t,
  idx: i,
  tone: TONES[i % 3],
  initials: t.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
}));

const N = TESTIMONIALS.length;

// Hand-tuned star positions in the SVG's viewBox space (percent of
// 800×460). Arranged to form an asymmetric, flowing shape — not a
// known constellation, not a literal letter.
const STAR_POSITIONS = [
  { x: 11, y: 62 },
  { x: 23, y: 30 },
  { x: 38, y: 75 },
  { x: 50, y: 42 },
  { x: 64, y: 18 },
  { x: 78, y: 58 },
  { x: 90, y: 34 },
];

const VB_W = 800;
const VB_H = 460;
// Convert percentage to viewBox units (helpers).
const vx = (p) => (p * VB_W) / 100;
const vy = (p) => (p * VB_H) / 100;

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

function TileBody({ t }) {
  return (
    <>
      <div className="constel__tile-head">
        <span className={`constel__tile-avatar t-${t.tone}`}>
          {t.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.img} alt="" draggable={false} />
          ) : (
            <span>{t.initials}</span>
          )}
        </span>
        <span className="constel__tile-name">{t.name}</span>
      </div>
      <blockquote className="constel__tile-quote">{t.quote}</blockquote>
      <span className="constel__tile-role">{t.role}</span>
      {t.service && (
        <span
          className={`pscard__service pscard__service--sm${
            t.service.startsWith("TODO") ? " pscard__service--todo" : ""
          }`}
        >
          {t.service}
        </span>
      )}
    </>
  );
}

export default function ShowcaseCards() {
  const [active, setActive] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const containerRef = useRef(null);
  const starRefs = useRef([]);

  // First-scroll trigger — draws line + fades stars in once.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDrawn(true);
      return undefined;
    }
    const el = containerRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKey = (e, i) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const step = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + step + N) % N;
      setActive(next);
      requestAnimationFrame(() => starRefs.current[next]?.focus());
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(i);
    }
  };

  const t = TESTIMONIALS[active];
  const activeStar = STAR_POSITIONS[active];
  const side = activeStar.x < 50 ? "right" : "left";
  // Tile position: anchor to star vertically, offset horizontally.
  // 4% horizontal gap matches the connector line length.
  const tileStyle =
    side === "right"
      ? { left: `${activeStar.x + 4}%`, top: `${activeStar.y}%` }
      : { right: `${100 - activeStar.x + 4}%`, top: `${activeStar.y}%` };

  // Connector line endpoints in viewBox units.
  const cx1 = vx(activeStar.x);
  const cy1 = vy(activeStar.y);
  const cx2 = vx(activeStar.x + (side === "right" ? 4 : -4));
  const cy2 = cy1;

  // Polyline points for the constellation line.
  const polyPoints = STAR_POSITIONS.map((s) => `${vx(s.x)},${vy(s.y)}`).join(
    " "
  );

  return (
    <section
      className="section pscard pscard--xero"
      aria-label="Client testimonials"
    >
      <NebulaBackdrop />

      <div className="container">
        <Reveal>
          <div className="pscard__head">
            <h2>What our clients say.</h2>
            <p className="pscard__sub">In their words.</p>
            <p className="pscard__desc">
              We partner closely with founders and teams — and let the
              relationship, and the work, speak for itself.
            </p>
            <a href={CTA_HREF} className="pscard__cta">
              <span>Start a project</span>
              <span className="pscard__cta-badge" aria-hidden="true">
                <Arrow />
              </span>
            </a>
          </div>
        </Reveal>

        <div
          ref={containerRef}
          className={`constel${drawn ? " is-drawn" : ""}`}
        >
          <svg
            className="constel__svg"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="constelHalo">
                <stop offset="0%" stopColor="rgba(140, 170, 220, 0.7)" />
                <stop offset="60%" stopColor="rgba(140, 170, 220, 0.18)" />
                <stop offset="100%" stopColor="rgba(140, 170, 220, 0)" />
              </radialGradient>
              <filter id="constelGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <polyline
              className="constel__line"
              points={polyPoints}
              pathLength="1"
            />

            {/* connector from active star to tile edge */}
            <line
              className="constel__connector"
              x1={cx1}
              y1={cy1}
              x2={cx2}
              y2={cy2}
            />

            {STAR_POSITIONS.map((s, i) => (
              <g
                key={i}
                ref={(el) => {
                  starRefs.current[i] = el;
                }}
                className={`constel__star${i === active ? " is-active" : ""}`}
                transform={`translate(${vx(s.x)} ${vy(s.y)})`}
                role="button"
                tabIndex={0}
                aria-label={`Show testimonial from ${TESTIMONIALS[i].name}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <circle r="18" fill="url(#constelHalo)" className="constel__halo" />
                <circle r="4" fill="#fff" className="constel__dot" filter="url(#constelGlow)" />
                <text
                  className="constel__label"
                  y="-22"
                  textAnchor="middle"
                  fontSize="12"
                >
                  Nº{String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
          </svg>

          {/* desktop tile — key={active} re-mounts on swap so the
              CSS keyframe runs */}
          <div key={`d-${active}`} className="constel__tile" style={tileStyle}>
            <TileBody t={t} />
          </div>

          {/* mobile fallback — dot row + full-width tile */}
          <div className="constel__mobile">
            <div className="constel__dots" role="tablist" aria-label="Choose a testimonial">
              {TESTIMONIALS.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial from ${c.name}`}
                  className={`constel__dot-btn${
                    i === active ? " is-active" : ""
                  }`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <div key={`m-${active}`} className="constel__tile-mobile">
              <TileBody t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
