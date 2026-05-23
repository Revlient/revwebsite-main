"use client";

import { useEffect, useRef } from "react";

/* Pipeline backdrop for the testimonials section — adapted from a
   Xero-style hero spec. Renders: rounded dark surface, a pink-
   magenta gradient arc at the top, a faint grid that's masked to
   only show inside the arc, and an animated icon pipeline (stack
   node → centre node → shield node) with a beam whose bright
   window slides along the path in a 4-phase state machine.

   No motion/react — the animation is a hand-rolled rAF loop. The
   pipeline pauses when offscreen or when the tab is hidden. The
   path geometry is recomputed on every resize so the beam always
   tracks the real node positions. */

export default function XeroBackdrop() {
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

    // recomputed on resize so the beam path tracks real node positions
    let path = { startX: 0, startY: 0, midX: 0, midY: 0, endX: 0, endY: 0 };

    function recomputePath() {
      const pRect = pipeline.getBoundingClientRect();
      const sRect = stack.getBoundingClientRect();
      const xRect = xNode.getBoundingClientRect();
      const shRect = shield.getBoundingClientRect();
      path = {
        startX: sRect.left + sRect.width / 2 - pRect.left,
        startY: sRect.top + sRect.height / 2 - pRect.top,
        midX: xRect.left + xRect.width / 2 - pRect.left,
        midY: xRect.top + xRect.height / 2 - pRect.top,
        endX: shRect.left + shRect.width / 2 - pRect.left,
        endY: shRect.top + shRect.height / 2 - pRect.top,
      };
      const d = `M ${path.startX},${path.startY} L ${path.midX},${path.midY} L ${path.endX},${path.endY}`;
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
        // 800ms: 0 → 0.5
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
            // restart animation by forcing reflow
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
      } else {
        // idle 1000ms then loop
        if (elapsed >= 1000) {
          state = "p1";
          lastChange = now;
        }
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
    <div className="xero-bg" aria-hidden="true">
      <div className="xero-bg__arc" />
      <div className="xero-bg__grid" />

      <div className="xero-bg__pipeline" ref={pipelineRef}>
        <svg
          className="xero-bg__beam"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id="xero-glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
            <linearGradient
              id="xero-beam-gradient"
              gradientUnits="userSpaceOnUse"
              ref={gradientRef}
              x1="0%"
              y1="0%"
              x2="10%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4a78ff" stopOpacity="0" />
              <stop offset="20%" stopColor="#4a78ff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="80%" stopColor="#c4b5fd" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            ref={beamGlowRef}
            stroke="url(#xero-beam-gradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#xero-glow)"
            style={{ opacity: 0.6 }}
          />
          <path
            ref={beamCoreRef}
            stroke="url(#xero-beam-gradient)"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>

        <div className="xero-bg__node xero-bg__node--right" ref={stackRef}>
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

        <span className="xero-bg__line" />

        <div className="xero-bg__center-wrap">
          <span className="xero-bg__splash" ref={splashRef} />
          <div className="xero-bg__center" ref={xRef}>
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path
                fill="#fff"
                d="M9 8 L13 8 L20 16 L27 8 L31 8 L23 18 L31 28 L27 28 L20 20 L13 28 L9 28 L17 18 Z"
              />
            </svg>
          </div>
        </div>

        <span className="xero-bg__line xero-bg__line--right" />

        <div className="xero-bg__node xero-bg__node--left" ref={shieldRef}>
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
    </div>
  );
}
