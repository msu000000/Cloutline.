import React from "react";
import HookGenerator from "../components/HookGenerator";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Cloutline</h1>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        Generate scroll-stopping hooks for your Reels, Shorts, or TikToks in seconds.
      </p>
      <HookGenerator />
    </div>
  );
}
