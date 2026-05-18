"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Lazy-load the WebGL canvas client-side only (ssr:false) so it stays
// off the server render and the homepage still prerenders static.
const NeuralVortex = dynamic(() => import("./NeuralVortex"), {
  ssr: false,
  loading: () => null,
});

export default function NeuralVortexBackground({ className = "", style }) {
  const ref = useRef(null);
  // Only mount the shader while its section is near the viewport; it
  // fully unmounts (RAF + WebGL freed) when scrolled away, so it never
  // competes with the hero shader — at most one runs at a time.
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style} aria-hidden="true">
      {active && <NeuralVortex />}
    </div>
  );
}
