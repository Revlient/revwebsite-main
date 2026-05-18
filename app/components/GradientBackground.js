"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Lazy-load the WebGL shader client-side only. ssr:false keeps the
// canvas/WebGL off the server render so the homepage still prerenders
// static and the shader bundle stays off the critical path.
const GrainShader = dynamic(() => import("./GrainShader"), {
  ssr: false,
  loading: () => null,
});

export default function GradientBackground({ className = "", style }) {
  const ref = useRef(null);
  // Only mount the shader while its section is near the viewport. When
  // the user scrolls away it fully unmounts (RAF + WebGL context freed),
  // so it never competes with the hero shader — at most one runs at once.
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
      {active && <GrainShader />}
    </div>
  );
}
