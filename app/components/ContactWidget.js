"use client";

import { useEffect, useRef, useState } from "react";
import { GREETING, QUICK_REPLIES, botReply } from "../lib/chatbot";
import { fetchAIReply } from "../lib/ai";

/* Persistent right-side chat widget — instant chatbot only. The
   FAB toggles the chat panel directly (no speed-dial). Uses the
   Groq-backed AI assistant with a local fallback if it's down. */

const IconSparkle = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="cwidget__sparkle-icon" aria-hidden="true">
    <path d="M12 3c.13 4.28 2.72 6.87 7 7-4.28.13-6.87 2.72-7 7-.13-4.28-2.72-6.87-7-7 4.28-.13 6.87-2.72 7-7Z" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function ContactWidget() {
  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: GREETING, actions: null },
  ]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setChat(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, chat]);

  const send = async (text) => {
    const value = text.trim();
    if (!value) return;
    const outgoing = { from: "user", text: value };
    setMessages((m) => [...m, outgoing]);
    setDraft("");
    setLoading(true);
    setError(null);

    const conversation = [...messages, outgoing].map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));

    try {
      const data = await fetchAIReply(conversation);
      const replyText = data.text || "Thanks — our team will follow up shortly.";

      setMessages((m) => [
        ...m,
        { from: "bot", text: replyText, actions: data.actions || null },
      ]);
    } catch (err) {
      const reply = botReply(value);
      setMessages((m) => [
        ...m,
        { from: "bot", text: reply.text, actions: reply.actions || null },
      ]);
      setError("AI assistant unavailable, using fallback response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cwidget">
      {chat && (
        <div
          className="chatbot"
          role="dialog"
          aria-label="Chat with Revlient"
        >
          <div className="chatbot__head">
            <div>
              <strong>Revlient assistant</strong>
              <span>Typically replies in a few hours</span>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setChat(false)}
            >
              <IconClose />
            </button>
          </div>

          <div className="chatbot__body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__msg is-${m.from}`}>
                <p>{m.text}</p>
                {m.actions && (
                  <div className="chatbot__actions">
                    {m.actions.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        className="chatbot__chip"
                        target={a.external ? "_blank" : undefined}
                        rel={a.external ? "noopener noreferrer" : undefined}
                        onClick={() => {
                          if (a.href.startsWith("#")) setChat(false);
                        }}
                      >
                        {a.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="chatbot__msg is-bot">
                <p>Typing…</p>
              </div>
            )}

            {messages.length === 1 && (
              <div className="chatbot__quick">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {error && <div className="chatbot__error">{error}</div>}
          </div>

          <form
            className="chatbot__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message"
            />
            <button type="submit" aria-label="Send">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M4 4l16 8-16 8 3.4-8L4 4Z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`cwidget__fab ${chat ? "is-open" : "has-video"}`}
        aria-expanded={chat}
        aria-label={chat ? "Close chat" : "Open chat"}
        onClick={() => setChat((v) => !v)}
      >
        {chat ? <IconClose /> : (
          <div className="cwidget__video-container">
            <video
              ref={(el) => {
                if (el) el.playbackRate = 0.55;
              }}
              src="/ai_circle.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="cwidget__video"
            />
            <div className="cwidget__sparkle-overlay">
              <IconSparkle />
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
