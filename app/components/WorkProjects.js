"use client";

import { useState, useRef } from "react";
import Reveal from "./Reveal";

/* /work projects bento. Enhanced with:
   - Dynamic project filtering (All, Corporate & Design, E-Commerce, Education).
   - Mouse-spotlight tracking on the section container.
   - Interactive 3D card tilt transformations and pointer border glow updates.
   - Real cover screenshots loaded directly from public/work directory. */

const PROJECTS = [
  {
    number: "01",
    category: "Architecture & Interior Design",
    title: "House of Eleven",
    description: "A cinematic digital presence for an award-winning architecture and interior design studio. 225+ completed studies, projects across 4 countries.",
    tags: ["Next.js", "GSAP", "Motion"],
    year: "2024",
    accent: "gold",
    url: "https://houseof11.in",
    image: "/project-houseof11.png",
    imageAlt: "House of Eleven hero",
  },
  {
    number: "02",
    category: "Architecture & Construction Consultancy",
    title: "IBS Consultants",
    description: "A precision-crafted SPA for a leading architecture and construction consultancy. Built for trust — clean, confident, and structured to convert.",
    tags: ["React", "Vite", "CSS"],
    year: "2024",
    accent: "gold",
    url: "https://ibsconsultants.in",
    image: "/project-ibs.png",
    imageAlt: "IBS Consultants hero",
  },
  {
    number: "03",
    category: "Premium Coworking & Workspace",
    title: "Covspace",
    description: "Digital flagship for a premium coworking brand. Private offices, conference rooms, and flex desks — presented with boutique polish.",
    tags: ["React", "Vite", "DM Sans"],
    year: "2024",
    accent: "neutral",
    url: "https://covspace.in",
    image: "/project-covspace.png",
    imageAlt: "Covspace hero",
  },
  {
    number: "04",
    category: "Fashion E-Commerce",
    title: "Ronspire",
    description: "A Shopify storefront for an emerging apparel brand — minimal, editorial, and built to sell with a distinct street-ready attitude.",
    tags: ["Shopify", "Liquid", "E-Commerce"],
    year: "2024",
    accent: "neutral",
    url: "https://ronspire.com",
    image: "/project-ronspire.png",
    imageAlt: "Ronspire hero",
  },
  {
    number: "05",
    category: "Management Education",
    title: "Perpex B-School",
    description: "A premium digital campus for a leading business school. Streamlined course discovery, student portals, and executive programs.",
    tags: ["Next.js", "Education", "Portal"],
    year: "2024",
    accent: "gold",
    url: "https://www.perpexbschool.com",
    image: "/project-perpexbschool.png",
    imageAlt: "Perpex B-School hero",
  },
  {
    number: "06",
    category: "Corporate & Consulting",
    title: "Perpex Group",
    description: "The digital home for Perpex Group. A clean, architectural approach to corporate identity and strategic service presentation.",
    tags: ["React", "Corporate", "Design"],
    year: "2024",
    accent: "neutral",
    url: "https://www.perpex.in",
    image: "/project-perpex.png",
    imageAlt: "Perpex Corporate hero",
  },
  {
    number: "07",
    category: "EdTech Platform",
    title: "Mathlete",
    description: "A high-performance competition platform for young mathematicians. Real-time scoring, national leaderboards, and interactive modules.",
    tags: ["Next.js", "EdTech", "Real-time"],
    year: "2024",
    accent: "gold",
    url: "https://mathleteonline.com",
    image: "/project-mathlete.png",
    imageAlt: "Mathlete Online hero",
  },
  {
    number: "08",
    category: "Global Education Consultancy",
    title: "The Magnates",
    description: "A gateway for international education. Helping students bridge the gap between their home country and global universities.",
    tags: ["Consultancy", "Education", "Global"],
    year: "2024",
    accent: "gold",
    url: "https://themagnates.in",
    image: "/project-themagnates.png",
    imageAlt: "The Magnates hero",
  },
  {
    number: "09",
    category: "HR & Recruitment Tech",
    title: "UniGo",
    description: "Intelligent human capital solutions. Connecting global talent with forward-thinking organizations through data-driven recruitment.",
    tags: ["HR-Tech", "Recruitment", "SaaS"],
    year: "2024",
    accent: "neutral",
    url: "https://www.unigo.co",
    image: "/project-unigo.png",
    imageAlt: "UniGo hero",
  },
  {
    number: "10",
    category: "Beauty & Lifestyle",
    title: "Soumya Shyam",
    description: "A luxury studio and academy presence for a celebrity makeup artist. Elegant gallery, booking, and professional course listings.",
    tags: ["Luxury", "Beauty", "Studio"],
    year: "2024",
    accent: "neutral",
    url: "https://www.soumyashyammakeup.com",
    image: "/project-soumyashyam.png",
    imageAlt: "Soumya Shyam Studio hero",
  },
  {
    number: "11",
    category: "Health & Wellness",
    title: "Nutriboxx",
    description: "Fueling healthy lifestyles with fresh, curated fruit and nutrition boxes. A seamless e-commerce experience for wellness subscriptions.",
    tags: ["E-Commerce", "Health", "Wellness"],
    year: "2024",
    accent: "neutral",
    url: "https://www.nutriboxx.co.in",
    image: "/project-nutriboxx.png",
    imageAlt: "Nutriboxx hero",
  },
  {
    number: "12",
    category: "Sustainable E-Commerce",
    title: "Bambrush",
    description: "Leading the plastic-free oral care revolution. A minimal, high-conversion storefront for eco-conscious personal care products.",
    tags: ["Sustainability", "E-Commerce", "Green"],
    year: "2024",
    accent: "neutral",
    url: "https://www.bambrush.co.in",
    image: "/project-bambrush.png",
    imageAlt: "Bambrush hero",
  },
  {
    number: "13",
    category: "Advanced Career Academy",
    title: "Magnate Academy",
    description: "India's top career-focused learning platform. Practical, hands-on programs in Finance, AI Automation, Data Science, 3D Digital Marketing, and Foreign Languages.",
    tags: ["EdTech", "Career", "Learning"],
    year: "2025",
    accent: "gold",
    url: "https://www.magnateacademy.com",
    image: "/project-magnateacademy.png",
    imageAlt: "Magnate Academy screenshot",
  },
  {
    number: "14",
    category: "Premium Overseas Education",
    title: "Magnate Study Abroad",
    description: "Premium overseas education portal connecting students with top universities across the UK, Canada, Australia, and USA. Features scholarship assistance, visa guidance, and free student laptops.",
    tags: ["Global", "Education", "Portal"],
    year: "2025",
    accent: "gold",
    url: "https://magnate-studyabroad2.vercel.app",
    image: "/project-magnatestudyabroad2.png",
    imageAlt: "Magnate Study Abroad screenshot",
  },
  {
    number: "15",
    category: "Overseas Education Consultancy",
    title: "Magnate Global",
    description: "Realizing your academic aspirations globally. Premier study abroad consultants providing end-to-end admission and expert visa support across worldwide destinations.",
    tags: ["Consultancy", "Admissions", "Visa"],
    year: "2025",
    accent: "neutral",
    url: "https://magnatestudyaborad.vercel.app",
    image: "/project-magnatestudyaborad.png",
    imageAlt: "Magnate Global screenshot",
  },
];

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

  const getFilterCategory = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("e-commerce") || cat.includes("wellness")) {
      return "E-Commerce";
    }
    if (cat.includes("education") || cat.includes("edtech") || cat.includes("academy")) {
      return "Education";
    }
    return "Corporate & Design";
  };

  const getProjectKind = (index) => {
    if (index === 0 || index === 5 || index === 12) return "feature";
    if (index === 10) return "wide";
    return "standard";
  };

  const categories = ["All", "Corporate & Design", "E-Commerce", "Education"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "All") return true;
    return getFilterCategory(p.category) === activeCategory;
  });

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
            A snapshot of the studio&apos;s build range — custom websites, internal
            management platforms, and end-to-end product work.
          </p>

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
          {filteredProjects.map((p) => {
            const originalIndex = PROJECTS.indexOf(p);
            const kind = getProjectKind(originalIndex);
            return (
              <Reveal
                as="a"
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`work-project work-project--${kind} ${p.accent === "gold" ? "work-project--gold" : ""}`}
                delay={(originalIndex % 3) * 60}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="work-project__cover">
                  <img
                    src={`/work${p.image}`}
                    alt={p.imageAlt}
                    className="work-project__img"
                    loading="lazy"
                  />
                  <span className="work-project__live-badge" aria-hidden="true">
                    <span className="work-project__live-dot" />
                    Live site ↗
                  </span>
                </div>
                <div className="work-project__body">
                  <div className="work-project__meta">
                    <span className="work-project__cat">{p.category}</span>
                    <span className="work-project__year">{p.year}</span>
                  </div>
                  <div className="work-project__row">
                    <h3 className="work-project__name">{p.title}</h3>
                    <span className="work-project__arrow" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </div>
                  <p className="work-project__about">{p.description}</p>
                  <div className="work-project__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="work-project__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
