/* Four richer service-card mockups for the home Services bento.
   Same monoline-grey-with-purple-accent style as StageMockups in
   ProcessSpine — static inline SVG, no animation, no extra rAF. */

const STROKE = "rgba(255, 255, 255, 0.42)";
const STROKE_FAINT = "rgba(255, 255, 255, 0.22)";
const FILL_FAINT = "rgba(255, 255, 255, 0.06)";
const ACCENT = "#ffffff";

function Frame({ children }) {
  return (
    <svg
      className="svc-eco-card__mockup"
      viewBox="0 0 400 110"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MockWeb() {
  // Desktop browser frame, nav bar, hero section + 3-col grid
  return (
    <Frame>
      {/* window chrome */}
      <rect x="14" y="6" width="372" height="98" rx="8" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      <circle cx="26" cy="16" r="2.5" fill={STROKE_FAINT} />
      <circle cx="34" cy="16" r="2.5" fill={STROKE_FAINT} />
      <circle cx="42" cy="16" r="2.5" fill={STROKE_FAINT} />
      <rect x="60" y="11" width="120" height="10" rx="3" fill="rgba(0,0,0,0.25)" stroke={STROKE_FAINT} strokeWidth="0.75" />
      <line x1="14" y1="26" x2="386" y2="26" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* nav bar inside */}
      <rect x="26" y="34" width="20" height="4" rx="1" fill={ACCENT} opacity="0.85" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={280 + i * 32} y="34" width="24" height="4" rx="1" fill={STROKE} opacity="0.5" />
      ))}
      {/* hero section */}
      <rect x="26" y="48" width="180" height="6" rx="2" fill={STROKE} />
      <rect x="26" y="58" width="140" height="4" rx="2" fill={STROKE_FAINT} />
      <rect x="26" y="66" width="50" height="10" rx="5" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.75" />
      <rect x="226" y="46" width="148" height="34" rx="4" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      {/* 3-col grid */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={26 + i * 122}
          y="88"
          width="106"
          height="10"
          rx="2"
          fill={FILL_FAINT}
          stroke={STROKE_FAINT}
          strokeWidth="0.75"
        />
      ))}
    </Frame>
  );
}

function MockSoftware() {
  // Terminal split — left logs (4 lines), right JSON (3 lines, one purple key)
  return (
    <Frame>
      {/* outer frame */}
      <rect x="14" y="6" width="372" height="98" rx="8" fill="rgba(0,0,0,0.32)" stroke={STROKE_FAINT} strokeWidth="1" />
      {/* split divider */}
      <line x1="200" y1="12" x2="200" y2="98" stroke={STROKE_FAINT} strokeWidth="1" strokeDasharray="2 3" />
      {/* left: logs */}
      <text x="26" y="24" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE_FAINT}>$ pnpm dev</text>
      {[
        { y: 42, label: "ready", t: "200ms" },
        { y: 54, label: "compiled", t: "120ms" },
        { y: 66, label: "hot reload", t: "8ms" },
        { y: 78, label: "GET /api/me", t: "12ms" },
      ].map((row, i) => (
        <g key={i}>
          <text x="26" y={row.y} fontFamily="ui-monospace, Menlo, monospace" fontSize="7.5" fill="#10b981">
            ✓
          </text>
          <text x="36" y={row.y} fontFamily="ui-monospace, Menlo, monospace" fontSize="7.5" fill={STROKE}>
            {row.label}
          </text>
          <text x="180" y={row.y} fontFamily="ui-monospace, Menlo, monospace" fontSize="7" fill={STROKE_FAINT} textAnchor="end">
            {row.t}
          </text>
        </g>
      ))}
      {/* right: JSON snippet */}
      <text x="216" y="24" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE_FAINT}>config.json</text>
      <text x="216" y="42" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>{"{"}</text>
      <text x="226" y="54" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={ACCENT}>
        &quot;auth&quot;:
      </text>
      <text x="258" y="54" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>
        true,
      </text>
      <text x="226" y="66" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>
        &quot;db&quot;: &quot;pg&quot;,
      </text>
      <text x="226" y="78" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>
        &quot;env&quot;: &quot;prod&quot;
      </text>
      <text x="216" y="90" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={STROKE}>{"}"}</text>
    </Frame>
  );
}

