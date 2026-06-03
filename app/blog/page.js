import Nav from "../components/Nav";
import BlogList from "../components/BlogList";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import ContactWidget from "../components/ContactWidget";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Blog",
  description: `Notes from ${BRAND.name} — long-form pieces on craft, code and the systems we ship.`,
};

export default function BlogRoute() {
  return (
    <>
      <Nav className="blog-nav" />
      <main className="page-blog">
        <BlogList />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
