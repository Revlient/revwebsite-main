"use client";

import { useEffect, useId, useRef } from "react";

/* Ethereal shadow background. Adapted from a shadcn/Tailwind/TS +
   framer-motion component to this project's stack: the hue-rotate loop
   that drives the SVG displacement filter is a plain requestAnimationFrame
   loop (no framer-motion). SSR-safe; honours prefers-reduced-motion
   (renders a static frame, no loop). Self-hosted SVG mask + noise
   (Framer's CDN is unreachable / not ours to hotlink). */

function mapRange(v, a, b, c, d) {
  if (a === b) return c;
  return c + ((v - a) / (b - a)) * (d - c);
}

export default function EtherealShadow({
  color = "rgba(43, 95, 255, 0.55)",
  animation = { scale: 60, speed: 55 },
  noise = { opacity: 0.45, scale: 1 },
  sizing = "fill",
  className = "",
  style,
}) {
  const rawId = useId().replace(/:/g, "");
  const id = `ether-${rawId}`;
  const matrixRef = useRef(null);

  const animationEnabled = !!animation && animation.scale > 0;
  const displacementScale = animation
    ? mapRange(animation.scale, 1, 100, 20, 100)
    : 0;
  const animationDuration = animation
    ? mapRange(animation.speed, 1, 100, 1000, 50)
    : 1;

  useEffect(() => {
    const node = matrixRef.current;
    if (!node || !animationEnabled) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.setAttribute("values", "180");
      return;
    }

    // Original drives hueRotate 0 -> 360 over (animationDuration / 25)s.
    const loopMs = (animationDuration / 25) * 1000;
    let raf = 0;
    let start = null;

    const tick = (t) => {
      if (start === null) start = t;
      const phase = ((t - start) % loopMs) / loopMs;
      node.setAttribute("values", String(phase * 360));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        start = null;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [animationEnabled, animationDuration]);

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: -displacementScale,
          filter: animationEnabled ? `url(#${id}) blur(4px)` : "none",
        }}
      >
        {animationEnabled && (
          <svg
            style={{ position: "absolute", width: 0, height: 0 }}
            aria-hidden="true"
          >
            <defs>
              <filter id={id}>
                <feTurbulence
                  result="undulation"
                  numOctaves="2"
                  baseFrequency={`${mapRange(
                    animation.scale,
                    0,
                    100,
                    0.001,
                    0.0005
                  )},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  ref={matrixRef}
                  in="undulation"
                  type="hueRotate"
                  values="180"
                />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={displacementScale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            maskImage: "url('/ethereal/mask.svg')",
            WebkitMaskImage: "url('/ethereal/mask.svg')",
            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
            WebkitMaskSize: sizing === "stretch" ? "100% 100%" : "cover",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/ethereal/noise.svg')",
            backgroundSize: `${noise.scale * 180}px`,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
          }}
        />
      )}
    </div>
  );
}
