// Projects — raw facts that feed the auto case-study generator.
// Password-gated on REVLIENT_ADMIN_PASSWORD via x-admin-key. Service-role
// key stays server-side. GET lists all projects (with any linked case
// study's status), POST inserts a new project.
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

export async function GET(request) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  try {
    const [projRes, csRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=created_at.desc`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }),
      fetch(`${SUPABASE_URL}/rest/v1/case_studies?select=id,project_id,status,slug`, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }),
    ]);

    if (!projRes.ok) {
      const detail = await projRes.text().catch(() => "");
      return json({ error: "Supabase projects failed", status: projRes.status, detail }, 502);
    }

    const projects = await projRes.json();
    const studies = csRes.ok ? await csRes.json() : [];
    const byProject = new Map();
    for (const cs of Array.isArray(studies) ? studies : []) {
      byProject.set(cs.project_id, cs);
    }

    const out = (Array.isArray(projects) ? projects : []).map((p) => ({
      ...p,
      case_study: byProject.get(p.id) || null,
    }));

    return json({ projects: out });
  } catch (err) {
    return json({ error: "Fetch failed", detail: String(err?.message || err) }, 500);
  }
}

export async function POST(request) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const payload = pickFields(body || {});
  if (!payload.client) return json({ error: "client is required" }, 400);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return json({ error: "Insert failed", status: res.status, detail }, 502);
    }

    const rows = await res.json();
    const row = Array.isArray(rows) ? rows[0] : rows;
    return json({ project: row, id: row?.id });
  } catch (err) {
    return json({ error: "Insert failed", detail: String(err?.message || err) }, 500);
  }
}
