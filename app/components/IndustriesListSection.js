"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import Reveal from "./Reveal";

const INDUSTRIES = [
  {
    id: "automobile",
    name: "Automobile",
    num: "034",
    imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "beauty",
    name: "Beauty",
    num: "012",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "construction",
    name: "Construction",
    num: "056",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "corporate",
    name: "Corporate",
    num: "089",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "education",
    name: "Education",
    num: "111",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "electronics",
    name: "Electronics",
    num: "045",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "engineering",
    name: "Engineering Services",
    num: "023",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "entertainment",
    name: "Entertainment",
    num: "157",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "event",
    name: "Event Management",
    num: "073",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "fashion",
    name: "Fashion",
    num: "051",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop"
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
      aria-label="Industries we serve"
    >
      <div className="container indlist__inner">
        {/* Section Header */}
        <Reveal className="indlist__head">
          
          <h2 className="indlist__title">
            Our Key Industries
          </h2>
          <p className="indlist__sub">
            Hover over each element to preview our high-fidelity digital solutions, crafted to redefine industrial paradigms.
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
            WAC_INDEX_MAPPED_STABLE_FEED
          </div>
        </div>

        {/* Core Vertical Industry Interactive Items List */}
        <div className="indlist__rows">
          {INDUSTRIES.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
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
                      VIEW SOLUTIONS // ENQUIRE
                    </span>
                    <div className="indlist__row-arrow">
                      <ArrowRight className="indlist__arrow-svg" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
