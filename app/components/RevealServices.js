"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const SERVICES = [
  {
    id: "chat",
    slug: "chat-engagement",
    title: "Elevate Engagement",
    eyebrow: "We are here to",
    tag: "clients engagement",
    desc: "The inclusion of an on-site chat feature ensures that your clients remain engaged and are more likely to take the desired action before leaving the website.",
    icon: "chat"
  },
  {
    id: "performance",
    slug: "performance-elevation",
    title: "Elevate Your Website Performance",
    eyebrow: "We are here to",
    tag: "website performance",
    desc: "The website is poised to experience an elevation in both repeat visitation rates and purchase frequency, fostering a heightened level of user engagement and loyalty.",
    icon: "performance"
  },
  {
    id: "conversion",
    slug: "conversion-optimization",
    title: "Maximize Conversion Rates",
    eyebrow: "We are here to",
    tag: "conversion optimization",
    desc: "Deploying high-performing checkouts, lightning-fast transitions, and strategic user flows designed to eliminate friction and turn traffic into recurring customers.",
    icon: "conversion"
  },
  {
    id: "automation",
    slug: "workflow-automation",
    title: "Automate Core Workflows",
    eyebrow: "We are here to",
    tag: "workflow automation",
    desc: "Connecting your customer pipelines, CRM systems, and background task schedulers via automated API triggers to completely eliminate manual copy-pasting.",
    icon: "automation"
  }
];

function ServiceIcon({ shape }) {
  if (shape === "chat") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (shape === "performance") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        <path d="m12 14 4-4" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    );
  }
  if (shape === "conversion") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    );
  }
  if (shape === "automation") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51-1z" />
      </svg>
    );
  }
  return null;
}

function RevealCard({ svc, index }) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsActive(true);
        } else {
          const viewportHeight = window.innerHeight;
          const exitThreshold = viewportHeight * 0.5;
          // Only collapse if the card is below the viewport center (user scrolled back up)
          if (entry.boundingClientRect.top > exitThreshold) {
            setIsActive(false);
          } else {
            setIsActive(true);
          }
        }
      },
      {
        // rootMargin narrows the trigger zone to almost the center of the screen
        rootMargin: "-38% 0px -38% 0px",
        threshold: 0
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`revcard__outer ${isActive ? "is-active" : ""}`}
      style={{ "--card-index": index }}
    >
      <a href={`/services/${svc.slug}`} className="revcard__inner" aria-label={`Explore ${svc.title}`}>
        {/* White Details Panel (Left) */}
        <div className="revcard__panel-white">
          <div className="revcard__panel-white-content">
            <div className="revcard__icon-wrap">
              <ServiceIcon shape={svc.icon} />
            </div>
            <div className="revcard__content-col">
              <div className="revcard__tag-row">
                <span className="revcard__tag">{svc.tag}</span>
              </div>
              <p className="revcard__desc">{svc.desc}</p>
            </div>
          </div>
        </div>

        {/* Grey Title Panel (Right) */}
        <div className="revcard__panel-grey">
          <span className="revcard__eyebrow">{svc.eyebrow}</span>
          <h3 className="revcard__title">{svc.title}</h3>
        </div>
      </a>
    </div>
  );
}

export default function RevealServices() {
  return (
    <section className="revcards" id="reveal-services">
      <div className="container">
        {/* Section Header */}
        <Reveal className="revcards__head">
          <div className="revcards__header-row">
            {/* Left Tag */}
            <div className="revcards__header-left">
              <span className="revcards__header-tag">
                <span className="revcards__header-tag-icon">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2.5" />
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                  </svg>
                </span>
                unlocking value
              </span>
            </div>

            {/* Center Title */}
            <div className="revcards__header-center">
              <h2 className="revcards__section-title">Our Benefits</h2>
            </div>

            {/* Right Link */}
            <div className="revcards__header-right">
              <a href="/services" className="revcards__header-link">
                Explore All <span className="highlight">Benefits</span>
                <span className="arrow">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cards Stack */}
        <div className="revcards__list">
          {SERVICES.map((svc, idx) => (
            <RevealCard key={svc.id} svc={svc} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
