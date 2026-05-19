import Reveal from "./Reveal";

/* Animated testimonial wall. Adapted from a shadcn/Tailwind/TS +
   motion/react component to this project's stack: the infinite vertical
   scroll is a pure-CSS marquee (no dependency), plain CSS classes.

   PROOF RULES: every quote, name and role below is a PLACEHOLDER and is
   visibly flagged. No fabricated testimonials or stock faces shipped as
   real — initials stand in for photos. Replace before launch. */
const TESTIMONIALS = [
  {
    text: "They treated our marketing site like a product, not a brochure. A year on it still feels fast and considered.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "The polish went all the way down — the empty states and errors felt as crafted as the hero.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "Our team actually likes opening the tool they built. That genuinely never happens with internal software.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "Strategy, design and engineering from one team — nothing got lost in translation between agencies.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "They shipped on the date they committed to, and it held up under real traffic on launch day.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "The 3D work wowed our board, but it was the load time on a mid-range phone that won the room.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "Clear communication the whole way through. We always knew exactly where the project stood.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "They pushed back where it mattered and were right to. The end result was sharper for it.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
  {
    text: "A small, senior team that cared about the details we'd have shipped past ourselves.",
    initials: "TODO",
    name: "TODO: name",
    role: "TODO: role, Company",
  },
];

const COLUMNS = [
  { items: TESTIMONIALS.slice(0, 3), duration: 34, className: "" },
  {
    items: TESTIMONIALS.slice(3, 6),
    duration: 42,
    className: "tcol--md",
  },
  {
    items: TESTIMONIALS.slice(6, 9),
    duration: 38,
    className: "tcol--lg",
  },
];

function Column({ items, duration, className }) {
  // Render the set twice so the upward scroll loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className={`tcol ${className}`.trim()}>
      <div
        className="tcol__track"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((t, i) => (
          <figure className="tcard" key={i}>
            <blockquote>{t.text}</blockquote>
            <figcaption>
              <span className="tcard__avatar" aria-hidden="true">
                {t.initials}
              </span>
              <span>
                {/* TODO: real name + role before launch */}
                <span className="tcard__name">{t.name}</span>
                <span className="tcard__role">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <Reveal>
          <div className="section-head testimonials__head">
            <span className="eyebrow">Testimonials</span>
            <h2>What working with us feels like</h2>
            <p>
              Real client words go here — in their voice, attributed and
              verified.
            </p>
            <span className="proof__todo">
              Placeholder testimonials — replace before launch
            </span>
          </div>
        </Reveal>

        <div className="tcols">
          {COLUMNS.map((c, i) => (
            <Column
              key={i}
              items={c.items}
              duration={c.duration}
              className={c.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
