"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import {
  BRAND,
  NAV_LINKS,
  CTA_HREF,
  CTA_LABEL,
} from "../lib/site";

// Persistent top nav. The "Start a project" CTA is always visible here —
// one of the four required persistent CTA placements.
export default function Nav({ className = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Hide once we're past the nav itself and the user is moving DOWN.
      // Reveal on any upward scroll, or when near the top.
      const delta = y - lastY;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu open should force the nav visible.
  const isHidden = hidden && !open;

  return (
    <header
      className={`nav ${scrolled ? "is-scrolled" : ""} ${isHidden ? "is-hidden" : ""} ${className}`.trim()}
    >
      <div className="container nav__inner">
        <a href="/" className="brand" aria-label={`${BRAND.name} home`}>
          <Logo className="brand__mark" />
          <span>{BRAND.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            href={CTA_HREF}
            className="btn btn--primary btn--sm nav__cta-desktop"
          >
            {CTA_LABEL}
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={CTA_HREF}
          className="btn btn--primary"
          onClick={() => setOpen(false)}
        >
          {CTA_LABEL}
        </a>
      </div>
    </header>
  );
}
