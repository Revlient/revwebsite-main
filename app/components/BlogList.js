"use client";

import { useState } from "react";
import Reveal from "./Reveal";

/* /blog landing — hero + grid of post cards. Vanilla JS + plain CSS,
   inline SVGs in place of lucide-react. */

const POSTS = [
  {
    slug: "shipping-at-revlient",
    category: "Creativity",
    title: "Crafting digital momentum: What 'shipping' actually means at Revlient",
    excerpt:
      "A deep dive into our core product philosophy — why shipping fast is a design feature, how we balance aesthetic polish with runtime performance, and the systems we use to ship premium interfaces on budget.",
    author: "Revlient Studio",
    date: "Jun 2026",
    readMins: "6",
    cover: "/blog-creativity.png",
  },
  {
    slug: "custom-headless-cms",
    category: "Code",
    title: "The architectural choice: Custom headless CMS vs legacy suites",
    excerpt:
      "When the headless option wins, when the legacy monolithic option wins, and the third hybrid path that most technical teams overlook. An engineering analysis of content rendering speed, security boundaries, and editing experience.",
    author: "Engineering Team",
    date: "May 2026",
    readMins: "8",
    cover: "/blog-code.png",
  },
  {
    slug: "designing-skeptical-buyer",
    category: "Creativity",
    title: "Designing for the conversion threshold: Building skepticism-proof trust",
    excerpt:
      "How visual decisions, font hierarchies, micro-animations, and loaded state handling inside a homepage build or burn trust with a technical buyer in the first five critical seconds of interaction.",
    author: "Design Group",
    date: "Apr 2026",
    readMins: "5",
    cover: "/blog-creativity.png",
  },
  {
    slug: "practical-ai-erp",
    category: "Code",
    title: "Enterprise ERP systems: Integrating practical AI agents in production",
    excerpt:
      "A technical walkthrough of how we shipped a live AI assistant, semantic matching engines, and auto-quotation processors inside the custom Revlient OS without bloat or token latency issues.",
    author: "AI Lab",
    date: "Mar 2026",
    readMins: "9",
    cover: "/blog-code.png",
  },
  {
    slug: "seo-organic-playbook",
    category: "Seo",
    title: "The organic playbook: Advanced SEO strategies for modern scale",
    excerpt:
      "Stop chasing algorithm updates. Learn the semantic indexing, site architecture, core web vitals, and structured schema schemas we use to generate millions in high-intent organic traffic without paid ads.",
    author: "SEO Team",
    date: "Feb 2026",
    readMins: "7",
    cover: "/blog-ranking.png",
  },
  {
    slug: "study2india-case-study",
    category: "Marketing",
    title: "Unlocking counsellor momentum: Rebuilding Study2India from the ground up",
    excerpt:
      "What the education platform was selling before, how we re-engineered the user acquisition funnel, and what changed for the international counsellors on day one of launching the new portal.",
    author: "Product Team",
    date: "Jan 2026",
    readMins: "11",
    cover: "/blog-laptop.png",
  },
];

function Arrow({ className = "" }) {
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
      <path d="M5 12 H19" />
      <path d="M13 6 L19 12 L13 18" />
    </svg>
  );
}

function PostCover({ coverUrl, category }) {
  if (coverUrl) {
    return (
      <div
        className="blog-card__cover"
        style={{
          backgroundImage: `url(${coverUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="blog-card__cover-grid" />
        <span className="blog-card__cover-orb" />
      </div>
    );
  }
  return (
    <div className="blog-card__cover">
      <span className="blog-card__cover-grid" />
      <span className="blog-card__cover-orb" />
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <Reveal as="article" className="blog-card">
      <PostCover coverUrl={post.cover} category={post.category} />
      <div className="blog-card__body">
        <span className="blog-card__tag">{post.category}</span>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <div className="blog-card__foot">
          <div className="blog-card__meta">
            <span className="blog-card__author">{post.author}</span>
            <span className="blog-card__dot" aria-hidden="true">·</span>
            <span>{post.date}</span>
            <span className="blog-card__dot" aria-hidden="true">·</span>
            <span>{post.readMins} min read</span>
          </div>
          <span className="blog-card__cta">
            Read article
            <Arrow className="blog-card__cta-icon" />
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Seo", "Marketing", "Creativity", "Code"];

  const filteredPosts = activeCategory === "All"
    ? POSTS
    : POSTS.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="blog">
      <header className="blog__hero">
        <span className="blog__hero-spot" aria-hidden="true" />
        <Reveal className="blog__hero-inner">
          <div className="blog__hero-grid">
            <div className="blog__hero-left">
              <h1 className="blog__title">
                Blogs and<br />Insights
              </h1>
            </div>
            <div className="blog__hero-right">
              <p className="blog__sub">
                Insights, ideas, and strategies shaping the future of digital and business transformation
              </p>
            </div>
          </div>

          <div className="blog__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`blog__filter-btn ${activeCategory === cat ? "is-active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </header>

      <section className="blog__list">
        <div className="blog__grid">
          {filteredPosts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>


    </div>
  );
}
