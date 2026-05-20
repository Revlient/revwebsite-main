// Hero backdrop = the uploaded reference image as the background,
// with a subtle vignette + left scrim for hero text legibility. Pure
// CSS, no motion libs; the image lives at /public/hero-bg.jpg and is
// shipped by Next as a static asset.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__image" />
      <div className="herobd__vignette" />
    </div>
  );
}
