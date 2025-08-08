export default async function generateHook(topic, tone = "dramatic") {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, tone }),
  });
  if (!res.ok) throw new Error("Generation failed");
  const data = await res.json();
  return data.hooks || [];
}
