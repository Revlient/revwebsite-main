"use client";

import Reveal from "./Reveal";

/* Capability showcase — Huly-inspired bento. Five business
   capabilities framed as transformation outcomes, not features.
   Dark cinematic surface, glassmorphic cards, ambient blue/violet
   bloom behind. PROOF RULE: no fabricated client names, metrics,
   or testimonials embedded. */

/* ---------- Card visuals ---------- */

function VisualAi() {
  // Ambient AI orb with concentric pulse rings + a row of agent chips.
  return (
    <div className="cap-v cap-v--ai" aria-hidden="true">
      <div className="cap-v__orb">
        <span className="cap-v__ring cap-v__ring--1" />
        <span className="cap-v__ring cap-v__ring--2" />
        <span className="cap-v__ring cap-v__ring--3" />
        <span className="cap-v__core" />
      </div>
      <div className="cap-v__agents">
        <span className="cap-v__agent">Intake agent</span>
        <span className="cap-v__agent">Ops agent</span>
        <span className="cap-v__agent">Reporting agent</span>
      </div>
    </div>
  );
}

function VisualWeb() {
  // Stacked translucent browser fragments — premium product reveal.
  return (
    <div className="cap-v cap-v--web" aria-hidden="true">
      <div className="cap-v__pane cap-v__pane--3" />
      <div className="cap-v__pane cap-v__pane--2" />
      <div className="cap-v__pane cap-v__pane--1">
        <div className="cap-v__pane-bar">
          <span /><span /><span />
        </div>
        <div className="cap-v__pane-body">
          <span className="cap-v__pane-h" />
          <span className="cap-v__pane-l" />
          <span className="cap-v__pane-l cap-v__pane-l--short" />
        </div>
      </div>
    </div>
  );
}

function VisualErp() {
  // Layered data planes — depth = customisation
  return (
    <div className="cap-v cap-v--erp" aria-hidden="true">
      <span className="cap-v__layer cap-v__layer--3" />
      <span className="cap-v__layer cap-v__layer--2" />
      <span className="cap-v__layer cap-v__layer--1">
        <span className="cap-v__layer-row" />
        <span className="cap-v__layer-row" />
        <span className="cap-v__layer-row" />
      </span>
    </div>
  );
}

function VisualBrand() {
  // Type specimen + colour swatches — identity systems.
  return (
    <div className="cap-v cap-v--brand" aria-hidden="true">
      <div className="cap-v__type">Aa</div>
      <div className="cap-v__swatches">
        <span style={{ background: "#0F1423" }} />
        <span style={{ background: "#C084FC" }} />
        <span style={{ background: "#60A5FA" }} />
        <span style={{ background: "#F2EFEA" }} />
      </div>
    </div>
  );
}

function VisualCrm() {
  // Workspace tiles — calm operational surface
  return (
    <div className="cap-v cap-v--crm" aria-hidden="true">
      <div className="cap-v__tile">
        <span className="cap-v__tile-dot" />
        <span className="cap-v__tile-bar" />
      </div>
      <div className="cap-v__tile">
        <span className="cap-v__tile-dot cap-v__tile-dot--alt" />
        <span className="cap-v__tile-bar cap-v__tile-bar--short" />
      </div>
      <div className="cap-v__tile">
        <span className="cap-v__tile-dot cap-v__tile-dot--soft" />
        <span className="cap-v__tile-bar cap-v__tile-bar--shorter" />
      </div>
    </div>
  );
}

const CAPS = [
  {
    id: "ai",
    eyebrow: "AI Automation",
    headline: "Operations that run themselves.",
    body:
      "Custom AI agents and automation pipelines that take routine work off your team's desk — from intake to invoicing.",
    tags: ["Agents", "Pipelines", "AI ops", "Integrations"],
    Visual: VisualAi,
    span: "wide",
  },
  {
    id: "web",
    eyebrow: "Premium Websites",
    headline: "Sites that close the deal.",
    body:
      "Cinematic web experiences engineered to convert serious buyers — design, motion and performance held to launch-day standards.",
    tags: ["Web", "Motion", "Performance"],
    Visual: VisualWeb,
    span: "half",
  },
  {
    id: "erp",
    eyebrow: "ERP & Platforms",
    headline: "Software shaped to your business.",
    body:
      "Custom ERP and internal platforms — built around how your team actually works, not the other way around.",
    tags: ["ERP", "Internal tools", "Scale"],
    Visual: VisualErp,
    span: "third",
  },
  {
    id: "brand",
    eyebrow: "Brand & Growth",
    headline: "Brand systems that compound.",
    body:
      "Identity, messaging and growth surfaces designed to look the same in five years as they do at launch.",
    tags: ["Identity", "Content", "Growth"],
    Visual: VisualBrand,
    span: "third",
  },
  {
    id: "crm",
    eyebrow: "CRM & Workflows",
    headline: "Workspaces your team logs into.",
    body:
      "Tailored CRM and ops workspaces — project tracking, client portals, invoicing and reporting on one calm surface.",
    tags: ["CRM", "Ops", "Portals"],
    Visual: VisualCrm,
    span: "third",
  },
];

export default function CapabilityGrid() {
  return (
    <section className="cap" aria-label="What we build">
      <div className="cap__atmosphere" aria-hidden="true">
        <span className="cap__bloom cap__bloom--violet" />
        <span className="cap__bloom cap__bloom--blue" />
      </div>
      <div className="cap__grain" aria-hidden="true" />

      <div className="container cap__inner">
        <Reveal className="cap__head">
          <span className="cap__eyebrow">// What we build</span>
          <h2 className="cap__title">
            Systems that <em>move the business.</em>
          </h2>
          <p className="cap__sub">
            Five capabilities used together to ship serious products —
            from automation pipelines to the workspace your team
            actually logs into.
          </p>
        </Reveal>

        <div className="cap__grid">
          {CAPS.map((c, i) => (
            <Reveal
              key={c.id}
              as="article"
              className={`cap__card cap__card--${c.span}`}
              delay={i * 80}
            >
              <div className="cap__card-glow" aria-hidden="true" />
              <div className="cap__card-visual">
                <c.Visual />
              </div>
              <div className="cap__card-body">
                <span className="cap__card-eyebrow">{c.eyebrow}</span>
                <h3 className="cap__card-h">{c.headline}</h3>
                <p className="cap__card-p">{c.body}</p>
                <div className="cap__card-tags">
                  {c.tags.map((t) => (
                    <span key={t} className="cap__card-tag">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
