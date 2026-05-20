// Hero backdrop adapted from a Framer-motion + Tailwind reference
// (Kokonut "shape-landing-hero"). Five rounded gradient pills drift
// gently above a soft indigo→rose wash, with a top/bottom vignette.
// Plain CSS animations — no framer-motion / Tailwind / TypeScript /
// shadcn — pure server component, prerendered static. Reduced-motion
// settles the entrance + float (global rule).
const SHAPES = [1, 2, 3, 4, 5];

export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__wash" />
      <div className="herobd__shapes">
        {SHAPES.map((n) => (
          <span key={n} className={`herobd__shape herobd__shape--${n}`}>
            <span className="herobd__shapeinner" />
          </span>
        ))}
      </div>
      <div className="herobd__vignette" />
    </div>
  );
}
