import React from "react";
import { CheckCircle, FileDown, ArrowLeft, RefreshCw } from "lucide-react";

export default function YieldPrediction({ crop = "Wheat", params = {} }) {
  const handleDownload = () => {
    console.log("Downloading report...");
    // Implement PDF/CSV download logic here
  };

  const handleNewAnalysis = () => {
    console.log("Start new analysis...");
    // Navigate to analysis form
  };

  const handleBack = () => {
    console.log("Back to main...");
    // Navigate to main page
  };

  return (
    <div className="min-h-scree flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-6">
          🌿 Recommended Crop
        </h2>

        {/* Crop Result */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border rounded-xl p-6 mb-4 shadow-sm">
          <h3 className="text-3xl font-extrabold text-green-700">
            {crop}
          </h3>
          <p className="text-gray-500 mt-2">
            Best crop for your soil conditions
          </p>
        </div>

        {/* Parameters (Loop Display) */}
        <div className="text-left text-sm text-gray-600 mb-6">
          {Object.entries(params).length > 0 ? (
            <ul className="list-disc list-inside">
              {Object.entries(params).map(([key, value]) => (
                <li key={key}>
                  <span className="font-semibold capitalize">{key}:</span>{" "}
                  {value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">
              No soil parameters available
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleDownload}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition"
          >
            <FileDown className="w-5 h-5" /> Download Report
          </button>

          <button
            onClick={handleNewAnalysis}
            className="w-full border-2 border-blue-500 text-blue-600 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition"
          >
            <RefreshCw className="w-5 h-5" /> New Analysis
          </button>

          <button
            onClick={handleBack}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Main
          </button>
        </div>

        {/* Footer Features */}
        <div className="flex justify-around text-gray-500 text-sm mt-8">
          <div className="text-center">
            🎯 <p className="mt-1">AI Powered</p>
          </div>
          <div className="text-center">
            📊 <p className="mt-1">Data Driven</p>
          </div>
          <div className="text-center">
            🌱 <p className="mt-1">Optimized</p>
          </div>
        </div>
      </div>
    </div>
  );
}
