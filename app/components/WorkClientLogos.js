"use client";

import Reveal from "./Reveal";
import { PROJECTS } from "./WorkProjects";

// Map each project slug to a logo asset. Files are in /public/logos.
// Originals as uploaded — SVG for vector marks, PNG/JPG for raster.
// No WebP conversions here so the logos render at their intended fidelity.
const LOGO_MAP = {
  "House of Eleven": "/logos/houseof11.png",
  "IBS Consultants": "/logos/ibs.jpg",
  Covspace: "/logos/covspace.png",
  Ronspire: "/logos/ronspire.svg",
  "Perpex B-School": "/logos/perpexbschool.svg",
  "Perpex Group": "/logos/perpex.png",
  Mathlete: "/logos/mathlete.png",
  "The Magnates": "/logos/themagnates.svg",
  UniGo: "/logos/unigo.png",
  "Soumya Shyam": "/logos/soumyashyam.png",
  Nutriboxx: "/logos/nutriboxx.png",
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
