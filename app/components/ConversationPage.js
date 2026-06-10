"use client";

import Nav from "./Nav";
import Reveal from "./Reveal";
import Footer from "./Footer";
import ContactWidget from "./ContactWidget";
import StickyCTA from "./StickyCTA";
import { BRAND, CTA_HREF } from "../lib/site";

const CAPABILITIES = [
  {
    title: "Direct Communication",
    body: "Real-time communication via dedicated Slack and WhatsApp channels directly with our senior development team. No gatekeepers, no lag."
  },
  {
    title: "Weekly Syncs & Staging",
    body: "Live product demos and interactive staging releases every single Friday. You see the project move and evolve on real surfaces from week one."
  },
  {
    title: "On-Call Support",
    body: "Dedicated post-launch retainers that cover ongoing operations audits, security patching, and hosting optimizations to keep things running smoothly."
  },
  {
    title: "Structured Briefings",
    body: "Comprehensive shape documents, detailed scope definitions, and transparent fixed-price quotes. No surprises, no hidden overheads."
  }
];

export default function ConversationPage() {
  return (
    <div className="studiopage">
      <Nav />
      
      <main>
        {/* Hero */}
        <section className="stp-hero" aria-label="Conversation hero">
          <div className="stp-hero__glow stp-hero__glow--horizon" aria-hidden="true" />
          <div className="stp-hero__glow stp-hero__glow--left" aria-hidden="true" />
          <div className="stp-hero__grid" aria-hidden="true" />

          <div className="stp-container stp-hero__inner">
            <Reveal>
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Pillar No. 3
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="stp-hero__title">
                Conversation.
                <br />
                <em>Direct project collaboration.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="stp-hero__sub">
                Weekly shipping cycles, dedicated private channels, and absolute budget transparency. We collaborate closely with you to translate high-level business goals into precise software deliverables.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="stp-hero__cta">
                <a href={CTA_HREF} className="stp-btn stp-btn--primary">
                  Start a conversation
                  <span className="stp-btn__arrow" aria-hidden="true">→</span>
                </a>
                <a href="/work" className="stp-btn stp-btn--ghost">
                  See our work
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="stp-section stp-why" aria-label="Collaboration Capabilities">
          <div className="stp-container">
            <Reveal className="stp-head">
              <span className="stp-eyebrow">
                <span className="stp-eyebrow__dot" />
                Collaboration
              </span>
              <h2 className="stp-h2">
                How we <em>sync & deliver.</em>
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
