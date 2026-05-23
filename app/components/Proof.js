import Reveal from "./Reveal";
import GeminiBackdrop from "./GeminiBackdrop";

// TODO: replace with a real, attributed, permission-cleared testimonial.
// This is placeholder copy — it is visibly flagged below and must not be
// presented as a genuine quote at launch.
const TESTIMONIAL = {
  quote:
    "They treated our internal tool with the same care most studios save for the homepage. A year on, the team still actually likes using it — that never happens.",
  name: "TODO: name",
  role: "TODO: role, Company",
};

export default function Proof() {
  return (
    <GeminiBackdrop>
      <div className="container">
        <Reveal>
          <div className="proof__quote">
            <blockquote>
              <span className="mark">“</span>
              {TESTIMONIAL.quote}
              <span className="mark">”</span>
            </blockquote>
            <div className="proof__cite">
              <strong>{TESTIMONIAL.name}</strong>
              <span>{TESTIMONIAL.role}</span>
            </div>
            <span className="proof__todo">
              Placeholder testimonial — replace before launch
            </span>
          </div>
        </Reveal>
      </div>
    </GeminiBackdrop>
  );
}
