import AiChat from "./AiChat";
import ChatBackdrop from "./ChatBackdrop";

// Full-screen section below the hero. Background is a vertical blue
// light beam on the right that flows top-down into a floor flare;
// the dark prompt box reads as a panel on top.
export default function AiPromptSection() {
  return (
    <section className="aiprompt" aria-label="Start your brief">
      <ChatBackdrop />
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
