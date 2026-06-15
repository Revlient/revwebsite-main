"use client";

import { BRAND } from "../lib/site";
import CalEmbed from "./CalEmbed";

export default function Footer() {
  return (
    <section className="footer-section">
      <CalEmbed />
      <div className="footer-minimal">
        <span className="footer-minimal__copy">
          © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
        </span>
      </div>
    </section>
  );
}
