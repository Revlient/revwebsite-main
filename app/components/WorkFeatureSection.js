// 🔒 LOCKED — ERP showcase template. Do not modify the dashboard
// mockup (sidebar groups, KPIs, trend + AI panel, bottom row) or
// the surrounding heading/sub copy without an explicit request from
// the team. Real numbers shown here mirror the live
// erp.revlient.com dashboard; the layout was finalised on the
// pass that brought it in line with the live reference.
//
// Hero-section-1 (tailark) block placed under the WorkHero on /work.
// Adapted from a shadcn/framer-motion/lucide-react brief to vanilla
// JS + plain CSS — Tailwind utilities are rebuilt as scoped .wfs-*
// rules, AnimatedGroup stagger replaced with CSS keyframes with
// transition-delay, lucide-react replaced with inline SVG. The
// navbar from the source is intentionally dropped (the page already
// has the WorkHero's in-card nav).

import { CTA_HREF } from "../lib/site";

export default function WorkFeatureSection() {
  return (
    <section className="wfs">
      <div className="wfs__ambient" aria-hidden="true">
        <span className="wfs__blob wfs__blob--1" />
        <span className="wfs__blob wfs__blob--2" />
        <span className="wfs__blob wfs__blob--3" />
      </div>

      <span className="wfs__radial" aria-hidden="true" />

      <div className="wfs__inner">
        <a href={CTA_HREF} className="wfs__pill">
          <span>AI-integrated · 10× faster operations</span>
          <span className="wfs__pill-divider" />
          <span className="wfs__pill-arrow">
            <span className="wfs__pill-arrow-track">
              <span className="wfs__pill-arrow-frame">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="wfs__pill-arrow-frame">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </span>
        </a>

        <h2 className="wfs__heading">A modern ERP, shaped around your business.</h2>
        <p className="wfs__sub">
          Not the old CRM playbook. Projects, clients, quotations,
          invoicing, tally, timesheets and finance — fully
          customisable to how your team actually works, and
          accelerated by AI features that take routine work off the
          desk.
        </p>

        <div className="wfs__actions">
          <span className="wfs__cta-wrap">
            <a href={CTA_HREF} className="wfs__cta wfs__cta--primary">
              Start a project
            </a>
          </span>
          <a href="/process" className="wfs__cta wfs__cta--ghost">
            See our process
          </a>
        </div>
      </div>

      <div className="wfs__showcase-label">
        <span className="wfs__showcase-pulse" />
        Showcase · Customisable ERP · AI-integrated
      </div>

      {/* Faithful inline replica of the live Revlient OS web dashboard
          (erp.revlient.com). Real numbers shared by the team. Swap
          for <img src="/work/revlient-os-erp.png" /> once the real
          PNG is committed. */}
      <div className="wfs__screenwrap wfs__screenwrap--full">
        <span className="wfs__screen-fade" aria-hidden="true" />
        <div className="wfs__screen">
          <div className="wfs__screen-bar">
            <span className="wfs__screen-dot" />
            <span className="wfs__screen-dot" />
            <span className="wfs__screen-dot" />
            <span className="wfs__screen-url">erp.revlient.com</span>
          </div>
          <div className="wfs__screen-body">
            <aside className="wfs__screen-side">
              <div className="wfs__screen-brand">
                <span className="wfs__screen-brand-mark" />
                <div className="wfs__screen-brand-text">
                  <span>Revlient</span>
                  <span className="wfs__screen-brand-sub">Workspace</span>
                </div>
              </div>

              <div className="wfs__screen-search">
                <span className="wfs__screen-search-icon" aria-hidden="true">⌕</span>
                <span>Search</span>
                <span className="wfs__screen-kbd">⌘K</span>
              </div>

              {[
                {
                  group: "TODAY",
                  items: [
                    { label: "Inbox" },
                    { label: "Dashboard", active: true },
                  ],
                },
                {
                  group: "PIPELINE",
                  items: [
                    { label: "Leads" },
                    { label: "Quotations" },
                    { label: "Won deals" },
                    { label: "Clients" },
                  ],
                },
                {
                  group: "WORK",
                  items: [
                    { label: "Projects" },
                    { label: "Issues" },
                  ],
                },
                {
                  group: "FINANCE",
                  items: [
                    { label: "Payments" },
                    { label: "Tally" },
                    { label: "Payroll" },
                    { label: "Bank rec" },
                    { label: "Hours" },
                    { label: "Reports" },
                  ],
                },
                {
                  group: "ADMIN",
                  items: [
                    { label: "Team" },
                    { label: "Dev portal" },
                  ],
                },
              ].map((g) => (
                <div className="wfs__screen-navgroup" key={g.group}>
                  <span className="wfs__screen-navtitle">{g.group}</span>
                  {g.items.map((item) => (
                    <span
                      key={item.label}
                      className={`wfs__screen-navitem ${
                        item.active ? "is-active" : ""
                      }`.trim()}
                    >
                      <span className="wfs__screen-navdot" aria-hidden="true" />
                      {item.label}
                    </span>
                  ))}
                </div>
              ))}
            </aside>

            <main className="wfs__screen-main">
              <header className="wfs__screen-header">
                <div>
                  <span className="wfs__screen-title">Good afternoon, admin</span>
                  <span className="wfs__screen-subtitle">
                    Saturday, May 23, 2026 · 5:19 PM · Mission control
                  </span>
                </div>
                <div className="wfs__screen-toolbar">
                  <span className="wfs__screen-searchbar">
                    <span aria-hidden="true">⌕</span>
                    <span>Search…</span>
                    <span className="wfs__screen-kbd">⌘K</span>
                  </span>
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--primary">
                    + New lead
                  </button>
                </div>
              </header>

              <div className="wfs__screen-kpis">
                {[
                  {
                    label: "Revenue this month",
                    value: "₹3.8L",
                    delta: "-64% vs last month",
                    deltaTone: "down",
                    chart: [2, 16, 24, 12, 46, 14, 68, 11, 90, 13, 118, 22],
                  },
                  {
                    label: "Active pipeline",
                    value: "₹22.0L",
                    sub: "7 deals",
                    chart: [2, 14, 24, 11, 46, 13, 68, 10, 90, 14, 118, 20],
                  },
                  {
                    label: "Open quotations",
                    value: "11",
                    sub: "₹28.6L",
                    chart: [2, 22, 24, 21, 46, 22, 68, 20, 90, 14, 118, 8],
                  },
                  {
                    label: "Active projects",
                    value: "13",
                    delta: "1 overdue milestone",
                    deltaTone: "down",
                    chart: [2, 24, 24, 20, 46, 18, 68, 17, 90, 17, 118, 16],
                  },
                ].map((k) => (
                  <div key={k.label} className="wfs__screen-kpi">
                    <span className="wfs__screen-kpi-label">{k.label}</span>
                    <span className="wfs__screen-kpi-value">{k.value}</span>
                    {k.delta && (
                      <span
                        className={`wfs__screen-kpi-delta wfs__screen-kpi-delta--${k.deltaTone}`}
                      >
                        {k.delta}
                      </span>
                    )}
                    {k.sub && (
                      <span className="wfs__screen-kpi-sub">{k.sub}</span>
                    )}
                    <svg
                      className="wfs__screen-kpi-chart"
                      viewBox="0 0 120 28"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        points={k.chart
                          .reduce((acc, v, i) => {
                            if (i % 2 === 0) acc.push([v]);
                            else acc[acc.length - 1].push(v);
                            return acc;
                          }, [])
                          .map((p) => p.join(","))
                          .join(" ")}
                      />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="wfs__screen-grid2">
                <section className="wfs__screen-trend">
                  <header className="wfs__screen-trend-head">
                    <div>
                      <strong>Revenue trend</strong>
                      <span>Last 6 months · in ₹ lakhs</span>
                    </div>
                    <div className="wfs__screen-trend-value">
                      <span>₹3.8L</span>
                      <em>↘ 64%</em>
                    </div>
                  </header>
                  <svg className="wfs__screen-trend-chart" viewBox="0 0 400 110" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="wfsTrendFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#3b82f6" stopOpacity="0.45" />
                        <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M10 56 Q 70 48 105 54 T 200 48 Q 260 30 320 30 L 390 96 L 10 96 Z"
                      fill="url(#wfsTrendFill)"
                    />
                    <path
                      d="M10 56 Q 70 48 105 54 T 200 48 Q 260 30 320 30 L 390 96"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="wfs__screen-trend-axis" aria-hidden="true">
                    {["Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </section>

                <section className="wfs__screen-ai">
                  <header>
                    <span className="wfs__screen-ai-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 3l1.6 4.6L17 9l-4.4 1.4L11 15l-1.6-4.6L5 9l4.4-1.4z" /><path d="M18 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>
                    </span>
                    <div className="wfs__screen-ai-title">
                      <span>AI assistant</span>
                      <span className="wfs__screen-ai-pill">live data</span>
                    </div>
                    <span className="wfs__screen-ai-refresh">↻ Refresh</span>
                  </header>
                  <p className="wfs__screen-ai-sub">
                    Daily briefing + chat. Ask anything about the business.
                  </p>
                  <div className="wfs__screen-ai-loading" aria-hidden="true">
                    <span /><span /><span />
                  </div>
                  <div className="wfs__screen-ai-input">
                    <span className="wfs__screen-ai-placeholder">Ask a follow-up…</span>
                    <button type="button" className="wfs__screen-ai-send">
                      ↗ Send
                    </button>
                  </div>
                </section>
              </div>

              <div className="wfs__screen-bottom">
                <section className="wfs__screen-block">
                  <header>
                    <span>Activity stream</span>
                    <span className="wfs__screen-livetag">LIVE</span>
                  </header>
                  <ul className="wfs__screen-feed">
                    {[
                      { dot: "blue", text: "Quoted amount updated · ₹4,20,000 → ₹4,20,056", time: "05/21 · 12:02" },
                      { dot: "green", text: "Invoice INV-1.20260517… generated · ₹27,000 · Magnate Study Abroad", time: "05/21 · 09:08" },
                      { dot: "blue", text: "New lead added · Magnates", time: "05/21 · 09:07" },
                      { dot: "green", text: "Invoice INV-0004 generated · Magnate Study Abroad", time: "" },
                    ].map((a, i) => (
                      <li key={i} className={`wfs__screen-feeditem wfs__screen-feeditem--${a.dot}`}>
                        <span className="wfs__screen-feeditem-dot" />
                        <div>
                          <span className="wfs__screen-feeditem-text">{a.text}</span>
                          {a.time && <span className="wfs__screen-feeditem-time">{a.time}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="wfs__screen-block">
                  <header>
                    <span>Top clients</span>
                    <span className="wfs__screen-blocklink">All ↗</span>
                  </header>
                  <ol className="wfs__screen-clients">
                    {[
                      { rank: 1, name: "Skybound Travel", value: "₹6.5L", pct: 100 },
                      { rank: 2, name: "Ocean View Resort", value: "₹6.0L", pct: 92 },
                      { rank: 3, name: "Vidya Learning Lab", value: "₹5.3L", pct: 82 },
                      { rank: 4, name: "Magnate Study Abroad", value: "₹4.5L", pct: 69 },
                      { rank: 5, name: "Sundar Builders", value: "₹4.2L", pct: 65 },
                    ].map((c) => (
                      <li key={c.rank}>
                        <span className="wfs__screen-client-rank">{c.rank}</span>
                        <div className="wfs__screen-client-row">
                          <div className="wfs__screen-client-top">
                            <span className="wfs__screen-client-name">{c.name}</span>
                            <span className="wfs__screen-client-value">{c.value}</span>
                          </div>
                          <span className="wfs__screen-client-bar">
                            <span style={{ width: `${c.pct}%` }} />
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="wfs__screen-block">
                  <header>
                    <span>Finance health</span>
                    <span className="wfs__screen-blocklink">Open ↗</span>
                  </header>
                  <ul className="wfs__screen-finance">
                    <li>
                      <span className="wfs__screen-finance-row">
                        <span className="wfs__screen-finance-label">COLLECTED</span>
                        <span className="wfs__screen-finance-value wfs__screen-finance-value--ok">₹10.1L</span>
                      </span>
                      <span className="wfs__screen-finance-sub">16 milestones paid · all time</span>
                    </li>
                    <li>
                      <span className="wfs__screen-finance-row">
                        <span className="wfs__screen-finance-label">OUTSTANDING</span>
                        <span className="wfs__screen-finance-value wfs__screen-finance-value--warn">₹4.5L</span>
                      </span>
                      <span className="wfs__screen-finance-sub">6 pending</span>
                    </li>
                    <li>
                      <span className="wfs__screen-finance-row">
                        <span className="wfs__screen-finance-label">OVERDUE</span>
                        <span className="wfs__screen-finance-value wfs__screen-finance-value--bad">1</span>
                      </span>
                      <span className="wfs__screen-finance-sub">needs follow-up</span>
                    </li>
                  </ul>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* features marquee — what the ERP ships with */}
      <div className="wfs__features" aria-label="ERP features">
        <span className="wfs__features-eyebrow">What ships with it</span>
        <div className="wfs__marquee">
          <div className="wfs__marquee-track">
            {[
              ...WFS_FEATURES,
              ...WFS_FEATURES, // duplicate for seamless scroll
            ].map((f, i) => (
              <span key={`${f.label}-${i}`} className="wfs__feature">
                <span className="wfs__feature-dot" aria-hidden="true" />
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const WFS_FEATURES = [
  { label: "AI-integrated Tally" },
  { label: "Quote & Invoice generation" },
  { label: "Lead pipeline & sales funnel" },
  { label: "Project & milestone tracking" },
  { label: "Client portal & approvals" },
  { label: "Document automation" },
  { label: "Timesheets & resource planning" },
  { label: "GST & TDS-ready ledgers" },
  { label: "Vendor & payables" },
  { label: "Reports & forecasting" },
  { label: "Role-based access" },
  { label: "Audit trail" },
];
