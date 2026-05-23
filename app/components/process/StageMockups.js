/* Six static SVG mockups, one per process stage. Inline strokes only,
   muted greys with a single purple accent (#C084FC) — except the
   "200 OK" pill in Launch which is intentionally green (status colour).
   No animation inside; this is decoration for the card top. */

const STROKE = "rgba(255, 255, 255, 0.42)";
const STROKE_FAINT = "rgba(255, 255, 255, 0.22)";
const FILL_FAINT = "rgba(255, 255, 255, 0.06)";
const ACCENT = "#C084FC";

function Frame({ children }) {
  return (
    <svg
      className="spine__mockup"
      viewBox="0 0 400 110"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MockDiscovery() {
  // sticky-note board: 3 tilted notes, one with a "scope" pill
  const note = (x, y, rot, hasPill) => (
    <g transform={`rotate(${rot} ${x + 38} ${y + 26})`}>
      <rect
        x={x}
        y={y}
        width="76"
        height="52"
        rx="3"
        fill={FILL_FAINT}
        stroke={STROKE_FAINT}
        strokeWidth="1"
      />
      <line x1={x + 8} y1={y + 14} x2={x + 60} y2={y + 14} stroke={STROKE_FAINT} strokeWidth="1" />
      <line x1={x + 8} y1={y + 22} x2={x + 54} y2={y + 22} stroke={STROKE_FAINT} strokeWidth="1" />
      <line x1={x + 8} y1={y + 30} x2={x + 48} y2={y + 30} stroke={STROKE_FAINT} strokeWidth="1" />
      {hasPill && (
        <g>
          <rect
            x={x + 8}
            y={y + 38}
            width="36"
            height="10"
            rx="5"
            fill="rgba(192, 132, 252, 0.18)"
            stroke="rgba(192, 132, 252, 0.55)"
            strokeWidth="1"
          />
          <text
            x={x + 26}
            y={y + 46}
            textAnchor="middle"
            fontSize="7"
            fontStyle="italic"
            fill={ACCENT}
          >
            scope
          </text>
        </g>
      )}
    </g>
  );
  return (
    <Frame>
      {note(40, 28, -5, false)}
      {note(160, 32, 2, true)}
      {note(280, 26, -3, false)}
    </Frame>
  );
}

function MockOnboarding() {
  // CRM portal: sidebar with menu items, top phase tracker, two
  // rows hinting at assets + enquiries. Same vocab as the other
  // stage mockups.
  return (
    <Frame>
      <rect x="14" y="6" width="372" height="98" rx="8" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* sidebar */}
      <rect x="14" y="6" width="68" height="98" rx="8" fill="rgba(192, 132, 252, 0.06)" />
      <line x1="82" y1="6" x2="82" y2="104" stroke={STROKE_FAINT} strokeWidth="0.75" />
      {/* sidebar items */}
      <rect x="22" y="20" width="48" height="6" rx="2" fill={ACCENT} opacity="0.85" />
      <rect x="22" y="34" width="44" height="4" rx="2" fill={STROKE} opacity="0.5" />
      <rect x="22" y="46" width="40" height="4" rx="2" fill={STROKE} opacity="0.5" />
      <rect x="22" y="58" width="44" height="4" rx="2" fill={STROKE} opacity="0.5" />
      <rect x="22" y="70" width="36" height="4" rx="2" fill={STROKE} opacity="0.5" />
      {/* main: phase tracker */}
      <text x="94" y="22" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE_FAINT}>
        Project phases
      </text>
      {/* phase nodes — 5 dots with connector line */}
      <line x1="100" y1="38" x2="368" y2="38" stroke={STROKE_FAINT} strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => {
        const cx = 100 + i * 67;
        const done = i < 2;
        const active = i === 2;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy="38"
              r="4"
              fill={done || active ? ACCENT : FILL_FAINT}
              stroke={done || active ? ACCENT : STROKE_FAINT}
              strokeWidth="1"
            />
            {active && (
              <circle
                cx={cx}
                cy="38"
                r="8"
                fill="none"
                stroke={ACCENT}
                strokeWidth="0.75"
                opacity="0.55"
              />
            )}
          </g>
        );
      })}
      {/* asset row */}
      <rect x="94" y="56" width="280" height="16" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <circle cx="104" cy="64" r="3" fill="#22c55e" />
      <text x="114" y="67" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>
        Asset uploaded
      </text>
      <text x="324" y="67" fontFamily="ui-monospace, Menlo, monospace" fontSize="7" fill={STROKE_FAINT} textAnchor="end">
        2m ago
      </text>
      {/* enquiry row */}
      <rect x="94" y="78" width="280" height="16" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <circle cx="104" cy="86" r="3" fill={ACCENT} />
      <text x="114" y="89" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>
        Enquiry logged
      </text>
      <text x="324" y="89" fontFamily="ui-monospace, Menlo, monospace" fontSize="7" fill={STROKE_FAINT} textAnchor="end">
        14m ago
      </text>
    </Frame>
  );
}

