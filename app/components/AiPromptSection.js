import AiPromptBox from "./AiPromptBox";
import EtherealShadow from "./EtherealShadow";

// Sits directly below the hero. Background is the animated ethereal-shadow
// effect (warm/orange palette) on a dark base; the dark prompt box reads
// as a panel on top.
export default function AiPromptSection() {
  return (
    <section className="aiprompt" aria-label="Start your brief">
      <EtherealShadow
        className="aiprompt__bg"
        style={{ position: "absolute", inset: 0 }}
        color="rgba(245, 110, 20, 0.85)"
        animation={{ scale: 80, speed: 60 }}
        noise={{ opacity: 0.5, scale: 1.1 }}
      />
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
