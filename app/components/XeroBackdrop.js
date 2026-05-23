"use client";

/* Backdrop for the testimonials section. The original Xero-style
   icon pipeline (Stack → centre → Shield with an animated beam) was
   retired to declutter the section — the soft brand-blue gradient
   arc alone now carries the testimonials backdrop. Class names are
   preserved so .xero-bg__arc styling in globals.css still applies. */

export default function XeroBackdrop() {
  return (
    <div className="xero-bg" aria-hidden="true">
      <div className="xero-bg__arc" />
    </div>
  );
}
