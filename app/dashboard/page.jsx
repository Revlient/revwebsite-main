"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Password-gated read-only conversations dashboard. All Supabase
// access happens server-side via /api/conversations; this page
// holds the password in sessionStorage and fetches the conversation
// list when authenticated. Auto-refresh every 15s, manual button.

const STORAGE_KEY = "revlient-dashboard-key";
const REFRESH_MS = 15000;

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
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "";
  }
}

function previewOf(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return "No messages";
  const last = messages[messages.length - 1];
  const text = String(last?.content ?? "").trim();
  if (!text) return "(empty message)";
  return text.length > 80 ? `${text.slice(0, 80)}…` : text;
}

function formatTimestamp(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

export default function DashboardPage() {
  const [password, setPassword] = useState("");
  const [authedKey, setAuthedKey] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wrongPassword, setWrongPassword] = useState(false);
  const intervalRef = useRef(null);

  const selected = useMemo(
    () => conversations.find((c) => c.phone === selectedPhone) || null,
    [conversations, selectedPhone]
  );

  const fetchConversations = useCallback(
    async (key, { silent = false } = {}) => {
      if (!key) return;
      if (!silent) setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/conversations", {
          headers: { "x-dashboard-key": key },
          cache: "no-store",
        });

        if (res.status === 401) {
          setAuthedKey(null);
          setConversations([]);
          setSelectedPhone(null);
          setWrongPassword(true);
          try {
            sessionStorage.removeItem(STORAGE_KEY);
          } catch {}
          return;
        }

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const data = await res.json();
        const list = Array.isArray(data?.conversations) ? data.conversations : [];
        setConversations(list);
        setWrongPassword(false);

        if (list.length > 0) {
          setSelectedPhone((current) => {
            if (current && list.some((c) => c.phone === current)) return current;
            return list[0].phone;
          });
        } else {
          setSelectedPhone(null);
        }
      } catch (err) {
        setError(err?.message || "Failed to load conversations");
      } finally {
        if (!silent) setLoading(false);
      }
    },
    []
  );

  // On mount: restore the password from sessionStorage and try a fetch.
  useEffect(() => {
    let stored = null;
    try {
      stored = sessionStorage.getItem(STORAGE_KEY);
    } catch {}
    if (stored) {
      setAuthedKey(stored);
      fetchConversations(stored);
    }
  }, [fetchConversations]);

  // Auto-refresh on a timer while authenticated.
  useEffect(() => {
    if (!authedKey) return undefined;
    intervalRef.current = setInterval(() => {
      fetchConversations(authedKey, { silent: true });
    }, REFRESH_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [authedKey, fetchConversations]);

  const handleSignIn = (e) => {
    e?.preventDefault?.();
    const key = password.trim();
    if (!key) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, key);
    } catch {}
    setAuthedKey(key);
    setPassword("");
    fetchConversations(key);
  };

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    setAuthedKey(null);
    setConversations([]);
    setSelectedPhone(null);
    setError(null);
  };

  // ── Password gate ────────────────────────────────────────────
  if (!authedKey) {
    return (
      <main className="dash dash--gate">
        <form className="dash-gate" onSubmit={handleSignIn}>
          <h1 className="dash-gate__title">Conversations</h1>
          <p className="dash-gate__sub">Enter the dashboard password.</p>
          <input
            type="password"
            className="dash-gate__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
          />
          <button type="submit" className="dash-gate__btn">
            Sign in
          </button>
          {wrongPassword && (
            <p className="dash-gate__err">Wrong password</p>
          )}
        </form>
      </main>
    );
  }

  // ── Authenticated view ───────────────────────────────────────
  const messages = Array.isArray(selected?.messages) ? selected.messages : [];

  return (
    <main className="dash">
      <header className="dash-bar">
        <div className="dash-bar__title">
          Conversations
          <span className="dash-bar__count">{conversations.length}</span>
        </div>
        <div className="dash-bar__actions">
          <button
            type="button"
            className="dash-bar__btn"
            onClick={() => fetchConversations(authedKey)}
            disabled={loading}
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            type="button"
            className="dash-bar__btn dash-bar__btn--ghost"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </header>

      {error && <div className="dash-error">{error}</div>}

      <div className="dash-grid">
        {/* Left — conversation list */}
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

        {/* Right — selected thread */}
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
    </main>
  );
}
