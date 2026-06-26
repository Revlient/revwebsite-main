"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDashboard } from "../DashboardContext";

// Programs admin — list + create + edit + delete + image upload.
// All Supabase access goes through /api/programs/*. The service-role
// key never reaches this component.

const STATUS_OPTIONS = ["available", "closed", "on-hold"];
const TYPE_OPTIONS = ["Masters", "Bachelors", "MBA", "Diploma", "Foundation"];
const COUNTRY_OPTIONS = ["UK", "USA", "Canada", "Australia", "Ireland", "Germany", "Other"];

const EMPTY_FORM = {
  title: "",
  university: "",
  type: "Masters",
  country: "UK",
  location: "",
  tuition_fees: "",
  duration: "",
  intake_months: "",
  ielts_required: "",
  status: "available",
  description: "",
};

function toFormState(p) {
  if (!p) return { ...EMPTY_FORM };
  return {
    title: p.title ?? "",
    university: p.university ?? "",
    type: p.type ?? "Masters",
    country: p.country ?? "UK",
    location: p.location ?? "",
    tuition_fees: p.tuition_fees ?? "",
    duration: p.duration ?? "",
    intake_months: p.intake_months ?? "",
    ielts_required: p.ielts_required ?? "",
    status: p.status ?? "available",
    description: p.description ?? "",
  };
}

function toPayload(form) {
  return {
    title: form.title.trim(),
    university: form.university.trim() || null,
    type: form.type || null,
    country: form.country || null,
    location: form.location.trim() || null,
    tuition_fees: form.tuition_fees.trim() || null,
    duration: form.duration.trim() || null,
    intake_months: form.intake_months.trim() || null,
    ielts_required: form.ielts_required.trim() || null,
    status: form.status || "available",
    description: form.description.trim() || null,
  };
}

