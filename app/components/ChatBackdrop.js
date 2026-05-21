// Cascade-of-light backdrop for the chat section — pure CSS+SVG.
// Curved strands cluster narrow at the top and fan outward toward
// the base, where they land in a wide bright floor pool. A solid
// bright central pillar runs down the middle. Centred horizontally
// to match the supplied reference. No motion libs.
const STRAND_COUNT = 44;
const VB_W = 800;
const VB_H = 900;
const CX = VB_W / 2;
const TOP_CLUSTER = 80;        // half-width of the strand cluster at the top
const BOTTOM_SPREAD = VB_W - 100; // full spread at the base

const STRANDS = Array.from({ length: STRAND_COUNT }, (_, i) => {
  const t = i / (STRAND_COUNT - 1);          // 0..1
  const topX = CX + (t - 0.5) * TOP_CLUSTER;
  const botX = 50 + t * BOTTOM_SPREAD;
  // cubic bezier: nearly vertical for the top half, then curves
  // outward to reach the wide base
  return `M ${topX} 0 C ${topX} 470 ${botX} ${VB_H - 180} ${botX} ${VB_H}`;
});

export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <div className="chatbd__halo" />
      <div className="chatbd__cascade">
        <svg
          className="chatbd__svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chatbdStrand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(140, 195, 255, 0)" />
              <stop offset="22%"  stopColor="rgba(150, 200, 255, 0.55)" />
              <stop offset="60%"  stopColor="rgba(220, 235, 255, 0.95)" />
              <stop offset="92%"  stopColor="rgba(255, 255, 255, 1)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          {/* smooth, continuous strands (visual structure) */}
          <g className="chatbd__strands">
            {STRANDS.map((d, i) => (
              <path
                key={i}
                d={d}
                className={`chatbd__strand chatbd__strand--${i + 1}`}
              />
            ))}
          </g>
          {/* electric flow — short bright sparks travelling top -> bottom
             along the same paths, staggered per strand */}
          <g className="chatbd__pulses">
            {STRANDS.map((d, i) => (
              <path
                key={i}
                d={d}
                className={`chatbd__pulse chatbd__pulse--${i + 1}`}
              />
            ))}
          </g>
        </svg>
        <span className="chatbd__pillar" />
        <span className="chatbd__pillarCore" />
      </div>
      <div className="chatbd__floor" />
      <div className="chatbd__vignette" />
    </div>
  );
}
