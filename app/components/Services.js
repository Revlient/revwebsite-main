import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import { SERVICES } from "../lib/services";
import { SYSTEMS_URL } from "../lib/site";

// Services section. Every card uses the identical layout — icon,
// name, outcome line, capability chips, "Explore" — so a visitor
// can scan all four and immediately grasp what we do. Each card
// links to its own detail route (/services/<slug>).
export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">What we build</span>
            <h2>Four core services, one studio standard.</h2>
            <p>
              Different problems, the same craft. Stated as the outcome you
              get — not the stack we happen to use to get there.
            </p>
          </div>
        </Reveal>

        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <a
                href={`/services/${s.slug}`}
                className="svc-card"
                aria-label={`${s.title} — learn more`}
              >
                <span className="svc-card__icon">
                  <ServiceIcon name={s.icon} />
                </span>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.summary}</p>
                <ul className="svc-card__tags">
                  {s.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <span className="svc-card__more">
                  Explore <span aria-hidden="true">→</span>
                </span>
              </a>
            </Reveal>
          ))}
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
