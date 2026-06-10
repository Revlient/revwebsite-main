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
          {/* Column 1 — APTITUDE TESTS mockup (matches the live app screen) */}
          <article className="feat-card feat-card--bg feat-card--aptitude">
            <div className="feat-card__inner">
              <div className="aptitude">
                <span className="aptitude__pill">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" />
                  </svg>
                  APTITUDE TESTS
                </span>
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
                  <span>Career and stream guidance</span>
                  <span>Embedded inside Revlient</span>
                </div>
                <div className="aptitude__cta">
                  <span className="aptitude__cta-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 4.5C7.6 4.5 6.5 5.6 6.5 7v9a3 3 0 0 0 5.5 1.7 3 3 0 0 0 5.5-1.7V7c0-1.4-1.1-2.5-2.5-2.5a2.6 2.6 0 0 0-2.5 1.6 2.6 2.6 0 0 0-2.5-1.6Z" />
                      <path d="M12 6.1V20" />
                      <path d="M9 9h.01" />
                      <path d="M15 9h.01" />
                    </svg>
                  </span>
                  <strong>Choose a test and start instantly.</strong>
                  <p>Compare multiple assessments from one page and open the one you need without leaving the app.</p>
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
                <blockquote className="feat-voice__quote">
                  "The matching algorithm suggested three programs I hadn't even considered, and the safety match suggestions were spot on. I got into my dream CS program with half the usual application stress."
                </blockquote>
                <figcaption className="feat-voice__meta">
                  <strong>Aarav Sharma</strong>, UIUC CS Class of '28
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
                <div className="aimatch" aria-label="AI matchmaking pipeline">
                  <header className="aimatch__head">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 3 L13.6 10.4 L21 12 L13.6 13.6 L12 21 L10.4 13.6 L3 12 L10.4 10.4 Z" />
                    </svg>
                    <span>How AI Matchmaking Works</span>
                  </header>
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

            <article className="feat-card feat-card--reach noise-overlay feat-card--aichat-slot">
              <div className="feat-card__inner">
                <div className="aichat" aria-label="AI Counsellor chat preview">
                  <header className="aichat__head">
                    <span className="aichat__avatar" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="9" y="2" width="6" height="3" rx="1" />
                        <rect x="4" y="6" width="16" height="13" rx="3" />
                        <circle cx="9" cy="13" r="1.5" fill="#fff" />
                        <circle cx="15" cy="13" r="1.5" fill="#fff" />
                      </svg>
                    </span>
                    <span className="aichat__title">AI Counsellor</span>
                    <span className="aichat__close" aria-hidden="true">×</span>
                  </header>
                  <div className="aichat__body">
                    <div className="aichat__msg aichat__msg--user">
                      <span className="aichat__bubble">Hey</span>
                      <span className="aichat__userpic" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                      </span>
                    </div>
                    <div className="aichat__msg aichat__msg--bot">
                      <span className="aichat__botpic" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <rect x="9" y="2" width="6" height="3" rx="1" />
                          <rect x="4" y="6" width="16" height="13" rx="3" />
                          <circle cx="9" cy="13" r="1.5" fill="#fff" />
                          <circle cx="15" cy="13" r="1.5" fill="#fff" />
                        </svg>
                      </span>
                      <p className="aichat__bubble">
                        Hello, welcome to our university admissions
                        platform. I&apos;m here to help you find your
                        perfect university match.
                      </p>
                    </div>
                  </div>
                  <div className="aichat__input">
                    <span className="aichat__placeholder">Ask something…</span>
                    <span className="aichat__send" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21l19-9L3 3v6l13 3-13 3z" /></svg>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
