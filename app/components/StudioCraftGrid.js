"use client";

import Reveal from "./Reveal";

/* "Unmatched productivity" homage as a bento layout — mixed tile
   sizes on white. Big hero tile, then medium tiles, then small.
   Copy paraphrased from existing Features + Services data,
   nothing invented. */

function IconDesign() {
  return (
    <svg viewBox="0 0 24 24" className="h2-bento__icon" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="11" r="1.6" fill="currentColor" />
      <circle cx="13" cy="15" r="1.6" fill="currentColor" />
    </svg>
  );
}
function IconEngineer() {
  return (
    <svg viewBox="0 0 24 24" className="h2-bento__icon" aria-hidden="true">
      <polyline points="8 7 3 12 8 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 7 21 12 16 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="5" x2="10" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IconMotion() {
  return (
    <svg viewBox="0 0 24 24" className="h2-bento__icon" aria-hidden="true">
      <path d="M5 12c0-4 3-7 7-7s7 3 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 12c0 4-3 7-7 7s-7-3-7-7" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="19" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}
function IconCrm() {
  return (
    <svg viewBox="0 0 24 24" className="h2-bento__icon" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="14" r="1.4" fill="currentColor" />
      <line x1="10" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10" y1="17" x2="15" y2="17" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPerf() {
  return (
    <svg viewBox="0 0 24 24" className="h2-bento__icon" aria-hidden="true">
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="currentColor" />
    </svg>
  );
}
function IconBrand() {
  return (
    <svg viewBox="0 0 24 24" className="h2-bento__icon" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12c0-2.5 1.8-4 4-4s4 1.5 4 4-1.8 4-4 4-4-1.5-4-4z" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
function IconSupport() {
  return (
    <svg viewBox="0 0 24 24" className="h2-bento__icon" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/* Visual flourishes for the hero tiles — keep them quiet and
   tasteful, no clipart. */
function HeroTileVisual() {
  return (
    <div className="h2-bento__hero-visual" aria-hidden="true">
      <div className="h2-bento__hero-card h2-bento__hero-card--a">
        <span className="h2-bento__hero-card-label">Project</span>
        <span className="h2-bento__hero-card-value">Live</span>
        <span className="h2-bento__hero-card-bar" />
      </div>
      <div className="h2-bento__hero-card h2-bento__hero-card--b">
        <span className="h2-bento__hero-card-label">Phase</span>
        <span className="h2-bento__hero-card-value">Build</span>
        <span className="h2-bento__hero-card-bar h2-bento__hero-card-bar--alt" />
      </div>
      <div className="h2-bento__hero-card h2-bento__hero-card--c">
        <span className="h2-bento__hero-card-label">Asset</span>
        <span className="h2-bento__hero-card-value">Ready</span>
      </div>
    </div>
  );
}

function CrmTileVisual() {
  return (
    <div className="h2-bento__crm-visual" aria-hidden="true">
      {["Phase 01", "Phase 02", "Phase 03"].map((p, i) => (
        <div key={p} className={`h2-bento__crm-row h2-bento__crm-row--${i}`}>
          <span className="h2-bento__crm-dot" />
          <span className="h2-bento__crm-label">{p}</span>
          <span className="h2-bento__crm-bar">
            <span
              className="h2-bento__crm-fill"
              style={{ width: ["100%", "62%", "20%"][i] }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

export default function StudioCraftGrid() {
  return (
    <section className="h2-section h2-bento" aria-label="Studio capabilities">
      <div className="container">
        <Reveal className="h2-head h2-head--centered">
          <span className="h2-eyebrow">
            <span className="h2-eyebrow__dot" />
            Capability
          </span>
          <h2 className="h2-h2">
            Studio-grade craft.
            <br />
            <span className="h2-accent">Production-grade ship.</span>
          </h2>
          <p className="h2-sub">
            One small team covering everything that ships. No vendor
            chain, no broken telephone, no &ldquo;not our scope&rdquo;.
          </p>
        </Reveal>

        <div className="h2-bento__grid">
          {/* Large hero tile */}
          <Reveal className="h2-card h2-bento__tile h2-bento__tile--hero">
            <div className="h2-bento__tile-head">
              <span className="h2-bento__icon-wrap">
                <IconDesign />
              </span>
              <h3 className="h2-bento__title">Design that ships.</h3>
            </div>
            <p className="h2-bento__body">
              Brand, UI and UX shaped together — never handed off
              mid-flight. Pixel-level attention, real-device QA, motion
              tuned by hand.
            </p>
            <HeroTileVisual />
          </Reveal>

          {/* Wide CRM tile */}
          <Reveal className="h2-card h2-bento__tile h2-bento__tile--wide" delay={100}>
            <div className="h2-bento__tile-head">
              <span className="h2-bento__icon-wrap">
                <IconCrm />
              </span>
              <h3 className="h2-bento__title">CRM workspace included.</h3>
            </div>
            <p className="h2-bento__body">
              Every active project lands on its own workspace — phases,
              assets, enquiries, all in one place.
            </p>
            <CrmTileVisual />
          </Reveal>

          {/* Engineering */}
          <Reveal className="h2-card h2-bento__tile" delay={200}>
            <span className="h2-bento__icon-wrap">
              <IconEngineer />
            </span>
            <h3 className="h2-bento__title">Engineering</h3>
            <p className="h2-bento__body">
              Production-grade code, real-device QA, accessible by default.
            </p>
          </Reveal>

          {/* Motion */}
          <Reveal className="h2-card h2-bento__tile" delay={250}>
            <span className="h2-bento__icon-wrap">
              <IconMotion />
            </span>
            <h3 className="h2-bento__title">Motion</h3>
            <p className="h2-bento__body">
              Hand-tuned micro-interactions and 3D — performance budget
              enforced.
            </p>
          </Reveal>

          {/* Brand */}
          <Reveal className="h2-card h2-bento__tile" delay={300}>
            <span className="h2-bento__icon-wrap">
              <IconBrand />
            </span>
            <h3 className="h2-bento__title">Brand</h3>
            <p className="h2-bento__body">
              Identity, voice and assets that scale from launch to year
              five.
            </p>
          </Reveal>

          {/* Wide performance tile */}
          <Reveal className="h2-card h2-bento__tile h2-bento__tile--wide" delay={350}>
            <div className="h2-bento__tile-head">
              <span className="h2-bento__icon-wrap">
                <IconPerf />
              </span>
              <h3 className="h2-bento__title">Performance budget, enforced.</h3>
            </div>
            <p className="h2-bento__body">
              INP, CLS, TBT — measured, monitored, kept inside budget on
              every release. Fast on launch, still fast at year three.
            </p>
            <div className="h2-bento__perf">
              {[
                { k: "INP", v: "< 200ms" },
                { k: "CLS", v: "< 0.05" },
                { k: "TBT", v: "< 150ms" },
              ].map((m) => (
                <div key={m.k} className="h2-bento__perf-chip">
                  <span className="h2-bento__perf-k">{m.k}</span>
                  <span className="h2-bento__perf-v">{m.v}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Support */}
          <Reveal className="h2-card h2-bento__tile" delay={400}>
            <span className="h2-bento__icon-wrap">
              <IconSupport />
            </span>
            <h3 className="h2-bento__title">Post-launch</h3>
            <p className="h2-bento__body">
              A support window is baked in. We&apos;re still on call months
              after the launch URL.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
