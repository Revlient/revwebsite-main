import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* "Something worth crafting" — redesigned as an editorial manifesto.
   Big italic Cormorant title on top, four numbered notes underneath
   with hairline dividers between them. Mixed typography (Cormorant
   italic numerals in a purple→blue gradient, DM Sans labels) gives
   it a printed-page rhythm without the previous 4-card grid. */

const NOTES = [
  {
    label: "Considered",
    body: "Every detail chosen on purpose. Nothing in our work is there by default.",
  },
  {
    label: "Resilient",
    body: "Built to hold up under real use — not just on demo day.",
  },
  {
    label: "Crafted",
    body: "Pixel-tight typography, honest motion, performance baked into the build.",
  },
  {
    label: "Honest",
    body: "Plain estimates, real timelines, no surprises in scope or invoices.",
  },
];

export default function WorthCrafting() {
  return (
    <section className="worth" aria-label="Something worth crafting">
      <div className="worth__inner">
        <Reveal className="worth__head">
          <span className="worth__eyebrow">
            <span className="worth__eyebrow-dot" />
            Manifesto · Worth crafting
          </span>
          <h2 className="worth__title">
            How we build,<br />
            <em>in four notes.</em>
          </h2>
          <p className="worth__sub">
            An unlikely alliance — where the studio&apos;s precision and the
            client&apos;s instinct move as one.
          </p>
        </Reveal>

        <ol className="worth__notes" aria-label="Four notes on how we build">
          {NOTES.map((n, i) => (
            <Reveal as="li" className="worth-note" key={n.label} delay={i * 80}>
              <span className="worth-note__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="worth-note__rule" aria-hidden="true" />
              <div className="worth-note__text">
                <h3 className="worth-note__label">{n.label}.</h3>
                <p className="worth-note__body">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="worth__cta-wrap">
          <a href={CTA_HREF} className="worth__cta">
            <span>See it in action</span>
            <span className="worth__cta-arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
