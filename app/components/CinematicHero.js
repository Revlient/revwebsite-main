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

      <div className="cinhero__hd">
        <h1 className="cinhero__title" aria-label="we craft digital legacies">
          {["WE CRAFT", "DIGITAL", "LEGACIES."].map((line) => (
            <svg
              key={line}
              className="cinhero__title-line"
              viewBox="0 0 100 14"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <text
                x="0"
                y="11"
                fontSize="12"
                textLength="100"
                lengthAdjust="spacingAndGlyphs"
                fill="#ffffff"
              >
                {line}
              </text>
            </svg>
          ))}
        </h1>
        <p className="cinhero__desc">
          we partner with serious businesses to design, engineer
          and ship the digital systems that move them forward.
        </p>
      </div>

      {/* Top-right stat */}
      <div className="cinhero__stat cinhero__stat--tr">
        <div className="cinhero__stat-row">
          <span className="cinhero__stat-div" aria-hidden="true" />
          <span className="cinhero__stat-n">TODO</span>
        </div>
        <p className="cinhero__stat-lbl">businesses partnered</p>
      </div>

      {/* Bottom-left stat */}
      <div className="cinhero__stat cinhero__stat--bl">
        <div className="cinhero__stat-row">
          <span className="cinhero__stat-n">TODO</span>
          <span className="cinhero__stat-div cinhero__stat-div--neg" aria-hidden="true" />
        </div>
        <p className="cinhero__stat-lbl">surfaces shipped</p>
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
