"use client";

import { useMemo } from "react";
import Reveal from "./Reveal";

/* Editorial UX-case-study hero — heavy display typography, centred
   phone mockup, floating glass micro-cards, four corner gradient
   blobs and scattered "+" sparkle marks. Vanilla JS + plain CSS.
   All decorative content is aria-hidden. */

function CornerBlobs() {
  return (
    <div className="shero__blobs" aria-hidden="true">
      <span className="shero__blob shero__blob--tl" />
      <span className="shero__blob shero__blob--tr" />
      <span className="shero__blob shero__blob--bl" />
      <span className="shero__blob shero__blob--br" />
    </div>
  );
}

function SparkleField() {
  // 24 deterministic-position "+" marks; useMemo so SSR + hydrate
  // produce identical positions
  const marks = useMemo(() => {
    const out = [];
    for (let i = 0; i < 24; i++) {
      out.push({
        top: (i * 53 + 11) % 100,
        left: (i * 71 + 7) % 100,
        size: 9 + ((i * 0.7) % 6),
        delay: -((i * 0.97) % 6),
        dur: 4 + ((i * 1.3) % 4),
      });
    }
    return out;
  }, []);
  return (
    <div className="shero__sparkles" aria-hidden="true">
      {marks.map((m, i) => (
        <span
          key={i}
          className="shero__sparkle"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            fontSize: `${m.size}px`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.dur}s`,
          }}
        >
          +
        </span>
      ))}
    </div>
  );
}

function HeaderPills() {
  // Three pill groups across the very top of the section
  return (
    <div className="shero__header" aria-hidden="true">
      <div className="shero__pills shero__pills--left">
        <span className="shero__pill">category</span>
        <span className="shero__pill">TBD: app type</span>
      </div>
      <div className="shero__pills shero__pills--center">
        <span className="shero__pill">TBD: topic 1</span>
        <span className="shero__pill">TBD: topic 2</span>
        <span className="shero__pill">TBD: topic 3</span>
      </div>
      <div className="shero__pills shero__pills--right">
        <span className="shero__pill">direction</span>
        <span className="shero__pill">product / UX / UI</span>
      </div>
    </div>
  );
}

function AuthorChip() {
  return (
    <div className="shero__author" aria-hidden="true">
      <span className="shero__author-icon" />
      <span className="shero__author-name">
        <em>TODO: presenter name</em> Present
      </span>
    </div>
  );
}

function Headline() {
  return (
    <h1 className="shero__headline">
      <span className="shero__headline-lede">A new</span>
      <em className="shero__headline-italic">immersive</em>
      <span className="shero__headline-tail">music listening experience</span>
    </h1>
  );
}

function MetaBlock({ label, value, plus = false, className }) {
  return (
    <Reveal as="div" className={`shero__meta ${className || ""}`.trim()}>
      {plus && (
        <span className="shero__meta-plus" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8 V16 M8 12 H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      )}
      <span className="shero__meta-label">{label}</span>
      <span className="shero__meta-value">{value}</span>
    </Reveal>
  );
}

function PhoneMockup() {
  return (
    <div className="shero__phone" aria-hidden="true">
      <div className="shero__phone-bezel">
        <span className="shero__phone-notch" />
        <div className="shero__phone-screen">
          {/* status bar */}
          <div className="shero__phone-status">
            <span>9:41</span>
            <span className="shero__phone-status-icons">
              <span className="shero__phone-status-dot" />
              <span className="shero__phone-status-bar" />
              <span className="shero__phone-status-bat" />
            </span>
          </div>
          {/* back arrow */}
          <button type="button" className="shero__phone-back" tabIndex={-1}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M15 6 L9 12 L15 18"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* hero artwork: faint radial bloom + 4-point star */}
          <div className="shero__phone-art">
            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="shero-bloom">
                  <stop offset="0%" stopColor="rgba(255,210,180,0.95)" />
                  <stop offset="40%" stopColor="rgba(216,120,140,0.55)" />
                  <stop offset="100%" stopColor="rgba(60,40,80,0)" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="92" fill="url(#shero-bloom)" />
              {/* 4-point star */}
              <path
                d="M100 38 L108 92 L160 100 L108 108 L100 162 L92 108 L40 100 L92 92 Z"
                fill="#ffffff"
                opacity="0.92"
              />
            </svg>
          </div>
          {/* podcast eyebrow + title */}
          <div className="shero__phone-eyebrow">Podcast</div>
          <div className="shero__phone-title">TODO: episode title</div>
          {/* speaker row */}
          <div className="shero__phone-row">
            <span className="shero__phone-row-avatar shero__phone-row-avatar--pink" />
            <div className="shero__phone-row-text">
              <span className="shero__phone-row-eyebrow">Speaking</span>
              <span className="shero__phone-row-name">TODO: speaker</span>
            </div>
            <svg viewBox="0 0 60 24" className="shero__phone-row-wave" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 3.2 + 1}
                  y={12 - (3 + ((i * 1.3) % 8))}
                  width="1.8"
                  height={(3 + ((i * 1.3) % 8)) * 2}
                  rx="0.9"
                  fill="#ff5b6e"
                />
              ))}
            </svg>
          </div>
          {/* discuss row */}
          <div className="shero__phone-row shero__phone-row--simple">
            <span className="shero__phone-row-stack" />
            <span className="shero__phone-row-count">12 💬</span>
            <span className="shero__phone-row-cta">Discuss</span>
          </div>
          {/* next row */}
          <div className="shero__phone-row shero__phone-row--simple">
            <span className="shero__phone-row-stack shero__phone-row-stack--small" />
            <div className="shero__phone-row-text">
              <span className="shero__phone-row-eyebrow">
                <span className="shero__phone-row-livepill">LIVE</span> Next in this topic
              </span>
              <span className="shero__phone-row-name">TODO: next title</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingCards() {
  return (
    <>
      <Reveal className="shero__card shero__card--invite" delay={120}>
        <div className="shero__card-row">
          <span className="shero__card-ico shero__card-ico--pink" />
          <div>
            <div className="shero__card-title">Invite friends</div>
            <div className="shero__card-sub">48 tracks</div>
          </div>
        </div>
        <span className="shero__card-btn">Invite</span>
      </Reveal>

      <Reveal className="shero__card shero__card--live" delay={200}>
        <span className="shero__card-live-pill">LIVE</span>
        <span className="shero__card-live-avatars">
          <span className="shero__card-live-avatar" />
          <span className="shero__card-live-avatar" />
        </span>
      </Reveal>

      <Reveal className="shero__card shero__card--ring" delay={160}>
        <svg viewBox="0 0 56 56" width="56" height="56" aria-hidden="true">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke="#c084fc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="118"
            strokeDashoffset="34"
            transform="rotate(-90 28 28)"
          />
          <text
            x="28"
            y="32"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="#fff"
          >
            215
          </text>
        </svg>
      </Reveal>

      <Reveal className="shero__card shero__card--verify" delay={240}>
        <div className="shero__card-row">
          <span className="shero__card-ico shero__card-ico--pink" />
          <div>
            <div className="shero__card-title">Verify account</div>
            <div className="shero__card-sub">48 tracks</div>
          </div>
        </div>
        <span className="shero__card-btn">Verify</span>
      </Reveal>
    </>
  );
}

export default function ShowcaseHero() {
  return (
    <section className="shero" aria-label="Concept showcase">
      <CornerBlobs />
      <SparkleField />
      <HeaderPills />
      <AuthorChip />

      <div className="shero__stage">
        <Headline />
        <PhoneMockup />
        <FloatingCards />

        {/* Scattered metadata blocks. Absolutely positioned on desktop;
            collapse to a vertical list on mobile via CSS. */}
        <MetaBlock label="LOCATION" value="TODO: location" className="shero__meta--top-right" />
        <MetaBlock label="CATEGORY" value="TODO: category" className="shero__meta--top-right-2" />
        <MetaBlock label="TYPE" value="concept" className="shero__meta--left-mid" />
        <MetaBlock label="DIRECTION" value="UX / UI" className="shero__meta--left-mid-2" />
        <MetaBlock
          label="WHAT I'VE DONE"
          value="UX / UI Scenarios Presentation"
          className="shero__meta--left-bottom"
        />
        <MetaBlock label="COMPONENTS" value="" plus className="shero__meta--right-mid" />
        <MetaBlock
          label="IDEA"
          value="Create the deepest immersion music listening"
          className="shero__meta--right-bottom"
        />
        <MetaBlock label="STYLEGUIDE" value="" plus className="shero__meta--left-bottom-2" />
      </div>
    </section>
  );
}
