import Logo from "../components/Logo";
import HorizonHero from "../components/HorizonHero";
import { BRAND } from "../lib/site";

export const metadata = {
  title: `The Studio — ${BRAND.name}`,
  description:
    "Revlient is a small, senior creative studio. We craft digital legacies — design-grade craft, built to outlive the launch.",
};

// Standalone Studio landing page (its own route, not a homepage section).
export default function StudioPage() {
  return (
    <>
      <div className="studiopage__bar">
        <a href="/" aria-label={`${BRAND.name} home`}>
          <Logo className="brand__mark" />
          <span>{BRAND.name}</span>
        </a>
        <a href="/" className="studiopage__back">
          Back to site →
        </a>
      </div>
      <HorizonHero />
    </>
  );
}
