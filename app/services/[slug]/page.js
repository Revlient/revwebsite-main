import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import StickyCTA from "../../components/StickyCTA";
import ContactWidget from "../../components/ContactWidget";
import ServiceIcon from "../../components/ServiceIcon";
import { SERVICES, getService } from "../../lib/services";
import { CTA_HREF, CTA_LABEL } from "../../lib/site";

// Pre-render one static page per service; unknown slugs 404.
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  // Root layout applies the "%s — Revlient" title template.
  return {
    title: s.title,
    description: s.summary,
  };
}

// Minimal-but-real detail landing for each service. Deliberately kept
// to the truthful overview + capabilities + CTA for now — the deeper
// page (process, work, FAQ) is a later pass.
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="section svcpage">
          <div className="container svcpage__inner">
            <span className="svcpage__icon">
              <ServiceIcon name={service.icon} />
            </span>
            <span className="eyebrow">Service</span>
            <h1 className="svcpage__title">{service.title}</h1>
            <p className="svcpage__lead">{service.summary}</p>

            <ul className="svcpage__caps">
              {service.capabilities.map((c) => (
                <li key={c}>
                  <span className="svcpage__tick" aria-hidden="true">
                    →
                  </span>
                  {c}
                </li>
              ))}
            </ul>

            <div className="svcpage__actions">
              <a href={`/${CTA_HREF}`} className="btn btn--primary">
                {CTA_LABEL}
              </a>
              <a href="/#services" className="text-link">
                ← All services
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
