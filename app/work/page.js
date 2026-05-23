import WorkHero from "../components/WorkHero";
import WorkFeatureSection from "../components/WorkFeatureSection";
import ErpFeatures from "../components/ErpFeatures";
import AppShowcase from "../components/AppShowcase";
import Work from "../components/Work";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Work",
  description: `Selected work from ${BRAND.name} — projects shipped end-to-end through our four-pillar service core.`,
};

/* Dedicated /work route. Video-backed hero card with the in-card
   nav at the top, then the existing case-studies grid, FinalCTA,
   then footer + sticky bits. The hero is self-contained — it
   carries its own navbar — so the global <Nav /> isn't rendered
   here. */
export default function WorkPage() {
  return (
    <>
      <main className="page-work">
        <WorkHero />
        <WorkFeatureSection />
        <ErpFeatures />
        <AppShowcase />
        <Work />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
