// Hero backdrop — Huly-style vertical light pillar. Deep matte black,
// a thin bright blue-white beam rising from a glowing horizon flare,
// volumetric blue haze drifting around the upper field, faint sparks
// rising along the beam, and a top/bottom + left scrim for hero text
// legibility. Pure CSS, no motion libs; reduced-motion settles it.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__halo" />
      <div className="herobd__haze" />
      <div className="herobd__beam" />
      <div className="herobd__flare" />
      <div className="herobd__horizon" />
      <div className="herobd__embers">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="herobd__vignette" />
    </div>
  );
}
