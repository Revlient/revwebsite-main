"use client";

import { useEffect, useRef } from "react";
import { CTA_HREF } from "../lib/site";

export default function CinematicHero() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = null;

    const onMouseMove = (e) => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        targetX = 0;
        targetY = 0;
        return;
      }

      const rect = cta.getBoundingClientRect();
      const ctaX = rect.left + rect.width / 2;
      const ctaY = rect.top + rect.height / 2;

      // Distance between cursor and button center
      const dx = e.clientX - ctaX;
      const dy = e.clientY - ctaY;
      const distance = Math.hypot(dx, dy);

      // Magnetic attraction zone: 100px
      const radius = 100;

      if (distance < radius) {
        // Pull strength (moves button 30% of the distance to the cursor)
        const pull = 0.3;
        targetX = dx * pull;
        targetY = dy * pull;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      const isMobile = window.innerWidth <= 768;

      if (!isMobile) {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        cta.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      } else {
        currentX = 0;
        currentY = 0;
        cta.style.transform = "";
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    cta.addEventListener("mouseleave", onMouseLeave, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (cta) cta.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="cinhero" aria-label="Hero">
      {/* Background sculpture */}
      <div className="cinhero__bg" aria-hidden="true" />

      {/* Main content column */}
      <div className="cinhero__content">
        <div className="cinhero__typography">
          <h1 className="cinhero__headline">
            <span className="cinhero__line cinhero__line--1">We Craft</span>
            <span className="cinhero__line cinhero__line--2">Digital</span>
            <span className="cinhero__line cinhero__line--3">
              <span className="hero-legacies">Legacies</span>
            </span>
          </h1>
        </div>

        {/* Bottom left strategy list and CTA button */}
        <div className="cinhero__bottom-left">
          <div className="cinhero__skills">
            STRATEGY. DESIGN.<br />ENGINEERING. LAUNCH.
          </div>
          <a ref={ctaRef} href={CTA_HREF} className="cinhero__btn-pill cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
            <span>FREE CONSULTATION</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* Star Solution Box overlay */}
      <div className="cinhero__solution-card">
        <div className="cinhero__solution-icon-wrapper">
          <svg className="cinhero__star-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
          </svg>
        </div>
        <div className="cinhero__solution-text">
          DIGITAL SOLUTIONS THAT MOVE BRANDS BEYOND TOMORROW.
        </div>
      </div>

      {/* Right Sidebar (Avatars + Built for Visionaries) */}
      <div className="cinhero__right-sidebar">
        <div className="cinhero__avatar-stack">
          <img src="/avatar1.png" alt="Creative portrait" className="cinhero__avatar" />
          <img src="/avatar2.png" alt="Developer portrait" className="cinhero__avatar" />
          <img src="/avatar3.png" alt="Engineer portrait" className="cinhero__avatar" />
        </div>
        <div className="cinhero__sidebar-label">
          BUILT FOR VISIONARIES
        </div>
        <div className="cinhero__sidebar-line" />
      </div>

      {/* Bottom right nebula orb */}
      <div className="cinhero__bottom-right-decor">
        <div className="cinhero__orb">
          <div className="cinhero__orb-inner" />
        </div>
      </div>

      {/* Bottom Left 'N' badge */}
      <div className="cinhero__badge-left">
        <div className="cinhero__badge-circle">
          <span>N</span>
        </div>
      </div>

      {/* Bottom partner logo ticker */}
      <div className="cinhero__ticker">
        <div className="cinhero__ticker-row">
          <div className="cinhero__ticker-item">
            <span className="cinhero__ticker-text cinhero__ticker-text--bold">ACME</span>
          </div>
          <div className="cinhero__ticker-item">
            <span className="cinhero__ticker-icon">○</span>
            <span className="cinhero__ticker-text">QUANTUM</span>
          </div>
          <div className="cinhero__ticker-item">
            <span className="cinhero__ticker-icon">☾</span>
            <span className="cinhero__ticker-text">ECLIPSE</span>
          </div>
          <div className="cinhero__ticker-item">
            <span className="cinhero__ticker-icon-box">
              <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6v6H9z" fill="currentColor" />
              </svg>
            </span>
            <span className="cinhero__ticker-text">NEXTGEN</span>
          </div>
          <div className="cinhero__ticker-item">
            <span className="cinhero__ticker-text">VISIONIX</span>
          </div>
          <div className="cinhero__ticker-item">
            <span className="cinhero__ticker-icon-altrix">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 7v10M7 12h10" />
              </svg>
            </span>
            <span className="cinhero__ticker-text">ALTRIX</span>
          </div>
        </div>
      </div>

      {/* Linear bottom fade overlay */}
      <div className="cinhero__fade" aria-hidden="true" />
    </section>
  );
}
