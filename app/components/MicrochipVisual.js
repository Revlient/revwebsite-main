// Standalone microchip hero visual — inline SVG, pure CSS animations
// (no Three.js / motion libs). The chip body, decorative pins, four
// nodes per side and the connecting circuit traces are all SVG; a
// short bright dash travels along each trace via stroke-dasharray,
// staggered eight ways so the "current" feels continuous. Reduced-
// motion settles every animation (handled globally elsewhere).
//
// Drop in next to a text block:
//   <div className="hero-row">
//     <div>…heading + CTAs…</div>
//     <MicrochipVisual />
//   </div>

const TRACES = [
  "M 261 215 L 261 165 L 110 165 L 110 100",
  "M 339 215 L 339 165 L 490 165 L 490 100",
  "M 261 385 L 261 435 L 110 435 L 110 500",
  "M 339 385 L 339 435 L 490 435 L 490 500",
  "M 215 261 L 165 261 L 165 240 L 60 240",
  "M 215 339 L 165 339 L 165 360 L 60 360",
  "M 385 261 L 435 261 L 435 240 L 540 240",
  "M 385 339 L 435 339 L 435 360 L 540 360",
];

const NODES = [
  [110, 100],
  [490, 100],
  [110, 500],
  [490, 500],
  [60, 240],
  [60, 360],
  [540, 240],
  [540, 360],
];

const PIN_AXIS = [235, 261, 287, 313, 339, 365]; // pin positions on each side

export default function MicrochipVisual() {
  return (
    <div className="microchip" aria-hidden="true">
      <svg
        className="microchip__svg"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="microchipBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1c2842" />
            <stop offset="0.5" stopColor="#0e1626" />
            <stop offset="1" stopColor="#070c18" />
          </linearGradient>
          <linearGradient id="microchipDie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1224" />
            <stop offset="1" stopColor="#050a16" />
          </linearGradient>
          <linearGradient id="microchipPin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a557d" />
            <stop offset="1" stopColor="#1a2a44" />
          </linearGradient>
          <radialGradient id="microchipCore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(140, 220, 255, 0.95)" />
            <stop offset="0.45" stopColor="rgba(34, 170, 238, 0.55)" />
            <stop offset="1" stopColor="rgba(20, 40, 80, 0)" />
          </radialGradient>
        </defs>

        {/* dim base traces */}
        <g className="microchip__traces">
          {TRACES.map((d, i) => (
            <path key={i} d={d} className="microchip__trace" />
          ))}
        </g>

        {/* travelling current pulses (one short dash per trace) */}
        <g className="microchip__pulses">
          {TRACES.map((d, i) => (
            <path key={i} d={d} className="microchip__pulse" />
          ))}
        </g>

        {/* end-of-path nodes */}
        <g className="microchip__nodes">
          {NODES.map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="12" className="microchip__node" />
              <circle cx={cx} cy={cy} r="3.4" className="microchip__nodedot" />
            </g>
          ))}
        </g>

        {/* decorative pins along all four chip sides */}
        <g className="microchip__pins">
          {PIN_AXIS.map((x) => (
            <rect
              key={`t${x}`}
              x={x - 4}
              y="199"
              width="8"
              height="20"
              rx="2"
              fill="url(#microchipPin)"
            />
          ))}
          {PIN_AXIS.map((x) => (
            <rect
              key={`b${x}`}
              x={x - 4}
              y="381"
              width="8"
              height="20"
              rx="2"
              fill="url(#microchipPin)"
            />
          ))}
          {PIN_AXIS.map((y) => (
            <rect
              key={`l${y}`}
              x="199"
              y={y - 4}
              width="20"
              height="8"
              rx="2"
              fill="url(#microchipPin)"
            />
          ))}
          {PIN_AXIS.map((y) => (
            <rect
              key={`r${y}`}
              x="381"
              y={y - 4}
              width="20"
              height="8"
              rx="2"
              fill="url(#microchipPin)"
            />
          ))}
        </g>

        {/* the chip body itself */}
        <g className="microchip__chip">
          <rect
            x="215"
            y="215"
            width="170"
            height="170"
            rx="14"
            fill="url(#microchipBody)"
            stroke="rgba(120, 170, 230, 0.32)"
            strokeWidth="1.2"
          />
          <rect
            x="225"
            y="225"
            width="150"
            height="150"
            rx="10"
            fill="none"
            stroke="rgba(60, 100, 160, 0.28)"
            strokeWidth="0.8"
          />
          {/* inner die */}
          <rect
            x="240"
            y="240"
            width="120"
            height="120"
            rx="8"
            fill="url(#microchipDie)"
            stroke="rgba(60, 110, 180, 0.4)"
            strokeWidth="0.8"
          />
          {/* faint scan lines on the die */}
          {[252, 264, 276, 288, 300, 312, 324, 336, 348].map((y) => (
            <line
              key={y}
              x1="246"
              y1={y}
              x2="354"
              y2={y}
              stroke="rgba(120, 200, 255, 0.06)"
              strokeWidth="0.6"
            />
          ))}
          {/* central core glow + hot dot */}
          <circle
            cx="300"
            cy="300"
            r="28"
            fill="url(#microchipCore)"
            className="microchip__corehalo"
          />
          <circle
            cx="300"
            cy="300"
            r="5"
            fill="rgba(190, 235, 255, 0.95)"
            className="microchip__coredot"
          />
          {/* engraved brand */}
          <text
            x="300"
            y="376"
            textAnchor="middle"
            className="microchip__brand"
          >
            REVLIENT
          </text>
        </g>
      </svg>
    </div>
  );
}
