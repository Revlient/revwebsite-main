"use client";

import { useState } from "react";
import Reveal from "./Reveal";

/* /blog landing — Insights header + 3-column post grid matching the reference design.
   Vanilla JS + plain CSS, minimal metadata representation. */

const POSTS = [
  {
    slug: "ai-for-ecommerce",
    category: "Blog",
    title: "AI for Ecommerce: Driving the Next Digital Revolution",
    excerpt: "How artificial intelligence is shaping the future of online retail and next-gen customer journeys.",
    author: "Revlient Studio",
    date: "April 13, 2026",
    readMins: "6",
    cover: "/blog-ai-ecommerce.png",
  },
  {
    slug: "new-visual-commerce",
    category: "Blog",
    title: "The New Visual Commerce: Driving Next-Gen Purchases",
    excerpt: "Re-engineering visual shopping experiences with modern digital assets and interactive media.",
    author: "Product Team",
    date: "April 06, 2026",
    readMins: "10",
    cover: "/blog-visual-commerce.png",
  },
  {
    slug: "best-programming-languages-2026",
    category: "Blog",
    title: "Best Programming Languages in 2026 for Future-Ready Development",
    excerpt: "An in-depth analysis of high-performance coding architectures and language trends this year.",
    author: "Engineering Team",
    date: "April 20, 2026",
    readMins: "9",
    cover: "/blog-programming-languages.png",
  },
  {
    slug: "advantages-disadvantages-social-media",
    category: "Blog",
    title: "Top 20 Advantages and Disadvantages of Social Media",
    excerpt: "Exploring the dual nature of social networking platforms on business and personal communication.",
    author: "Marketing Group",
    date: "January 18, 2024",
    readMins: "10",
    cover: "",
    popular: true,
  },
  {
    slug: "advantages-disadvantages-technology",
    category: "Blog",
    title: "Top 20 Advantages and Disadvantages of Technology",
    excerpt: "A critical look at modern tech solutions and their impact on efficiency and human interaction.",
    author: "AI Lab",
    date: "September 09, 2024",
    readMins: "8",
    cover: "",
    popular: true,
  },
  {
    slug: "top-11-backend-programming-languages-2026",
    category: "Blog",
    title: "Top 11 Backend Programming Languages in 2026",
    excerpt: "Choosing the right backend stack for scalable cloud APIs and semantic data query engines.",
    author: "Engineering Team",
    date: "November 13, 2024",
    readMins: "7",
    cover: "",
    popular: true,
  },
  {
    slug: "what-is-ecommerce-applications",
    category: "Blog",
    title: "What Is E-commerce and What Are Its Applications?",
    excerpt: "A comprehensive guide to electronic commerce systems, platforms, and operational architectures.",
    author: "Product Team",
    date: "September 24, 2024",
    readMins: "12",
    cover: "",
    popular: true,
  },
  // Mock News & Events to keep tabs functional and dynamic
  {
    slug: "revlient-raises-seed-funding",
    category: "News",
    title: "Revlient Raises $4M Seed Funding to Scale Custom AI Agent Suite",
    excerpt: "Announcing our recent seed round to expand research and support larger production integrations.",
    author: "Press Release",
    date: "May 22, 2026",
    readMins: "4",
    cover: "/blog-ranking.png",
  },
  {
    slug: "design-systems-meetup-2026",
    category: "Events",
    title: "Web Performance & Design Systems Meetup 2026",
    excerpt: "Join us in our studio or online for an evening of talks on micro-animations and core web vitals.",
    author: "Host Team",
    date: "July 15, 2026",
    readMins: "12",
    cover: "/blog-laptop.png",
  },
  {
    slug: "clean-code-standards-2026",
    category: "Blog",
    title: "Clean Code Standards for Modern Engineering Teams",
    excerpt: "Writing readable, maintainable, and self-documenting code in fast-moving dev shops.",
    author: "Engineering Team",
    date: "April 28, 2026",
    readMins: "8",
    cover: "/blog-code.png",
  },
  {
    slug: "crafting-digital-creativity",
    category: "Blog",
    title: "Crafting Digital Creativity: Design Principles That Wow",
    excerpt: "Balancing aesthetics, motion design, and performance to build digital masterpieces.",
    author: "Design Team",
    date: "May 05, 2026",
    readMins: "7",
    cover: "/blog-creativity.png",
  },
  {
    slug: "scaling-cloud-infrastructure",
    category: "Blog",
    title: "Scaling Cloud Infrastructure for Millions of Users",
    excerpt: "Best practices for container orchestration, zero-downtime deployments, and edge networking.",
    author: "DevOps Lead",
    date: "May 12, 2026",
    readMins: "11",
    cover: "/blog-laptop.png",
  },
  {
    slug: "optimizing-web-performance",
    category: "Blog",
    title: "Optimizing Web Performance: The Core Web Vitals Audit",
    excerpt: "Deep dive into page load budgets, image encoding, CSS delivery, and JavaScript execution paths.",
    author: "Frontend Lead",
    date: "May 19, 2026",
    readMins: "6",
    cover: "/blog-ranking.png",
  },
];

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState("Blogs");
  const categories = ["Blogs", "News", "Events"];

  const filteredPosts = POSTS.filter((p) => {
    if (activeCategory === "Blogs") return p.category === "Blog";
    if (activeCategory === "News") return p.category === "News";
    if (activeCategory === "Events") return p.category === "Events";
    return true;
  });

  const leftColumnPosts = filteredPosts.filter(
    (p) => p.slug === "ai-for-ecommerce" || p.slug === "new-visual-commerce"
  );
  const featuredPost = filteredPosts.find(
    (p) => p.slug === "best-programming-languages-2026"
  );
  const popularPosts = filteredPosts.filter((p) => p.popular);

  const morePosts = filteredPosts.filter(
    (p) =>
      p.slug !== "ai-for-ecommerce" &&
      p.slug !== "new-visual-commerce" &&
      p.slug !== "best-programming-languages-2026" &&
      !p.popular
  );

  return (
    <div className="blog">
      <div className="blog__container">
        <Reveal className="blog__header">
          <h1 className="blog__insights-title">Insights</h1>
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

        {activeCategory === "Blogs" ? (
          <>
            <div className="blog__layout">
              {/* Column 1: Left column */}
              <div className="blog__col-left">
                {leftColumnPosts.map((post) => (
                  <Reveal key={post.slug} as="article" className="blog-card-small">
                    {post.cover && (
                      <a href={`/blog/${post.slug}`} className="blog-card-small__cover-link">
                        <div
                          className="blog-card-small__cover"
                          style={{ backgroundImage: `url(${post.cover})` }}
                        />
                      </a>
                    )}
                    <div className="blog-card-small__body">
                      <div className="blog-card__meta-row">
                        <span className="blog-card__cat-read">
                          {post.category} • {post.readMins} mins read
                        </span>
                        <span className="blog-card__date">{post.date}</span>
                      </div>
                      <h3 className="blog-card-small__title">
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h3>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Column 2: Center Column (Featured Post) */}
              <div className="blog__col-center">
                {featuredPost && (
                  <Reveal as="article" className="blog-card-featured">
                    {featuredPost.cover && (
                      <a href={`/blog/${featuredPost.slug}`} className="blog-card-featured__cover-link">
                        <div
                          className="blog-card-featured__cover"
                          style={{ backgroundImage: `url(${featuredPost.cover})` }}
                        />
                      </a>
                    )}
                    <div className="blog-card-featured__body">
                      <div className="blog-card__meta-row">
                        <span className="blog-card__cat-read">
                          {featuredPost.category} • {featuredPost.readMins} mins read
                        </span>
                        <span className="blog-card__date">{featuredPost.date}</span>
                      </div>
                      <h2 className="blog-card-featured__title">
                        <a href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</a>
                      </h2>
                    </div>
                  </Reveal>
                )}
              </div>

              {/* Column 3: Right Column (Most popular) */}
              <div className="blog__col-right">
                <Reveal className="blog__col-right-inner">
                  <h3 className="blog__popular-heading">Most popular</h3>
                  <div className="blog__popular-list">
                    {popularPosts.map((post) => (
                      <article key={post.slug} className="blog-card-popular">
                        <div className="blog-card__meta-row">
                          <span className="blog-card__cat-read">
                            {post.category} • {post.readMins} mins
                          </span>
                          <span className="blog-card__date">{post.date}</span>
                        </div>
                        <h4 className="blog-card-popular__title">
                          <a href={`/blog/${post.slug}`}>{post.title}</a>
                        </h4>
                      </article>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            {/* More Stories Section */}
            {morePosts.length > 0 && (
              <div className="blog__more-section">
                <div className="blog__more-divider" />
                <h2 className="blog__more-heading">More Stories</h2>
                <div className="blog__more-grid">
                  {morePosts.map((post) => (
                    <Reveal key={post.slug} as="article" className="blog-card-more">
                      {post.cover && (
                        <a href={`/blog/${post.slug}`} className="blog-card-more__cover-link">
                          <div
                            className="blog-card-more__cover"
                            style={{ backgroundImage: `url(${post.cover})` }}
                          />
                        </a>
                      )}
                      <div className="blog-card-more__body">
                        <div className="blog-card__meta-row">
                          <span className="blog-card__cat-read">
                            {post.category} • {post.readMins} mins read
                          </span>
                          <span className="blog-card__date">{post.date}</span>
                        </div>
                        <h3 className="blog-card-more__title">
                          <a href={`/blog/${post.slug}`}>{post.title}</a>
                        </h3>
                        <p className="blog-card-more__excerpt">{post.excerpt}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* For News/Events, render a simple clean grid */
          <div className="blog__fallback-grid">
            {filteredPosts.map((post) => (
              <Reveal key={post.slug} as="article" className="blog-card-small">
                {post.cover && (
                  <a href={`/blog/${post.slug}`} className="blog-card-small__cover-link">
                    <div
                      className="blog-card-small__cover"
                      style={{ backgroundImage: `url(${post.cover})` }}
                    />
                  </a>
                )}
                <div className="blog-card-small__body">
                  <div className="blog-card__meta-row">
                    <span className="blog-card__cat-read">
                      {post.category} • {post.readMins} mins read
                    </span>
                    <span className="blog-card__date">{post.date}</span>
                  </div>
                  <h3 className="blog-card-small__title">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                </div>
              </Reveal>
            ))}
            {filteredPosts.length === 0 && (
              <div className="blog__empty-state">
                <p>No articles found in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
