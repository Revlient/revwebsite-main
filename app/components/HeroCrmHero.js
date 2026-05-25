"use client";

import Reveal from "./Reveal";
import WorkFeatureSection from "./WorkFeatureSection";
import { CTA_HREF } from "../lib/site";

/* New home hero. Dark surface, huge bold sans-serif headline,
   then the locked WorkFeatureSection dashboard dominating the
   lower half inside a glass frame. WFS itself is untouched —
   props + scoped CSS overrides only. */

const WFS_PROPS = {
  pill: "Included with every active project",
  heading: "Your project, on a live workspace.",
  sub: "Track phases, transfer assets, raise enquiries — every active engagement comes with its own CRM.",
  greeting: "Good afternoon, Kevin",
  showcaseLabel: "Client portal · Phases · Assets · Enquiries",
};

export default function HeroCrmHero() {
  return (
    <section className="h2-hero" id="top" aria-label="Revlient — studio hero">
      <div className="h2-hero__wash" aria-hidden="true" />
      <div className="h2-hero__grid" aria-hidden="true" />

      <div className="container h2-hero__inner">
        <Reveal>
          <span className="h2-eyebrow h2-eyebrow--dark">
            <span className="h2-eyebrow__dot" />
            Revlient — Creative Studio
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="h2-hero__title">
            A studio that ships.
            <br />
            <span className="h2-hero__accent">And a CRM that stays.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="h2-hero__sub">
            Design, engineering and motion under one roof — shipped on a
            live workspace you actually log into. The CRM doesn&apos;t
            leave when the launch does.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="h2-hero__cta">
            <a href={CTA_HREF} className="h2-btn h2-btn--primary">
              Start a project
              <span className="h2-btn__arrow" aria-hidden="true">→</span>
            </a>
            <a href="/work" className="h2-btn h2-btn--ghost h2-btn--ghost-dark">
              See the work
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="h2-hero__frame" delay={320}>
        <div className="h2-hero__frame-glow" aria-hidden="true" />
        <div className="h2-hero__frame-inner">
          <WorkFeatureSection {...WFS_PROPS} />
        </div>
      </Reveal>
    </section>
  );
}
