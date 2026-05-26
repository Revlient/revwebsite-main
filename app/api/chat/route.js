import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the senior solutions architect and creative director at Revlient (Revlient Intercontinental LLP), a premium, multidisciplinary creative studio crafting 3D-grade websites, software, applications, and custom client workspaces.

Maintain an elegant, minimalist, professional, yet highly creative and senior studio tone. You represent a world-class studio.
Your responses must be structured, concise, and beautiful. Always format with markdown (bolding, lists, code or headers where appropriate). Avoid long paragraphs or walls of text.

When users describe a project or request help:
- Brainstorm and structure their idea with senior-level architecture insight.
- Outline high-level scope, structural recommendations, and aesthetic ideas.
- Suggest a starting point and politely guide them to the contact page at "/contact" or suggest direct communication channels.

Do not fake information or make false promises. Keep the tone collaborative, creative, and extremely polished.`;

function getActionsForResponse(text) {
  const lower = text.toLowerCase();
  const actions = [];
  
  if (
    lower.includes("contact") || 
    lower.includes("human") || 
    lower.includes("whatsapp") || 
    lower.includes("call") || 
    lower.includes("email") ||
    lower.includes("reach out")
  ) {
    actions.push({ label: "Talk to a human", href: "/contact" });
    actions.push({ label: "WhatsApp us", href: "https://wa.me/910000000000", external: true });
  } else if (
    lower.includes("price") || 
    lower.includes("pricing") || 
    lower.includes("cost") || 
    lower.includes("budget") || 
    lower.includes("estimate") ||
    lower.includes("timeline")
  ) {
    actions.push({ label: "Start a project", href: "/contact" });
    actions.push({ label: "See services", href: "/services" });
  } else if (
    lower.includes("work") || 
    lower.includes("portfolio") || 
    lower.includes("case study") || 
    lower.includes("projects") || 
    lower.includes("example")
  ) {
    actions.push({ label: "See our work", href: "/work" });
    actions.push({ label: "Start a project", href: "/contact" });
  } else if (
    lower.includes("service") || 
    lower.includes("what you do") || 
    lower.includes("design") || 
    lower.includes("app") || 
    lower.includes("website") ||
    lower.includes("crm")
  ) {
    actions.push({ label: "See services", href: "/services" });
    actions.push({ label: "Start a project", href: "/contact" });
  } else {
    actions.push({ label: "Start a project", href: "/contact" });
  }
  
  return actions;
}

export async function POST(request) {
  try {
    const { messages } = await request.json();
    
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn("GROQ_API_KEY is not defined in the environment variables.");
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages payload" },
        { status: 400 }
      );
    }

    // Standardize conversation history format and prepend the System Prompt
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content || "",
      })),
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: formattedMessages,
        temperature: 0.5,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API request failed:", response.status, errorText);
      return NextResponse.json(
        { error: `Groq API responded with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText = data?.choices?.[0]?.message?.content || "";
    
    return NextResponse.json({
      text: replyText,
      actions: getActionsForResponse(replyText),
    });
  } catch (error) {
    console.error("Error in AI Chat Route Handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
