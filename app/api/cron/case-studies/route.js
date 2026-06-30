// Auto case-study generator. Runs on a schedule (see vercel.json) and can
// be triggered manually with the admin key.
//
// For each project with status='ready' that has no case study yet:
//  - Groq writes a polished case study FROM THE FACTS PROVIDED — it is
//    explicitly told never to invent clients, numbers, or outcomes.
//  - Inserts a case_studies row as status='pending' (the admin reviews
//    and publishes it with one click).
//  - Links it back to the project and flips the project to 'generated'.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASSWORD = process.env.REVLIENT_ADMIN_PASSWORD;
const CRON_SECRET = process.env.CRON_SECRET;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function authorized(request) {
  const auth = request.headers.get("authorization");
  if (CRON_SECRET && auth === `Bearer ${CRON_SECRET}`) return true;
  const key = request.headers.get("x-admin-key");
  if (ADMIN_PASSWORD && key === ADMIN_PASSWORD) return true;
  return false;
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

async function readyProjects() {
  // status='ready' AND no linked case study yet
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/projects?select=*&status=eq.ready`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return [];
  const rows = await res.json();
  return Array.isArray(rows) ? rows : [];
}

async function hasCaseStudy(projectId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/case_studies?project_id=eq.${encodeURIComponent(projectId)}&select=id&limit=1`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) return false;
  const rows = await res.json();
  return Array.isArray(rows) && rows.length > 0;
}

function buildPrompt(project) {
  return `You are a senior case-study writer for Revlient, a software studio. Write a compelling, professional case study using ONLY the facts provided below.

ABSOLUTE RULES:
- NEVER invent client names, statistics, metrics, dates, quotes, or outcomes. Use ONLY what is given.
- If a metric isn't provided, do not fabricate one — write around what you have.
- Keep it credible and grounded. No hype words like "revolutionary" or "game-changing".
- Professional, confident, concise. Third person.

OUTPUT FORMAT — return ONLY valid JSON, no markdown, with exactly these keys:
{
  "title": "a strong case-study title (<= 70 chars)",
  "excerpt": "1-2 sentence summary for the blog card (<= 160 chars)",
  "body": "the full case study in plain text with short paragraphs and these sections by name: Overview, The Challenge, Our Approach, The Solution, The Results. Use the provided metrics verbatim in The Results. 350-550 words."
}

PROJECT FACTS:
- Client: ${project.client || "N/A"}
- Industry: ${project.industry || "N/A"}
- What we built: ${project.what_we_built || "N/A"}
- Tech stack: ${project.tech_stack || "N/A"}
- Timeline: ${project.timeline || "N/A"}
- Measured results (use verbatim, do not alter numbers):
${project.metrics || "None provided"}`;
}

async function generate(project) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      max_tokens: 1400,
      temperature: 0.5,
      reasoning_effort: "low",
      include_reasoning: false,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: buildPrompt(project) }],
    }),
  });
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content?.trim();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.title || !parsed?.body) return null;
    return {
      title: String(parsed.title).slice(0, 120),
      excerpt: String(parsed.excerpt || "").slice(0, 200),
      body: String(parsed.body),
    };
  } catch {
    return null;
  }
}

export async function GET(request) {
  if (!authorized(request)) return json({ error: "Unauthorized" }, 401);
  if (!SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Server not configured" }, 500);
  if (!process.env.GROQ_API_KEY) return json({ error: "GROQ not configured" }, 500);

  const projects = await readyProjects();
  if (projects.length === 0) return json({ ok: true, generated: 0 });

  let generated = 0;
  const results = [];

  for (const project of projects) {
    try {
      if (await hasCaseStudy(project.id)) {
        results.push({ project: project.id, status: "already_has_case_study" });
        continue;
      }

      const cs = await generate(project);
      if (!cs) { results.push({ project: project.id, status: "generation_failed" }); continue; }

      const slug = `${slugify(cs.title) || "case-study"}-${project.id}`;

      const insRes = await fetch(`${SUPABASE_URL}/rest/v1/case_studies`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          project_id: project.id,
          slug,
          title: cs.title,
          excerpt: cs.excerpt,
          body: cs.body,
          cover_url: project.cover_url || null,
          status: "pending",
        }),
      });

      if (!insRes.ok) {
        const detail = await insRes.text().catch(() => "");
        results.push({ project: project.id, status: "insert_failed", detail });
        continue;
      }

      const rows = await insRes.json();
      const csRow = Array.isArray(rows) ? rows[0] : rows;

      // Link + flip the project to 'generated' so it isn't picked up again
      await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.${encodeURIComponent(project.id)}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "generated", case_study_id: csRow?.id ?? null }),
      });

      generated += 1;
      results.push({ project: project.id, status: "generated", slug });
    } catch (err) {
      results.push({ project: project.id, status: "error", detail: String(err?.message || err) });
    }
  }

  return json({ ok: true, generated, total: projects.length, results });
}