function MockStrategy() {
  // sitemap: root + 2 children + 1 grandchild
  const box = (x, y, w = 60, h = 22) => (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="3"
      fill={FILL_FAINT}
      stroke={STROKE}
      strokeWidth="1"
    />
  );
  return (
    <Frame>
      {/* root */}
      {box(170, 12)}
      {/* connectors */}
      <line x1="200" y1="34" x2="200" y2="44" stroke={STROKE_FAINT} strokeWidth="1" />
      <line x1="120" y1="44" x2="280" y2="44" stroke={STROKE_FAINT} strokeWidth="1" />
      <line x1="120" y1="44" x2="120" y2="54" stroke={STROKE_FAINT} strokeWidth="1" />
      <line x1="280" y1="44" x2="280" y2="54" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* children */}
      {box(90, 54)}
      {box(250, 54)}
      {/* grandchild */}
      <line x1="280" y1="76" x2="280" y2="86" stroke={STROKE_FAINT} strokeWidth="1" />
      <rect
        x="250"
        y="86"
        width="60"
        height="14"
        rx="3"
        fill="rgba(192, 132, 252, 0.1)"
        stroke="rgba(192, 132, 252, 0.5)"
        strokeWidth="1"
      />
    </Frame>
  );
}

function MockDesign() {
  // wireframe: header bar, 3 image squares in a row, 2 text line stripes
  return (
    <Frame>
      {/* header */}
      <rect x="40" y="12" width="320" height="12" rx="2" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      <circle cx="50" cy="18" r="2.5" fill={STROKE} />
      <line x1="62" y1="18" x2="100" y2="18" stroke={STROKE} strokeWidth="1" />
      <line x1="320" y1="18" x2="350" y2="18" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* 3 image placeholders */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={50 + i * 105}
            y="34"
            width="95"
            height="40"
            rx="2"
            fill={FILL_FAINT}
            stroke={i === 1 ? "rgba(192, 132, 252, 0.6)" : STROKE_FAINT}
            strokeWidth="1"
          />
          <line
            x1={50 + i * 105}
            y1="34"
            x2={50 + i * 105 + 95}
            y2="74"
            stroke={STROKE_FAINT}
            strokeWidth="1"
          />
          <line
            x1={50 + i * 105 + 95}
            y1="34"
            x2={50 + i * 105}
            y2="74"
            stroke={STROKE_FAINT}
            strokeWidth="1"
          />
        </g>
      ))}
      {/* text stripes */}
      <line x1="50" y1="86" x2="280" y2="86" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="94" x2="220" y2="94" stroke={STROKE_FAINT} strokeWidth="2" strokeLinecap="round" />
    </Frame>
  );
}

