"use client";

import { useEffect } from "react";

/**
 * GlobalOptimizer is a headless client component that watches the DOM
 * for any <video> elements and pauses them when they are not in the viewport.
 * This avoids heavy CPU/GPU decoding overhead when backdrop loops run off-screen.
 */
export default function GlobalOptimizer() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return undefined;

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    const observeVideos = () => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        if (!video.dataset.lazyObserved) {
          video.dataset.lazyObserved = "true";
          videoObserver.observe(video);
        }
      });
    };

    observeVideos();

    const mutObserver = new MutationObserver(() => {
      observeVideos();
    });

    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      videoObserver.disconnect();
      mutObserver.disconnect();
    };
  }, []);

  return null;
}
