"use client";

import Reveal from "./Reveal";

/* /blog landing — hero + grid of post cards. Vanilla JS + plain CSS,
   inline SVGs in place of lucide-react.

   PROOF RULE: every post below is a clearly-flagged TODO placeholder.
   Replace title / excerpt / author / date / coverHue with the real
   Revlient post data before launch — and add /blog/[slug] routes
   to make the 'Read article →' link actually go somewhere. */

const POSTS = [
  {
    slug: "todo-post-01",
    category: "Studio Notes",
    title: "TODO · What 'shipping' actually means at Revlient",
    excerpt:
      "Placeholder excerpt — replace with the real post intro. A short paragraph that pulls the reader into the piece before they click through.",
    author: "TODO: author",
    date: "TODO: date",
    readMins: "—",
    coverHue: 0, // brand blue
    featured: true,
  },
  {
    slug: "todo-post-02",
    category: "Engineering",
    title: "TODO · The case for a custom CMS over an off-the-shelf one",
    excerpt:
      "Placeholder excerpt — when the headless option wins, when the legacy option wins, and the third path most teams overlook.",
    author: "TODO: author",
    date: "TODO: date",
    readMins: "—",
    coverHue: 1,
  },
  {
    slug: "todo-post-03",
    category: "Design",
    title: "TODO · Designing for a sceptical buyer",
    excerpt:
      "Placeholder excerpt — how the visual decisions inside a homepage either build or burn trust in the first five seconds.",
    author: "TODO: author",
    date: "TODO: date",
    readMins: "—",
    coverHue: 2,
  },
  {
    slug: "todo-post-04",
    category: "AI",
    title: "TODO · Practical AI inside an ERP — what we actually shipped",
    excerpt:
      "Placeholder excerpt — a walkthrough of the AI assistant, the matchmaker and the auto-quotation engine that ship with Revlient OS.",
    author: "TODO: author",
    date: "TODO: date",
    readMins: "—",
    coverHue: 3,
  },
  {
    slug: "todo-post-05",
    category: "Process",
    title: "TODO · Six stages, four pillars, one studio",
    excerpt:
      "Placeholder excerpt — how the discovery → strategy → design → development → QA → launch loop holds up under real client pressure.",
    author: "TODO: author",
    date: "TODO: date",
    readMins: "—",
    coverHue: 4,
  },
  {
    slug: "todo-post-06",
    category: "Client Story",
    title: "TODO · Inside the Study2India rebuild",
    excerpt:
      "Placeholder excerpt — what the team was selling before, what we shipped, and what changed for the counsellors on day one.",
    author: "TODO: author",
    date: "TODO: date",
    readMins: "—",
    coverHue: 5,
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

function PostCover({ hue, featured }) {
  // 6 deterministic gradient flavours, all sitting in the brand blue
  // → purple range so the grid feels cohesive.
  const flavours = [
    "linear-gradient(135deg, #2b5fff 0%, #1c2a6b 100%)",
    "linear-gradient(135deg, #4a78ff 0%, #3730a3 100%)",
    "linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)",
    "linear-gradient(135deg, #2b5fff 0%, #ffffff 100%)",
    "linear-gradient(135deg, #1e3a5f 0%, #2b5fff 100%)",
    "linear-gradient(135deg, #ffffff 0%, #4a78ff 100%)",
  ];
  return (
    <div
      className={`blog-card__cover ${featured ? "blog-card__cover--lg" : ""}`}
      style={{ backgroundImage: flavours[hue % flavours.length] }}
    >
      <span className="blog-card__cover-grid" />
      <span className="blog-card__cover-orb" />
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <Reveal as="article" className={`blog-card ${post.featured ? "blog-card--featured" : ""}`}>
      <PostCover hue={post.coverHue} featured={post.featured} />
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
  const featured = POSTS.filter((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <div className="blog">
      <header className="blog__hero">
        <span className="blog__hero-spot" aria-hidden="true" />
        <Reveal className="blog__hero-inner">
          <span className="blog__pill">
            <span className="blog__pill-dot" />
            Field notes
          </span>
          <h1 className="blog__title">
            Notes from the studio.
          </h1>
          <p className="blog__sub">
            Long-form pieces on craft, code and the systems we ship —
            written by the team that built them.
          </p>
        </Reveal>
      </header>

      <section className="blog__list">
        {featured.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}

        <div className="blog__grid">
          {rest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
