"use client";

import { CTA_HREF } from "../lib/site";

/* Application showcase placed under the ErpFeatures grid on /work.
   Three stylised phone frames — one taller centre device flanked by
   two tilted side devices — over an ambient glow + faint orbit
   line. Each device is a clearly-marked slot (data-screen) ready to
   be replaced with a real screenshot <img> later. No motion/react,
   no Tailwind, no lucide-react. */

function ArrowDown({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5 V19" />
      <path d="M6 13 L12 19 L18 13" />
    </svg>
  );
}

function StoreBadge({ store, label, sub }) {
  return (
    <span className={`appshow__store appshow__store--${store}`}>
      <span className="appshow__store-icon" aria-hidden="true">
        {store === "ios" ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.4 13.1c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.6-1.8 3.1-.5 7.7 1.2 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.2-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1-2.8-4.1zm-2.7-7.8c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.2.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.3-.6 3-1.5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 3v18l8-9-8-9zm10 7l3 1.7L8 22l6-12zM8 2l9 5.3L14 10 8 2zm9 5.3l4 2.3v4.8l-4 2.3-3-1.7 3-7.7z" />
          </svg>
        )}
      </span>
      <span className="appshow__store-text">
        <span className="appshow__store-sub">{sub}</span>
        <span className="appshow__store-label">{label}</span>
      </span>
    </span>
  );
}

function PhoneFrame({ variant, screen }) {
  return (
    <div
      className={`appshow__phone appshow__phone--${variant}`}
      data-screen={screen}
    >
      <span className="appshow__phone-notch" aria-hidden="true" />
      <span className="appshow__phone-button appshow__phone-button--vol-up" aria-hidden="true" />
      <span className="appshow__phone-button appshow__phone-button--vol-dn" aria-hidden="true" />
      <span className="appshow__phone-button appshow__phone-button--power" aria-hidden="true" />
      <div className="appshow__phone-screen">
        {/* Placeholder visual until the real screenshot is dropped in.
            To swap: replace this block with
              <img src="/work/app-<variant>.png" alt="…" />
            (or any path you commit at public/work/). */}
        <div className={`appshow__placeholder appshow__placeholder--${screen}`}>
          <div className="appshow__placeholder-bar" />
          <div className="appshow__placeholder-body">
            {screen === "list" && (
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="appshow__placeholder-row">
                    <span className="appshow__placeholder-row-dot" />
                    <span className="appshow__placeholder-row-lines">
                      <span className="appshow__placeholder-line" />
                      <span className="appshow__placeholder-line appshow__placeholder-line--sm" />
                    </span>
                    <span className="appshow__placeholder-row-tag" />
                  </span>
                ))}
              </>
            )}
            {screen === "dashboard" && (
              <>
                <span className="appshow__placeholder-greeting" />
                <span className="appshow__placeholder-greeting appshow__placeholder-greeting--sm" />
                <div className="appshow__placeholder-kpis">
                  <span className="appshow__placeholder-kpi appshow__placeholder-kpi--accent" />
                  <span className="appshow__placeholder-kpi" />
                  <span className="appshow__placeholder-kpi" />
                  <span className="appshow__placeholder-kpi appshow__placeholder-kpi--alt" />
                </div>
                <span className="appshow__placeholder-chart" />
              </>
            )}
            {screen === "detail" && (
              <>
                <span className="appshow__placeholder-hero" />
                <span className="appshow__placeholder-line appshow__placeholder-line--lg" />
                <span className="appshow__placeholder-line" />
                <span className="appshow__placeholder-line appshow__placeholder-line--md" />
                <div className="appshow__placeholder-actions">
                  <span className="appshow__placeholder-pill appshow__placeholder-pill--primary" />
                  <span className="appshow__placeholder-pill" />
                </div>
                <span className="appshow__placeholder-row appshow__placeholder-row--block">
                  <span className="appshow__placeholder-row-dot" />
                  <span className="appshow__placeholder-row-lines">
                    <span className="appshow__placeholder-line" />
                    <span className="appshow__placeholder-line appshow__placeholder-line--sm" />
                  </span>
                </span>
              </>
            )}
          </div>
          <div className="appshow__placeholder-tabbar">
            <span /><span /><span className="is-active" /><span /><span />
          </div>
        </div>
        <span className="appshow__phone-reflection" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <section className="appshow" aria-label="Mobile application showcase">
      <div className="appshow__glow appshow__glow--a" aria-hidden="true" />
      <div className="appshow__glow appshow__glow--b" aria-hidden="true" />
      <span className="appshow__orbit" aria-hidden="true" />

      <header className="appshow__head">
        <span className="appshow__eyebrow">
          <span className="appshow__dot" />
          Now shipping · iOS & Android
        </span>
        <h2 className="appshow__title">Mission control, in your pocket.</h2>
        <p className="appshow__sub">
          The full Revlient OS — pipeline, projects and tally — built
          for the way the team moves between desks, meetings and the
          commute home.
        </p>

        <div className="appshow__stores">
          <StoreBadge store="ios" sub="Download on the" label="App Store" />
          <StoreBadge store="android" sub="Get it on" label="Google Play" />
          <a href={CTA_HREF} className="appshow__cta">
            <ArrowDown className="appshow__cta-icon" />
            <span>See the build</span>
          </a>
        </div>
      </header>

      <div className="appshow__cluster">
        <PhoneFrame variant="left" screen="list" />
        <PhoneFrame variant="center" screen="dashboard" />
        <PhoneFrame variant="right" screen="detail" />
      </div>

      <div className="appshow__floor" aria-hidden="true" />
    </section>
  );
}
