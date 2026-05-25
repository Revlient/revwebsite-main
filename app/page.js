import Nav from "./components/Nav";
import HeroCrmHero from "./components/HeroCrmHero";
import ShipTrio from "./components/ShipTrio";
import AiPromptSection from "./components/AiPromptSection";
import WaterBlobBackdrop from "./components/WaterBlobBackdrop";
import StudioCraftGrid from "./components/StudioCraftGrid";
import ProcessSpine from "./components/ProcessSpine";
import Services from "./components/Services";
import ShowcaseCards from "./components/ShowcaseCards";
import Faq from "./components/Faq";
import WhyRevlient from "./components/WhyRevlient";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";
import ContactWidget from "./components/ContactWidget";

// Homepage v2. Light premium Huly-inspired surface. All overrides
// for shared components live under `.home-v2` in globals.css.
export default function HomePage() {
  return (
    <div className="home-v2">
      <Nav className="page-home-nav" />
      <main>
        <HeroCrmHero />
        <ShipTrio />
        <div className="h2-aiprompt-wrap">
          <WaterBlobBackdrop />
          <AiPromptSection />
        </div>
        <StudioCraftGrid />
        <ProcessSpine />
        <Services />
        <ShowcaseCards />
        <Faq />
        <WhyRevlient />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </div>
  );
}
