// Animated microchip + circuit network for the hero backdrop.
// Inline SVG, pure CSS (no motion libs): a short bright dash
// travels each trace via stroke-dasharray, staggered across the
// eight paths and synced with per-node glow so the "current"
// reads as one continuous loop. Brand cyan/blue palette to fit
// the hero atmosphere; server component, prerendered static.

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

const PIN_AXIS = [235, 261, 287, 313, 339, 365];

export default function HeroChip() {
  return (
    <div className="herochip" aria-hidden="true">
      <svg
        className="herochip__svg"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="herochipBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15233f" />
            <stop offset="0.5" stopColor="#0c1426" />
            <stop offset="1" stopColor="#070c18" />
          </linearGradient>
          <linearGradient id="herochipDie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1426" />
            <stop offset="1" stopColor="#050a16" />
          </linearGradient>
          <linearGradient id="herochipPin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a557d" />
            <stop offset="1" stopColor="#1a2a44" />
          </linearGradient>
          <radialGradient id="herochipCore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(160, 220, 255, 0.95)" />
            <stop offset="0.45" stopColor="rgba(60, 150, 240, 0.55)" />
            <stop offset="1" stopColor="rgba(20, 40, 90, 0)" />
          </radialGradient>
        </defs>

        {/* dim base traces */}
        <g className="herochip__traces">
          {TRACES.map((d, i) => (
            <path key={i} d={d} className="herochip__trace" />
          ))}
        </g>

        {/* travelling current pulses */}
        <g className="herochip__pulses">
          {TRACES.map((d, i) => (
            <path key={i} d={d} className="herochip__pulse" />
          ))}
        </g>

        {/* end-of-path nodes */}
        <g className="herochip__nodes">
          {NODES.map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="12" className="herochip__node" />
              <circle cx={cx} cy={cy} r="3.6" className="herochip__nodedot" />
            </g>
          ))}
        </g>

        {/* decorative pins on all four chip sides */}
        <g className="herochip__pins">
          {PIN_AXIS.map((x) => (
            <rect
              key={`t${x}`}
              x={x - 4}
              y="199"
              width="8"
              height="20"
              rx="2"
              fill="url(#herochipPin)"
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
              fill="url(#herochipPin)"
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
              fill="url(#herochipPin)"
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
              fill="url(#herochipPin)"
            />
          ))}
        </g>

        {/* chip body */}
        <g className="herochip__chip">
          <rect
            x="215"
            y="215"
            width="170"
            height="170"
            rx="14"
            fill="url(#herochipBody)"
            stroke="rgba(120, 170, 230, 0.34)"
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
          <rect
            x="240"
            y="240"
            width="120"
            height="120"
            rx="8"
            fill="url(#herochipDie)"
            stroke="rgba(60, 110, 180, 0.4)"
            strokeWidth="0.8"
          />
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
          <circle
            cx="300"
            cy="300"
            r="28"
            fill="url(#herochipCore)"
            className="herochip__corehalo"
          />
          <circle
            cx="300"
            cy="300"
            r="5"
            fill="rgba(190, 235, 255, 0.95)"
            className="herochip__coredot"
          />
          <text
            x="300"
            y="376"
            textAnchor="middle"
            className="herochip__brand"
          >
            REVLIENT
          </text>
        </g>
      </svg>
    </div>
  );
}
