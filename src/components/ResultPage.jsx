import React from "react";

export default function ResultPage({ hooks }) {
  if (!hooks || hooks.length === 0) {
    return <p className="text-center text-gray-500">No hooks generated yet.</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Hooks</h2>
      <div className="space-y-4">
        {hooks.map((hook, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <p className="text-gray-800">{hook}</p>
            <button
              onClick={() => navigator.clipboard.writeText(hook)}
              className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
