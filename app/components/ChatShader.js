"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Radiating-line shader. Adapted from a shadcn/Tailwind/TS demo to this
   project's stack (JS, plain CSS), scoped to its parent section (not a
   full-viewport div) and held to the site's performance/accessibility
   contract — the raw component honoured none of it:
   - devicePixelRatio capped and total pixels clamped (~1.44M)
   - prefers-reduced-motion: one static frame, no RAF loop
   - pauses when the tab is hidden (off-screen mount/unmount handled by
     the wrapper, so it only runs while visible)
   - resize tracks the container, not the window
   - GL program/geometry/material disposed on unmount
   Shader source is unchanged from the original. */

const VERT = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`;

const FRAG = `
  #define TWO_PI 6.2831853072
  #define PI 3.14159265359

  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time*0.05;
    float lineWidth = 0.002;

    vec3 color = vec3(0.0);
    for(int j = 0; j < 3; j++){
      for(int i=0; i < 5; i++){
        color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
      }
    }

    gl_FragColor = vec4(color[0],color[1],color[2],1.0);
  }
`;

const MAX_PIXELS = 1440000;

export default function ChatShader() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      return; // no WebGL — the section's CSS bg + scrim still carry it
    }

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    container.appendChild(renderer.domElement);

    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const area = w * h * dpr * dpr;
      if (area > MAX_PIXELS) dpr *= Math.sqrt(MAX_PIXELS / area);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      );
    };
    resize();

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(resize);
      ro.observe(container);
    } else {
      window.addEventListener("resize", resize);
    }

    const draw = () => {
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      // A lost GL context throws here every frame; pause instead of
      // spinning, and the contextrestored handler resumes it.
      try {
        draw();
      } catch {
        stop();
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      uniforms.time.value = 10.0;
      renderer.render(scene, camera);
    } else {
      start();
    }

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    const canvas = renderer.domElement;
    const onLost = (e) => {
      e.preventDefault();
      stop();
    };
    const onRestored = () => {
      resize();
      start();
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);

    return () => {
      stop();
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#000",
      }}
    />
  );
}
