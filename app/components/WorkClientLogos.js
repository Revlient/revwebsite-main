"use client";

import Reveal from "./Reveal";
import { PROJECTS } from "./WorkProjects";

// Map each project slug to a logo asset. Files are in /public/logos.
const LOGO_MAP = {
  "House of Eleven": "/logos/houseof11.webp",
  "IBS Consultants": "/logos/ibs.webp",
  Covspace: "/logos/covspace.webp",
  Ronspire: "/logos/ronspire.svg",
  "Perpex B-School": "/logos/perpexbschool.svg",
  "Perpex Group": "/logos/perpex.webp",
  Mathlete: "/logos/mathlete.webp",
  "The Magnates": "/logos/themagnates.svg",
  UniGo: "/logos/unigo.webp",
  "Soumya Shyam": "/logos/soumyashyam.webp",
  Nutriboxx: "/logos/nutriboxx.webp",
  Bambrush: "/logos/bambrush.webp",
  "Magnate Academy": "/logos/magnateacademy.svg",
  "Magnate Study Abroad": "/logos/magnatestudyabroad.svg",
  "Magnate Global": "/logos/magnateglobal.svg",
};

// Square client cards. Each cell is a logo on a clean tile; the
// whole tile is a link to the client's live site. No copy on or
// around the cards.
export default function WorkClientLogos() {
  return (
    <section className="wclogos" aria-label="Our clients">
      <div className="wclogos__inner">
        <Reveal>
          <span className="wclogos__eyebrow">Trusted by</span>
        </Reveal>
        <div className="wclogos__grid">
          {PROJECTS.filter((p) => LOGO_MAP[p.title] && p.url).map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="wclogos__card"
              aria-label={`Visit ${p.title}`}
            >
              <img
                src={LOGO_MAP[p.title]}
                alt={p.title}
                className="wclogos__logo"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
