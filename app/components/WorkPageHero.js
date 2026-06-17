"use client";

import Reveal from "./Reveal";
import AiAuraCta from "./AiAuraCta";
import { CTA_HREF } from "../lib/site";

// Centred editorial hero for /work. Soft blue side gradients
// frame a centred title + sub-copy + AI-aura CTA; the section
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
          <AiAuraCta
            href={CTA_HREF}
            label="FREE CONSULTATION"
            className="work-intro-hero__ai-cta"
          />
        </Reveal>
      </div>
    </section>
  );
}
