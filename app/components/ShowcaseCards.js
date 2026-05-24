"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import NebulaBackdrop from "./showcase/NebulaBackdrop";
import { CTA_HREF } from "../lib/site";

/* Library-shelf testimonials. Each client is a vertical book spine
   on a thin warm plinth; hover/click any spine and it lifts + tilts
   forward and a cream printed-page panel appears above showing the
   testimonial.

   The shelf sits inside the existing NebulaBackdrop cosmos. No
   auto-rotate — the shelf is read at the visitor's pace.

   PROOF RULE: real client identities only when supplied by Revlient.
   Quote text + service field stay placeholders (amber 'TODO: service'
   chips) until permission-cleared content lands. */

// Quote text shared across every entry — it stays the placeholder
// string until permission-cleared wording lands.
const DEMO_QUOTE =
  "Placeholder testimonial — replace with the real, approved quote before launch.";

const TESTIMONIALS = [
  // Real clients supplied by Revlient interleave with TODO placeholders
  // so the shelf reads varied without faking attribution.
  { quote: DEMO_QUOTE, name: "Anil Chakkrapani", role: "Founder, Medcity International Academy", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "Director, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Aswin Pradeep", role: "Magnate Study Abroad", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "Head of Product, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "Founder, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "Managing Director, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "COO, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "Co-founder, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "CEO, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "VP Engineering, Company", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Johnson", role: "Founder, IBS Consultancy", service: "TODO: service" },
  { quote: DEMO_QUOTE, name: "Client Name", role: "Founder, Company", service: "TODO: service" },
];

const N = TESTIMONIALS.length;

// Per-spine widths / heights / colours. Variation matters — without
// it the row reads "stacked tile", not "shelf of books". 12 entries
// matches the TESTIMONIALS array length.
const SPINE_WIDTHS = [40, 50, 34, 52, 44, 38, 48, 36, 46, 42, 50, 38]; // px
const SPINE_HEIGHTS = [220, 236, 208, 240, 222, 214, 232, 226, 218, 238, 212, 230]; // px

// Low-saturation editorial palette. Background = spine cloth colour,
// band = top head-band accent.
const SPINE_PALETTE = [
  { bg: "#3b2f5a", band: "#b8956a", text: "#e9dec9" }, // deep purple / gold
  { bg: "#5a2a2a", band: "#d4c4a8", text: "#f1e6cf" }, // oxblood / cream
  { bg: "#1f2e4d", band: "#a8b8d4", text: "#e0e8f4" }, // navy / pale blue
  { bg: "#2a4a3c", band: "#b8956a", text: "#d8e6dc" }, // forest / gold
  { bg: "#6e5530", band: "#d4c4a8", text: "#f3eedd" }, // mustard / cream
  { bg: "#344450", band: "#b8956a", text: "#d8e0e8" }, // slate / gold
  { bg: "#6b5d4a", band: "#5070a0", text: "#f3ede0" }, // bone / navy
];

// Precomputed center % of each spine within the row (for page panel
// alignment). Stable across renders since SPINE_WIDTHS is constant.
const ROW_GAP = 6;
const ROW_WIDTH =
  SPINE_WIDTHS.reduce((a, b) => a + b, 0) + (N - 1) * ROW_GAP;
const SPINE_CENTERS = SPINE_WIDTHS.map((w, i) => {
  const prev =
    SPINE_WIDTHS.slice(0, i).reduce((a, b) => a + b, 0) + i * ROW_GAP;
  return ((prev + w / 2) / ROW_WIDTH) * 100;
});

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
  const [drawn, setDrawn] = useState(false);
  const shelfRef = useRef(null);
  const spineRefs = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDrawn(true);
      return undefined;
    }
    const el = shelfRef.current;
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
      requestAnimationFrame(() => spineRefs.current[next]?.focus());
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(i);
    }
  };

  const t = TESTIMONIALS[active];
  // Auto-flip the page panel so it stays inside the shelf width:
  // spines in the first half anchor the panel to their right; spines
  // in the second half anchor it to their left.
  const side = active < N / 2 ? "right" : "left";
  const pageStyle =
    side === "right"
      ? {
          left: `${SPINE_CENTERS[active]}%`,
          transform: "translate(0, 0)",
        }
      : {
          left: `${SPINE_CENTERS[active]}%`,
          transform: "translate(-100%, 0)",
        };

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
          ref={shelfRef}
          className={`bshelf${drawn ? " is-drawn" : ""}`}
        >
          <div className="bshelf__row">
            <div className="bshelf__lights" aria-hidden="true" />

            {TESTIMONIALS.map((c, i) => {
              const pal = SPINE_PALETTE[i % SPINE_PALETTE.length];
              return (
                <button
                  key={i}
                  ref={(el) => {
                    spineRefs.current[i] = el;
                  }}
                  type="button"
                  className={`bshelf__spine${
                    i === active ? " is-active" : ""
                  }`}
                  aria-label={`Open testimonial from ${c.name}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  style={{
                    width: `${SPINE_WIDTHS[i]}px`,
                    height: `${SPINE_HEIGHTS[i]}px`,
                    background: pal.bg,
                    color: pal.text,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  <span
                    className="bshelf__spine-band"
                    style={{ background: pal.band }}
                  />
                  <span className="bshelf__spine-foil" />
                  <span className="bshelf__spine-text">{c.name}</span>
                  <span className="bshelf__spine-num">
                    Nº{String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}

            <div className="bshelf__plinth" aria-hidden="true" />

            {/* Page panel — re-mounted on active change to run the
                CSS fade-up keyframe afresh. Lives in the same row
                container so positioning by center % works. */}
            <div
              key={`page-d-${active}`}
              className="bshelf__page bshelf__page--desktop"
              style={pageStyle}
              aria-live="polite"
            >
              <PageContent t={t} active={active} />
            </div>
          </div>

          {/* Mobile page panel — sits below the shelf as a full-width
              card; positioning above is desktop-only. */}
          <div
            key={`page-m-${active}`}
            className="bshelf__page bshelf__page--mobile"
            aria-live="polite"
          >
            <PageContent t={t} active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PageContent({ t, active }) {
  return (
    <>
      <span className="bshelf__page-num">
        Nº{String(active + 1).padStart(2, "0")}
      </span>
      <blockquote className="bshelf__page-quote">{t.quote}</blockquote>
      <span className="bshelf__page-rule" aria-hidden="true" />
      <div className="bshelf__page-cite">
        <strong>{t.name}</strong>
        <span>{t.role}</span>
        {t.service && (
          <span
            className={`pscard__service pscard__service--sm${
              t.service.startsWith("TODO") ? " pscard__service--todo" : ""
            }`}
          >
            {t.service}
          </span>
        )}
      </div>
    </>
  );
}
