import Nav from "../components/Nav";
import XeroHeroCard from "../components/XeroHeroCard";
import ProcessTimeline from "../components/ProcessTimeline";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Process",
  description: `How ${BRAND.name} runs a project — four deliberate stages from the first conversation to the day after launch.`,
};

/* Dedicated /process route. The Xero-style hero card sits at the top,
   then the existing timeline carries the actual stages, then the
   closing CTA. Footer + sticky bits match the rest of the site. */
export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main className="page-process">
        <XeroHeroCard />
        <ProcessTimeline />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
