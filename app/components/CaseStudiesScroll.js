"use client";

import { useEffect, useRef, useState } from "react";

/* Industry-themed case studies. As the user scrolls vertically,
   the section pins and the row of large rectangular cards
   translates LEFT-to-RIGHT through the viewport. Once the track
   is fully scrolled past, the page resumes normal scroll.
   PROOF RULE: industry-level framing only — no fabricated client
   names or outcome metrics. */

const INDUSTRIES = [
  {
    num: "01",
    name: "Education & Training",
    tag: "Academies · Study Abroad · LMS",
    body:
      "Custom ERPs, lead-to-enrolment workflows, and student portals for academies and consultancies. Operations that scale without the manual chase.",
    services: ["ERP", "Websites", "CRM", "Mobile apps"],
  },
  {
    num: "02",
    name: "Healthcare",
    tag: "Clinics · Hospitals · Practices",
    body:
      "Patient management, appointment systems, and HIPAA-conscious portals for healthcare providers — built for clinicians, not bureaucrats.",
    services: ["EMR", "Booking", "Portals", "Integrations"],
  },
  {
    num: "03",
    name: "Fintech & Banking",
    tag: "Lending · Payments · Wealth",
    body:
      "Compliance-aware dashboards, transaction flows, and analytics surfaces for fintech operators. Fast on the rails, calm on the eye.",
    services: ["SaaS", "Dashboards", "APIs", "Compliance"],
  },
  {
    num: "04",
    name: "Retail & E-commerce",
    tag: "DTC · B2B · Marketplaces",
    body:
      "Storefronts, catalog systems and back-office automations for brands shipping product — premium on the customer side, ruthless on operations.",
    services: ["Storefronts", "Headless", "CMS", "Ops"],
  },
];

export default function CaseStudiesScroll() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const rafRef = useRef(0);
  const inViewRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    let lastProgress = -1;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      if (progress === lastProgress) return;
      lastProgress = progress;

      const trackW = track.scrollWidth;
      const viewW = viewport.clientWidth;
      const maxX = Math.max(0, trackW - viewW);
      const x = progress * maxX;
      track.style.transform = `translate3d(${-x}px, 0, 0)`;

      const idx = Math.min(
        INDUSTRIES.length - 1,
        Math.floor(progress * INDUSTRIES.length)
      );
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (!inViewRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        inViewRef.current = e.isIntersecting;
        if (e.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "0px 0px -1px 0px", threshold: 0 }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="csscroll" aria-label="Industries we serve">
      <div ref={stageRef} className="csscroll__stage">
        <header className="csscroll__head">
          <span className="csscroll__eyebrow">// Industries</span>
          <h2 className="csscroll__title">
            Industries we have <span className="csscroll__title-italic">expertise</span> in.
          </h2>
          <div className="csscroll__meta">
            <span className="csscroll__counter">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="csscroll__counter-slash">/</span>
              {String(INDUSTRIES.length).padStart(2, "0")}
            </span>
            <span className="csscroll__hint">Scroll →</span>
          </div>
        </header>

        <div ref={viewportRef} className="csscroll__track-viewport">
          <div ref={trackRef} className="csscroll__track">
            {INDUSTRIES.map((ind, i) => (
              <article
                key={ind.num}
                className={`csscroll__card${i === activeIndex ? " is-active" : ""}`}
              >
                <header className="csscroll__card-head">
                  <span className="csscroll__card-num">{ind.num}</span>
                  <span className="csscroll__card-tag">{ind.tag}</span>
                </header>
                <div className="csscroll__card-body">
                  <h3 className="csscroll__card-name">{ind.name}</h3>
                  <p className="csscroll__card-p">{ind.body}</p>
                </div>
                <footer className="csscroll__card-foot">
                  {ind.services.map((s) => (
                    <span key={s} className="csscroll__card-chip">{s}</span>
                  ))}
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
