import Nav from "./components/Nav";
import AiPromptSection from "./components/AiPromptSection";
import ShowcaseCards from "./components/ShowcaseCards";
import Faq from "./components/Faq";
import Features from "./components/Features";
import ProcessSpine from "./components/ProcessSpine";
import WorkFeatureSection from "./components/WorkFeatureSection";
import WhyRevlient from "./components/WhyRevlient";
import Services from "./components/Services";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";
import ContactWidget from "./components/ContactWidget";

// Homepage. WorkFeatureSection is reused as the hero with hero-scale
// copy — the existing erp-beam.mp4 + ERP mockup matches the huly hero
// reference. ProcessSpine and WhyRevlient retained as-is. Remaining
// sections to follow once each is approved.
export default function HomePage() {
  return (
    <>
      <Nav className="page-home-nav" />
      <main>
        <div className="page-hero">
          <WorkFeatureSection
            pill="Revlient — Creative Studio"
            heading="Your project. Live in one workspace."
            sub="A senior creative studio shipping serious products — design, engineering and motion delivered through a CRM workspace your team actually logs into."
            greeting="Good afternoon, Kevin"
            showcaseLabel="Live workspace · Project phases · Asset transfer · Enquiries"
          />
        </div>

        <div className="h-chat-light">
          <AiPromptSection />
        </div>
        <Features />
        <ProcessSpine />
        <Services />
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
