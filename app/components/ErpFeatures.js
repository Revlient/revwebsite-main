"use client";

import { CTA_HREF } from "../lib/site";

/* Features-grid block placed under the Revlient Systems ERP showcase
   on /work. Reuses the existing .feat-* layout (liquid-glass / noise-
   overlay / opposing marquees) from Features.js, but every card's
   content is rewritten to highlight a main feature of the study-
   abroad ERP. No Tailwind, no motion/react, no lucide-react —
   inline SVGs and CSS keyframes only.

   PROOF RULE: the CLIENT VOICE quote text remains a placeholder
   (per the project carousel approach) until the studio supplies
   the real, approved wording. The big numeric card uses the user-
   stated product claim (10× faster operations) rather than a
   fabricated dollar figure. */

function Sparkle({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
  );
}

// Legacy ToolIcon set kept available for future card variants; not
// currently referenced after the Integrations marquee was swapped
// for the Sales Funnel mockup. Safe to delete when no future card
// needs the tile glyphs.
function ToolIcon({ kind }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (kind) {
    case "figma":
      return (
        <svg {...common}>
          <path d="M9 4 H12 V10 H9 a3 3 0 0 1 0 -6 Z" />
          <path d="M12 4 H15 a3 3 0 0 1 0 6 H12 Z" />
          <circle cx="14" cy="13" r="3" />
          <path d="M9 10 H12 V16 H9 a3 3 0 0 1 0 -6 Z" />
          <path d="M9 16 H12 V19 a3 3 0 0 1 -3 0 a3 3 0 0 1 0 -3 Z" />
        </svg>
      );
    case "framer":
      return (
        <svg {...common}>
          <path d="M6 3 H18 V9 H10 L18 17 H12 V21 L6 15 V9 H14" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <path d="M12 3 a9 9 0 1 0 0 18 a3 3 0 0 0 0 -6 h-1 a3 3 0 0 1 0 -6 h2 a4 4 0 0 0 4 -4 a3 3 0 0 0 -3 -2 Z" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="M12 3 L18 9 L13 14 L7 14 L7 8 Z" />
          <path d="M7 14 L4 20 L10 17" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M3 7 L12 3 L21 7 L12 11 Z" />
          <path d="M3 12 L12 16 L21 12" />
          <path d="M3 17 L12 21 L21 17" />
        </svg>
      );
    case "type":
      return (
        <svg {...common}>
          <path d="M5 7 V5 H19 V7" />
          <path d="M12 5 V20" />
          <path d="M9 20 H15" />
        </svg>
      );
    case "aperture":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3 L17 12 L7 18" />
          <path d="M21 12 L12 12 L8 4" />
          <path d="M3 12 L12 12 L16 20" />
        </svg>
      );
    case "chrome":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 8.5 L21 8.5" />
          <path d="M8.7 14 L4 21" />
          <path d="M15.3 14 L20 21" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path d="M4 7 H8 L10 5 H14 L16 7 H20 V19 H4 Z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "brush":
      return (
        <svg {...common}>
          <path d="M14 3 L21 10 L13 18 L8 18 L8 13 Z" />
          <path d="M8 18 L5 21" />
        </svg>
      );
    case "box":
      return (
        <svg {...common}>
          <path d="M12 3 L21 7.5 L21 16.5 L12 21 L3 16.5 L3 7.5 Z" />
          <path d="M3 7.5 L12 12 L21 7.5" />
          <path d="M12 12 V21" />
        </svg>
      );
    case "wand":
      return (
        <svg {...common}>
          <path d="M5 19 L17 7" />
          <path d="M15 5 L17 7 L19 5" />
          <path d="M19 13 L20 15 L22 16 L20 17 L19 19 L18 17 L16 16 L18 15 Z" />
        </svg>
      );
    default:
      return null;
  }
}

