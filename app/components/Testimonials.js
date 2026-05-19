"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Lazy-load the canvas background client-side only so the homepage
// still prerenders static and the loop stays off the critical path.
const SpiralBg = dynamic(() => import("./StarfieldBackground"), {
  ssr: false,
  loading: () => null,
});

/* Scroll-morph showcase. Adapted from a framer-motion/Tailwind/TS demo
   to this project's stack: plain React + CSS (no framer-motion, no
   deps). Driven by PAGE scroll over a tall pinned section (the original
   hijacked wheel + preventDefault, which traps the user) so it reads as
   scatter -> circle -> bottom arc as you scroll through.

   Cards are the real client sites (provided URLs), each linking out —
   not the demo's random Unsplash photos (fabricated proof). House of 11
   uses the uploaded self-hosted screenshot; the rest use WordPress
   mShots (free, no key, no dependency). Honours prefers-reduced-motion
   (static arc, no entrance animation). */

const SITE = (url, name, local) => ({
  url,
  name,
  shot:
    local ||
    // thum.io: sharper than mShots, free, no key. High-res 1600px-wide
    // crop so it stays crisp scaled up in the arc on hi-DPI screens.
    `https://image.thum.io/get/width/1600/crop/1067/${url}`,
});

const SITES = [
  SITE("https://www.perpexbschool.com", "Perpex B-School"),
  SITE("https://www.houseof11.in", "House of 11", "/work/houseof11.png"),
  SITE("https://magnate-studyabroad2.vercel.app", "Magnate Study Abroad"),
  SITE("https://ibsconsultants.in", "IBS Consultants"),
  SITE("https://www.covspace.in", "Covspace"),
  SITE("https://ronspire.com", "Ronspire"),
  SITE("https://www.perpex.in", "Perpex"),
  SITE("https://mathleteonline.com", "Mathlete Online"),
  SITE("https://themagnates.in", "The Magnates"),
  SITE("https://www.bambrush.co.in", "Bambrush"),
  SITE("https://www.soumyashyammakeup.com", "Soumya Shyam Makeup"),
];

const N = SITES.length;
const lerp = (a, b, t) => a * (1 - t) + b * t;

export default function Testimonials() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [progress, setProgress] = useState(0); // 0..1 through the section
  const [entered, setEntered] = useState(false); // scatter -> circle done
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      !!(
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    );
  }, []);

  // Measure the pinned stage.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    );
    ro.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => ro.disconnect();
  }, []);

  // Entrance: scatter -> circle (skipped under reduced motion).
  useEffect(() => {
    if (reduced) {
      setEntered(true);
      return;
    }
    const t = setTimeout(() => setEntered(true), 900);
    return () => clearTimeout(t);
  }, [reduced]);

  // Page-scroll progress through the tall section.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sec = sectionRef.current;
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        const total = sec.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // morph: circle (0) -> bottom arc (1) over first ~55% of scroll.
  const morph = Math.min(progress / 0.55, 1);
  // shuffle: rotate the arc over the rest.
  const shuffle = Math.max((progress - 0.55) / 0.45, 0);

  const isMobile = size.w > 0 && size.w < 768;
  const minDim = Math.min(size.w || 1, size.h || 1);

  const cardFor = (i) => {
    // Circle layout
    const cR = Math.min(minDim * 0.34, 320);
    const cAng = (i / N) * 360;
    const cRad = (cAng * Math.PI) / 180;
    const circle = {
      x: Math.cos(cRad) * cR,
      y: Math.sin(cRad) * cR,
      r: cAng + 90,
      s: 1,
    };

    // Bottom "rainbow" arc
    const baseR = Math.min(size.w || 1, (size.h || 1) * 1.5);
    const arcR = baseR * (isMobile ? 1.4 : 1.05);
    const apexY = (size.h || 1) * (isMobile ? 0.34 : 0.24);
    const arcCenterY = apexY + arcR;
    const spread = isMobile ? 110 : 140;
    const start = -90 - spread / 2;
    const step = spread / (N - 1);
    const bounded = -shuffle * (spread * 0.78);
    const a = start + i * step + bounded;
    const aRad = (a * Math.PI) / 180;
    const arc = {
      x: Math.cos(aRad) * arcR,
      y: Math.sin(aRad) * arcR + arcCenterY,
      r: a + 90,
      s: isMobile ? 1.5 : 1.9,
    };

    if (!entered) {
      // pre-entrance: tucked in a tight stack, low opacity
      return { x: 0, y: 0, r: 0, s: 0.6, o: 0 };
    }
    return {
      x: lerp(circle.x, arc.x, morph),
      y: lerp(circle.y, arc.y, morph),
      r: lerp(circle.r, arc.r, morph),
      s: lerp(circle.s, arc.s, morph),
      o: 1,
    };
  };

  const introOpacity = entered ? Math.max(1 - morph * 2, 0) : 0;
  const arcOpacity = Math.max((morph - 0.8) / 0.2, 0);

  return (
    <section className="section morph" id="showcase" ref={sectionRef}>
      <div className="morph__stage" ref={stageRef}>
        <SpiralBg />
        <div
          className="morph__intro"
          style={{ opacity: introOpacity }}
          aria-hidden={introOpacity === 0}
        >
          <h2>A few of the things we&apos;ve shipped.</h2>
          <p>SCROLL TO EXPLORE</p>
        </div>

        <div
          className="morph__arc-text"
          style={{
            opacity: arcOpacity,
            transform: `translate(-50%, -50%) translateY(${lerp(
              20,
              0,
              arcOpacity
            )}px)`,
          }}
          aria-hidden={arcOpacity === 0}
        >
          <span className="eyebrow">Selected work</span>
          <h2>Live client sites</h2>
          <p>Hover to flip · tap any card to open it</p>
        </div>

        <div className="morph__field">
          {SITES.map((siteItem, i) => {
            const c = cardFor(i);
            return (
              <a
                key={siteItem.url}
                className="morph__card"
                href={siteItem.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteItem.name} — opens in a new tab`}
                style={{
                  transform: `translate(-50%, -50%) translate(${c.x}px, ${c.y}px) rotate(${c.r}deg) scale(${c.s})`,
                  opacity: c.o,
                  zIndex: 100 + i,
                }}
              >
                <span className="morph__card-inner">
                  <span className="morph__face morph__face--front">
                    <img
                      src={siteItem.shot}
                      alt={`${siteItem.name} homepage`}
                      loading="lazy"
                      draggable={false}
                    />
                  </span>
                  <span className="morph__face morph__face--back">
                    <span className="morph__back-name">
                      {siteItem.name}
                    </span>
                    <span className="morph__back-cta">Visit ↗</span>
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
