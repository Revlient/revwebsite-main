"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* Hero background — animated GLSL shader (RGB-split horizontal wave field).

   Adapted from a shadcn/Tailwind/TS demo to this project's stack
   (JS, plain CSS). Sized to the hero box (not the full viewport) and
   held to the hero's performance/accessibility contract the raw
   component ignored:
   - devicePixelRatio capped at 1.75 (raw used full DPR)
   - prefers-reduced-motion: one static frame, no animation loop
   - animation pauses when the tab is hidden or the hero scrolls off-screen
   - WebGL failure is swallowed so the CSS gradient still carries the hero
   - all GPU resources disposed on unmount

   The fragment shader source is unchanged from the original; the vertex
   shader uses ShaderMaterial's built-in `position` attribute (avoids the
   RawShaderMaterial GLSL-version pitfall on a WebGL2 context). */

const vertexShader = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`;

const fragmentShader = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform float xScale;
  uniform float yScale;
  uniform float distortion;

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float d = length(p) * distortion;

    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
    float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
    float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export default function HeroShader() {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

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
      // No WebGL — the hero's CSS gradient + scrim already carry it.
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(new THREE.Color(0x000000));

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      resolution: { value: new THREE.Vector2() },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    container.appendChild(renderer.domElement);

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      );
    };

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        renderer.render(scene, camera);
      });
    };

    resize();
    window.addEventListener("resize", onResize, false);

    let raf = 0;
    let running = false;

    const tick = () => {
      uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // First frame ASAP, then fade the canvas in.
    renderer.render(scene, camera);
    requestAnimationFrame(() => setReady(true));

    if (reduced) {
      // Static, settled frame — no loop.
      uniforms.time.value = 10.0;
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
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
      className={`hero__canvas ${ready ? "is-ready" : ""}`}
      aria-hidden="true"
    />
  );
}
