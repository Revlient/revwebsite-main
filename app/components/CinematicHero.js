"use client";

import { useEffect, useRef, useState } from "react";
import { CTA_HREF } from "../lib/site";
import AiFunnelModal from "./AiFunnelModal";

export default function CinematicHero() {
  const ctaRef = useRef(null);
  const aiBtnRef = useRef(null);
  const [aiOpen, setAiOpen] = useState(false);

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

  // Cursor-tracked spotlight for the "Figure out with AI" pill. Button-scoped
  // (no global listener), sets only CSS custom properties — never transform, so
  // it can't fight the CSS hover/press — and bails on touch / reduced-motion.
  useEffect(() => {
    const btn = aiBtnRef.current;
    if (!btn) return;

    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hoverMq.matches || reduceMq.matches) return;

    let tx = 50;
    let ty = 50;
    let cx = 50;
    let cy = 50;
    let frameId = null;

    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };

    const animate = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      btn.style.setProperty("--mx", `${cx.toFixed(2)}%`);
      btn.style.setProperty("--my", `${cy.toFixed(2)}%`);
      frameId = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (frameId == null) frameId = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      if (frameId != null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    btn.addEventListener("mouseenter", onEnter, { passive: true });
    btn.addEventListener("mousemove", onMove, { passive: true });
    btn.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      if (frameId != null) cancelAnimationFrame(frameId);
      btn.style.removeProperty("--mx");
      btn.style.removeProperty("--my");
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
            <span className="cinhero__line cinhero__line--1">
              We craft <span className="hero-accent">digital</span>
            </span>
            <span className="cinhero__line cinhero__line--3">legacies</span>
          </h1>
        </div>

        {/* Bottom left CTA row: editorial divider line + the two buttons */}
        <div className="cinhero__bottom-left">
          <a ref={ctaRef} href={CTA_HREF} className="cinhero__btn-pill cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
            <span>FREE CONSULTATION</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
          <button
            ref={aiBtnRef}
            type="button"
            className="cinhero__btn-ai"
            onClick={() => setAiOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={aiOpen}
          >
            <span className="cinhero__btn-ai-fx" aria-hidden="true" />
            <span className="cinhero__btn-ai-label">FIGURE OUT WITH AI</span>
          </button>
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

      {/* AI funnel chat modal */}
      <AiFunnelModal open={aiOpen} onClose={() => setAiOpen(false)} />
    </section>
  );
}
