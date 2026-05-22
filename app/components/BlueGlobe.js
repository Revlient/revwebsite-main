"use client";

import { useRef, useEffect } from "react";

/* Canvas 3D globe — adapted from a TS / Tailwind / shadcn reference
   to this project's stack (vanilla JS + plain CSS, no cn/clsx).
   Brand-blue dots + rose arcs/markers. Drag-to-rotate kept, auto-
   rotates otherwise. The rAF loop pauses when the canvas is
   off-screen or the tab is hidden (perf contract). DPR capped 1.5. */

function latLngToXYZ(lat, lng, radius) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}
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

const MARKERS = [
  { lat: 37.78, lng: -122.42 },
  { lat: 51.51, lng: -0.13 },
  { lat: 35.68, lng: 139.69 },
  { lat: -33.87, lng: 151.21 },
  { lat: 1.35, lng: 103.82 },
];
const CONNECTIONS = [
  { from: [37.78, -122.42], to: [51.51, -0.13] },
  { from: [51.51, -0.13], to: [35.68, 139.69] },
  { from: [35.68, 139.69], to: [-33.87, 151.21] },
  { from: [37.78, -122.42], to: [1.35, 103.82] },
  { from: [1.35, 103.82], to: [-33.87, 151.21] },
];

export default function BlueGlobe() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    rotY: 0.4,
    rotX: 0.3,
    drag: { active: false, startX: 0, startY: 0, startRotY: 0, startRotX: 0 },
    time: 0,
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
    const arcColor = "rgba(244, 100, 130, 0.6)";
    const markerColor = "rgba(255, 200, 220, 1)";
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
      state.time += 0.015;
      const time = state.time;

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

      for (const conn of CONNECTIONS) {
        const [lat1, lng1] = conn.from;
        const [lat2, lng2] = conn.to;
        let [x1, y1, z1] = latLngToXYZ(lat1, lng1, radius);
        let [x2, y2, z2] = latLngToXYZ(lat2, lng2, radius);
        [x1, y1, z1] = rotateX(x1, y1, z1, rx);
        [x1, y1, z1] = rotateY(x1, y1, z1, ry);
        [x2, y2, z2] = rotateX(x2, y2, z2, rx);
        [x2, y2, z2] = rotateY(x2, y2, z2, ry);
        if (z1 > radius * 0.3 && z2 > radius * 0.3) continue;
        const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
        const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);
        const mX = (x1 + x2) / 2;
        const mY = (y1 + y2) / 2;
        const mZ = (z1 + z2) / 2;
        const mLen = Math.sqrt(mX * mX + mY * mY + mZ * mZ) || 1;
        const arcH = radius * 1.25;
        const [scx, scy] = project(
          (mX / mLen) * arcH,
          (mY / mLen) * arcH,
          (mZ / mLen) * arcH,
          cx,
          cy,
          fov
        );
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.quadraticCurveTo(scx, scy, sx2, sy2);
        ctx.strokeStyle = arcColor;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const t = (Math.sin(time * 1.2 + lat1 * 0.1) + 1) / 2;
        const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
        const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;
        ctx.beginPath();
        ctx.arc(tx, ty, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = markerColor;
        ctx.fill();
      }

      for (const m of MARKERS) {
        let [x, y, z] = latLngToXYZ(m.lat, m.lng, radius);
        [x, y, z] = rotateX(x, y, z, rx);
        [x, y, z] = rotateY(x, y, z, ry);
        if (z > radius * 0.1) continue;
        const [sx, sy] = project(x, y, z, cx, cy, fov);
        const pulse = Math.sin(time * 2 + m.lat) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, 4 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = markerColor.replace(
          "1)",
          `${(0.2 + pulse * 0.18).toFixed(2)})`
        );
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = markerColor;
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
