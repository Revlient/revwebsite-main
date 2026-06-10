"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import Reveal from "./Reveal";

const INDUSTRIES = [
  {
    id: "houseofeleven",
    name: "House of Eleven",
    num: "01",
    imageUrl: "/work/project-houseof11.png"
  },
  {
    id: "magnateacademy",
    name: "Magnate Academy",
    num: "02",
    imageUrl: "/work/project-magnateacademy.png"
  },
  {
    id: "perpex",
    name: "Perpex",
    num: "03",
    imageUrl: "/work/project-perpex.png"
  },
  {
    id: "magnatestudyabroad",
    name: "Magnate Study Abroad",
    num: "04",
    imageUrl: "/work/project-magnatestudyabroad2.png"
  }
];

function ArrowRight({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function IndustriesListSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    sectionRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
    sectionRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
  };

  const handleItemMouseEnter = (idx) => {
    setHoveredIndex(idx);
  };

  const handleItemMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section
      id="industries"
      className="indlist"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="Featured projects"
    >
      <div className="container indlist__inner">
        {/* Section Header */}
        <Reveal className="indlist__head">
          
          <h2 className="indlist__title">
            Featured Projects
          </h2>
          <p className="indlist__sub">
            Hover over each project to preview our high-fidelity digital builds. Click to explore our full body of work.
          </p>
        </Reveal>

        {/* Floating Custom Interactive Image Card following mouse pointer */}
        <div
          className={`indlist__floating-preview ${hoveredIndex !== null ? "is-visible" : ""}`}
          aria-hidden="true"
        >
          {INDUSTRIES.map((item, idx) => (
            <img
              key={item.id}
              src={item.imageUrl}
              alt={item.name}
              className={`indlist__floating-image ${hoveredIndex === idx ? "is-active" : ""}`}
              referrerPolicy="no-referrer"
            />
          ))}
          <div className="indlist__floating-vignette" />
          <div className="indlist__floating-tag">
            FEATURED PROJECT // REVLIENT
          </div>
        </div>

        {/* Core Vertical Industry Interactive Items List */}
        <div className="indlist__rows">
          {INDUSTRIES.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <a
                href="/work"
                key={item.id}
                onMouseEnter={() => handleItemMouseEnter(idx)}
                onMouseLeave={handleItemMouseLeave}
                className="indlist__row group"
              >
                {/* Horizontal hover visual background stripe */}
                <div className="indlist__row-bg" />

                <div className="indlist__row-content">
                  <div className="indlist__row-label">
                    {/* Superscript indicator number */}
                    <span className="indlist__row-num">
                      ({item.num})
                    </span>

                    {/* Industrial Label Term */}
                    <h3 className="indlist__row-name">
                      {item.name}
                    </h3>
                  </div>

                  {/* Icon Indicator Arrow rotating on hover */}
                  <div className="indlist__row-actions">
                    <span className="indlist__row-enquire">
                      EXPLORE PROJECT
                    </span>
                    <div className="indlist__row-arrow">
                      <ArrowRight className="indlist__arrow-svg" />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
