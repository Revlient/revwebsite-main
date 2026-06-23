// Property images endpoint — password-gated.
// POST: multipart upload to Supabase Storage + insert property_images rows.
// DELETE: ?image_id=N — removes the DB row AND the file from storage.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
const BUCKET = "property-images";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function checkAuth(req) {
  const key = req.headers.get("x-dashboard-key");
  if (!DASHBOARD_PASSWORD || key !== DASHBOARD_PASSWORD) return false;
  return true;
}

function extFromName(name, fallback = "jpg") {
  const m = String(name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!m) return fallback;
  const ext = m[1];
  // Allow common image types
  if (["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext)) return ext;
  return fallback;
}

function publicUrlFor(path) {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

function pathFromPublicUrl(url) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = String(url || "").indexOf(marker);
  if (i === -1) return null;
  return url.slice(i + marker.length);
}

async function getMaxDisplayOrder(propertyId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/property_images?property_id=eq.${encodeURIComponent(propertyId)}` +
      `&select=display_order&order=display_order.desc&limit=1`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return 0;
  const rows = await res.json();
  return Number(rows?.[0]?.display_order ?? 0);
}

export async function POST(request, { params }) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  const { id } = await params;
  if (!id) return json({ error: "Missing property id" }, 400);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Expected multipart form-data" }, 400);
  }

  const files = [];
  for (const [, value] of form.entries()) {
    if (value && typeof value === "object" && typeof value.arrayBuffer === "function") {
      files.push(value);
    }
  }
  if (files.length === 0) return json({ error: "No files provided" }, 400);

  let nextOrder = (await getMaxDisplayOrder(id)) + 1;
  const created = [];

  for (const file of files) {
    try {
      const ext = extFromName(file.name);
      const path = `${id}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
      const buf = await file.arrayBuffer();

      const upRes = await fetch(
        `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SUPABASE_KEY}`,
            apikey: SUPABASE_KEY,
            "Content-Type": file.type || "application/octet-stream",
            "x-upsert": "true",
            "Cache-Control": "3600",
          },
          body: buf,
        }
      );

      if (!upRes.ok) {
        const detail = await upRes.text().catch(() => "");
        return json({ error: "Storage upload failed", status: upRes.status, detail }, 502);
      }

      const url = publicUrlFor(path);
      const insRes = await fetch(`${SUPABASE_URL}/rest/v1/property_images`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          property_id: Number(id),
          url,
          display_order: nextOrder,
        }),
      });

      if (!insRes.ok) {
        const detail = await insRes.text().catch(() => "");
        // Try to clean up the orphan storage object
        await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${SUPABASE_KEY}`, apikey: SUPABASE_KEY },
        }).catch(() => {});
        return json({ error: "DB insert failed", status: insRes.status, detail }, 502);
      }

      const rows = await insRes.json();
      const row = Array.isArray(rows) ? rows[0] : rows;
      created.push(row);
      nextOrder += 1;
    } catch (err) {
      return json({ error: "Upload failed", detail: String(err?.message || err) }, 500);
    }
  }

  return json({ images: created });
}

export async function DELETE(request) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  const { searchParams } = new URL(request.url);
  const imageId = searchParams.get("image_id");
  if (!imageId) return json({ error: "Missing image_id" }, 400);

  try {
    // 1. Look up the row so we know the storage path
    const lookupRes = await fetch(
      `${SUPABASE_URL}/rest/v1/property_images?id=eq.${encodeURIComponent(imageId)}&select=id,url`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!lookupRes.ok) {
      const detail = await lookupRes.text().catch(() => "");
      return json({ error: "Lookup failed", status: lookupRes.status, detail }, 502);
    }

    const rows = await lookupRes.json();
    const row = Array.isArray(rows) ? rows[0] : null;
    if (!row) return json({ error: "Image not found" }, 404);

    // 2. Delete the storage object (best-effort; continue on failure)
    const path = pathFromPublicUrl(row.url);
    if (path) {
      await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${SUPABASE_KEY}`, apikey: SUPABASE_KEY },
      }).catch(() => {});
    }

    // 3. Delete the DB row
    const delRes = await fetch(
      `${SUPABASE_URL}/rest/v1/property_images?id=eq.${encodeURIComponent(imageId)}`,
      {
        method: "DELETE",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      }
    );

    if (!delRes.ok) {
      const detail = await delRes.text().catch(() => "");
      return json({ error: "Delete failed", status: delRes.status, detail }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ error: "Delete failed", detail: String(err?.message || err) }, 500);
  }
}
