import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Project-showcase section (premium duotone "FaceCards"-style cards over
   subtle neon motion streaks). Vanilla JS + plain CSS, no deps;
   hardware-accelerated CSS transitions only.

   Copy localized to Revlient (source was a fintech "FaceCards" demo).
   Card portraits are decorative Unsplash placeholders for the mockup —
   not real people/clients. */
const CARDS = [
  {
    name: "MARGARET O. GUIDRY",
    no: "8758  ****  ****  0947",
    exp: "10/14",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80&auto=format&fit=crop",
    tone: "a",
  },
  {
    name: "ROBERT M. MCCRAY",
    no: "3759  ****  ****  9456",
    exp: "12/30",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&auto=format&fit=crop",
    tone: "b",
  },
  {
    name: "JANICE W. SEYMOUR",
    no: "9270  ****  ****  1554",
    exp: "07/06",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80&auto=format&fit=crop",
    tone: "c",
  },
];

const Mark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2c.6 3.3 2.7 5.4 6 6-3.3.6-5.4 2.7-6 6-.6-3.3-2.7-5.4-6-6 3.3-.6 5.4-2.7 6-6Zm6.5 11c.4 2 1.6 3.2 3.5 3.5-2 .4-3.1 1.6-3.5 3.5-.4-2-1.6-3.1-3.5-3.5 2-.4 3.1-1.6 3.5-3.5Z"
    />
  </svg>
);

const Contactless = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M8 8.5a6 6 0 0 1 0 7" />
      <path d="M11 6a9.5 9.5 0 0 1 0 12" />
      <path d="M14 4a13 13 0 0 1 0 16" />
    </g>
  </svg>
);

function Card({ name, no, exp, img, tone, i }) {
  return (
    <article className={`pscard__card t-${tone}`} style={{ "--i": i - 1 }}>
      <img className="pscard__photo" src={img} alt="" loading="lazy" draggable={false} />
      <span className="pscard__tint" aria-hidden="true" />
      <div className="pscard__card-top">
        <span className="pscard__logo">
          <Mark />
          <span>
            Personal Cards <sup>®</sup>
          </span>
        </span>
      </div>
      <div className="pscard__card-foot">
        <div className="pscard__field">
          <span className="pscard__lbl">Card No</span>
          <span className="pscard__val">{no}</span>
        </div>
        <div className="pscard__field">
          <span className="pscard__lbl">Card Holder</span>
          <span className="pscard__val">{name}</span>
        </div>
        <div className="pscard__row">
          <div className="pscard__field">
            <span className="pscard__lbl">Exp Date</span>
            <span className="pscard__val">{exp}</span>
          </div>
          <span className="pscard__contactless" aria-hidden="true">
            <Contactless />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ShowcaseCards() {
  return (
    <section className="section pscard" aria-label="Showcase">
      <div className="pscard__lights" aria-hidden="true">
        <span className="pscard__streak s1" />
        <span className="pscard__streak s2" />
        <span className="pscard__streak s3" />
        <span className="pscard__streak s4" />
        <span className="pscard__ghost gl" />
        <span className="pscard__ghost gr" />
      </div>

      <div className="container">
        <Reveal>
          <div className="pscard__head">
            <h2>Designed down to the last detail.</h2>
            <p className="pscard__sub">Premium, by default — not by accident.</p>
            <p className="pscard__desc">
              We treat every surface like a flagship product: considered
              materials, real depth, and motion that earns its place.
              Here&apos;s a taste of the finish.
            </p>
            <a href={CTA_HREF} className="pscard__cta">
              <span>Start today!</span>
              <span className="pscard__cta-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15">
                  <path
                    d="M5 12h13M12 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal className="pscard__deck" delay={120}>
          {CARDS.map((c, i) => (
            <Card key={c.name} {...c} i={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
