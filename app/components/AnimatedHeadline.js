"use client";

import { useEffect, useState } from "react";

/* Rotating-word headline. Adapted from a framer-motion/shadcn demo to
   this project's stack — the spring word-swap is reproduced in plain
   CSS/JS, no framer-motion. Progressive enhancement: words[0] renders
   server-side and stays put without JS or under prefers-reduced-motion,
   so the headline always reads as a complete phrase. */
export default function AnimatedHeadline({ words, interval = 2200 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || words.length < 2) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span className="rotator" aria-label={words.join(", ")}>
      {words.map((word, i) => {
        const state =
          i === active ? "is-active" : i < active ? "is-past" : "is-next";
        return (
          <span
            key={word}
            className={`rotator__word accent ${state}`}
            aria-hidden={i !== active}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
