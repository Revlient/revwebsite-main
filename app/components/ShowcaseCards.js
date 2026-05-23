"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import XeroBackdrop from "./XeroBackdrop";
import { CTA_HREF } from "../lib/site";

/* Magazine pull-quote spread. One featured testimonial fills the
   section; a thumbnail strip below lets visitors swap which client
   is featured. Auto-rotates every 8s with hover/visibility/reduced-
   motion pauses; left/right arrows on a focused thumb move active +
   focus.

   PROOF RULE: real client identities only when supplied by Revlient.
   Quote text stays the existing placeholder string until permission-
   cleared wording lands. No fabricated faces — if `img` is empty the
   tone-coloured initials circle is the avatar. */

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
  const [paused, setPaused] = useState(false);
  const thumbRefs = useRef([]);
  const reducedRef = useRef(false);

  // detect reduced-motion once on mount
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // auto-rotate every 8s unless paused or reduced-motion
  useEffect(() => {
    if (paused || reducedRef.current) return undefined;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % N);
    }, 8000);
    return () => clearInterval(id);
  }, [paused]);

  // pause when the tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKey = (e, i) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const step = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + step + N) % N;
      setActive(next);
      // wait one frame so tabIndex updates land before we move focus
      requestAnimationFrame(() => thumbRefs.current[next]?.focus());
    }
  };

  const t = TESTIMONIALS[active];

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

        {/* Featured testimonial. key={active} re-mounts on change so
            the CSS keyframe runs the crossfade automatically. */}
        <div className="pscard__feature" key={active}>
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

        {/* Thumbnail strip — IS the navigation; no separate prev/next */}
        <div
          className={`pscard__thumbs${
            paused || reducedRef.current ? " is-paused" : ""
          }`}
          role="tablist"
          aria-label="Choose a testimonial"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TESTIMONIALS.map((c, i) => (
            <button
              key={i}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show testimonial from ${c.name}`}
              tabIndex={i === active ? 0 : -1}
              className={`pscard__thumb ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="pscard__thumb-media">
                <span className={`pscard__thumb-avatar t-${c.tone}`}>
                  {c.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.img} alt="" draggable={false} />
                  ) : (
                    <span>{c.initials}</span>
                  )}
                </span>
                {/* Auto-rotate progress ring — only visible on the
                    active thumb. key={active} re-mounts on every
                    change so the CSS keyframe restarts from 0. */}
                {i === active && !reducedRef.current && (
                  <svg
                    key={active}
                    className="pscard__ring"
                    viewBox="0 0 44 44"
                    aria-hidden="true"
                  >
                    <circle
                      className="pscard__ring-arc"
                      cx="22"
                      cy="22"
                      r="21"
                      fill="none"
                      stroke="var(--blue-light)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      pathLength="1"
                      strokeDasharray="1 1"
                    />
                  </svg>
                )}
              </span>
              <span className="pscard__thumb-name">{c.name}</span>
              {c.service && (
                <span
                  className={`pscard__service pscard__service--sm${
                    c.service.startsWith("TODO") ? " pscard__service--todo" : ""
                  }`}
                >
                  {c.service}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
