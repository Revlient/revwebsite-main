"use client";

import { useState, useRef, useEffect } from "react";

export default function SideFixedBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const containerRef = useRef(null);

  // Close form when user clicks outside the panel container
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Open form panel programmatically via custom event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-request-panel", handleOpen);
    return () => window.removeEventListener("open-request-panel", handleOpen);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setFormData({ name: "", email: "", phone: "" });
    }, 2200);
  };

  // Click handler to expand container if closed
  const handleContainerClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`side-fixed-bar ${isOpen ? "is-open" : ""}`}
      role={isOpen ? "region" : "button"}
      aria-label={isOpen ? "Project request panel" : "Open project request panel"}
    >
      {/* Morphing Heading Text: Rotates and slides between states */}
      <h3 className="side-fixed-bar__title">lets start</h3>

      {/* Close Button: Slides in when active */}
      {isOpen && (
        <button
          type="button"
          className="side-fixed-bar__close"
          onClick={(e) => {
            e.stopPropagation(); // Stop click from re-expanding
            setIsOpen(false);
          }}
          aria-label="Close request panel"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Form Fields: Faded in with staggered delay */}
      <div className="side-fixed-bar__content">
        {submitted ? (
          <div className="side-fixed-bar__success">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#10B981" }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p>thank you! we will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="side-fixed-bar-form">
            <div className="side-fixed-bar-form__field field-name">
              <label htmlFor="side-bar-name">name</label>
              <input
                id="side-bar-name"
                type="text"
                required
                disabled={!isOpen}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="your name"
              />
            </div>

            <div className="side-fixed-bar-form__field field-email">
              <label htmlFor="side-bar-email">email</label>
              <input
                id="side-bar-email"
                type="email"
                required
                disabled={!isOpen}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your email"
              />
            </div>

            <div className="side-fixed-bar-form__field field-phone">
              <label htmlFor="side-bar-phone">phone</label>
              <input
                id="side-bar-phone"
                type="tel"
                required
                disabled={!isOpen}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="your phone number"
              />
            </div>

            <div className="side-fixed-bar-form__actions field-submit">
              <button type="submit" disabled={!isOpen} className="side-fixed-bar-form__submit">
                submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
