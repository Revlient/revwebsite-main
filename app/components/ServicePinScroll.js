"use client";

import { useEffect, useRef, useState } from "react";

/* Pinned service showcase. A looping video locks to the viewport
   while the service list below it translates upward in lockstep
   with scroll progress. Once the list is out, normal scroll
   resumes into the next section.
   PROOF RULE: studio capability framing only — no client names,
   no metrics, no fabricated proof. */

const VIDEO_SRC = "/work/erp-beam.mp4";

const SERVICES = [
  {
    name: "AI Automation",
    tags: ["Agents", "Pipelines", "Integrations"],
  },
  {
    name: "Premium Websites",
    tags: ["Web", "Motion", "Performance"],
  },
  {
    name: "ERP & Custom Platforms",
    tags: ["ERP", "Internal tools", "Scale"],
  },
  {
    name: "Brand & Digital Growth",
    tags: ["Identity", "Content", "Growth"],
  },
  {
    name: "CRM & Workflows",
    tags: ["CRM", "Ops", "Portals"],
  },
  {
    name: "Post-launch Support",
    tags: ["Retainer", "Uptime", "Iteration"],
  },
];

export default function ServicePinScroll() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const inViewRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);

  // rAF-throttled scroll handler — only runs while in view (IntersectionObserver gates it).
  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    const stage = stageRef.current;
    if (!section || !list || !stage) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lastProgress = -1;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      // 0 → 1 as the section moves through the viewport.
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, total)));

      if (progress === lastProgress) return;
      lastProgress = progress;

      // Distance the list can travel: list height minus viewport area for it.
      const listH = list.scrollHeight;
      const viewportH = list.parentElement.clientHeight;
      const maxY = Math.max(0, listH - viewportH);
      const y = progress * maxY;
      list.style.transform = `translate3d(0, ${-y}px, 0)`;

      const idx = Math.min(
        SERVICES.length - 1,
        Math.floor(progress * SERVICES.length)
      );
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (!inViewRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        inViewRef.current = e.isIntersecting;
        if (e.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          // Run once on enter so initial state is correct.
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "0px 0px -1px 0px", threshold: 0 }
    );
    io.observe(section);

    // Reduced-motion: render statically without pinning effect.
    if (reduced && videoRef.current) {
      videoRef.current.pause();
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const active = SERVICES[activeIndex];

  return (
    <section ref={sectionRef} className="svcpin" aria-label="Studio services">
      <div className="svcpin__atmosphere" aria-hidden="true">
        <span className="svcpin__bloom svcpin__bloom--blue" />
        <span className="svcpin__bloom svcpin__bloom--violet" />
      </div>

      <div ref={stageRef} className="svcpin__stage">
        {/* Pinned player */}
        <div className="svcpin__player" aria-hidden="true">
          <video
            ref={videoRef}
            className="svcpin__video"
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="svcpin__player-vignette" />
          <div className="svcpin__player-caption">
            <span className="svcpin__player-dot" />
            <span className="svcpin__player-eyebrow">Now showing</span>
            <span className="svcpin__player-name" aria-live="polite">
              {active.name}
            </span>
          </div>
        </div>

        {/* Scrollable list (translated by JS) */}
        <div className="svcpin__list-viewport">
          <ul ref={listRef} className="svcpin__list">
            {SERVICES.map((svc, i) => {
              const isActive = i === activeIndex;
              const isHover = i === hoverIndex;
              return (
                <li
                  key={svc.name}
                  className={`svcpin__row${isActive ? " is-active" : ""}${isHover ? " is-hover" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                  onPointerEnter={() => setHoverIndex(i)}
                  onPointerLeave={() => setHoverIndex(-1)}
                  onFocus={() => setHoverIndex(i)}
                  onBlur={() => setHoverIndex(-1)}
                  tabIndex={0}
                >
                  <span className="svcpin__row-index">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="svcpin__row-name">{svc.name}</span>
                  <span className="svcpin__row-tags">
                    {svc.tags.map((t) => (
                      <span key={t} className="svcpin__row-tag">{t}</span>
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
