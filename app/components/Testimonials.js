import Reveal from "./Reveal";
import SparklesGlow from "./SparklesGlow";

/* "Trusted by" section. Adapted from a shadcn/Tailwind/TS + tsparticles
   demo to this project's stack: the sparkles field uses tsparticles
   (the component *is* that package — no plain-CSS equivalent), the
   curved-horizon glow is plain CSS, retinted to the brand blue for
   site cohesion.

   PROOF RULES: the demo shipped real third-party logos (Retool, Vercel,
   …) as if they were clients — that's false endorsement. Replaced with
   visibly-flagged placeholder wordmarks. Replace before launch. */
const CLIENTS = [
  "Northbridge Studyabroad",
  "Atlas Commerce",
  "Meridian Agency",
  "Kestrel Labs",
  "Verde Hospitality",
];

export default function Testimonials() {
  return (
    <section className="section trust" id="testimonials">
      <div className="container">
        <Reveal>
          <div className="trust__head">
            <h2>In good company.</h2>
            <span className="proof__todo">
              Placeholder client names — replace before launch
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="trust__logos">
            <div className="trust__logos-track">
              {CLIENTS.map((name) => (
                <span key={name}>{name}</span>
              ))}
              {/* duplicate for a seamless marquee loop */}
              {CLIENTS.map((name) => (
                <span key={`dup-${name}`} aria-hidden="true">
                  {name}
                </span>
              ))}
            </div>
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
