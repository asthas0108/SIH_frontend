import React, { useState } from "react";
import { Upload, Camera, ArrowLeft, Sparkles, Zap, Target, Heart, Leaf, CheckCircle, CameraIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlantDiseaseDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    console.log("Analyzing plant health for:", selectedFile.name);

    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsAnalyzing(false);
  };

  const handleBack = () => {
    navigate("/");
    console.log("Navigating back to main");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col items-center p-4 sm:p-6">

      <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-5 shadow-inner">
            <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-amber-500" />
            AI-Powered Plant Health Analysis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload an image of your plant leaves to detect diseases, nutrient deficiencies,
            and get personalized treatment recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-2xl p-8 cursor-pointer hover:border-green-500 transition-all duration-300 bg-green-50/50 hover:bg-green-50 group"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-700 text-center font-medium">
                <span className="text-green-700 font-semibold">
                  Drop your plant image here
                </span>{" "}
                <br />
                or click to browse files
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports JPG, PNG, WebP formats • Max 10MB
              </p>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button className="w-full flex items-center justify-center gap-3 bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-200 hover:bg-blue-100 transition-all">
              <Camera className="w-5 h-5" />
              <span>Take Photo with Camera</span>
            </button>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CameraIcon className="w-8 h-8 text-green-900" strokeWidth={1.5} />
              Image Preview
            </h3>
            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-center p-6 min-h-[250px]">
              {selectedFile ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="max-h-48 rounded-lg shadow-md mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-600">{selectedFile.name}</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No image selected</p>
                  <p className="text-sm">Upload an image to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4 pt-6 border-t border-gray-200">
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl ${selectedFile && !isAnalyzing
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing Plant Health...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Plant Health
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full border-2 border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>BACK TO MAIN</span>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200">
          {[
            { icon: <Target className="w-5 h-5 text-green-600" />, label: "Accurate", desc: "Advanced ML algorithms with 95%+ accuracy in disease identification" },
            { icon: <Zap className="w-5 h-5 text-amber-600" />, label: "Instant Results", desc: "Get comprehensive analysis within seconds of uploading" },
            { icon: <Heart className="w-5 h-5 text-blue-600" />, label: "Smart", desc: "Detailed treatment suggestions and organic remedies" },
            { icon: <Leaf className="w-5 h-5 text-blue-600" />, label: "multi-crop support", desc: "Works with various crops, vegetables, and ornamental plants" },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mb-2">
                {feature.icon}
              </div>
              <p className="text-xs font-semibold text-gray-700">{feature.label}</p>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Our AI analyzes crop with multi parameters to find the disease that could harm your plant even a single percent.
          </p>
        </div>
        
      </div>

    </div>
  );
}

export default PlantDiseaseDetection;