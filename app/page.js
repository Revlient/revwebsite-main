import Nav from "./components/Nav";
import CinematicHero from "./components/CinematicHero";
import AiPromptSection from "./components/AiPromptSection";
import ShowcaseCards from "./components/ShowcaseCards";
import Faq from "./components/Faq";
import CapabilityGrid from "./components/CapabilityGrid";
import ProcessSpine from "./components/ProcessSpine";
import LockedServicesScroll from "./components/LockedServicesScroll";
import CaseStudiesScroll from "./components/CaseStudiesScroll";
import WhyRevlient from "./components/WhyRevlient";
import IndustriesListSection from "./components/IndustriesListSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";
import ContactWidget from "./components/ContactWidget";
import { BRAND, CONTACT_EMAIL, PHONE_TEL } from "./lib/site";

// Homepage. Cinematic hero + capabilities open the page; the rest
// of the sections follow. WorkFeatureSection moves down to live
// between the AmbientDashboard cockpit and ProcessSpine.
export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": BRAND.name,
    "legalName": BRAND.legalName,
    "url": "https://revlient.com",
    "logo": "https://revlient.com/logo.svg",
    "description": "Revlient is a premium creative studio crafting 3D-grade websites and applications, engineered to feel as good as they look.",
    "telephone": PHONE_TEL,
    "email": CONTACT_EMAIL,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://systems.revlient.com"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav className="page-home-nav" />

      <main>
        <CinematicHero />

        <div className="h-chat-light">
          <AiPromptSection />
        </div>
        <CapabilityGrid />
        <ProcessSpine />
        <LockedServicesScroll />
        <CaseStudiesScroll />
        <ShowcaseCards />
        <Faq />
        <IndustriesListSection />
        {/* <WhyRevlient /> */}
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
