import ShowcaseHero from "../components/ShowcaseHero";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Showcase",
  description: `Concept work and case-study experiments from ${BRAND.name}.`,
};

// /showcase — isolated editorial concept hero page. Developed in
// parallel; not yet linked from the main nav.
export default function ShowcaseRoute() {
  return (
    <>
      <main className="page-showcase">
        <ShowcaseHero />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
