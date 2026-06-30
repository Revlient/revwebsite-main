// Project detail — PATCH updates fields (including status → 'ready' which
// the cron picks up), DELETE removes it (linked case_study cascades).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASSWORD = process.env.REVLIENT_ADMIN_PASSWORD;

const PROJECT_FIELDS = [
  "client", "industry", "what_we_built", "tech_stack",
  "timeline", "metrics", "cover_url", "status",
];

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

function pickFields(body) {
  const out = {};
  for (const k of PROJECT_FIELDS) {
    if (body[k] !== undefined) out[k] = body[k];
  }
  return out;
}

export async function PATCH(request, { params }) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  const { id } = await params;
  if (!id) return json({ error: "Missing id" }, 400);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const payload = pickFields(body || {});
  if (Object.keys(payload).length === 0) {
    return json({ error: "No updatable fields provided" }, 400);
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return json({ error: "Update failed", status: res.status, detail }, 502);
    }

    const rows = await res.json();
    const row = Array.isArray(rows) ? rows[0] : rows;
    return json({ project: row });
  } catch (err) {
    return json({ error: "Update failed", detail: String(err?.message || err) }, 500);
  }
}

export async function DELETE(request, { params }) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  const { id } = await params;
  if (!id) return json({ error: "Missing id" }, 400);

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return json({ error: "Delete failed", status: res.status, detail }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ error: "Delete failed", detail: String(err?.message || err) }, 500);
  }
}
