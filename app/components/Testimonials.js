import Reveal from "./Reveal";

/* Sticky-scroll work gallery. Adapted from a shadcn/Tailwind/TS + lenis
   demo to this project's stack: the effect is pure CSS position:sticky
   (no lenis — the site already smooth-scrolls), plain CSS, no deps.

   PROOF RULES: these are NOT real screenshots. The demo hotlinked
   random Unsplash photos as if they were the studio's sites — that's
   fabricated proof. Each tile is a clearly-flagged placeholder; drop in
   real project thumbnails before launch. */
const LEFT = [
  { tag: "Web · Brand", name: "Study-abroad consultancy revamp" },
  { tag: "E-commerce", name: "Headless commerce CMS" },
  { tag: "Product", name: "Role-based agency CRM" },
  { tag: "3D · Web", name: "3D product launch microsite" },
];

const MID = [
  { tag: "Web", name: "Hospitality booking platform" },
  { tag: "Brand · Motion", name: "Studio identity site" },
  { tag: "App", name: "Field-ops mobile app" },
];

const RIGHT = [
  { tag: "Web", name: "Fintech marketing site" },
  { tag: "Automation", name: "Ops automation dashboard" },
  { tag: "Web · 3D", name: "Interactive case study" },
  { tag: "Product", name: "Internal analytics tool" },
];

function Tile({ tag, name }) {
  return (
    <figure className="showcase__tile">
      <figcaption className="showcase__tile-meta">
        <span className="showcase__tile-tag">{tag}</span>
        <div className="showcase__tile-name">{name}</div>
        {/* TODO: replace with the real project screenshot */}
        <span className="showcase__tile-todo">Thumbnail — TODO</span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="section showcase" id="showcase">
      <div className="container">
        <Reveal>
          <div className="section-head showcase__head">
            <span className="eyebrow">Selected work</span>
            <h2>A few of the things we&apos;ve built.</h2>
            <p>Scroll — the centre column holds while the work moves past.</p>
            <span className="proof__todo">
              Placeholder thumbnails — replace with real screenshots
            </span>
          </div>
        </Reveal>

        <div className="showcase__grid">
          <div className="showcase__col">
            {LEFT.map((p) => (
              <Tile key={p.name} {...p} />
            ))}
          </div>
          <div className="showcase__col showcase__col--mid">
            {MID.map((p) => (
              <Tile key={p.name} {...p} />
            ))}
          </div>
          <div className="showcase__col">
            {RIGHT.map((p) => (
              <Tile key={p.name} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
