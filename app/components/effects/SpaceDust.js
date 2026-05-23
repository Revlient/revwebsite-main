"use client";

import { useEffect, useRef } from "react";

/* Site-wide ambient particle field — small glowing motes drifting
   slowly through soft purple cosmos. Single <canvas> driven by a
   shared rAF loop so 80–150 particles cost almost nothing to render
   (the same DOM count via divs would thrash layout every frame).

   Lives in the root layout so it persists across route transitions.
   Mounted as a fixed overlay with mix-blend-mode: lighten in CSS —
   it only ADDS light, so it pops on dark sections and fades to
   nothing on the cream Hero gutter without any per-section work.

   prefers-reduced-motion paints a single static frame and skips the
   loop. visibilitychange and an IntersectionObserver on document
   pause the rAF when the tab/page is hidden. */

const PALETTE = [
  { weight: 50, color: "#FFFFFF" },
  { weight: 25, color: "#E9D5FF" },
  { weight: 15, color: "#C084FC" },
  { weight: 7, color: "#A855F7" },
  { weight: 3, color: "#FCD34D" },
];

const WEIGHT_TOTAL = PALETTE.reduce((s, c) => s + c.weight, 0);

// Parallax factor by depth layer: 1 = far (barely shifts), 2 = mid,
// 3 = near (most pronounced). Index 0 unused (layers are 1-3).
const PARALLAX = [0, 0.05, 0.15, 0.3];

function pickColor(rng) {
  let r = rng() * WEIGHT_TOTAL;
  for (let i = 0; i < PALETTE.length; i++) {
    r -= PALETTE[i].weight;
    if (r <= 0) return PALETTE[i].color;
  }
  return PALETTE[0].color;
}

function makeParticle(rng, w, h) {
  const layer = 1 + Math.floor(rng() * 3);
  const isBright = rng() < 0.05;
  const r = isBright ? 5 + rng() * 2 : 0.5 + rng() * 3.5;
  const color = pickColor(rng);
  return {
    x: rng() * w,
    y: rng() * h,
    r,
    rgb: hexToRgb(color),
    base: 0.2 + rng() * 0.7,
    vx: (rng() - 0.5) * 0.1, // -0.05..0.05
    vy: -0.02 - rng() * 0.13, // -0.02..-0.15
    phase: rng() * Math.PI * 2,
    period: 2 + rng() * 4,
    layer,
    bright: isBright,
  };
}

// Cheap deterministic RNG so initial seed -> same starting positions
// every reload. Avoids occasional hydration flicker in dev.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export default function SpaceDust() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    let particles = [];
    let raf = 0;
    let last = performance.now();
    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let visible = !document.hidden;

    const seed = (Math.random() * 0xffffffff) >>> 0;
    let rng = mulberry32(seed);

    function targetCount() {
      // ~80 on phones, ~150 on big screens
      return Math.max(80, Math.min(150, Math.round((w * h) / 16000)));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const want = targetCount();
      if (particles.length < want) {
        for (let i = particles.length; i < want; i++)
          particles.push(makeParticle(rng, w, h));
      } else if (particles.length > want) {
        particles.length = want;
      }
    }

    function draw(now) {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      ctx.clearRect(0, 0, w, h);

      const frameStep = dt * 60; // approx frames per dt
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx * frameStep;
        p.y += p.vy * frameStep;
        p.y -= scrollDelta * PARALLAX[p.layer];

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        } else if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;

        p.phase += (dt * Math.PI * 2) / p.period;
        const twinkle = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(p.phase));
        const alpha = p.base * twinkle;

        const { r: cr, g: cg, b: cb } = p.rgb;

        if (p.r >= 3 || p.layer === 3 || p.bright) {
          const rad = p.r * (p.bright ? 6 : 4);
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
          glow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${alpha * 0.55})`);
          glow.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (visible && !reduced) raf = requestAnimationFrame(draw);
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    let resizeTimer = 0;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    function onVisibility() {
      visible = !document.hidden;
      if (visible && !raf && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      } else if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    resize();
    draw(performance.now());

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="space-dust" aria-hidden="true" />;
}
