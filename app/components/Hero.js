import HeroBackground from "./HeroBackground";
import AnimatedHeadline from "./AnimatedHeadline";
import { SYSTEMS_URL, CTA_HREF, CTA_LABEL } from "../lib/site";

// Rotating last word — all true to a creative studio building 3D web,
// apps and (pointed-to) systems; "legacies" ties back to the tagline.
const HEADLINE_WORDS = [
  "legacies",
  "experiences",
  "interfaces",
  "products",
  "systems",
];

// Server component. The message is the spine — headline, sub, CTAs and the
// ERP/CRM fork all render server-side and are fully readable even if the
// 3D never loads. <HeroBackground/> is pure enhancement, layered behind.
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <HeroBackground />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__kicker">
            <span className="dot" aria-hidden="true" />
            Revlient — Creative Studio
          </span>

          <h1 className="hero__title">
            We craft digital{" "}
            <AnimatedHeadline words={HEADLINE_WORDS} />
          </h1>

          <p className="hero__sub">
            A creative studio building 3D-grade websites and applications —
            engineered to feel as good as they look, and to keep working long
            after launch day.
          </p>

          <div className="hero__actions">
            <a href={CTA_HREF} className="btn btn--primary">
              {CTA_LABEL}
            </a>
            <a href="#work" className="btn btn--ghost">
              See our work
            </a>
          </div>

          {/* The dignified fork — placed low in the hero so an ERP/CRM
              buyer self-selects before the flash works against them. */}
          <p className="hero__fork">
            Looking for <strong>ERP, CRM, or internal automation</strong>?
            That's the focus of our systems division —{" "}
            <a href={SYSTEMS_URL} target="_blank" rel="noopener noreferrer">
              visit Revlient Systems →
            </a>
          </p>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="line" />
        Scroll
      </div>
    </section>
  );
}
