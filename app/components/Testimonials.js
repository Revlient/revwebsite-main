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
            <h2>
              Trusted by teams who sweat the details.
              <br />
              <span>Built to be relied on.</span>
            </h2>
            <span className="proof__todo">
              Placeholder client names — replace before launch
            </span>
          </div>
        </Reveal>

        <Reveal className="trust__logos" delay={120}>
          {CLIENTS.map((name) => (
            <span key={name}>{name}</span>
          ))}
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
