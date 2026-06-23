"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useDashboard } from "../DashboardContext";

// WhatsApp conversations view. The password lives in the parent
// layout's context; this page just consumes authedKey and streams
// updates via /api/conversations/stream.

function relativeTime(iso) {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 5) return "just now";
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  try { return new Date(iso).toLocaleDateString(); } catch { return ""; }
}

function previewOf(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return "No messages";
  const last = messages[messages.length - 1];
  const text = String(last?.content ?? "").trim();
  if (!text) return "(empty message)";
  return text.length > 80 ? `${text.slice(0, 80)}…` : text;
}

export default function ConversationsPage() {
  const { authedKey, signOut } = useDashboard();
  const [conversations, setConversations] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [live, setLive] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [togglingPause, setTogglingPause] = useState(false);
  const esRef = useRef(null);
  const bodyRef = useRef(null);

  const selected = useMemo(
    () => conversations.find((c) => c.phone === selectedPhone) || null,
    [conversations, selectedPhone]
  );

  const applyList = (list) => {
    if (!Array.isArray(list)) return;
    setConversations(list);
    setSelectedPhone((current) => {
      if (current && list.some((c) => c.phone === current)) return current;
      return list.length > 0 ? list[0].phone : null;
    });
  };

  // Initial fetch
  useEffect(() => {
    if (!authedKey) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/conversations", {
          headers: { "x-dashboard-key": authedKey },
          cache: "no-store",
        });
        if (cancelled) return;
        if (res.status === 401) { signOut(); return; }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        applyList(data?.conversations);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [authedKey, signOut]);

  // SSE
  useEffect(() => {
    if (!authedKey) return;
    let es;
    let reconnectTimer;
    const connect = () => {
      es = new EventSource(
        `/api/conversations/stream?key=${encodeURIComponent(authedKey)}`
      );
      esRef.current = es;
      es.onopen = () => { setLive(true); setError(null); };
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.error) { setError(data.error); return; }
          applyList(data.conversations);
        } catch {}
      };
      es.onerror = () => {
        setLive(false);
        es.close();
        reconnectTimer = setTimeout(connect, 4000);
      };
    };
    connect();
    return () => {
      clearTimeout(reconnectTimer);
      es?.close();
      esRef.current = null;
      setLive(false);
    };
  }, [authedKey]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [selected?.phone, selected?.messages?.length]);

  const messages = Array.isArray(selected?.messages) ? selected.messages : [];
  const botPaused = Boolean(selected?.bot_paused);

  const togglePause = async () => {
    if (!selected) return;
    setTogglingPause(true);
    setError(null);
    try {
      const res = await fetch(`/api/conversations/${encodeURIComponent(selected.phone)}`, {
        method: "PATCH",
        headers: {
          "x-dashboard-key": authedKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bot_paused: !botPaused }),
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Failed (${res.status})`);
      }
    } catch (err) {
      setError(err?.message || "Toggle failed");
    } finally {
      setTogglingPause(false);
    }
  };

  const sendMessage = async (e) => {
    e?.preventDefault?.();
    if (!selected || !draft.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/conversations/${encodeURIComponent(selected.phone)}/send`, {
        method: "POST",
        headers: {
          "x-dashboard-key": authedKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: draft.trim() }),
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Send failed (${res.status})`);
      }
      setDraft("");
    } catch (err) {
      setError(err?.message || "Send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <header className="dash-bar">
        <div className="dash-bar__title">
          Conversations
          <span className="dash-bar__count">{conversations.length}</span>
          <span className={`dash-bar__live ${live ? "is-live" : ""}`} title={live ? "Live" : "Connecting…"} />
        </div>
      </header>

      {error && <div className="dash-error">{error}</div>}

      <div className="dash-grid">
        <aside className="dash-list" aria-label="Conversations">
          {conversations.length === 0 && !loading && (
            <div className="dash-list__empty">No conversations yet.</div>
          )}
          {conversations.map((c) => {
            const isActive = c.phone === selectedPhone;
            return (
              <button
                key={c.phone}
                type="button"
                className={`dash-list__item ${isActive ? "is-active" : ""}`}
                onClick={() => setSelectedPhone(c.phone)}
              >
                <div className="dash-list__row">
                  <span className="dash-list__phone">{c.phone}</span>
                  <span className="dash-list__time">{relativeTime(c.updated_at)}</span>
                </div>
                <div className="dash-list__preview">
                  {c.bot_paused && <span className="dash-list__tag">YOU</span>}
                  {previewOf(c.messages)}
                </div>
              </button>
            );
          })}
        </aside>

        <section className="dash-thread" aria-label="Selected conversation">
          {selected ? (
            <>
              <header className="dash-thread__head">
                <div>
                  <div className="dash-thread__phone">{selected.phone}</div>
                  <div className="dash-thread__meta">
                    {messages.length} message{messages.length === 1 ? "" : "s"}
                    {selected.updated_at && (
                      <>
                        <span aria-hidden="true"> · </span>
                        <span>Updated {relativeTime(selected.updated_at)}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className={`dash-bar__btn ${botPaused ? "" : "dash-bar__btn--ghost"}`}
                  onClick={togglePause}
                  disabled={togglingPause}
                  title={botPaused ? "Resume Aleena" : "Pause Aleena and reply manually"}
                >
                  {togglingPause ? "…" : botPaused ? "Hand to bot" : "Take over"}
                </button>
              </header>

              {botPaused && (
                <div className="dash-thread__banner">
                  Bot paused — you&apos;re replying manually. Customer sees your messages normally.
                </div>
              )}

              <div className="dash-thread__body" ref={bodyRef}>
                {messages.length === 0 && (
                  <div className="dash-thread__empty">
                    This conversation has no messages.
                  </div>
                )}
                {messages.map((m, i) => {
                  const role = m?.role === "user" ? "user" : "assistant";
                  const content = String(m?.content ?? "").trim();
                  const tag = m?.by === "admin" ? "You" : m?.by === "followup" ? "Follow-up" : null;
                  return (
                    <div key={i} className={`dash-msg dash-msg--${role}`}>
                      <div className="dash-msg__bubble">
                        {tag && <span className="dash-msg__tag">{tag}</span>}
                        {content || <em className="dash-msg__placeholder">(empty)</em>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <form className="dash-composer" onSubmit={sendMessage}>
                <input
                  type="text"
                  className="dash-composer__input"
                  placeholder={botPaused ? "Reply as admin…" : "Type to take over and reply…"}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  disabled={sending}
                />
                <button
                  type="submit"
                  className="dash-bar__btn"
                  disabled={sending || !draft.trim()}
                >
                  {sending ? "Sending…" : "Send"}
                </button>
              </form>
            </>
          ) : (
            <div className="dash-thread__placeholder">
              {conversations.length === 0
                ? "Conversations will appear here once customers message in."
                : "Select a conversation on the left."}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
