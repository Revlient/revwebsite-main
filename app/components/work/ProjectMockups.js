/* Per-project live SVG mockups for the /work bento. Same monoline-
   grey + purple-accent vocabulary as StageMockups / ServiceMockups,
   but each one carries a CSS-animated element so the card reads
   "alive". All animations live in app/globals.css under
   .wproj-mockup__* selectors; the CSS reads --anim-speed from the
   parent .work-project so hover doubles the speed. */

const STROKE = "rgba(255, 255, 255, 0.42)";
const STROKE_FAINT = "rgba(255, 255, 255, 0.22)";
const FILL_FAINT = "rgba(255, 255, 255, 0.06)";
const ACCENT = "#C084FC";

function Frame({ children, vb = "0 0 400 240", className = "" }) {
  return (
    <svg
      className={`wproj-mockup ${className}`.trim()}
      viewBox={vb}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* 1. Aurora Commerce — browser frame + e-commerce hero with a
      cursor that traces a path to the Add-to-cart button. */
function MockAurora() {
  return (
    <Frame vb="0 0 400 240" className="wproj-mockup--aurora">
      {/* window chrome */}
      <rect x="10" y="8" width="380" height="224" rx="10" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      <circle cx="24" cy="20" r="2.5" fill={STROKE_FAINT} />
      <circle cx="32" cy="20" r="2.5" fill={STROKE_FAINT} />
      <circle cx="40" cy="20" r="2.5" fill={STROKE_FAINT} />
      <rect x="58" y="14" width="200" height="12" rx="3" fill="rgba(0,0,0,0.28)" stroke={STROKE_FAINT} strokeWidth="0.5" />
      <line x1="10" y1="32" x2="390" y2="32" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* nav bar */}
      <rect x="24" y="44" width="24" height="5" rx="2" fill={ACCENT} opacity="0.85" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={280 + i * 32} y="44" width="24" height="5" rx="2" fill={STROKE} opacity="0.45" />
      ))}
      {/* hero text */}
      <rect x="24" y="66" width="200" height="10" rx="2" fill={STROKE} />
      <rect x="24" y="82" width="160" height="6" rx="2" fill={STROKE_FAINT} />
      {/* hero side image */}
      <rect x="244" y="62" width="130" height="60" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      {/* 3 product tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={24 + i * 120}
            y="140"
            width="106"
            height="56"
            rx="4"
            fill={FILL_FAINT}
            stroke={STROKE_FAINT}
            strokeWidth="0.75"
          />
          <line x1={24 + i * 120 + 8} y1="184" x2={24 + i * 120 + 60} y2="184" stroke={STROKE} strokeWidth="1.5" />
          <line x1={24 + i * 120 + 8} y1="190" x2={24 + i * 120 + 40} y2="190" stroke={STROKE_FAINT} strokeWidth="1.5" />
        </g>
      ))}
      {/* Add to cart button */}
      <g className="wproj-aurora-btn">
        <rect
          x="150"
          y="210"
          width="100"
          height="18"
          rx="9"
          fill="rgba(192, 132, 252, 0.22)"
          stroke="rgba(192, 132, 252, 0.55)"
          strokeWidth="1"
        />
        <text
          x="200"
          y="222"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="9"
          fill={ACCENT}
          textAnchor="middle"
        >
          Add to cart
        </text>
      </g>
      {/* animated cursor — offset-path traces a curve down to the button */}
      <g className="wproj-aurora-cursor">
        <path
          d="M 0 0 L 0 12 L 4 9 L 7 14 L 9 14 L 6 9 L 11 9 Z"
          fill="#ffffff"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="0.5"
        />
      </g>
    </Frame>
  );
}

/* 2. Vertex CRM — three-column kanban; top middle-column tile
      slides into the Won column on a loop. */
