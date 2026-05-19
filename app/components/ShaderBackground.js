"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Lazy-load the WebGL shader client-side only (ssr:false) so the
// homepage still prerenders static. Mounts a full viewport before the
// section arrives and stays mounted until a viewport past it, so the
// animation runs continuously the whole time the section is scrolled
// through (no blank/reset mid-scroll); it still frees the RAF + WebGL
// once you're well away.
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
      { rootMargin: "100% 0px 100% 0px" }
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
