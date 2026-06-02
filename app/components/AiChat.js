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
  // One id per conversation so the backend can upsert a single lead row
  // as the visitor's details come in across turns.
  const sessionIdRef = useRef(null);
  if (!sessionIdRef.current) {
    sessionIdRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
  // Guards against the messy realities of an async send: a second submit
  // before the first resolves, and the component unmounting (navigation,
  // route change) while a request is still in flight.
  const pendingRef = useRef(false);
  const mountedRef = useRef(true);
  const abortRef = useRef(null);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

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

  const handleSend = async (message, image) => {
    const value = (message || "").trim();
    // Ignore empty sends and block a second submit while one is in flight.
    if ((!value && !image) || pendingRef.current) return;
    pendingRef.current = true;

    const outgoing = { from: "user", text: value, image: image || null };
    setError(null);
    setMessages((m) => [...m, outgoing]);
    setLoading(true);

    const conversation = [...messages, outgoing].map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text || (m.image ? "(the visitor attached an image)" : ""),
    }));

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await fetchAIReply(conversation, sessionIdRef.current, controller.signal);
      if (!mountedRef.current) return;
      const replyText =
        data.text || "Thanks, our team will be in touch with the next step.";
      setMessages((m) => [...m, { from: "bot", text: replyText, actions: data.actions || null }]);
    } catch (err) {
      // A cancelled request (unmount) is not an error worth surfacing.
      if (err?.name === "AbortError" || !mountedRef.current) return;
      const reply = botReply(value);
      setMessages((m) => [...m, { from: "bot", text: reply.text, actions: reply.actions || null }]);
      setError(
        "Our assistant is offline for a moment. Here's what I can share, and you can reach the team directly below."
      );
    } finally {
      pendingRef.current = false;
      abortRef.current = null;
      if (mountedRef.current) setLoading(false);
    }
  };

  return (
    <div className="aichat">
      {messages.length > 0 && (
        <div
          className="aichat__thread"
          ref={threadRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Conversation with the Revlient assistant"
        >
          {messages.map((m, i) => (
            <div key={i} className={`aichat__msg is-${m.from}`}>
              {m.image && (
                <img className="aichat__img" src={m.image} alt="Image you attached" />
              )}
              {m.text && <p>{m.text}</p>}
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
          {error && (
            <div className="aichat__error" role="alert">
              {error}
            </div>
          )}
        </div>
      )}
      <AiPromptBox
        onSend={handleSend}
        busy={loading}
        placeholder={
          messages.length
            ? "Reply…"
            : "Describe your project: goal, scope, timeline…"
        }
      />
    </div>
  );
}
