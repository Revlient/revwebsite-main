"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Testimonial carousel — same coverflow/globe alignment as before,
   card content swapped from project thumbnail+URL to a client quote
   with a CEO avatar. Vanilla JS + plain CSS, no deps.

   PROOF RULE: we never invent client quotes or use a fake person's
   photo. Every entry below is a clearly-marked placeholder. To go
   live: drop the real headshot in /public/testimonials/<file> and
   set `img` to that path, and replace quote/name/role with the
   real, approved testimonial. Until `img` is set it falls back to
   an initials avatar (no fabricated face). */
const TONES = ["a", "b", "c"];

const TESTIMONIALS = [
  // TODO(content): replace ALL entries with real, approved client
  // testimonials + real names/roles + real headshots before launch.
  {
    quote:
      "Placeholder testimonial — replace with a real, approved client quote before launch.",
    name: "Client Name",
    role: "Founder & CEO, Company",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with a real, approved client quote before launch.",
    name: "Client Name",
    role: "Managing Director, Company",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with a real, approved client quote before launch.",
    name: "Client Name",
    role: "Co-founder, Company",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with a real, approved client quote before launch.",
    name: "Client Name",
    role: "Head of Product, Company",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with a real, approved client quote before launch.",
    name: "Client Name",
    role: "CEO, Company",
    img: "",
  },
  {
    quote:
      "Placeholder testimonial — replace with a real, approved client quote before launch.",
    name: "Client Name",
    role: "Director, Company",
    img: "",
  },
].map((t, i) => ({
  ...t,
  tone: TONES[i % 3],
  initials: t.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase(),
}));
const N = TESTIMONIALS.length;

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
    <section className="section pscard" aria-label="Client testimonials">
      <div className="pscard__lights" aria-hidden="true">
        <span className="pscard__streak s1" />
        <span className="pscard__streak s2" />
        <span className="pscard__streak s3" />
        <span className="pscard__streak s4" />
      </div>

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

        <div className="pscard__stage">
          <div className="pscard__deck">
            {TESTIMONIALS.map((c, i) => {
              // signed wrap distance from the active card (-3..3)
              let o = (i - active + N) % N;
              if (o > N / 2) o -= N;
              const a = Math.abs(o);
              const visible = a <= 2;
              return (
                <div
                  key={i}
                  aria-hidden={visible ? undefined : "true"}
                  className={`pscard__card t-${c.tone} ${
                    o === 0 ? "is-active" : ""
                  }`}
                  style={{
                    // Same horizontal alignment (114% step, gaps) — only
                    // a subtle inward "globe" curve: cards turn toward
                    // centre, recede and lift a touch with distance, so
                    // the row bows like a slice of a sphere. Ends bend
                    // further and fade at the edges.
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
                  <span className="pscard__avatar">
                    {c.img ? (
                      <img src={c.img} alt={c.name} draggable={false} />
                    ) : (
                      <span className="pscard__initials">{c.initials}</span>
                    )}
                  </span>
                  <span className="pscard__quotemark" aria-hidden="true">
                    &#8220;
                  </span>
                  <blockquote className="pscard__quote">{c.quote}</blockquote>
                  <div className="pscard__person">
                    <span className="pscard__name">{c.name}</span>
                    <span className="pscard__role">{c.role}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pscard__nav">
            <button
              type="button"
              className="pscard__navbtn"
              aria-label="Previous testimonial"
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
              aria-label="Next testimonial"
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
