"use client";

import { useEffect, useRef, useState } from "react";

// Reusable scroll-triggered reveal. Wrap any section content with it.
// Falls back to fully visible if IntersectionObserver is unavailable or
// the user prefers reduced motion (handled in CSS too, belt-and-braces).
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const combinedStyle = {
    ...style,
    ...(delay ? { transitionDelay: `${delay}ms` } : {}),
  };

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={combinedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
