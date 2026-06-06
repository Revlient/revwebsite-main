"use client";

import { useEffect, useRef } from "react";
import { CTA_HREF } from "../lib/site";

/* Home hero — fullscreen looping video + staggered giant headline
   words + four stat callouts. Adapted from a "securify"-style brief,
   re-framed for Revlient as a high-conversion digital engineering
   firm. The global <Nav /> covers the top bar; no internal nav.
   PROOF RULE: stat numbers are placeholder "TODO" until verified. */

const HERO_VIDEO = "/bg_vid1.mp4";
  // "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4";

export default function CinematicHero() {
  const ctaRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = null;

    const onMouseMove = (e) => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        targetX = 0;
        targetY = 0;
        return;
      }

      const rect = cta.getBoundingClientRect();
      const ctaX = rect.left + rect.width / 2;
      const ctaY = rect.top + rect.height / 2;

      // Distance between cursor and button center
      const dx = e.clientX - ctaX;
      const dy = e.clientY - ctaY;
      const distance = Math.hypot(dx, dy);

      // Magnetic attraction zone: 90px
      const radius = 90;

      if (distance < radius) {
        // Pull strength (moves button 35% of the distance to the cursor)
        const pull = 0.35;
        targetX = dx * pull;
        targetY = dy * pull;
      } else {
        // Return smoothly to baseline position
        targetX = 0;
        targetY = 0;
      }
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      const isMobile = window.innerWidth <= 768;

      if (!isMobile) {
        // Smooth interpolation (lerp) for spring-like deceleration
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        cta.style.transform = `translate3d(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px), 0)`;
      } else {
        // Reset transform on mobile to let CSS absolute position rules take over
        currentX = 0;
        currentY = 0;
        cta.style.transform = "";
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    cta.addEventListener("mouseleave", onMouseLeave, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (cta) cta.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Slow down background video playback for a more cinematic feel
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const setRate = () => {
      try {
        // Set target playback rate (0.7 = 70% speed). Adjust as needed.
        v.playbackRate = 0.7;
      } catch (e) {
        // Ignore — some platforms may throw when setting before metadata
      }
    };

    // Ensure rate is applied after metadata loads and on attach
    setRate();
    v.addEventListener("loadedmetadata", setRate, { passive: true });

    return () => {
      v.removeEventListener("loadedmetadata", setRate);
    };
  }, []);

  return (
    <section className="cinhero" aria-label="Hero">
      <video
        ref={videoRef}
        className="cinhero__video"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <h1 className="cinhero__title" aria-label="we craft digital legacies">
        <span className="cinhero__w cinhero__w--1">WE</span>
        <span className="cinhero__w cinhero__w--2">CRAFT</span>
        <span className="cinhero__w cinhero__w--3">DIGITAL</span>
        <span className="cinhero__w cinhero__w--4">LEGACIES.</span>
      </h1>
      <p className="cinhero__desc">
        we partner with serious businesses to design, engineer
        and ship the digital systems that move them forward.
      </p>

      <a ref={ctaRef} href={CTA_HREF} className="cinhero__cta">
        <span>Start a project</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>

      <div className="cinhero__fade" aria-hidden="true" />
    </section>
  );
}
