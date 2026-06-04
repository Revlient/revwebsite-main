"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CTA_HREF } from "../lib/site";

/* Application showcase placed under the ErpFeatures grid on /work.
   Three stylised phone frames — one taller centre device flanked by
   two tilted side devices — over an ambient glow + faint orbit
   line. Each device renders a faithful inline replica of one of the
   real Revlient student-app screens (Home in the centre, AI Match
   on the left, Explore Colleges on the right). Swap any
   <Screen /> for an <img src="/work/app-<key>.png" /> when the real
   PNGs are committed. */

function ArrowDown({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5 V19" />
      <path d="M6 13 L12 19 L18 13" />
    </svg>
  );
}

function StoreBadge({ store, label, sub }) {
  return (
    <span className={`appshow__store appshow__store--${store}`}>
      <span className="appshow__store-icon" aria-hidden="true">
        {store === "ios" ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.4 13.1c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.6-1.8 3.1-.5 7.7 1.2 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3 0 1.8-.8 3.4-.8s2 .8 3.4.8c1.4 0 2.3-1.3 3.2-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1-2.8-4.1zm-2.7-7.8c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.2.7-3 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.3-.6 3-1.5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 3v18l8-9-8-9zm10 7l3 1.7L8 22l6-12zM8 2l9 5.3L14 10 8 2zm9 5.3l4 2.3v4.8l-4 2.3-3-1.7 3-7.7z" />
          </svg>
        )}
      </span>
      <span className="appshow__store-text">
        <span className="appshow__store-sub">{sub}</span>
        <span className="appshow__store-label">{label}</span>
      </span>
    </span>
  );
}

/* ----- screens ----- */

