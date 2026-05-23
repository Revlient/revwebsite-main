"use client";

import { useMemo } from "react";

/* Deep-space nebula backdrop scoped to the testimonial section.
   Four slow-drifting coloured cloud blobs (CSS radial-gradients +
   filter blur) layered over a faint coordinate grid + a starfield
   of twinkling dots. All CSS animations — no rAF, no canvas. */

const N_STARS = 64;

export default function NebulaBackdrop() {
  // Deterministic positions/timings so SSR + hydration agree.
  const stars = useMemo(() => {
    const out = [];
    for (let i = 0; i < N_STARS; i++) {
      out.push({
        top: (i * 53 + 7) % 100,
        left: (i * 71 + 11) % 100,
        size: 0.8 + ((i * 0.37) % 1.6),
        dur: 2.5 + ((i * 0.83) % 4.5),
        delay: -((i * 1.13) % 6),
        tint:
          i % 13 === 0 ? "violet" : i % 17 === 0 ? "blue" : "white",
      });
    }
    return out;
  }, []);

  return (
    <div className="nebula" aria-hidden="true">
      <div className="nebula__grid" />
      <div className="nebula__cloud nebula__cloud--a" />
      <div className="nebula__cloud nebula__cloud--b" />
      <div className="nebula__cloud nebula__cloud--c" />
      <div className="nebula__cloud nebula__cloud--d" />
      <div className="nebula__stars">
        {stars.map((s, i) => (
          <span
            key={i}
            className={`nebula__star nebula__star--${s.tint}`}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
