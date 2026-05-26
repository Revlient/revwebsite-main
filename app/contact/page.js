"use client";

import { useMemo, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND, CONTACT_EMAIL, WHATSAPP_URL } from "../lib/site";
import Reveal from "../components/Reveal";

const CATEGORIES = [
  "Web Development",
  "Mobile App",
  "Custom Software",
  "Automation / ERP",
  "Design / UX",
  "Other",
];

const BUDGETS = [
  "Under ₹5L",
  "₹5L - ₹15L",
  "₹15L - ₹40L",
  "₹40L+",
];

function Sparkles() {
  const sparkles = useMemo(() => {
    const out = [];
    for (let i = 0; i < 20; i++) {
      const top = ((i * 37) % 100);
      const left = ((i * 53 + 11) % 100);
      const delay = -((i * 0.41) % 5);
      const dur = 2 + ((i * 0.73) % 3);
      const size = 1.5 + ((i * 0.4) % 2);
      out.push({ top, left, delay, dur, size });
    }
    return out;
  }, []);
  return (
    <div className="proc-sparkles" aria-hidden="true">
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="proc-sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
            background: "#c084fc",
          }}
        />
      ))}
    </div>
  );
}

export default function ContactRoute() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!category) {
      setError("Please select a project category.");
      return;
    }
    if (!budget) {
      setError("Please select your estimated budget.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <>
      <Nav scrolledOnly={false} />
      <div className="contact-shell">
        <div className="contact-noise" aria-hidden="true" />
        <div className="contact-spot contact-spot--1" aria-hidden="true" />
        <div className="contact-spot contact-spot--2" aria-hidden="true" />
        <Sparkles />

        <main className="contact-container">
          <div className="contact-grid">
            {/* Left Column */}
            <Reveal className="contact-info">
              <span className="contact-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Secure Enquiry
              </span>
              <h1 className="contact-heading">
                Let&apos;s build<br />
                something <em>lasting.</em>
              </h1>
              <p className="contact-sub">
                Tell us what you&apos;re building. Whether you have a detailed spec sheet or just a rough sketch on a napkin, our senior team will shape it with you.
              </p>

              <div className="contact-channels">
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact-channel-card">
                  <span className="contact-channel-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">Direct Email</span>
                    <span className="contact-channel-value">{CONTACT_EMAIL}</span>
                  </div>
                </a>

                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-channel-card">
                  <span className="contact-channel-icon" style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 0 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </span>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">WhatsApp Channel</span>
                    <span className="contact-channel-value" style={{ color: "#4ade80" }}>Instant Speed Routing</span>
                  </div>
                </a>

                <div className="contact-channel-card">
                  <span className="contact-channel-icon" style={{ background: "rgba(43,95,255,0.12)", color: "#4a78ff" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">Studio Base</span>
                    <span className="contact-channel-value">Kerala, India</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column */}
            <div className="contact-form-panel">
              <Reveal className="contact-form-card" delay={100}>
                {!submitted ? (
                  <>
                    <header className="contact-form-header">
                      <h2 className="contact-form-title">Enquiry Briefing</h2>
                      <p className="contact-form-sub">We typically read and reply within a few business hours.</p>
                    </header>

                    {error && (
                      <div style={{ color: "#f87171", fontSize: "0.85rem", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", padding: "0.75rem 1rem", borderRadius: "10px", marginBottom: "1.5rem" }}>
                        {error}
                      </div>
                    )}

                    <form className="contact-form" onSubmit={handleSubmit}>
                      <div className="contact-grid-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                        <div className="contact-group">
                          <label className="contact-label" htmlFor="client-name">Your name</label>
                          <input
                            type="text"
                            id="client-name"
                            className="contact-input"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="contact-group">
                          <label className="contact-label" htmlFor="client-email">Email address</label>
                          <input
                            type="email"
                            id="client-email"
                            className="contact-input"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="contact-group">
                        <span className="contact-label">Project category</span>
                        <div className="contact-pill-grid">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              className={`contact-pill-btn ${category === cat ? "is-active" : ""}`}
                              onClick={() => setCategory(cat)}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="contact-group">
                        <span className="contact-label">Estimated budget</span>
                        <div className="contact-pill-grid">
                          {BUDGETS.map((bdg) => (
                            <button
                              key={bdg}
                              type="button"
                              className={`contact-pill-btn ${budget === bdg ? "is-active" : ""}`}
                              onClick={() => setBudget(bdg)}
                            >
                              {bdg}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="contact-group">
                        <label className="contact-label" htmlFor="client-msg">Tell us about your project</label>
                        <textarea
                          id="client-msg"
                          className="contact-input"
                          placeholder="Provide a quick outline of features, deadlines, or scope targets..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="contact-submit-btn">
                        <span>Send Enquiry</span>
                        <svg className="contact-submit-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="contact-success-card">
                    <span className="contact-success-ring">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <h2 className="contact-success-title">Briefing Received!</h2>
                    <p className="contact-success-desc">
                      Thank you, {name}. Your information has been safely received by our senior team. We will review it shortly.
                    </p>

                    <div className="contact-success-chat">
                      <div className="contact-success-chat-head">
                        <span className="contact-success-chat-dot" />
                        <span>Revlient Assistant</span>
                      </div>
                      <p className="contact-success-chat-msg">
                        Hi {name}, I&apos;ve logged your enquiry for a <strong>{category}</strong> ({budget}). Let&apos;s skip the waiting line—hit the WhatsApp link below to chat with our operations lead directly!
                      </p>
                    </div>

                    <div className="contact-success-whatsapp-row">
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-success-whatsapp-btn">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: "4px" }}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                        </svg>
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
