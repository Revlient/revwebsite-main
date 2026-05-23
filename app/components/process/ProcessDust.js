"use client";

import { useEffect, useRef } from "react";

/* Tight ambient particle field scoped to the Process section. Lives
   inside .spine (position: relative; overflow: hidden), so particles
   stay contained. IntersectionObserver gates the rAF loop. */

const PALETTE = [
  [70, [255, 255, 255]],
  [25, [233, 213, 255]],
  [5, [192, 132, 252]],
];

function pick() {
  let r = Math.random() * 100;
  for (let i = 0; i < PALETTE.length; i++) {
    r -= PALETTE[i][0];
    if (r <= 0) return PALETTE[i][1];
  }
  return PALETTE[0][1];
}

export default function ProcessDust() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const TARGET = window.matchMedia("(max-width: 768px)").matches ? 20 : 35;

    let w = 0, h = 0, raf = 0, visible = false, last = performance.now();
    const particles = [];

    // ~6 of ~35 particles are code glyphs instead of dots — ambient
    // code dust, not full text. Muted alpha keeps them background.
    const GLYPHS = ["{", "}", "</>", "→", "λ", "*"];
    const make = () => {
      const isGlyph = Math.random() < 0.18;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.5,
        c: pick(),
        base: isGlyph
          ? 0.1 + Math.random() * 0.15
          : 0.15 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.04,
        vy: -0.02 - Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2,
        period: 3 + Math.random() * 3,
        glyph: isGlyph ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
      };
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      while (particles.length < TARGET) particles.push(make());
      particles.length = TARGET;
    };

    const draw = (now) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const step = dt * 60;
      ctx.clearRect(0, 0, w, h);
      // single font set per frame so glyph particles render cheaply
      ctx.font = '12px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
      ctx.textBaseline = "middle";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * step;
        p.y += p.vy * step;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        p.phase += (dt * Math.PI * 2) / p.period;
        const a = p.base * (0.6 + 0.4 * (0.5 + 0.5 * Math.sin(p.phase)));
        ctx.fillStyle = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, ${a})`;
        if (p.glyph) {
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      } else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { rootMargin: "200px" });

    let resizeT = 0;
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(resize, 150); };

    resize();
    draw(performance.now());
    io.observe(parent);
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="spine__dust" aria-hidden="true" />;
}
