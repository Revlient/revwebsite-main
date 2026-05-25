"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Home-page FAQ. Editorial column with collapsible Q&A rows.
   Placeholder studio-process copy — replace as needed.
   PROOF RULE: no fabricated client names, metrics, or numbers
   are baked into the answers. */

const FAQS = [
  {
    q: "How do engagements usually start?",
    a: "A short discovery call, then a written shape — goals, surfaces, constraints, budget range, timeline. If we're the right studio for it, we send a fixed-scope proposal within a few working days.",
  },
  {
    q: "What does the build process look like?",
    a: "Design, engineering and motion sit on the same desk. We run in weekly cycles, share progress in your private CRM workspace, and ship to a staging URL from day one so feedback lands on real surfaces, not slides.",
  },
  {
    q: "Who actually owns the code, design and assets?",
    a: "You do — fully and unconditionally — once the engagement closes. We hand over the repo, the design source files and any deployment credentials. No proprietary lock-in.",
  },
  {
    q: "What happens after launch?",
    a: "Every build comes with a post-launch support window. Beyond that we offer ongoing retainers for performance work, iteration and new surfaces. The CRM workspace stays live so raising follow-ups is a single click.",
  },
  {
    q: "How do you price work?",
    a: "Fixed-scope quotes for defined builds, monthly retainers for longer engagements. Pricing scales with surface count, complexity and motion / 3D depth — we share the range on the discovery call so there are no surprises.",
  },
  {
    q: "Do you take on small or partial scopes?",
    a: "Yes — a single landing surface, a redesign of one product flow, a polish pass on an existing app. If it's something we can do well, we'll quote it. If it isn't a fit, we'll say so and point you somewhere that is.",
  },
];

function Chevron() {
  return (
    <svg
      className="faq__chev"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FaqRow({ item, index, open, onToggle }) {
  const id = `faq-${index}`;
  return (
    <li className={`faq__row${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="faq__q"
        aria-expanded={open}
        aria-controls={`${id}-a`}
        id={`${id}-q`}
        onClick={onToggle}
      >
        <span className="faq__q-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="faq__q-text">{item.q}</span>
        <span className="faq__q-icon" aria-hidden="true">
          <Chevron />
        </span>
      </button>
      <div
        className="faq__a"
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        hidden={!open}
      >
        <p>{item.a}</p>
      </div>
    </li>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq" id="faq" aria-label="Frequently asked questions">
      <div className="container faq__container">
        <Reveal className="faq__head">
          <span className="faq__eyebrow">
            <span className="faq__eyebrow-dot" />
            <em>Nº</em>&nbsp; FAQ
          </span>
          <h2 className="faq__title">
            Questions, <em>answered.</em>
          </h2>
          <p className="faq__sub">
            What teams ask us before kicking off. If yours isn&apos;t here,
            send it over — we&apos;ll answer honestly.
          </p>
        </Reveal>

        <Reveal className="faq__panel">
          <ul className="faq__list">
            {FAQS.map((item, i) => (
              <FaqRow
                key={item.q}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </ul>

          <div className="faq__footer">
            <p className="faq__footer-text">Still wondering something?</p>
            <a href={CTA_HREF} className="faq__footer-cta">
              <span>Ask the studio</span>
              <span className="faq__footer-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
