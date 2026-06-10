"use client";

import Nav from "./Nav";
import Reveal from "./Reveal";
import Footer from "./Footer";
import ContactWidget from "./ContactWidget";
import StickyCTA from "./StickyCTA";
import { BRAND, CTA_HREF } from "../lib/site";

const CAPABILITIES = [
  {
    title: "Marketing Automation",
    body: "Custom API pipelines, webhook listeners, and automatic lead capture routers built to connect your digital interfaces directly to backend CRM databases."
  },
  {
    title: "Performance SEO",
    body: "Speed optimizations, structured schemas, meta tags, and static site caching routines built to achieve perfect 95+ Lighthouse baselines for organic indexing."
  },
  {
    title: "Funnel & Acquisition Tech",
    body: "High-performance landing surfaces, responsive contact capture forms, and integrated real-time analytics dashboards designed to track conversions."
  },
  {
    title: "360° Marketing Systems",
    body: "Unified acquisition triggers, automated email newsletter workflows, and paid acquisition tracking configured across all web and mobile platforms."
  }
];

export default function ConversionPage() {
  return (
    <div className="studiopage">
      <Nav />
      
      <main>
        {/* Hero */}
        <section className="stp-hero" aria-label="Conversion hero">
          <div className="stp-hero__glow stp-hero__glow--horizon" aria-hidden="true" />
          <div className="stp-hero__glow stp-hero__glow--left" aria-hidden="true" />
          <div className="stp-hero__grid" aria-hidden="true" />

          <div className="stp-container stp-hero__inner">
            <Reveal>
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Pillar No. 4
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="stp-hero__title">
                Conversion.
                <br />
                <em>Funnel & marketing systems.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="stp-hero__sub">
                Marketing automation, performance SEO, and lead acquisition pipelines. We design and build conversion systems that turn user interest into predictable revenue.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="stp-hero__cta">
                <a href={CTA_HREF} className="stp-btn stp-btn--primary">
                  Optimize your funnel
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
        <section className="stp-section stp-why" aria-label="Conversion Capabilities">
          <div className="stp-container">
            <Reveal className="stp-head">
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Conversion
              </span>
              <h2 className="stp-h2">
                What we <em>integrate & optimize.</em>
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
