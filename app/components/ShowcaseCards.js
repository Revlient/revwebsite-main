"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

const TESTIMONIAL_ROWS = [
  [
    { quote: "The cinematic digital presence Antigravity crafted perfectly matches our architectural standards.", author: "House of Eleven", short: "XI", color: "#C5A880" },
    { quote: "A highly structured, high-conversion SPA that doubled our inbound consultation inquiries.", author: "IBS Consultants", short: "IBS", color: "#4F46E5" },
    { quote: "A gorgeous digital flagship that truly captures the premium, boutique feel of our coworking spaces.", author: "Covspace", short: "COV", color: "#10B981" },
    { quote: "Minimalist, editorial, and fast. Our Shopify storefront conversion rate has soared since launch.", author: "Ronspire", short: "RON", color: "#F43F5E" },
    { quote: "The interactive course discovery modules and student portal have transformed our digital campus.", author: "Perpex B-School", short: "MGN", color: "#3B82F6" }
  ],
  [
    { quote: "A refined, architectural approach to corporate identity. Clean service presentation at its best.", author: "Perpex Group", short: "PRX", color: "#8B5CF6" },
    { quote: "Outstanding EdTech platform performance. Handles real-time competitive scoring under load flawlessly.", author: "Mathlete", short: "MTH", color: "#F59E0B" },
    { quote: "A trustworthy gateway for global education consultancy, built with absolute detail and polish.", author: "The Magnates", short: "TMG", color: "#EAB308" },
    { quote: "Clean SaaS design and intelligent recruitment workflows. Our clients love the new interface.", author: "UniGo", short: "UNG", color: "#06B6D4" },
    { quote: "An elegant, premium booking experience and gallery that reflects the luxury of our studio.", author: "Soumya Shyam", short: "SS", color: "#EC4899" }
  ],
  [
    { quote: "A beautiful and fluid fruit subscription e-commerce flow. High conversion out of the box.", author: "Nutriboxx", short: "NBX", color: "#10B981" },
    { quote: "A minimal, high-performing green storefront. Our sustainable personal care sales have grown.", author: "Bambrush", short: "BAM", color: "#84CC16" },
    { quote: "Incredible execution on our AI and learning dashboards. Clean, crisp, and robust.", author: "Magnate Academy", short: "MGN", color: "#3B82F6" },
    { quote: "A premium overseas portal that beautifully highlights our university partnerships.", author: "Magnate Study Abroad", short: "MGN", color: "#C5A880" },
    { quote: "Premier admitted-student workflows and visa-support tools built with outstanding UX polish.", author: "Magnate Global", short: "IBS", color: "#4F46E5" }
  ]
];

const COMPANY_LOGOS = [
  { name: "House of Eleven", src: "/logos/houseof11.png" },
  { name: "IBS Consultants", src: "/logos/ibs.jpg" },
  { name: "Covspace", src: "/logos/covspace.png" },
  { name: "Ronspire", src: "/logos/ronspire.svg" },
  { name: "Perpex B-School", src: "/logos/perpexbschool.svg" },
  { name: "Perpex Group", src: "/logos/perpex.png" },
  { name: "Mathlete", src: "/logos/mathlete.png" },
  { name: "The Magnates", src: "/logos/themagnates.svg" },
  { name: "UniGo", src: "/logos/unigo.png" },
  { name: "Soumya Shyam", src: "/logos/soumyashyam.png" },
  { name: "Nutriboxx", src: "/logos/nutriboxx.png" },
  { name: "Bambrush", src: "/logos/bambrush.webp" },
  { name: "Magnate Academy", src: "/logos/magnateacademy.svg" },
  { name: "Magnate Study Abroad", src: "/logos/magnatestudyabroad.svg" },
  { name: "Magnate Global", src: "/logos/magnateglobal.svg" }
];

const Arrow = ({ dir = 1 }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      d={dir === 1 ? "M5 12h13M12 6l6 6-6 6" : "M19 12H6M12 6l-6 6 6 6"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ShowcaseCards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia();
    const tweens = [];

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        isMobile: "(max-width: 759px)",
        isDesktop: "(min-width: 760px)",
      },
      (context) => {
        const { reduceMotion, isMobile, isDesktop } = context.conditions;
        const tracks = gsap.utils.toArray(".wol__marquee-track", root);

        if (reduceMotion) {
          gsap.set(tracks, { xPercent: 0 });
          return undefined;
        }

        if (isMobile) {
          gsap.set(tracks, { xPercent: 0 });
          root.classList.add("wol--mobile-motion");
          return () => {
            root.classList.remove("wol--mobile-motion");
          };
        }

        tracks.forEach((track, index) => {
          const direction = index % 2 === 0 ? -50 : 0;
          const from = index % 2 === 0 ? 0 : -50;
          gsap.set(track, { xPercent: from });

          tweens.push(
            gsap.to(track, {
              xPercent: direction,
              duration: isDesktop ? 34 + index * 6 : 42 + index * 5,
              ease: "none",
              repeat: -1,
            })
          );
        });

        return () => {
          tweens.splice(0).forEach((tween) => tween.kill());
        };
      },
      root
    );

    const pause = () => tweens.forEach((tween) => tween.pause());
    const play = () => tweens.forEach((tween) => tween.play());

    const marquees = root.querySelectorAll(".wol__marquee, .wol__logos-marquee");

    marquees.forEach((el) => {
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", play);
      el.addEventListener("focusin", pause);
      el.addEventListener("focusout", play);
    });

    return () => {
      marquees.forEach((el) => {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", play);
        el.removeEventListener("focusin", pause);
        el.removeEventListener("focusout", play);
      });
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section pscard pscard--minimal"
      aria-label="Selected client work"
    >
      <div className="container">
        <Reveal className="wol">
          <div className="wol__intro">
            <p className="wol__kicker">Selected trust</p>
            <h2>
              Loved by builders who need the work to feel considered.
            </h2>
            <p>
              A quieter look at the teams and operators who bring us in when
              the product has to be clear, usable, and ready to ship.
            </p>
            <a href={CTA_HREF} className="wol__cta">
              <span>Start a project</span>
              <span aria-hidden="true">
                <Arrow />
              </span>
            </a>
          </div>

          <div className="wol__panel">
            <div className="wol__marquee" aria-label="Client testimonials">
              {TESTIMONIAL_ROWS.map((row, rowIndex) => (
                <div className="wol__marquee-row" key={rowIndex}>
                  <div className="wol__marquee-track">
                    {[...row, ...row].map((item, index) => (
                      <div
                        className="wol__testimonial-card"
                        key={`${rowIndex}-${item.author}-${index}`}
                      >
                        <span className="wol__testimonial-quote">“{item.quote}”</span>
                        <span className="wol__testimonial-author">{item.author}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="wol__logos-section">
              <p className="wol__logos-title">Trusted by industry leaders & builders</p>
              <div className="wol__logos-marquee" aria-label="Partner logos">
                <div className="wol__marquee-track">
                  {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((company, index) => (
                    <div className="wol__logo-capsule" key={`${company.name}-${index}`}>
                      <img
                        className="wol__logo-image"
                        src={company.src}
                        alt={`${company.name} logo`}
                        loading="lazy"
                      />
                      <span className="wol__logo-name">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
