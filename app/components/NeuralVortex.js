"use client";

import { useEffect, useRef } from "react";

/* Interactive neural-vortex WebGL background. Adapted from a
   shadcn/Tailwind/TS demo to this project's stack: raw WebGL only (no
   dependency), scoped to its parent section (not fixed full-viewport),
   and held to the site's performance/accessibility contract — the demo
   honoured none of it:
   - devicePixelRatio capped and total pixels clamped (~1.44M)
   - prefers-reduced-motion: a single static frame, no RAF loop
   - pauses when the tab is hidden (IntersectionObserver mount/unmount is
     handled by the wrapper, so this only runs while on screen)
   - pointer mapped to the canvas (not the window); listeners cleaned up
   - WebGL program/shaders/buffer disposed on unmount
   Shader source is unchanged from the original. */

const VERT = `
  precision mediump float;
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer_position;
  uniform float u_scroll_progress;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float scale = 8.;
    for (int j = 0; j < 15; j++) {
      uv = rotate(uv, 1.);
      sine_acc = rotate(sine_acc, 1.);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer) + 2.4 * p;
      res += (.5 + .5 * cos(layer)) / scale;
      scale *= (1.2);
    }
    return res.x + res.y;
  }

  void main() {
    vec2 uv = .5 * vUv;
    uv.x *= u_ratio;
    vec2 pointer = vUv - u_pointer_position;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0., 1.);
    p = .5 * pow(1. - p, 2.);
    float t = .001 * u_time;
    vec3 color = vec3(0.);
    float noise = neuro_shape(uv, t, p);
    noise = 1.2 * pow(noise, 3.);
    noise += pow(noise, 10.);
    noise = max(.0, noise - .5);
    noise *= (1. - length(vUv - .5));
    color = vec3(0.10, 0.21, 0.85);
    color = mix(color, vec3(0.29, 0.47, 1.0), 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
    color += vec3(0.04, 0.10, 0.45) * sin(2.0 * u_scroll_progress + 1.5);
    color = color * noise;
    gl_FragColor = vec4(color, noise);
  }
`;

const MAX_PIXELS = 1440000;

export default function NeuralVortex() {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (src, type) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(VERT, gl.VERTEX_SHADER);
    const fs = compile(FRAG, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRatio = gl.getUniformLocation(program, "u_ratio");
    const uPointer = gl.getUniformLocation(program, "u_pointer_position");
    const uScroll = gl.getUniformLocation(program, "u_scroll_progress");

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      // Clamp total pixels so big / hi-dpi screens stay smooth.
      const area = w * h * dpr * dpr;
      if (area > MAX_PIXELS) dpr *= Math.sqrt(MAX_PIXELS / area);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uRatio, canvas.width / canvas.height);
    };
    resize();

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    const drawFrame = (timeMs) => {
      pointer.current.x +=
        (pointer.current.tX - pointer.current.x) * 0.2;
      pointer.current.y +=
        (pointer.current.tY - pointer.current.y) * 0.2;
      const rect = canvas.getBoundingClientRect();
      gl.uniform1f(uTime, timeMs);
      gl.uniform2f(
        uPointer,
        pointer.current.x / Math.max(1, rect.width),
        1 - pointer.current.y / Math.max(1, rect.height)
      );
      gl.uniform1f(
        uScroll,
        window.pageYOffset / (2 * window.innerHeight)
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      drawFrame(performance.now());
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
      drawFrame(8000); // settled static frame
    } else {
      start();
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.tX = e.clientX - rect.left;
      pointer.current.tY = e.clientY - rect.top;
    };
    const onTouch = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        pointer.current.tX = e.touches[0].clientX - rect.left;
        pointer.current.tY = e.touches[0].clientY - rect.top;
      }
    };
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      document.addEventListener("visibilitychange", onVis);
    }

    return () => {
      stop();
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
