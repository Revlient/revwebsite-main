"use client";

import { useEffect, useRef, useState } from "react";

// Background-music toggle. Browser autoplay policies block audio
// with sound until the user takes an action, so this starts OFF
// on every load — one click plays, another pauses. Drop your
// audio at /public/ambient.mp3 (loops). If the file is missing
// the button still renders; clicking it just does nothing audible.
const SRC = "/ambient.mp3";

export default function MusicToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.play().catch(() => {
        // playback blocked or file missing — flip state back so the
        // button doesn't get stuck in the "on" position
        setOn(false);
      });
    } else {
      a.pause();
    }
  }, [on]);

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="none" />
      <button
        type="button"
        className={`musictog ${on ? "is-on" : ""}`}
        aria-label={on ? "Mute background music" : "Play background music"}
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          {on ? (
            <g>
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              <path
                d="M16 9a4 4 0 0 1 0 6"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M18.5 6a8 8 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          ) : (
            <g>
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              <path
                d="M17 10l5 4M22 10l-5 4"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}
        </svg>
      </button>
    </>
  );
}
