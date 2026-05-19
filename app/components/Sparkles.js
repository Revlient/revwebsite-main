"use client";

import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/* Sparkles particle field. Adapted from a shadcn/Tailwind/TS component
   to this project's stack (JS, plain CSS). Honours prefers-reduced-
   motion (static dots, no movement/opacity animation) and keeps the
   particle count modest so it stays smooth. */
export function Sparkles({
  className,
  size = 1.2,
  density = 700,
  speed = 1,
  opacity = 1,
  opacitySpeed = 3,
  color = "#ffffff",
  background = "transparent",
}) {
  const [isReady, setIsReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const id = useId();

  useEffect(() => {
    const mq =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) setReduced(true);
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) return null;

  const options = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 60,
    particles: {
      color: { value: color },
      move: {
        enable: !reduced,
        direction: "none",
        speed: { min: speed / 10, max: speed },
        straight: false,
      },
      number: { value: reduced ? Math.round(density / 2) : density },
      opacity: {
        value: { min: opacity / 10, max: opacity },
        animation: {
          enable: !reduced,
          sync: false,
          speed: opacitySpeed,
        },
      },
      size: { value: { min: size / 2.5, max: size } },
    },
    detectRetina: true,
  };

  return <Particles id={id} options={options} className={className} />;
}
