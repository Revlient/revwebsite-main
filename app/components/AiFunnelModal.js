"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { fetchAIReply } from "../lib/ai";
import { botReply } from "../lib/chatbot";

/* "Figure it out with AI" — a neumorphic chat modal launched from the hero.
   It is a lead-gen funnel: the visitor describes what they want to build and
   the Revlient assistant (Groq-backed via /api/chat, rule-based fallback)
   runs the "Lead Data Collection" phase. The backend upserts a single lead
   row per session, so all we do here is keep one stable sessionId and stream
   the conversation. Styling lives in globals.css under `.aifunnel`. */

const GREETING =
  "Hi — I'm Rev, Revlient's AI. Tell me what you're trying to build and I'll map the right path, then line you up with the team. What's the project?";

const QUICK_REPLIES = [
  "Build a website",
  "Build an app",
  "CRM / automation",
  "Get a quote",
];

const EXIT_MS = 360; // keep in sync with the close transition in globals.css

export default function AiFunnelModal({ open, onClose }) {
  // `render` keeps the node mounted through the exit animation; `visible`
  // drives the .is-open class one tick later so the enter transition runs.
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);

  const [messages, setMessages] = useState([
    { from: "bot", text: GREETING, seed: true },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const threadRef = useRef(null);
  const inputRef = useRef(null);
  const cardRef = useRef(null);
  const exitTimer = useRef(null);

  // One id per opened conversation so the backend upserts a single lead row.
  const sessionIdRef = useRef(null);
  if (!sessionIdRef.current) {
    sessionIdRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  // Async-send guards: block a double submit and a reply landing after close.
  const pendingRef = useRef(false);
  const mountedRef = useRef(true);
  const abortRef = useRef(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // Mount → next frame add .is-open (enter). Close → drop it, unmount after exit.
  useEffect(() => {
    clearTimeout(exitTimer.current);
    if (open) {
      setRender(true);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    exitTimer.current = setTimeout(() => setRender(false), EXIT_MS);
    return () => clearTimeout(exitTimer.current);
  }, [open]);

  // Lock page scroll, close on Escape, focus the input while open.
  useEffect(() => {
    if (!render) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lenis hijacks wheel/touch on the whole document, so body overflow alone
    // won't freeze the page. Pause it while the modal is open; the chat thread
    // opts back into native scrolling via its data-lenis-prevent attribute.
    const lenis = typeof window !== "undefined" ? window.lenis : null;
    lenis?.stop();
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    const focusId = setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusId);
    };
  }, [render, onClose]);

  // Keep the thread pinned to the latest message.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (raw) => {
    const value = (raw ?? input).trim();
    if (!value || pendingRef.current) return;
    pendingRef.current = true;

    const outgoing = { from: "user", text: value };
    setError(null);
    setInput("");
    setMessages((m) => [...m, outgoing]);
    setLoading(true);

    // Build the API conversation from the real exchange (skip the seeded
    // greeting so the assistant opens on the visitor's first message).
    const conversation = [...messages, outgoing]
      .filter((m) => !m.seed)
      .map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text || "",
      }));

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await fetchAIReply(
        conversation,
        sessionIdRef.current,
        controller.signal
      );
      if (!mountedRef.current) return;
      const replyText =
        data.text || "Thanks — our team will be in touch with the next step.";
      setMessages((m) => [
        ...m,
        { from: "bot", text: replyText, actions: data.actions || null },
      ]);
    } catch (err) {
      if (err?.name === "AbortError" || !mountedRef.current) return;
      const reply = botReply(value);
      setMessages((m) => [
        ...m,
        { from: "bot", text: reply.text, actions: reply.actions || null },
      ]);
      setError(
        "The assistant is offline for a moment — here's what I can share, and the team is one tap away below."
      );
    } finally {
      pendingRef.current = false;
      abortRef.current = null;
      if (mountedRef.current) setLoading(false);
    }
  };

  if (!render) return null;

  const showQuickReplies =
    !loading && messages.filter((m) => m.from === "user").length === 0;

  return createPortal(
    <div
      className={`aifunnel ${visible ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Figure it out with Revlient AI"
    >
      <div className="aifunnel__overlay" onClick={() => onClose?.()} />

      <div className="aifunnel__card" ref={cardRef}>
        <header className="aifunnel__head">
          <div className="aifunnel__brand">
            <span className="aifunnel__title">Figure it out with AI</span>
          </div>
          <button
            type="button"
            className="aifunnel__close"
            onClick={() => onClose?.()}
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6 6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div
          className="aifunnel__thread"
          ref={threadRef}
          data-lenis-prevent
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((m, i) => (
            <div key={i} className={`aifunnel__msg is-${m.from}`}>
              {m.text && <p>{m.text}</p>}
              {m.actions && (
                <div className="aifunnel__actions">
                  {m.actions.map((a) => (
                    <a
                      key={a.label}
                      href={a.href}
                      className="aifunnel__chip"
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
            <div className="aifunnel__msg is-bot">
              <p className="aifunnel__typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </p>
            </div>
          )}

          {error && (
            <div className="aifunnel__notice" role="alert">
              {error}
            </div>
          )}
        </div>

        {showQuickReplies && (
          <div className="aifunnel__quick">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                className="aifunnel__quick-pill"
                onClick={() => send(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          className="aifunnel__inputbar"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            ref={inputRef}
            className="aifunnel__input"
            type="text"
            value={input}
            maxLength={2000}
            placeholder="Type your message…"
            aria-label="Type your message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="aifunnel__send"
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 19V5m-6 6 6-6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        <p className="aifunnel__legal">
          We use your details only to prepare your free consultation.
        </p>
      </div>
    </div>,
    document.body
  );
}
