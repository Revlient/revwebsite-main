import Nav from "../components/Nav";
import WorkPageHero from "../components/WorkPageHero";
import WorkClientLogos from "../components/WorkClientLogos";
import WorkProjects from "../components/WorkProjects";
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

/* Dedicated /work route. Editorial intro hero + the client card grid
   open the page; ErpFeatures takes the page back into its native
   themed sections from there. */
export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="page-work">
        <WorkPageHero />
        <WorkClientLogos />
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
