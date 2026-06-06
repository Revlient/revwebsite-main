import { notFound } from "next/navigation";
import AppShowcaseServices from "../../components/services/AppShowcaseServices";
import BundleShowcaseServices from "../../components/services/BundleShowcaseServices";
import WorkFeatureSection from "../../components/WorkFeatureSection";
import BlueGlobe from "../../components/BlueGlobe";
import Reveal from "../../components/Reveal";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import StickyCTA from "../../components/StickyCTA";
import ContactWidget from "../../components/ContactWidget";
import { SERVICES, getService } from "../../lib/services";
import { CTA_HREF, CTA_LABEL } from "../../lib/site";

// Shared components and props from ServicesPage
import {
  WebProjects,
  WebClientMarquee,
  DetailTiles,
  BeforeAfter,
  STUDY_ABROAD_PROPS,
  STUDY_ABROAD_TILES,
  BUNDLE_PROPS,
  WEB_TILES,
  APP_TILES,
} from "../../components/ServicesPage";

// Static param generation
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

// Metadata generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.summary,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // Determine mockup view to render
  let MockupView = null;
  let subTiles = [];

  if (slug === "web-development") {
    MockupView = (
      <div className="svcpage-mockup svcpage-mockup--web">
        <WebProjects />
        <WebClientMarquee />
      </div>
    );
    subTiles = WEB_TILES;
  } else if (slug === "application-development") {
    MockupView = (
      <div className="svcpage-mockup svcpage-mockup--app">
        <AppShowcaseServices />
      </div>
    );
    subTiles = APP_TILES;
  } else if (slug === "software-development") {
    MockupView = (
      <div className="svcpage-mockup svcpage-mockup--software">
        <BundleShowcaseServices {...BUNDLE_PROPS} />
      </div>
    );
    subTiles = APP_TILES;
  } else if (slug === "automation-systems") {
    MockupView = (
      <div className="svcpage-mockup svcpage-mockup--automation">
        <div className="svc-erp-stage">
          <div className="svc-erp-stage__globe" aria-hidden="true">
            <BlueGlobe />
          </div>
          <div className="svc-erp-stage__frame">
            <WorkFeatureSection {...STUDY_ABROAD_PROPS} />
          </div>
        </div>
        <div className="svc-block__inner">
          <BeforeAfter />
        </div>
      </div>
    );
    subTiles = STUDY_ABROAD_TILES;
  }

  return (
    <div className="svc-shell svc-shell--v2 svcpage-shell">
      {/* Shared Nav Header */}
      <Nav />

      <main className="svcpage-main">
        {/* Immersive Hero Section */}
        <section className="svcpage-hero">
          <div className="svc-hero-v2__bg-deep" aria-hidden="true" />
          <div className="svc-hero-v2__grid" aria-hidden="true" />
          <div className="svc-hero-v2__glow svc-hero-v2__glow--center" aria-hidden="true" />
          
          <div className="svc-hero-v2__particles" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => {
              const left = (i * 17) % 81 + 10;
              const top = (i * 23 + 11) % 66 + 15;
              const delay = ((i * 0.7) % 6).toFixed(1);
              const duration = (5 + (i * 1.3) % 5).toFixed(1);
              const size = (1.5 + (i * 0.3) % 2).toFixed(1);
              return (
                <span
                  key={i}
                  className="svc-hero-v2__particle"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                />
              );
            })}
          </div>

          <div className="svcpage-hero__inner">
            <Reveal>
              <span className="svcpage-hero__eyebrow">
                <span className="svc-hero-v2__status-dot" />
                Service Pillar · Revlient
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="svcpage-hero__title">
                {service.title.split(" ").map((w, idx) => {
                  const words = service.title.split(" ");
                  return idx === words.length - 1 ? (
                    <span key={w} className="svc-hero-v2__title-accent"> {w}</span>
                  ) : (
                    <span key={w}>{idx > 0 && " "}{w}</span>
                  );
                })}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="svcpage-hero__summary">{service.summary}</p>
            </Reveal>

            <Reveal delay={260}>
              <div className="svcpage-hero__actions">
                <a href={CTA_HREF} className="svc-hero-v2__cta">
                  <span className="svc-hero-v2__cta-glow" />
                  {CTA_LABEL}
                </a>
                <a href="/services" className="svc-hero-v2__cta-secondary">
                  ← Back to Services
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Mockup Showcase Section */}
        <section className="svcpage-showcase">
          {MockupView}
        </section>

        {/* Core Details Grid */}
        <section className="svcpage-details">
          <div className="svcpage-details__inner">
            <div className="svcpage-details__grid">
              
              {/* Capabilities Card */}
              <Reveal className="svcpage-card svcpage-card--caps">
                <h2 className="svcpage-card__title">Core Capabilities</h2>
                <p className="svcpage-card__desc">What we architect, engineer, and deploy under this service pillar.</p>
                <div className="svcpage-caps__wrapper">
                  <DetailTiles tiles={subTiles} />
                </div>
              </Reveal>

              {/* Deliverables Card */}
              <Reveal className="svcpage-card svcpage-card--deliv" delay={100}>
                <h2 className="svcpage-card__title">What We Ship</h2>
                <p className="svcpage-card__desc">The tangible product deliverables you own on project completion.</p>
                <ul className="svcpage-deliv__list">
                  {service.deliverables.map((d) => (
                    <li key={d} className="svcpage-deliv__item">
                      <span className="svcpage-deliv__icon" aria-hidden="true">✓</span>
                      <div>
                        <strong className="svcpage-deliv__name">{d}</strong>
                        <span className="svcpage-deliv__sub">Production-grade standard</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Technologies Chips */}
            <Reveal className="svcpage-tech" delay={150}>
              <h2 className="svcpage-tech__title">Technology & Stack Focus</h2>
              <div className="svcpage-tech__chips">
                {service.chips.map((chip) => (
                  <span key={chip} className="svcpage-tech__chip">
                    <span className="svcpage-tech__chip-dot" />
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Technical Deep Dive (SEO detailed copy) */}
        {service.detailedSections && (
          <section className="svcpage-seo">
            <div className="svcpage-seo__inner">
              <Reveal>
                <h2 className="svcpage-seo__title">Engineering Excellence · Deep Dive</h2>
              </Reveal>
              <div className="svcpage-seo__grid">
                {service.detailedSections.map((section, idx) => (
                  <Reveal key={section.title} className="svcpage-seo-card" delay={idx * 80}>
                    <h3 className="svcpage-seo-card__title">{section.title}</h3>
                    <p className="svcpage-seo-card__text">{section.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <StickyCTA />
      <ContactWidget />
    </div>
  );
}
