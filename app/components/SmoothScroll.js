"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll is a client component that initializes Lenis smooth scrolling.
 * It manages the requestAnimationFrame loop and properly cleans up when unmounted.
 */
export default function SmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Instantiate Lenis with optimal performance settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 2. Connect Lenis updates to requestAnimationFrame
    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // 3. Cleanup on component unmount to prevent memory leaks
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = undefined;
      lenisRef.current = null;
    };
  }, []);

  return null;
}
