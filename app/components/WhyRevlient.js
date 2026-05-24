"use client";

import Reveal from "./Reveal";
import Specimen from "./whyrevlient/Specimens";
import { CTA_HREF } from "../lib/site";

/* Why-Revlient hero. Gargantua-style accretion disk on the left;
   large glassmorphic tile on top carrying the heading + three
   "design specimen" rows; right half stays intentionally empty
   (white-space rule).

   Each Capability / Reliability / Loyalty pillar shows a small
   inline-SVG UI specimen (dashboard / deploy panel / chat thread)
   instead of an icon. Text underneath each specimen becomes a
   short caption — the specimen does the heavy lifting. */

const PILLARS = [
  {
    key: "capability",
    label: "Capability",
    body:
      "Design, engineering, and shipping under one roof — not handed off between vendors.",
  },
  {
    key: "reliability",
    label: "Reliability",
    body:
      "Builds that hold up under real load. We're still on call months after launch.",
  },
  {
    key: "loyalty",
    label: "Loyalty",
    body:
      "We treat every engagement like our reputation rides on it. Because it does.",
  },
];

function VideoBackdrop() {
  // Looping black-hole video served from /public/whyrev/blackhole.mp4.
  // Positioned via .whyrev__bg so half of it extends above the
  // section's top edge — the visible bottom half sits behind the
  // glassmorphic tile.
  return (
    <div className="whyrev__bg" aria-hidden="true">
      <video
        className="whyrev__bg-video"
        src="/whyrev/blackhole.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      {/* soft mask gradients fade the video edges into the section */}
      <div className="whyrev__bg-vignette" />
    </div>
  );
}

export default function WhyRevlient() {
  return (
    <section className="whyrev" id="why" aria-label="Why Revlient">
      <VideoBackdrop />

      <Reveal className="whyrev__tile">
        <span className="whyrev__eyebrow">
          <span className="whyrev__eyebrow-dot" />
          <em>Nº</em>&nbsp; Why Revlient
        </span>
        <h2 className="whyrev__title">
          Most studios choose flash <em>or</em>
          <br />
          function. <em>We refuse to.</em>
        </h2>
        <p className="whyrev__sub">
          Pure-flash work wins admiration and loses serious buyers. Pure-
          corporate work wins trust and looks like everyone else. We build
          for the people who need both.
        </p>

        <ul className="whyrev__pillars">
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.key} className="whyrev__pillar" delay={i * 120}>
              <div className="whyrev__specimen">
                <Specimen kind={p.key} />
              </div>
              <div className="whyrev__pillar-text">
                <h3 className="whyrev__pillar-label">{p.label}</h3>
                <p className="whyrev__pillar-body">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <a href={CTA_HREF} className="whyrev__cta">
          <span>Talk to the studio</span>
          <span className="whyrev__cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
