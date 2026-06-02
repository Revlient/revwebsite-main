"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* Project-brief prompt box. Adapted from a shadcn/Tailwind/TS + framer-
   motion + Radix + lucide component to this project's stack: plain CSS,
   JS, inline SVG icons, native-title tooltips, a plain modal, CSS
   animation. The original injected a <style> at module load (crashes
   SSR) — that scrollbar CSS now lives in globals.css instead.

   Honest behaviour: there is no AI backend here (adding one would mean a
   new dependency + API key, which the brief forbids without asking), so
   this captures the brief and routes it to the real enquiry/WhatsApp —
   it does not fake AI replies. */

const Icon = {
  Clip: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M21 11.5 12.5 20a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L10 17.5a1.6 1.6 0 0 1-2.3-2.3l7.8-7.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5 3 3 0 0 0 2 5 3 3 0 0 0 5 1V4a2 2 0 0 0-2-0Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 1 5 3 3 0 0 1-2 5 3 3 0 0 1-5 1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="m9 9-3 3 3 3m6-6 3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  Mic: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Up: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M12 19V5m-6 6 6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Stop: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  ),
  Square: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export default function AiPromptBox({
  onSend,
  placeholder = "Describe your project: goal, scope, timeline…",
  busy = false,
}) {
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [recording, setRecording] = useState(false);
  const [secs, setSecs] = useState(0);
  const [mode, setMode] = useState(null); // search | think | canvas
  const taRef = useRef(null);
  const fileRef = useRef(null);
  const timerRef = useRef(null);

  const bars = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        h: Math.max(15, Math.round(Math.random() * 100)),
        d: (i * 0.05).toFixed(2),
        s: (0.5 + Math.random() * 0.5).toFixed(2),
      })),
    []
  );

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 220)}px`;
  }, [input]);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setSecs((s) => s + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(false);
    };
    const onPaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const it of items) {
        if (it.type.startsWith("image/")) {
          const f = it.getAsFile();
          if (f) {
            e.preventDefault();
            readImage(f);
            break;
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("paste", onPaste);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("paste", onPaste);
    };
  }, []);

  const readImage = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) return; // 10MB cap
    const r = new FileReader();
    r.onload = (e) => setPreview(e.target?.result || null);
    r.readAsDataURL(file);
  };

  const fmt = (n) =>
    `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

  const hasContent = input.trim() !== "" || !!preview;

  const submit = () => {
    if (!hasContent || busy) return;
    const prefix = mode ? `[${mode}] ` : "";
    const message = `${prefix}${input}`.trim();
    if (typeof onSend === "function") onSend(message, preview);
    setInput("");
    setPreview(null);
    setMode(null);
  };

  const toggle = (m) => setMode((cur) => (cur === m ? null : m));

  return (
    <div
      className={`aibox ${recording ? "is-rec" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        if (file && file.type.startsWith("image/")) readImage(file);
      }}
    >
      {preview && !recording && (
        <div className="aibox__files">
          <div className="aibox__thumb">
            <button
              type="button"
              className="aibox__thumb-view"
              onClick={() => setZoom(true)}
              aria-label="View attached image"
            >
              <img src={preview} alt="attachment preview" />
            </button>
            <button
              type="button"
              className="aibox__thumb-x"
              aria-label="Remove attached image"
              onClick={() => setPreview(null)}
            >
              <Icon.X />
            </button>
          </div>
        </div>
      )}

      {!recording ? (
        <textarea
          ref={taRef}
          className="aibox__ta"
          rows={1}
          value={input}
          aria-label="Describe your project"
          maxLength={2000}
          placeholder={
            mode === "search"
              ? "Search the web…"
              : mode === "think"
              ? "Think it through…"
              : mode === "canvas"
              ? "Sketch the idea…"
              : placeholder
          }
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
      ) : (
        <div className="aibox__rec">
          <div className="aibox__rec-time">
            <span className="dot" /> {fmt(secs)}
          </div>
          <div className="aibox__viz">
            {bars.map((b, i) => (
              <span
                key={i}
                style={{
                  height: `${b.h}%`,
                  animationDelay: `${b.d}s`,
                  animationDuration: `${b.s}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="aibox__row">
        <div className={`aibox__tools ${recording ? "is-hidden" : ""}`}>
          <button
            type="button"
            className="aibox__icon"
            title="Attach image"
            aria-label="Attach image"
            onClick={() => fileRef.current?.click()}
          >
            <Icon.Clip />
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files?.[0]) readImage(e.target.files[0]);
                e.target.value = "";
              }}
            />
          </button>

          <div className="aibox__pills">
            <button
              type="button"
              className={`aibox__pill ${mode === "search" ? "is-on s" : ""}`}
              onClick={() => toggle("search")}
              title="Search mode"
              aria-pressed={mode === "search"}
            >
              <span className="aibox-pill-icon">
                <Icon.Globe />
              </span>
              {mode === "search" && <span>Search</span>}
            </button>
            <i className="aibox__div" />
            <button
              type="button"
              className={`aibox__pill ${mode === "think" ? "is-on t" : ""}`}
              onClick={() => toggle("think")}
              title="Think mode"
              aria-pressed={mode === "think"}
            >
              <span className="aibox-pill-icon">
                <Icon.Brain />
              </span>
              {mode === "think" && <span>Think</span>}
            </button>
            <i className="aibox__div" />
            <button
              type="button"
              className={`aibox__pill ${mode === "canvas" ? "is-on c" : ""}`}
              onClick={() => toggle("canvas")}
              title="Canvas mode"
              aria-pressed={mode === "canvas"}
            >
              <span className="aibox-pill-icon">
                <Icon.Code />
              </span>
              {mode === "canvas" && <span>Canvas</span>}
            </button>
          </div>
        </div>

        <button
          type="button"
          className={`aibox__send ${hasContent ? "is-go" : ""} ${
            recording ? "is-rec" : ""
          }`}
          disabled={busy}
          aria-busy={busy}
          title={
            busy
              ? "Waiting for a reply…"
              : recording
              ? "Stop recording"
              : hasContent
              ? "Send"
              : "Voice message"
          }
          aria-label={
            busy
              ? "Waiting for a reply"
              : recording
              ? "Stop recording"
              : hasContent
              ? "Send"
              : "Record"
          }
          onClick={() => {
            if (recording) {
              setRecording(false);
              setSecs(0);
            } else if (hasContent) {
              submit();
            } else {
              setSecs(0);
              setRecording(true);
            }
          }}
        >
          {recording ? (
            <Icon.Stop />
          ) : hasContent ? (
            <Icon.Up />
          ) : (
            <Icon.Mic />
          )}
        </button>
      </div>


      {zoom && preview && (
        <div
          className="aibox__modal"
          role="dialog"
          aria-label="Image preview"
          onClick={() => setZoom(false)}
        >
          <img src={preview} alt="attachment full preview" />
          <button
            type="button"
            className="aibox__modal-x"
            aria-label="Close preview"
            onClick={() => setZoom(false)}
          >
            <Icon.X />
          </button>
        </div>
      )}
    </div>
  );
}
