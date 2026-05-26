import HorizonHero from "../components/HorizonHero";
import { BRAND } from "../lib/site";
import Nav from "../components/Nav";

export const metadata = {
  title: `The Studio — ${BRAND.name}`,
  description:
    "Revlient is a small, senior creative studio. We craft digital legacies — design-grade craft, built to outlive the launch.",
};

// Standalone Studio landing page (its own route, not a homepage section).
export default function StudioPage() {
  return (
    <>
      <Nav scrolledOnly={false} />
      <HorizonHero />
    </>
  );
}
