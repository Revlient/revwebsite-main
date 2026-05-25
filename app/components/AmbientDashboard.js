"use client";

import Reveal from "./Reveal";

/* "Inside the studio" — cinematic dark dashboard section.
   Soft cyan-blue ambient bloom around a glassmorphic container,
   vertical aurora light beams in the back, slow-breathing pulse.
   PROOF RULE: every number, label, name in the mockup is clearly
   placeholder. No fabricated metrics or client data. */

function KpiTile({ k, v, delta, accent }) {
  return (
    <div className={`ambdash-kpi${accent ? " is-accent" : ""}`}>
      <span className="ambdash-kpi__k">{k}</span>
      <span className="ambdash-kpi__v">{v}</span>
      {delta && (
        <span className="ambdash-kpi__d">
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none">
            <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {delta}
        </span>
      )}
    </div>
  );
}

function SparkChart() {
  return (
    <svg viewBox="0 0 320 110" className="ambdash-chart" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ambdash-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#60A5FA" stopOpacity="0.45" />
          <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points="0,88 28,76 56,82 84,64 112,68 140,52 168,44 196,48 224,32 252,28 280,18 320,12"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="0,88 28,76 56,82 84,64 112,68 140,52 168,44 196,48 224,32 252,28 280,18 320,12 320,110 0,110"
        fill="url(#ambdash-grad)"
      />
      <circle cx="280" cy="18" r="3.2" fill="#fff" />
      <circle cx="280" cy="18" r="6" fill="none" stroke="#60A5FA" strokeOpacity="0.45" strokeWidth="1.2" />
    </svg>
  );
}

const ACTIVITY = [
  { label: "Phase 02 · Build", meta: "TODO ago", dot: "active" },
  { label: "Asset · brand-final.fig", meta: "12 MB · ready", dot: "done" },
  { label: "Phase 03 · Launch", meta: "queued", dot: "queued" },
  { label: "Standup recap", meta: "TODO · auto-summary", dot: "ai" },
];

const INSIGHTS = [
  "Velocity holding above the TODO baseline.",
  "Next milestone within the planned envelope.",
  "No regressions across the latest TODO checks.",
];

export default function AmbientDashboard() {
  return (
    <section className="ambdash" aria-label="Inside the studio dashboard">
      <div className="ambdash__atmosphere" aria-hidden="true">
        <span className="ambdash__beam ambdash__beam--1" />
        <span className="ambdash__beam ambdash__beam--2" />
        <span className="ambdash__beam ambdash__beam--3" />
      </div>
      <div className="ambdash__grain" aria-hidden="true" />

      <div className="container ambdash__inner">
        <Reveal className="ambdash__head">
          <span className="ambdash__eyebrow">
            <span className="ambdash__eyebrow-dot" />
            Inside the studio
          </span>
          <h2 className="ambdash__title">
            Every project, <em>in one cockpit.</em>
          </h2>
          <p className="ambdash__sub">
            A live workspace per engagement — phases, assets, AI summaries
            and on-call status, all in one calm surface.
          </p>
        </Reveal>

        <Reveal className="ambdash__stage" delay={120}>
          <div className="ambdash__bloom" aria-hidden="true" />
          <div className="ambdash__bloom ambdash__bloom--2" aria-hidden="true" />

          <div className="ambdash__container">
            {/* top bar */}
            <header className="ambdash__bar">
              <div className="ambdash__bar-left">
                <span className="ambdash__pulse" />
                <span className="ambdash__bar-title">Studio · live</span>
                <span className="ambdash__bar-sep">/</span>
                <span className="ambdash__bar-route">Project · TODO</span>
              </div>
              <div className="ambdash__bar-right">
                <span className="ambdash__pill">All systems</span>
                <div className="ambdash__avatars">
                  <span className="ambdash__avatar t-1">R</span>
                  <span className="ambdash__avatar t-2">K</span>
                  <span className="ambdash__avatar t-3">+5</span>
                </div>
              </div>
            </header>

            {/* KPI row */}
            <div className="ambdash__kpis">
              <KpiTile k="Active projects" v="TODO" delta="+TODO%" />
              <KpiTile k="On-call MTTR" v="TODO" delta="—" />
              <KpiTile k="Throughput / wk" v="TODO" delta="+TODO%" accent />
              <KpiTile k="Coverage" v="TODO%" delta="+TODO" />
            </div>

            {/* main grid */}
            <div className="ambdash__grid">
              <div className="ambdash__panel ambdash__panel--chart">
                <header className="ambdash__panel-head">
                  <span className="ambdash__panel-label">Velocity · last 12 cycles</span>
                  <span className="ambdash__panel-meta">+TODO over baseline</span>
                </header>
                <SparkChart />
                <footer className="ambdash__panel-foot">
                  <span className="ambdash__chip">Build</span>
                  <span className="ambdash__chip">Polish</span>
                  <span className="ambdash__chip is-active">All</span>
                </footer>
              </div>

              <div className="ambdash__panel ambdash__panel--activity">
                <header className="ambdash__panel-head">
                  <span className="ambdash__panel-label">Activity</span>
                  <span className="ambdash__panel-meta">Live</span>
                </header>
                <ul className="ambdash__activity">
                  {ACTIVITY.map((a) => (
                    <li key={a.label} className={`ambdash__act ambdash__act--${a.dot}`}>
                      <span className="ambdash__act-dot" />
                      <span className="ambdash__act-label">{a.label}</span>
                      <span className="ambdash__act-meta">{a.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ambdash__panel ambdash__panel--ai">
                <header className="ambdash__panel-head">
                  <span className="ambdash__panel-label">
                    <span className="ambdash__ai-spark" />
                    Studio AI · summary
                  </span>
                  <span className="ambdash__panel-meta">TODO · auto</span>
                </header>
                <ul className="ambdash__insights">
                  {INSIGHTS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
