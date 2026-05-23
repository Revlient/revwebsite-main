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
          <span>Introducing AI-assisted workflows</span>
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

        <h2 className="wfs__heading">Modern solutions, end-to-end.</h2>
        <p className="wfs__sub">
          Real problems solved by a senior, multidisciplinary team —
          shipped on a date you can plan around, in a quality bar that
          holds up under real traffic.
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
        Showcase · Revlient Systems ERP
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
                  { label: "Orders" },
                  { label: "Inventory" },
                  { label: "Customers" },
                  { label: "Suppliers" },
                  { label: "Reports" },
                  { label: "Settings" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className={`wfs__screen-navitem ${
                      item.active ? "is-active" : ""
                    }`}
                  >
                    <span className="wfs__screen-navdot" aria-hidden="true" />
                    {item.label}
                  </span>
                ))}
              </nav>
            </aside>

            <main className="wfs__screen-main">
              <header className="wfs__screen-header">
                <span className="wfs__screen-title">Dashboard</span>
                <div className="wfs__screen-toolbar">
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--ghost">
                    Filter
                  </button>
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--ghost">
                    Export
                  </button>
                  <button type="button" className="wfs__screen-btn wfs__screen-btn--primary">
                    + New order
                  </button>
                </div>
              </header>

              <div className="wfs__screen-kpis">
                {[
                  { label: "Revenue", accent: "accent" },
                  { label: "Orders today" },
                  { label: "Stock on hand" },
                  { label: "Active customers", accent: "alt" },
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
                  <span className="wfs__screen-panel-title">Recent orders</span>
                  <span className="wfs__screen-panel-action">View all</span>
                </div>
                <ul className="wfs__screen-rows">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="wfs__screen-rowline">
                      <span className="wfs__screen-rowdot" />
                      <span className="wfs__screen-rowbar" />
                      <span className="wfs__screen-rowstatus">—</span>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* customers row — abstract bars instead of fabricated wordmarks */}
      <div className="wfs__customers" aria-label="Selected partners">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <span key={i} className={`wfs__customer wfs__customer--${i}`} />
        ))}
      </div>
    </section>
  );
}
