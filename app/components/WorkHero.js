import { CTA_HREF } from "../lib/site";

/* /work page hero. Premium studio composition using real project
   stills and the existing work video, with no fabricated metrics. */

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

export default function WorkHero() {
  return (
    <section className="whero" aria-labelledby="work-hero-title">
      <video
        className="whero__video"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="whero__shade" aria-hidden="true" />

      <div className="whero__shell">
        <div className="whero__copy">
          <span className="whero__kicker">Revlient work</span>
          <h1 id="work-hero-title" className="whero__heading">
            Digital flagships for serious brands.
          </h1>
          <p className="whero__sub">
            Selected websites, platforms, and launch systems shaped with the discipline of a premium design firm.
          </p>
          <div className="whero__actions">
            <a href="#projects" className="whero__cta whero__cta--primary">
              View work
            </a>
            <a href={CTA_HREF} className="whero__cta whero__cta--secondary">
              Start a project
            </a>
          </div>
        </div>

        <div className="whero__gallery" aria-label="Selected project previews">
          <figure className="whero__plate whero__plate--main">
            <img src="/work/project-houseof11.png" alt="House of Eleven project preview" />
          </figure>
          <figure className="whero__plate whero__plate--top">
            <img src="/work/project-covspace.png" alt="Covspace project preview" />
          </figure>
          <figure className="whero__plate whero__plate--bottom">
            <img src="/work/project-ronspire.png" alt="Ronspire project preview" />
          </figure>
        </div>
      </div>
    </section>
  );
}
