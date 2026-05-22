"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

// Adapted from the AI-builder hero spec — Mux HLS stream behind the
// chat section, with a Safari-native fallback. The motion/lucide/
// Tailwind layer from the spec is intentionally not carried across:
// our stack is plain JS + plain CSS, so the look is achieved via
// the existing vignette + a couple of decorative glow blobs.
const VIDEO_SRC =
  "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

const POSTER_SRC =
  "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function ChatBackdrop() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          /* autoplay can be blocked — fall back to poster */
        });
      });
      return () => {
        hls.destroy();
      };
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;
      const onLoaded = () => {
        video.play().catch(() => {
          /* autoplay can be blocked — fall back to poster */
        });
      };
      video.addEventListener("loadedmetadata", onLoaded);
      return () => {
        video.removeEventListener("loadedmetadata", onLoaded);
      };
    }
    return undefined;
  }, []);

  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="chatbd__video"
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER_SRC}
      />
      <div className="chatbd__overlay" />
      <span className="chatbd__glow chatbd__glow--tl" />
      <span className="chatbd__glow chatbd__glow--br" />
      <div className="chatbd__vignette" />
    </div>
  );
}
