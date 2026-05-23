import Reveal from "./Reveal";
import GeminiBackdrop from "./GeminiBackdrop";

// TODO: replace with a real, attributed, permission-cleared testimonial.
// Featured quote on the left of the wall. Sample copy only — visibly
// flagged via the yellow "replace before launch" badge below the cite.
const FEATURED = {
  quote:
    "They treated our internal tool with the same care most studios save for the homepage. A year on, the team still actually likes using it — that never happens.",
  name: "TODO: name",
  role: "TODO: role, Company",
};

// Three smaller TODO cards. Generic, deliberately not attributed to any
// real client. Every card carries a "DEMO" pill in the top-right corner
// so nothing reads as real client proof.
const STACK = [
  {
    quote:
      "They picked apart our messy spec and came back with something that actually felt buildable. Then they built it.",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    quote:
      "The handoff to our team was the smoothest I've ever seen on an agency project. Code I can actually live with.",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    quote:
      "They cared about the parts of the product nobody ever sees. That's the part I noticed.",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
];

export default function Proof() {
  return (
    <GeminiBackdrop>
      <div className="container proof-wall">
        <Reveal className="proof-wall__featured">
          <div className="proof__quote">
            <blockquote>
              <span className="mark">“</span>
              {FEATURED.quote}
              <span className="mark">”</span>
            </blockquote>
            <div className="proof__cite">
              <strong>{FEATURED.name}</strong>
              <span>{FEATURED.role}</span>
            </div>
            <span className="proof__todo">
              Placeholder testimonial — replace before launch
            </span>
          </div>
        </Reveal>

        <div className="proof-wall__stack">
          {STACK.map((t, i) => (
            <Reveal
              as="figure"
              key={i}
              className="proof-card"
              delay={i * 90}
            >
              <span className="proof-card__demo">Demo</span>
              <blockquote className="proof-card__quote">
                <span className="mark">“</span>
                {t.quote}
                <span className="mark">”</span>
              </blockquote>
              <figcaption className="proof-card__cite">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </GeminiBackdrop>
  );
}
