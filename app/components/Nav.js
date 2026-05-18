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
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="brand" aria-label={`${BRAND.name} home`}>
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
