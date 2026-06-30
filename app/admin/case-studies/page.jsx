"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "../AdminContext";

// Case studies review queue. AI drafts land here as "pending". Read,
// tweak the title/excerpt/body if needed, then Publish (one click) to
// push it live on /blog. Unpublish or delete anytime.

function Badge({ status }) {
  const label = status === "published" ? "Published" : "Pending review";
  return <span className={`cs-badge cs-badge--${status}`}>{label}</span>;
}

export default function CaseStudiesPage() {
  const { authedKey, signOut } = useAdmin();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [draft, setDraft] = useState({ title: "", excerpt: "", body: "" });
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const open = items.find((c) => String(c.id) === String(openId)) || null;

  const load = useCallback(async () => {
    if (!authedKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/case-studies", {
        headers: { "x-admin-key": authedKey },
        cache: "no-store",
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setItems(Array.isArray(data?.case_studies) ? data.case_studies : []);
    } catch (err) {
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [authedKey, signOut]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("props-panel-open", openId !== null);
    return () => document.body.classList.remove("props-panel-open");
  }, [openId]);

  const openEdit = (c) => {
    setOpenId(c.id);
    setDraft({ title: c.title || "", excerpt: c.excerpt || "", body: c.body || "" });
  };
  const close = () => setOpenId(null);

  const patch = async (id, payload) => {
    const res = await fetch(`/api/case-studies/${id}`, {
      method: "PATCH",
      headers: { "x-admin-key": authedKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 401) { signOut(); throw new Error("Unauthorized"); }
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d?.error || `Failed (${res.status})`);
    }
    return res.json();
  };

  const saveEdits = async () => {
    if (!open) return;
    setSaving(true);
    setError(null);
    try {
      await patch(open.id, draft);
      await load();
    } catch (err) {
      setError(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (id, status) => {
    setBusyId(id);
    setError(null);
    try {
      await patch(id, { status });
      await load();
    } catch (err) {
      setError(err?.message || "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this case study? The project stays; you can regenerate.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/case-studies/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": authedKey },
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Delete failed (${res.status})`);
      }
      if (String(openId) === String(id)) close();
      await load();
    } catch (err) {
      setError(err?.message || "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const pending = items.filter((c) => c.status !== "published").length;

  return (
    <>
      <header className="dash-bar">
        <div className="dash-bar__title">
          Case studies
          <span className="dash-bar__count">{items.length}</span>
          {pending > 0 && <span className="cs-pending">{pending} to review</span>}
        </div>
      </header>

      {error && <div className="dash-error">{error}</div>}

      <div className="props-shell">
        {loading && items.length === 0 && <div className="props-empty">Loading…</div>}
        {!loading && items.length === 0 && (
          <div className="props-empty">
            No case studies yet. Add a project in the <strong>Projects</strong> tab
            and set it to <strong>Ready</strong> — a draft appears here within the hour.
          </div>
        )}

        <div className="cs-list">
          {items.map((c) => (
            <div key={c.id} className="cs-row">
              <div className="cs-row__main" onClick={() => openEdit(c)} role="button" tabIndex={0}>
                <div className="cs-row__top">
                  <span className="cs-row__title">{c.title || "Untitled"}</span>
                  <Badge status={c.status} />
                </div>
                <div className="cs-row__excerpt">{c.excerpt || "—"}</div>
              </div>
              <div className="cs-row__actions">
                <button type="button" className="dash-bar__btn" onClick={() => openEdit(c)}>
                  Review
                </button>
                {c.status === "published" ? (
                  <button type="button" className="dash-bar__btn dash-bar__btn--ghost"
                    disabled={busyId === c.id} onClick={() => setStatus(c.id, "pending")}>
                    Unpublish
                  </button>
                ) : (
                  <button type="button" className="dash-bar__btn"
                    disabled={busyId === c.id} onClick={() => setStatus(c.id, "published")}>
                    {busyId === c.id ? "…" : "Publish"}
                  </button>
                )}
                <button type="button" className="dash-bar__btn dash-bar__btn--ghost props-form__delete"
                  disabled={busyId === c.id} onClick={() => remove(c.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="props-panel-overlay" onClick={close}>
          <aside className="props-panel" onClick={(e) => e.stopPropagation()} role="dialog">
            <header className="props-panel__head">
              <div className="props-panel__title">Review case study</div>
              <button type="button" className="props-panel__close" onClick={close}>×</button>
            </header>

            <div className="props-form">
              <label className="props-field">
                <span className="props-field__label">Title</span>
                <input className="props-field__input" type="text" value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
              </label>
              <label className="props-field">
                <span className="props-field__label">Excerpt (blog card summary)</span>
                <textarea className="props-field__input props-field__textarea" rows={2}
                  value={draft.excerpt}
                  onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))} />
              </label>
              <label className="props-field">
                <span className="props-field__label">Body</span>
                <textarea className="props-field__input props-field__textarea" rows={16}
                  value={draft.body}
                  onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))} />
              </label>

              <div className="props-form__actions">
                <button type="button" className="dash-bar__btn" onClick={saveEdits} disabled={saving}>
                  {saving ? "Saving…" : "Save edits"}
                </button>
                {open.status === "published" ? (
                  <button type="button" className="dash-bar__btn dash-bar__btn--ghost"
                    onClick={() => setStatus(open.id, "pending")}>
                    Unpublish
                  </button>
                ) : (
                  <button type="button" className="dash-bar__btn"
                    onClick={() => setStatus(open.id, "published")}>
                    Publish
                  </button>
                )}
              </div>
              {open.slug && open.status === "published" && (
                <a className="props-field__label" href={`/blog/${open.slug}`} target="_blank"
                  rel="noreferrer" style={{ color: "#2b5fff" }}>
                  View live → /blog/{open.slug}
                </a>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
