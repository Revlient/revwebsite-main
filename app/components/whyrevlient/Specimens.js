/* Three inline-SVG "design specimens" for the WhyRevlient pillars.
   Each shows a polished product surface instead of an icon:
   - Capability: dashboard widget (KPI + sparkline + chip strip)
   - Reliability: deploy status panel (PASS rows + commit hash)
   - Loyalty: message thread (two chat bubbles + typing dots)
   Same monoline-grey + purple accent vocabulary as StageMockups /
   ServiceMockups / ProjectMockups. PROOF RULE: every number, label,
   commit hash, KPI, range is clearly placeholder. */

const STROKE = "rgba(255, 255, 255, 0.5)";
const STROKE_FAINT = "rgba(255, 255, 255, 0.28)";
const FILL_FAINT = "rgba(255, 255, 255, 0.05)";
const ACCENT = "#C084FC";
const GREEN = "#22c55e";

function Frame({ children, vb = "0 0 400 140" }) {
  return (
    <svg
      className="whyrev-spec"
      viewBox={vb}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SpecCapability() {
  // Dashboard widget: window chrome, hero KPI + delta pill,
  // sparkline, 3 chips along the bottom.
  return (
    <Frame>
      <rect x="10" y="6" width="380" height="128" rx="8" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* title strip */}
      <text x="22" y="22" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE_FAINT}>
        Operations · TODO range
      </text>
      <circle cx="372" cy="20" r="3" fill={ACCENT} opacity="0.85" />
      <line x1="10" y1="30" x2="390" y2="30" stroke={STROKE_FAINT} strokeWidth="0.75" />
      {/* hero KPI */}
      <text x="22" y="60" fontFamily="ui-monospace, Menlo, monospace" fontSize="22" fontWeight="600" fill="#fff">
        TODO L
      </text>
      {/* delta pill */}
      <rect x="120" y="44" width="58" height="18" rx="9" fill="rgba(192,132,252,0.2)" stroke="rgba(192,132,252,0.5)" strokeWidth="0.75" />
      <text x="149" y="57" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill={ACCENT}>
        +TODO%
      </text>
      {/* sparkline */}
      <polyline
        points="22,90 70,82 118,88 166,72 214,68 262,58 310,52 358,46"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="22,90 70,82 118,88 166,72 214,68 262,58 310,52 358,46 358,100 22,100"
        fill="url(#whyrev-spec-grad)"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="whyrev-spec-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ACCENT} stopOpacity="0.45" />
          <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[70, 166, 262, 358].map((x, i) => (
        <circle key={x} cx={x} cy={[82, 72, 58, 46][i]} r="2" fill={ACCENT} />
      ))}
      {/* chips */}
      {[
        { x: 22, label: "Live · " },
        { x: 138, label: "Queue · " },
        { x: 260, label: "Today · " },
      ].map((c) => (
        <g key={c.x}>
          <rect
            x={c.x}
            y="112"
            width="108"
            height="16"
            rx="8"
            fill={FILL_FAINT}
            stroke={STROKE_FAINT}
            strokeWidth="0.75"
          />
          <text
            x={c.x + 10}
            y="123"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="8"
            fill={STROKE_FAINT}
          >
            {c.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function SpecReliability() {
  // Deploy panel: title, 3 PASS rows with check icons, commit
  // hash, Deployed pill bottom-right.
  return (
    <Frame>
      <rect x="10" y="6" width="380" height="128" rx="8" fill="rgba(0,0,0,0.32)" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* title */}
      <text x="22" y="24" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill={STROKE}>
        Build #TODO · main
      </text>
      <line x1="10" y1="32" x2="390" y2="32" stroke={STROKE_FAINT} strokeWidth="0.5" />
      {/* PASS rows */}
      {[
        { y: 50, label: "PASS · unit tests" },
        { y: 68, label: "PASS · integration" },
        { y: 86, label: "PASS · lighthouse" },
      ].map((row) => (
        <g key={row.y}>
          {/* check glyph */}
          <circle cx="26" cy={row.y - 4} r="6" fill="rgba(34,197,94,0.18)" stroke="rgba(34,197,94,0.55)" strokeWidth="0.75" />
          <path d={`M 23 ${row.y - 4} L 25 ${row.y - 2} L 29 ${row.y - 6}`} stroke={GREEN} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="40" y={row.y} fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill={GREEN} fontWeight="500">
            {row.label.split(" · ")[0]}
          </text>
          <text x="74" y={row.y} fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill={STROKE_FAINT}>
            · {row.label.split(" · ")[1]}
          </text>
        </g>
      ))}
      {/* commit hash row */}
      <line x1="22" y1="104" x2="368" y2="104" stroke={STROKE_FAINT} strokeDasharray="2 3" />
      <text x="22" y="120" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE_FAINT}>
        TODO-hash · TODO ago
      </text>
      {/* Deployed pill */}
      <rect x="306" y="108" width="68" height="18" rx="9" fill="rgba(192,132,252,0.2)" stroke="rgba(192,132,252,0.5)" strokeWidth="0.75" />
      <text x="340" y="121" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill={ACCENT}>
        Deployed
      </text>
    </Frame>
  );
}

function SpecLoyalty() {
  // Message thread: header with avatar + name, two chat bubbles,
  // timestamp, 3 typing dots animating.
  return (
    <Frame>
      <rect x="10" y="6" width="380" height="128" rx="8" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* header */}
      <circle cx="26" cy="22" r="8" fill="rgba(192,132,252,0.2)" stroke="rgba(192,132,252,0.55)" strokeWidth="0.75" />
      <text x="26" y="25" textAnchor="middle" fontFamily="var(--font-cormorant), Georgia, serif" fontSize="9" fontStyle="italic" fontWeight="600" fill={ACCENT}>
        R
      </text>
      <text x="40" y="20" fontFamily="ui-monospace, Menlo, monospace" fontSize="8.5" fill="#fff" fontWeight="500">
        Revlient
      </text>
      <text x="84" y="20" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE_FAINT}>
        · on call
      </text>
      <line x1="10" y1="34" x2="390" y2="34" stroke={STROKE_FAINT} strokeWidth="0.5" />
      {/* studio bubble (purple-tinted) */}
      <rect x="22" y="42" width="252" height="36" rx="10" fill="rgba(192,132,252,0.14)" stroke="rgba(192,132,252,0.32)" strokeWidth="0.75" />
      <text x="30" y="54" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#f5e7ff">
        Pushed a fix for the [TODO surface]
      </text>
      <text x="30" y="66" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#f5e7ff">
        overnight. Take a look when you're up.
      </text>
      <text x="30" y="76" fontFamily="ui-monospace, Menlo, monospace" fontSize="7" fill={STROKE_FAINT}>
        TODO · 2:14 AM
      </text>
      {/* client bubble (grey-tinted) */}
      <rect x="216" y="86" width="160" height="22" rx="10" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <text x="226" y="100" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>
        Appreciated.
      </text>
      {/* typing dots (animated via CSS) */}
      <g className="whyrev-spec__typing" transform="translate(22 118)">
        <circle className="whyrev-spec__dot whyrev-spec__dot--1" cx="0" cy="0" r="2" fill={STROKE_FAINT} />
        <circle className="whyrev-spec__dot whyrev-spec__dot--2" cx="8" cy="0" r="2" fill={STROKE_FAINT} />
        <circle className="whyrev-spec__dot whyrev-spec__dot--3" cx="16" cy="0" r="2" fill={STROKE_FAINT} />
      </g>
    </Frame>
  );
}

const REGISTRY = {
  capability: SpecCapability,
  reliability: SpecReliability,
  loyalty: SpecLoyalty,
};

export default function Specimen({ kind }) {
  const C = REGISTRY[kind];
  if (!C) return null;
  return <C />;
}
