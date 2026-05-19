"use client";

import dynamic from "next/dynamic";

// Lazy-load the particle field client-side only so it stays off the
// server render (homepage keeps prerendering static) and off the
// critical path.
const Sparkles = dynamic(
  () => import("./Sparkles").then((m) => m.Sparkles),
  { ssr: false, loading: () => null }
);

export default function SparklesGlow() {
  return (
    <div className="trust__sparkles">
      <Sparkles color="#ffffff" density={650} size={1.3} speed={1} />
    </div>
  );
}