export default function ProgramsPage() {
  const { authedKey, signOut } = useDashboard();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null); // "new" or program id or null
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [uploads, setUploads] = useState([]); // { id, name, status: "uploading"|"done"|"error" }
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const editing = editingId && editingId !== "new"
    ? programs.find((p) => String(p.id) === String(editingId))
    : null;

  // ── Load ─────────────────────────────────────────────────────
  const loadPrograms = useCallback(async () => {
    if (!authedKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/programs", {
        headers: { "x-dashboard-key": authedKey },
        cache: "no-store",
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setPrograms(Array.isArray(data?.programs) ? data.programs : []);
    } catch (err) {
      setError(err?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [authedKey, signOut]);

  useEffect(() => { loadPrograms(); }, [loadPrograms]);

  // ── Open / close panel ───────────────────────────────────────
  const openNew = () => {
    setForm({ ...EMPTY_FORM });
    setEditingId("new");
    setUploads([]);
  };

  const openEdit = (p) => {
    setForm(toFormState(p));
    setEditingId(p.id);
    setUploads([]);
  };

  const closePanel = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setUploads([]);
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ── Save ─────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e?.preventDefault?.();
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = toPayload(form);
      let res;
      if (editingId === "new") {
        res = await fetch("/api/programs", {
          method: "POST",
          headers: {
            "x-dashboard-key": authedKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/programs/${editingId}`, {
          method: "PATCH",
          headers: {
            "x-dashboard-key": authedKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Save failed (${res.status})`);
      }
      const data = await res.json();
      await loadPrograms();
      // If creating, switch into edit mode for the new program so the user
      // can upload photos immediately.
      if (editingId === "new" && data?.id) {
        setEditingId(data.id);
      }
    } catch (err) {
      setError(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete program ───────────────────────────────────────────
  const handleDelete = async () => {
    if (editingId === "new" || !editingId) return;
    if (!confirm("Delete this program and all its photos? This can't be undone.")) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/programs/${editingId}`, {
        method: "DELETE",
        headers: { "x-dashboard-key": authedKey },
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Delete failed (${res.status})`);
      }
      closePanel();
      await loadPrograms();
    } catch (err) {
      setError(err?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // ── Image upload ─────────────────────────────────────────────
  const uploadFiles = async (files) => {
    if (!editingId || editingId === "new") return;
    const arr = Array.from(files).filter((f) =>
      /^image\/(jpeg|jpg|png|webp|gif|avif)$/i.test(f.type) || /\.(jpe?g|png|webp|gif|avif)$/i.test(f.name)
    );
    if (arr.length === 0) return;

    const uploadId = `${Date.now()}-${Math.random()}`;
    const entries = arr.map((f, i) => ({
      id: `${uploadId}-${i}`,
      name: f.name,
      status: "uploading",
    }));
    setUploads((prev) => [...prev, ...entries]);

    try {
      const fd = new FormData();
      for (const f of arr) fd.append("files", f);
      const res = await fetch(`/api/programs/${editingId}/images`, {
        method: "POST",
        headers: { "x-dashboard-key": authedKey },
        body: fd,
      });
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Upload failed (${res.status})`);
      }
      setUploads((prev) =>
        prev.map((u) => entries.some((e) => e.id === u.id) ? { ...u, status: "done" } : u)
      );
      await loadPrograms();
      // Clear "done" entries after a moment
      setTimeout(() => {
        setUploads((prev) => prev.filter((u) => !entries.some((e) => e.id === u.id)));
      }, 1200);
    } catch (err) {
      setError(err?.message || "Upload failed");
      setUploads((prev) =>
        prev.map((u) => entries.some((e) => e.id === u.id) ? { ...u, status: "error" } : u)
      );
    }
  };

  const onFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length) uploadFiles(files);
    // Reset so picking the same file again still fires onChange
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files.length) uploadFiles(files);
  };

  const deleteImage = async (imageId) => {
    if (!editingId || editingId === "new") return;
    if (!confirm("Remove this photo?")) return;
    try {
      const res = await fetch(
        `/api/programs/${editingId}/images?image_id=${encodeURIComponent(imageId)}`,
        { method: "DELETE", headers: { "x-dashboard-key": authedKey } }
      );
      if (res.status === 401) { signOut(); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.error || `Delete failed (${res.status})`);
      }
      await loadPrograms();
    } catch (err) {
      setError(err?.message || "Delete failed");
    }
  };

  // ── Render ───────────────────────────────────────────────────
  return (
    <>
      <header className="dash-bar">
        <div className="dash-bar__title">
          Programs
          <span className="dash-bar__count">{programs.length}</span>
        </div>
        <div className="dash-bar__actions">
          <button
            type="button"
            className="dash-bar__btn"
            onClick={openNew}
          >
            + Add program
          </button>
        </div>
      </header>

      {error && <div className="dash-error">{error}</div>}

      <div className="props-shell">
        {loading && programs.length === 0 && (
          <div className="props-empty">Loading…</div>
        )}
        {!loading && programs.length === 0 && (
          <div className="props-empty">
            No programs yet. Click <strong>+ Add program</strong> to create one.
          </div>
        )}
        <div className="props-grid">
          {programs.map((p) => {
            const thumb = p.images?.[0]?.url || null;
            return (
              <button
                key={p.id}
                type="button"
                className="props-card"
                onClick={() => openEdit(p)}
              >
                <div className="props-card__thumb">
                  {thumb ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={thumb} alt={p.title || ""} />
                  ) : (
                    <span className="props-card__placeholder">No photo</span>
                  )}
                  {p.status && (
                    <span className={`props-card__status props-card__status--${p.status}`}>
                      {p.status}
                    </span>
                  )}
                </div>
                <div className="props-card__body">
                  <div className="props-card__title">{p.title || "Untitled"}</div>
                  <div className="props-card__meta">
                    {p.country || "—"}{p.country && p.tuition_fees ? " · " : ""}
                    {p.tuition_fees ? <strong>{p.tuition_fees}</strong> : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {editingId !== null && (
        <div className="props-panel-overlay" onClick={closePanel}>
          <aside
            className="props-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={editingId === "new" ? "Add program" : "Edit program"}
          >
            <header className="props-panel__head">
              <div className="props-panel__title">
                {editingId === "new" ? "Add program" : "Edit program"}
              </div>
              <button type="button" className="props-panel__close" onClick={closePanel}>
                ×
              </button>
            </header>

            <form className="props-form" onSubmit={handleSave}>
              <label className="props-field">
                <span className="props-field__label">Title</span>
                <input
                  className="props-field__input"
                  type="text"
                  placeholder="e.g. MSc Computer Science"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
              </label>

              <label className="props-field">
                <span className="props-field__label">University</span>
                <input
                  className="props-field__input"
                  type="text"
                  placeholder="e.g. University of Toronto"
                  value={form.university}
                  onChange={(e) => updateField("university", e.target.value)}
                />
              </label>

              <div className="props-field-row">
                <label className="props-field">
                  <span className="props-field__label">Type</span>
                  <select
                    className="props-field__input"
                    value={form.type}
                    onChange={(e) => updateField("type", e.target.value)}
                  >
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="props-field">
                  <span className="props-field__label">Country</span>
                  <select
                    className="props-field__input"
                    value={form.country}
                    onChange={(e) => updateField("country", e.target.value)}
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="props-field">
                  <span className="props-field__label">Status</span>
                  <select
                    className="props-field__input"
                    value={form.status}
                    onChange={(e) => updateField("status", e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="props-field">
                <span className="props-field__label">Location / City</span>
                <input
                  className="props-field__input"
                  type="text"
                  placeholder="e.g. Toronto"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </label>

              <div className="props-field-row">
                <label className="props-field">
                  <span className="props-field__label">Tuition fees</span>
                  <input
                    className="props-field__input"
                    type="text"
                    placeholder="e.g. CAD 58,000/year"
                    value={form.tuition_fees}
                    onChange={(e) => updateField("tuition_fees", e.target.value)}
                  />
                </label>
                <label className="props-field">
                  <span className="props-field__label">Duration</span>
                  <input
                    className="props-field__input"
                    type="text"
                    placeholder="e.g. 2 years"
                    value={form.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                  />
                </label>
              </div>

              <div className="props-field-row">
                <label className="props-field">
                  <span className="props-field__label">Intake months</span>
                  <input
                    className="props-field__input"
                    type="text"
                    placeholder="e.g. Jan, May, Sep"
                    value={form.intake_months}
                    onChange={(e) => updateField("intake_months", e.target.value)}
                  />
                </label>
                <label className="props-field">
                  <span className="props-field__label">IELTS required</span>
                  <input
                    className="props-field__input"
                    type="text"
                    placeholder="e.g. 6.5"
                    value={form.ielts_required}
                    onChange={(e) => updateField("ielts_required", e.target.value)}
                  />
                </label>
              </div>

              <label className="props-field">
                <span className="props-field__label">Description</span>
                <textarea
                  className="props-field__input props-field__textarea"
                  rows={4}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </label>

              <div className="props-form__actions">
                <button
                  type="submit"
                  className="dash-bar__btn"
                  disabled={saving}
                >
                  {saving ? "Saving…" : (editingId === "new" ? "Create" : "Save changes")}
                </button>
                {editingId !== "new" && (
                  <button
                    type="button"
                    className="dash-bar__btn dash-bar__btn--ghost props-form__delete"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting…" : "Delete program"}
                  </button>
                )}
              </div>
            </form>

            {/* Photos */}
            {editingId !== "new" && (
              <div className="props-photos">
                <div className="props-photos__head">
                  Brochure photos
                  <span className="dash-bar__count">{editing?.images?.length || 0}</span>
                </div>

                <div className="props-photos__grid">
                  {(editing?.images || []).map((img) => (
                    <div key={img.id} className="props-photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="" />
                      <button
                        type="button"
                        className="props-photo__del"
                        title="Remove photo"
                        onClick={() => deleteImage(img.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div
                  className={`props-dropzone ${isDragging ? "is-drag" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                >
                  <p>Drop photos here or click to browse</p>
                  <small>jpg, png, webp · multiple OK</small>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: "none" }}
                  />
                </div>

                {uploads.length > 0 && (
                  <ul className="props-uploads">
                    {uploads.map((u) => (
                      <li key={u.id} className={`props-uploads__item is-${u.status}`}>
                        <span className="props-uploads__name">{u.name}</span>
                        <span className="props-uploads__state">
                          {u.status === "uploading" && "Uploading…"}
                          {u.status === "done" && "Done"}
                          {u.status === "error" && "Failed"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
