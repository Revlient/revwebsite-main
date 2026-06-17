"use client";

import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

// Centred editorial hero for /work. Soft blue side gradients
// frame a centred title + sub-copy + primary CTA; the section
// height is set so the top edge of the client-card grid begins
// peeking in at the bottom of the viewport (~25%).
export default function WorkPageHero() {
  return (
    <section className="work-intro-hero" aria-labelledby="work-intro-title">
      <div className="work-intro-hero__bg" aria-hidden="true" />
      <div className="work-intro-hero__inner">
        <Reveal>
          <span className="work-intro-hero__eyebrow">Selected work</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 id="work-intro-title" className="work-intro-hero__title">
            Built for{" "}
            <span className="work-intro-hero__italic">founders</span>
            <br />
            who measure outcomes.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="work-intro-hero__sub">
            Websites, apps and operating systems shipped end-to-end
            for founders across education, healthcare, construction,
            retail and interior design.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <a
            href={CTA_HREF}
            className="work-intro-hero__cta cta-with-tooltip cta-with-tooltip--above"
            data-tooltip="get a reservation in under 3 clicks"
          >
            <span>Free consultation</span>
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
