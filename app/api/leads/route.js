import { saveLead } from "../../lib/leads";

export async function POST(request) {
  try {
    const lead = await request.json();
    if (!lead || !lead.name || !lead.email) {
      return new Response(JSON.stringify({ error: "Name and Email are required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const saved = await saveLead(lead, { source: "form" });
    return new Response(JSON.stringify({ success: true, lead: saved }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("[leads api] Failed to save lead:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to save lead" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
