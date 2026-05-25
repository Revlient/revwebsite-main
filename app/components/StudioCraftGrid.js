"use client";

import Reveal from "./Reveal";

/* "Unmatched productivity" homage — paraphrased into Revlient voice.
   8 small glass tiles, each with an inline-SVG icon + tile title +
   one-line body. Capabilities paraphrased from existing Features /
   Services data — nothing invented. */

function IconDesign() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="11" r="1.4" fill="currentColor" />
      <circle cx="13" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}
function IconEngineer() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <polyline points="8 7 3 12 8 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 7 21 12 16 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="5" x2="10" y2="19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconMotion() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <path d="M5 12c0-4 3-7 7-7s7 3 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19 12c0 4-3 7-7 7s-7-3-7-7" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="19" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
function IconBrand() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12c0-2.5 1.8-4 4-4s4 1.5 4 4-1.8 4-4 4-4-1.5-4-4z" fill="currentColor" opacity="0.3" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}
function IconCms() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <rect x="3" y="4" width="18" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="10" width="18" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="16" width="18" height="4" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="6" r="0.8" fill="currentColor" />
      <circle cx="7" cy="12" r="0.8" fill="currentColor" />
      <circle cx="7" cy="18" r="0.8" fill="currentColor" />
    </svg>
  );
}
function IconPerf() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
function IconCrm() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="14" r="1.2" fill="currentColor" />
      <line x1="10" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="17" x2="15" y2="17" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function IconSupport() {
  return (
    <svg viewBox="0 0 24 24" className="h2-craft__icon" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const TILES = [
  { icon: IconDesign, title: "Design", body: "Brand, UI and UX shaped together — never handed off mid-flight." },
  { icon: IconEngineer, title: "Engineering", body: "Production-grade code, real-device QA, accessible by default." },
  { icon: IconMotion, title: "Motion", body: "Hand-tuned micro-interactions and 3D — performance budget enforced." },
  { icon: IconBrand, title: "Brand", body: "Identity, voice and assets that scale from launch to year five." },
  { icon: IconCms, title: "CMS", body: "Headless or hosted — editors land on a clean surface, not a CMS escape room." },
  { icon: IconPerf, title: "Performance", body: "INP, CLS, TBT — measured, monitored, kept inside budget on every release." },
  { icon: IconCrm, title: "CRM workspace", body: "Every active project comes with a private workspace — phases, assets, enquiries." },
  { icon: IconSupport, title: "Post-launch", body: "A support window is baked in. We're still on call months after the launch URL." },
];

export default function StudioCraftGrid() {
  return (
    <section className="h2-section h2-craft" aria-label="Studio capabilities">
      <div className="container">
        <Reveal className="h2-head h2-head--centered">
          <span className="h2-eyebrow">
            <span className="h2-eyebrow__dot" />
            Capability
          </span>
          <h2 className="h2-h2">
            Studio-grade craft.
            <br />
            <em>Production-grade ship.</em>
          </h2>
          <p className="h2-sub">
            One small team covering everything that ships. No vendor
            chain, no broken telephone, no &ldquo;not our scope&rdquo;.
          </p>
        </Reveal>

        <div className="h2-craft__grid">
          {TILES.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} className="h2-card h2-craft__tile" delay={(i % 4) * 90}>
                <div className="h2-craft__icon-wrap">
                  <Icon />
                </div>
                <h3 className="h2-craft__title">{t.title}</h3>
                <p className="h2-craft__body">{t.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
