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

const SPEED_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4";
const INTEG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4";

// Integration tile glyph keys reused with the same ToolIcon set as
// Features.js — picked to read as ERP-relevant: docs / mail / data /
// charts etc.
const ROW_A = ["type", "layers", "chrome", "aperture", "palette", "pen", "figma", "framer"];
const ROW_B = ["camera", "brush", "box", "wand", "type", "layers", "figma", "framer"];

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
            <h2 className="feat-header__title">Built around how teams really work.</h2>
            <p className="feat-header__sub">
              AI-integrated features that take the routine work off
              counsellors&apos; desks and put the strategic work back
              in front of them — across applications, documents,
              universities and student communication.
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
                  file at public/work/revlient-os-dashboard.png and
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
                          stroke="#a855f7"
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
                {/* TODO: replace with the real, approved quote from
                    Study2India. */}
                <blockquote className="feat-voice__quote">
                  Placeholder testimonial — replace with the real,
                  approved quote from the operations lead before
                  launch.
                </blockquote>
                <figcaption className="feat-voice__meta">
                  <strong>Operations Lead</strong>, Study2India
                </figcaption>
              </div>
            </article>

            <article className="feat-card feat-card--video feat-card--metric">
              <video
                className="feat-card__video"
                src={SPEED_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="feat-card__inner feat-card__inner--center">
                <span className="feat-metric__big">10×</span>
                <span className="feat-metric__cap">
                  Faster operations with AI assistance
                </span>
              </div>
            </article>
          </div>

          {/* Column 3 */}
          <div className="feat-col">
            <article className="feat-card feat-card--video feat-card--software">
              <video
                className="feat-card__video"
                src={INTEG_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="feat-card__inner">
                <SectionLabel>INTEGRATIONS</SectionLabel>
                <div className="feat-marquees">
                  <Marquee keys={ROW_A} direction="left" />
                  <Marquee keys={ROW_B} direction="right" />
                </div>
              </div>
            </article>

            <article className="feat-card feat-card--reach noise-overlay">
              <a
                href={CTA_HREF}
                className="feat-reach__cta liquid-glass"
                aria-label="See the counsellor workspace"
              >
                <ArrowUpRight className="feat-reach__cta-icon" />
              </a>
              <div className="feat-card__inner">
                <SectionLabel align="start">COUNSELLOR WORKSPACE</SectionLabel>
                <div className="feat-reach__lines">
                  <span className="feat-reach__line">Pipeline that stays current</span>
                  <span className="feat-reach__line">Documents reviewed in-app</span>
                  <span className="feat-reach__line">AI drafts the next step</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
