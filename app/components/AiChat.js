"use client";

import { useEffect, useRef, useState } from "react";
import AiPromptBox from "./AiPromptBox";
import { botReply } from "../lib/chatbot";
import { fetchAIReply } from "../lib/ai";

// Inline chat for the prompt section. The conversation happens right
// here — the message is answered in place, it does not open the
// floating contact widget. Uses the Groq-backed assistant endpoint with
// a local fallback when necessary.
export default function AiChat({ onChattingChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Bubble the active state up so the section can switch into its
  // full-screen chat layout (prompt pinned to the bottom, thread
  // expands to fill, messages scroll inside the thread).
  useEffect(() => {
    if (onChattingChange) onChattingChange(messages.length > 0);
  }, [messages.length, onChattingChange]);

  const handleSend = async (message) => {
    const value = (message || "").trim();
    if (!value) return;
    const outgoing = { from: "user", text: value };
    setError(null);
    setMessages((m) => [...m, outgoing]);
    setLoading(true);

    const conversation = [...messages, outgoing].map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));

    try {
      const data = await fetchAIReply(conversation);
      const replyText = data.text || "Thanks — our team will be in touch with the next step.";
      setMessages((m) => [...m, { from: "bot", text: replyText, actions: data.actions || null }]);
    } catch (err) {
      const reply = botReply(value);
      setMessages((m) => [...m, { from: "bot", text: reply.text, actions: reply.actions || null }]);
      setError("AI assistant unavailable, using fallback response.");
    } finally {
      setLoading(false);
    }
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
          {loading && (
            <div className="aichat__msg is-bot">
              <p>Thinking…</p>
            </div>
          )}
          {error && <div className="aichat__error">{error}</div>}
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
