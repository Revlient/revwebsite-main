"use client";

import Reveal from "./Reveal";

/* Capability showcase — Huly-inspired bento. Five business
   capabilities framed as transformation outcomes, not features.
   Dark cinematic surface, glassmorphic cards, monochrome
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
  return (
    <div className="cap-v cap-v--video" aria-hidden="true">
      <video
        src="/webdevvid.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

function Visual2ndTile() {
  return (
    <div className="cap-v cap-v--video" aria-hidden="true">
      <img
        src="/2ndtile.webp"
        alt="Premium Websites"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
}

function VisualFlightVideo() {
  return (
    <div className="cap-v cap-v--video" aria-hidden="true">
      <video
        src="/Flight_graphic_glides_across_das…_202606090343.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
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
        <span style={{ background: "#0A0A0C" }} />
        <span style={{ background: "#ffffff" }} />
        <span style={{ background: "#727272" }} />
        <span style={{ background: "#E8E8E8" }} />
      </div>
    </div>
  );
}

function VisualCrm() {
  return (
    <div className="cap-v cap-v--video" aria-hidden="true">
      <video
        src="/CRM_SAAS.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

const CAPS = [
  {
    id: "ai",
    eyebrow: "AI Automation",
    headline: "Automations that actually deliver.",
    body:
      "Instead of generic chatbots, we engineer custom AI pipelines and intelligent agents that handle real operational workflows — transforming raw intake into audited, paid invoices.",
    tags: ["Agents", "Pipelines", "AI ops", "Integrations"],
    Visual: VisualFlightVideo,
    span: "wide",
    hideBody: true,
  },
  {
    id: "web",
    eyebrow: "Premium Websites",
    headline: "Websites that command authority.",
    body:
      "Immersive, 3D-grade brand experiences designed to convert high-value buyers. We hold our load times, micro-interactions, and accessibility to a rigorous standard.",
    tags: ["Web", "Motion", "Performance"],
    Visual: Visual2ndTile,
    span: "half",
    hideBody: true,
  },
  {
    id: "erp",
    eyebrow: "ERP & Platforms",
    headline: "Systems built for your operational quirks.",
    body:
      "Stop warping your business to fit rigid software. We build tailormade ERPs and client pipelines designed around your team's exact workflow.",
    tags: ["ERP", "Internal tools", "Scale"],
    Visual: VisualWeb,
    span: "third",
  },
  {
    id: "crm",
    eyebrow: "CRM & Growth Workspaces",
    headline: "Unified platforms that power your operations.",
    body: "Consolidate your visual identity, customer history, invoicing, and automated workflows onto a single, custom-built system designed to feel as good as it looks.",
    tags: ["CRM", "Workspace", "Ops", "Growth"],
    Visual: VisualCrm,
    span: "wide",
  },
];

export default function CapabilityGrid() {
  return (
    <section className="cap" aria-label="What we build">
      <div className="cap__atmosphere" aria-hidden="true">
        <span className="cap__bloom cap__bloom--white" />
        <span className="cap__bloom cap__bloom--black" />
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
              className={`cap__card cap__card--${c.span} cap__card--${c.id} ${c.hideBody ? "cap__card--full-visual" : ""}`.trim()}
              delay={i * 80}
            >
              <div className="cap__card-glow" aria-hidden="true" />
              <div className="cap__card-visual">
                <c.Visual />
              </div>
              {!c.hideBody && (
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
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
