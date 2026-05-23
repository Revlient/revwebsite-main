// Hero-section-1 (tailark) block placed under the WorkHero on /work.
// Adapted from a shadcn/framer-motion/lucide-react brief to vanilla
// JS + plain CSS — Tailwind utilities are rebuilt as scoped .wfs-*
// rules, AnimatedGroup stagger replaced with CSS keyframes with
// transition-delay, lucide-react replaced with inline SVG. The
// navbar from the source is intentionally dropped (the page already
// has the WorkHero's in-card nav).
//
// PROOF RULE: the brief shipped real customer wordmarks (NVIDIA,
// GitHub, OpenAI, etc.) which we don't have permission to use, so
// the customers row is replaced with abstract grey logo bars. The
// app-screen "screenshot" is a stylised inline mockup rather than
// an external image so nothing rots when the source URL changes.

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

        <h2 className="wfs__heading">An IT firm management ERP, end-to-end.</h2>
        <p className="wfs__sub">
          Projects, clients, quotations, invoicing, timesheets and
          finance — built around how a working IT studio actually
          runs, and accelerated by AI features that take the routine
          work off the team&apos;s desk.
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
        Showcase · IT firm management ERP · AI-integrated
      </div>

      {/* stylised app-screen mockup — modelled on Revlient Systems
          ERP UI. Labels are real (Dashboard, Orders, Inventory …);
          KPI values stay as em-dash placeholders so we don't ship a
          fabricated $-figure on a thumbnail. */}
      <div className="wfs__screenwrap wfs__screenwrap--full">
        <span className="wfs__screen-fade" aria-hidden="true" />
        <div className="wfs__screen">
          <div className="wfs__screen-bar">
            <span className="wfs__screen-dot" />
            <span className="wfs__screen-dot" />
            <span className="wfs__screen-dot" />
            <span className="wfs__screen-url">systems.revlient.com</span>
          </div>
          <div className="wfs__screen-body">
            <aside className="wfs__screen-side">
              <div className="wfs__screen-brand">
                <span className="wfs__screen-brand-mark" />
                <span>Revlient Systems</span>
              </div>
              <nav className="wfs__screen-nav">
                {[
                  { label: "Dashboard", active: true },
                  { label: "Projects" },
                  { label: "Clients" },
                  { label: "Quotations" },
                  { label: "Invoices" },
                  { label: "Tally" },
                  { label: "Timesheets" },
                  { label: "AI Assistant", ai: true },
                ].map((item) => (
                  <span
                    key={item.label}
                    className={`wfs__screen-navitem ${
                      item.active ? "is-active" : ""
                    } ${item.ai ? "wfs__screen-navitem--ai" : ""}`.trim()}
                  >
                    <span className="wfs__screen-navdot" aria-hidden="true" />
                    {item.label}
                  </span>
                ))}
              </nav>
            </aside>

            <main className="wfs__screen-main">
              <header className="wfs__screen-header">
                <span className="wfs__screen-title">Mission control</span>
                <div className="wfs__screen-toolbar">
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--ghost">
                    Filter
                  </button>
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--ghost">
                    Export
                  </button>
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--ai">
                    <span className="wfs__screen-btn-spark" aria-hidden="true" />
                    Ask AI
                  </button>
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--primary">
                    + New quotation
                  </button>
                </div>
              </header>

              <div className="wfs__screen-kpis">
                {[
                  { label: "Active projects", accent: "accent" },
                  { label: "Open quotations" },
                  { label: "Pending invoices" },
                  { label: "AI suggestions ready", accent: "alt" },
                ].map((k) => (
                  <div
                    key={k.label}
                    className={`wfs__screen-kpi ${
                      k.accent ? `wfs__screen-kpi--${k.accent}` : ""
                    }`}
                  >
                    <span className="wfs__screen-kpi-label">{k.label}</span>
                    <span className="wfs__screen-kpi-value">—</span>
                  </div>
                ))}
              </div>

              <div className="wfs__screen-panel">
                <div className="wfs__screen-panel-head">
                  <span className="wfs__screen-panel-title">Recent quotations</span>
                  <span className="wfs__screen-panel-action">View all</span>
                </div>
                <ul className="wfs__screen-rows">
                  {["Web", "Mobile", "ERP"].map((deal) => (
                    <li key={deal} className="wfs__screen-rowline">
                      <span className="wfs__screen-rowdot" />
                      <span className="wfs__screen-rowcountry">{deal}</span>
                      <span className="wfs__screen-rowbar" />
                      <span className="wfs__screen-rowtag">AI</span>
                    </li>
                  ))}
                </ul>
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
