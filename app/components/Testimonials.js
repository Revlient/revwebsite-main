
/* 3D tilted testimonial marquee. Adapted from a shadcn/Tailwind/TS +
   radix-avatar component to this project's stack: plain CSS marquee
   (no deps), initials instead of stock faces, dark-theme cards.

   PROOF RULES: every quote, name and handle is a PLACEHOLDER and is
   visibly flagged. No fabricated testimonials or randomuser photos
   shipped as real. Replace before launch. */
const TESTIMONIALS = [
  {
    name: "TODO: name",
    handle: "@todo",
    body: "They treated our marketing site like a product, not a brochure. A year on it still feels fast.",
    initials: "T",
  },
  {
    name: "TODO: name",
    handle: "@todo",
    body: "The polish went all the way down — empty states and errors felt as crafted as the hero.",
    initials: "T",
  },
  {
    name: "TODO: name",
    handle: "@todo",
    body: "Our team actually likes opening the tool they built. That never happens with internal software.",
    initials: "T",
  },
  {
    name: "TODO: name",
    handle: "@todo",
    body: "Strategy, design and engineering from one team — nothing got lost between agencies.",
    initials: "T",
  },
  {
    name: "TODO: name",
    handle: "@todo",
    body: "Shipped on the date they committed to, and it held up under real traffic on launch day.",
    initials: "T",
  },
  {
    name: "TODO: name",
    handle: "@todo",
    body: "The 3D wowed our board, but the load time on a mid-range phone won the room.",
    initials: "T",
  },
];

function Card({ t }) {
  return (
    <figure className="t3d-card">
      <div className="t3d-card__head">
        <span className="t3d-card__avatar" aria-hidden="true">
          {t.initials}
        </span>
        <span>
          {/* TODO: real name + handle before launch */}
          <span className="t3d-card__name">{t.name}</span>
          <span className="t3d-card__handle">{t.handle}</span>
        </span>
      </div>
      <blockquote className="t3d-card__body">{t.body}</blockquote>
    </figure>
  );
}

function Column({ reverse }) {
  // Rendered twice so the vertical scroll loops seamlessly.
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className={`t3d-col ${reverse ? "t3d-col--rev" : ""}`}>
      <div className="t3d-col__track">
        {loop.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section t3d" id="testimonials">
      {/* Overlay heading (absolute) — not wrapped in Reveal, which needs
          a flowing element to observe. */}
      <div className="section-head t3d__head">
        <span className="eyebrow">Testimonials</span>
        <h2>In their words.</h2>
        <span className="proof__todo">
          Placeholder testimonials — replace before launch
        </span>
      </div>

      <div className="t3d__stage" aria-hidden="false">
        <div className="t3d__tilt">
          <Column />
          <Column reverse />
          <Column />
          <Column reverse />
        </div>
        <div className="t3d__fade t3d__fade--t" />
        <div className="t3d__fade t3d__fade--b" />
        <div className="t3d__fade t3d__fade--l" />
        <div className="t3d__fade t3d__fade--r" />
      </div>
    </section>
  );
}
