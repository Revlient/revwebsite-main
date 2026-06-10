import Nav from "../components/Nav";
import ContactPage from "../components/ContactPage";
import { BRAND } from "../lib/site";

export const metadata = {
  title: "Contact",
  description: `Free consultation with ${BRAND.name}. Reach the studio by email, phone, or WhatsApp with a short brief and we will reply with a clear next step.`,
};

export default function ContactRoute() {
  return (
    <>
      <Nav />
      <ContactPage />
    </>
  );
}
