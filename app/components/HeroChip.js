// Full-screen PCB-style hero backdrop: a centred microchip on a
// faint trace grid, with 12 right-angle circuit paths fanning out
// to glowing solder-pad nodes (a few discrete passive components
// sit along the traces). A short bright dash travels each trace
// via stroke-dasharray, staggered 12 ways and synced with the
// per-node glow so the current never stops. The chip body has a
// subtle glass sheen overlay for the polished look.

// 12 right-angle traces from chip pins to outer nodes. Most fan to
// the right where the hero text doesn't sit, with two left traces
// for balance.
const TRACES = [
  "M 740 312 L 740 230 L 250 230 L 200 150",       // 0  top-left far
  "M 780 312 L 780 200 L 600 200 L 600 100",       // 1  top-mid-L
  "M 860 312 L 860 200 L 1000 200 L 1000 100",     // 2  top-mid-R
  "M 900 312 L 900 230 L 1350 230 L 1400 150",     // 3  top-right far
  "M 940 350 L 1080 350 L 1080 240 L 1150 240",    // 4  right-top
  "M 940 430 L 1500 430",                          // 5  right-mid
  "M 940 550 L 1080 550 L 1080 660 L 1150 660",    // 6  right-bottom
  "M 900 588 L 900 670 L 1350 670 L 1400 750",     // 7  bot-right far
  "M 860 588 L 860 720 L 1000 720 L 1000 800",     // 8  bot-mid-R
  "M 780 588 L 780 720 L 600 720 L 600 800",       // 9  bot-mid-L
  "M 740 588 L 740 670 L 250 670 L 200 750",       // 10 bot-left far
  "M 660 430 L 100 430",                           // 11 left-mid
];

const NODES = [
  [200, 150], [600, 100], [1000, 100], [1400, 150],
  [1150, 240], [1500, 430], [1150, 660], [1400, 750],
  [1000, 800], [600, 800], [200, 750], [100, 430],
];

// Discrete components dotted along certain traces. Position is the
// centre of the body; orient is 'h' (horizontal trace) or 'v'.
// Labels are tiny markings, deliberately generic.
const PASSIVES = [
  { type: "resistor",  x: 450,  y: 230, orient: "h", label: "R1"  },
  { type: "resistor",  x: 1280, y: 430, orient: "h", label: "R2"  },
  { type: "capacitor", x: 1200, y: 230, orient: "h", label: "C1"  },
  { type: "resistor",  x: 780,  y: 720, orient: "h", label: "R3"  },
];

// Pin positions per side — 6 evenly spaced. Centres only; the SVG
// computes the rect coords.
const PIN_TOPBOT = [700, 740, 780, 820, 860, 900];
const PIN_LEFTRIGHT = [350, 390, 430, 470, 510, 550];

function Passive({ p, i }) {
  if (p.type === "capacitor") {
    // a square ceramic-like SMD cap
    return (
      <g className="herochip__passive" key={i}>
        <rect
          x={p.x - 9}
          y={p.y - 7}
          width="18"
          height="14"
          rx="1"
          fill="url(#herochipPassive)"
          stroke="rgba(120, 170, 230, 0.36)"
          strokeWidth="0.6"
        />
        <text
          x={p.x}
          y={p.y + 2}
          textAnchor="middle"
          className="herochip__passive-label"
        >
          {p.label}
        </text>
      </g>
    );
  }
  // resistor — wider body with two solder-pad caps
  return (
    <g className="herochip__passive" key={i}>
      <rect x={p.x - 19} y={p.y - 4} width="6"  height="8" fill="#cdd2db" />
      <rect x={p.x + 13} y={p.y - 4} width="6"  height="8" fill="#cdd2db" />
      <rect
        x={p.x - 14}
        y={p.y - 6}
        width="28"
        height="12"
        rx="1.5"
        fill="url(#herochipPassive)"
        stroke="rgba(120, 170, 230, 0.36)"
        strokeWidth="0.6"
      />
      <text
        x={p.x}
        y={p.y + 2}
        textAnchor="middle"
        className="herochip__passive-label"
      >
        {p.label}
      </text>
    </g>
  );
}

