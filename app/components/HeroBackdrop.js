// Hero backdrop = the uploaded reference image with subtle breath,
// a slow warm conic shimmer, three left-to-right "current" flows
// sweeping across the field, and the legibility scrim. Pure CSS,
// no motion libs; reduced-motion settles every loop.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__image" />
      <div className="herobd__shimmer" />
      <div className="herobd__flow">
        <span className="herobd__flowline herobd__flowline--1" />
        <span className="herobd__flowline herobd__flowline--2" />
        <span className="herobd__flowline herobd__flowline--3" />
      </div>
      <div className="herobd__vignette" />
    </div>
  );
}
