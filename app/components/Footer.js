import { BRAND, NAV_LINKS, SYSTEMS_URL } from "../lib/site";

// TODO: real social / contact destinations before launch.
const CONNECT_LINKS = [
  { label: "Start a project", href: "#start" },
  { label: "hello@revlient.com", href: "mailto:hello@revlient.com" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#top" className="brand">
              <svg
                className="brand__mark"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
              >
                <path
                  d="M12 1.6 22.4 7.4v9.2L12 22.4 1.6 16.6V7.4z"
                  stroke="#4a78ff"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{BRAND.name}</span>
            </a>
            <p>
              {BRAND.legalName}. A creative studio crafting 3D-grade websites
              and applications — built to feel as good as they look.
            </p>
            <p className="footer__cross">
              ERP, CRM &amp; automation:{" "}
              <a
                href={SYSTEMS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Revlient Systems →
              </a>
            </p>
          </div>

          <nav className="footer__col" aria-label="Sections">
            <h4>Studio</h4>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <nav className="footer__col" aria-label="Connect">
            <h4>Connect</h4>
            {CONNECT_LINKS.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {BRAND.legalName}. All rights reserved.
          </span>
          {/* TODO: real privacy / terms pages. */}
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
