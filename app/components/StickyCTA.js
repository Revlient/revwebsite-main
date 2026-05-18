"use client";

import { useEffect, useState } from "react";
import { CTA_HREF, CTA_LABEL } from "../lib/site";

// Floating "Start a project" button — appears once the hero has scrolled
// away and hides again near the closing CTA so it never doubles up.
// This is the third of the four required persistent CTA placements.
export default function StickyCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const finale =
      typeof document !== "undefined"
        ? document.getElementById("start")
        : null;

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      let nearFinale = false;
      if (finale) {
        const rect = finale.getBoundingClientRect();
        nearFinale = rect.top < window.innerHeight * 0.9;
      }
      setShown(pastHero && !nearFinale);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`sticky-cta ${shown ? "is-shown" : ""}`}
      aria-hidden={!shown}
    >
      <a
        href={CTA_HREF}
        className="btn btn--primary"
        tabIndex={shown ? 0 : -1}
      >
        {CTA_LABEL}
      </a>
    </div>
  );
}
