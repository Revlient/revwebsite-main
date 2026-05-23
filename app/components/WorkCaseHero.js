// Scaled hero preview used as a clickable thumbnail inside a case
// card on /work. Adapted from a Tailwind/framer-motion/shadcn brief
// to vanilla JS + plain CSS — no Tailwind utilities, no framer-
// motion, no shadcn, no lucide-react. The navbar/customers row from
// the source are intentionally dropped; this is just the embedded
// hero preview that sits where the metrics box used to.
//
// Copy in this preview is placeholder for the live study-abroad
// site — swap to whatever copy ships there once it lands.

export default function WorkCaseHero() {
  return (
    <div className="wch" aria-hidden="true">
      <span className="wch__bg-a" />
      <span className="wch__bg-b" />
      <span className="wch__bg-c" />
      <span className="wch__radial" />

      <span className="wch__badge">
        <span>Country-by-country path</span>
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
        Trusted guidance for parents and students — application to
        arrival, in one clear path.
      </p>

      <div className="wch__actions">
        <span className="wch__cta wch__cta--primary">Get started</span>
        <span className="wch__cta wch__cta--ghost">View countries</span>
      </div>

      <div className="wch__preview">
        <div className="wch__preview-bar">
          <span className="wch__preview-dot" />
          <span className="wch__preview-dot" />
          <span className="wch__preview-dot" />
        </div>
        <div className="wch__preview-body">
          <span className="wch__preview-row wch__preview-row--lg" />
          <span className="wch__preview-row" />
          <span className="wch__preview-row wch__preview-row--md" />
        </div>
      </div>
    </div>
  );
}
