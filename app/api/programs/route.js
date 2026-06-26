// Programs CRUD list endpoint — password-gated. Service-role key
// stays server-side. GET returns all programs with their images
// (sorted by display_order). POST inserts a new program.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

const PROGRAM_FIELDS = [
  "title", "type", "country", "university", "location",
  "tuition_fees", "intake_months", "ielts_required", "duration",
  "status", "description",
];

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

function pickFields(body) {
  const out = {};
  for (const k of PROGRAM_FIELDS) {
    if (body[k] !== undefined) out[k] = body[k];
  }
  return out;
}

export async function GET(request) {
  if (!checkAuth(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);

  try {
    const [progRes, imgsRes] = await Promise.all([
      fetch(
        `${SUPABASE_URL}/rest/v1/programs?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Accept: "application/json",
          },
          cache: "no-store",
        }
      ),
      fetch(
        `${SUPABASE_URL}/rest/v1/program_images?select=*&order=display_order.asc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Accept: "application/json",
          },
          cache: "no-store",
        }
      ),
    ]);

    if (!progRes.ok) {
      const detail = await progRes.text().catch(() => "");
      return json({ error: "Supabase programs failed", status: progRes.status, detail }, 502);
    }
    if (!imgsRes.ok) {
      const detail = await imgsRes.text().catch(() => "");
      return json({ error: "Supabase images failed", status: imgsRes.status, detail }, 502);
    }

    const programs = await progRes.json();
    const images = await imgsRes.json();

    const imagesByProgram = new Map();
    for (const img of Array.isArray(images) ? images : []) {
      const arr = imagesByProgram.get(img.program_id) || [];
      arr.push(img);
      imagesByProgram.set(img.program_id, arr);
    }

    const out = (Array.isArray(programs) ? programs : []).map((p) => ({
      ...p,
      images: imagesByProgram.get(p.id) || [],
    }));

    return json({ programs: out });
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
  if (!payload.title) return json({ error: "title is required" }, 400);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/programs`, {
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
    return json({ program: row, id: row?.id });
  } catch (err) {
    return json({ error: "Insert failed", detail: String(err?.message || err) }, 500);
  }
}
