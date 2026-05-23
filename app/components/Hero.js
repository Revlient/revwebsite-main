"use client";

import { BRAND, CTA_HREF } from "../lib/site";

/* Card-in-page hero adapted from a RIVR DeFi spec. Glass nav across
   the top, centred title + sparkle badge, frosted bottom-left fact
   card, faux-cutout bottom-right link plate over a looping video.

   Tailwind/motion/lucide-react in the source are replaced with
   plain CSS, inline SVG icons and CSS keyframes for the enter
   animations. The headline / metric / link copy is rewritten for
   Revlient — the "5.2K Active Yielders" metric in the original is
   a fabricated proof point we wouldn't ship, so the bottom-left
   card shows a verifiable studio fact instead (the four service
   pillars). */

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Process", href: "/process" },
  { label: "Studio", href: "/studio", hasDropdown: true },
];

function Sparkles({ className = "" }) {
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
      <path d="M19 4 L19.7 5.8 L21.5 6.5 L19.7 7.2 L19 9 L18.3 7.2 L16.5 6.5 L18.3 5.8 Z" />
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
  );
}

function ChevronRight({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="rhero" id="top">
      <div className="rhero__card">
        <video
          className="rhero__video"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div className="rhero__layer">
          <nav className="rhero-nav" aria-label="Primary">
            <div className="rhero-nav__spacer" />
            <ul className="rhero-nav__menu">
              {NAV.map((item) => (
                <li key={item.label} className="rhero-nav__item">
                  <a href={item.href}>
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronRight className="rhero-nav__chev" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="rhero-nav__logo-m">{BRAND.name}</div>
            <div className="rhero-nav__right">
              <a href={CTA_HREF} className="rhero-nav__cta">
                <span className="rhero-nav__cta-badge">
                  <ArrowUpRight className="rhero-nav__cta-icon" />
                </span>
                <span>Book a call</span>
              </a>
            </div>
          </nav>

          <div className="rhero-content">
            <span className="rhero-badge rhero-anim rhero-anim--rise">
              <Sparkles className="rhero-badge__icon" />
              <span>Creative studio</span>
            </span>
            <h1 className="rhero-title rhero-anim rhero-anim--scale">
              We craft digital legacies.
            </h1>
            <p className="rhero-sub rhero-anim rhero-anim--fade">
              A multidisciplinary studio building 3D-grade websites,
              software and applications — engineered to feel as good as
              they look.
            </p>
          </div>

          <div className="rhero-bl rhero-anim rhero-anim--from-left">
            <div className="rhero-bl__num">4</div>
            <div className="rhero-bl__label">Service pillars</div>
            <a href={CTA_HREF} className="rhero-bl__cta">
              <span className="rhero-bl__cta-badge">
                <ArrowUpRight className="rhero-bl__cta-icon" />
              </span>
              <span>Start a project</span>
            </a>
          </div>

          <div className="rhero-br rhero-anim rhero-anim--from-bottom">
            <span className="rhero-br__mask rhero-br__mask--top" aria-hidden="true">
              <svg viewBox="0 0 56 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0" />
              </svg>
            </span>
            <span className="rhero-br__mask rhero-br__mask--left" aria-hidden="true">
              <svg viewBox="0 0 56 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0" />
              </svg>
            </span>
            <a href="/studio" className="rhero-br__circle" aria-label="Visit the studio">
              <ArrowUpRight className="rhero-br__circle-icon" />
            </a>
            <div className="rhero-br__info">
              <div className="rhero-br__title">Documentation</div>
              <a href="/studio" className="rhero-br__link">
                <span>Studio</span>
                <ChevronRight className="rhero-br__chev" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
