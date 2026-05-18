"use client";

import dynamic from "next/dynamic";

// Lazy-load the WebGL shader client-side only. ssr:false keeps the
// canvas/WebGL off the server render so the homepage still prerenders
// static and the shader bundle stays off the critical path.
const GrainShader = dynamic(() => import("./GrainShader"), {
  ssr: false,
  loading: () => null,
});

export default function GradientBackground({ className = "", style }) {
  return (
    <div className={className} style={style} aria-hidden="true">
      <GrainShader />
    </div>
  );
}
