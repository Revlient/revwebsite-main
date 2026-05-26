"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import {
  BRAND,
  NAV_LINKS,
  CTA_HREF,
  CTA_LABEL,
  CONTACT_EMAIL,
} from "../lib/site";
import { useTransition } from "../../src/context/TransitionContext";

// Persistent top nav. The "Start a project" CTA is always visible here —
// one of the four required persistent CTA placements.
export default function Nav({ scrolledOnly = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { navigate } = useTransition();

  const handleNavClick = (e, href) => {
    // Intercept only internal route clicks (allow external/hash links and keyboard modifier clicks)
    if (href.startsWith("http") || href.startsWith("#") || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    setOpen(false); // Close mobile navigation overlay
    navigate(href);
  };

  useEffect(() => {
    const threshold = scrolledOnly ? 200 : 12;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolledOnly]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${scrolledOnly ? "nav--scrolled-only" : ""} ${open ? "is-open" : ""}`}>
      <div className="container nav__inner">
        {scrolledOnly ? (
          <>
            <div className="nav__spacer nav__spacer--desktop" aria-hidden="true" />
            <a 
              href="/" 
              className="brand brand--mobile" 
              aria-label={`${BRAND.name} home`}
              onClick={(e) => handleNavClick(e, "/")}
            >
              <Logo className="brand__mark" />
              <span>{BRAND.name}</span>
            </a>
          </>
        ) : (
          <a 
            href="/" 
            className="brand" 
            aria-label={`${BRAND.name} home`}
            onClick={(e) => handleNavClick(e, "/")}
          >
            <Logo className="brand__mark" />
            <span>{BRAND.name}</span>
          </a>
        )}

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="nav__link-item"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span>{link.label}</span>
              {link.hasDropdown && (
                <svg
                  className="rhero-nav__chev"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ width: "12px", height: "12px", marginLeft: "4px", display: "inline-block", verticalAlign: "middle" }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            href={CTA_HREF}
            className={scrolledOnly ? "rhero-nav__cta nav__cta-desktop" : "btn btn--primary btn--sm nav__cta-desktop"}
            onClick={(e) => handleNavClick(e, CTA_HREF)}
          >
            {scrolledOnly && (
              <span className="rhero-nav__cta-badge">
                <svg
                  className="rhero-nav__cta-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ width: "12px", height: "12px" }}
                >
                  <path d="M7 17 L17 7" />
                  <path d="M8 7 L17 7 L17 16" />
                </svg>
              </span>
            )}
            <span>{scrolledOnly ? "Book a call" : CTA_LABEL}</span>
          </a>

          {/* Polished mobile toggle button (hidden on desktop in CSS) */}
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="hamburger-icon">
              <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="line-top" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="line-mid" />
              <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="line-bot" />
            </svg>
          </button>
        </div>
      </div>

      {/* Polish Animated Full-Screen Overlay Menu */}
      <div className="nav__overlay" aria-hidden={!open}>
        <div className="container nav__overlay-container">
          
          {/* Main Navigation Links (appears FIRST at top on mobile) */}
          <nav className="nav__overlay-right" aria-label="Immersive">
            <ul className="nav__overlay-menu">
              {NAV_LINKS.map((link, idx) => (
                <li key={link.href} className="menu-link-wrapper">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`menu-link-item menu-link-item-${idx}`}
                  >
                    <span className="menu-link-num">0{idx + 1}</span>
                    <span className="menu-link-text">{link.label}</span>
                    <span className="menu-link-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Details & Socials (appears SECOND at bottom on mobile) */}
          <div className="nav__overlay-left">
            <div className="nav__overlay-info-group">
              <div className="nav__overlay-info-label">Studio Headquarter</div>
              <div className="nav__overlay-info-val">MUMBAI, INDIA</div>
              <div className="nav__overlay-info-sub">19.0760° N, 72.8777° E</div>
            </div>

            <div className="nav__overlay-info-group">
              <div className="nav__overlay-info-label">Say Hello</div>
              <a href={`mailto:${CONTACT_EMAIL}`} className="nav__overlay-email">
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="nav__overlay-info-group nav__overlay-socials-group">
              <div className="nav__overlay-info-label">Connect</div>
              <div className="nav__overlay-socials">
                <a href="https://twitter.com/revlient" target="_blank" rel="noopener noreferrer" className="nav__overlay-social-link">
                  <span>Twitter</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M7 17 L17 7" /><path d="M8 7 L17 7 L17 16" /></svg>
                </a>
                <a href="https://linkedin.com/company/revlient" target="_blank" rel="noopener noreferrer" className="nav__overlay-social-link">
                  <span>LinkedIn</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M7 17 L17 7" /><path d="M8 7 L17 7 L17 16" /></svg>
                </a>
                <a href="https://instagram.com/revlient" target="_blank" rel="noopener noreferrer" className="nav__overlay-social-link">
                  <span>Instagram</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M7 17 L17 7" /><path d="M8 7 L17 7 L17 16" /></svg>
                </a>
                <a href="https://dribbble.com/revlient" target="_blank" rel="noopener noreferrer" className="nav__overlay-social-link">
                  <span>Dribbble</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M7 17 L17 7" /><path d="M8 7 L17 7 L17 16" /></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
