"use client";

import { useEffect, useState } from "react";
import { CTA_HREF, CTA_LABEL } from "../lib/site";

// Floating "Start a project" button — appears once the hero has scrolled
// away and hides again near the closing CTA so it never doubles up.
export default function StickyCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let inHero = true;
    let nearFinale = false;

    const hero = document.querySelector(".cinhero");
    const finale = document.getElementById("start");

    const updateVisibility = () => {
      // Button is shown only when user is out of the hero AND not near the finale
      setShown(!inHero && !nearFinale);
    };

    let heroObserver = null;
    if (hero && typeof IntersectionObserver !== "undefined") {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          inHero = entry.isIntersecting;
          updateVisibility();
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(hero);
    }

    let finaleObserver = null;
    if (finale && typeof IntersectionObserver !== "undefined") {
      finaleObserver = new IntersectionObserver(
        ([entry]) => {
          nearFinale = entry.isIntersecting;
          updateVisibility();
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      finaleObserver.observe(finale);
    }

    // Fallback checks
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      if (heroObserver) heroObserver.disconnect();
      if (finaleObserver) finaleObserver.disconnect();
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
