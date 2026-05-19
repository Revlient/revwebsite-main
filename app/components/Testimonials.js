import Reveal from "./Reveal";

/* Sticky-scroll work gallery. Effect is pure CSS position:sticky (no
   lenis — the site already smooth-scrolls), plain CSS, no deps.

   Thumbnails are the live front pages of real client sites, rendered
   via WordPress mShots (free, no key, no dependency) and linked out.
   Display names are derived from the domains — the team can refine the
   wording/categories, but the URLs and screenshots are real. */
// `local` overrides the live mShots capture with a self-hosted
// screenshot in /public/work — sharper, no third-party dependency.
const SITE = (url, name, local) => ({
  url,
  name,
  shot:
    local ||
    `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
      url
    )}?w=1200&h=900`,
});

const LEFT = [
  SITE("https://www.perpexbschool.com", "Perpex B-School"),
  SITE("https://www.houseof11.in", "House of 11", "/work/houseof11.png"),
  SITE(
    "https://magnate-studyabroad2.vercel.app",
    "Magnate Study Abroad"
  ),
  SITE("https://ibsconsultants.in", "IBS Consultants"),
];

const MID = [
  SITE("https://www.covspace.in", "Covspace"),
  SITE("https://ronspire.com", "Ronspire"),
  SITE("https://www.perpex.in", "Perpex"),
];

const RIGHT = [
  SITE("https://mathleteonline.com", "Mathlete Online"),
  SITE("https://themagnates.in", "The Magnates"),
  SITE("https://www.bambrush.co.in", "Bambrush"),
  SITE("https://www.soumyashyammakeup.com", "Soumya Shyam Makeup"),
];

function Tile({ url, name, shot }) {
  return (
    <a
      className="showcase__tile"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} — opens in a new tab`}
    >
      <img src={shot} alt={`${name} homepage`} loading="lazy" />
      <span className="showcase__tile-cap">
        <span className="showcase__tile-name">{name}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M7 17 17 7M9 7h8v8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

export default function Testimonials() {
  return (
    <section className="section showcase" id="showcase">
      <div className="container">
        <Reveal>
          <div className="section-head showcase__head">
            <span className="eyebrow">Selected work</span>
            <h2>A few of the things we&apos;ve shipped.</h2>
            <p>
              Live sites — scroll, the centre column holds while the work
              moves past. Tap any to open it.
            </p>
          </div>
        </Reveal>

        <div className="showcase__grid">
          <div className="showcase__col">
            {LEFT.map((p) => (
              <Tile key={p.url} {...p} />
            ))}
          </div>
          <div className="showcase__col showcase__col--mid">
            {MID.map((p) => (
              <Tile key={p.url} {...p} />
            ))}
          </div>
          <div className="showcase__col">
            {RIGHT.map((p) => (
              <Tile key={p.url} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
