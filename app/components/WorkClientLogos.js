"use client";

import Reveal from "./Reveal";
import { PROJECTS } from "./WorkProjects";

// Per-client visuals. `card` is a full-bleed image filling the tile;
// `logo` is a centred mark on a clean tile. Originals kept as-is —
// no WebP conversion of logo files.
const CLIENT_VISUALS = {
  "House of Eleven": { card: "/logos/cards/houseof11.png" },
  Covspace: { card: "/logos/cards/covspace.png" },
  "IBS Consultants": { card: "/logos/cards/ibs.png" },
  Mathlete: { card: "/logos/cards/mathlete.png" },
  "Magnate Academy": { card: "/logos/cards/magnate-academy.png" },
  "Magnate Study Abroad": { card: "/logos/cards/magnate-studyabroad.png" },
  "Perpex Group": { card: "/logos/cards/perpex.png" },
  Ronspire: { card: "/logos/cards/ronspire.png" },
  "Magnate Global": { card: "/logos/cards/magnate-global.png" },
  Nutriboxx: { card: "/logos/cards/nutriboxx.png" },
  Bambrush: { card: "/logos/cards/bambrush.png" },
  "Soumya Shyam": { card: "/logos/cards/soumyashyam.png" },

  "Perpex B-School": { logo: "/logos/perpexbschool.svg" },
  "The Magnates": { logo: "/logos/themagnates.svg" },
  UniGo: { logo: "/logos/unigo.png" },
};

// Square client cards. Each tile links to the client's live site;
// the industry tag and a short 3-line description sit underneath
// (industry + brief read, no card-side copy).
export default function WorkClientLogos() {
  return (
    <section className="wclogos" aria-label="Our clients">
      <div className="wclogos__inner">
        <Reveal>
          <span className="wclogos__eyebrow">Trusted by</span>
        </Reveal>
        <div className="wclogos__grid">
          {PROJECTS.filter((p) => CLIENT_VISUALS[p.title] && p.url).map((p) => {
            const v = CLIENT_VISUALS[p.title];
            const isImage = Boolean(v.card);
            return (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="wclogos__item"
                aria-label={`Visit ${p.title}`}
              >
                <div
                  className={`wclogos__card ${isImage ? "wclogos__card--image" : ""}`}
                >
                  <img
                    src={isImage ? v.card : v.logo}
                    alt={p.title}
                    className={isImage ? "wclogos__cover" : "wclogos__logo"}
                    loading="lazy"
                  />
                </div>
                <div className="wclogos__meta">
                  <span className="wclogos__industry">{p.category}</span>
                  <p className="wclogos__desc">{p.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
