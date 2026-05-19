"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Project-showcase carousel: 6 duotone "FaceCards"-style cards in a
   coverflow — centre card flat, side cards angled in 3D perspective —
   advanced with a Next/Prev button. Vanilla JS + plain CSS, no deps;
   hardware-accelerated CSS transforms only.

   Copy localized to Revlient (source was a fintech "FaceCards" demo).
   Card portraits are decorative Unsplash placeholders for the mockup. */
const CARDS = [
  { name: "MARGARET O. GUIDRY", no: "8758  ****  ****  0947", exp: "10/14", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80&auto=format&fit=crop", tone: "a" },
  { name: "ROBERT M. MCCRAY", no: "3759  ****  ****  9456", exp: "12/30", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&auto=format&fit=crop", tone: "b" },
  { name: "JANICE W. SEYMOUR", no: "9270  ****  ****  1554", exp: "07/06", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80&auto=format&fit=crop", tone: "c" },
  { name: "DECLAN A. ROWE", no: "6142  ****  ****  3380", exp: "04/27", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80&auto=format&fit=crop", tone: "b" },
  { name: "PRIYA N. KAPOOR", no: "5023  ****  ****  7719", exp: "09/29", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80&auto=format&fit=crop", tone: "a" },
  { name: "TOMÁS E. REYES", no: "4710  ****  ****  6628", exp: "01/26", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80&auto=format&fit=crop", tone: "c" },
];
const N = CARDS.length;

const Mark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="currentColor" d="M12 2c.6 3.3 2.7 5.4 6 6-3.3.6-5.4 2.7-6 6-.6-3.3-2.7-5.4-6-6 3.3-.6 5.4-2.7 6-6Zm6.5 11c.4 2 1.6 3.2 3.5 3.5-2 .4-3.1 1.6-3.5 3.5-.4-2-1.6-3.1-3.5-3.5 2-.4 3.1-1.6 3.5-3.5Z" />
  </svg>
);
const Contactless = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M8 8.5a6 6 0 0 1 0 7" />
      <path d="M11 6a9.5 9.5 0 0 1 0 12" />
      <path d="M14 4a13 13 0 0 1 0 16" />
    </g>
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
            <h2>Designed down to the last detail.</h2>
            <p className="pscard__sub">Premium, by default — not by accident.</p>
            <p className="pscard__desc">
              We treat every surface like a flagship product: considered
              materials, real depth, and motion that earns its place.
            </p>
            <a href={CTA_HREF} className="pscard__cta">
              <span>Start today!</span>
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
                <article
                  key={c.name}
                  className={`pscard__card t-${c.tone} ${
                    o === 0 ? "is-active" : ""
                  }`}
                  aria-hidden={o !== 0}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${
                      o * 54
                    }%) translateZ(${-a * 130}px) rotateY(${
                      o * -34
                    }deg) scale(${1 - Math.min(a, 2) * 0.06})`,
                    opacity: visible ? (a === 0 ? 1 : a === 1 ? 0.7 : 0.35) : 0,
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
                      <span>
                        Personal Cards <sup>®</sup>
                      </span>
                    </span>
                  </div>
                  <div className="pscard__card-foot">
                    <div className="pscard__field">
                      <span className="pscard__lbl">Card No</span>
                      <span className="pscard__val">{c.no}</span>
                    </div>
                    <div className="pscard__field">
                      <span className="pscard__lbl">Card Holder</span>
                      <span className="pscard__val">{c.name}</span>
                    </div>
                    <div className="pscard__row">
                      <div className="pscard__field">
                        <span className="pscard__lbl">Exp Date</span>
                        <span className="pscard__val">{c.exp}</span>
                      </div>
                      <span className="pscard__contactless" aria-hidden="true">
                        <Contactless />
                      </span>
                    </div>
                  </div>
                </article>
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
