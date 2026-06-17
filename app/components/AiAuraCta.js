"use client";

import { useEffect, useRef } from "react";

// Shared "AI-aura" pill CTA — the same button used in the home
// hero's "FIGURE OUT WITH AI". Self-contained: applies the
// cinhero__btn-ai classes and runs the cursor-tracked spotlight
// in rAF, bailing on touch / reduced-motion. Pass `label`, `href`,
// and optional `className` for layout positioning.
export default function AiAuraCta({ label, href, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const btn = ref.current;
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
    <a
      ref={ref}
      href={href}
      className={`cinhero__btn-ai ${className}`.trim()}
    >
      <span className="cinhero__btn-ai-fx" aria-hidden="true" />
      <span className="cinhero__btn-ai-label">{label}</span>
    </a>
  );
}
