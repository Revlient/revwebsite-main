// Public endpoint — returns only PUBLISHED case studies for the blog.
// No auth: it exposes nothing the blog wouldn't already show publicly.
// Optional ?slug=… returns a single published case study (for the
// blog/[slug] page).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export async function GET(request) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ case_studies: [] });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  let url =
    `${SUPABASE_URL}/rest/v1/case_studies` +
    `?select=id,slug,title,excerpt,body,cover_url,created_at` +
    `&status=eq.published`;
  if (slug) {
    url += `&slug=eq.${encodeURIComponent(slug)}&limit=1`;
  } else {
    url += `&order=created_at.desc`;
  }

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) return json({ case_studies: [] });
    const rows = await res.json();
    if (slug) {
      return json({ case_study: Array.isArray(rows) ? rows[0] || null : null });
    }
    return json({ case_studies: Array.isArray(rows) ? rows : [] });
  } catch {
    return json({ case_studies: [] });
  }
}
