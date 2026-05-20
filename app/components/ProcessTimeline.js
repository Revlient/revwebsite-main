// Premium vertical process timeline. Placed under Testimonials and
// keeps id="process" so the existing nav anchor still resolves.
// Crimson/rose accents are deliberate and scoped to this section
// (requested look) — the rest of the site stays brand-blue.
const STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "Understand client requirements, goals, audience, and business vision.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "Create structure, content flow, and conversion-focused planning.",
  },
  {
    n: "03",
    title: "Design & Development",
    body: "Craft premium UI/UX and develop high-performance responsive pages.",
  },
  {
    n: "04",
    title: "Launch & Support",
    body: "Deploy the project smoothly and provide ongoing support and revisions.",
  },
];

// Tiny abstract UI motif inside each card — same family across steps,
// with the accent row shifting per step so they read as a sequence.
function Mock({ i }) {
  return (
    <svg
      viewBox="0 0 200 64"
      width="100%"
      height="56"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`ptlg${i}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="198"
        height="62"
        rx="9"
        stroke="rgba(255,255,255,0.12)"
      />
      <rect x="14" y="14" width="34" height="36" rx="5" fill="rgba(255,255,255,0.05)" />
      {[0, 1, 2].map((row) => (
        <rect
          key={row}
          x="62"
          y={16 + row * 14}
          width={row === i % 3 ? 96 : 110}
          height="6"
          rx="3"
          fill={row === i % 3 ? `url(#ptlg${i})` : "rgba(255,255,255,0.1)"}
        />
      ))}
    </svg>
  );
}

export default function ProcessTimeline() {
  return (
    <section id="process" className="ptl">
      <div className="ptl__ambient" aria-hidden="true" />
      <div className="container">
        <div className="ptl__head">
          <span className="ptl__eyebrow">A simple step-by-step process</span>
          <h2 className="ptl__title">Design without the hassle</h2>
          <p className="ptl__sub">
            Four deliberate stages — from the first conversation to the day
            after launch. You know exactly where the project is at every
            step.
          </p>
        </div>

        <div className="ptl__timeline">
          <span className="ptl__line" aria-hidden="true" />
          {/* Rows render visible from the start (no scroll-reveal gating) so
              the timeline is fully populated when you jump to #process via
              the nav, instead of showing only the line until you scroll. */}
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`ptl__row ${
                i % 2 ? "ptl__row--right" : "ptl__row--left"
              }`}
            >
              <span className="ptl__node" aria-hidden="true">
                <span>{s.n}</span>
              </span>
              <article className="ptl__card">
                <span className="ptl__mock">
                  <Mock i={i} />
                </span>
                <h3 className="ptl__cardtitle">{s.title}</h3>
                <p className="ptl__cardbody">{s.body}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
