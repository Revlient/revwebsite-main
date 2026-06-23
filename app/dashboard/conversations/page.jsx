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
  const esRef = useRef(null);

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

  const messages = Array.isArray(selected?.messages) ? selected.messages : [];

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
                <div className="dash-list__preview">{previewOf(c.messages)}</div>
              </button>
            );
          })}
        </aside>

        <section className="dash-thread" aria-label="Selected conversation">
          {selected ? (
            <>
              <header className="dash-thread__head">
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
              </header>

              <div className="dash-thread__body">
                {messages.length === 0 && (
                  <div className="dash-thread__empty">
                    This conversation has no messages.
                  </div>
                )}
                {messages.map((m, i) => {
                  const role = m?.role === "user" ? "user" : "assistant";
                  const content = String(m?.content ?? "").trim();
                  return (
                    <div key={i} className={`dash-msg dash-msg--${role}`}>
                      <div className="dash-msg__bubble">
                        {content || <em className="dash-msg__placeholder">(empty)</em>}
                      </div>
                    </div>
                  );
                })}
              </div>
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
