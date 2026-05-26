import Hero from "./components/Hero";
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

// Homepage. Server-rendered and statically prerendered.
// Section order mirrors the buyer's questions: WHO/WHAT (Hero),
// WHY (WhyRevlient), IS-THIS-REAL (Work + Proof), then
// offer/process/team and the close.
export default function HomePage() {
  return (
    <>
      <Nav scrolledOnly={true} />
      <main>
        <Hero />
        <AiPromptSection />
        <Features />
        <ProcessSpine />
        <WorkFeatureSection
          pill="Included with every active project"
          heading="CRM access for clients."
          sub="Every active engagement comes with a private CRM workspace — track project phases live, transfer assets, raise enquiries, and watch the build pulse in real time."
          greeting="Good afternoon, Kevin"
          showcaseLabel="Client portal · Project phases · Asset transfer · Enquiries"
        />
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
