"use client";

import { useEffect, useRef } from "react";

/* Custom JS crossfade per spec: rAF-driven opacity fade, reads
   current opacity so each new fade resumes from where the previous
   one left off. Native loop attribute OFF — we restart on ended. */
const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before native end

export default function FadingVideo({ src, className = "", style }) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const fadeTo = (target, duration = FADE_MS) => {
      cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const from = parseFloat(v.style.opacity || "0") || 0;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        v.style.opacity = String(from + (target - from) * t);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const onLoadedData = () => {
      v.style.opacity = "0";
      v.play().catch(() => {});
      fadeTo(1);
    };

    const onTimeUpdate = () => {
      if (fadingOutRef.current) return;
      if (!Number.isFinite(v.duration)) return;
      const remaining = v.duration - v.currentTime;
      if (remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    v.addEventListener("loadeddata", onLoadedData);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(rafRef.current);
      v.removeEventListener("loadeddata", onLoadedData);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={{ opacity: 0, ...(style || {}) }}
      src={src}
      autoPlay
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
    />

  );
}
