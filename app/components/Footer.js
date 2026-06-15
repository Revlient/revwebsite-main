"use client";

import { useEffect, useRef } from "react";
import {
  BRAND,
  CTA_HREF,
  CONTACT_EMAIL,
  SYSTEMS_URL,
  WHATSAPP_URL,
} from "../lib/site";
import Logo from "./Logo";
import CalEmbed from "./CalEmbed";

// Inspired by the Kresna footer composition (video card + light card +
// floating lucky badge + giant watermark) — rebuilt in vanilla JS +
// plain CSS and adapted to Revlient's brand and copy.

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4";

// TODO: real social destinations before launch.
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/revlient/",
    path: "M12 2.2c3.2 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.212 8.8 2.2 12 2.2zm0 1.8c-3.155 0-3.51.012-4.75.069-.97.044-1.503.207-1.857.344-.466.181-.8.398-1.15.748-.35.35-.567.684-.748 1.15-.137.354-.3.887-.344 1.857C3.094 8.49 3.082 8.845 3.082 12s.012 3.51.069 4.75c.044.97.207 1.503.344 1.857.181.466.398.8.748 1.15.35.35.684.567 1.15.748.354.137.887.3 1.857.344 1.24.057 1.595.069 4.75.069s3.51-.012 4.75-.069c.97-.044 1.503-.207 1.857-.344.466-.181.8-.398 1.15-.748.35-.35.567-.684.748-1.15.137-.354.3-.887.344-1.857.057-1.24.069-1.595.069-4.75s-.012-3.51-.069-4.75c-.044-.97-.207-1.503-.344-1.857-.181-.466-.398-.8-.748-1.15-.35-.35-.684-.567-1.15-.748-.354-.137-.887-.3-1.857-.344-1.24-.057-1.595-.069-4.75-.069zM12 6.865A5.135 5.135 0 1 1 12 17.135 5.135 5.135 0 0 1 12 6.865zm0 1.8a3.335 3.335 0 1 0 0 6.67 3.335 3.335 0 0 0 0-6.67zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devjithanoop/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    path: "M1.5 5.25A2.25 2.25 0 0 1 3.75 3h16.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 20.25 21H3.75a2.25 2.25 0 0 1-2.25-2.25V5.25zm2.4-.45 7.55 6.343a.85.85 0 0 0 1.1 0L20.1 4.8H3.9zm17.1 1.572-7.04 5.912a2.65 2.65 0 0 1-3.42 0L3.5 6.372V18.75c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25V6.372z",
  },
];

const NAV_COL = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "/studio" },
  { label: "Free consultation", href: CTA_HREF },
];

const COMPANY_COL = [
  { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Revlient Systems", href: SYSTEMS_URL, external: true },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

export default function Footer() {
  const svgRef = useRef(null);
  const textRef = useRef(null);

  // Measures the rendered watermark text's bounding box and snaps the
  // SVG viewBox to it so the visible glyph edges sit flush against the
  // container — re-fires after web fonts settle and on resize.
  useEffect(() => {
    function fitWatermark() {
      const svg = svgRef.current;
      const text = textRef.current;
      if (!svg || !text) return;
      try {
        const bbox = text.getBBox();
        svg.setAttribute(
          "viewBox",
          `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
        );
      } catch (e) {
        /* getBBox throws if the element isn't laid out yet — ignore */
      }
    }

    fitWatermark();
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) fitWatermark();
      });
    }
    window.addEventListener("resize", fitWatermark);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", fitWatermark);
    };
  }, []);

  return (
    <section className="footer-section">
      <CalEmbed />
      <div className="footer-wrapper">
        <div className="footer-left">
          <video
            className="footer-left-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          <div className="footer-logo">
            <span className="footer-logo-mark" aria-hidden="true">
              <Logo className="footer-logo-mark-svg" />
            </span>
            <span className="footer-logo-name">{BRAND.name}</span>
          </div>

          <div className="footer-tagline-container">
            <p className="footer-tagline">
              We craft digital legacies,
              <br />
              <span>engineered to feel as good as they look.</span>
            </p>
          </div>

          <div className="footer-social-row">
            <span className="footer-social-label">Stay in touch!</span>
            <div className="footer-social-icons">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-icon"
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-lucky-graphic" aria-hidden="true">
            <div className="lucky-cube">
              <Logo className="lucky-cube-mark" />
            </div>
            <div className="lucky-text-row">
              <svg className="lucky-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 20 C 6 14, 10 9, 18 5" />
                <path d="M18 5 L 12 5" />
                <path d="M18 5 L 18 11" />
              </svg>
              <span className="lucky-text">Feeling lucky?</span>
            </div>
          </div>

          <div className="footer-right-top">
            <div className="footer-nav-cols">
              <div className="footer-col">
                <h4 className="footer-col-title">Navigation</h4>
                {NAV_COL.map((l) => {
                  const isCta = l.label === "Free consultation";
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      className={isCta ? "cta-with-tooltip cta-with-tooltip--above" : ""}
                      data-tooltip={isCta ? "get a reservation in under 3 clicks" : undefined}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </div>
              <div className="footer-col">
                <h4 className="footer-col-title">Company</h4>
                {COMPANY_COL.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copyright">
              © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
            </span>
            <div className="footer-cta-mini">
              <h4>
                Ideas move fast.<br />
                <strong>Ship them with Revlient.</strong>
              </h4>
              <form
                className="footer-subscribe-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input type="email" placeholder="Enter email address" aria-label="Email address" />
                <button type="button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-watermark" aria-hidden="true">
        <svg
          ref={svgRef}
          viewBox="62 95 876 175"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            ref={textRef}
            x="500"
            y="240"
            textAnchor="middle"
            fontSize="320"
          >
            {BRAND.name}
          </text>
        </svg>
      </div>
    </section>
  );
}
