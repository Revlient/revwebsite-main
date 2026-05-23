import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* "Something worth crafting" — restrained editorial section made of
   classic UI: centred eyebrow / title / sub / CTA, then a four-card
   pillar grid expressing what "crafted" means at the studio. Each
   card is a stroked line icon + label + one-line description. No
   custom illustrations, no animated hands or energy beams — just
   typography, line icons and a clean grid. */

function IconCompass() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polygon points="16 8 13 13 8 16 11 11 16 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 L20 6 V12 C20 16.5 16.5 19.8 12 21 C7.5 19.8 4 16.5 4 12 V6 Z" />
      <path d="M9 12 L11 14 L15 10" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 L13.4 9.6 L20 11 L13.4 12.4 L12 19 L10.6 12.4 L4 11 L10.6 9.6 Z" />
      <path d="M19 4 L19.6 5.4 L21 6 L19.6 6.6 L19 8 L18.4 6.6 L17 6 L18.4 5.4 Z" />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12 L7 8 L11 10 L13 8 L17 10 L21 12" />
      <path d="M7 14 L10 17 L13 15" />
      <path d="M13 15 L15 17 L18 14" />
      <path d="M3 12 L3 16" />
      <path d="M21 12 L21 16" />
    </svg>
  );
}

const PILLARS = [
  {
    Icon: IconCompass,
    label: "Considered",
    body: "Every detail chosen on purpose. Nothing in our work is there by default.",
  },
  {
    Icon: IconShield,
    label: "Resilient",
    body: "Built to hold up under real use — not just on demo day.",
  },
  {
    Icon: IconSparkles,
    label: "Crafted",
    body: "Pixel-tight typography, honest motion, performance baked in.",
  },
  {
    Icon: IconHandshake,
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
            Worth crafting
          </span>
          <h2 className="worth__title">
            Something worth crafting,<br />
            where instinct meets craft.
          </h2>
          <p className="worth__sub">
            An unlikely alliance — where the studio&apos;s precision and a
            client&apos;s instinct move as one.
          </p>
          <a href={CTA_HREF} className="worth__cta">
            <span>See it in action</span>
            <span className="worth__cta-arrow" aria-hidden="true">→</span>
          </a>
        </Reveal>

        <div className="worth__pillars">
          {PILLARS.map((p, i) => (
            <Reveal className="worth-pillar" key={p.label} delay={i * 80}>
              <span className="worth-pillar__icon">
                <p.Icon />
              </span>
              <h3 className="worth-pillar__label">{p.label}</h3>
              <p className="worth-pillar__body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
