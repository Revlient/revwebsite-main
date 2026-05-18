import AiPromptBox from "./AiPromptBox";

// Sits directly below the hero. Background is the exact radial gradient
// from the supplied component's demo (as requested). The prompt box
// itself stays dark, so it reads as a panel on the colour field.
export default function AiPromptSection() {
  return (
    <section className="aiprompt" aria-label="Start your brief">
      <div className="container aiprompt__inner">
        <span className="aiprompt__eyebrow">Tell us what you&apos;re building</span>
        <h2 className="aiprompt__title">
          Describe your project, in your own words.
        </h2>
        <p className="aiprompt__sub">
          A rough idea is enough — we&apos;ll shape it with you.
        </p>
        <div className="aiprompt__box">
          <AiPromptBox />
        </div>
      </div>
    </section>
  );
}
