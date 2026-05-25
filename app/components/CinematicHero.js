"use client";

/* Home hero — fullscreen looping video + staggered giant headline
   words + four stat callouts. Adapted from a "securify"-style brief,
   re-framed for Revlient as a high-conversion digital engineering
   firm. The global <Nav /> covers the top bar; no internal nav.
   PROOF RULE: stat numbers are placeholder "TODO" until verified. */

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4";

export default function CinematicHero() {
  return (
    <section className="cinhero" aria-label="Hero">
      <video
        className="cinhero__video"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <h1 className="cinhero__title" aria-label="we craft digital legacies">
        <span className="cinhero__w cinhero__w--1">WE</span>
        <span className="cinhero__w cinhero__w--2">CRAFT</span>
        <span className="cinhero__w cinhero__w--3">DIGITAL</span>
        <span className="cinhero__w cinhero__w--4">
          <svg
            className="cinhero__legacies-svg"
            viewBox="0 0 720 140"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="106"
              textAnchor="middle"
              className="cinhero__legacies-base"
            >
              LEGACIES.
            </text>
            <text
              x="50%"
              y="106"
              textAnchor="middle"
              className="cinhero__legacies-glow"
            >
              LEGACIES.
            </text>
          </svg>
          <span className="sr-only">LEGACIES.</span>
        </span>
      </h1>
      <p className="cinhero__desc">
        we partner with serious businesses to design, engineer
        and ship the digital systems that move them forward.
      </p>

      <a href="#start" className="cinhero__cta">
        <span>Start a project</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>

      {/* Top-right stat */}
      <div className="cinhero__stat cinhero__stat--tr">
        <div className="cinhero__stat-row">
          <span className="cinhero__stat-div" aria-hidden="true" />
          <span className="cinhero__stat-n">TODO</span>
        </div>
        <p className="cinhero__stat-lbl">businesses partnered</p>
      </div>

      {/* Bottom-right stat */}
      <div className="cinhero__stat cinhero__stat--br">
        <div className="cinhero__stat-row">
          <span className="cinhero__stat-div cinhero__stat-div--neg" aria-hidden="true" />
          <span className="cinhero__stat-n">TODO</span>
        </div>
        <p className="cinhero__stat-lbl cinhero__stat-lbl--right">
          project value delivered
        </p>
      </div>

      <div className="cinhero__fade" aria-hidden="true" />
    </section>
  );
}