function MockApp() {
  // Phone silhouette + wide list of 3 rows (avatar + 2 lines), one row with purple CTA
  return (
    <Frame>
      {/* phone */}
      <rect x="20" y="10" width="58" height="90" rx="10" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="1" />
      <rect x="36" y="14" width="26" height="3" rx="1.5" fill={STROKE_FAINT} />
      <rect x="28" y="24" width="42" height="6" rx="1.5" fill={STROKE} opacity="0.6" />
      <rect x="28" y="36" width="42" height="28" rx="3" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
      <rect x="28" y="70" width="42" height="6" rx="3" fill={ACCENT} opacity="0.7" />
      <rect x="28" y="80" width="32" height="3" rx="1" fill={STROKE_FAINT} />
      {/* list rows on the right */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="92" y={14 + i * 30} width="290" height="26" rx="5" fill={FILL_FAINT} stroke={STROKE_FAINT} strokeWidth="0.75" />
          <circle cx="106" cy={27 + i * 30} r="8" fill={STROKE_FAINT} />
          <rect x="124" y={20 + i * 30} width="110" height="4" rx="1.5" fill={STROKE} opacity={i === 1 ? 0.8 : 0.55} />
          <rect x="124" y={30 + i * 30} width="80" height="3" rx="1.5" fill={STROKE_FAINT} />
          {i === 1 ? (
            <g>
              <rect x="328" y={22 + i * 30} width="42" height="12" rx="6" fill="rgba(255, 255, 255, 0.22)" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.75" />
              <text x="349" y={31 + i * 30} fontSize="7" fontFamily="ui-monospace, Menlo, monospace" fill={ACCENT} textAnchor="middle">Open</text>
            </g>
          ) : (
            <text x="368" y={31 + i * 30} fontSize="14" fill={STROKE_FAINT} textAnchor="end">›</text>
          )}
        </g>
      ))}
    </Frame>
  );
}

function MockAutomation() {
  // Workflow Z: 4 nodes connected by thin arrows, one highlighted purple
  const node = (x, y, label, hot) => (
    <g>
      <rect
        x={x}
        y={y}
        width="78"
        height="30"
        rx="6"
        fill={hot ? "rgba(255, 255, 255, 0.18)" : FILL_FAINT}
        stroke={hot ? "rgba(255, 255, 255, 0.55)" : STROKE_FAINT}
        strokeWidth="1"
      />
      <circle cx={x + 12} cy={y + 15} r="3.5" fill={hot ? ACCENT : STROKE} />
      <text
        x={x + 22}
        y={y + 18}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="8"
        fill={hot ? ACCENT : STROKE}
      >
        {label}
      </text>
    </g>
  );
  const arrow = (x1, y1, x2, y2) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={STROKE_FAINT} strokeWidth="1" />
      <polygon
        points={`${x2},${y2} ${x2 - 5},${y2 - 3} ${x2 - 5},${y2 + 3}`}
        fill={STROKE_FAINT}
      />
    </g>
  );
  return (
    <Frame>
      {node(28, 14, "Trigger")}
      {node(150, 14, "Filter", true)}
      {arrow(106, 29, 150, 29)}
      {arrow(228, 29, 246, 50)}
      {node(232, 64, "Transform")}
      {arrow(310, 79, 320, 64)}
      {node(322, 38, "Notify")}
    </Frame>
  );
}

const MOCKUPS = {
  "web-development": MockWeb,
  "software-development": MockSoftware,
  "application-development": MockApp,
  "automation-systems": MockAutomation,
};

export default function ServiceMockup({ slug }) {
  const C = MOCKUPS[slug];
  if (!C) return null;
  return <C />;
}
