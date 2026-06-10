"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { CTA_HREF } from "../lib/site";

/* /work page hero. Premium studio composition using real project
   stills and the existing work video, with no fabricated metrics. */

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

function ScrollFadeLine({ children, direction = "right" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [offsets, setOffsets] = useState(null);

  // Hook into the global window scroll
  const { scrollY } = useScroll();

  useEffect(() => {
    const calculateOffsets = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const vh = window.innerHeight || 800;

        // Start fading out when top reaches 80% screen height from the bottom (0.20 from the top of the viewport)
        const startPixel = absoluteTop - 0.20 * vh;
        // Finish fading out completely when top reaches 90% screen height from the bottom (0.10 from the top of the viewport)
        const endPixel = absoluteTop - 0.10 * vh;

        // Clamp start to at least 0 so it's fully visible at scroll = 0
        const start = Math.max(0, startPixel);
        // Ensure end is at least start + 50 to prevent division by zero
        const end = Math.max(start + 50, endPixel);

        setOffsets({ start, end });
      }
    };

    calculateOffsets();
    window.addEventListener("resize", calculateOffsets);
    return () => window.removeEventListener("resize", calculateOffsets);
  }, []);

  const targetX = direction === "right" ? 120 : -120;

  // Custom mapping function to interpolate scroll progress over computed line offsets
  const clampedProgress = useTransform(scrollY, (latestScroll) => {
    if (!offsets) return 0; // Default to 0 (fully visible) on initial mount
    const { start, end } = offsets;
    const progress = (latestScroll - start) / (end - start);
    return Math.max(0, Math.min(1, progress));
  });

  const rawX = useTransform(clampedProgress, [0, 1], [0, shouldReduceMotion ? 0 : targetX]);
  const rawOpacity = useTransform(clampedProgress, [0, 1], [1, 0]);

  // Apply spring physics to prevent rigid scroll steps
  const springX = useSpring(rawX, { stiffness: 90, damping: 20, mass: 0.5 });
  const springOpacity = useSpring(rawOpacity, { stiffness: 90, damping: 20, mass: 0.5 });

  // Use hardware-accelerated transform property
  const transform = useTransform(springX, (x) => `translateX(${x}px) translateZ(0)`);

  return (
    <motion.span
      ref={ref}
      style={{
        display: "block",
        opacity: springOpacity,
        transform,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.span>
  );
}

export default function WorkHero() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="whero" aria-labelledby="work-hero-title">
      <video
        className="whero__video"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="whero__shade" aria-hidden="true" />

      <div className="whero__shell">
        <div className="whero__copy">
          <span className="whero__kicker">Revlient work</span>
          <h1 id="work-hero-title" className="whero__heading">
            <ScrollFadeLine direction="right">Digital</ScrollFadeLine>
            <ScrollFadeLine direction="left">flagships</ScrollFadeLine>
            <ScrollFadeLine direction="right">for</ScrollFadeLine>
            <ScrollFadeLine direction="left">serious</ScrollFadeLine>
            <ScrollFadeLine direction="right">brands.</ScrollFadeLine>
          </h1>
          <p className="whero__sub">
            Selected websites, platforms, and launch systems shaped with the discipline of a premium design firm.
          </p>
          <div className="whero__actions">
            <a href="#projects" className="whero__cta whero__cta--primary">
              View work
            </a>
            <a href={CTA_HREF} className="whero__cta whero__cta--secondary cta-with-tooltip cta-with-tooltip--above" data-tooltip="get a reservation in under 3 clicks">
              Free consultation
            </a>
          </div>
        </div>

        <div className="whero__gallery" aria-label="Selected project previews">
          <figure className="whero__plate whero__plate--main">
            <img src="/work/project-houseof11.png" alt="House of Eleven project preview" />
          </figure>
          <figure className="whero__plate whero__plate--top">
            <img src="/work/project-covspace.png" alt="Covspace project preview" />
          </figure>
          <figure className="whero__plate whero__plate--bottom">
            <img src="/work/project-ronspire.png" alt="Ronspire project preview" />
          </figure>
        </div>
      </div>
    </section>
  );
}
