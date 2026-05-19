// Animated fintech/SaaS hero backdrop — BACKGROUND ONLY (the hero
// keeps its own content). Pure CSS, continuously in motion: deep
// indigo-black base, drifting purple/blue ambient glows, a pulsing
// centre beam, sweeping light rays, a slowly moving grid, drifting
// haze + particles, film grain and a soft vignette. No WebGL / no
// motion libs (off the critical path, GPU-friendly), fully static-
// rendered. prefers-reduced-motion settles it to a still frame.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__base" />
      <div className="herobd__glow herobd__glow--a" />
      <div className="herobd__glow herobd__glow--b" />
      <div className="herobd__grid" />
      <div className="herobd__rays" />
      <div className="herobd__beam" />
      <div className="herobd__haze" />
      <div className="herobd__particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="herobd__grain" />
      <div className="herobd__vignette" />
    </div>
  );
}