function MockVertex() {
  return (
    <Frame vb="0 0 400 200" className="wproj-mockup--vertex">
      {/* outer frame */}
      <rect x="10" y="8" width="380" height="184" rx="8" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* column headers */}
      {[
        { x: 24, label: "Lead" },
        { x: 152, label: "Active" },
        { x: 280, label: "Won" },
      ].map((c) => (
        <text
          key={c.label}
          x={c.x}
          y="28"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="8"
          fill={STROKE_FAINT}
        >
          {c.label}
        </text>
      ))}
      <line x1="10" y1="36" x2="390" y2="36" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* Lead column: 1 tile */}
      <rect x="20" y="48" width="108" height="30" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <rect x="28" y="56" width="60" height="4" rx="1" fill={STROKE} />
      <rect x="28" y="64" width="40" height="3" rx="1" fill={STROKE_FAINT} />
      {/* Won column: 1 static tile */}
      <rect x="276" y="48" width="108" height="30" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <rect x="284" y="56" width="60" height="4" rx="1" fill={STROKE} />
      <rect x="284" y="64" width="40" height="3" rx="1" fill={STROKE_FAINT} />
      {/* Active column: 3 tiles; the top one is the animated mover */}
      <g className="wproj-vertex-mover">
        <rect
          x="148"
          y="48"
          width="108"
          height="30"
          rx="4"
          fill="rgba(192, 132, 252, 0.14)"
          stroke="rgba(192, 132, 252, 0.55)"
          strokeWidth="1"
        />
        <rect x="156" y="56" width="60" height="4" rx="1" fill={ACCENT} opacity="0.95" />
        <rect x="156" y="64" width="40" height="3" rx="1" fill={STROKE} opacity="0.6" />
      </g>
      <rect x="148" y="86" width="108" height="30" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <rect x="156" y="94" width="60" height="4" rx="1" fill={STROKE} />
      <rect x="156" y="102" width="40" height="3" rx="1" fill={STROKE_FAINT} />
      <rect x="148" y="124" width="108" height="30" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <rect x="156" y="132" width="60" height="4" rx="1" fill={STROKE} />
      <rect x="156" y="140" width="40" height="3" rx="1" fill={STROKE_FAINT} />
    </Frame>
  );
}

/* 3. Lumen Studio — wireframe; a thin purple selection outline
      hops between the three image squares on a loop. */
function MockLumen() {
  return (
    <Frame vb="0 0 400 200" className="wproj-mockup--lumen">
      <rect x="10" y="8" width="380" height="184" rx="8" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* nav bar */}
      <rect x="24" y="24" width="20" height="5" rx="1.5" fill={STROKE} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={280 + i * 32} y="24" width="24" height="5" rx="1.5" fill={STROKE_FAINT} />
      ))}
      <line x1="10" y1="40" x2="390" y2="40" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* 3 image squares */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={24 + i * 122}
            y="58"
            width="106"
            height="74"
            rx="3"
            fill={FILL_FAINT}
            stroke={STROKE_FAINT}
            strokeWidth="0.75"
          />
          <line
            x1={24 + i * 122}
            y1="58"
            x2={24 + i * 122 + 106}
            y2="132"
            stroke={STROKE_FAINT}
            strokeWidth="0.5"
          />
          <line
            x1={24 + i * 122 + 106}
            y1="58"
            x2={24 + i * 122}
            y2="132"
            stroke={STROKE_FAINT}
            strokeWidth="0.5"
          />
        </g>
      ))}
      {/* text stripes */}
      <line x1="24" y1="150" x2="280" y2="150" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="160" x2="220" y2="160" stroke={STROKE_FAINT} strokeWidth="2" strokeLinecap="round" />
      {/* animated selection rectangle — moves through the three squares */}
      <rect
        className="wproj-lumen-select"
        x="22"
        y="56"
        width="110"
        height="78"
        rx="4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
      />
    </Frame>
  );
}

/* 4. Northwind Ops — dashboard: line chart + 3 bars that breathe +
      a "+TODO%" KPI placeholder. */
function MockNorthwind() {
  return (
    <Frame vb="0 0 400 200" className="wproj-mockup--northwind">
      <rect x="10" y="8" width="380" height="184" rx="8" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* line chart */}
      <polyline
        points="24,76 60,68 96,70 132,52 168,46 204,40 240,32"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="24,76 60,68 96,70 132,52 168,46 204,40 240,32 240,90 24,90"
        fill="url(#wproj-nw-grad)"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="wproj-nw-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C084FC" stopOpacity="0.5" />
          <stop offset="1" stopColor="#C084FC" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* KPI */}
      <text x="280" y="44" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill={STROKE_FAINT}>
        Today
      </text>
      <text x="280" y="64" fontFamily="ui-monospace, Menlo, monospace" fontSize="20" fontWeight="600" fill={ACCENT}>
        +TODO%
      </text>
      {/* axis */}
      <line x1="24" y1="160" x2="376" y2="160" stroke={STROKE_FAINT} strokeWidth="0.75" />
      {/* 3 breathing bars */}
      {[
        { x: 60, cls: "a" },
        { x: 160, cls: "b" },
        { x: 260, cls: "c" },
      ].map((b) => (
        <rect
          key={b.cls}
          className={`wproj-nw-bar wproj-nw-bar--${b.cls}`}
          x={b.x}
          y="100"
          width="60"
          height="60"
          rx="4"
          fill={ACCENT}
          opacity="0.65"
        />
      ))}
    </Frame>
  );
}

