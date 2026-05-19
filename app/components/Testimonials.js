import Reveal from "./Reveal";
import SparklesGlow from "./SparklesGlow";
import ProgressiveBlur from "./ProgressiveBlur";

/* "Trusted by" section. Adapted from a shadcn/Tailwind/TS + tsparticles
   demo to this project's stack: the sparkles field uses tsparticles
   (the component *is* that package — no plain-CSS equivalent), the
   curved-horizon glow is plain CSS, retinted to the brand blue for
   site cohesion.

   PROOF RULES: the demo shipped real third-party logos (Retool, Vercel,
   …) as if they were clients — that's false endorsement. Replaced with
   visibly-flagged placeholder wordmarks. Replace before launch. */
const CLIENTS = [
  "Northbridge",
  "Atlas Commerce",
  "Meridian",
  "Kestrel Labs",
  "Verde",
];

// Placeholder logo mark — stands in for a real client logo lockup.
const Mark = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      d="M12 2.5 21 7.6v8.8L12 21.5 3 16.4V7.6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Testimonials() {
  return (
    <section className="section trust" id="testimonials">
      <div className="container">
        <Reveal>
          <div className="trust__head">
            <h2>
              Trusted by experts.
              <br />
              <span>Used by the leaders.</span>
            </h2>
            <span className="proof__todo">
              Placeholder client logos — replace before launch
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="trust__logos">
            <div className="trust__logos-track">
              {CLIENTS.map((name) => (
                <span key={name} className="trust__logo">
                  <Mark />
                  {name}
                </span>
              ))}
              {/* duplicate for a seamless marquee loop */}
              {CLIENTS.map((name) => (
                <span
                  key={`dup-${name}`}
                  className="trust__logo"
                  aria-hidden="true"
                >
                  <Mark />
                  {name}
                </span>
              ))}
            </div>
            <ProgressiveBlur
              direction="left"
              blurIntensity={1}
              className="trust__blur trust__blur--l"
            />
            <ProgressiveBlur
              direction="right"
              blurIntensity={1}
              className="trust__blur trust__blur--r"
            />
          </div>
        </Reveal>
      </div>

      <div className="trust__glow" aria-hidden="true">
        <div className="trust__glow-radial" />
        <div className="trust__horizon" />
        <SparklesGlow />
      </div>
    </section>
  );
}
