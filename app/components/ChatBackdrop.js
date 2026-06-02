"use client";

import { useEffect, useRef } from "react";

// Chat-section backdrop. The video runs at 115% with an object-top
// focal point and is controlled by a hand-rolled rAF fade system —
// no CSS transitions — so each loop ends with a clean 250ms fade
// out, restarts at currentTime 0, then fades back in over 250ms.
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const FADE_MS = 250;
const FADE_LEAD = 0.55; // seconds before end to start fading out
const LOOP_GAP_MS = 100; // hold at opacity 0 before restart

export default function ChatBackdrop() {
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // Honour reduced-motion: skip the autoplay loop entirely. The
    // section's gradient backdrop + vignette carry the look on their own,
    // so motion-sensitive visitors get a calm, still scene.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      video.style.opacity = "0";
      return undefined;
    }

    // Cancel any in-flight fade so a new one resumes from the current
    // opacity rather than snapping back to a previous start point.
    function cancelRaf() {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    }

    function fadeTo(target) {
      cancelRaf();
      const start = performance.now();
      const from = parseFloat(video.style.opacity || "0") || 0;
      const delta = target - from;
      const step = (now) => {
        const t = Math.min(1, (now - start) / FADE_MS);
        video.style.opacity = String(from + delta * t);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = 0;
        }
      };
      rafRef.current = requestAnimationFrame(step);
    }

    function fadeIn() {
      fadingOutRef.current = false;
      fadeTo(1);
    }

    function onLoadedData() {
      video.style.opacity = "0";
      video.play().catch(() => {
        /* autoplay may be blocked — leave the still frame as the poster */
      });
      fadeIn();
    }

    function onTimeUpdate() {
      if (fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (Number.isFinite(remaining) && remaining <= FADE_LEAD) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    }

    function onEnded() {
      cancelRaf();
      video.style.opacity = "0";
      window.setTimeout(() => {
        try {
          video.currentTime = 0;
        } catch (e) {
          /* some browsers throw if metadata isn't ready — ignore */
        }
        const p = video.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {});
        }
        fadeIn();
      }, LOOP_GAP_MS);
    }

    video.style.opacity = "0";
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      cancelRaf();
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="chatbd__video"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
      />
      <div className="chatbd__vignette" />
    </div>
  );
}
