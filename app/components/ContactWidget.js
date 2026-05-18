"use client";

import { useEffect, useRef, useState } from "react";
import {
  WHATSAPP_URL,
  PHONE_TEL,
  PHONE_DISPLAY,
  CONTACT_EMAIL,
  CTA_HREF,
} from "../lib/site";

/* Persistent right-side contact widget.
   - A always-visible launcher that expands ("drop down") into
     WhatsApp + Call actions.
   - A self-contained, rule-based chat bot (no external SDK, no API key,
     no new dependency — keyword matching with canned answers that route
     to the real channels). Honest: it's an assistant, not an LLM. */

// Bot knowledge. Keep answers honest; route specifics to a human.
// TODO: tighten copy / numbers once the team confirms real details.
const GREETING =
  "Hi — I'm the Revlient assistant. What can I point you to?";

const QUICK_REPLIES = [
  "Start a project",
  "What do you do?",
  "Pricing & timeline",
  "Talk to a human",
];

function botReply(input) {
  const q = input.toLowerCase();
  if (/(price|pricing|cost|budget|quote|timeline|how long)/.test(q)) {
    return {
      text: "Every project is scoped to its goals, so we don't list flat prices. Share a short brief and we'll come back with a clear estimate and timeline.",
      actions: [{ label: "Start a project", href: CTA_HREF }],
    };
  }
  if (/(human|person|call|whatsapp|talk|contact|speak|sales)/.test(q)) {
    return {
      text: "Happy to connect you with the team directly:",
      actions: [
        { label: "WhatsApp us", href: WHATSAPP_URL, external: true },
        { label: `Call ${PHONE_DISPLAY}`, href: `tel:${PHONE_TEL}` },
        { label: `Email ${CONTACT_EMAIL}`, href: `mailto:${CONTACT_EMAIL}` },
      ],
    };
  }
  if (/(what|do you|service|offer|build|design|app|website|3d)/.test(q)) {
    return {
      text: "Revlient is a creative studio: 3D-grade websites and web/app development, plus CRM and automation through our systems division. The Services section has the detail.",
      actions: [
        { label: "See services", href: "#services" },
        { label: "See our work", href: "#work" },
      ],
    };
  }
  if (/(work|portfolio|case|example|project you)/.test(q)) {
    return {
      text: "There are three short case studies (problem → built → result) in the Work section.",
      actions: [{ label: "Jump to Work", href: "#work" }],
    };
  }
  if (/(start|project|hire|engage|brief|begin|quote me)/.test(q)) {
    return {
      text: "Great — tell us the goal, budget range and a short brief and we'll take it from there.",
      actions: [
        { label: "Start a project", href: CTA_HREF },
        { label: "WhatsApp us", href: WHATSAPP_URL, external: true },
      ],
    };
  }
  if (/(hi|hello|hey|yo|good)/.test(q)) {
    return { text: "Hello! Ask me about what we do, pricing, or starting a project — or tap a human channel below." };
  }
  return {
    text: "I'll point you to the team for that one:",
    actions: [
      { label: "Start a project", href: CTA_HREF },
      { label: "WhatsApp us", href: WHATSAPP_URL, external: true },
    ],
  };
}

const IconChat = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 3c5 0 9 3.6 9 8s-4 8-9 8a10 10 0 0 1-3.3-.55L4 20l1.2-3.2A7.3 7.3 0 0 1 3 11c0-4.4 4-8 9-8Zm-3.5 7a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm3.5 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm3.5 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z"
    />
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
const IconWhatsApp = () => (
  <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16 3a13 13 0 0 0-11.1 19.7L3 29l6.5-1.7A13 13 0 1 0 16 3Zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.8 1 1-3.7-.300-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2s-.8 1-.97 1.2c-.18.2-.36.2-.66.07a8.6 8.6 0 0 1-2.5-1.55 9.6 9.6 0 0 1-1.77-2.2c-.18-.32 0-.49.14-.65.14-.14.3-.36.45-.54.15-.18.2-.31.3-.51.1-.21.05-.39-.02-.54-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.39-.27.32-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.27.5 1.71.64.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z"
    />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true">
    <path
      fill="currentColor"
      d="M6.6 3h3.1l1.6 4-2 1.4a13 13 0 0 0 6.3 6.3l1.4-2 4 1.6v3.1a1.9 1.9 0 0 1-2 1.9A16.9 16.9 0 0 1 4.7 5a1.9 1.9 0 0 1 1.9-2Z"
    />
  </svg>
);

export default function ContactWidget() {
  const [open, setOpen] = useState(false); // speed-dial expanded
  const [chat, setChat] = useState(false); // chat panel open
  const [messages, setMessages] = useState([
    { from: "bot", text: GREETING, actions: null },
  ]);
  const [draft, setDraft] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setChat(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, chat]);

  const send = (text) => {
    const value = text.trim();
    if (!value) return;
    const reply = botReply(value);
    setMessages((m) => [
      ...m,
      { from: "user", text: value },
      { from: "bot", text: reply.text, actions: reply.actions || null },
    ]);
    setDraft("");
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
                        rel={
                          a.external ? "noopener noreferrer" : undefined
                        }
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

      <div className={`cwidget__actions ${open ? "is-open" : ""}`}>
        <a
          className="cwidget__action is-wa"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
          tabIndex={open ? 0 : -1}
        >
          <IconWhatsApp />
          <span>WhatsApp</span>
        </a>
        <a
          className="cwidget__action is-call"
          href={`tel:${PHONE_TEL}`}
          aria-label={`Call ${PHONE_DISPLAY}`}
          tabIndex={open ? 0 : -1}
        >
          <IconPhone />
          <span>Call us</span>
        </a>
        <button
          type="button"
          className="cwidget__action is-chat"
          aria-label="Open chat"
          tabIndex={open ? 0 : -1}
          onClick={() => {
            setChat(true);
            setOpen(false);
          }}
        >
          <IconChat />
          <span>Chat</span>
        </button>
      </div>

      <button
        type="button"
        className={`cwidget__fab ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Contact us"}
        onClick={() => {
          if (chat) {
            setChat(false);
            return;
          }
          setOpen((v) => !v);
        }}
      >
        {open ? <IconClose /> : <IconChat />}
      </button>
    </div>
  );
}
