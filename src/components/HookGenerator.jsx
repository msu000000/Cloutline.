import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import generateHook from "../utils/generateHook";

export default function HookGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const hooks = await generateHook(prompt);
      navigate("/result", { state: { hooks } });
    } catch (err) {
      console.error("Error generating hooks:", err);
      alert("Failed to generate hooks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Generate Hooks</h2>
      <textarea
        className="w-full border rounded-lg p-3 mb-4 resize-none"
        rows={4}
        placeholder="Enter your topic or description..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        {loading ? "Generating..." : "Generate"}
