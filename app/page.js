import Hero from "./components/Hero";
import AiPromptSection from "./components/AiPromptSection";
import ShowcaseCards from "./components/ShowcaseCards";
import Features from "./components/Features";
import ProcessTimeline from "./components/ProcessTimeline";
import WhyRevlient from "./components/WhyRevlient";
import WorthCrafting from "./components/WorthCrafting";
import Proof from "./components/Proof";
import Services from "./components/Services";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";
import ContactWidget from "./components/ContactWidget";

// Homepage. Server-rendered and statically prerendered.
// Section order mirrors the buyer's questions: WHO/WHAT (Hero),
// WHY (WhyRevlient), IS-THIS-REAL (Work + Proof), then
// offer/process/team and the close.
export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <AiPromptSection />
        <Features />
        <ProcessTimeline />
        <Services />
        <ShowcaseCards />
        <WorthCrafting />
        <WhyRevlient />
        <Proof />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
