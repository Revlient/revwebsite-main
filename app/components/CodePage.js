"use client";

import Nav from "./Nav";
import Reveal from "./Reveal";
import Footer from "./Footer";
import ContactWidget from "./ContactWidget";
import StickyCTA from "./StickyCTA";
import { BRAND, CTA_HREF } from "../lib/site";

const CAPABILITIES = [
  {
    title: "Enterprise Management Solutions",
    body: "Custom ERP, CRM, and operations engines tailored around how your business actually runs. Zero seat licensing fees, built on robust Django backend frameworks."
  },
  {
    title: "Website & CMS Solutions",
    body: "High-end Next.js Jamstack storefronts and brand portals optimized for speed and accessibility. Coded cleanly with editable headless CMS integrations."
  },
  {
    title: "Custom Application Development",
    body: "Robust mobile and web products built around the job to be done. We ship React Native platforms delivering native-grade responsiveness on both app stores."
  },
  {
    title: "SaaS Solutions",
    body: "Scalable, secure multi-tenant cloud architectures featuring strict database multi-tenancy, custom role access controls, and rate-limiting policies."
  },
  {
    title: "Advanced Technology & Automation",
    body: "Generative AI integrations (including Google Gemini), automated PDF parsing engines, and background cron routines that connect your business tools."
  },
  {
    title: "Cybersecurity Solutions",
    body: "Strict encryption standards, JWT/OAuth authentication protocols, secure payment checkouts, and synchronized financial accounting ledgers."
  }
];

export default function CodePage() {
  return (
    <div className="studiopage">
      <Nav />
      
      <main>
        {/* Hero */}
        <section className="stp-hero" aria-label="Code hero">
          <div className="stp-hero__glow stp-hero__glow--horizon" aria-hidden="true" />
          <div className="stp-hero__glow stp-hero__glow--left" aria-hidden="true" />
          <div className="stp-hero__grid" aria-hidden="true" />

          <div className="stp-container stp-hero__inner">
            <Reveal>
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Pillar No. 1
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="stp-hero__title">
                Code.
                <br />
                <em>Digital engineering.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="stp-hero__sub">
                Clean architectures, secure databases, and lightning-fast frontend pages. We engineer digital infrastructure that performs under load and scales with your growth.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="stp-hero__cta">
                <a href={CTA_HREF} className="stp-btn stp-btn--primary">
                  Engineer a solution
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
        <section className="stp-section stp-why" aria-label="Engineering Capabilities">
          <div className="stp-container">
            <Reveal className="stp-head">
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Capabilities
              </span>
              <h2 className="stp-h2">
                What we <em>architect & deploy.</em>
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
