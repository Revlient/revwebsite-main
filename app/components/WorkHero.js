"use client";

import Logo from "./Logo";
import InfiniteGrid from "./InfiniteGrid";
import { CTA_HREF, NAV_LINKS } from "../lib/site";

/* /work page hero — adapted from a React/TS/Tailwind + lucide-react
   brief into vanilla JS + plain CSS, inline SVG arrows in place of
   lucide. Brand asset (the four-blade leaf at /logo.svg) replaces
   the spec's inline logoipsum path. Copy is rewritten for Revlient
   — the spec's "Seen on Shark Tank in India" / prosthetics headline
   is fabricated proof we won't ship. */

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

export default function WorkHero() {
  return (
    <section className="whero">
      <InfiniteGrid />
      <video
        className="whero__video"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="whero__content">
        <div className="whero__body">
          <div className="whero__inner">
            <h1 className="whero__heading">
              Selected work, end-to-end.
            </h1>
            <p className="whero__sub">A glimpse of the projects we&apos;ve shipped.</p>
            <a href={CTA_HREF} className="whero__cta">
              <span>Start a project</span>
              <span className="whero__cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
