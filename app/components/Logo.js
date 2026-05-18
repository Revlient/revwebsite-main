// Revlient mark — a faceted sprig built from outlined panels.
//
// NOTE: this is a hand-built SVG recreation of the supplied logo. The
// original was provided as a raster on white, and this environment has
// no vectoriser (potrace/ImageMagick), so it could not be traced 1:1.
// To drop in the official artwork later, replace ONLY the <path>/<g>
// markup below (keep the props/viewBox) — every usage updates at once.
//
// stroke="currentColor" so the mark inherits its colour from context
// (accent blue in the nav/footer; see .brand__mark in globals.css).
export default function Logo({ className = "", title = "Revlient" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label={title}
    >
      {/* diagonal spine the facets cascade along */}
      <path d="M14 43 L35 6" strokeOpacity="0.45" />
      {/* upper facet (points up-right) */}
      <path d="M30 7 L40 11 L41 21 L32 27 L24 21 L25 11 Z" />
      {/* middle facet */}
      <path d="M23 19 L33 23 L34 33 L25 39 L17 33 L18 23 Z" />
      {/* lower facet */}
      <path d="M15 30 L25 34 L26 43 L17 46 L9 40 L10 31 Z" />
    </svg>
  );
}
