"use client";

import { useState, useRef } from "react";
import Reveal from "./Reveal";
import ProjectMockup from "./work/ProjectMockups";

/* /work projects bento. Enhanced with:
   - Dynamic project filtering (All, SaaS & CRM, E-Commerce, Websites).
   - Mouse-spotlight tracking on the section container.
   - Interactive 3D card tilt transformations and pointer border glow updates.
   - Statically locked cover gradient background mapping to prevent background shifts on filters. */

const PROJECTS = [
  {
    name: "Aurora Commerce",
    kind: "feature",
    mockup: "aurora",
    category: "E-Commerce",
    about:
      "Headless storefront for a boutique outdoor-gear brand. Next.js front end, Stripe checkout, real-time inventory sync with the warehouse system.",
    url: "https://example.com/aurora",
  },
  {
    name: "Vertex CRM",
    kind: "standard",
    mockup: "vertex",
    category: "SaaS & CRM",
    about:
      "Sales-pipeline tool for a regional insurance group. Multi-role access, automated follow-up sequences, and a Slack-style team inbox.",
    url: "https://example.com/vertex",
  },
  {
    name: "Lumen Studio",
    kind: "standard",
    mockup: "lumen",
    category: "Websites",
    about:
      "Portfolio site for an architecture practice. Image-led editorial layout, custom CMS, hand-tuned typography for long-form project writeups.",
    url: "https://example.com/lumen",
  },
  {
    name: "Northwind Ops",
    kind: "standard",
    mockup: "northwind",
    category: "SaaS & CRM",
    about:
      "Internal dashboard for fleet operations. Real-time vehicle tracking, dispatch automation, and a driver mobile app with offline sync.",
    url: "https://example.com/northwind",
  },
  {
    name: "Folio Health",
    kind: "standard",
    mockup: "folio",
    category: "SaaS & CRM",
    about:
      "Patient-intake and records app for a small clinic group. Mobile-first design, role-scoped access, and a clean handoff to their billing tool.",
    url: "https://example.com/folio",
  },
  {
    name: "Mesa Roastery",
    kind: "wide",
    mockup: "mesa",
    category: "E-Commerce",
    about:
      "D2C coffee subscription shop. Stripe billing, warehouse-side fulfilment, and a roast-schedule view the team actually opens every morning.",
    url: "https://example.com/mesa",
  },
];

const COVER_BGS = {
  aurora: "linear-gradient(135deg, #2b3a72, #0f1a3a)",
  vertex: "linear-gradient(135deg, #4a3b6e, #1a1230)",
  lumen: "linear-gradient(135deg, #1f4a55, #08222a)",
  northwind: "linear-gradient(135deg, #5a3a2a, #1a0f08)",
  folio: "linear-gradient(135deg, #2f5a3a, #0a1f12)",
  mesa: "linear-gradient(135deg, #6a3a4a, #1f0a15)",
};

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 L17 7" />
      <path d="M8 7 L17 7 L17 16" />
    </svg>
  );
}

export default function WorkProjects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const sectionRectRef = useRef(null);
  const cardRectsRef = useRef(new Map());
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleSectionMouseEnter = () => {
    if (sectionRef.current) {
      sectionRectRef.current = sectionRef.current.getBoundingClientRect();
    }
  };

  const handleSectionMouseMove = (e) => {
    if (!sectionRectRef.current) {
      if (sectionRef.current) {
        sectionRectRef.current = sectionRef.current.getBoundingClientRect();
      } else {
        return;
      }
    }
    const rect = sectionRectRef.current;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const handleSectionMouseLeave = () => {
    sectionRectRef.current = null;
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    let rect = cardRectsRef.current.get(card);
    if (!rect) {
      rect = card.getBoundingClientRect();
      cardRectsRef.current.set(card, rect);
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rx = ((yc - y) / yc) * 10; // 10deg max tilt
    const ry = ((x - xc) / xc) * 10;
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    cardRectsRef.current.delete(card);
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  const categories = ["All", "SaaS & CRM", "E-Commerce", "Websites"];

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section
      className="work-projects"
      id="projects"
      ref={sectionRef}
      onMouseEnter={handleSectionMouseEnter}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      style={{
        "--mx": `${coords.x}%`,
        "--my": `${coords.y}%`,
      }}
    >
      {/* Background blueprint elements */}
      <div className="work-projects__bg-glow" aria-hidden="true" />
      <div className="work-projects__grid-pattern" aria-hidden="true" />

      <div className="container">
        <Reveal className="work-projects__head">
          <span className="work-projects__eyebrow">Selected work</span>
          <h2 className="work-projects__title">
            Recent projects we&apos;ve shipped.
          </h2>
          <p className="work-projects__sub">
            A snapshot of the studio&apos;s build range — websites, internal
            tools, and end-to-end product work.
          </p>
          <span className="work-projects__todo">
            Demo content — placeholder projects shown while real case studies
            are prepared
          </span>

          {/* Dynamic Filter Navigation */}
          <div className="work-projects__filter-nav">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`work-projects__filter-btn ${activeCategory === cat ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="work-projects__grid">
          {filteredProjects.map((p, i) => (
            <Reveal
              as="a"
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`work-project work-project--${p.kind}`}
              delay={(i % 3) * 60}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div
                className="work-project__cover"
                style={{ background: COVER_BGS[p.mockup] || "linear-gradient(135deg, #1b2540, #0b1326)" }}
              >
                <div className="work-project__live">
                  <ProjectMockup kind={p.mockup} />
                </div>
                <span className="work-project__live-badge" aria-hidden="true">
                  <span className="work-project__live-dot" />
                  Live preview
                </span>
                <span className="work-project__demo">Demo</span>
              </div>
              <div className="work-project__body">
                <div className="work-project__row">
                  <h3 className="work-project__name">{p.name}</h3>
                  <span className="work-project__arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <p className="work-project__about">{p.about}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
