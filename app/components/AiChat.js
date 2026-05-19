"use client";

import { useEffect, useRef, useState } from "react";
import AiPromptBox from "./AiPromptBox";
import { botReply } from "../lib/chatbot";

// Inline chat for the prompt section. The conversation happens right
// here — the message is answered in place, it does not open the
// floating contact widget. Same shared rule-based bot.
export default function AiChat() {
  const [messages, setMessages] = useState([]);
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (message) => {
    const value = (message || "").trim();
    if (!value) return;
    const reply = botReply(value);
    setMessages((m) => [
      ...m,
      { from: "user", text: value },
      { from: "bot", text: reply.text, actions: reply.actions || null },
    ]);
  };

  return (
    <div className="aichat">
      {messages.length > 0 && (
        <div className="aichat__thread" ref={threadRef}>
          {messages.map((m, i) => (
            <div key={i} className={`aichat__msg is-${m.from}`}>
              <p>{m.text}</p>
              {m.actions && (
                <div className="aichat__actions">
                  {m.actions.map((a) => (
                    <a
                      key={a.label}
                      href={a.href}
                      className="aichat__chip"
                      target={a.external ? "_blank" : undefined}
                      rel={a.external ? "noopener noreferrer" : undefined}
                    >
                      {a.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <AiPromptBox
        onSend={handleSend}
        placeholder={
          messages.length
            ? "Reply…"
            : "Describe your project — goal, scope, timeline…"
        }
      />
    </div>
  );
}
