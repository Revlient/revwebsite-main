"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

// Centred editorial hero for /work. Soft blue side gradients
// frame a centred title + sub-copy + primary CTA; the section
// height is set so the top edge of the client-card grid begins
// peeking in at the bottom of the viewport (~25%).
export default function WorkPageHero() {
  const ctaRef = useRef(null);

  // Cursor-tracked spotlight for the AI-style "Free consultation" pill.
  // Button-scoped; only sets CSS custom properties; bails on touch /
  // reduced-motion. Mirrors the CinematicHero AI button behaviour.
  useEffect(() => {
    const btn = ctaRef.current;
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
    <section className="work-intro-hero" aria-labelledby="work-intro-title">
      <div className="work-intro-hero__bg" aria-hidden="true" />
      <div className="work-intro-hero__inner">
        <Reveal>
          <span className="work-intro-hero__eyebrow">Selected work</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 id="work-intro-title" className="work-intro-hero__title">
            Built for{" "}
            <span className="work-intro-hero__italic">founders</span>
            <br />
            who measure outcomes.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="work-intro-hero__sub">
            Websites, apps and operating systems shipped end-to-end
            for founders across education, healthcare, construction,
            retail and interior design.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <a
            ref={ctaRef}
            href={CTA_HREF}
            className="cinhero__btn-ai work-intro-hero__ai-cta"
          >
            <span className="cinhero__btn-ai-fx" aria-hidden="true" />
            <span className="cinhero__btn-ai-label">FREE CONSULTATION</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
