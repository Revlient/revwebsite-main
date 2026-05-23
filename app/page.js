import Hero from "./components/Hero";
import AiPromptSection from "./components/AiPromptSection";
import ShowcaseCards from "./components/ShowcaseCards";
import Features from "./components/Features";
import ProcessSpine from "./components/ProcessSpine";
import WhyRevlient from "./components/WhyRevlient";
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
        <ProcessSpine />
        <Services />
        <ShowcaseCards />
        <WhyRevlient />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
