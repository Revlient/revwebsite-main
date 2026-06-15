"use client";

import { useState, useEffect } from "react";
import Reveal from "../Reveal";
import { CTA_HREF } from "../../lib/site";

export default function AppShowcaseServices() {
  const [activeTab, setActiveTab] = useState("Cross-Platform");

  return (
    <div className="svc-music-showcase">
      {/* 1. Header Tags */}
      <Reveal className="svc-music-showcase__header">
        <span className="svc-music-showcase__tag-left">focus: custom apps</span>
        <div className="svc-music-showcase__chips">
          {["iOS", "Android", "Cross-Platform"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`svc-music-showcase__chip ${activeTab === tab ? "is-active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="svc-music-showcase__tag-right">stack: swift / kotlin / react native</span>
      </Reveal>

      {/* 2. Title Section */}
      <div className="svc-music-showcase__title-container">
        <Reveal delay={100}>
          <h2 className="svc-music-showcase__title">
            Crafting. <em className="svc-music-showcase__title-italic">immersive</em> mobile application <span className="svc-music-showcase__title-outline">experiences</span>
          </h2>
        </Reveal>
      </div>

      {/* 3. Metadata Grid */}
      <Reveal className="svc-music-showcase__metadata" delay={150}>
        <div className="svc-music-showcase__meta-left">
          <span>type: high-fidelity production</span>
          <span className="svc-music-showcase__meta-dot" />
          <span>standard: store-ready</span>
        </div>
        <div className="svc-music-showcase__meta-right">
          <span>design: pixel-perfect</span>
          <span className="svc-music-showcase__meta-dot" />
          <span>performance: 60fps native</span>
        </div>
      </Reveal>

      {/* 4. Mockup & Floating Cards Area */}
      <div className="svc-music-showcase__stage">
        {/* Glow Effects */}
        <div className="svc-music-showcase__glow svc-music-showcase__glow--a" aria-hidden="true" />
        <div className="svc-music-showcase__glow svc-music-showcase__glow--b" aria-hidden="true" />
        <span className="svc-music-showcase__orbit" aria-hidden="true" />

        {/* Floating Cards (Left) */}
        <div className="svc-music-showcase__floating-col svc-music-showcase__floating-col--left">
          {/* Card 1: Social Integration */}
          <Reveal className="svc-music-showcase__floating-card float-card-1" delay={200}>
            <div className="float-card-1__header">
              <span className="float-card-1__icon">✉</span>
              <h4>Social Integration</h4>
            </div>
            <p>Build real-time multiplayer coordination and deep-linked invite sharing flows.</p>
            <div className="float-card-1__action">
              <span className="float-card-1__link">revlient.com/share/invite-link</span>
              <button className="float-card-1__btn">Invite</button>
            </div>
          </Reveal>

          {/* Card 2: Design System Sync */}
          <Reveal className="svc-music-showcase__floating-card float-card-2" delay={300}>
            <div className="float-card-2__live-bar">
              <div className="float-card-2__live-tag">
                <span className="float-card-2__pulse-dot" />
                LIVE
              </div>
              <div className="float-card-2__avatars">
                <div className="float-card-2__avatar">
                  <img src="/services/alex-clare.webp" alt="User 1" />
                </div>
                <div className="float-card-2__avatar">
                  <img src="/services/male-user.webp" alt="User 2" />
                </div>
                <div className="float-card-2__avatar-placeholder">+4</div>
              </div>
            </div>
            <div className="float-card-2__body">
              <span className="float-card-2__sub">engineering standards</span>
              <h4>Design System Sync</h4>
              <button className="float-card-2__btn">+ Styleguide</button>
            </div>
          </Reveal>
        </div>

        {/* Central Phone Mockup (Visual UI Prototype) */}
        <Reveal className="svc-music-showcase__phone-wrapper" delay={180}>
          <div className="svc-music-showcase__phone">
            {/* Phone Hardware Bits */}
            <span className="svc-music-showcase__phone-notch" />
            <div className="svc-music-showcase__phone-status">
              <span className="phone-time">9:41</span>
              <div className="phone-icons">
                <span className="phone-icon-signal">📶</span>
                <span className="phone-icon-wifi">📶</span>
                <span className="phone-icon-battery">🔋</span>
              </div>
            </div>

            {/* Phone Screen Content */}
            <div className="svc-music-showcase__phone-screen">
              {/* Pulsing Orb Background */}
              <div className="phone-screen__orb" />

              {/* Main Content Overlay */}
              <div className="phone-screen__content">
                {/* Header */}
                <div className="phone-screen__header">
                  <span className="phone-screen__back-btn">←</span>
                  <span className="phone-screen__badge">PROTOTYPE</span>
                  <span className="phone-screen__menu-btn">•••</span>
                </div>

                {/* Podcast Title */}
                <div className="phone-screen__title-section">
                  <h3 className="phone-screen__podcast-title">Feminism in IT</h3>
                  <p className="phone-screen__podcast-sub">Hosted by Alex Clare & Guests</p>
                </div>

                {/* Speaking Card */}
                <div className="phone-screen__card speaking-card">
                  <div className="speaking-card__user">
                    <div className="speaking-card__avatar">
                      <img src="/services/alex-clare.webp" alt="Alex Clare" />
                      <span className="speaking-card__mic-indicator">🎙</span>
                    </div>
                    <div className="speaking-card__info">
                      <span className="speaking-card__label">Speaking</span>
                      <h4>Alex Clare</h4>
                    </div>
                  </div>
                  {/* Equalizer animation */}
                  <div className="speaking-card__wave voice-wave">
                    <span className="voice-wave__bar" />
                    <span className="voice-wave__bar" />
                    <span className="voice-wave__bar" />
                    <span className="voice-wave__bar" />
                    <span className="voice-wave__bar" />
                  </div>
                </div>

                {/* Discuss Card */}
                <div className="phone-screen__card discuss-card">
                  <div className="discuss-card__avatars">
                    <div className="discuss-card__avatar">
                      <img src="/services/male-user.webp" alt="Participant 1" />
                    </div>
                    <div className="discuss-card__avatar">
                      <span className="avatar-placeholder-svg">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                      </span>
                    </div>
                    <div className="discuss-card__avatar-more">+12</div>
                  </div>
                  <div className="discuss-card__action">
                    <button className="discuss-card__btn">Discuss</button>
                    <span className="discuss-card__badge">💬 3</span>
                  </div>
                </div>

                {/* Next Topic Card */}
                <div className="phone-screen__card next-card">
                  <div className="next-card__header">
                    <span className="next-card__dot" />
                    <span className="next-card__label">NEXT IN THIS TOPIC</span>
                  </div>
                  <p className="next-card__topic">Why do women in IT have to work twice as hard?</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Floating Cards (Right) */}
        <div className="svc-music-showcase__floating-col svc-music-showcase__floating-col--right">
          {/* Card 3: Security & Auth */}
          <Reveal className="svc-music-showcase__floating-card float-card-3" delay={250}>
            <div className="float-card-3__header">
              <span className="float-card-3__badge">✓</span>
              <h4>Security & Auth</h4>
            </div>
            <p>Implement secure multi-factor authentication, biometrics, and token validation flow.</p>
            <button className="float-card-3__btn">Verify</button>
          </Reveal>

          {/* Card 4: Uptime and Live Components */}
          <Reveal className="svc-music-showcase__floating-card float-card-4" delay={350}>
            <div className="float-card-4__top">
              <div className="float-card-4__arc-container">
                <svg className="float-card-4__svg" viewBox="0 0 36 36">
                  <path
                    className="float-card-4__arc-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="float-card-4__arc-fill"
                    strokeDasharray="99, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="float-card-4__arc-text">
                  <span className="float-card-4__number">99.9%</span>
                  <span className="float-card-4__unit">uptime</span>
                </div>
              </div>
              <div className="float-card-4__badge">perf</div>
            </div>
            <div className="float-card-4__body">
              <span className="float-card-4__sub font-mono">state / cache</span>
              <h4>Performance Audit</h4>
              <button className="float-card-4__btn">+ Components</button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
