"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";
import {
  BRAND,
  CONTACT_EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SYSTEMS_URL,
  WHATSAPP_URL,
} from "../lib/site";

const SIGNALS = [
  {
    label: "Response",
    title: "One clear reply",
    body: "We usually respond with a practical next step and a short read on fit.",
  },
  {
    label: "Channels",
    title: "Email, phone, WhatsApp",
    body: "Pick the channel that matches how quickly you need the work to move.",
  },
  {
    label: "Best brief",
    title: "Goal, timing, context",
    body: "A few sentences are enough if the target, timeline, and reference are clear.",
  },
];

const CONTACT_ROWS = [
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  { label: "WhatsApp", value: "Open chat", href: WHATSAPP_URL, external: true },
  { label: "Systems", value: "revlient.com/systems", href: SYSTEMS_URL, external: true },
];

const FIELDS = [
  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
  { id: "email", label: "Email", type: "email", placeholder: "you@company.com" },
  { id: "company", label: "Company", type: "text", placeholder: "Company or studio" },
  { id: "budget", label: "Budget", type: "text", placeholder: "Budget range" },
];

export default function ContactPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        root.querySelectorAll(".contact__title-line"),
        { yPercent: 120, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: reduced ? 0 : 0.8,
          stagger: 0.08,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        root.querySelectorAll(".contact__fade"),
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: reduced ? 0 : 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const brief = String(data.get("brief") || "").trim();

    const subject = encodeURIComponent(
      `${company || "New project"} inquiry from ${name || "a visitor"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name || "-"}`,
        `Email: ${email || "-"}`,
        `Company: ${company || "-"}`,
        `Budget: ${budget || "-"}`,
        "",
        brief || "Brief not provided.",
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-shell overflow-x-hidden w-full max-w-full">
      <div className="contact-shell__wash" aria-hidden="true" />
      <div className="contact-shell__grain" aria-hidden="true" />

      <div className="container contact-shell__inner" ref={rootRef}>
        <section className="contact-hero">
          <Reveal className="contact-hero__copy">
            <p className="contact-hero__eyebrow">Contact</p>
            <h1 className="contact-hero__title">
              <span className="contact__title-line">Let&apos;s shape</span>
              <span className="contact__title-line">the next project</span>
            </h1>
            <p className="contact-hero__lead contact__fade">
              Tell us what you are building, how quickly it needs to land, and
              where the friction is. We will reply with a clear next step, not
              a template.
            </p>
            <div className="contact-hero__actions contact__fade">
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-btn contact-btn--primary">
                Email us
              </a>
              <a href={WHATSAPP_URL} className="contact-btn contact-btn--ghost" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal className="contact-hero__visual contact__fade" delay={80}>
            <div className="contact-hero__frame">
              <img
                src="https://picsum.photos/seed/revlient-contact-desk/1400/1700"
                alt=""
              />
              <div className="contact-hero__overlay">
                <span className="contact-hero__overlay-label">Studio contact</span>
                <strong>Clean brief, clean reply.</strong>
              </div>
            </div>
            <div className="contact-hero__aside">
              {CONTACT_ROWS.map((row) => (
                <a
                  key={row.label}
                  href={row.href}
                  className="contact-hero__row"
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                >
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="contact-signals contact__fade">
          <div className="contact-signals__grid">
            {SIGNALS.map((signal) => (
              <article key={signal.label} className="contact-signal">
                <span className="contact-signal__eyebrow">{signal.label}</span>
                <h2>{signal.title}</h2>
                <p>{signal.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-form-wrap">
          <Reveal className="contact-form-card contact__fade" delay={120}>
            <div className="contact-form-card__head">
              <p className="contact-hero__eyebrow">Send a brief</p>
              <h2>Write the project in plain language.</h2>
              <p>
                A few structured details help us reply faster and with less back
                and forth.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__grid">
                {FIELDS.map((field) => (
                  <label key={field.id} className="contact-field" htmlFor={field.id}>
                    <span>{field.label}</span>
                    <input id={field.id} name={field.id} type={field.type} placeholder={field.placeholder} />
                  </label>
                ))}
              </div>

              <label className="contact-field contact-field--textarea" htmlFor="brief">
                <span>Project brief</span>
                <textarea
                  id="brief"
                  name="brief"
                  rows="6"
                  placeholder="What are you building, what should it do, and what needs to feel better?"
                />
              </label>

              <div className="contact-form__actions">
                <button type="submit" className="contact-btn contact-btn--primary">
                  Open email draft
                </button>
                <p>
                  Or reach us directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              </div>
            </form>
          </Reveal>

          <div className="contact-side">
            <Reveal className="contact-side__card contact__fade" delay={160}>
              <p className="contact-hero__eyebrow">How we work</p>
              <h2>Clear scope beats volume.</h2>
              <ul className="contact-side__list">
                <li>One goal for the project.</li>
                <li>One timeline or launch window.</li>
                <li>One reference for taste or pacing.</li>
              </ul>
            </Reveal>

            <Reveal className="contact-side__card contact-side__card--soft contact__fade" delay={200}>
              <p className="contact-hero__eyebrow">Direct</p>
              <div className="contact-side__details">
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                <a href={SYSTEMS_URL} target="_blank" rel="noopener noreferrer">
                  Revlient Systems
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact-footer contact__fade" aria-label="Contact footer">
          <span>{BRAND.name}</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={SYSTEMS_URL} target="_blank" rel="noopener noreferrer">
            Systems
          </a>
        </section>
      </div>
    </main>
  );
}
