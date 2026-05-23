import Reveal from "./Reveal";
import WorkCaseHero from "./WorkCaseHero";

/* Case studies tell a short story: problem → what we built → result.
   The homepage carries the summary; deeper immersive storytelling belongs
   on the opt-in detail pages (FOLLOW-ON: app/work/[slug]).

   PROOF RULES: every client name is a placeholder and every metric value
   is left as an explicit TODO. Never ship invented numbers — fabricated
   proof backfires badly with the skeptical buyer this site targets. */
const CASES = [
  {
    slug: "studyabroad-revamp",
    tag: "Web · Brand",
    client: "TODO: real client name", // TODO
    title: "A study-abroad consultancy that finally looks as trusted as it is",
    problem:
      "A respected consultancy was losing students to slicker competitors before the first call. The site felt dated and buried the proof.",
    build:
      "A rebuilt experience with a clear country-by-country path, credibility surfaced early, and a low-friction enquiry flow tuned for parents and students alike.",
    result:
      "A site the team is proud to send cold — qualified enquiries up and the sales call starting from trust, not doubt.",
    metrics: [
      { label: "Qualified enquiries", note: "post-launch lift" },
      { label: "Time to first enquiry", note: "vs. old site" },
    ],
    // The card carries a live-site preview instead of metric stubs,
    // and clicking the card opens the deployed site in a new tab.
    thumb: true,
    liveUrl: "https://study2india.com", // TODO: confirm real production URL
  },
  {
    slug: "ecommerce-cms",
    tag: "E-commerce · CMS",
    client: "TODO: real client name", // TODO
    title: "An e-commerce CMS the merchandising team runs without us",
    problem:
      "Every catalogue change meant a developer ticket and a two-day wait. Campaigns missed their windows.",
    build:
      "A tailored headless CMS and storefront: structured products, scheduled drops, and a publishing flow the non-technical team owns end to end.",
    result:
      "The team ships campaigns the same day they plan them — and the developer queue stopped being the bottleneck.",
    metrics: [
      { label: "Time to publish a change", note: "days → minutes" },
      { label: "Campaigns shipped / quarter", note: "vs. prior year" },
    ],
  },
  {
    slug: "agency-crm",
    tag: "Product · CRM",
    client: "TODO: real client name", // TODO
    title: "A role-based agency CRM people actually open",
    problem:
      "An agency ran on spreadsheets and memory. Handoffs dropped, and nobody could answer 'what's the status?' without a meeting.",
    build:
      "A role-based CRM mapped to how the agency really works — the right view per role, automated handoffs, and a pipeline that stays current on its own.",
    result:
      "One source of truth the whole agency trusts, with status answerable in a glance instead of a stand-up.",
    metrics: [
      { label: "Daily active use", note: "team adoption" },
      { label: "Status meetings / week", note: "reduction" },
    ],
  },
];

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Selected work</span>
            <h2>Real problems. Real systems. Shipped.</h2>
            <p>
              A gallery proves you can decorate. A story proves you can solve.
              Here is the short version of three.
            </p>
          </div>
        </Reveal>

        <div className="work-list">
          {CASES.map((c) => {
            const inner = (
              <>
                <div className="case__body">
                  <span className="case__tag">{c.tag}</span>
                  {/* TODO: replace placeholder client name once cleared. */}
                  <p className="case__client">Client: {c.client}</p>
                  <h3>{c.title}</h3>
                  <dl className="case__story">
                    <div>
                      <dt>Problem</dt>
                      <dd>{c.problem}</dd>
                    </div>
                    <div>
                      <dt>Built</dt>
                      <dd>{c.build}</dd>
                    </div>
                    <div>
                      <dt>Result</dt>
                      <dd>{c.result}</dd>
                    </div>
                  </dl>
                </div>

                {c.thumb ? (
                  <div className="case__thumb">
                    <WorkCaseHero />
                    {c.liveUrl && (
                      <span className="case__thumb-launch" aria-hidden="true">
                        Visit live site →
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="case__metrics">
                    {c.metrics.map((m) => (
                      <div className="metric" key={m.label}>
                        {/* Value intentionally NOT a number — real, verified
                            figures must be filled in before launch. */}
                        <div className="metric__value">—</div>
                        <div className="metric__label">{m.label}</div>
                        <span className="metric__todo">
                          TODO: {m.note}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );

            // External link wraps the whole card when a live site exists.
            const card = (
              <Reveal
                className={`case ${c.liveUrl ? "case--clickable" : ""}`.trim()}
              >
                {inner}
              </Reveal>
            );
            return c.liveUrl ? (
              <a
                key={c.slug}
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-link"
              >
                {card}
              </a>
            ) : (
              <div key={c.slug}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
