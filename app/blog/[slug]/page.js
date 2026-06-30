import Nav from "../../components/Nav";
import FinalCTA from "../../components/FinalCTA";
import Footer from "../../components/Footer";
import StickyCTA from "../../components/StickyCTA";
import ContactWidget from "../../components/ContactWidget";
import Reveal from "../../components/Reveal";
import { notFound } from "next/navigation";

// Case studies live in Supabase (auto-generated, admin-published). Unknown
// slugs that aren't in the hardcoded POSTS below are looked up here on
// demand and rendered as a case-study article.
export const dynamicParams = true;

async function loadCaseStudy(slug) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/case_studies` +
        `?select=slug,title,excerpt,body,cover_url,created_at` +
        `&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) ? rows[0] || null : null;
  } catch {
    return null;
  }
}

// Reuse the same mock dataset for consistency
const POSTS = [
  {
    slug: "ai-for-ecommerce",
    category: "Blog",
    title: "AI for Ecommerce: Driving the Next Digital Revolution",
    excerpt: "How artificial intelligence is shaping the future of online retail and next-gen customer journeys.",
    author: "Revlient Studio",
    date: "April 13, 2026",
    readMins: "6",
    cover: "/blog-ai-ecommerce.webp",
    content: (
      <>
        <p className="blog-post__intro">
          Artificial Intelligence is no longer a futuristic concept for digital retailers. In 2026, it serves as the core operational foundation for top-tier ecommerce brands worldwide, redefining how businesses interact with consumers, manage inventories, and personalize shopping experiences.
        </p>
        <h2>The Hyper-Personalization Engine</h2>
        <p>
          Traditional recommendation widgets are being replaced by multi-modal AI agents that understand context, user intent, and real-time sentiment. These agents don't just recommend products; they synthesize complete outfits, suggest tailored alternatives, and adapt pricing dynamically based on demand elasticity.
        </p>
        <blockquote>
          “The future of retail belongs to brands that can treat every single customer as if they are the only visitor in the store.”
        </blockquote>
        <h2>Automated Merchandising & Predictions</h2>
        <p>
          Beyond the customer-facing interface, AI algorithms analyze search behaviors, social trends, and logistics data to optimize supply chains. Brands can now predict stock requirements with up to 94% accuracy, reducing storage costs and preventing product shortages.
        </p>
        <h2>Conversational Checkout Experiences</h2>
        <p>
          Checkout funnels are evolving. Instead of multi-step forms, shoppers can complete reservations and transactions through voice interfaces and messaging channels, managed entirely by secure, context-aware AI pipelines.
        </p>
      </>
    ),
  },
  {
    slug: "new-visual-commerce",
    category: "Blog",
    title: "The New Visual Commerce: Driving Next-Gen Purchases",
    excerpt: "Re-engineering visual shopping experiences with modern digital assets and interactive media.",
    author: "Product Team",
    date: "April 06, 2026",
    readMins: "10",
    cover: "/blog-visual-commerce.webp",
    content: (
      <>
        <p className="blog-post__intro">
          Visual commerce has advanced beyond static flat photos. Modern digital buyers require immersive, interactive, and high-fidelity media to confidently make purchasing decisions in an increasingly crowded online space.
        </p>
        <h2>From Flat Images to Interactive 3D Canvas</h2>
        <p>
          By embedding interactive 3D WebGL models directly into product pages, brands enable customers to rotate, zoom, and customize items in real-time. This interactive participation boosts conversion rates by up to 40% and reduces returns by clarifying spatial expectations.
        </p>
        <blockquote>
          “Interactive media turns passive browsing into active product exploration, building immediate confidence.”
        </blockquote>
        <h2>Spatial Web Integration</h2>
        <p>
          With the maturation of spatial computing devices, visual assets must scale dynamically. Seamlessly integrating web-based augmented reality (WebAR) allows users to preview furniture, artwork, and electronics in their physical spaces with absolute scale accuracy.
        </p>
        <h2>Dynamic Lighting and Fluid Animations</h2>
        <p>
          Premium web aesthetics rely on dynamic micro-interactions. Soft hover transitions, realistic shadow mapping, and organic transitions make online storefronts feel tangible, elegant, and interactive.
        </p>
      </>
    ),
  },
  {
    slug: "best-programming-languages-2026",
    category: "Blog",
    title: "Best Programming Languages in 2026 for Future-Ready Development",
    excerpt: "An in-depth analysis of high-performance coding architectures and language trends this year.",
    author: "Engineering Team",
    date: "April 20, 2026",
    readMins: "9",
    cover: "/blog-programming-languages.webp",
    content: (
      <>
        <p className="blog-post__intro">
          Choosing the right development stack in 2026 requires balancing execution speed, developer ergonomics, memory footprint, and native integrations with AI services. Let's analyze the languages driving next-gen web systems.
        </p>
        <h2>Rust: The Safe Systems Standard</h2>
        <p>
          Rust continues to conquer backend systems, web assembly (Wasm) modules, and tooling. Its zero-cost abstractions, complete memory safety guarantees, and high performance make it the default choice for building scalable infrastructure and low-latency APIs.
        </p>
        <blockquote>
          “Rust is not just a language; it is a guarantee that your high-performance code will run reliably without race conditions.”
        </blockquote>
        <h2>TypeScript: The Universal Web Canvas</h2>
        <p>
          With runtime environments like Deno and Bun reaching full maturity, TypeScript has solidified its place as the premier language for full-stack applications. Its rich type system ensures structural clarity while supporting high-speed execution paths.
        </p>
        <h2>Python: Orchestrating the AI Layer</h2>
        <p>
          While compiled languages handle raw performance, Python remains the unchallenged king of machine learning, data engineering, and AI agent orchestration. Frameworks like FastMCP, LangChain, and PyTorch enable rapid prototyping of semantic systems.
        </p>
      </>
    ),
  },
  {
    slug: "advantages-disadvantages-social-media",
    category: "Blog",
    title: "Top 20 Advantages and Disadvantages of Social Media",
    excerpt: "Exploring the dual nature of social networking platforms on business and personal communication.",
    author: "Marketing Group",
    date: "January 18, 2024",
    readMins: "10",
    cover: "/blog-ranking.webp",
    content: (
      <>
        <p className="blog-post__intro">
          Social media has transformed modern society, bridging geographic divides while introducing complex psychological and operational challenges. We explore the 10 major advantages and 10 major disadvantages of social platforms.
        </p>
        <h2>Key Advantages</h2>
        <ul>
          <li><strong>Global Connectivity:</strong> Instantly communicate with audiences and partners worldwide.</li>
          <li><strong>Cost-Effective Marketing:</strong> Promote services and launch brands with organic distribution channels.</li>
          <li><strong>Real-time Information:</strong> Stay informed on shifting global developments and niche industry trends.</li>
          <li><strong>Community Building:</strong> Bring together passionate interest groups and support networks.</li>
        </ul>
        <h2>Key Disadvantages</h2>
        <ul>
          <li><strong>Attention Fragmentation:</strong> Continuous notifications disrupt focus and deep work practices.</li>
          <li><strong>Security & Privacy Risks:</strong> Personal data collection and phishing campaigns pose constant threats.</li>
          <li><strong>Misinformation Spread:</strong> Algorithms prioritize engagement, occasionally amplifying unverified reports.</li>
          <li><strong>Echo Chambers:</strong> Groupthink patterns block healthy, multi-dimensional conversations.</li>
        </ul>
      </>
    ),
  },
  {
    slug: "advantages-disadvantages-technology",
    category: "Blog",
    title: "Top 20 Advantages and Disadvantages of Technology",
    excerpt: "A critical look at modern tech solutions and their impact on efficiency and human interaction.",
    author: "AI Lab",
    date: "September 09, 2024",
    readMins: "8",
    cover: "/blog-laptop.webp",
    content: (
      <>
        <p className="blog-post__intro">
          Technology acts as the primary driver of human progress. However, rapid technological adoption impacts our ecosystems, working models, and cognitive habits in unexpected ways.
        </p>
        <h2>Top 10 Advantages</h2>
        <p>
          From automated diagnostics in medicine to instant data synchronization across cloud providers, technology increases our efficiency and expands the limits of human potential. Digital platforms connect global supply networks, democratize education, and automate repetitive tasks.
        </p>
        <h2>Top 10 Disadvantages</h2>
        <p>
          Conversely, reliance on automated systems can introduce security liabilities, job displacement, and social isolation. High-frequency digital interactions can reduce attention spans, while electronic waste presents serious environmental challenges that demand circular engineering models.
        </p>
      </>
    ),
  },
  {
    slug: "top-11-backend-programming-languages-2026",
    category: "Blog",
    title: "Top 11 Backend Programming Languages in 2026",
    excerpt: "Choosing the right backend stack for scalable cloud APIs and semantic data query engines.",
    author: "Engineering Team",
    date: "November 13, 2024",
    readMins: "7",
    cover: "/blog-code.webp",
    content: (
      <>
        <p className="blog-post__intro">
          As API architectures incorporate graph databases, real-time message brokers, and vector indexes, backend languages are evolving to meet these high-throughput requirements.
        </p>
        <h2>The Leading Contenders</h2>
        <p>
          Rust, Go, and TypeScript lead the pack for building microservices due to their concurrency primitives and quick start times. Meanwhile, languages like Python and Julia handle the heavy lifting for AI operations and math-heavy analysis.
        </p>
        <blockquote>
          “Modern backend engineering is about choosing the language that minimizes latency while maximizing developer velocity.”
        </blockquote>
        <h2>Emerging Ecosystems</h2>
        <p>
          Functional environments like Elixir (using the BEAM virtual machine) are seeing renewed adoption for real-time multiplayer networks and highly concurrent state sync systems, proving that concurrency control is the defining challenge of 2026.
        </p>
      </>
    ),
  },
  {
    slug: "what-is-ecommerce-applications",
    category: "Blog",
    title: "What Is E-commerce and What Are Its Applications?",
    excerpt: "A comprehensive guide to electronic commerce systems, platforms, and operational architectures.",
    author: "Product Team",
    date: "September 24, 2024",
    readMins: "12",
    cover: "/blog-visual-commerce.webp",
    content: (
      <>
        <p className="blog-post__intro">
          E-commerce is no longer just a web checkout system. It encompasses comprehensive logistics, automated inventories, headless cart APIs, and global payment rails.
        </p>
        <h2>Core Applications</h2>
        <p>
          Electronic retail spans Business-to-Consumer (B2C) stores, Business-to-Business (B2B) supply marketplaces, and Consumer-to-Consumer (C2C) auction sites. Modern applications leverage headless architectures where the visual frontend is decoupled from inventory systems to allow maximum layout customization.
        </p>
        <blockquote>
          “Decoupled commerce allows studios to craft custom storefronts that feel like editorial lookbooks without compromising transaction security.”
        </blockquote>
        <h2>Modern Integrations</h2>
        <p>
          Payment platforms like Stripe, inventory feeds like Shopify, and warehouse APIs must operate in perfect alignment to support instant order validation and zero-delay logistics coordination.
        </p>
      </>
    ),
  },
  {
    slug: "clean-code-standards-2026",
    category: "Blog",
    title: "Clean Code Standards for Modern Engineering Teams",
    excerpt: "Writing readable, maintainable, and self-documenting code in fast-moving dev shops.",
    author: "Engineering Team",
    date: "April 28, 2026",
    readMins: "8",
    cover: "/blog-code.webp",
    content: (
      <>
        <p className="blog-post__intro">
          In high-velocity development organizations, clean code is the difference between rapid feature iteration and project-stopping technical debt.
        </p>
        <h2>Readability Over Cleverness</h2>
        <p>
          Code is read far more often than it is written. Variable names should be descriptive, functions should do exactly one thing, and complex logic blocks must be isolated into reusable helper utilities.
        </p>
        <blockquote>
          “Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.”
        </blockquote>
        <h2>Automated Quality Gates</h2>
        <p>
          Static analysis, continuous linting, and automated unit tests should run on every commit. This ensures standard styling conventions, validates architecture patterns, and prevents regressions before they reach staging.
        </p>
      </>
    ),
  },
  {
    slug: "crafting-digital-creativity",
    category: "Blog",
    title: "Crafting Digital Creativity: Design Principles That Wow",
    excerpt: "Balancing aesthetics, motion design, and performance to build digital masterpieces.",
    author: "Design Team",
    date: "May 05, 2026",
    readMins: "7",
    cover: "/blog-creativity.webp",
    content: (
      <>
        <p className="blog-post__intro">
          Stunning visual design should never come at the expense of performance. We examine how to combine premium animations and light interactions into fast, high-performance web structures.
        </p>
        <h2>Micro-Animations as Interaction Feedback</h2>
        <p>
          Subtle hover actions, tiny magnetic pulls on buttons, and smooth transition overrides give user interfaces a responsive, physical feel. These details guide the visitor's eye and reward participation.
        </p>
        <blockquote>
          “Great design is invisible; it is felt through the natural flow of interaction.”
        </blockquote>
        <h2>Creative Typographic Hierarchies</h2>
        <p>
          Contrast is the foundation of hierarchy. Blending clean geometric sans-serif fonts (like Figtree) for labels with elegant italic serifs (like Cormorant) for copy highlights creates a premium, editorial feel that commands attention.
        </p>
      </>
    ),
  },
  {
    slug: "scaling-cloud-infrastructure",
    category: "Blog",
    title: "Scaling Cloud Infrastructure for Millions of Users",
    excerpt: "Best practices for container orchestration, zero-downtime deployments, and edge networking.",
    author: "DevOps Lead",
    date: "May 12, 2026",
    readMins: "11",
    cover: "/blog-laptop.webp",
    content: (
      <>
        <p className="blog-post__intro">
          Serving traffic to millions of concurrent users requires resilient, distributed systems that scale dynamically based on real-time load spikes.
        </p>
        <h2>Multi-Region Deployments and Edge Routing</h2>
        <p>
          Deploying backend workloads close to users via edge computing reduces latency and prevents single points of failure. Combining DNS routing with globally distributed server regions ensures consistent responsiveness.
        </p>
        <h2>Database Read Replicas & Cache Strategies</h2>
        <p>
          Databases are often the primary scale bottleneck. Implementing caching layers (like Redis) and dedicating read-only replicas for analytics queries shields main application databases from excess write-contention.
        </p>
      </>
    ),
  },
  {
    slug: "optimizing-web-performance",
    category: "Blog",
    title: "Optimizing Web Performance: The Core Web Vitals Audit",
    excerpt: "Deep dive into page load budgets, image encoding, CSS delivery, and JavaScript execution paths.",
    author: "Frontend Lead",
    date: "May 19, 2026",
    readMins: "6",
    cover: "/blog-ranking.webp",
    content: (
      <>
        <p className="blog-post__intro">
          A website's loading speed is its first impression. A load time delay of even 100ms can impact user retention, checkout conversion rates, and search ranking signals.
        </p>
        <h2>Largest Contentful Paint (LCP) Optimizations</h2>
        <p>
          LCP tracks when the primary page element renders. Optimizing this involves utilizing next-gen image compression formats (AVIF/WebP), using font-display swaps, and avoiding render-blocking JavaScript files.
        </p>
        <blockquote>
          “Speed is not a feature; speed is a fundamental design requirement of modern engineering.”
        </blockquote>
        <h2>Reducing Interaction to Next Paint (INP)</h2>
        <p>
          INP evaluates visual responsiveness after user actions. Ensuring quick INP requires keeping main-thread execution clear by offloading heavy math to web workers and deferring non-essential script execution.
        </p>
      </>
    ),
  },
];

