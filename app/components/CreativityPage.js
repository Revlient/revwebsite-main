"use client";

import Nav from "./Nav";
import Reveal from "./Reveal";
import Footer from "./Footer";
import ContactWidget from "./ContactWidget";
import StickyCTA from "./StickyCTA";
import { BRAND, CTA_HREF } from "../lib/site";

const CAPABILITIES = [
  {
    title: "Branding & Identity",
    body: "Custom logomarks, comprehensive style guides, typographic systems, and curated color palettes that establish visual authority for your product."
  },
  {
    title: "Design & Collateral",
    body: "Premium product interfaces, mockups, and marketing collateral designed with absolute visual restraint and alignment to modern aesthetics."
  },
  {
    title: "Content & Storytelling",
    body: "Clean, professional, and clear copywriting that tells your story in plain language. No fluffy filler, just high-converting documentation and messaging."
  },
  {
    title: "Media Production",
    body: "Bespoke high-fidelity 3D loops, video renders, and custom illustrations designed to showcase product flows and capture visitor attention."
  },
  {
    title: "Extended Creative Edge",
    body: "Obsessive focus on micro-interactions, spring-loaded animations, and hand-crafted hover states that make the web interface feel responsive and alive."
  }
];

export default function CreativityPage() {
  return (
    <div className="studiopage">
      <Nav />
      
      <main>
        {/* Hero */}
        <section className="stp-hero" aria-label="Creativity hero">
          <div className="stp-hero__glow stp-hero__glow--horizon" aria-hidden="true" />
          <div className="stp-hero__glow stp-hero__glow--left" aria-hidden="true" />
          <div className="stp-hero__grid" aria-hidden="true" />

          <div className="stp-container stp-hero__inner">
            <Reveal>
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Pillar No. 2
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="stp-hero__title">
                Creativity.
                <br />
                <em>Brand & product design.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="stp-hero__sub">
                Premium digital assets, custom WebGL animations, and visual storytelling. We craft distinct brand systems and responsive interfaces that stand out and convert.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="stp-hero__cta">
                <a href={CTA_HREF} className="stp-btn stp-btn--primary">
                  Start designing
                  <span className="stp-btn__arrow" aria-hidden="true">→</span>
                </a>
                <a href="/work" className="stp-btn stp-btn--ghost">
                  See the work
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="stp-section stp-why" aria-label="Creative Capabilities">
          <div className="stp-container">
            <Reveal className="stp-head">
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Capabilities
              </span>
              <h2 className="stp-h2">
                What we <em>craft & style.</em>
              </h2>
            </Reveal>

            <div className="stp-why__grid">
              {CAPABILITIES.map((c, i) => (
                <Reveal key={c.title} className="stp-card stp-why__card" delay={i * 80}>
                  <div className="stp-card__glow" aria-hidden="true" />
                  <h3 className="stp-card__title" style={{ marginTop: "1rem" }}>{c.title}</h3>
                  <p className="stp-card__body">{c.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />
      <ContactWidget />
    </div>
  );
}
