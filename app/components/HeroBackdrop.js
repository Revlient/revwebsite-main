// Cinematic warm-torus hero backdrop — CSS recreation of an uploaded
// reference (warm orange ring / eclipse on deep black). Pure CSS,
// stacked radial gradients form the ring + inner hole + specular
// rim; a slow conic shimmer adds shine; an atmospheric warm spill
// fades into the dark left; a top/bottom + left vignette keeps hero
// text legible. No new deps, no WebGL. Reduced-motion settles it.
export default function HeroBackdrop() {
  return (
    <div className="herobd" aria-hidden="true">
      <div className="herobd__atmosphere" />
      <div className="herobd__torus" />
      <div className="herobd__shimmer" />
      <div className="herobd__vignette" />
    </div>
  );
}