function HomeScreen() {
  const tiles = [
    { key: "colleges", label: "Find Colleges", sub: "Browse all", icon: "search" },
    { key: "saved", label: "Saved Courses", sub: "Your picks", icon: "heart" },
    { key: "scholarships", label: "Scholarships", sub: "Apply now", icon: "cap" },
    { key: "ai", label: "AI Match", sub: "Get Recommendations", icon: "spark" },
    { key: "exams", label: "Entrance Exams", sub: "", icon: "clip" },
  ];
  return (
    <div className="rapp rapp--home">
      <div className="rapp__topbar">
        <span className="rapp__brandmark" aria-hidden="true">
          <svg viewBox="0 0 96 110" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
            <path d="M18 30 L46 19 L46 50 L36 56 L18 45 Z" />
            <path d="M78 30 L50 19 L50 50 L60 56 L78 45 Z" />
            <path d="M18 58 L36 58 L46 64 L46 94 L24 94 L18 80 Z" />
            <path d="M78 58 L60 58 L50 64 L50 94 L72 94 L78 80 Z" />
          </svg>
        </span>
        <div className="rapp__topbar-actions">
          <span className="rapp__icon rapp__icon--bell">
            <span className="rapp__bell-dot" />
          </span>
          <span className="rapp__icon">⌕</span>
        </div>
      </div>

      <div className="rapp__welcome">
        <p>Welcome back</p>
        <h4>Hello, Student! <span aria-hidden="true">👋</span></h4>
      </div>

      <div className="rapp__heroCard">
        <span className="rapp__heroCard-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9l10-5 10 5-10 5z" />
            <path d="M6 11v5c2 1.5 4 2 6 2s4-.5 6-2v-5" />
          </svg>
        </span>
        <h5>Your Future Starts Here</h5>
        <p>Explore top colleges and courses tailored for your career goals.</p>
      </div>

      <div className="rapp__tiles">
        {tiles.map((t) => (
          <div key={t.key} className={`rapp__tile rapp__tile--${t.key}`}>
            <span className="rapp__tile-icon" aria-hidden="true">
              {t.icon === "search" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              )}
              {t.icon === "heart" && (
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9-9c-1-3 1-6 4-6 2 0 3 1 5 3 2-2 3-3 5-3 3 0 5 3 4 6-2 4.5-9 9-9 9z" /></svg>
              )}
              {t.icon === "cap" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c2 1.5 4 2 6 2s4-.5 6-2v-5" /></svg>
              )}
              {t.icon === "spark" && (
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 3l1.6 4.6L17 9l-4.4 1.4L11 15l-1.6-4.6L5 9l4.4-1.4z" /><path d="M18 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>
              )}
              {t.icon === "clip" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4h6v3H9z" /></svg>
              )}
            </span>
            <div className="rapp__tile-text">
              <span className="rapp__tile-label">{t.label}</span>
              {t.sub && <span className="rapp__tile-sub">{t.sub}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIMatchScreen() {
  return (
    <div className="rapp rapp--aim">
      <div className="rapp__aimhead">
        <p>Get personalized college and course recommendations based on your profile, GPA, and interests.</p>
      </div>
      <div className="rapp__aimcard">
        <span className="rapp__aimcard-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="#4338ca" aria-hidden="true">
            <path d="M11 3l1.6 4.6L17 9l-4.4 1.4L11 15l-1.6-4.6L5 9l4.4-1.4z" />
            <path d="M18 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
          </svg>
        </span>
        <h5>Personalized Recommendations</h5>
        <p>Our AI engine analyzes your GPA, test scores, budget, and interests to find the best-fit colleges for you.</p>
        <span className="rapp__aimbtn">
          <span aria-hidden="true">✦</span>
          Generate My List
        </span>
        <div className="rapp__aimtags">
          <span><span aria-hidden="true">🏆</span> ASPIRATIONAL</span>
          <span><span aria-hidden="true">◎</span> TARGET</span>
          <span><span aria-hidden="true">🛡</span> SAFETY</span>
        </div>
      </div>
      <div className="rapp__aimworks">
        <span aria-hidden="true">✦</span>
        How AI Matchmaking Works
      </div>
    </div>
  );
}

function ExploreScreen() {
  const colleges = [
    { name: "Apex Culinary Academy", loc: "Paris, France", tag: "Diploma in Culinary Arts" },
    { name: "CyberSec University", loc: "Austin, TX", tag: "B.Sc. Cybersecurity" },
  ];
  return (
    <div className="rapp rapp--explore">
      <header className="rapp__exhead">
        <div>
          <h5>
            <span className="rapp__pin" aria-hidden="true">◉</span>
            Explore Colleges
          </h5>
          <p>Top picks based on popularity</p>
        </div>
        <span className="rapp__exviewall">View All →</span>
      </header>
      <div className="rapp__exsearch">
        <span className="rapp__exsearch-input">
          <span aria-hidden="true">⌕</span>
          Search colleges by name or location
        </span>
        <span className="rapp__exsearch-filter" aria-hidden="true">≡</span>
      </div>
      {colleges.map((c) => (
        <article key={c.name} className="rapp__excard">
          <div className="rapp__excard-image" aria-hidden="true" />
          <div className="rapp__excard-body">
            <h6>{c.name}</h6>
            <p>
              <span className="rapp__pin" aria-hidden="true">◉</span>
              {c.loc}
            </p>
            <span className="rapp__excard-tag">{c.tag}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function TabBar({ active }) {
  const tabs = ["Home", "Saved", "Scholarships", "Exams", "Alerts", "Profile"];
  return (
    <nav className="rapp__tabbar" aria-hidden="true">
      {tabs.map((t) => (
        <span key={t} className={`rapp__tab ${t === active ? "is-active" : ""}`.trim()}>
          <span className="rapp__tab-icon" />
          {t}
        </span>
      ))}
    </nav>
  );
}

function PhoneFrame({ variant, activeTab, style, children }) {
  return (
    <motion.div
      style={style}
      className={`appshow__phone appshow__phone--${variant}`}
    >
      <span className="appshow__phone-notch" aria-hidden="true" />
      <div className="appshow__phone-screen">
        <div className="rapp-shell">
          <div className="rapp-shell__body">{children}</div>
          <TabBar active={activeTab} />
        </div>
        <span className="appshow__phone-reflection" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

export default function AppShowcase() {
  const containerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 720);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const motionListener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", motionListener);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", motionListener);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.85], ["115%", "0%"]);
  const leftY = useTransform(scrollYProgress, [0, 0.85], ["120px", "20px"]);
  const leftRotate = useTransform(scrollYProgress, [0, 0.85], [0, -9]);
  const leftScale = useTransform(scrollYProgress, [0, 0.85], [0.9, 1]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const centerY = useTransform(scrollYProgress, [0, 0.85], ["120px", "-32px"]);
  const centerScale = useTransform(scrollYProgress, [0, 0.85], [0.9, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const rightX = useTransform(scrollYProgress, [0, 0.85], ["-115%", "0%"]);
  const rightY = useTransform(scrollYProgress, [0, 0.85], ["120px", "20px"]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.85], [0, 9]);
  const rightScale = useTransform(scrollYProgress, [0, 0.85], [0.9, 1]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const shouldAnimate = !isMobile && !prefersReducedMotion;

  const leftStyle = shouldAnimate
    ? {
        x: leftX,
        y: leftY,
        rotate: leftRotate,
        scale: leftScale,
        opacity: leftOpacity,
        animation: "none",
      }
    : undefined;

  const centerStyle = shouldAnimate
    ? {
        y: centerY,
        scale: centerScale,
        opacity: centerOpacity,
        animation: "none",
      }
    : undefined;

  const rightStyle = shouldAnimate
    ? {
        x: rightX,
        y: rightY,
        rotate: rightRotate,
        scale: rightScale,
        opacity: rightOpacity,
        animation: "none",
      }
    : undefined;

  return (
    <section ref={containerRef} className="appshow" aria-label="Mobile application showcase">
      <div className="appshow__glow appshow__glow--a" aria-hidden="true" />
      <div className="appshow__glow appshow__glow--b" aria-hidden="true" />
      <span className="appshow__orbit" aria-hidden="true" />

      <header className="appshow__head">
        <span className="appshow__eyebrow">
          <span className="appshow__dot" />
          Now shipping · iOS & Android
        </span>
        <h2 className="appshow__title">Your study-abroad journey, in your pocket.</h2>
        <p className="appshow__sub">
          Explore top colleges, save the courses worth shortlisting,
          track scholarships and let AI matchmake an aspirational /
          target / safety list — all from one home screen.
        </p>

        <div className="appshow__stores">
          <StoreBadge store="ios" sub="Download on the" label="App Store" />
          <StoreBadge store="android" sub="Get it on" label="Google Play" />
          <a href={CTA_HREF} className="appshow__cta">
            <ArrowDown className="appshow__cta-icon" />
            <span>See the build</span>
          </a>
        </div>
      </header>

      <div className="appshow__cluster">
        <PhoneFrame variant="left" activeTab="Home" style={leftStyle}>
          <AIMatchScreen />
        </PhoneFrame>
        <PhoneFrame variant="center" activeTab="Home" style={centerStyle}>
          <HomeScreen />
        </PhoneFrame>
        <PhoneFrame variant="right" activeTab="Home" style={rightStyle}>
          <ExploreScreen />
        </PhoneFrame>
      </div>

      <div className="appshow__floor" aria-hidden="true" />
    </section>
  );
}
