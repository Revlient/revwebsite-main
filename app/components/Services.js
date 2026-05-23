import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import BlueGlobe from "./BlueGlobe";
import ServiceMockup from "./services/ServiceMockups";
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
                  <div className="svc-eco-card__mockup-wrap">
                    <ServiceMockup slug={s.slug} />
                  </div>
                  <span className="svc-eco-card__head">
                    <span className="svc-eco-card__icon">
                      <ServiceIcon name={s.icon} />
                    </span>
                    <h3 className="svc-eco-card__title">{s.title}</h3>
                  </span>
                  <p className="svc-eco-card__desc">{s.summary}</p>
                  {s.chips && s.chips.length > 0 && (
                    <ul className="svc-eco-card__chips" aria-label="Capabilities">
                      {s.chips.map((c) => (
                        <li key={c} className="svc-eco-card__chip">{c}</li>
                      ))}
                    </ul>
                  )}
                  {s.deliverables && s.deliverables.length > 0 && (
                    <div className="svc-eco-card__deliv">
                      <span className="svc-eco-card__deliv-label">What you get</span>
                      <ul className="svc-eco-card__deliv-list">
                        {s.deliverables.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
