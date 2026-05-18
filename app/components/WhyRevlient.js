import Reveal from "./Reveal";

// The hard question: WHY Revlient. This must be a sharp, ownable claim a
// competitor cannot copy-paste — not generic "we are creative and skilled".
// PLACEHOLDER COPY: sharpened wording is for the real team to lock in.
const PILLARS = [
  {
    index: "01",
    title: "Craft that goes all the way down",
    body: "The polish you see on the surface continues into the parts users never look at but always feel — the load, the empty state, the error. Design-grade, everywhere.",
  },
  {
    index: "02",
    title: "Built to ship, not to demo",
    body: "Beautiful is the baseline, not the finish line. We engineer for the Tuesday-morning reality: real data, real load, real teams using it under pressure.",
  },
  {
    index: "03",
    title: "One studio, end to end",
    body: "Strategy, design and engineering under one roof. No briefs lost in translation between agencies — the people who designed it are the people who built it.",
  },
];

export default function WhyRevlient() {
  return (
    <section className="section" id="why">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Why Revlient</span>
            <h2>Most studios choose flash or function. We refuse to.</h2>
            <p>
              Pure-flash work wins admiration and loses serious buyers.
              Pure-corporate work wins trust and looks like everyone else. We
              build for the people who need both.
            </p>
          </div>
        </Reveal>

        <div className="pillars">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.index} className="pillar" delay={i * 90}>
              <span className="pillar__index">{pillar.index}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
