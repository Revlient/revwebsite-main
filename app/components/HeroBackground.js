"use client";

import dynamic from "next/dynamic";

// Lazy-load the Three.js scene on the client only. ssr:false keeps WebGL
// and the three bundle off the server render and out of the critical path;
// the hero text paints immediately, the canvas fades in when ready.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function HeroBackground() {
  return <HeroCanvas />;
}
