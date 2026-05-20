"use client";

import { useState } from "react";
import AiChat from "./AiChat";
import ChatBackdrop from "./ChatBackdrop";

// Full-screen section below the hero. Two states:
//  - idle: centred heading + empty prompt box (the welcoming pose).
//  - chatting: heading collapses, the thread fills the section,
//    and the prompt box sticks to the bottom while messages
//    scroll inside the thread.
export default function AiPromptSection() {
  const [chatting, setChatting] = useState(false);

  return (
    <section
      className={`aiprompt ${chatting ? "is-chatting" : ""}`}
      aria-label="Start your brief"
    >
      <ChatBackdrop />
      <div className="container aiprompt__inner">
        {!chatting && (
          <>
            <span className="aiprompt__eyebrow">
              Tell us what you&apos;re building
            </span>
            <h2 className="aiprompt__title">
              Describe your project, in your own words.
            </h2>
            <p className="aiprompt__sub">
              A rough idea is enough — we&apos;ll shape it with you.
            </p>
          </>
        )}
        <div className="aiprompt__box">
          <AiChat onChattingChange={setChatting} />
        </div>
      </div>
    </section>
  );
}