function MockDevelopment() {
  // code editor: window dots + 3 pseudo lines
  const Line = ({ y, segments }) => (
    <g>
      {segments.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={y}
          width={s.w}
          height="4"
          rx="2"
          fill={s.c}
          opacity={s.o ?? 1}
        />
      ))}
    </g>
  );
  return (
    <Frame>
      {/* window frame */}
      <rect x="40" y="10" width="320" height="90" rx="6" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* dots */}
      <circle cx="52" cy="22" r="2.5" fill={STROKE_FAINT} />
      <circle cx="60" cy="22" r="2.5" fill={STROKE_FAINT} />
      <circle cx="68" cy="22" r="2.5" fill={STROKE_FAINT} />
      <line x1="40" y1="32" x2="360" y2="32" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* 3 lines */}
      <Line
        y={44}
        segments={[
          { x: 56, w: 32, c: ACCENT },
          { x: 92, w: 60, c: "#ffffff", o: 0.7 },
          { x: 156, w: 18, c: STROKE },
          { x: 178, w: 90, c: "#ffffff", o: 0.5 },
        ]}
      />
      <Line
        y={58}
        segments={[
          { x: 64, w: 16, c: ACCENT },
          { x: 84, w: 70, c: "#ffffff", o: 0.7 },
          { x: 160, w: 110, c: STROKE_FAINT, o: 0.8 },
        ]}
      />
      <Line
        y={72}
        segments={[
          { x: 56, w: 22, c: ACCENT },
          { x: 82, w: 40, c: "#ffffff", o: 0.7 },
          { x: 126, w: 28, c: STROKE },
          { x: 158, w: 70, c: "#ffffff", o: 0.5 },
        ]}
      />
      {/* comment line */}
      <Line
        y={86}
        segments={[{ x: 56, w: 180, c: STROKE_FAINT, o: 0.6 }]}
      />
    </Frame>
  );
}

function MockTesting() {
  // terminal: prompt + PASS lines + 1 WARN
  return (
    <Frame>
      <rect x="40" y="10" width="320" height="90" rx="6" fill="rgba(0, 0, 0, 0.32)" stroke={STROKE_FAINT} strokeWidth="1" />
      <text x="52" y="28" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill={STROKE}>
        $ npm test
      </text>
      {[
        { y: 42, label: "discovery.spec.ts", ok: true },
        { y: 54, label: "strategy.spec.ts", ok: true },
        { y: 66, label: "design.spec.ts", warn: true },
        { y: 78, label: "develop.spec.ts", ok: true },
        { y: 90, label: "launch.spec.ts", ok: true },
      ].map((row, i) => (
        <g key={i}>
          <text
            x="52"
            y={row.y}
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="8"
            fill={row.warn ? "#f59e0b" : "#10b981"}
          >
            {row.warn ? "WARN" : "PASS ✓"}
          </text>
          <text
            x="92"
            y={row.y}
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="8"
            fill={STROKE}
          >
            {row.label}
          </text>
          <text
            x="310"
            y={row.y}
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="7"
            fill={STROKE_FAINT}
          >
            {(12 + i * 4) + "ms"}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function MockLaunch() {
  // trending-up line chart + "200 OK" green pill
  return (
    <Frame>
      {/* chart frame */}
      <rect x="40" y="14" width="220" height="82" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      {/* grid lines */}
      {[28, 50, 72].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {/* trending line */}
      <polyline
        points="50,86 80,78 110,82 140,68 170,60 200,52 230,40 250,24"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* fill under line */}
      <polygon
        points="50,86 80,78 110,82 140,68 170,60 200,52 230,40 250,24 250,90 50,90"
        fill="url(#mock-launch-grad)"
        opacity="0.4"
      />
      <defs>
        <linearGradient id="mock-launch-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C084FC" stopOpacity="0.5" />
          <stop offset="1" stopColor="#C084FC" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* trending arrow */}
      <polyline
        points="240,30 250,24 246,34"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 200 OK pill */}
      <rect
        x="280"
        y="40"
        width="80"
        height="22"
        rx="11"
        fill="rgba(16, 185, 129, 0.15)"
        stroke="rgba(16, 185, 129, 0.55)"
        strokeWidth="1"
      />
      <circle cx="294" cy="51" r="3" fill="#10b981" />
      <text
        x="304"
        y="55"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="9"
        fill="#10b981"
        fontWeight="600"
      >
        200 OK
      </text>
    </Frame>
  );
}

const MOCKUPS = [
  MockDiscovery,
  MockOnboarding,
  MockStrategy,
  MockDesign,
  MockDevelopment,
  MockTesting,
  MockLaunch,
];

export default function StageMockup({ index }) {
  const C = MOCKUPS[index] || MOCKUPS[0];
  return <C />;
}
