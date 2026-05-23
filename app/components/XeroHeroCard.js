"use client";

import { useEffect, useRef } from "react";
import { CTA_HREF } from "../lib/site";

/* Full Xero-style hero card adapted for the /process page. Rounded
   dark panel with the signature pink-magenta gradient arc, a 40px
   grid masked to the arc area, an animated icon pipeline (stack →
   centre X → shield) with a beam whose bright window slides along
   the path through a 4-phase state machine, then a heading +
   subhead + CTA below. Animation logic is the same hand-rolled rAF
   loop pattern used in XeroBackdrop, paused offscreen / when the
   tab is hidden. No Tailwind, no motion/react, no lucide-react. */

export default function XeroHeroCard() {
  const pipelineRef = useRef(null);
  const stackRef = useRef(null);
  const xRef = useRef(null);
  const shieldRef = useRef(null);
  const beamGlowRef = useRef(null);
  const beamCoreRef = useRef(null);
  const gradientRef = useRef(null);
  const splashRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const pipeline = pipelineRef.current;
    const stack = stackRef.current;
    const xNode = xRef.current;
    const shield = shieldRef.current;
    const beamGlow = beamGlowRef.current;
    const beamCore = beamCoreRef.current;
    const gradient = gradientRef.current;
    const splash = splashRef.current;
    if (!pipeline || !stack || !xNode || !shield) return undefined;

    let rafId = 0;
    let state = "p1";
    let lastChange = performance.now();
    let inView = true;
    let visible = !document.hidden;

    function recomputePath() {
      const pRect = pipeline.getBoundingClientRect();
      const sRect = stack.getBoundingClientRect();
      const xRect = xNode.getBoundingClientRect();
      const shRect = shield.getBoundingClientRect();
      const startX = sRect.left + sRect.width / 2 - pRect.left;
      const startY = sRect.top + sRect.height / 2 - pRect.top;
      const midX = xRect.left + xRect.width / 2 - pRect.left;
      const midY = xRect.top + xRect.height / 2 - pRect.top;
      const endX = shRect.left + shRect.width / 2 - pRect.left;
      const endY = shRect.top + shRect.height / 2 - pRect.top;
      const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`;
      if (beamGlow) beamGlow.setAttribute("d", d);
      if (beamCore) beamCore.setAttribute("d", d);
    }

    function setGradientCenter(pct) {
      if (!gradient) return;
      const center = pct * 100;
      const half = 5;
      gradient.setAttribute("x1", `${center - half}%`);
      gradient.setAttribute("x2", `${center + half}%`);
      gradient.setAttribute("y1", "0%");
      gradient.setAttribute("y2", "0%");
    }

    function setBeamOpacity(o) {
      if (beamGlow) beamGlow.style.opacity = o === 0 ? "0" : "0.6";
      if (beamCore) beamCore.style.opacity = String(o);
    }

    function tick(now) {
      if (!inView || !visible) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - lastChange;

      if (state === "p1") {
        const t = Math.min(1, elapsed / 800);
        const pct = t * 0.5;
        setGradientCenter(pct);
        if (pct < 0.4) stack.classList.add("is-active");
        else stack.classList.remove("is-active");
        if (t >= 1) {
          state = "splash";
          lastChange = now;
          setBeamOpacity(0);
          if (splash) {
            splash.classList.remove("is-animating");
            void splash.offsetWidth;
            splash.classList.add("is-animating");
          }
        }
      } else if (state === "splash") {
        if (elapsed >= 800) {
          state = "p2";
          lastChange = now;
          if (splash) splash.classList.remove("is-animating");
          setBeamOpacity(1);
        }
      } else if (state === "p2") {
        const t = Math.min(1, elapsed / 800);
        const pct = 0.5 + t * 0.5;
        setGradientCenter(pct);
        if (pct > 0.6) shield.classList.add("is-active");
        else shield.classList.remove("is-active");
        if (t >= 1) {
          shield.classList.remove("is-active");
          state = "idle";
          lastChange = now;
        }
      } else if (elapsed >= 1000) {
        state = "p1";
        lastChange = now;
      }
      rafId = requestAnimationFrame(tick);
    }

    recomputePath();
    setBeamOpacity(1);
    setGradientCenter(0);

    const onResize = () => recomputePath();
    window.addEventListener("resize", onResize);

    const onVis = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          inView = entries[0] ? entries[0].isIntersecting : true;
        },
        { rootMargin: "200px" }
      );
      io.observe(pipeline);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <section className="xhero">
      <div className="xhero__card">
        <span className="xhero__arc" aria-hidden="true" />
        <span className="xhero__grid" aria-hidden="true" />

        <div className="xhero__pipeline" ref={pipelineRef}>
          <svg
            className="xhero__beam"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
          >
            <defs>
              <filter id="xhero-glow">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feComposite in="SourceGraphic" in2="b" operator="over" />
              </filter>
              <linearGradient
                id="xhero-beam-gradient"
                gradientUnits="userSpaceOnUse"
                ref={gradientRef}
                x1="0%"
                y1="0%"
                x2="10%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#b04090" stopOpacity="0" />
                <stop offset="20%" stopColor="#b04090" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="80%" stopColor="#c8a0e0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c8a0e0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              ref={beamGlowRef}
              stroke="url(#xhero-beam-gradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#xhero-glow)"
              style={{ opacity: 0.6 }}
            />
            <path
              ref={beamCoreRef}
              stroke="url(#xhero-beam-gradient)"
              strokeWidth="0.8"
              fill="none"
            />
          </svg>

          <div className="xhero__node xhero__node--right" ref={stackRef}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          <span className="xhero__line" />

          <div className="xhero__center-wrap">
            <span className="xhero__splash" ref={splashRef} />
            <div className="xhero__center" ref={xRef}>
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path
                  fill="#fff"
                  d="M9 8 L13 8 L20 16 L27 8 L31 8 L23 18 L31 28 L27 28 L20 20 L13 28 L9 28 L17 18 Z"
                />
              </svg>
            </div>
          </div>

          <span className="xhero__line xhero__line--right" />

          <div className="xhero__node xhero__node--left" ref={shieldRef}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
        </div>

        <div className="xhero__content">
          <h1 className="xhero__heading">
            A simple way
            <strong>through your project.</strong>
          </h1>
          <p className="xhero__sub">
            From the first conversation to the day after launch —
            <br />
            four deliberate stages, with no surprises.
          </p>
          <a href={CTA_HREF} className="xhero__cta">
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
}
