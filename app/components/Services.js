import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import BlueGlobe from "./BlueGlobe";
import { SERVICES } from "../lib/services";
import { SYSTEMS_URL } from "../lib/site";

/* Services ecosystem — a glowing intelligence core at the centre,
   four service cards orbiting it at the corners, connected by
   animated SVG circuit paths. All in plain JS + CSS, no motion
   libs. The connecting paths and the orb's rings are pure CSS
   animations; the paths' "data pulse" travels via stroke-dashoffset.

   Path coords are tuned for a 1400x600 viewBox so they meet each
   card's inner edge cleanly under preserveAspectRatio="xMidYMid
   meet". Node dots terminate at the card endpoints. */
// Path start x's at 620/780 — 80vbu from the orb centre at 700,
// matching the orb's outer rim so traces emerge cleanly from
// the glow halo.
const NODES = [
  // tl
  { d: "M 620 254 L 410 254 L 410 168", end: [410, 168] },
  // tr
  { d: "M 780 254 L 990 254 L 990 168", end: [990, 168] },
  // bl
  { d: "M 620 346 L 410 346 L 410 432", end: [410, 432] },
  // br
  { d: "M 780 346 L 990 346 L 990 432", end: [990, 432] },
];

function Preview({ kind }) {
  if (kind === "browser") {
    return (
      <svg viewBox="0 0 160 56" className="svc-eco-card__svg">
        <rect x="2" y="2" width="156" height="52" rx="6" stroke="currentColor" strokeOpacity="0.22" fill="rgba(255,255,255,0.02)" />
        <circle cx="10" cy="10" r="1.6" fill="currentColor" fillOpacity="0.4" />
        <circle cx="16" cy="10" r="1.6" fill="currentColor" fillOpacity="0.3" />
        <circle cx="22" cy="10" r="1.6" fill="currentColor" fillOpacity="0.25" />
        <rect x="8" y="20" width="60" height="6" rx="2" fill="currentColor" fillOpacity="0.18" />
        <rect x="8" y="30" width="100" height="4" rx="2" fill="currentColor" fillOpacity="0.12" />
        <rect x="8" y="38" width="80" height="4" rx="2" fill="currentColor" fillOpacity="0.12" />
        <rect x="120" y="20" width="32" height="22" rx="3" fill="currentColor" fillOpacity="0.12" />
      </svg>
    );
  }
  if (kind === "swatch") {
    return (
      <svg viewBox="0 0 160 56" className="svc-eco-card__svg">
        <rect x="2" y="2" width="156" height="52" rx="6" stroke="currentColor" strokeOpacity="0.22" fill="rgba(255,255,255,0.02)" />
        {[
          ["#4a78ff", 10],
          ["#f43f5e", 36],
          ["#f43f5e", 62],
          ["#f0abfc", 88],
          ["#fbbf24", 114],
        ].map(([c, x]) => (
          <rect key={c} x={x} y="14" width="22" height="22" rx="4" fill={c} opacity="0.85" />
        ))}
        <rect x="10" y="42" width="68" height="4" rx="2" fill="currentColor" fillOpacity="0.18" />
        <rect x="82" y="42" width="40" height="4" rx="2" fill="currentColor" fillOpacity="0.12" />
      </svg>
    );
  }
  if (kind === "chart") {
    return (
      <svg viewBox="0 0 160 56" className="svc-eco-card__svg">
        <rect x="2" y="2" width="156" height="52" rx="6" stroke="currentColor" strokeOpacity="0.22" fill="rgba(255,255,255,0.02)" />
        <path d="M10 46 L36 36 L60 40 L86 24 L112 18 L150 10" fill="none" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M10 46 L36 36 L60 40 L86 24 L112 18 L150 10 L150 50 L10 50 Z" fill="url(#svcChartFill)" opacity="0.5" />
        <defs>
          <linearGradient id="svcChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f43f5e" stopOpacity="0.4" />
            <stop offset="1" stopColor="#f43f5e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[36, 60, 86, 112, 150].map((x) => (
          <circle key={x} cx={x} cy={x === 36 ? 36 : x === 60 ? 40 : x === 86 ? 24 : x === 112 ? 18 : 10} r="1.6" fill="#f43f5e" />
        ))}
      </svg>
    );
  }
  if (kind === "code") {
    return (
      <svg viewBox="0 0 160 56" className="svc-eco-card__svg">
        <rect x="2" y="2" width="156" height="52" rx="6" stroke="currentColor" strokeOpacity="0.22" fill="rgba(255,255,255,0.02)" />
        {/* left gutter with line numbers */}
        <rect x="6" y="8" width="14" height="40" fill="currentColor" fillOpacity="0.05" />
        {[15, 25, 35, 45].map((y, i) => (
          <text key={y} x="13" y={y} textAnchor="middle" fontSize="5" fill="currentColor" fillOpacity="0.32">{i + 1}</text>
        ))}
        {/* code-like lines (varying widths, cyan accents) */}
        <rect x="24" y="12" width="34" height="3.4" rx="1" fill="#f43f5e" opacity="0.6" />
        <rect x="62" y="12" width="48" height="3.4" rx="1" fill="currentColor" fillOpacity="0.18" />
        <rect x="32" y="22" width="22" height="3.4" rx="1" fill="#f43f5e" opacity="0.45" />
        <rect x="58" y="22" width="60" height="3.4" rx="1" fill="currentColor" fillOpacity="0.14" />
        <rect x="32" y="32" width="44" height="3.4" rx="1" fill="currentColor" fillOpacity="0.18" />
        <rect x="80" y="32" width="32" height="3.4" rx="1" fill="#f43f5e" opacity="0.4" />
        <rect x="24" y="42" width="20" height="3.4" rx="1" fill="#f43f5e" opacity="0.55" />
      </svg>
    );
  }
  if (kind === "app") {
    return (
      <svg viewBox="0 0 160 56" className="svc-eco-card__svg">
        <rect x="2" y="2" width="156" height="52" rx="6" stroke="currentColor" strokeOpacity="0.22" fill="rgba(255,255,255,0.02)" />
        {/* phone frame on the left */}
        <rect x="10" y="6" width="26" height="44" rx="4" stroke="currentColor" strokeOpacity="0.4" fill="rgba(255,255,255,0.04)" />
        <rect x="14" y="12" width="18" height="3" rx="1" fill="currentColor" fillOpacity="0.35" />
        <rect x="14" y="18" width="12" height="3" rx="1" fill="currentColor" fillOpacity="0.2" />
        <rect x="14" y="26" width="18" height="13" rx="2" fill="#f43f5e" opacity="0.35" />
        <circle cx="23" cy="44" r="1.6" fill="currentColor" fillOpacity="0.45" />
        {/* card list on the right */}
        <rect x="44" y="8" width="108" height="11" rx="3" fill="currentColor" fillOpacity="0.06" />
        <rect x="48" y="11" width="42" height="3.5" rx="1" fill="currentColor" fillOpacity="0.28" />
        <rect x="124" y="11" width="22" height="4" rx="2" fill="#f43f5e" opacity="0.5" />
        <rect x="44" y="22" width="108" height="11" rx="3" fill="currentColor" fillOpacity="0.06" />
        <rect x="48" y="25" width="52" height="3.5" rx="1" fill="currentColor" fillOpacity="0.22" />
        <rect x="44" y="36" width="108" height="11" rx="3" fill="currentColor" fillOpacity="0.06" />
        <rect x="48" y="39" width="34" height="3.5" rx="1" fill="currentColor" fillOpacity="0.22" />
      </svg>
    );
  }
  // flow
  return (
    <svg viewBox="0 0 160 56" className="svc-eco-card__svg">
      <rect x="2" y="2" width="156" height="52" rx="6" stroke="currentColor" strokeOpacity="0.22" fill="rgba(255,255,255,0.02)" />
      <path d="M22 28 L52 28 L62 14 L100 14 L110 28 L138 28" stroke="currentColor" strokeOpacity="0.35" fill="none" strokeWidth="1.2" />
      <path d="M62 42 L100 42 L110 28" stroke="currentColor" strokeOpacity="0.22" fill="none" strokeWidth="1.2" />
      {[[22, 28], [62, 14], [100, 14], [62, 42], [100, 42], [138, 28]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.4" fill="rgba(8,13,24,0.92)" stroke="#f43f5e" strokeWidth="1.2" />
      ))}
    </svg>
  );
}

