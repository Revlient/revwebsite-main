"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { BRAND, NAV_LINKS, CTA_HREF, CTA_LABEL } from "../lib/site";

/* Global navbar — cinematic liquid-glass style.
   Left: 48px glass circle with brand mark.
   Center (desktop): glass pill with links + white "Start a project"
   pill on the right. Mobile: hamburger toggle.
   Behavior: auto-hide on scroll-down, reappear on scroll-up. */
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
      const delta = y - lastY;
      if (y < 80) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
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

  const isHidden = hidden && !open;

  return (
    <header
      className={`nav ${scrolled ? "is-scrolled" : ""} ${isHidden ? "is-hidden" : ""} ${className}`.trim()}
    >
      <div className="nav__row">
        <a href="/" className="nav__logo liquid-glass" aria-label={`${BRAND.name} home`}>
          <Logo className="nav__logo-mark" />
        </a>

        <nav className="nav__center liquid-glass" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__link">
              {link.label}
            </a>
          ))}
          <a href={CTA_HREF} className="nav__cta">
            {CTA_LABEL}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
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
        <a href={CTA_HREF} className="btn btn--primary" onClick={() => setOpen(false)}>
          {CTA_LABEL}
        </a>
      </div>
    </header>
  );
}
