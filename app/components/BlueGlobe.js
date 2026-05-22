"use client";

import { useRef, useEffect } from "react";

/* Canvas 3D globe — adapted from a TS / Tailwind / shadcn reference
   to this project's stack (vanilla JS + plain CSS, no cn/clsx).
   Brand-blue dots + rose arcs/markers. Drag-to-rotate kept, auto-
   rotates otherwise. The rAF loop pauses when the canvas is
   off-screen or the tab is hidden (perf contract). DPR capped 1.5. */

function rotateY(x, y, z, a) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x * c + z * s, y, -x * s + z * c];
}
function rotateX(x, y, z, a) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x, y * c - z * s, y * s + z * c];
}
function project(x, y, z, cx, cy, fov) {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy, z];
}

export default function BlueGlobe() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    rotY: 0.4,
    rotX: 0.3,
    drag: { active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 },
    dots: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state = stateRef.current;

    // pre-compute the fibonacci-sphere dot positions once
    if (!state.dots) {
      const dots = [];
      const N = 1200;
      const golden = (1 + Math.sqrt(5)) / 2;
      for (let i = 0; i < N; i++) {
        const theta = (2 * Math.PI * i) / golden;
        const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
        dots.push([
          Math.cos(theta) * Math.sin(phi),
          Math.cos(phi),
          Math.sin(theta) * Math.sin(phi),
        ]);
      }
      state.dots = dots;
    }

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dotColor = "rgba(140, 180, 255, ALPHA)";
    const autoRotateSpeed = 0.0025;

    function drawFrame() {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.42;
      const fov = 600;

      if (!state.drag.active) state.rotY += autoRotateSpeed;

      ctx.clearRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.6);
      glow.addColorStop(0, "rgba(74, 120, 255, 0.06)");
      glow.addColorStop(1, "rgba(74, 120, 255, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(140, 180, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const ry = state.rotY;
      const rx = state.rotX;
      const dots = state.dots;

      for (let i = 0; i < dots.length; i++) {
        let [x, y, z] = dots[i];
        x *= radius;
        y *= radius;
        z *= radius;
        [x, y, z] = rotateX(x, y, z, rx);
        [x, y, z] = rotateY(x, y, z, ry);
        if (z > 0) continue;
        const [sx, sy] = project(x, y, z, cx, cy, fov);
        const a = Math.max(0.1, 1 - (z + radius) / (2 * radius));
        ctx.beginPath();
        ctx.arc(sx, sy, 1 + a * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = dotColor.replace("ALPHA", a.toFixed(2));
        ctx.fill();
      }
    }

    if (reduced) {
      drawFrame();
      return;
    }

    let raf = 0;
    let inView = true;
    let visible = !document.hidden;
    const tick = () => {
      if (inView && visible) drawFrame();
      raf = requestAnimationFrame(tick);
    };

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
      io.observe(canvas);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      if (io) io.disconnect();
    };
  }, []);

  const onPointerDown = (e) => {
    const el = e.currentTarget;
    stateRef.current.drag = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startRotY: stateRef.current.rotY,
      startRotX: stateRef.current.rotX,
    };
    if (el && typeof el.setPointerCapture === "function") {
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* setPointerCapture can throw on some browsers — ignore */
      }
    }
  };

  const onPointerMove = (e) => {
    const drag = stateRef.current.drag;
    if (!drag.active) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    stateRef.current.rotY = drag.startRotY + dx * 0.005;
    stateRef.current.rotX = Math.max(
      -1,
      Math.min(1, drag.startRotX + dy * 0.005)
    );
  };

  const onPointerUp = () => {
    stateRef.current.drag.active = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className="svc-globe__canvas"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
}
