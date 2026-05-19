"use client";

// Progressive (graduated) blur edge. Ported from a motion/react + Tailwind
// component to plain JS/CSS — same layered-mask + backdrop-filter math,
// no dependency. Used to soften the marquee's left/right edges.
const GRADIENT_ANGLES = { top: 0, right: 90, bottom: 180, left: 270 };

export default function ProgressiveBlur({
  direction = "left",
  blurLayers = 8,
  blurIntensity = 1,
  className = "",
  style,
}) {
  const layers = Math.max(blurLayers, 2);
  const segment = 1 / (blurLayers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <div
      className={className}
      style={{ position: "absolute", ...style }}
      aria-hidden="true"
    >
      {Array.from({ length: layers }).map((_, i) => {
        const stops = [i, i + 1, i + 2, i + 3]
          .map((p) => p * segment)
          .map(
            (pos, idx) =>
              `rgba(255,255,255,${idx === 1 || idx === 2 ? 1 : 0}) ${
                pos * 100
              }%`
          );
        const gradient = `linear-gradient(${angle}deg, ${stops.join(", ")})`;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${i * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${i * blurIntensity}px)`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}
