"use client";

import { useEffect, useRef } from "react";

/* Spiral particle background. Adapted from a gsap/Tailwind/TS component
   to this project's stack: the gsap timeline only tweened one `time`
   value 0->1 on a 15s loop — replaced with a plain requestAnimationFrame
   loop (no gsap, no deps). Scoped to its container (not the window) and
   held to the site's performance/accessibility contract:
   - star count reduced, devicePixelRatio + total pixels capped
   - prefers-reduced-motion: one static frame, no loop
   - pauses when the tab is hidden or the section is off-screen
   - canvas + RAF disposed on unmount
   Spiral / star / projection math is unchanged from the original. */

const DURATION = 15000; // ms, matches the original 15s loop
const MAX_PIXELS = 1300000;

class V2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class V3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Controller {
  constructor(ctx, size) {
    this.ctx = ctx;
    this.size = size;
    this.time = 0;
    this.changeEventTime = 0.32;
    this.cameraZ = -400;
    this.cameraTravelDistance = 3400;
    this.startDotYOffset = 28;
    this.viewZoom = 100;
    this.numberOfStars = 2000; // reduced from 5000 for perf
    this.trailLength = 80;
    this.stars = [];

    // Seeded RNG so the layout is stable, then restore Math.random.
    const orig = Math.random;
    let seed = 1234;
    Math.random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < this.numberOfStars; i++) {
      this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance));
    }
    Math.random = orig;
  }

  ease(p, g) {
    return p < 0.5
      ? 0.5 * Math.pow(2 * p, g)
      : 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }
  easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 4.5;
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
  }
  map(v, a, b, c, d) {
    return c + (d - c) * ((v - a) / (b - a));
  }
  constrain(v, lo, hi) {
    return Math.min(Math.max(v, lo), hi);
  }
  lerp(a, b, t) {
    return a * (1 - t) + b * t;
  }

  spiralPath(p) {
    p = this.constrain(1.2 * p, 0, 1);
    p = this.ease(p, 1.8);
    const theta = 2 * Math.PI * 6 * Math.sqrt(p);
    const r = 170 * Math.sqrt(p);
    return new V2(
      r * Math.cos(theta),
      r * Math.sin(theta) + this.startDotYOffset
    );
  }

  rotate(v1, v2, p, orientation) {
    const mx = (v1.x + v2.x) / 2;
    const my = (v1.y + v2.y) / 2;
    const dx = v1.x - mx;
    const dy = v1.y - my;
    const angle = Math.atan2(dy, dx);
    const o = orientation ? -1 : 1;
    const r = Math.sqrt(dx * dx + dy * dy);
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p);
    return new V2(
      mx + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
      my + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p))
    );
  }

  showProjectedDot(position, sizeFactor) {
    const t2 = this.constrain(
      this.map(this.time, this.changeEventTime, 1, 0, 1),
      0,
      1
    );
    const newCameraZ =
      this.cameraZ +
      this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;
    if (position.z > newCameraZ) {
      const d = position.z - newCameraZ;
      const x = (this.viewZoom * position.x) / d;
      const y = (this.viewZoom * position.y) / d;
      const sw = (400 * sizeFactor) / d;
      this.ctx.lineWidth = sw;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawStartDot() {
    if (this.time > this.changeEventTime) {
      const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom;
      this.showProjectedDot(new V3(0, dy, this.cameraTravelDistance), 2.5);
    }
  }

  drawTrail(t1) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;
      this.ctx.fillStyle = "white";
      this.ctx.lineWidth = sw;
      const pos = this.spiralPath(t1 - 0.00015 * i);
      const rot = this.rotate(
        pos,
        new V2(pos.x + 5, pos.y + 5),
        Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5,
        i % 2 === 0
      );
      this.ctx.beginPath();
      this.ctx.arc(rot.x, rot.y, sw / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.save();
    ctx.translate(this.size / 2, this.size / 2);
    const t1 = this.constrain(
      this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1),
      0,
      1
    );
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    ctx.rotate(-Math.PI * this.ease(t2, 2.7));
    this.drawTrail(t1);
    ctx.fillStyle = "white";
    for (const s of this.stars) s.render(t1, this);
    this.drawStartDot();
    ctx.restore();
  }
}

