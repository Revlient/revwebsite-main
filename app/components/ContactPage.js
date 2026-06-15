"use client";
 
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Reveal from "./Reveal";
import CalEmbed from "./CalEmbed";
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
  { id: "phone", label: "Phone", type: "tel", placeholder: "Your phone number" },
  { id: "company", label: "Company", type: "text", placeholder: "Company or studio" },
  { id: "project", label: "Project", type: "text", placeholder: "Project type (e.g. Website redesign)" },
  { id: "budget", label: "Budget", type: "text", placeholder: "Budget range" },
];

export default function ContactPage() {
  const rootRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const company = String(data.get("company") || "").trim();
    const project = String(data.get("project") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const brief = String(data.get("brief") || "").trim();

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          project,
          budget,
          message: brief,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit lead");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save lead in ERP, opening mail client:", err);
      // Fallback: open email client draft if ERP submission fails
      const subject = encodeURIComponent(
        `${company || "New project"} inquiry from ${name || "a visitor"}`
      );
      const body = encodeURIComponent(
        [
          `Name: ${name || "-"}`,
          `Email: ${email || "-"}`,
          `Phone: ${phone || "-"}`,
          `Company: ${company || "-"}`,
          `Project: ${project || "-"}`,
          `Budget: ${budget || "-"}`,
          "",
          brief || "Brief not provided.",
        ].join("\n")
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
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
            <CalEmbed instanceId="contact" className="contact-hero__cal" />
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
            {submitted ? (
              <div className="contact-form__success" style={{ padding: "3rem 1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px" }}>
                <svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#e5be6e", marginBottom: "1.5rem" }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.85rem", color: "#ffffff" }}>Brief Received</h2>
                <p style={{ color: "rgba(255, 255, 255, 0.7)", maxWidth: "26rem", margin: "0 auto", fontSize: "1.05rem", lineHeight: "1.6" }}>
                  Thank you! Your project brief has been recorded directly in our system. We will review it and follow up shortly.
                </p>
              </div>
            ) : (
              <>
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
                        <input id={field.id} name={field.id} type={field.type} placeholder={field.placeholder} required={field.id === "name" || field.id === "email"} />
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
                    <button type="submit" className="contact-btn contact-btn--primary" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <p>
                      Or reach us directly at{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                    </p>
                  </div>
                </form>
              </>
            )}
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
