// api/generate.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { topic = "", tone = "dramatic" } = req.body || {};
  if (!topic) return res.status(400).json({ error: "Missing topic" });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.status(500).json({ error: "OpenAI key not set" });

  try {
    const prompt = `Create 3 detailed, scroll-stopping short-form video hooks for the topic "${topic}". 
Each hook must include:
1) a brief scene direction (what to show)
2) a hook line (text/speech)
3) timing or editing suggestion.
Return JSON array of hooks.`;

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 600,
      }),
    });

    const j = await r.json();
    const text = j.choices?.[0]?.message?.content ?? "";
    // We'll try to parse hooks by splitting on double newlines.
    const blocks = text.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
    // If blocks are not structured, just return the raw text as one block.
    const hooks = blocks.length ? blocks : [text];
    return res.status(200).json({ hooks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OpenAI request failed" });
  }
}
