import Nav from "./components/Nav";
import CinematicHero from "./components/CinematicHero";
import AiPromptSection from "./components/AiPromptSection";
import ShowcaseCards from "./components/ShowcaseCards";
import Faq from "./components/Faq";
import CapabilityGrid from "./components/CapabilityGrid";
import ProcessSpine from "./components/ProcessSpine";
import ServicePinScroll from "./components/ServicePinScroll";
import WhyRevlient from "./components/WhyRevlient";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";
import ContactWidget from "./components/ContactWidget";

// Homepage. Cinematic hero + capabilities open the page; the rest
// of the sections follow. WorkFeatureSection moves down to live
// between the AmbientDashboard cockpit and ProcessSpine.
export default function HomePage() {
  return (
    <>
      <Nav className="page-home-nav" />
      <main>
        <CinematicHero />

        <div className="h-chat-light">
          <AiPromptSection />
        </div>
        <CapabilityGrid />
        <ProcessSpine />
        <ServicePinScroll />
        <Faq />
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
