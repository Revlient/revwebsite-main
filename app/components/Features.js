"use client";

import { CTA_HREF, BRAND, CONTACT_EMAIL, PHONE_DISPLAY } from "../lib/site";

/* Multi-card "Features" section — adapted from a React + TS + Tailwind
   + lucide-react portfolio design into vanilla JS + plain CSS. The
   liquid-glass / marquee / noise styles live in globals.css under
   the .feat-* prefix. Icons are inline SVGs, no icon library.

   PROOF RULE: no invented metrics or testimonials. The CLIENT VOICE
   quote text remains an explicit placeholder (consistent with the
   project carousel approach) until the studio supplies the real,
   approved wording from Medcity International Academy. The big
   numeric card uses a verifiable studio fact (the four service
   pillars), not a fabricated "$10M raised" figure. */

const SOFTWARE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4";
const BACKGROUND_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4";
const METRIC_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4";

const TIMELINE = [
  // TODO: confirm real founding/role dates with the studio.
  { period: "2023–Now", role: "Multidisciplinary studio", org: "Revlient" },
  { period: "2020–2023", role: "Brand & product design", org: "Predecessor studio" },
  { period: "2017–2020", role: "Visual systems & craft", org: "Independent practice" },
];

// 8 generic creative / dev tool tiles, repeated for the seamless marquee.
const TOOL_KEYS_A = ["figma", "framer", "palette", "pen", "layers", "type", "aperture", "chrome"];
const TOOL_KEYS_B = ["camera", "brush", "box", "wand", "figma", "framer", "type", "layers"];

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

// Simple geometric stand-ins for the lucide-react tool icons. Each is
// drawn with strokeWidth 1.5 to match the rest of the section.
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
          <circle cx="7" cy="10" r="1" />
          <circle cx="9" cy="6" r="1" />
          <circle cx="14" cy="6" r="1" />
          <circle cx="17" cy="10" r="1" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="M12 3 L18 9 L13 14 L7 14 L7 8 Z" />
          <path d="M7 14 L4 20 L10 17" />
          <circle cx="10" cy="17" r="1.4" />
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
          <path d="M8 13 L4 17 L7 20" />
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
  // duplicate the row for a seamless loop
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

export default function Features() {
  return (
    <section className="feat-section" id="features" aria-label="Studio features">
      <div className="feat-shell">
        <header className="feat-header">
          <div className="feat-header__copy">
            <h2 className="feat-header__title">Hi, we&apos;re {BRAND.name}.</h2>
            <p className="feat-header__sub">
              A multidisciplinary studio crafting 3D-grade websites,
              software and applications. With a senior team behind every
              project, we help ambitious ideas move with focus and
              intention.
            </p>
          </div>
          <a href={CTA_HREF} className="feat-cta liquid-glass">
            Let&apos;s Team Up Today
          </a>
        </header>

        <div className="feat-grid">
          {/* Column 1 — BACKGROUND */}
          <article className="feat-card feat-card--video feat-card--bg">
            <video
              className="feat-card__video"
              src={BACKGROUND_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div className="feat-card__inner">
              <SectionLabel>BACKGROUND</SectionLabel>
              <div className="feat-timeline">
                {TIMELINE.map((row) => (
                  <div className="feat-timeline__row" key={row.period}>
                    <span className="feat-timeline__period">{row.period}</span>
                    <Sparkle className="feat-timeline__sep" />
                    <span className="feat-timeline__role">{row.role}</span>
                    <span className="feat-timeline__org">{row.org}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Column 2 */}
          <div className="feat-col">
            <article className="feat-card feat-card--voice noise-overlay">
              <div className="feat-card__inner">
                <SectionLabel align="start">CLIENT VOICE</SectionLabel>
                {/* TODO: replace with the real, approved quote from
                    Medcity International Academy. */}
                <blockquote className="feat-voice__quote">
                  Placeholder testimonial — replace with the real,
                  approved quote before launch.
                </blockquote>
                <figcaption className="feat-voice__meta">
                  <strong>Anil Chakkrapani</strong>, Founder — Medcity
                  International Academy
                </figcaption>
              </div>
            </article>

            <article className="feat-card feat-card--video feat-card--metric">
              <video
                className="feat-card__video"
                src={METRIC_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="feat-card__inner feat-card__inner--center">
                <span className="feat-metric__big">4</span>
                <span className="feat-metric__cap">
                  Service pillars connected by one core
                </span>
              </div>
            </article>
          </div>

          {/* Column 3 */}
          <div className="feat-col">
            <article className="feat-card feat-card--video feat-card--software">
              <video
                className="feat-card__video"
                src={SOFTWARE_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="feat-card__inner">
                <SectionLabel>DAILY SOFTWARE</SectionLabel>
                <div className="feat-marquees">
                  <Marquee keys={TOOL_KEYS_A} direction="left" />
                  <Marquee keys={TOOL_KEYS_B} direction="right" />
                </div>
              </div>
            </article>

            <article className="feat-card feat-card--reach noise-overlay">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="feat-reach__cta liquid-glass"
                aria-label={`Email ${CONTACT_EMAIL}`}
              >
                <ArrowUpRight className="feat-reach__cta-icon" />
              </a>
              <div className="feat-card__inner">
                <SectionLabel align="start">REACH ME</SectionLabel>
                <div className="feat-reach__lines">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="feat-reach__line">
                    {CONTACT_EMAIL}
                  </a>
                  {/* TODO: real phone number before launch */}
                  <span className="feat-reach__line">{PHONE_DISPLAY}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
