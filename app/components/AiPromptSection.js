import AiChat from "./AiChat";
import NeuralVortexBackground from "./NeuralVortexBackground";

// Full-screen section below the hero. Background is the interactive
// neural-vortex WebGL shader; the dark prompt box reads as a panel
// on top.
export default function AiPromptSection() {
  return (
    <section className="aiprompt" aria-label="Start your brief">
      <NeuralVortexBackground
        className="aiprompt__bg"
        style={{ position: "absolute", inset: 0 }}
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
          <AiChat />
        </div>
      </div>
    </section>
  );
}
