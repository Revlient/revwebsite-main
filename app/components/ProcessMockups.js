// Pure HTML/CSS mockup sub-components for the six process stages
// on /process. No images, no external deps — every visual built
// from JSX + CSS classes prefixed .proc-*.

export function ChatMockup() {
  return (
    <div className="proc-chat">
      <div className="proc-chat__head">
        <span className="proc-chat__dot" />
        <span className="proc-chat__dot" />
        <span className="proc-chat__dot" />
        <span className="proc-chat__title">Project · Brief</span>
      </div>
      <div className="proc-chat__body">
        <div className="proc-chat__msg proc-chat__msg--client">
          <span className="proc-chat__who">Client</span>
          <p>We need a CRM that fits how our sales team actually works — not a template.</p>
        </div>
        <div className="proc-chat__msg proc-chat__msg--rev">
          <span className="proc-chat__who">Revlient</span>
          <p>Got it. Walk me through a week in the life of a rep — every screen they open, every report they live in.</p>
        </div>
        <div className="proc-chat__msg proc-chat__msg--client">
          <span className="proc-chat__who">Client</span>
          <p>Lead → quote → contract → onboarding. Quotes are where the bottleneck is.</p>
        </div>
        <div className="proc-chat__typing" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="proc-chat__scope">
          <span className="proc-chat__scope-tag">PROJECT SCOPE</span>
          <ul>
            <li>Custom CRM · lead → quote → contract</li>
            <li>Quote engine with line-item templates</li>
            <li>Role-based dashboards · sales / ops</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function KanbanMockup() {
  const cols = [
    {
      title: "Discovery",
      tasks: [
        { label: "Stakeholder interviews", tone: "design" },
        { label: "User research", tone: "design" },
      ],
    },
    {
      title: "Build",
      tasks: [
        { label: "API contracts", tone: "dev" },
        { label: "Frontend scaffolding", tone: "dev" },
        { label: "Auth + roles", tone: "dev" },
      ],
    },
    {
      title: "Launch",
      tasks: [
        { label: "Cross-browser QA", tone: "qa" },
        { label: "Deploy pipeline", tone: "qa" },
      ],
    },
  ];
  return (
    <div className="proc-kanban">
      <div className="proc-kanban__head">
        <span className="proc-kanban__title">Sprint 4 · 12-day delivery</span>
        <span className="proc-kanban__date">May 23 → Jun 04</span>
      </div>
      <div className="proc-kanban__cols">
        {cols.map((c) => (
          <div className="proc-kanban__col" key={c.title}>
            <header>
              <span>{c.title}</span>
              <span className="proc-kanban__count">{c.tasks.length}</span>
            </header>
            <ul>
              {c.tasks.map((t) => (
                <li key={t.label} className={`proc-kanban__task proc-kanban__task--${t.tone}`}>
                  <span className="proc-kanban__task-dot" />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DesignToolMockup() {
  return (
    <div className="proc-design">
      <div className="proc-design__chrome">
        <span className="proc-design__dot" />
        <span className="proc-design__dot" />
        <span className="proc-design__dot" />
        <span className="proc-design__file">homepage-v3.fig</span>
      </div>
      <div className="proc-design__body">
        <aside className="proc-design__layers">
          <span className="proc-design__layer-title">LAYERS</span>
          {[
            "Frame · Homepage",
            "Section · Hero",
            "Section · Features",
            "Section · CTA",
            "Footer",
          ].map((l, i) => (
            <span
              key={l}
              className={`proc-design__layer ${i === 1 ? "is-active" : ""}`}
            >
              <span className="proc-design__layer-dot" />
              {l}
            </span>
          ))}
        </aside>
        <main className="proc-design__canvas">
          <div className="proc-design__page">
            <div className="proc-design__nav" />
            <div className="proc-design__hero">
              <span className="proc-design__line proc-design__line--lg" />
              <span className="proc-design__line proc-design__line--md" />
              <span className="proc-design__btn" />
            </div>
            <div className="proc-design__grid">
              <span className="proc-design__card" />
              <span className="proc-design__card" />
              <span className="proc-design__card" />
            </div>
          </div>
          <span className="proc-design__cursor" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4l6 16 2.5-6.5L19 11z" />
            </svg>
            <span>Revlient</span>
          </span>
        </main>
      </div>
    </div>
  );
}

export function CodeEditorMockup() {
  return (
    <div className="proc-code">
      <div className="proc-code__tabs">
        <span className="proc-code__tab is-active">
          <span className="proc-code__tab-icon" /> quote-engine.ts
        </span>
        <span className="proc-code__tab">
          <span className="proc-code__tab-icon" /> pipeline.ts
        </span>
        <span className="proc-code__tab">
          <span className="proc-code__tab-icon" /> roles.ts
        </span>
      </div>
      <div className="proc-code__body">
        <pre className="proc-code__pre">
{`  1  `}<span className="proc-code__k">import</span>{` { Deal, Quote } `}<span className="proc-code__k">from</span>{` "@/types";
  2
  3  `}<span className="proc-code__c">{`// Build a fresh quote from a deal's line items`}</span>{`
  4  `}<span className="proc-code__k">export function</span>{` `}<span className="proc-code__f">buildQuote</span>{`(deal`}<span className="proc-code__k">:</span>{` Deal)`}<span className="proc-code__k">:</span>{` Quote {
  5    `}<span className="proc-code__k">const</span>{` lines `}<span className="proc-code__k">=</span>{` deal.items.`}<span className="proc-code__f">map</span>{`((item) `}<span className="proc-code__k">=&gt;</span>{` ({
  6      sku`}<span className="proc-code__k">:</span>{` item.sku,
  7      qty`}<span className="proc-code__k">:</span>{` item.qty,
  8      price`}<span className="proc-code__k">:</span>{` `}<span className="proc-code__f">priceFor</span>{`(item, deal.client.tier),
  9    }));
 10    `}<span className="proc-code__k">return</span>{` `}<span className="proc-code__f">finalize</span>{`(lines, deal.client);
 11  }`}
        </pre>
      </div>
    </div>
  );
}

export function TestResultsMockup() {
  const rows = [
    { label: "Unit tests", count: 412, passed: true },
    { label: "Integration", count: 86, passed: true },
    { label: "End-to-end", count: 34, passed: true },
    { label: "Lighthouse", count: 4, passed: true },
  ];
  return (
    <div className="proc-tests">
      <header className="proc-tests__head">
        <div>
          <span className="proc-tests__rate">98.2%</span>
          <span className="proc-tests__rate-sub">passed · build #248</span>
        </div>
        <span className="proc-tests__bug">
          <span className="proc-tests__bug-pulse" />
          0 critical · 2 minor
        </span>
      </header>
      <ul className="proc-tests__rows">
        {rows.map((r) => (
          <li key={r.label} className="proc-tests__row">
            <span className="proc-tests__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5 9-11" />
              </svg>
            </span>
            <span className="proc-tests__label">{r.label}</span>
            <span className="proc-tests__count">{r.count}</span>
            <span className="proc-tests__status">passed</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DeploymentMockup() {
  return (
    <div className="proc-deploy">
      <header className="proc-deploy__head">
        <span className="proc-deploy__pill">
          <span className="proc-deploy__live" /> LIVE
        </span>
        <span className="proc-deploy__title">crm.revlient.com</span>
      </header>
      <div className="proc-deploy__tiles">
        <div>
          <span className="proc-deploy__label">Uptime</span>
          <span className="proc-deploy__value">99.9%</span>
        </div>
        <div>
          <span className="proc-deploy__label">Avg response</span>
          <span className="proc-deploy__value">142<em>ms</em></span>
        </div>
        <div>
          <span className="proc-deploy__label">Active users</span>
          <span className="proc-deploy__value">1.2<em>k</em></span>
        </div>
      </div>
      <svg className="proc-deploy__chart" viewBox="0 0 320 80" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="proc-deploy-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 56 L40 50 L80 54 L120 38 L160 44 L200 32 L240 36 L280 24 L320 28 L320 80 L0 80 Z"
          fill="url(#proc-deploy-fill)"
        />
        <path
          d="M0 56 L40 50 L80 54 L120 38 L160 44 L200 32 L240 36 L280 24 L320 28"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.6"
        />
      </svg>
      <div className="proc-deploy__log">
        <span className="proc-deploy__log-dot" />
        <span>Deployed to production · 2 min ago</span>
        <span className="proc-deploy__log-sha">a4f29c</span>
      </div>
    </div>
  );
}