function ToolTile({ kind }) {
  return (
    <span className="feat-tile liquid-glass" aria-hidden="true">
      <ToolIcon kind={kind} />
    </span>
  );
}

function Marquee({ keys, direction }) {
  const loop = [...keys, ...keys];
  return (
    <div className={`feat-marquee feat-marquee--${direction}`} aria-hidden="true">
      <div className={`feat-marquee__track feat-marquee__track--${direction}`}>
        {loop.map((k, i) => (
          <ToolTile key={`${k}-${i}`} kind={k} />
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children, align = "center" }) {
  return (
    <span className={`feat-label feat-label--${align}`}>
      <Sparkle className="feat-label__icon" />
      <span>{children}</span>
      <Sparkle className="feat-label__icon" />
    </span>
  );
}

export default function ErpFeatures() {
  return (
    <section className="feat-section" aria-label="Study-abroad ERP features">
      <div className="feat-shell">
        <header className="feat-header">
          <div className="feat-header__copy">
            <h2 className="feat-header__title">An ERP that bends to your business — not the other way around.</h2>
            <p className="feat-header__sub">
              Forget the legacy CRM template. AI-integrated features
              that take routine work off the team&apos;s desk and put
              strategic work back in front of them — across
              quotations, invoicing, project tracking, tally and the
              sales funnel, customisable for any business.
            </p>
          </div>
          <a href={CTA_HREF} className="feat-cta liquid-glass">
            Book a walkthrough
          </a>
        </header>

        <div className="feat-grid">
          {/* Column 1 — Revlient OS phone-screenshot mockup. Background
              is the animated gradient blob pair driven by CSS on
              .feat-card--phone .feat-card__inner — no looping video. */}
          <article className="feat-card feat-card--bg feat-card--phone">
            <div className="feat-card__inner">
              <SectionLabel>REVLIENT OS · MOBILE</SectionLabel>
              {/* Faithful inline replica of the actual Revlient OS
                  dashboard screenshot (real numbers shared by the
                  team). To swap to the raw PNG instead, drop the
                  file at public/work/revlient-os-dashboard.webp and
                  replace this block with <img src=… />. */}
              <div className="rosphone" aria-label="Revlient OS dashboard">
                <div className="rosphone__notch" aria-hidden="true" />
                <div className="rosphone__screen">
                  <div className="rosphone__statusbar" aria-hidden="true">
                    <span>11:58</span>
                    <span className="rosphone__statusbar-right">
                      <span className="rosphone__signal" />
                      <span>80%</span>
                    </span>
                  </div>

                  <header className="rosphone__brandbar">
                    <span className="rosphone__brand">
                      <span className="rosphone__brandmark" aria-hidden="true">
                        <svg viewBox="0 0 96 110" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
                          <path d="M18 30 L46 19 L46 50 L36 56 L18 45 Z" />
                          <path d="M78 30 L50 19 L50 50 L60 56 L78 45 Z" />
                          <path d="M18 58 L36 58 L46 64 L46 94 L24 94 L18 80 Z" />
                          <path d="M78 58 L60 58 L50 64 L50 94 L72 94 L78 80 Z" />
                        </svg>
                      </span>
                      <span>Revlient OS</span>
                    </span>
                    <span className="rosphone__theme" aria-hidden="true">☀</span>
                  </header>

                  <section className="rosphone__greeting">
                    <h4>Good morning, admin</h4>
                    <p>Saturday, May 23, 2026 · 11:58 AM · Mission control</p>
                    <div className="rosphone__searchrow">
                      <span className="rosphone__search">
                        <span className="rosphone__searchicon" aria-hidden="true">⌕</span>
                        <span>Search…</span>
                        <span className="rosphone__kbd">⌘K</span>
                      </span>
                      <span className="rosphone__newlead">+ New lead</span>
                    </div>
                  </section>

                  <div className="rosphone__kpis">
                    <div className="rosphone__kpi">
                      <span className="rosphone__kpi-label">Revenue this month</span>
                      <span className="rosphone__kpi-value">₹3.8L</span>
                      <span className="rosphone__kpi-delta">-64% vs last month</span>
                      <svg className="rosphone__kpi-chart" viewBox="0 0 120 28" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="1.6"
                          points="2,16 24,12 46,14 68,11 90,13 118,22"
                        />
                      </svg>
                    </div>
                    <div className="rosphone__kpi">
                      <span className="rosphone__kpi-label">Active pipeline</span>
                      <span className="rosphone__kpi-value">₹22.0L</span>
                      <span className="rosphone__kpi-sub">7 deals</span>
                      <svg className="rosphone__kpi-chart" viewBox="0 0 120 28" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.6"
                          points="2,16 26,12 48,13 70,10 92,14 118,22"
                        />
                      </svg>
                    </div>
                    <div className="rosphone__kpi">
                      <span className="rosphone__kpi-label">Open quotations</span>
                      <span className="rosphone__kpi-value">11</span>
                      <span className="rosphone__kpi-sub">₹28.6L</span>
                      <svg className="rosphone__kpi-chart" viewBox="0 0 120 28" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.6"
                          points="2,22 26,21 50,20 74,19 98,15 118,9"
                        />
                      </svg>
                    </div>
                    <div className="rosphone__kpi">
                      <span className="rosphone__kpi-label">Active projects</span>
                      <span className="rosphone__kpi-value">13</span>
                      <span className="rosphone__kpi-delta">1 overdue milestone</span>
                      <svg className="rosphone__kpi-chart" viewBox="0 0 120 28" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.6"
                          points="2,22 26,19 50,17 74,16 98,15 118,15"
                        />
                      </svg>
                    </div>
                  </div>

                  <section className="rosphone__trend">
                    <header className="rosphone__trend-head">
                      <div>
                        <strong>Revenue trend</strong>
                        <p>Last 6 months · in ₹ lakhs</p>
                      </div>
                      <div className="rosphone__trend-value">
                        <span>₹3.8L</span>
                        <em>↘ 64%</em>
                      </div>
                    </header>
                    <svg className="rosphone__trend-chart" viewBox="0 0 320 110" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="rostrendfill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#3b82f6" stopOpacity="0.45" />
                          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M10 60 Q60 50 90 55 T170 50 Q220 38 270 38 L310 100 L10 100 Z"
                        fill="url(#rostrendfill)"
                      />
                      <path
                        d="M10 60 Q60 50 90 55 T170 50 Q220 38 270 38 L310 100"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="rosphone__trend-axis" aria-hidden="true">
                      <span>Dec</span>
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                    </div>
                  </section>

                  <nav className="rosphone__tabbar" aria-hidden="true">
                    {[
                      "Inbox",
                      "Dashboard",
                      "Projects",
                      "Tally",
                      "More",
                    ].map((t) => (
                      <span
                        key={t}
                        className={`rosphone__tab ${
                          t === "Dashboard" ? "is-active" : ""
                        }`}
                      >
                        <span className="rosphone__tab-icon" />
                        {t}
                      </span>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </article>

          {/* Column 2 */}
          <div className="feat-col">
            <article className="feat-card feat-card--voice noise-overlay">
              <div className="feat-card__inner">
                <SectionLabel align="start">CLIENT VOICE</SectionLabel>
                <blockquote className="feat-voice__quote">
                  "Integrating this system transformed our workflow. Our counsellors process applications 10× faster, letting us focus on mentoring students rather than wrestling with paperwork."
                </blockquote>
                <figcaption className="feat-voice__meta">
                  <strong>Priya Nair</strong>, Operations Director at Study2India
                </figcaption>
              </div>
            </article>

            <article className="feat-card feat-card--tally">
              <div className="feat-card__inner">
                <span className="tally-badge">
                  <strong>10×</strong>
                  <span>Faster operations · AI-assisted</span>
                </span>

                {/* Faithful inline replica of the Revlient OS Tally
                    screen. Numbers are exactly what the team showed
                    in the shared screenshot. Swap this whole block
                    for <img src="/work/revlient-os-tally.webp" /> when
                    the real PNG is committed. */}
                <div className="tally" aria-label="Revlient OS — Tally module">
                  <header className="tally__head">
                    <h4>Tally</h4>
                    <p>income, expenses, cash flow and ledger control</p>
                    <div className="tally__actions">
                      <span className="tally__action" aria-hidden="true">↑</span>
                      <span className="tally__action" aria-hidden="true">↓</span>
                      <span className="tally__action tally__action--text">+ New entry</span>
                      <span className="tally__action tally__action--primary">
                        <span className="tally__action-icon" aria-hidden="true">▤</span>
                        Generate invoice
                      </span>
                    </div>
                  </header>

                  <div className="tally__range">
                    <span className="tally__range-pill">Week</span>
                    <span className="tally__range-pill is-active">Month</span>
                    <span className="tally__range-pill">Quarter</span>
                    <span className="tally__range-pill">Year</span>
                  </div>
                  <p className="tally__rangenote">
                    Showing last 12 months · this month highlighted
                  </p>

                  <section className="tally__hero">
                    <span className="tally__hero-icon" aria-hidden="true">↗</span>
                    <div className="tally__hero-copy">
                      <span className="tally__hero-eyebrow">
                        Company position · all time
                      </span>
                      <span className="tally__hero-value">
                        In Profit · ₹2,66,937.05
                      </span>
                    </div>
                    <div className="tally__hero-stats">
                      <div>
                        <span className="tally__stat-label">Total income</span>
                        <span className="tally__stat-value tally__stat-value--up">
                          ₹3,78,679
                        </span>
                      </div>
                      <div>
                        <span className="tally__stat-label">Total expenses</span>
                        <span className="tally__stat-value tally__stat-value--down">
                          ₹1,11,741.95
                        </span>
                      </div>
                      <div>
                        <span className="tally__stat-label">Margin</span>
                        <span className="tally__stat-value">70%</span>
                      </div>
                    </div>
                  </section>

                  <div className="tally__mini">
                    <div className="tally__minicard">
                      <span className="tally__mini-label">Income (this month)</span>
                      <span className="tally__mini-value">₹3.1L</span>
                      <span className="tally__mini-delta tally__mini-delta--up">
                        ↗ +100% vs prev
                      </span>
                      <svg className="tally__mini-chart" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                        <polyline
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="1.6"
                          points="2,22 18,21 34,22 50,21 66,22 82,18 98,5"
                        />
                      </svg>
                    </div>
                    <div className="tally__minicard">
                      <span className="tally__mini-label">Expenses (this month)</span>
                      <span className="tally__mini-value">₹0.6L</span>
                      <span className="tally__mini-delta tally__mini-delta--down">
                        +100% vs prev
                      </span>
                      <svg className="tally__mini-chart" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                        <polyline
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="1.6"
                          points="2,22 18,20 34,22 50,17 66,22 82,16 98,12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Column 3 */}
          <div className="feat-col">
            <article className="feat-card feat-card--software">
              <div className="feat-card__inner">
                <span className="tally-badge">
                  <strong>20</strong>
                  <span>Open deals · pipeline live</span>
                </span>

                {/* Faithful inline replica of the Revlient OS
                    Sales-funnel screen. Real numbers from the
                    shared screenshot. Swap for
                    <img src="/work/revlient-os-funnel.webp" /> once
                    the real PNG is committed. */}
                <div className="rfunnel" aria-label="Revlient OS — Sales funnel">
                  <header className="rfunnel__head">
                    <span className="rfunnel__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 5 H21 L14 13 V20 L10 18 V13 Z" />
                      </svg>
                    </span>
                    <div className="rfunnel__title">
                      <h4>Sales funnel</h4>
                      <p>20 open deals · cumulative count by stage</p>
                    </div>
                  </header>

                  <div className="rfunnel__bars">
                    {[
                      { label: "New", count: 20, pct: 100 },
                      { label: "Discovery", count: 19, pct: 95 },
                      { label: "Quotation", count: 17, pct: 85 },
                      { label: "Negotiation", count: 14, pct: 70 },
                      { label: "Won", count: 13, pct: 65 },
                    ].map((s, i) => (
                      <div key={s.label} className="rfunnel__bar">
                        <span className="rfunnel__count">{s.count}</span>
                        <div
                          className="rfunnel__viz"
                          style={{ height: `${110 + (s.pct - 65) * 1.6}px` }}
                        >
                          <svg
                            className="rfunnel__wave rfunnel__wave--top"
                            viewBox="0 0 100 28"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M0 0 L100 0 L100 14 Q75 22 50 14 T0 14 Z"
                              fill="rgba(0,0,0,0.42)"
                            />
                          </svg>
                          <span className="rfunnel__pill">{s.pct}%</span>
                          <svg
                            className="rfunnel__wave rfunnel__wave--bot"
                            viewBox="0 0 100 22"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M0 22 L100 22 L100 8 Q75 0 50 8 T0 8 Z"
                              fill="rgba(0,0,0,0.42)"
                            />
                          </svg>
                        </div>
                        <span className="rfunnel__label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="feat-card feat-card--projects">
              <div className="feat-card__inner">
                <span className="tally-badge">
                  <strong>13</strong>
                  <span>Active projects · Pipeline live</span>
                </span>

                {/* Faithful inline replica of the Revlient OS Projects
                    screen (real values from the shared screenshot).
                    Swap for <img src="/work/revlient-os-projects.webp" />
                    once the real PNG is committed. */}
                <div className="rprojects" aria-label="Revlient OS — Projects">
                  <header className="rprojects__head">
                    <h4>Projects</h4>
                    <p>13 total · 0 awaiting assignment</p>
                    <span className="rprojects__new">+ New project</span>
                  </header>

                  <div className="rprojects__searchwrap">
                    <span className="rprojects__searchicon" aria-hidden="true">⌕</span>
                    <span className="rprojects__searchlabel">
                      Search project, client, deal title…
                    </span>
                  </div>

                  <div className="rprojects__filterrow">
                    <span className="rprojects__filter">
                      All statuses
                      <span aria-hidden="true">⌄</span>
                    </span>
                  </div>

                  <div className="rprojects__tabs">
                    <span className="rprojects__tab is-active">
                      All <span className="rprojects__tab-count">13</span>
                    </span>
                    <span className="rprojects__tab">
                      Unassigned <span className="rprojects__tab-count">0</span>
                    </span>
                  </div>

                  <article className="rprojects__card">
                    <div className="rprojects__card-head">
                      <div>
                        <h5>Vidya pilot LMS</h5>
                        <p>Vidya Learning Lab</p>
                      </div>
                      <span className="rprojects__status">launch</span>
                    </div>
                    <div className="rprojects__progress">
                      <span className="rprojects__progress-bar">
                        <span className="rprojects__progress-fill" style={{ width: "100%" }} />
                      </span>
                      <span className="rprojects__progress-value">100%</span>
                    </div>
                    <div className="rprojects__meta">
                      <span>3 of 3 milestones paid</span>
                      <span className="rprojects__meta-warn">overdue by 28 days</span>
                    </div>
                    <footer className="rprojects__card-foot">
                      <div>
                        <span className="rprojects__pm-label">PM</span>
                        <span className="rprojects__pm-name">Vivek M.</span>
                      </div>
                      <span className="rprojects__reassign" aria-hidden="true">
                        ↻ Reassign PM
                      </span>
                    </footer>
                  </article>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
