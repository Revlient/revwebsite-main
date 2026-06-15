"use client";

import {
  BRAND,
  CONTACT_EMAIL,
  PHONE_TEL,
  PHONE_DISPLAY,
} from "../lib/site";
import CalEmbed from "./CalEmbed";

const SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "ERP systems", href: "/services" },
  { label: "Websites", href: "/services" },
  { label: "CRM platforms", href: "/services" },
  { label: "Mobile apps", href: "/services" },
  { label: "AI automations", href: "/services" },
];

const SECTOR_LINKS = [
  { label: "Education & Training", href: "/#industries" },
  { label: "Healthcare", href: "/#industries" },
  { label: "Construction", href: "/#industries" },
  { label: "Retail & E-commerce", href: "/#industries" },
  { label: "Interior Design", href: "/#industries" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <section className="footer-section">
      <CalEmbed />

      <div className="rfoot">
        <div className="rfoot__grid">
          <div className="rfoot__col">
            <h4 className="rfoot__col-title">Site</h4>
            <ul className="rfoot__list">
              {SITE_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rfoot__col">
            <h4 className="rfoot__col-title">Services</h4>
            <ul className="rfoot__list">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rfoot__col">
            <h4 className="rfoot__col-title">Sectors</h4>
            <ul className="rfoot__list">
              {SECTOR_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rfoot__col rfoot__col--wide">
            <h4 className="rfoot__col-title rfoot__col-title--dot">
              {BRAND.legalName}
            </h4>
            <p className="rfoot__body">
              Kochi, Kerala, India · Building studios &amp; systems for
              founders worldwide.
            </p>
          </div>

          <div className="rfoot__col">
            <h4 className="rfoot__col-title">Reach us</h4>
            <ul className="rfoot__list rfoot__list--contact">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="rfoot__link-strong">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li className="rfoot__muted">Mon–Fri · 10am–7pm IST</li>
            </ul>
          </div>

          <div className="rfoot__col rfoot__col--meta">
            <h4 className="rfoot__col-title">© {year} {BRAND.name}</h4>
            <p className="rfoot__meta-line">
              <a href="#">Privacy</a>
              <span aria-hidden="true">·</span>
              <a href="#">Terms</a>
              <span aria-hidden="true">·</span>
              <span>LLP</span>
            </p>
            <p className="rfoot__meta-sub">AAJ-4521</p>
          </div>
        </div>

        <div className="rfoot__watermark" aria-hidden="true">
          {BRAND.name.toLowerCase()}.
        </div>
      </div>
    </section>
  );
}
