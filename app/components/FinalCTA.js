import Reveal from "./Reveal";
import { CTA_LABEL } from "../lib/site";

// Closing CTA. id="start" is the anchor every persistent "Start a project"
// button currently resolves to (fourth required CTA placement).
// FOLLOW-ON: when the /start enquiry form ships, point CTA_HREF at it and
// this section's button straight into that flow.
export default function FinalCTA() {
  return (
    <section className="section finale" id="start">
      <div className="container">
        <Reveal className="finale__inner">
          <h2>Have something worth crafting?</h2>
          <p>
            Tell us what you're building. We'll tell you, honestly, whether
            we're the studio to build it — and how we'd approach it.
          </p>
          <div className="finale__actions">
            {/* TODO: swap to the /start enquiry form route once built. */}
            <a href="#start" className="btn btn--primary">
              {CTA_LABEL}
            </a>
            {/* TODO: real studio enquiry email address. */}
            <a
              href="mailto:hello@revlient.com"
              className="btn btn--ghost"
            >
              hello@revlient.com
            </a>
          </div>
          <p className="finale__note">
            One screen, low friction. Tell us the goal, the budget range and
            a short brief — we'll take it from there.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
