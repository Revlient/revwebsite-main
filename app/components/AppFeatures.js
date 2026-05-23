"use client";

import { CTA_HREF } from "../lib/site";

/* Features-grid block placed under the AppShowcase phones on /work
   — the student-app sibling of ErpFeatures. Reuses the same
   .feat-* layout (three-column dark grid, liquid-glass marquee
   tiles, noise-overlay slate cards) and the video assets from the
   original Max Reed brief, with every card's content rewritten to
   highlight a main feature of the Revlient student app.

   PROOF RULE: the STUDENT VOICE quote stays a placeholder until the
   team supplies a real, approved testimonial. The big numeric card
   uses a verifiable feature from the live app — the three-tier
   matchmaking output (Aspirational / Target / Safety) — rather
   than a fabricated download count. */

const JOURNEY_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4";
const TIER_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4";
const COUNTRIES_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4";

const JOURNEY = [
  { period: "Step 01", role: "Build profile · GPA, tests, interests", org: "Onboarding" },
  { period: "Step 02", role: "AI matches best-fit colleges", org: "AI Match" },
  { period: "Step 03", role: "Save, apply, track decisions", org: "Workspace" },
];

const DESTINATIONS = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "Ireland",
  "France",
  "New Zealand",
  "Singapore",
  "Netherlands",
  "Italy",
  "Dubai",
];

function Sparkle({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
  );
}

function DestinationTile({ label }) {
  return (
    <span className="feat-tile liquid-glass feat-tile--label" aria-hidden="true">
      {label}
    </span>
  );
}

function Marquee({ items, direction }) {
  const loop = [...items, ...items];
  return (
    <div className={`feat-marquee feat-marquee--${direction}`} aria-hidden="true">
      <div className={`feat-marquee__track feat-marquee__track--${direction}`}>
        {loop.map((label, i) => (
          <DestinationTile key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children, align = "center" }) {
  return (
    <span className={`feat-label feat-label--${align}`}>
      <Sparkle className="feat-label__icon" />
      <span>{children}</span>
      <Sparkle className="feat-label__icon" />
    </span>
  );
}

export default function AppFeatures() {
  return (
    <section className="feat-section" aria-label="Student app features">
      <div className="feat-shell">
        <header className="feat-header">
          <div className="feat-header__copy">
            <h2 className="feat-header__title">Built for the student&apos;s first big decision.</h2>
            <p className="feat-header__sub">
              Discover colleges, save the courses worth shortlisting,
              track scholarships and let AI build an aspirational /
              target / safety list — all on the phone, all in one
              app.
            </p>
          </div>
          <a href={CTA_HREF} className="feat-cta liquid-glass">
            Get the app
          </a>
        </header>

        <div className="feat-grid">
          {/* Column 1 — APTITUDE TESTS mockup */}
          <article className="feat-card feat-card--bg feat-card--aptitude">
            <div className="feat-card__inner">
              <SectionLabel>APTITUDE TESTS</SectionLabel>
              <div className="aptitude">
                <h3 className="aptitude__heading">
                  Take guided tests before choosing your stream,
                  course, or career path.
                </h3>
                <p className="aptitude__desc">
                  Explore curated assessments that help students
                  understand strengths, interests, and the academic
                  direction that fits best.
                </p>
                <div className="aptitude__chips">
                  <span>6 assessments</span>
                  <span>Career & stream guidance</span>
                  <span>Embedded inside Revlient</span>
                </div>
                <div className="aptitude__cta">
                  <span className="aptitude__cta-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 2.5C7.34 2.5 6 3.84 6 5.5v10a3.5 3.5 0 0 0 6 3 3.5 3.5 0 0 0 6-3v-10c0-1.66-1.34-3-3-3a3 3 0 0 0-3 1.5 3 3 0 0 0-3-1.5Z" />
                      <path d="M12 6v15" />
                      <path d="M9 9.5h.01" />
                      <path d="M15 9.5h.01" />
                    </svg>
                  </span>
                  <div className="aptitude__cta-copy">
                    <strong>Choose a test and start instantly.</strong>
                    <p>Compare multiple assessments from one page and open the one you need without leaving the app.</p>
                  </div>
                  <a href={CTA_HREF} className="aptitude__cta-btn">
                    Explore Tests
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Column 2 */}
          <div className="feat-col">
            <article className="feat-card feat-card--voice noise-overlay">
              <div className="feat-card__inner">
                <SectionLabel align="start">STUDENT VOICE</SectionLabel>
                {/* TODO: replace with a real, approved quote from a
                    student / parent. */}
                <blockquote className="feat-voice__quote">
                  Placeholder testimonial — replace with the real,
                  approved quote from a student or parent before
                  launch.
                </blockquote>
                <figcaption className="feat-voice__meta">
                  <strong>TODO: student</strong>, applied via Revlient
                </figcaption>
              </div>
            </article>

            <article className="feat-card feat-card--video feat-card--metric">
              <video
                className="feat-card__video"
                src={TIER_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="feat-card__inner feat-card__inner--center">
                <span className="feat-metric__big">3</span>
                <span className="feat-metric__cap">
                  Aspirational · Target · Safety — every match,
                  sorted for the decision.
                </span>
              </div>
            </article>
          </div>

          {/* Column 3 */}
          <div className="feat-col">
            <article className="feat-card feat-card--software feat-card--aimatch">
              <div className="feat-card__inner">
                <SectionLabel>HOW AI MATCHMAKING WORKS</SectionLabel>
                <div className="aimatch" aria-label="AI matchmaking pipeline">
                  {[
                    {
                      title: "Profile Analysis",
                      body: "We scan your academic records, scores, and preferences.",
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 4.5C7.6 4.5 6.5 5.6 6.5 7v9a3 3 0 0 0 5.5 1.7 3 3 0 0 0 5.5-1.7V7c0-1.4-1.1-2.5-2.5-2.5a2.6 2.6 0 0 0-2.5 1.6 2.6 2.6 0 0 0-2.5-1.6Z" />
                          <path d="M12 6.1V20" />
                          <path d="M9 9h.01" />
                          <path d="M15 9h.01" />
                        </svg>
                      ),
                    },
                    {
                      title: "Global Benchmarking",
                      body: "Comparison with millions of data points and trends.",
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 17 L9 11 L13 15 L21 7" />
                          <path d="M15 7 L21 7 L21 13" />
                        </svg>
                      ),
                    },
                    {
                      title: "Smart Filtering",
                      body: "Final list categorized by admission probability.",
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3L4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      ),
                    },
                  ].map((step) => (
                    <div className="aimatch__step" key={step.title}>
                      <span className="aimatch__icon" aria-hidden="true">
                        {step.icon}
                      </span>
                      <div className="aimatch__text">
                        <h4>{step.title}</h4>
                        <p>{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="feat-card feat-card--reach noise-overlay">
              <a
                href={CTA_HREF}
                className="feat-reach__cta liquid-glass"
                aria-label="Get the Revlient student app"
              >
                <ArrowUpRight className="feat-reach__cta-icon" />
              </a>
              <div className="feat-card__inner">
                <SectionLabel align="start">GET THE APP</SectionLabel>
                <div className="feat-reach__lines">
                  <span className="feat-reach__line">App Store · iOS 15+</span>
                  <span className="feat-reach__line">Google Play · Android 9+</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
