"use client";

import { useEffect, useRef } from "react";

/* Grid + moving radial glows background. Adapted from a Tailwind/TS demo
   to this project's stack: plain JS canvas, no deps. Scoped to its
   container (not the window) and held to the site's performance/
   accessibility contract:
   - devicePixelRatio + total pixels capped
   - prefers-reduced-motion: one static frame, no loop
   - pauses when the tab is hidden or the section is off-screen
   - canvas + RAF disposed on unmount
   Glows retinted to the brand blue for site cohesion. */

const GRID = 50;
const GLOW_COUNT = 8;
const GLOW_COLORS = ["#16215c", "#2b5fff", "#4a78ff"];
const GRID_COLOR = "rgba(255, 255, 255, 0.05)";
const MAX_PIXELS = 1300000;

export default function GridGlowBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;opacity:0.6";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let glows = [];

    class Glow {
      constructor() {
        this.x = Math.floor(Math.random() * (W / GRID)) * GRID;
        this.y = Math.floor(Math.random() * (H / GRID)) * GRID;
        this.radius = Math.random() * 90 + 50;
        this.speed = Math.random() * 0.015 + 0.01;
        this.color =
          GLOW_COLORS[Math.floor(Math.random() * GLOW_COLORS.length)];
        this.alpha = 0;
        this.newTarget();
      }
      newTarget() {
        this.tx = Math.floor(Math.random() * (W / GRID)) * GRID;
        this.ty = Math.floor(Math.random() * (H / GRID)) * GRID;
      }
      update() {
        this.x += (this.tx - this.x) * this.speed;
        this.y += (this.ty - this.y) * this.speed;
        if (Math.abs(this.tx - this.x) < 1 && Math.abs(this.ty - this.y) < 1)
          this.newTarget();
        if (this.alpha < 1) this.alpha += 0.01;
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        const g = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        g.addColorStop(0, this.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      for (const g of glows) {
        g.update();
        g.draw();
      }
    };

    const setup = () => {
      W = host.clientWidth || window.innerWidth;
      H = host.clientHeight || window.innerHeight;
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const area = W * H * dpr * dpr;
      if (area > MAX_PIXELS) dpr *= Math.sqrt(MAX_PIXELS / area);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glows = Array.from({ length: GLOW_COUNT }, () => new Glow());
      frame();
    };
    setup();

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(setup);
      ro.observe(host);
    } else {
      window.addEventListener("resize", setup);
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      frame();
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    if (!reduced) play();

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !document.hidden) play();
        else stop();
      },
      { threshold: 0.01 }
    );
    io.observe(host);
    const onVis = () => {
      if (document.hidden) stop();
      else play();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", setup);
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, []);

  return <div ref={ref} className="morph__bg" aria-hidden="true" />;
}
