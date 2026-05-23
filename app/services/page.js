import ServicesPage from "../components/ServicesPage";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Services",
  description: `What ${BRAND.name} builds — web, CRM, e-commerce, UI/UX, mobile and custom software, end-to-end.`,
};

// /services landing. Uses its own in-page nav (defined inside
// ServicesPage) to match the editorial aesthetic, so the global
// <Nav /> is intentionally omitted here.
export default function ServicesRoute() {
  return (
    <>
      <main className="page-services">
        <ServicesPage />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
