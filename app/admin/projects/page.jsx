"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAdmin } from "../AdminContext";

// Projects — raw facts that feed the auto case-study generator. Fill the
// fields, upload a cover, set status to "Ready", and within the hour the
// cron drafts a case study into the review queue.

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft (not generated yet)" },
  { value: "ready", label: "Ready → generate case study" },
];

const EMPTY = {
  client: "",
  industry: "",
  what_we_built: "",
  tech_stack: "",
  timeline: "",
  metrics: "",
  cover_url: "",
  status: "draft",
};

function toForm(p) {
  if (!p) return { ...EMPTY };
  return {
    client: p.client ?? "",
    industry: p.industry ?? "",
    what_we_built: p.what_we_built ?? "",
    tech_stack: p.tech_stack ?? "",
    timeline: p.timeline ?? "",
    metrics: p.metrics ?? "",
    cover_url: p.cover_url ?? "",
    status: p.status === "generated" ? "generated" : (p.status ?? "draft"),
  };
}

export default function ProjectsPage() {
  const { authedKey, signOut } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverInputRef = useRef(null);

  const editing = editingId && editingId !== "new"
    ? projects.find((p) => String(p.id) === String(editingId))
    : null;

  const load = useCallback(async () => {
    if (!authedKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        headers: { "x-admin-key": authedKey },
        cache: "no-store",
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setProjects(Array.isArray(data?.projects) ? data.projects : []);
    } catch (err) {
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [authedKey, signOut]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("props-panel-open", editingId !== null);
    return () => document.body.classList.remove("props-panel-open");
  }, [editingId]);

  const openNew = () => { setForm({ ...EMPTY }); setEditingId("new"); };
  const openEdit = (p) => { setForm(toForm(p)); setEditingId(p.id); };
  const close = () => { setEditingId(null); setForm(EMPTY); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e?.preventDefault?.();
    if (!form.client.trim()) { setError("Client is required"); return; }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        client: form.client.trim(),
        industry: form.industry.trim() || null,
        what_we_built: form.what_we_built.trim() || null,
        tech_stack: form.tech_stack.trim() || null,
        timeline: form.timeline.trim() || null,
        metrics: form.metrics.trim() || null,
        status: form.status === "generated" ? "generated" : form.status,
      };
      let res;
      if (editingId === "new") {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "x-admin-key": authedKey, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/projects/${editingId}`, {
          method: "PATCH",
          headers: { "x-admin-key": authedKey, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Save failed (${res.status})`);
      }
      const data = await res.json();
      await load();
      if (editingId === "new" && data?.id) setEditingId(data.id);
    } catch (err) {
      setError(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!editingId || editingId === "new") return;
    if (!confirm("Delete this project and its generated case study?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${editingId}`, {
        method: "DELETE",
        headers: { "x-admin-key": authedKey },
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Delete failed (${res.status})`);
      }
      close();
      await load();
    } catch (err) {
      setError(err?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const uploadCover = async (file) => {
    if (!file || !editingId || editingId === "new") return;
    setUploadingCover(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/projects/${editingId}/cover`, {
        method: "POST",
        headers: { "x-admin-key": authedKey },
        body: fd,
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Upload failed (${res.status})`);
      }
      const data = await res.json();
      set("cover_url", data?.cover_url || "");
      await load();
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploadingCover(false);
    }
  };

  return (
    <>
      <header className="dash-bar">
        <div className="dash-bar__title">
          Projects
          <span className="dash-bar__count">{projects.length}</span>
        </div>
        <div className="dash-bar__actions">
          <button type="button" className="dash-bar__btn" onClick={openNew}>
            + Add project
          </button>
        </div>
      </header>

      {error && <div className="dash-error">{error}</div>}

      <div className="props-shell">
        {loading && projects.length === 0 && <div className="props-empty">Loading…</div>}
        {!loading && projects.length === 0 && (
          <div className="props-empty">
            No projects yet. Click <strong>+ Add project</strong>, fill the facts,
            set status to <strong>Ready</strong>, and a case study drafts itself
            within the hour.
          </div>
        )}
        <div className="props-grid">
          {projects.map((p) => {
            const cs = p.case_study;
            const tag = cs
              ? (cs.status === "published" ? "Published" : "Drafted · review")
              : (p.status === "ready" ? "Generating soon" : "Draft");
            return (
              <button key={p.id} type="button" className="props-card" onClick={() => openEdit(p)}>
                <div className="props-card__thumb">
                  {p.cover_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.cover_url} alt={p.client || ""} />
                  ) : (
                    <span className="props-card__placeholder">No cover</span>
                  )}
                  <span className="props-card__status">{tag}</span>
                </div>
                <div className="props-card__body">
                  <div className="props-card__title">{p.client || "Untitled"}</div>
                  <div className="props-card__meta">{p.industry || "—"}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {editingId !== null && (
        <div className="props-panel-overlay" onClick={close}>
          <aside className="props-panel" onClick={(e) => e.stopPropagation()} role="dialog">
            <header className="props-panel__head">
              <div className="props-panel__title">
                {editingId === "new" ? "Add project" : "Edit project"}
              </div>
              <button type="button" className="props-panel__close" onClick={close}>×</button>
            </header>

            <form className="props-form" onSubmit={save}>
              <label className="props-field">
                <span className="props-field__label">Client</span>
                <input className="props-field__input" type="text" value={form.client}
                  onChange={(e) => set("client", e.target.value)} required
                  placeholder="e.g. House of 11" />
              </label>

              <div className="props-field-row">
                <label className="props-field">
                  <span className="props-field__label">Industry</span>
                  <input className="props-field__input" type="text" value={form.industry}
                    onChange={(e) => set("industry", e.target.value)} placeholder="e.g. Retail" />
                </label>
                <label className="props-field">
                  <span className="props-field__label">Timeline</span>
                  <input className="props-field__input" type="text" value={form.timeline}
                    onChange={(e) => set("timeline", e.target.value)} placeholder="e.g. 6 weeks" />
                </label>
              </div>

              <label className="props-field">
                <span className="props-field__label">What we built</span>
                <textarea className="props-field__input props-field__textarea" rows={2}
                  value={form.what_we_built} onChange={(e) => set("what_we_built", e.target.value)}
                  placeholder="e.g. A headless e-commerce storefront with custom checkout" />
              </label>

              <label className="props-field">
                <span className="props-field__label">Tech stack</span>
                <input className="props-field__input" type="text" value={form.tech_stack}
                  onChange={(e) => set("tech_stack", e.target.value)}
                  placeholder="e.g. Next.js, Supabase, Stripe" />
              </label>

              <label className="props-field">
                <span className="props-field__label">
                  Measured results — one per line (used verbatim, never invented)
                </span>
                <textarea className="props-field__input props-field__textarea" rows={4}
                  value={form.metrics} onChange={(e) => set("metrics", e.target.value)}
                  placeholder={"checkout time -40%\nmonthly orders +2.3x\n₹2L/mo manual work saved"} />
              </label>

              <label className="props-field">
                <span className="props-field__label">Status</span>
                <select className="props-field__input" value={form.status === "generated" ? "draft" : form.status}
                  onChange={(e) => set("status", e.target.value)}
                  disabled={form.status === "generated"}>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {form.status === "generated" && (
                  <span className="props-field__label" style={{ color: "#2b5fff", marginTop: 4 }}>
                    Case study already generated — see the Case studies tab.
                  </span>
                )}
              </label>

              <div className="props-form__actions">
                <button type="submit" className="dash-bar__btn" disabled={saving}>
                  {saving ? "Saving…" : (editingId === "new" ? "Create" : "Save changes")}
                </button>
                {editingId !== "new" && (
                  <button type="button" className="dash-bar__btn dash-bar__btn--ghost props-form__delete"
                    onClick={remove} disabled={deleting}>
                    {deleting ? "Deleting…" : "Delete"}
                  </button>
                )}
              </div>
            </form>

            {editingId !== "new" && (
              <div className="props-photos">
                <div className="props-photos__head">Cover image</div>
                {form.cover_url && (
                  <div className="props-photos__grid">
                    <div className="props-photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.cover_url} alt="" />
                    </div>
                  </div>
                )}
                <div className="props-dropzone" onClick={() => coverInputRef.current?.click()}
                  role="button" tabIndex={0}>
                  <p>{uploadingCover ? "Uploading…" : (form.cover_url ? "Replace cover" : "Upload a cover image")}</p>
                  <small>jpg, png, webp</small>
                  <input ref={coverInputRef} type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }}
                    style={{ display: "none" }} />
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
