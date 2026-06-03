"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { CTA_HREF } from "../lib/site";

const SERVICES_DATA = [
  // --- Category: Code ---
  { category: "Code", name: "Enterprise Management Solutions" },
  { category: "Code", name: "Website & CMS Solutions" },
  { category: "Code", name: "Custom Application Development" },
  { category: "Code", name: "Enterprise Ecommerce Platform" },
  { category: "Code", name: "SaaS Solutions" },
  { category: "Code", name: "Advanced Technology Solutions" },
  { category: "Code", name: "Design & Experience" },
  { category: "Code", name: "Cybersecurity Solutions" },
  
  // --- Category: Creativity ---
  { category: "Creativity", name: "Branding & Identity" },
  { category: "Creativity", name: "Design & Collateral" },
  { category: "Creativity", name: "Content & Storytelling" },
  { category: "Creativity", name: "Media Production" },
  { category: "Creativity", name: "Advertising & Communication" },
  { category: "Creativity", name: "Extended Creative Edge" },
  
  // --- Category: Conversion ---
  { category: "Conversion", name: "Influencer Marketing" },
  { category: "Conversion", name: "Video Marketing" },
  { category: "Conversion", name: "360° Marketing" },
  { category: "Conversion", name: "Theatre Commercials" },
  { category: "Conversion", name: "SEO" },
  { category: "Conversion", name: "Marketing Automation" },
  { category: "Conversion", name: "Paid Media Marketing Services" },
  
  // --- Category: Consulting ---
  { category: "Consulting", name: "Business & Corporate Strategy" },
  { category: "Consulting", name: "Operational & Organizational" },
  { category: "Consulting", name: "Financial Strategy & Modeling" },
  { category: "Consulting", name: "Technology Strategy & Architecture" },
  { category: "Consulting", name: "Brand Strategy" },
];

