import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultPage from "../components/ResultPage";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const hooks = location.state?.hooks || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <ResultPage hooks={hooks} />
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Generate Again
      </button>
    </div>
  );
}
