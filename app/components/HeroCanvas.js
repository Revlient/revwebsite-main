"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* Restrained hero 3D: a single faceted geometric mark (icosahedron),
   built from individual triangular panels and slowly rotating with gentle
   cursor parallax. Dark with faint blue edges — depth, not decoration.

   Performance & accessibility contract:
   - devicePixelRatio capped at 1.75
   - prefers-reduced-motion: render ONE static frame, no animation loop
   - animation pauses when the tab is hidden or the hero scrolls off screen
   - everything is disposed on unmount

   FUTURE DIRECTION (not wired now): the mark is intentionally assembled
   from separate panels. To perform the "We Craft Digital Legacies" tagline,
   give each panel a start offset/quaternion and lerp it home on load — the
   per-panel loop hook is marked below. */

function buildPanels() {
  // Detail 1 = 80 faces: enough faceting to read as a crafted mark,
  // still trivially cheap to render.
  const source = new THREE.IcosahedronGeometry(1.35, 1);
  const pos = source.attributes.position;
  const group = new THREE.Group();

  const faceMat = new THREE.MeshStandardMaterial({
    color: 0x0c1222,
    roughness: 0.45,
    metalness: 0.35,
    flatShading: true,
    transparent: true,
    opacity: 0.92,
  });

  for (let i = 0; i < pos.count; i += 3) {
    const g = new THREE.BufferGeometry();
    const verts = new Float32Array(9);
    for (let v = 0; v < 3; v++) {
      verts[v * 3] = pos.getX(i + v);
      verts[v * 3 + 1] = pos.getY(i + v);
      verts[v * 3 + 2] = pos.getZ(i + v);
    }
    g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    g.computeVertexNormals();
    const panel = new THREE.Mesh(g, faceMat);
    panel.userData.home = panel.position.clone();
    group.add(panel);
  }

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(source, 18),
    new THREE.LineBasicMaterial({
      color: 0x4a78ff,
      transparent: true,
      opacity: 0.34,
    })
  );
  group.add(edges);

  source.dispose();
  return { group, faceMat };
}

export default function HeroCanvas() {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL — the CSS gradient + scrim already carry the hero.
      return;
    }

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090c, 0.16);

    const camera = new THREE.PerspectiveCamera(
      42,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.4);

    const { group, faceMat } = buildPanels();
    group.position.x = 1.05;
    scene.add(group);

    scene.add(new THREE.AmbientLight(0x33405e, 0.9));
    const key = new THREE.DirectionalLight(0x6f93ff, 1.5);
    key.position.set(3, 2.5, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0x2b5fff, 14, 22);
    rim.position.set(-4, -2, 2);
    scene.add(rim);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const renderOnce = () => renderer.render(scene, camera);

    let raf = 0;
    let running = false;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();
      group.rotation.y += 0.0022;
      group.rotation.x = Math.sin(t * 0.35) * 0.12;
      group.position.y = Math.sin(t * 0.6) * 0.06;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      group.rotation.y += pointer.x * 0.0009;
      camera.position.x = pointer.x * 0.45;
      camera.position.y = -pointer.y * 0.3;
      camera.lookAt(group.position);

      // FUTURE: per-panel assembly lerp would run here, e.g.
      //   panel.position.lerp(panel.userData.home, k)

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // First frame ASAP, then fade the canvas in.
    renderOnce();
    requestAnimationFrame(() => setReady(true));

    if (reduced) {
      // Static, slightly turned frame — no loop.
      group.rotation.set(0.18, -0.5, 0);
      renderOnce();
    }

    // Pause when off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const w = mount.clientWidth || window.innerWidth;
        const h = mount.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderOnce();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      faceMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`hero__canvas ${ready ? "is-ready" : ""}`}
      aria-hidden="true"
    />
  );
}
