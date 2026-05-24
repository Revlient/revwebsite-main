"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import NebulaBackdrop from "./showcase/NebulaBackdrop";
import { CTA_HREF } from "../lib/site";

/* Wall of love — two rows of testimonial cards drifting horizontally
   in opposite directions. Glassmorphic cards on the dark NebulaBackdrop
   cosmos. Same data the bookshelf used; restyled as avatar + name +
   @handle on top of the card with the quote body underneath.

   PROOF RULE: real client identities only when supplied. Handles +
   quote bodies stay placeholder until permission-cleared content
   lands. No fabricated faces — empty img falls back to tone-coloured
   initials. */

const TONES = ["a", "b", "c"];

// Slight variation in placeholder copy per entry so the wall doesn't
// read as the same string repeating. Each card includes a "TODO N"
// counter + an @revlient mention so the highlighted-link styling on
// @handles in quotes is visible.
const QUOTE_VARIANTS = [
  "@revlient delivered — placeholder testimonial TODO 01. Real, approved quote lands here before launch.",
  "Working with @revlient was — placeholder testimonial TODO 02. Replace with the real, approved quote.",
  "@revlient shipped the whole thing — placeholder testimonial TODO 03. Real quote pending.",
  "Talked to @revlient about — placeholder testimonial TODO 04. Approved wording goes here.",
  "What I noticed about @revlient — placeholder testimonial TODO 05. Real quote before launch.",
  "@revlient handled the part — placeholder testimonial TODO 06. Replace before launch.",
  "Honestly, @revlient is — placeholder testimonial TODO 07. Real quote pending approval.",
  "@revlient picked up — placeholder testimonial TODO 08. Approved copy lands here.",
  "What surprised me about @revlient — placeholder testimonial TODO 09. Real quote pending.",
  "@revlient turned the spec into — placeholder testimonial TODO 10. Replace before launch.",
  "@revlient stayed on it — placeholder testimonial TODO 11. Real, approved quote here.",
  "@revlient figured out — placeholder testimonial TODO 12. Approved quote lands before launch.",
];

const TESTIMONIALS = [
  { name: "Anil Chakkrapani", role: "Founder, Medcity International Academy" },
  { name: "Client Name", role: "Director, Company" },
  { name: "Aswin Pradeep", role: "Magnate Study Abroad" },
  { name: "Client Name", role: "Head of Product, Company" },
  { name: "Client Name", role: "Founder, Company" },
  { name: "Client Name", role: "Managing Director, Company" },
  { name: "Client Name", role: "COO, Company" },
  { name: "Client Name", role: "Co-founder, Company" },
  { name: "Client Name", role: "CEO, Company" },
  { name: "Client Name", role: "VP Engineering, Company" },
  { name: "Johnson", role: "Founder, IBS Consultancy" },
  { name: "Client Name", role: "Founder, Company" },
].map((t, i) => ({
  ...t,
  quote: QUOTE_VARIANTS[i % QUOTE_VARIANTS.length],
  handle: "@todo-handle",
  tone: TONES[i % 3],
  initials: t.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
}));

// Cycle 3 width variants so adjacent cards differ — desktop only.
const WIDTHS = ["min(360px, 90%)", "min(420px, 92%)", "min(480px, 95%)"];

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

/* Tokenises a quote string and wraps any @-prefixed token in a
   styled span so @mentions render as purple links. Splits on
   whitespace to preserve word boundaries. */
function QuoteBody({ text }) {
  const tokens = text.split(/(\s+)/);
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.startsWith("@")) {
          return (
            <span key={i} className="wol__handle">
              {tok}
            </span>
          );
        }
        return tok;
      })}
    </>
  );
}

function Card({ t, widthIndex }) {
  return (
    <figure
      className="wol__card"
      role="figure"
      style={{ width: WIDTHS[widthIndex % WIDTHS.length] }}
    >
      <header className="wol__card-head">
        <span className={`wol__avatar t-${t.tone}`} aria-hidden="true">
          <span>{t.initials}</span>
        </span>
        <span className="wol__card-id">
          <span className="wol__card-name">{t.name}</span>
          <span className="wol__card-handle">{t.handle}</span>
        </span>
      </header>
      <blockquote className="wol__card-quote">
        <QuoteBody text={t.quote} />
      </blockquote>
      <figcaption className="sr-only">
        {t.name}, {t.role}
      </figcaption>
    </figure>
  );
}

function SparkleField() {
  // 18 deterministic-position "+" twinkle marks behind the section
  // head — same pattern as the showcase hero. SSR-stable via useMemo.
  const marks = useMemo(() => {
    const out = [];
    for (let i = 0; i < 18; i++) {
      out.push({
        top: (i * 47 + 9) % 100,
        left: (i * 73 + 13) % 100,
        size: 8 + ((i * 0.7) % 6),
        delay: -((i * 0.91) % 6),
        dur: 4 + ((i * 1.1) % 4),
      });
    }
    return out;
  }, []);
  return (
    <div className="wol__sparks" aria-hidden="true">
      {marks.map((m, i) => (
        <span
          key={i}
          className="wol__spark"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            fontSize: `${m.size}px`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.dur}s`,
          }}
        >
          +
        </span>
      ))}
    </div>
  );
}

export default function ShowcaseCards() {
  // Hover any card → pause both rows. Touch / focus also toggles it.
  const [paused, setPaused] = useState(false);

  // Split into two rows. Even indices to row 1, odd to row 2, so each
  // row stays varied. Each row gets duplicated for the seamless loop.
  const row1 = TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const row2 = TESTIMONIALS.filter((_, i) => i % 2 === 1);

  return (
    <section
      className="section pscard pscard--xero"
      aria-label="Client testimonials"
    >
      <NebulaBackdrop />

      <div className="container">
        <SparkleField />

        <Reveal>
          <div className="pscard__head wol__head">
            <span className="wol__eyebrow">Wall of love</span>
            <h2>
              Loved by <em>builders.</em>
            </h2>
            <p className="pscard__sub">In their words.</p>
            <p className="pscard__desc">
              Here&apos;s what teams are saying about working with us.
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
          className={`wol${paused ? " is-paused" : ""}`}
          aria-label="Client testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Row 1 — drifts LEFT */}
          <div className="wol__row wol__row--left">
            <div className="wol__track">
              {[...row1, ...row1].map((t, i) => (
                <Card key={`r1-${i}`} t={t} widthIndex={i} />
              ))}
            </div>
          </div>

          {/* Row 2 — drifts RIGHT (desktop only) */}
          <div className="wol__row wol__row--right wol__row--desktop">
            <div className="wol__track">
              {[...row2, ...row2].map((t, i) => (
                <Card key={`r2-${i}`} t={t} widthIndex={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
