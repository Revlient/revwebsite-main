import Reveal from "./Reveal";
import { SYSTEMS_URL } from "../lib/site";

// Services framed as client outcomes, not tech stacks
// ("CRM your team will actually use", not "we use Django").
const SERVICES = [
  {
    num: "01",
    title: "Websites people remember",
    body: "3D-grade marketing sites that make a first impression do real work — fast on a mid-range phone, unforgettable on a good screen.",
    meta: "Creative web · brand · 3D / WebGL",
  },
  {
    num: "02",
    title: "Apps that respect people's time",
    body: "Web and mobile products designed around the job to be done — quick to learn, quietly powerful, built to scale with you.",
    meta: "Web & app development",
  },
  {
    num: "03",
    title: "CRM systems your team will actually use",
    body: "Internal tools shaped around how your team really works, so the software disappears and the work gets done. Delivered with our systems division.",
    meta: "Custom CRM · internal tools",
  },
  {
    num: "04",
    title: "Automations that delete the busywork",
    body: "The repetitive glue between your tools, quietly handled — so people spend their hours on judgement, not copy-paste.",
    meta: "Workflow & process automation",
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Four ways we earn the word "studio".</h2>
            <p>
              Stated as the outcome you get — not the framework we happen to
              use to get there.
            </p>
          </div>
        </Reveal>

        <div className="services">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} className="service" delay={i * 80}>
              <span className="service__num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="service__meta">{s.meta}</span>
            </Reveal>
          ))}
        </div>

        <Reveal>
          {/* The one quiet cross-sell line so clients who need both the
              creative site AND systems work aren't lost between sites. */}
          <p className="services__crosssell">
            Need the heavy ERP/CRM build too? Our specialised systems team
            handles that at{" "}
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
