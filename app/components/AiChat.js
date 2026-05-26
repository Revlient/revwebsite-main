"use client";

import { useEffect, useRef, useState } from "react";
import AiPromptBox from "./AiPromptBox";
import { botReply } from "../lib/chatbot";

// Safely converts basic markdown tags to styled HTML to avoid heavy dependencies
function parseMarkdown(text) {
  if (!text) return "";
  
  // Escape HTML characters to prevent XSS
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  // Code block: ```code```
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<pre class="aichat__code-block"><code>${code.trim()}</code></pre>`;
  });

  // Inline code: `code`
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headers: ### Header
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>");

  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic: *text*
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Bullet lists: - item or * item
  let inList = false;
  const lines = html.split("\n");
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.substring(2);
      let prefix = "";
      if (!inList) {
        inList = true;
        prefix = '<ul class="aichat__list">';
      }
      return `${prefix}<li>${content}</li>`;
    } else {
      let suffix = "";
      if (inList) {
        inList = false;
        suffix = "</ul>";
      }
      return `${suffix}${line}`;
    }
  });
  if (inList) {
    processedLines.push("</ul>");
  }
  html = processedLines.join("\n");

  // Convert standard newlines to <br /> (excluding existing block structures)
  html = html.replace(/\n/g, "<br />");
  
  // Cleanups
  html = html.replace(/<\/ul><br \/>/g, "</ul>");
  html = html.replace(/<ul class="aichat__list"><br \/>/g, '<ul class="aichat__list">');
  html = html.replace(/<\/li><br \/>/g, "</li>");
  
  return html;
}

// Inline chat for the prompt section. Communicates with /api/chat (Groq API backend)
// with a seamless fallback to the local rule-based bot.
export default function AiChat({ onChattingChange }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Bubble active state to parent section
  useEffect(() => {
    if (onChattingChange) onChattingChange(messages.length > 0);
  }, [messages.length, onChattingChange]);

  const handleSend = async (message) => {
    const value = (message || "").trim();
    if (!value) return;

    // Append user message immediately
    setMessages((m) => [...m, { from: "user", text: value }]);
    setIsTyping(true);

    try {
      // Build correct API payload representing user and assistant message history
      const history = [...messages, { from: "user", text: value }].map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      if (!data.text) {
        throw new Error("Invalid API response format");
      }

      setMessages((m) => [
        ...m,
        { from: "bot", text: data.text, actions: data.actions || null },
      ]);
    } catch (err) {
      console.warn("AI Chat API call failed, falling back to rules-based reply:", err);
      // Resilient local rule fallback
      const reply = botReply(value);
      setMessages((m) => [
        ...m,
        { from: "bot", text: reply.text, actions: reply.actions || null },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="aichat">
      {messages.length > 0 && (
        <div className="aichat__thread" ref={threadRef}>
          {messages.map((m, i) => (
            <div key={i} className={`aichat__msg is-${m.from}`}>
              {m.from === "bot" ? (
                <p dangerouslySetInnerHTML={{ __html: parseMarkdown(m.text) }} />
              ) : (
                <p>{m.text}</p>
              )}
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
          {isTyping && (
            <div className="aichat__msg is-bot is-typing">
              <div className="aichat__typing-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
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
