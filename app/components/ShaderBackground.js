"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Lazy-load the WebGL shader client-side only (ssr:false) so the
// homepage still prerenders static. Only mounts while the section is
// near the viewport — it fully unmounts (RAF + WebGL freed) when
// scrolled away, so it never competes with the hero shader.
const ChatShader = dynamic(() => import("./ChatShader"), {
  ssr: false,
  loading: () => null,
});

export default function ShaderBackground({ className = "", style }) {
  const ref = useRef(null);
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
      {active && <ChatShader />}
    </div>
  );
}