export default function LockedServicesScroll() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    let ticking = false;
    
    const update = () => {
      const isMobile = window.innerWidth <= 991;
      const childElements = list.querySelectorAll(".svclock__item");
      const catElements = section.querySelectorAll(".svclock__category");
      const viewportHeight = window.innerHeight || 800;
      
      // 1. Mobile Layout Mode: High-performance natural scroll proximity highlight
      if (isMobile) {
        list.style.transform = "none";
        catElements.forEach((el) => el.classList.remove("is-active"));
        
        const viewportCenter = viewportHeight / 2;
        const maxDistance = viewportHeight * 0.35; // smooth fade zone height
        
        let closestIdx = -1;
        let minDistance = Infinity;
        
        // First pass: find the closest element to the screen center
        for (let i = 0; i < childElements.length; i++) {
          const child = childElements[i];
          if (!child) continue;
          
          const rect = child.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - itemCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = i;
          }
        }
        
        // Second pass: apply proximity style attributes directly
        for (let i = 0; i < childElements.length; i++) {
          const child = childElements[i];
          if (!child) continue;
          
          const rect = child.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - itemCenter);
          
          // Normalized proximity: 1 when perfectly centered, 0 when far away
          const proximity = Math.max(0, 1 - distance / maxDistance);
          
          // Map proximity smoothly to styles (minimum opacity 0.45 for clean readability on dark screens)
          const opacity = 0.45 + proximity * 0.55; // 0.45 (readable) to 1.0 (bright)
          const scale = 0.92 + proximity * 0.08; // 0.92 to 1.00
          const blur = (1 - proximity) * 1.5; // 0px to 1.5px blur
          const xOffset = proximity * 15; // translates right by up to 15px
          
          child.style.opacity = opacity;
          child.style.transform = `scale(${scale}) translate3d(${xOffset}px, 0, 0)`;
          child.style.filter = blur > 0.08 ? `blur(${blur}px)` : "none";
          
          if (i === closestIdx) {
            child.classList.add("is-active");
          } else {
            child.classList.remove("is-active");
          }
        }
        
        ticking = false;
        return;
      }
      
      // 2. Desktop Mode: High-performance scroll locked proximity translate
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight || 1000;
      
      const total = Math.max(100, sectionHeight - viewportHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      
      const totalItems = SERVICES_DATA.length;
      let activeIdx = Math.round(progress * (totalItems - 1));
      activeIdx = Math.max(0, Math.min(totalItems - 1, activeIdx));
      
      const currentItem = SERVICES_DATA[activeIdx];
      
      // 1. Left Side Category Slide-up
      if (currentItem) {
        catElements.forEach((el) => {
          if (el.getAttribute("data-category") === currentItem.category) {
            el.classList.add("is-active");
          } else {
            el.classList.remove("is-active");
          }
        });
      }
      
      // 2. Linear continuous list translation (aligns active item in screen center)
      // On desktop, we count both headers and items for continuous translation offsets
      const itemGroups = list.querySelectorAll(".svclock__item-group");
      let accumHeight = 0;
      const itemHeight = 100;
      const catHeaderHeight = 160; // Estimated height for visible spacer
      
      // Compute continuous scroll track offsets including visible spacing
      const viewportCenter = viewportHeight / 2;
      const centerOffset = viewportCenter - itemHeight / 2;
      
      // Continuous y coordinate maps linearly to progress
      const y = centerOffset - (progress * (totalItems - 1) * itemHeight);
      
      list.style.transform = `translate3d(0, ${y}px, 0)`;
      
      // 3. Proximity-Based Brightness, Scale & Blur Falloff on items
      const maxDistance = viewportHeight * 0.35; // smooth fade zone height
      
      for (let i = 0; i < childElements.length; i++) {
        const child = childElements[i];
        if (!child) continue;
        
        // Physical center of the item relative to the viewport
        const itemCenter = y + i * itemHeight + itemHeight / 2;
        const distance = Math.abs(viewportCenter - itemCenter);
        
        // Normalized proximity: 1 when perfectly centered, 0 when far away
        const proximity = Math.max(0, 1 - distance / maxDistance);
        
        // Map proximity smoothly to styles (minimum opacity 0.45 for clean readability on dark screens)
        const opacity = 0.45 + proximity * 0.55; // 0.45 (readable) to 1.0 (bright)
        const scale = 0.92 + proximity * 0.14; // 0.92 to 1.06
        const blur = (1 - proximity) * 1.5; // 0px to 1.5px blur
        const xOffset = proximity * 20; // translates right by up to 20px
        
        // Apply ultra-performant direct DOM styles
        child.style.opacity = opacity;
        child.style.transform = `scale(${scale}) translate3d(${xOffset}px, 0, 0)`;
        child.style.filter = blur > 0.08 ? `blur(${blur}px)` : "none";
        
        // Toggle class to override specific color details
        if (i === activeIdx) {
          child.classList.add("is-active");
        } else {
          child.classList.remove("is-active");
        }
      }
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Initialize layout positions
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  let lastCat = null;

  return (
    <section
      ref={sectionRef}
      className="svclock"
      id="services-scroll"
      aria-label="Capabilities locked showcase"
    >
      <div className="svclock__stage">
        {/* Left Side: Large Dynamic Category Title (Desktop Only) */}
        <div className="svclock__left">
          <div className="svclock__categories">
            {["Code", "Creativity", "Conversion", "Consulting"].map((cat) => (
              <h2
                key={cat}
                data-category={cat}
                className="svclock__category"
              >
                {cat}
              </h2>
            ))}
          </div>
        </div>

        {/* Right Side: Numbered Services List translating vertically */}
        <div className="svclock__right">
          <div className="svclock__viewport">
            <ul ref={listRef} className="svclock__list">
              {SERVICES_DATA.map((svc, i) => {
                const showHeader = svc.category !== lastCat;
                lastCat = svc.category;
                return (
                  <div
                    key={`${svc.category}-${svc.name}-${i}`}
                    className="svclock__item-group"
                    style={{ display: "contents" }}
                  >
                    {showHeader && (
                      <li
                        className="svclock__cat-header"
                        data-category={svc.category}
                      >
                        {svc.category}
                      </li>
                    )}
                    <li className="svclock__item">
                      <span className="svclock__item-name">{svc.name}</span>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Premium Top Right Menu Pill Button */}
        <div className="svclock__menu-wrap">
          <a href="#services-scroll" className="svclock__menu-btn">
            Menu
          </a>
        </div>
      </div>
    </section>
  );
}
