"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { CTA_LABEL, CTA_HREF } from "../lib/site";

// Closing CTA. id="start" is the anchor every persistent "Start a project"
// button currently resolves to.
export default function FinalCTA() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const tags = [
    { label: "Interactive 3D", className: "finale__tag--1" },
    { label: "Custom ERP", className: "finale__tag--2" },
    { label: "SaaS Portals", className: "finale__tag--3" },
    { label: "iOS & Android", className: "finale__tag--4" },
    { label: "Creative Motion", className: "finale__tag--5" },
    { label: "Performance Ops", className: "finale__tag--6" },
  ];

  return (
    <section
      className="section finale"
      id="start"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        "--mx": `${coords.x}%`,
        "--my": `${coords.y}%`,
      }}
    >
      {/* Background spotlight gradient & grid wireframe */}
      <div className="finale__bg-glow" aria-hidden="true" />
      <div className="finale__grid" aria-hidden="true" />

      {/* Concentric rotating orbits */}
      <div className="finale__orbit-wrapper" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="finale__orbit finale__orbit--inner">
          <circle cx="200" cy="200" r="130" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="3 5" fill="none" />
        </svg>
        <svg viewBox="0 0 400 400" className="finale__orbit finale__orbit--outer">
          <circle cx="200" cy="200" r="170" stroke="rgba(111, 140, 255, 0.06)" strokeWidth="1" strokeDasharray="8 12" fill="none" />
        </svg>
      </div>

      {/* Floating tags */}
      <div className="finale__tags" aria-hidden="true">
        {tags.map((t, idx) => (
          <span key={idx} className={`finale__tag ${t.className}`}>
            {t.label}
          </span>
        ))}
      </div>

      <div className="container finale__container">
        <Reveal className="finale__inner">
          <h2 className="finale__heading">
            Have something <em>worth crafting?</em>
          </h2>
          <p className="finale__description">
            Tell us what you&apos;re building. We&apos;ll tell you, honestly, whether
            we&apos;re the studio to build it — and how we&apos;d approach it.
          </p>

          <div className="finale__actions">
            <div className="finale__btn-glow-wrapper">
              <a href={CTA_HREF} className="btn btn--primary finale__btn">
                {CTA_LABEL}
              </a>
              <span className="finale__btn-glow" />
            </div>

            <a
              href="mailto:hello@revlient.com"
              className="btn btn--ghost finale__email"
            >
              hello@revlient.com
            </a>
          </div>

          <p className="finale__note">
            One screen, low friction. Tell us the goal, the budget range and
            a short brief — we&apos;ll take it from there.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
