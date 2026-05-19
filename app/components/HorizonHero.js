"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/* Cinematic scroll-flythrough hero for the standalone Studio landing.
   Adapted from a gsap/Tailwind/TS demo to this project's stack: no
   gsap (the entrance is a CSS reveal; the camera is driven by a plain
   scroll listener, as in the original). three is already installed;
   EffectComposer/Bloom ship with it (addons, no extra dep).

   Perf/accessibility contract: star count cut 15k -> ~2.1k, DPR capped
   1.5, prefers-reduced-motion renders one static frame (no loop, no
   scroll camera), the loop pauses when the tab is hidden, and all GPU
   resources are disposed on unmount. Copy localized to Revlient. */

const SECTIONS = [
  { title: "REVLIENT", l1: "A creative studio.", l2: "We craft digital legacies." },
  { title: "THE STUDIO", l1: "Small on purpose. Senior on purpose.", l2: "The people who pitch it are the people who make it." },
  { title: "LEGACIES", l1: "Design-grade craft, everywhere —", l2: "built to outlive the launch." },
];
const TOTAL = 2;

export default function HorizonHero() {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState(0);
  const [ready, setReady] = useState(false);
  const refs = useRef({});
  const smooth = useRef({ x: 0, y: 30, z: 100 });

  useEffect(() => {
    const r = refs.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    r.scene = new THREE.Scene();
    r.scene.fog = new THREE.FogExp2(0x000000, 0.00025);
    r.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    r.camera.position.set(0, 20, 100);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return;
    }
    r.renderer = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    r.composer = new EffectComposer(renderer);
    r.composer.addPass(new RenderPass(r.scene, r.camera));
    r.composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.7,
        0.4,
        0.85
      )
    );

    r.stars = [];
    const starCount = 700; // was 5000 x3
    for (let i = 0; i < 3; i++) {
      const g = new THREE.BufferGeometry();
      const pos = new Float32Array(starCount * 3);
      const col = new Float32Array(starCount * 3);
      const sz = new Float32Array(starCount);
      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        pos[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[j * 3 + 2] = radius * Math.cos(phi);
        const c = new THREE.Color();
        const pick = Math.random();
        if (pick < 0.7) c.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (pick < 0.9) c.setHSL(0.6, 0.5, 0.8);
        else c.setHSL(0.62, 0.6, 0.75);
        col[j * 3] = c.r;
        col[j * 3 + 1] = c.g;
        col[j * 3 + 2] = c.b;
        sz[j] = Math.random() * 2 + 0.5;
      }
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("color", new THREE.BufferAttribute(col, 3));
      g.setAttribute("size", new THREE.BufferAttribute(sz, 1));
      const m = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `attribute float size;attribute vec3 color;varying vec3 vColor;uniform float time;uniform float depth;
          void main(){vColor=color;vec3 p=position;float a=time*0.05*(1.0-depth*0.3);mat2 R=mat2(cos(a),-sin(a),sin(a),cos(a));p.xy=R*p.xy;vec4 mv=modelViewMatrix*vec4(p,1.0);gl_PointSize=size*(300.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `varying vec3 vColor;void main(){float d=length(gl_PointCoord-vec2(0.5));if(d>0.5)discard;gl_FragColor=vec4(vColor,1.0-smoothstep(0.0,0.5,d));}`,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const s = new THREE.Points(g, m);
      r.scene.add(s);
      r.stars.push(s);
    }

    // nebula
    {
      const g = new THREE.PlaneGeometry(8000, 4000, 60, 60);
      const m = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x16215c) },
          color2: { value: new THREE.Color(0x2b5fff) },
          opacity: { value: 0.28 },
        },
        vertexShader: `varying vec2 vUv;varying float vE;uniform float time;void main(){vUv=uv;vec3 p=position;float e=sin(p.x*0.01+time)*cos(p.y*0.01+time)*20.0;p.z+=e;vE=e;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
        fragmentShader: `uniform vec3 color1;uniform vec3 color2;uniform float opacity;uniform float time;varying vec2 vUv;varying float vE;void main(){float f=sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);vec3 c=mix(color1,color2,f*0.5+0.5);float al=opacity*(1.0-length(vUv-0.5)*2.0);al*=1.0+vE*0.01;gl_FragColor=vec4(c,al);}`,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      r.nebula = new THREE.Mesh(g, m);
      r.nebula.position.z = -1050;
      r.scene.add(r.nebula);
    }

    // mountains
    r.mountains = [];
    [
      { d: -50, h: 60, c: 0x0a0e1a, o: 1 },
      { d: -100, h: 80, c: 0x0d1430, o: 0.8 },
      { d: -150, h: 100, c: 0x12204a, o: 0.6 },
      { d: -200, h: 120, c: 0x1a2f63, o: 0.4 },
    ].forEach((layer, index) => {
      const pts = [];
      for (let i = 0; i <= 50; i++) {
        const x = (i / 50 - 0.5) * 1000;
        const y =
          Math.sin(i * 0.1) * layer.h +
          Math.sin(i * 0.05) * layer.h * 0.5 +
          Math.random() * layer.h * 0.2 - 100;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(5000, -300));
      pts.push(new THREE.Vector2(-5000, -300));
      const mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(new THREE.Shape(pts)),
        new THREE.MeshBasicMaterial({
          color: layer.c,
          transparent: true,
          opacity: layer.o,
          side: THREE.DoubleSide,
        })
      );
      mesh.position.z = layer.d;
      mesh.position.y = layer.d;
      mesh.userData = { baseZ: layer.d, index };
      r.scene.add(mesh);
      r.mountains.push(mesh);
    });
    r.locations = r.mountains.map((m) => m.position.z);

    let raf = 0;
    let running = false;
    const animate = () => {
      const t = Date.now() * 0.001;
      r.stars.forEach((s) => (s.material.uniforms.time.value = t));
      if (r.nebula) r.nebula.material.uniforms.time.value = t * 0.5;
      if (r.targetCameraX !== undefined) {
        smooth.current.x += (r.targetCameraX - smooth.current.x) * 0.05;
        smooth.current.y += (r.targetCameraY - smooth.current.y) * 0.05;
        smooth.current.z += (r.targetCameraZ - smooth.current.z) * 0.05;
        r.camera.position.x = smooth.current.x + Math.sin(t * 0.1) * 2;
        r.camera.position.y = smooth.current.y + Math.cos(t * 0.15) * 1;
        r.camera.position.z = smooth.current.z;
        r.camera.lookAt(0, 10, -600);
      }
      r.mountains.forEach((mt, i) => {
        const pf = 1 + i * 0.5;
        mt.position.x = Math.sin(t * 0.1) * 2 * pf;
        mt.position.y = 50 + Math.cos(t * 0.15) * 1 * pf;
      });
      r.composer.render();
      raf = requestAnimationFrame(animate);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    setReady(true);
    if (reduced) {
      r.composer.render();
    } else start();

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => {
      r.camera.aspect = window.innerWidth / window.innerHeight;
      r.camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      r.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      setProgress(p);
      const ns = Math.floor(p * TOTAL);
      setSection(ns);
      const tp = p * TOTAL;
      const sp = tp % 1;
      const cam = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];
      const cur = cam[ns] || cam[0];
      const nxt = cam[ns + 1] || cur;
      r.targetCameraX = cur.x + (nxt.x - cur.x) * sp;
      r.targetCameraY = cur.y + (nxt.y - cur.y) * sp;
      r.targetCameraZ = cur.z + (nxt.z - cur.z) * sp;
      r.mountains.forEach((mt, i) => {
        mt.position.z = p > 0.7 ? 600000 : r.locations[i];
      });
      if (r.nebula && r.mountains[3])
        r.nebula.position.z = r.mountains[3].position.z;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      r.stars.forEach((s) => {
        s.geometry.dispose();
        s.material.dispose();
      });
      r.mountains.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      if (r.nebula) {
        r.nebula.geometry.dispose();
        r.nebula.material.dispose();
      }
      renderer.dispose();
    };
  }, []);

  const sec = SECTIONS[Math.min(section + 1, SECTIONS.length - 1)];

  return (
    <div className="horizon">
      <canvas ref={canvasRef} className="horizon__canvas" />

      <div className={`horizon__hero ${ready ? "is-in" : ""}`}>
        <h1 className="horizon__title">{SECTIONS[0].title}</h1>
        <div className="horizon__sub">
          <p>{SECTIONS[0].l1}</p>
          <p>{SECTIONS[0].l2}</p>
        </div>
        <a href="/#start" className="horizon__cta">
          Start a project
        </a>
      </div>

      <div className={`horizon__progress ${ready ? "is-in" : ""}`}>
        <span className="horizon__scrolltxt">SCROLL</span>
        <span className="horizon__track">
          <span
            className="horizon__fill"
            style={{ height: `${progress * 100}%` }}
          />
        </span>
        <span className="horizon__count">
          {String(section).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      <div className="horizon__scroller" aria-hidden="true">
        {SECTIONS.slice(1).map((s) => (
          <section className="horizon__panel" key={s.title}>
            <h2 className="horizon__title">{s.title}</h2>
            <div className="horizon__sub">
              <p>{s.l1}</p>
              <p>{s.l2}</p>
            </div>
          </section>
        ))}
      </div>

      {/* live current copy for assistive tech / no-3D */}
      <span className="sr-only">
        {sec.title}. {sec.l1} {sec.l2}
      </span>
    </div>
  );
}
