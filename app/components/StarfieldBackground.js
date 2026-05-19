"use client";

import { useEffect, useRef } from "react";

/* Warp-streak starfield. Adapted from a PropTypes/Tailwind demo to this
   project's stack: plain JS canvas, no deps (PropTypes dropped). Scoped
   to its container (not the window) and held to the site's performance/
   accessibility contract:
   - star count reduced, devicePixelRatio + total pixels capped
   - resize only via ResizeObserver (the original re-measured every frame)
   - prefers-reduced-motion: one static frame, no loop
   - pauses when the tab is hidden or the section is off-screen
   - canvas + RAF disposed on unmount
   Projection / streak math is unchanged from the original. */

const QUANTITY = 320; // reduced from 512 for perf
const SPEED = 1;
const MAX_PIXELS = 1300000;

export default function StarfieldBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sd = { w: 0, h: 0, x: 0, y: 0, z: 0, ratio: QUANTITY / 2, cr: 0 };
    let stars = [];

    const bigBang = () => {
      stars = new Array(QUANTITY).fill().map(() => [
        Math.random() * sd.w * 2 - sd.x * 2,
        Math.random() * sd.h * 2 - sd.y * 2,
        Math.round(Math.random() * sd.z),
        0,
        0,
        0,
        0,
        true,
      ]);
    };

    const setup = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const area = w * h * dpr * dpr;
      if (area > MAX_PIXELS) dpr *= Math.sqrt(MAX_PIXELS / area);
      sd.w = w;
      sd.h = h;
      sd.x = Math.round(w / 2);
      sd.y = Math.round(h / 2);
      sd.z = (w + h) / 2;
      sd.cr = 1 / sd.z;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      if (!stars.length) bigBang();
    };
    setup();

    const frame = () => {
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s[7] = true;
        s[5] = s[3];
        s[6] = s[4];
        s[2] -= SPEED;
        if (s[2] > sd.z) {
          s[2] -= sd.z;
          s[7] = false;
        }
        if (s[2] < 0) {
          s[2] += sd.z;
          s[7] = false;
        }
        s[3] = sd.x + (s[0] / s[2]) * sd.ratio;
        s[4] = sd.y + (s[1] / s[2]) * sd.ratio;
      }
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, sd.w, sd.h);
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (
          s[5] > 0 &&
          s[5] < sd.w &&
          s[6] > 0 &&
          s[6] < sd.h &&
          s[7]
        ) {
          ctx.lineWidth = (1 - sd.cr * s[2]) * 2;
          ctx.beginPath();
          ctx.moveTo(s[5], s[6]);
          ctx.lineTo(s[3], s[4]);
          ctx.stroke();
        }
      }
    };

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

    // settle a couple frames so the first paint isn't a blank field
    for (let i = 0; i < 3; i++) frame();
    if (reduced) frame();
    else play();

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => {
        setup();
        if (reduced) frame();
      });
      ro.observe(host);
    } else {
      window.addEventListener("resize", setup);
    }

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
