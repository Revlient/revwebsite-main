// Hero backdrop = the uploaded reference image with a very subtle
// breath + a slowly rotating warm conic shimmer (screen blend) over
// the torus area, plus the legibility scrim. Pure CSS, no motion
// libs; reduced-motion settles to a still frame.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__image" />
      <div className="herobd__shimmer" />
      <div className="herobd__vignette" />
    </div>
  );
}
