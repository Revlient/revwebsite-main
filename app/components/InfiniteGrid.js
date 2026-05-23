"use client";

import { useEffect, useRef } from "react";

/* Animated infinite-grid backdrop — adapted from a framer-motion
   spec into a plain rAF loop + CSS variables. Two grid layers (a
   faint always-visible base and a brighter reveal layer masked to
   a 300px circle that follows the cursor) plus three ambient
   blurred radial blobs. The rAF loop pauses offscreen or when the
   tab is hidden. Driven entirely by CSS variables so the grid layers
   themselves are pointer-events: none — mouse tracking attaches to
   the document so the layer above (the hero video) still receives
   pointer events. */

export default function InfiniteGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const node = containerRef.current;
    if (!node) return undefined;

    let offsetX = 0;
    let offsetY = 0;
    const speed = 0.5;
    let raf = 0;
    let inView = true;
    let visible = !document.hidden;

    const tick = () => {
      if (inView && visible) {
        offsetX = (offsetX + speed) % 40;
        offsetY = (offsetY + speed) % 40;
        node.style.setProperty("--igx", `${offsetX}px`);
        node.style.setProperty("--igy", `${offsetY}px`);
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--imx", `${e.clientX - rect.left}px`);
      node.style.setProperty("--imy", `${e.clientY - rect.top}px`);
    };
    const onVis = () => {
      visible = !document.hidden;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    let io = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          inView = entries[0] ? entries[0].isIntersecting : true;
        },
        { rootMargin: "200px" }
      );
      io.observe(node);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="igrid" aria-hidden="true">
      <span className="igrid__layer igrid__layer--base" />
      <span className="igrid__layer igrid__layer--reveal" />
      <span className="igrid__blob igrid__blob--orange" />
      <span className="igrid__blob igrid__blob--purple" />
      <span className="igrid__blob igrid__blob--blue" />
    </div>
  );
}
