"use client";

import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

// Editorial white-bg hero for /work — matches the services-hero
// composition: eyebrow, italic-accent headline, sub-copy, primary +
// ghost CTA. Sits at the top of the work page, above the existing
// cinematic WorkHero.
export default function WorkPageHero() {
  return (
    <section className="work-intro-hero" aria-labelledby="work-intro-title">
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
            A small body of work — websites, apps and operating systems shipped
            for founders and operators across education, healthcare,
            construction, retail and interior design. Each one scoped on a
            single call, built end-to-end, owned by the team that runs it.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="work-intro-hero__actions">
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
            <a href="/services" className="work-intro-hero__ghost">
              See our services
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
