"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import XeroBackdrop from "./XeroBackdrop";
import { CTA_HREF } from "../lib/site";

/* Marquee mention wall. Featured client quote on the left;
   three vertical columns of testimonial cards drift at varied
   speeds + directions on the right. Hover/focus/click any card
   pauses all three columns and lifts that card into the featured
   slot. Auto-rotates every 8s when nothing is hovered.

   PROOF RULE: real client identities only when supplied by Revlient.
   Quote text + service field stay placeholders (clearly flagged as
   amber 'TODO: service' chips) until permission-cleared content
   lands. No fabricated faces — if `img` is empty the tone-coloured
   initials circle is the avatar. */

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

// Distribute round-robin into 3 columns so each column carries a
// different slice of clients.
const COLS = [0, 1, 2].map((c) =>
  TESTIMONIALS.filter((_, i) => i % 3 === c)
);

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

function FeatureBlock({ t }) {
  return (
    <div className="pscard__feature">
      <span className="pscard__feature-mark" aria-hidden="true">
        &#8220;
      </span>
      <blockquote className="pscard__feature-quote">{t.quote}</blockquote>
      <span className="pscard__feature-rule" aria-hidden="true" />
      <div className={`pscard__feature-avatar t-${t.tone}`}>
        {t.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.img} alt={t.name} draggable={false} />
        ) : (
          <span className="pscard__feature-initials">{t.initials}</span>
        )}
      </div>
      <div className="pscard__feature-person">
        <strong className="pscard__feature-name">{t.name}</strong>
        <span className="pscard__feature-role">{t.role}</span>
        {t.service && (
          <span
            className={`pscard__service${
              t.service.startsWith("TODO") ? " pscard__service--todo" : ""
            }`}
          >
            {t.service}
          </span>
        )}
      </div>
    </div>
  );
}

function WallCard({ t, active, onActivate }) {
  const isActive = t.idx === active;
  return (
    <button
      type="button"
      data-active={isActive ? "true" : undefined}
      className="mwall__card"
      aria-label={`Show testimonial from ${t.name}`}
      onMouseEnter={() => onActivate(t.idx)}
      onFocus={() => onActivate(t.idx)}
      onClick={() => onActivate(t.idx)}
    >
      <span className="mwall__card-head">
        <span className={`mwall__card-avatar t-${t.tone}`}>
          {t.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.img} alt="" draggable={false} />
          ) : (
            <span>{t.initials}</span>
          )}
        </span>
        <span className="mwall__card-name">{t.name}</span>
      </span>
      <blockquote className="mwall__card-quote">{t.quote}</blockquote>
      <span className="mwall__card-role">{t.role}</span>
      {t.service && (
        <span
          className={`pscard__service pscard__service--sm${
            t.service.startsWith("TODO") ? " pscard__service--todo" : ""
          }`}
        >
          {t.service}
        </span>
      )}
    </button>
  );
}

export default function ShowcaseCards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // 8s auto-rotate when nothing is hovered + not reduced-motion
  useEffect(() => {
    if (paused || reducedRef.current) return undefined;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % N);
    }, 8000);
    return () => clearInterval(id);
  }, [paused]);

  // pause when tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onActivate = (i) => {
    setActive(i);
    setPaused(true);
  };

  const t = TESTIMONIALS[active];
  const wallPaused = paused || reducedRef.current;

  const renderCol = (items, colIdx) => (
    <div key={colIdx} className={`mwall__col mwall__col--${colIdx + 1}`}>
      <div className="mwall__col-track">
        {[...items, ...items].map((card, j) => (
          <WallCard
            key={`${colIdx}-${j}`}
            t={card}
            active={active}
            onActivate={onActivate}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section
      className="section pscard pscard--xero"
      aria-label="Client testimonials"
    >
      <XeroBackdrop />

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

        <div className="pscard__container">
          {/* key={active} re-mounts the wrap so the existing fade-up
              keyframe in .pscard__feature runs on every swap */}
          <div key={active} className="pscard__feature-wrap">
            <FeatureBlock t={t} />
          </div>

          {/* Desktop: 3 vertical columns scrolling at varied speeds */}
          <div
            className={`mwall mwall--desktop${wallPaused ? " is-paused" : ""}`}
            onMouseLeave={() => setPaused(false)}
          >
            {COLS.map((items, idx) => renderCol(items, idx))}
          </div>

          {/* Mobile: single horizontal row */}
          <div
            className={`mwall mwall--mobile${wallPaused ? " is-paused" : ""}`}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="mwall__col">
              <div className="mwall__col-track">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((card, j) => (
                  <WallCard
                    key={`m-${j}`}
                    t={card}
                    active={active}
                    onActivate={onActivate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
