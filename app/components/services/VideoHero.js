"use client";

import { useEffect, useRef } from "react";
import { CTA_HREF } from "../../lib/site";

/* Editorial video-card hero for /services. White rounded card with
   a looping background video, headline + sub + Contact CTA stacked
   top-left, a glass-pill floating navbar pinned to the bottom, and
   below it a seamless marquee logo scroller with masked edges and
   hover-reveal gradient cards.

   Ported from the React + TypeScript + Tailwind + Motion spec to
   vanilla JS + plain CSS. Mount animation = CSS keyframe applied
   once on first render via the is-in class. Marquee = pure CSS
   @keyframes infinite scroll (translateX 0 → -50% on a duplicated
   track), pauses on hover. No new deps. */

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4";

const LOGOS = [
  {
    name: "Procure",
    src: "https://svgl.app/library/procure.svg",
    grad: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  },
  {
    name: "Shopify",
    src: "https://svgl.app/library/shopify.svg",
    grad: "linear-gradient(135deg, #fde047 0%, #ca8a04 100%)",
  },
  {
    name: "Blender",
    src: "https://svgl.app/library/blender.svg",
    grad: "linear-gradient(135deg, #60a5fa 0%, #1e40af 100%)",
  },
  {
    name: "Figma",
    src: "https://svgl.app/library/figma.svg",
    grad: "linear-gradient(135deg, #ffffff 0%, #7c3aed 100%)",
  },
  {
    name: "Spotify",
    src: "https://svgl.app/library/spotify.svg",
    grad: "linear-gradient(135deg, #fb7185 0%, #be123c 100%)",
  },
  {
    name: "Lottielab",
    src: "https://svgl.app/library/lottielab.svg",
    grad: "linear-gradient(135deg, #facc15 0%, #65a30d 100%)",
  },
  {
    name: "Google Cloud",
    src: "https://svgl.app/library/google-cloud.svg",
    grad: "linear-gradient(135deg, #93c5fd 0%, #3b82f6 100%)",
  },
  {
    name: "Bing",
    src: "https://svgl.app/library/bing.svg",
    grad: "linear-gradient(135deg, #67e8f9 0%, #0891b2 100%)",
  },
];

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function LogoCard({ logo }) {
  return (
    <a
      href="#"
      className="shvm__card"
      aria-label={logo.name}
      onClick={(e) => e.preventDefault()}
    >
      <span
        className="shvm__card-grad"
        style={{ background: logo.grad }}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="shvm__card-logo"
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

export default function VideoHero() {
  const sectionRef = useRef(null);

  // Add .is-in once on mount so the mount keyframes run a single time
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => el.classList.add("is-in"));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section ref={sectionRef} className="shvh">
      <div className="shvh__card">
        {/* background video layer */}
        <div className="shvh__video-layer" aria-hidden="true">
          <video
            className="shvh__video"
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* text content */}
        <div className="shvh__content">
          <h1 className="shvh__title">
            Foundation of the
            <br />
            new digital epoch
          </h1>
          <p className="shvh__sub">
            Designing products, powering ecosystems and laying the
            foundation of a decentralized web for enterprises, builders and
            communities alike.
          </p>
          <a href={CTA_HREF} className="shvh__cta">
            Contact Us
          </a>
        </div>

        {/* floating bottom navbar */}
        <nav className="shvh__navbar" aria-label="Hero quick nav">
          <span className="shvh__navbar-logo" aria-hidden="true">
            ✦
          </span>
          <a className="shvh__navbar-link" href="#products">
            Products
          </a>
          <a className="shvh__navbar-link" href="#docs">
            Docs
          </a>
          <a className="shvh__navbar-cta" href={CTA_HREF}>
            <span>Get in touch</span>
            <ChevronRight />
          </a>
        </nav>
      </div>

      {/* marquee logo scroller */}
      <div className="shvm" aria-label="Tools we work with">
        <div className="shvm__track">
          {LOGOS.map((l, i) => (
            <LogoCard key={`a-${i}`} logo={l} />
          ))}
          {/* second copy for seamless loop */}
          {LOGOS.map((l, i) => (
            <LogoCard key={`b-${i}`} logo={l} />
          ))}
        </div>
      </div>
    </section>
  );
}
