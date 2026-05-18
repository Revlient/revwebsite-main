"use client";

import { useEffect, useState } from "react";
import { GrainGradient } from "@paper-design/shaders-react";

// The actual WebGL grain-gradient shader. Animated (speed=1); honours
// prefers-reduced-motion by freezing it (speed=0), consistent with the
// site's motion contract.
export default function GrainShader() {
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const mq =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) setSpeed(0);
  }, []);

  return (
    <GrainGradient
      style={{ height: "100%", width: "100%" }}
      colorBack="hsl(0, 0%, 0%)"
      softness={0.76}
      intensity={0.45}
      noise={0}
      shape="corners"
      offsetX={0}
      offsetY={0}
      scale={1}
      rotation={0}
      speed={speed}
      colors={[
        "hsl(14, 100%, 57%)",
        "hsl(45, 100%, 51%)",
        "hsl(340, 82%, 52%)",
      ]}
    />
  );
}
