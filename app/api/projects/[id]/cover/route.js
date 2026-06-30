// Project cover image upload. Single file → Supabase Storage, then sets
// projects.cover_url. Reuses the existing public "property-images" bucket
// under a case-studies/ path so no new bucket setup is required.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASSWORD = process.env.REVLIENT_ADMIN_PASSWORD;
const BUCKET = "property-images";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function checkAuth(req) {
  const key = req.headers.get("x-admin-key");
  return Boolean(ADMIN_PASSWORD) && key === ADMIN_PASSWORD;
}

function extFromName(name, fallback = "jpg") {
  const m = String(name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!m) return fallback;
  const ext = m[1];
  if (["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext)) return ext;
  return fallback;
}

export async function POST(request, { params }) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  const { id } = await params;
  if (!id) return json({ error: "Missing project id" }, 400);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Expected multipart form-data" }, 400);
  }

  let file = null;
  for (const [, value] of form.entries()) {
    if (value && typeof value === "object" && typeof value.arrayBuffer === "function") {
      file = value;
      break;
    }
  }
  if (!file) return json({ error: "No file provided" }, 400);

  try {
    const ext = extFromName(file.name);
    const path = `case-studies/${id}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
    const buf = await file.arrayBuffer();

    const upRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_KEY}`,
        apikey: SUPABASE_KEY,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true",
        "Cache-Control": "3600",
      },
      body: buf,
    });

    if (!upRes.ok) {
      const detail = await upRes.text().catch(() => "");
      return json({ error: "Storage upload failed", status: upRes.status, detail }, 502);
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;

    // Save cover_url on the project
    await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cover_url: url }),
    });

    return json({ cover_url: url });
  } catch (err) {
    return json({ error: "Upload failed", detail: String(err?.message || err) }, 500);
  }
}
