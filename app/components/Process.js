import Reveal from "./Reveal";

// Four steps that de-risk the engagement for a time-pressed buyer:
// they want to know how this works before they commit.
const STEPS = [
  {
    num: "01",
    title: "Discover",
    body: "We pin down the real goal, the constraints, and what success actually looks like — before a pixel is drawn.",
  },
  {
    num: "02",
    title: "Design",
    body: "Direction, then detail. You see and feel it early, so decisions are made on something real, not a slide.",
  },
  {
    num: "03",
    title: "Build",
    body: "Engineered for real data and real load, in tight increments you can watch take shape.",
  },
  {
    num: "04",
    title: "Launch",
    body: "Shipped, measured and handed over clean — with the support to keep it sharp after day one.",
  },
];

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">How we work</span>
            <h2>A short, deliberate path from idea to launch.</h2>
            <p>
              No black box. You know where the project is at every stage —
              and so do we.
            </p>
          </div>
        </Reveal>

        <div className="steps">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} className="step" delay={i * 80}>
              <span className="step__num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
