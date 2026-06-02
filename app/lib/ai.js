export async function fetchAIReply(messages, sessionId, signal) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages, sessionId }),
    signal,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Chat API request failed");
  }

  const data = await res.json();
  return data;
}
