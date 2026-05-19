"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Project-showcase carousel — each card is a real client site: it
   links out and shows the site's live thumbnail. Coverflow with a
   subtle globe curve, Next/Prev. Vanilla JS + plain CSS, no deps.

   Thumbnails via thum.io (free, no key); House of 11 uses the uploaded
   self-hosted screenshot. Display names derived from the domains. */
const TONES = ["a", "b", "c"];
const SITE = (url, name, local) => {
  const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return {
    url,
    name,
    host,
    img: local || `https://image.thum.io/get/width/1200/crop/1500/${url}`,
  };
};

const CARDS = [
  SITE("https://www.perpexbschool.com", "Perpex B-School"),
  SITE("https://www.houseof11.in", "House of 11", "/work/houseof11.png"),
  SITE("https://magnate-studyabroad2.vercel.app", "Magnate Study Abroad"),
  SITE("https://ibsconsultants.in", "IBS Consultants"),
  SITE("https://www.covspace.in", "Covspace"),
  SITE("https://ronspire.com", "Ronspire"),
  SITE("https://www.perpex.in", "Perpex"),
  SITE("https://mathleteonline.com", "Mathlete Online"),
  SITE("https://themagnates.in", "The Magnates"),
  SITE("https://www.bambrush.co.in", "Bambrush"),
  SITE("https://www.soumyashyammakeup.com", "Soumya Shyam Makeup"),
].map((s, i) => ({ ...s, tone: TONES[i % 3] }));
const N = CARDS.length;

const Mark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="currentColor" d="M12 2c.6 3.3 2.7 5.4 6 6-3.3.6-5.4 2.7-6 6-.6-3.3-2.7-5.4-6-6 3.3-.6 5.4-2.7 6-6Zm6.5 11c.4 2 1.6 3.2 3.5 3.5-2 .4-3.1 1.6-3.5 3.5-.4-2-1.6-3.1-3.5-3.5 2-.4 3.1-1.6 3.5-3.5Z" />
  </svg>
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

export default function ShowcaseCards() {
  const [active, setActive] = useState(0);
  const go = (step) => setActive((a) => (a + step + N) % N);

  return (
    <section className="section pscard" aria-label="Showcase">
      <div className="pscard__lights" aria-hidden="true">
        <span className="pscard__streak s1" />
        <span className="pscard__streak s2" />
        <span className="pscard__streak s3" />
        <span className="pscard__streak s4" />
      </div>

      <div className="container">
        <Reveal>
          <div className="pscard__head">
            <h2>Crafted to be unforgettable.</h2>
            <p className="pscard__sub">Every surface, considered.</p>
            <p className="pscard__desc">
              We design and build 3D-grade websites and products —
              premium by default, fast on a mid-range phone, and
              unmistakably yours.
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
            {CARDS.map((c, i) => {
              // signed wrap distance from the active card (-3..3)
              let o = (i - active + N) % N;
              if (o > N / 2) o -= N;
              const a = Math.abs(o);
              const visible = a <= 2;
              return (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} — opens in a new tab`}
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
                  <img
                    className="pscard__photo"
                    src={c.img}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="pscard__tint" aria-hidden="true" />
                  <div className="pscard__card-top">
                    <span className="pscard__logo">
                      <Mark />
                      <span>Revlient</span>
                    </span>
                  </div>
                  <div className="pscard__card-foot">
                    <div className="pscard__field">
                      <span className="pscard__lbl">Project</span>
                      <span className="pscard__val">{c.name}</span>
                    </div>
                    <div className="pscard__row">
                      <div className="pscard__field">
                        <span className="pscard__lbl">Website</span>
                        <span className="pscard__val">{c.host}</span>
                      </div>
                      <span className="pscard__contactless" aria-hidden="true">
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="pscard__nav">
            <button
              type="button"
              className="pscard__navbtn"
              aria-label="Previous card"
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
              aria-label="Next card"
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
