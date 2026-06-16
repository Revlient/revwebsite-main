import Nav from "../components/Nav";
import WorkPageHero from "../components/WorkPageHero";
import WorkClientLogos from "../components/WorkClientLogos";
import WorkHero from "../components/WorkHero";
import WorkProjects from "../components/WorkProjects";
import WorkFeatureSection from "../components/WorkFeatureSection";
import ErpFeatures from "../components/ErpFeatures";
import AppShowcase from "../components/AppShowcase";
import AppFeatures from "../components/AppFeatures";
import WorthCrafting from "../components/WorthCrafting";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Work",
  description: `Selected work from ${BRAND.name}, projects shipped end-to-end through our four-pillar service core.`,
};

/* Dedicated /work route. The redesigned WorkHero opens the page,
   then the existing case-study and service sections continue unchanged. */
export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="page-work">
        <WorkPageHero />
        <WorkClientLogos />
        <WorkHero />
        {/* <WorkFeatureSection /> */}
        <ErpFeatures />
        <AppShowcase />
        <AppFeatures />
        <WorkProjects />
        <WorthCrafting />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
