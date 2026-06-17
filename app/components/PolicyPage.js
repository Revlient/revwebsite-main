import { CONTACT_EMAIL } from "../lib/site";

/* Minimal long-form legal page shell. Renders a structured policy
   document — a centred column with a clear hierarchy of headings,
   lists and paragraphs. Content is data-driven so the same shell
   can serve Terms, Privacy, etc. */
export default function PolicyPage({ title, updated, intro, sections }) {
  return (
    <main className="policy">
      <div className="policy__inner">
        <header className="policy__head">
          <span className="policy__eyebrow">Legal</span>
          <h1 className="policy__title">{title}</h1>
          {updated && (
            <p className="policy__updated">Last updated: {updated}</p>
          )}
          {intro && <p className="policy__intro">{intro}</p>}
        </header>

        <div className="policy__body">
          {sections.map((section, i) => (
            <section key={i} className="policy__section">
              {section.heading && (
                <h2 className="policy__h2">
                  <span className="policy__num">{String(i + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
              )}
              {section.blocks.map((block, j) => {
                if (block.type === "p") {
                  return (
                    <p key={j} className="policy__p">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "h3") {
                  return (
                    <h3 key={j} className="policy__h3">
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul key={j} className="policy__list">
                      {block.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </section>
          ))}
        </div>

        <footer className="policy__foot">
          <p>
            Questions about this policy? Email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </footer>
      </div>
    </main>
  );
}