export default function HeroChip() {
  return (
    <div className="herochip" aria-hidden="true">
      <svg
        className="herochip__svg"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="herochipBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0"   stopColor="#1c2842" />
            <stop offset="0.55" stopColor="#0e1626" />
            <stop offset="1"   stopColor="#070c18" />
          </linearGradient>
          <linearGradient id="herochipDie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1426" />
            <stop offset="1" stopColor="#050a16" />
          </linearGradient>
          <linearGradient id="herochipPin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5b6f8c" />
            <stop offset="0.5" stopColor="#3a4d6b" />
            <stop offset="1" stopColor="#1a2a44" />
          </linearGradient>
          <linearGradient id="herochipSheen" x1="0" y1="0" x2="0.7" y2="0.7">
            <stop offset="0"   stopColor="rgba(255, 255, 255, 0.18)" />
            <stop offset="0.45" stopColor="rgba(255, 255, 255, 0.03)" />
            <stop offset="1"   stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          <linearGradient id="herochipPassive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#243349" />
            <stop offset="1" stopColor="#101826" />
          </linearGradient>
          <radialGradient id="herochipCore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0"   stopColor="rgba(160, 220, 255, 0.95)" />
            <stop offset="0.45" stopColor="rgba(60, 150, 240, 0.55)" />
            <stop offset="1"   stopColor="rgba(20, 40, 90, 0)" />
          </radialGradient>
          <pattern
            id="herochipGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(140, 180, 230, 0.045)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* faint PCB grid — atmospheric, not foreground */}
        <rect width="1600" height="900" fill="url(#herochipGrid)" />

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

        {/* discrete passive components dotted along the traces */}
        <g className="herochip__passives">
          {PASSIVES.map((p, i) => (
            <Passive key={i} p={p} i={i} />
          ))}
        </g>

        {/* solder-pad nodes at trace endpoints */}
        <g className="herochip__nodes">
          {NODES.map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="14" className="herochip__nodepad" />
              <circle cx={cx} cy={cy} r="9"  className="herochip__node" />
              <circle cx={cx} cy={cy} r="3.6" className="herochip__nodedot" />
            </g>
          ))}
        </g>

        {/* pins on all four sides */}
        <g className="herochip__pins">
          {PIN_TOPBOT.map((x) => (
            <rect
              key={`t${x}`}
              x={x - 5}
              y="312"
              width="10"
              height="22"
              rx="2"
              fill="url(#herochipPin)"
              stroke="rgba(150, 180, 220, 0.22)"
              strokeWidth="0.5"
            />
          ))}
          {PIN_TOPBOT.map((x) => (
            <rect
              key={`b${x}`}
              x={x - 5}
              y="566"
              width="10"
              height="22"
              rx="2"
              fill="url(#herochipPin)"
              stroke="rgba(150, 180, 220, 0.22)"
              strokeWidth="0.5"
            />
          ))}
          {PIN_LEFTRIGHT.map((y) => (
            <rect
              key={`l${y}`}
              x="646"
              y={y - 5}
              width="22"
              height="10"
              rx="2"
              fill="url(#herochipPin)"
              stroke="rgba(150, 180, 220, 0.22)"
              strokeWidth="0.5"
            />
          ))}
          {PIN_LEFTRIGHT.map((y) => (
            <rect
              key={`r${y}`}
              x="932"
              y={y - 5}
              width="22"
              height="10"
              rx="2"
              fill="url(#herochipPin)"
              stroke="rgba(150, 180, 220, 0.22)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* chip body */}
        <g className="herochip__chip">
          {/* outer package */}
          <rect
            x="668"
            y="318"
            width="264"
            height="264"
            rx="18"
            fill="url(#herochipBody)"
            stroke="rgba(150, 200, 240, 0.4)"
            strokeWidth="1.2"
          />
          {/* inner bevel ring */}
          <rect
            x="678"
            y="328"
            width="244"
            height="244"
            rx="14"
            fill="none"
            stroke="rgba(80, 130, 200, 0.32)"
            strokeWidth="0.8"
          />
          {/* die area */}
          <rect
            x="704"
            y="354"
            width="192"
            height="192"
            rx="8"
            fill="url(#herochipDie)"
            stroke="rgba(60, 110, 180, 0.5)"
            strokeWidth="0.8"
          />
          {/* scan lines on the die */}
          {Array.from({ length: 14 }, (_, k) => 360 + k * 13).map((y) => (
            <line
              key={y}
              x1="712"
              y1={y}
              x2="888"
              y2={y}
              stroke="rgba(120, 200, 255, 0.06)"
              strokeWidth="0.6"
            />
          ))}
          {/* alignment marks (one per corner of the die) */}
          {[
            [712, 362],
            [888, 362],
            [712, 538],
            [888, 538],
          ].map(([cx, cy], k) => (
            <circle
              key={k}
              cx={cx}
              cy={cy}
              r="1.4"
              fill="rgba(140, 200, 255, 0.55)"
            />
          ))}
          {/* core glow + hot dot */}
          <circle
            cx="800"
            cy="450"
            r="36"
            fill="url(#herochipCore)"
            className="herochip__corehalo"
          />
          <circle
            cx="800"
            cy="450"
            r="6"
            fill="rgba(190, 235, 255, 0.95)"
            className="herochip__coredot"
          />
          {/* brand engraving + a tiny part code for realism */}
          <text
            x="800"
            y="528"
            textAnchor="middle"
            className="herochip__brand"
          >
            REVLIENT
          </text>
          <text
            x="800"
            y="540"
            textAnchor="middle"
            className="herochip__partcode"
          >
            R1 · 2026
          </text>
          {/* glass sheen — a diagonal highlight across the package */}
          <rect
            x="668"
            y="318"
            width="264"
            height="264"
            rx="18"
            fill="url(#herochipSheen)"
            pointerEvents="none"
          />
          {/* thin top edge highlight */}
          <path
            d="M 686 320 L 914 320"
            stroke="rgba(255, 255, 255, 0.32)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
