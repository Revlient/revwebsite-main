"use client";

import { useEffect, useRef, useState } from "react";

/* Cosmic parallax background. Adapted from a Tailwind/TS demo to this
   project's stack: plain JS + CSS, no deps. The classic box-shadow
   starfield (3 parallax layers) + a glowing horizon + dark planet,
   scoped to its container (not the viewport). Its built-in title is
   omitted — the section already has its own centered heading. Star
   field is transform-only animation; the global reduced-motion rule
   freezes it. */

function starShadow(count) {
  const s = [];
  for (let i = 0; i < count; i++) {
    s.push(
      `${Math.floor(Math.random() * 2000)}px ${Math.floor(
        Math.random() * 2000
      )}px #FFF`
    );
  }
  return s.join(", ");
}

export default function CosmicBackground() {
  const [s, setS] = useState({ a: "", b: "", c: "" });
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    // Reduced counts vs the original (700/200/100) for perf.
    setS({
      a: starShadow(480),
      b: starShadow(160),
      c: starShadow(80),
    });
  }, []);

  return (
    <div className="morph__bg cosmic" aria-hidden="true">
      <div className="cosmic__stars cosmic__stars--s" style={{ "--s": s.a }} />
      <div className="cosmic__stars cosmic__stars--m" style={{ "--s": s.b }} />
      <div className="cosmic__stars cosmic__stars--l" style={{ "--s": s.c }} />
      <div className="cosmic__horizon" />
      <div className="cosmic__earth" />
    </div>
  );
}
