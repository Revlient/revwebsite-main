import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AiPromptSection from "./components/AiPromptSection";
import ShowcaseCards from "./components/ShowcaseCards";
import Testimonials from "./components/Testimonials";
import ProcessTimeline from "./components/ProcessTimeline";
import WhyRevlient from "./components/WhyRevlient";
import Work from "./components/Work";
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
      <Nav />
      <main>
        <Hero />
        <AiPromptSection />
        <ShowcaseCards />
        <Testimonials />
        <ProcessTimeline />
        <WhyRevlient />
        <Work />
        <Proof />
        <Services />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
