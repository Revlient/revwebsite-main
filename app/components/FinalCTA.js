"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { CTA_LABEL, CTA_HREF, CONTACT_EMAIL } from "../lib/site";

// Closing CTA. id="start" is the anchor every persistent "Start a project"
// button currently resolves to.
export default function FinalCTA() {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const wordRefs = useRef([]);

  const headingWords =
    "A serious product deserves a quieter, sharper build.".split(" ");
  const proofItems = [
    "Strategy",
    "Interface",
    "Systems",
    "Motion",
    "Launch",
  ];
  const testimonials = [
    {
      name: "Product founder",
      text: "Clear scope, elegant execution, no theatre.",
      seed: "founder-portrait",
    },
    {
      name: "Operations lead",
      text: "They turned a messy workflow into a calm product.",
      seed: "ops-portrait",
    },
    {
      name: "Creative director",
      text: "The site finally feels as considered as the brand.",
      seed: "creative-portrait",
    },
  ];

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(wordRefs.current, { opacity: 1, y: 0 });
      gsap.set(mediaRef.current, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordRefs.current,
        { opacity: 0.18, y: 18 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            end: "center 42%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        mediaRef.current,
        { opacity: 0.28, scale: 0.88, y: 42 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 76%",
            end: "center center",
            scrub: 0.7,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section finale" id="start" ref={containerRef}>
      <div className="finale__wash" aria-hidden="true" />

      <div className="container finale__container">
        <Reveal className="finale__inner">
          <div className="finale__copy">
            <h2 className="finale__heading" aria-label={headingWords.join(" ")}>
              {headingWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  ref={(node) => {
                    if (node) wordRefs.current[index] = node;
                  }}
                  className="finale__word"
                >
                  {word}
                </span>
              ))}
              <span className="finale__inline-image" aria-hidden="true" />
            </h2>

            <p className="finale__description">
              Tell us what you&apos;re building. We&apos;ll give you a clear read
              on scope, budget, timing, and the sharpest path to ship.
            </p>

            <div className="finale__actions">
              <a href={CTA_HREF} className="btn finale__btn finale__btn--primary">
                {CTA_LABEL}
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="btn finale__btn finale__btn--ghost"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="finale__media" ref={mediaRef}>
            <div className="finale__image-stack" aria-hidden="true">
              <span className="finale__image finale__image--large" />
              <span className="finale__image finale__image--small" />
            </div>
            <p className="finale__studio-note">
              We take on fewer builds so the work can stay exact.
            </p>
          </div>
        </Reveal>

        <div className="finale__proof">
          <div className="finale__marquee" aria-hidden="true">
            <div className="finale__marquee-track">
              {[...proofItems, ...proofItems, ...proofItems].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>

          <div className="finale__testimonials" aria-label="Client notes">
            {testimonials.map((item) => (
              <figure className="finale__testimonial" key={item.seed}>
                <span
                  className="finale__avatar"
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${item.seed}/160/160)`,
                  }}
                  aria-hidden="true"
                />
                <figcaption>
                  <p>&quot;{item.text}&quot;</p>
                  <span>{item.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
