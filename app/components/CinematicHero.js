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

      {/* Linear bottom fade overlay */}
      <div className="cinhero__fade" aria-hidden="true" />
    </section>
  );
}
