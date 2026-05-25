"use client";

import Reveal from "./Reveal";

/* "Unmatched studio velocity" — huly.io bento clone.
   Cream surface + 4 dark cards, each housing a cropped product
   surface that bleeds out of frame. Label sits below the card
   on the cream as one continuous bold→regular sentence.
   PROOF RULE: numbers are placeholder ("Phase 02", "TODO"). */

/* ----- Card 1: Live workspace — cropped CRM ----- */
function MockWorkspace() {
  const rows = [
    { label: "Phase 01 · Discovery", pct: "100%", state: "done" },
    { label: "Phase 02 · Build", pct: "62%", state: "active" },
    { label: "Phase 03 · Launch", pct: "18%", state: "queued" },
  ];
  return (
    <div className="h2v-mock h2v-mock--workspace" aria-hidden="true">
      <div className="h2v-panel h2v-panel--ws">
        <header className="h2v-panel__head">
          <span className="h2v-panel__dot" />
          <span className="h2v-panel__title">Project · TODO</span>
          <span className="h2v-panel__chip">Active</span>
        </header>
        <div className="h2v-rows">
          {rows.map((r) => (
            <div key={r.label} className={`h2v-row h2v-row--${r.state}`}>
              <span className="h2v-row__dot" />
              <span className="h2v-row__label">{r.label}</span>
              <span className="h2v-row__bar">
                <span className="h2v-row__fill" style={{ width: r.pct }} />
              </span>
              <span className="h2v-row__pct">{r.pct}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="h2v-card-float h2v-card-float--asset">
        <span className="h2v-card-float__label">Asset</span>
        <span className="h2v-card-float__title">brand-final.fig</span>
        <span className="h2v-card-float__meta">12 MB · ready</span>
      </div>
    </div>
  );
}

/* ----- Card 2: Design that ships — design surface ----- */
function MockDesign() {
  const swatches = ["#0F1423", "#2E7BFF", "#6EC1FF", "#C084FC", "#F2EFEA"];
  return (
    <div className="h2v-mock h2v-mock--design" aria-hidden="true">
      <div className="h2v-swatches">
        {swatches.map((c) => (
          <span key={c} className="h2v-swatch" style={{ background: c }} />
        ))}
      </div>
      <div className="h2v-type">
        <span className="h2v-type__aa">Aa</span>
        <div className="h2v-type__meta">
          <span>DM Sans</span>
          <span>800 · 64</span>
        </div>
      </div>
      <div className="h2v-component">
        <span className="h2v-component__label">Button · Primary</span>
        <span className="h2v-component__btn">Start a project</span>
      </div>
    </div>
  );
}

/* ----- Card 3: Built for production — perf dashboard ----- */
function MockPerf() {
  const chips = [
    { k: "INP", v: "184ms" },
    { k: "CLS", v: "0.03" },
    { k: "TBT", v: "112ms" },
  ];
  return (
    <div className="h2v-mock h2v-mock--perf" aria-hidden="true">
      <div className="h2v-perf-card">
        <header className="h2v-perf-card__head">
          <span className="h2v-perf-card__label">Lighthouse · TODO build</span>
          <span className="h2v-perf-card__pill">Passed</span>
        </header>
        <div className="h2v-perf-card__score">
          <span className="h2v-perf-card__big">98</span>
          <span className="h2v-perf-card__big-sub">/ 100</span>
        </div>
        <svg className="h2v-perf-chart" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="h2v-perf-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#6EC1FF" stopOpacity="0.4" />
              <stop offset="1" stopColor="#6EC1FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            points="0,50 22,42 44,46 66,30 88,32 110,22 132,18 154,14 176,10 200,8"
            fill="none"
            stroke="#6EC1FF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points="0,50 22,42 44,46 66,30 88,32 110,22 132,18 154,14 176,10 200,8 200,60 0,60"
            fill="url(#h2v-perf-grad)"
          />
        </svg>
        <div className="h2v-perf-chips">
          {chips.map((c) => (
            <span key={c.k} className="h2v-perf-chip">
              <span className="h2v-perf-chip__k">{c.k}</span>
              <span className="h2v-perf-chip__v">{c.v}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----- Card 4: Always on call — chat thread ----- */
function MockChat() {
  return (
    <div className="h2v-mock h2v-mock--chat" aria-hidden="true">
      <div className="h2v-chat-head">
        <span className="h2v-chat-avatar">R</span>
        <span className="h2v-chat-name">Revlient</span>
        <span className="h2v-chat-presence">· on call</span>
      </div>
      <div className="h2v-bubble h2v-bubble--studio">
        <p>Pushed a fix for the [TODO surface] overnight.</p>
        <p>Take a look when you&apos;re up.</p>
        <span className="h2v-bubble__time">TODO · 2:14 AM</span>
      </div>
      <div className="h2v-bubble h2v-bubble--client">
        <p>Appreciated. Looks great.</p>
        <span className="h2v-bubble__time">TODO · 8:02 AM</span>
      </div>
      <div className="h2v-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

const CARDS = [
  {
    Mock: MockWorkspace,
    bold: "Live workspace.",
    rest: "Every active project lands on its own CRM workspace — phases, assets, enquiries.",
  },
  {
    Mock: MockDesign,
    bold: "Design that ships.",
    rest: "Brand, UI and motion shaped together — never handed off mid-flight.",
  },
  {
    Mock: MockPerf,
    bold: "Built for production.",
    rest: "INP, CLS, TBT measured and held to budget on every release.",
  },
  {
    Mock: MockChat,
    bold: "Always on call.",
    rest: "Post-launch support window baked in. The CRM stays live after launch.",
  },
];

export default function StudioVelocity() {
  return (
    <section className="h2-velocity" aria-label="Studio velocity">
      <div className="container">
        <Reveal className="h2-velocity__head">
          <h2 className="h2-velocity__title">Unmatched studio velocity</h2>
          <p className="h2-velocity__sub">
            Revlient is a small senior studio shipping serious products —
            design, engineering and motion under one roof, on a workspace
            your team actually logs into.
          </p>
        </Reveal>

        <div className="h2-velocity__grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.bold} as="article" className="h2-velocity__cell" delay={i * 80}>
              <div className="h2-velocity__card">
                <div className="h2-velocity__card-noise" aria-hidden="true" />
                <c.Mock />
              </div>
              <p className="h2-velocity__label">
                <span className="h2-velocity__bold">{c.bold}</span>{" "}
                <span className="h2-velocity__rest">{c.rest}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