/* 5. Folio Health — phone + patient record card; green status dot
      pulses next to the avatar. */
function MockFolio() {
  return (
    <Frame vb="0 0 400 200" className="wproj-mockup--folio">
      {/* phone */}
      <rect x="20" y="14" width="58" height="172" rx="12" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      <rect x="36" y="20" width="26" height="3" rx="1.5" fill={STROKE_FAINT} />
      <rect x="28" y="34" width="42" height="6" rx="2" fill={STROKE} opacity="0.7" />
      <rect x="28" y="46" width="42" height="48" rx="3" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.5" />
      <rect x="28" y="102" width="42" height="6" rx="3" fill={ACCENT} opacity="0.7" />
      {/* patient record card on the right */}
      <rect x="100" y="32" width="280" height="136" rx="10" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* avatar */}
      <circle cx="128" cy="64" r="16" fill={STROKE_FAINT} />
      {/* online status dot — animated */}
      <circle
        className="wproj-folio-dot"
        cx="140"
        cy="76"
        r="4"
        fill="#22c55e"
      />
      {/* name + label */}
      <rect x="156" y="54" width="100" height="6" rx="2" fill={STROKE} />
      <rect x="156" y="66" width="78" height="4" rx="2" fill={STROKE_FAINT} />
      {/* meta rows */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1="116" y1={104 + i * 16} x2="240" y2={104 + i * 16} stroke={STROKE_FAINT} strokeWidth="1" />
          <line x1="248" y1={104 + i * 16} x2="290" y2={104 + i * 16} stroke={STROKE} strokeWidth="1" opacity="0.65" />
        </g>
      ))}
      <rect x="300" y="56" width="64" height="22" rx="11" fill="rgba(34, 197, 94, 0.18)" stroke="rgba(34, 197, 94, 0.55)" strokeWidth="0.75" />
      <text x="332" y="71" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#22c55e">
        Online
      </text>
    </Frame>
  );
}

/* 6. Mesa Roastery — wide terminal mockup. Four log lines stagger-
      in then the whole block resets. */
function MockMesa() {
  return (
    <Frame vb="0 0 600 200" className="wproj-mockup--mesa">
      <rect x="10" y="8" width="580" height="184" rx="10" fill="rgba(0, 0, 0, 0.4)" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* terminal header */}
      <circle cx="24" cy="22" r="2.5" fill={STROKE_FAINT} />
      <circle cx="32" cy="22" r="2.5" fill={STROKE_FAINT} />
      <circle cx="40" cy="22" r="2.5" fill={STROKE_FAINT} />
      <text
        x="300"
        y="26"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="9"
        fill={STROKE_FAINT}
      >
        mesa-roastery — bash
      </text>
      <line x1="10" y1="34" x2="590" y2="34" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* log lines */}
      {[
        { y: 60, cls: "1", text: "> brew batch #243 ... done", color: "#22c55e" },
        { y: 84, cls: "2", text: "> stripe webhook 200 OK", color: "#22c55e" },
        { y: 108, cls: "3", text: "> deploy mesa main 4f8e2a1 ... ok", color: "#22c55e" },
        { y: 132, cls: "4", text: "> roast schedule sent to slack #ops", color: ACCENT },
      ].map((l) => (
        <g key={l.cls} className={`wproj-mesa-line wproj-mesa-line--${l.cls}`}>
          <text
            x="24"
            y={l.y}
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="11"
            fill={l.color}
          >
            {l.text}
          </text>
        </g>
      ))}
      {/* cursor */}
      <rect
        x="24"
        y="148"
        width="7"
        height="12"
        fill={STROKE}
        className="wproj-mesa-caret"
      />
    </Frame>
  );
}

const REGISTRY = {
  aurora: MockAurora,
  vertex: MockVertex,
  lumen: MockLumen,
  northwind: MockNorthwind,
  folio: MockFolio,
  mesa: MockMesa,
};

export default function ProjectMockup({ kind }) {
  const C = REGISTRY[kind];
  return C ? <C /> : null;
}
