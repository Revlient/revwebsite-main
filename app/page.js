import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ClientStrip from "./components/ClientStrip";
import WhyRevlient from "./components/WhyRevlient";
import Work from "./components/Work";
import Proof from "./components/Proof";
import Services from "./components/Services";
import Process from "./components/Process";
import Studio from "./components/Studio";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";

// Homepage. Server-rendered and statically prerendered.
// Section order mirrors the buyer's questions: WHO/WHAT (Hero),
// credibility (ClientStrip), WHY (WhyRevlient), IS-THIS-REAL
// (Work + Proof), then offer/process/team and the close.
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ClientStrip />
        <WhyRevlient />
        <Work />
        <Proof />
        <Services />
        <Process />
        <Studio />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
