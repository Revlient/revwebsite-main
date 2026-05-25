import Nav from "./components/Nav";
import CinematicHero from "./components/CinematicHero";
import AiPromptSection from "./components/AiPromptSection";
import ShowcaseCards from "./components/ShowcaseCards";
import Faq from "./components/Faq";
import AmbientDashboard from "./components/AmbientDashboard";
import ProcessSpine from "./components/ProcessSpine";
import WorkFeatureSection from "./components/WorkFeatureSection";
import WhyRevlient from "./components/WhyRevlient";
import Services from "./components/Services";
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
        <AmbientDashboard />
        <WorkFeatureSection
          pill="Included with every active project"
          heading="CRM access for clients."
          sub="Every active engagement comes with a private CRM workspace — track project phases live, transfer assets, raise enquiries, and watch the build pulse in real time."
          greeting="Good afternoon, Kevin"
          showcaseLabel="Client portal · Project phases · Asset transfer · Enquiries"
        />
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
