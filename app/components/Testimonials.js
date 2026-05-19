import Reveal from "./Reveal";

/* Testimonials columns. Adapted from a shadcn/Tailwind/TS + motion/react
   component to this project's stack: the infinite vertical scroll is a
   pure-CSS marquee (no 'motion' dependency), plain CSS, content in a
   data array.

   PROOF RULES: the demo shipped fake names + randomuser.me photos as
   real testimonials — not shipped. Every quote/name/role is a visibly
   flagged TODO placeholder; avatars are a neutral mark, not stock
   faces. Replace before launch. */
const TESTIMONIALS = [
  { text: "They treated our marketing site like a product, not a brochure. A year on it still feels fast and considered.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "The polish went all the way down — empty states and errors felt as crafted as the hero.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "Our team actually likes opening the tool they built. That genuinely never happens with internal software.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "Strategy, design and engineering from one team — nothing got lost in translation between agencies.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "They shipped on the date they committed to, and it held up under real traffic on launch day.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "The 3D work wowed our board, but it was the load time on a mid-range phone that won the room.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "Clear communication the whole way through. We always knew exactly where the project stood.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "They pushed back where it mattered and were right to. The end result was sharper for it.", name: "TODO: name", role: "TODO: role, Company" },
  { text: "A small, senior team that cared about the details we'd have shipped past ourselves.", name: "TODO: name", role: "TODO: role, Company" },
];

const COLUMNS = [
  { items: TESTIMONIALS.slice(0, 3), duration: 26, className: "" },
  { items: TESTIMONIALS.slice(3, 6), duration: 32, className: "tcol--md" },
  { items: TESTIMONIALS.slice(6, 9), duration: 29, className: "tcol--lg" },
];

const Quote = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M9.5 6C6.5 6 4 8.5 4 11.5c0 2.7 2 4.8 4.6 4.8.3 0 .6 0 .9-.1-.7 1.6-2.2 2.8-4 3.3l.6 1.5c3.6-1 6.4-4.3 6.4-8.6V11C12.9 7.9 11 6 9.5 6Zm9 0C15.5 6 13 8.5 13 11.5c0 2.7 2 4.8 4.6 4.8.3 0 .6 0 .9-.1-.7 1.6-2.2 2.8-4 3.3l.6 1.5c3.6-1 6.4-4.3 6.4-8.6V11C21.9 7.9 20 6 18.5 6Z"
    />
  </svg>
);

function Column({ items, duration, className }) {
  const loop = [...items, ...items]; // duplicate for a seamless loop
  return (
    <div className={`tcol ${className}`.trim()}>
      <div
        className="tcol__track"
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((t, i) => (
          <figure className="tcard" key={i}>
            <blockquote className="tcard__text">{t.text}</blockquote>
            <figcaption className="tcard__meta">
              <span className="tcard__avatar" aria-hidden="true">
                <Quote />
              </span>
              <span>
                {/* TODO: real name + role before launch */}
                <span className="tcard__name">{t.name}</span>
                <br />
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
    <section className="section tsection" id="testimonials">
      <div className="container">
        <Reveal>
          <div className="tsection__head">
            <span className="tsection__badge">Testimonials</span>
            <h2>What clients say</h2>
            <p>Real, attributed client words go here.</p>
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
