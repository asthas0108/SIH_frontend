import React, { useState } from "react";
import { Upload, Camera, ArrowLeft, Sparkles } from "lucide-react";

export default function PlantDiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    console.log("Analyzing plant health for:", selectedFile.name);
    // Call AI analysis API here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-green-600 text-white rounded-2xl p-6 flex justify-between items-center shadow-md">
        <button className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100">
          <ArrowLeft className="w-4 h-4" /> Back to Main
        </button>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🌱 Plant Disease Detection
        </h1>
        <button className="bg-white text-gray-700 px-3 py-1 rounded-lg shadow hover:bg-gray-100">
          ☀ Light
        </button>
      </div>


      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          🤖 AI Disease Analysis
        </h2>

        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm mb-6">
          ✅ AI Model Ready - Upload an image to begin analysis
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-green-500 transition bg-gray-50"
          >
            <Camera className="w-10 h-10 text-gray-400 mb-3" />
            <p className="text-gray-600 text-center">
              <span className="font-semibold text-green-700">
                Drop your plant image here
              </span>{" "}
              <br />
              or click to browse files
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supports JPG, PNG, WebP formats
            </p>
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

      
          <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="max-h-60 rounded-lg"
              />
            ) : (
              <p className="text-gray-400">📷 Upload an image to get started</p>
            )}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!selectedFile}
          className={`mt-6 w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
            selectedFile
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          Analyze Plant Health
        </button>
      </div>

    
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
          ✨ Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            🎯
            <h3 className="font-bold mt-2">High Accuracy</h3>
            <p className="text-sm text-gray-600">
              Advanced machine learning algorithms for precise disease
              identification
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            ⚡
            <h3 className="font-bold mt-2">Instant Results</h3>
            <p className="text-sm text-gray-600">
              Get comprehensive analysis within seconds of uploading
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            💊
            <h3 className="font-bold mt-2">Treatment Recommendations</h3>
            <p className="text-sm text-gray-600">
              Detailed treatment suggestions and prevention tips
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            🌿
            <h3 className="font-bold mt-2">Multiple Plant Types</h3>
            <p className="text-sm text-gray-600">
              Support for various crops and plant species
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
