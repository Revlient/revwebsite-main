// Scaled hero preview used as a clickable thumbnail inside the
// study-abroad case card on /work. Adapted from a shadcn/framer-
// motion/lucide-react hero brief (tailark hero-section-1) to vanilla
// JS + plain CSS. The HeroHeader (navbar) is intentionally dropped
// per the brief — only the hero block, the app-screen mockup card
// and the four-column customer logos row are kept, all scaled down
// to live inside a case card column. Copy in this preview stands in
// for the live study-abroad site's hero.

export default function WorkCaseHero() {
  return (
    <div className="wch" aria-hidden="true">
      <span className="wch__bg-a" />
      <span className="wch__bg-b" />
      <span className="wch__bg-c" />
      <span className="wch__radial" />

      <div className="wch__hero">
        <span className="wch__badge">
          <span className="wch__badge-text">Country-by-country path now live</span>
          <span className="wch__badge-divider" />
          <span className="wch__badge-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </span>
        </span>

        <h3 className="wch__heading">Your path to studying abroad.</h3>

        <p className="wch__sub">
          Trusted guidance for parents and students — from application
          to arrival.
        </p>

        <div className="wch__actions">
          <span className="wch__cta-wrap">
            <span className="wch__cta wch__cta--primary">Get started</span>
          </span>
          <span className="wch__cta wch__cta--ghost">Request a callback</span>
        </div>
      </div>

      {/* mini app-screen mockup card */}
      <div className="wch__screen">
        <div className="wch__screen-bar">
          <span className="wch__screen-dot" />
          <span className="wch__screen-dot" />
          <span className="wch__screen-dot" />
        </div>
        <div className="wch__screen-body">
          <div className="wch__screen-grid">
            <span className="wch__screen-tile wch__screen-tile--accent" />
            <span className="wch__screen-tile" />
            <span className="wch__screen-tile" />
          </div>
          <span className="wch__screen-row wch__screen-row--lg" />
          <span className="wch__screen-row" />
          <span className="wch__screen-row wch__screen-row--md" />
        </div>
      </div>

      {/* customer logos row — abstract grey blocks instead of fabricated
          brand wordmarks so we don't ship invented customer logos */}
      <div className="wch__customers">
        <span className="wch__customer wch__customer--1" />
        <span className="wch__customer wch__customer--2" />
        <span className="wch__customer wch__customer--3" />
        <span className="wch__customer wch__customer--4" />
      </div>
    </div>
  );
}
