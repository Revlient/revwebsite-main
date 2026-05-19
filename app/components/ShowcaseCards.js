import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";

/* Project-showcase section (premium "FaceCards"-style glass cards over
   neon light streaks). Vanilla JS + plain CSS, no deps; animations are
   hardware-accelerated CSS transitions only.

   Copy localized to Revlient (the source was fintech "FaceCards" demo
   text). Card portraits are decorative Unsplash placeholders for the
   mockup — not real people/clients. */
const CARDS = [
  {
    name: "MARGARET GOUERY",
    no: "4921  ••••  ••••  7634",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
    tone: "a",
  },
  {
    name: "JULIAN MERCER",
    no: "5318  ••••  ••••  2087",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    tone: "b",
  },
  {
    name: "AISHA RAHMAN",
    no: "6011  ••••  ••••  4452",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop",
    tone: "c",
  },
];

const Chip = () => (
  <svg viewBox="0 0 36 28" width="34" height="26" aria-hidden="true">
    <rect
      x="1"
      y="1"
      width="34"
      height="26"
      rx="5"
      fill="url(#psg)"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="0.75"
    />
    <path
      d="M12 1v26M24 1v26M1 10h11M24 10h11M1 18h11M24 18h11"
      stroke="rgba(0,0,0,0.35)"
      strokeWidth="1"
    />
    <defs>
      <linearGradient id="psg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f6d27a" />
        <stop offset="1" stopColor="#caa24a" />
      </linearGradient>
    </defs>
  </svg>
);

export default function ShowcaseCards() {
  return (
    <section className="section pscard" aria-label="Showcase">
      <div className="pscard__lights" aria-hidden="true">
        <span className="pscard__streak s1" />
        <span className="pscard__streak s2" />
        <span className="pscard__streak s3" />
      </div>

      <div className="container">
        <Reveal>
          <div className="pscard__head">
            <span className="eyebrow">Showcase</span>
            <h2>Designed down to the last detail.</h2>
            <p className="pscard__sub">Premium, by default — not by accident.</p>
            <p className="pscard__desc">
              We treat every surface like a flagship product: considered
              materials, real depth, and motion that earns its place. Here&apos;s
              a taste of the finish.
            </p>
            <a href={CTA_HREF} className="btn btn--primary pscard__cta">
              Start a project
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>

        <Reveal className="pscard__deck" delay={120}>
          {CARDS.map((c, i) => (
            <article
              key={c.name}
              className={`pscard__card t-${c.tone}`}
              style={{ "--i": i - 1 }}
            >
              <div className="pscard__card-top">
                <Chip />
                <span className="pscard__brand">Revlient</span>
              </div>
              <div className="pscard__portrait">
                <img src={c.img} alt="" loading="lazy" draggable={false} />
              </div>
              <div className="pscard__no">{c.no}</div>
              <div className="pscard__name">{c.name}</div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