export default function Services() {
  return (
    <section className="section svc-section" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">What we build</span>
            <h2>An intelligent service ecosystem.</h2>
            <p>
              Every service runs through one connected core — design,
              engineering, growth and intelligence working as a single
              system, not four agencies.
            </p>
          </div>
        </Reveal>

        <div className="svc-eco">
          <div className="svc-eco__bg" aria-hidden="true">
            <div className="svc-eco__grid" />
            <div className="svc-eco__glow" />
            <div className="svc-eco__particles">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>

          <svg
            className="svc-eco__paths"
            viewBox="0 0 1400 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <g className="svc-eco__traces">
              {NODES.map((n, i) => (
                <path key={i} d={n.d} className="svc-eco__trace" />
              ))}
            </g>
            <g className="svc-eco__pulses">
              {NODES.map((n, i) => (
                <path
                  key={i}
                  d={n.d}
                  className={`svc-eco__pulse svc-eco__pulse--${i + 1}`}
                />
              ))}
            </g>
            <g className="svc-eco__nodes">
              {NODES.map((n, i) => (
                <g key={i}>
                  <circle
                    cx={n.end[0]}
                    cy={n.end[1]}
                    r="9"
                    className="svc-eco__nodering"
                  />
                  <circle
                    cx={n.end[0]}
                    cy={n.end[1]}
                    r="3.4"
                    className="svc-eco__nodedot"
                  />
                </g>
              ))}
            </g>
          </svg>

          <div className="svc-globe">
            <span className="svc-globe__halo" aria-hidden="true" />
            <BlueGlobe />
          </div>
          <span className="svc-globe__label" aria-hidden="true">
            <span>Revlient</span>
            <span>Intelligence Core</span>
          </span>

          <div className="svc-eco__cards">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.slug}
                className={`svc-eco-card-wrap svc-eco-card-wrap--${s.pos}`}
                delay={i * 90}
              >
                <a
                  href={`/services/${s.slug}`}
                  className="svc-eco-card"
                  aria-label={`${s.title} — learn more`}
                >
                  <span className="svc-eco-card__head">
                    <span className="svc-eco-card__icon">
                      <ServiceIcon name={s.icon} />
                    </span>
                    <h3 className="svc-eco-card__title">{s.title}</h3>
                  </span>
                  <p className="svc-eco-card__desc">{s.summary}</p>
                  <div className="svc-eco-card__preview">
                    <Preview kind={s.preview} />
                  </div>
                  <span className="svc-eco-card__more">
                    Explore <span aria-hidden="true">→</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          {/* The one quiet cross-sell line so clients who need the heavy
              ERP/CRM build aren't lost between the two sites. */}
          <p className="services__crosssell">
            Need a large-scale ERP or CRM build? Our specialised systems
            team handles that at{" "}
            <a href={SYSTEMS_URL} target="_blank" rel="noopener noreferrer">
              Revlient Systems
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
