"use client";

import { useEffect, useRef, useState } from "react";

/* Pinned service showcase, two-screen flow:
   1. Section starts. User sees the 16:9 video at the top of section.
   2. As they scroll, video moves up naturally.
   3. When 40% of the video has scrolled out, the stage pins
      (position: sticky with a negative top equal to 40% of player
      height) and further scroll translates the service list upward.
   4. Each new active row plays a synthesized "node" tick.
   PROOF RULE: studio capability framing only — no client names,
   metrics, fabricated proof. */

const VIDEO_SRC = "/work/saas-demo.mp4";

const SERVICES = [
  { name: "Enterprise Management Solution",   tags: ["ERP", "Operations", "Automation"] },
  { name: "Website & CMS Solutions",          tags: ["Web", "CMS", "Performance"] },
  { name: "Enterprise Ecommerce Platform",    tags: ["Commerce", "Catalog", "Checkout"] },
  { name: "Custom Application Development",   tags: ["Web app", "Mobile", "Internal tools"] },
  { name: "SaaS Solutions",                   tags: ["Multi-tenant", "Subscriptions", "Cloud"] },
  { name: "Advanced Technology Solutions",    tags: ["AI", "Automation", "Integrations"] },
  { name: "Design & Experience",              tags: ["UI", "Motion", "Brand"] },
  { name: "Cybersecurity Solutions",          tags: ["Audit", "Hardening", "Compliance"] },
];

/* Synthesized node-tick (Web Audio API) — no asset needed. */
function makeTick() {
  let ctx = null;
  let unlocked = false;

  const unlock = () => {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      unlocked = true;
    } catch (_) {
      ctx = null;
    }
  };

  const play = () => {
    if (!unlocked || !ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (_) {}
  };

  return { unlock, play };
}

export default function ServicePinScroll() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const listRef = useRef(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const inViewRef = useRef(false);
  const tickRef = useRef(null);
  const lastIdxRef = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    tickRef.current = makeTick();

    const onFirstInteract = () => {
      tickRef.current.unlock();
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
      window.removeEventListener("wheel", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
    };
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    window.addEventListener("keydown", onFirstInteract, { once: true });
    window.addEventListener("wheel", onFirstInteract, { once: true, passive: true });
    window.addEventListener("touchstart", onFirstInteract, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
      window.removeEventListener("wheel", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
    };
  }, []);

  // Sync stage sticky top so pin engages AFTER the video has fully
  // scrolled off-screen. JS reads player.offsetHeight and writes
  // -playerHeight (plus stage's top padding) to --svcpin-stick.
  useEffect(() => {
    const stage = stageRef.current;
    const player = playerRef.current;
    if (!stage || !player) return;
    const syncPinTop = () => {
      const h = player.offsetHeight;
      // pull stage up by full player height so video is fully out
      // before pin engages
      stage.style.setProperty("--svcpin-stick", `${-Math.round(h + 24)}px`);
    };
    syncPinTop();
    const ro = new ResizeObserver(syncPinTop);
    ro.observe(player);
    window.addEventListener("resize", syncPinTop);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncPinTop);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lastProgress = -1;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - window.innerHeight);
      const rawProgress = Math.max(0, Math.min(1, -rect.top / total));
      if (rawProgress === lastProgress) return;
      lastProgress = rawProgress;

      const listH = list.scrollHeight;
      const viewportH = list.parentElement.clientHeight;
      const maxY = Math.max(0, listH - viewportH);
      const y = rawProgress * maxY;
      list.style.transform = `translate3d(0, ${-y}px, 0)`;

      // Shift slot mapping so nothing appears until the stage has
      // actually pinned. The user sees the video fully scroll out
      // and the section "stop", then the first service fades in.
      const playerH = playerRef.current ? playerRef.current.offsetHeight : 0;
      const pinStartProgress = (playerH + 24) / total;
      const afterPin = Math.max(
        0,
        (rawProgress - pinStartProgress) / Math.max(0.001, 1 - pinStartProgress)
      );

      // Slots: [empty buffer, ...8 services, view-more CTA] = 10
      const slots = SERVICES.length + 2;
      const slot = Math.min(slots - 1, Math.floor(afterPin * slots));
      // slot 0 = nothing, slot 1..8 = service slot-1, slot 9 = CTA
      const idx = slot - 1;
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        setActiveIndex(idx);
        if (tickRef.current && !reduced && idx >= 0) tickRef.current.play();
      }
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
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "0px 0px -1px 0px", threshold: 0 }
    );
    io.observe(section);

    // Video playback safety net: force-play on mount + restart on
    // 'ended' (in case loop attribute is ignored), and try to resume
    // if the browser quietly pauses it (autoplay throttling, off-
    // screen pause heuristics, etc.).
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.loop = true;
      const tryPlay = () => v.play().catch(() => {});
      tryPlay();
      const onEnded = () => {
        try {
          v.currentTime = 0;
        } catch (_) {}
        tryPlay();
      };
      const onPause = () => {
        if (inViewRef.current && !reduced) tryPlay();
      };
      const onCanPlay = () => tryPlay();
      v.addEventListener("ended", onEnded);
      v.addEventListener("pause", onPause);
      v.addEventListener("canplay", onCanPlay);

      if (reduced) v.pause();

      return () => {
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(rafRef.current);
        v.removeEventListener("ended", onEnded);
        v.removeEventListener("pause", onPause);
        v.removeEventListener("canplay", onCanPlay);
      };
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isCtaSlot = activeIndex >= SERVICES.length;
  const isEmptySlot = activeIndex < 0;
  const active = isEmptySlot
    ? null
    : isCtaSlot
      ? { name: "View All Services", tags: [] }
      : SERVICES[activeIndex];

  return (
    <section ref={sectionRef} className="svcpin" aria-label="Studio services">
      <div className="svcpin__atmosphere" aria-hidden="true">
        <span className="svcpin__bloom svcpin__bloom--blue" />
        <span className="svcpin__bloom svcpin__bloom--violet" />
      </div>

      <div ref={stageRef} className="svcpin__stage">
        <div ref={playerRef} className="svcpin__player" aria-hidden="true">
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
              {active ? active.name : "Scroll to explore"}
            </span>
          </div>
        </div>

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
            {/* Final slot: immersive "View More" CTA */}
            <li
              className={`svcpin__row svcpin__row--cta${isCtaSlot ? " is-active" : ""}`}
              aria-current={isCtaSlot ? "true" : undefined}
            >
              <a href="/services" className="svcpin__viewmore">
                <span className="svcpin__viewmore-eyebrow">All services</span>
                <span className="svcpin__viewmore-label">View More</span>
                <span className="svcpin__viewmore-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