class Star {
  constructor(cameraZ, cameraTravelDistance) {
    this.angle = Math.random() * Math.PI * 2;
    this.distance = 30 * Math.random() + 15;
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
    this.expansionRate = 1.2 + Math.random() * 0.8;
    this.finalScale = 0.7 + Math.random() * 0.6;
    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);
    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    const rnd = (lo, hi) => lo + Math.random() * (hi - lo);
    this.z = rnd(0.5 * cameraZ, cameraTravelDistance + cameraZ);
    const lerp = (a, b, t) => a * (1 - t) + b * t;
    this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation);
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0);
  }

  render(p, c) {
    const sp = c.spiralPath(this.spiralLocation);
    const q = p - this.spiralLocation;
    if (q <= 0) return;
    const dprog = c.constrain(4 * q, 0, 1);
    const linear = dprog;
    const elastic = c.easeOutElastic(dprog);
    const power = Math.pow(dprog, 2);
    let easing;
    if (dprog < 0.3) easing = c.lerp(linear, power, dprog / 0.3);
    else if (dprog < 0.7) easing = c.lerp(power, elastic, (dprog - 0.3) / 0.4);
    else easing = elastic;

    let sx, sy;
    if (dprog < 0.3) {
      sx = c.lerp(sp.x, sp.x + this.dx * 0.3, easing / 0.3);
      sy = c.lerp(sp.y, sp.y + this.dy * 0.3, easing / 0.3);
    } else if (dprog < 0.7) {
      const mp = (dprog - 0.3) / 0.4;
      const cs = Math.sin(mp * Math.PI) * this.rotationDirection * 1.5;
      const bx = sp.x + this.dx * 0.3;
      const by = sp.y + this.dy * 0.3;
      const tx = sp.x + this.dx * 0.7;
      const ty = sp.y + this.dy * 0.7;
      const px = -this.dy * 0.4 * cs;
      const py = this.dx * 0.4 * cs;
      sx = c.lerp(bx, tx, mp) + px * mp;
      sy = c.lerp(by, ty, mp) + py * mp;
    } else {
      const fp = (dprog - 0.7) / 0.3;
      const bx = sp.x + this.dx * 0.7;
      const by = sp.y + this.dy * 0.7;
      const td = this.distance * this.expansionRate * 1.5;
      const sa = this.angle + 1.2 * this.rotationDirection * fp * Math.PI;
      const tx = sp.x + td * Math.cos(sa);
      const ty = sp.y + td * Math.sin(sa);
      sx = c.lerp(bx, tx, fp);
      sy = c.lerp(by, ty, fp);
    }

    const vx = ((this.z - c.cameraZ) * sx) / c.viewZoom;
    const vy = ((this.z - c.cameraZ) * sy) / c.viewZoom;
    let sm = 1.0;
    if (dprog < 0.6) sm = 1.0 + dprog * 0.2;
    else {
      const t = (dprog - 0.6) / 0.4;
      sm = 1.2 * (1.0 - t) + this.finalScale * t;
    }
    c.showProjectedDot(
      new V3(vx, vy, this.z),
      8.5 * this.strokeWeightFactor * sm
    );
  }
}

export default function SpiralBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let controller;
    let cssSize = 0;

    const setup = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      cssSize = Math.max(w, h);
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const area = cssSize * cssSize * dpr * dpr;
      if (area > MAX_PIXELS) dpr *= Math.sqrt(MAX_PIXELS / area);
      canvas.width = Math.round(cssSize * dpr);
      canvas.height = Math.round(cssSize * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!controller) controller = new Controller(ctx, cssSize);
      else controller.size = cssSize;
      controller.render();
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
    let start = 0;
    const tick = (now) => {
      if (!start) start = now;
      controller.time = ((now - start) % DURATION) / DURATION;
      controller.render();
      raf = requestAnimationFrame(tick);
    };
    const play = () => {
      if (running || reduced) return;
      running = true;
      start = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      controller.time = 0.5;
      controller.render();
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
