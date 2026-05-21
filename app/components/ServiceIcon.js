// Line-art glyphs for the four services. Plain inline SVG (no icon
// library), stroke = currentColor so it inherits the card's accent.
// Server component — no client JS.

const PATHS = {
  // browser window — web development
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M6.5 6.5h.01M9 6.5h.01" />
    </>
  ),
  // palette / brushstroke — branding & ui/ux
  brand: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.6 0 2.5-1 2.5-2.2 0-.6-.3-1.1-.7-1.5-.4-.5-.7-1-.7-1.7 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4 8 8 0 0 0-9-6.6Z" />
      <circle cx="7.5" cy="11" r="0.9" />
      <circle cx="11.5" cy="7.5" r="0.9" />
      <circle cx="16" cy="9.5" r="0.9" />
    </>
  ),
  // chart trending up — seo & growth
  growth: (
    <>
      <path d="M3 18h18" />
      <path d="M5 14l4-4 3.5 3.5L19 7" />
      <path d="M14.5 7H19v4.5" />
    </>
  ),
  // neural / network node — ai automation
  ai: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="5" cy="6" r="1.6" />
      <circle cx="19" cy="6" r="1.6" />
      <circle cx="5" cy="18" r="1.6" />
      <circle cx="19" cy="18" r="1.6" />
      <path d="M6.3 7.1 9.8 10.6M17.7 7.1l-3.5 3.5M6.3 16.9l3.5-3.5M17.7 16.9l-3.5-3.5" />
    </>
  ),
  // legacy aliases (kept so any stale references still render)
  app: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10 5.5h4" />
      <path d="M12 18.5h.01" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 7.5 4 12l4.5 4.5" />
      <path d="M15.5 7.5 20 12l-4.5 4.5" />
      <path d="M13.5 5.5 10.5 18.5" />
    </>
  ),
  automation: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19" />
    </>
  ),
};

export default function ServiceIcon({ name, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] || PATHS.web}
    </svg>
  );
}
