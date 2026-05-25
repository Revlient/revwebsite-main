"use client";

/* Soft blue fluid backdrop for the AiPromptSection chatbox on the
   light home redesign. Pure CSS — three SVG blobs slowly morphing
   their border-radius and drifting, blended into the white surface.
   Reduced-motion settles them. */

export default function WaterBlobBackdrop() {
  return (
    <div className="h2-water" aria-hidden="true">
      <div className="h2-water__blob h2-water__blob--a" />
      <div className="h2-water__blob h2-water__blob--b" />
      <div className="h2-water__blob h2-water__blob--c" />
    </div>
  );
}
