import Nav from "../components/Nav";
import ProcessPage from "../components/ProcessPage";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Our Process",
  description: `How ${BRAND.name} builds digital products that deliver — six deliberate stages from the first conversation to the day after launch.`,
};

export default function ProcessRoute() {
  return (
    <>
      <Nav />
      <main className="page-process">
        <ProcessPage />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