// Generate static routes during build time for maximum speed
export async function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  // Not a hardcoded post → try a published case study from Supabase.
  if (!post) {
    const cs = await loadCaseStudy(slug);
    if (!cs) notFound();

    const paragraphs = String(cs.body || "")
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <>
        <Nav />
        <main className="page-blog-post">
          <article className="blog-post">
            <div className="blog-post__container">
              <Reveal className="blog-post__back-wrap">
                <a href="/blog" className="blog-post__back">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Back to Insights</span>
                </a>
              </Reveal>

              <div className="cs-article">
                <span className="cs-article__tag">Case Study</span>
                <h1 className="cs-article__title">{cs.title}</h1>
                {cs.cover_url && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img className="cs-article__cover" src={cs.cover_url} alt={cs.title || ""} />
                )}
                <div className="cs-article__body">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <FinalCTA />
        </main>
        <Footer />
        <StickyCTA />
        <ContactWidget />
      </>
    );
  }

  // Get related articles (exclude current, prefer visual posts)
  const related = POSTS.filter((p) => p.slug !== slug && p.cover).slice(0, 2);

  return (
    <>
      <Nav />
      <main className="page-blog-post">
        <article className="blog-post">
          <div className="blog-post__container">
            <Reveal className="blog-post__back-wrap">
              <a href="/blog" className="blog-post__back">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Back to Insights</span>
              </a>
            </Reveal>

            <Reveal className="blog-post__header">
              <div className="blog-post__meta">
                <span>{post.category}</span>
                <span className="blog-post__meta-dot">•</span>
                <span>{post.readMins} mins read</span>
                <span className="blog-post__meta-dot">•</span>
                <span>{post.date}</span>
              </div>
              <h1 className="blog-post__title">{post.title}</h1>
            </Reveal>

            {post.cover && (
              <Reveal className="blog-post__cover-wrap">
                <div
                  className="blog-post__cover"
                  style={{ backgroundImage: `url(${post.cover})` }}
                  role="img"
                  aria-label={post.title}
                />
              </Reveal>
            )}

            <Reveal className="blog-post__content-wrap">
              <div className="blog-post__content">
                {post.content}
              </div>
            </Reveal>

            {/* Related articles section */}
            <div className="blog-post__related-section">
              <div className="blog-post__related-divider" />
              <h3 className="blog-post__related-heading">Keep Reading</h3>
              <div className="blog-post__related-grid">
                {related.map((item) => (
                  <Reveal key={item.slug} as="article" className="blog-card-more">
                    {item.cover && (
                      <a href={`/blog/${item.slug}`} className="blog-card-more__cover-link">
                        <div
                          className="blog-card-more__cover"
                          style={{ backgroundImage: `url(${item.cover})` }}
                        />
                      </a>
                    )}
                    <div className="blog-card-more__body">
                      <div className="blog-card__meta-row">
                        <span className="blog-card__cat-read">
                          {item.category} • {item.readMins} mins read
                        </span>
                        <span className="blog-card__date">{item.date}</span>
                      </div>
                      <h4 className="blog-card-more__title">
                        <a href={`/blog/${item.slug}`}>{item.title}</a>
                      </h4>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

          </div>
        </article>

        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
      <ContactWidget />
    </>
  );
}
