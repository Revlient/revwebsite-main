// Cinematic hero backdrop — BACKGROUND ONLY (no text/UI). Pure CSS:
// matte-black left, a strong volumetric orange/gold beam on the
// right that diffuses into the dark, drifting haze, faint floating
// particles, film grain and a heavy vignette. No WebGL (kept off the
// critical path / no lag), fully server-rendered and static.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__base" />
      <div className="herobd__halo" />
      <div className="herobd__beam" />
      <div className="herobd__core" />
      <div className="herobd__haze" />
      <div className="herobd__particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="herobd__grain" />
      <div className="herobd__vignette" />
    </div>
  );
}
