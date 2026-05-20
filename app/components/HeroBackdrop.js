import HeroChip from "./HeroChip";

// Hero backdrop = an animated microchip with circuit traces and
// flowing current loop, anchored to the right. A soft blue halo
// behind it gives atmosphere; a left-biased vignette keeps the
// hero text legible. Pure CSS animations, no motion libs.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__halo" />
      <HeroChip />
      <div className="herobd__vignette" />
    </div>
  );
}
