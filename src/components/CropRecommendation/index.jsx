import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Leaf, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  BarChart3, 
  ArrowLeft,
  Zap,
  Target,
  Sparkles,
  Info,
  Shapes
} from "lucide-react";

const CropRecommendationForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted:", formData);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
  };

  const handleBack = () => {
    navigate("/");
    console.log("Back to main clicked");
  };

  const inputFields = [
    {
      name: "nitrogen",
      placeholder: "Nitrogen (N) level",
      icon: <Shapes className="w-4 h-4" />,
      tooltip: "Nitrogen content in soil (0–140 kg/ha)",
      min: 0,
      max: 140
    },
    {
      name: "phosphorus",
      placeholder: "Phosphorus (P) level",
      icon: <Shapes className="w-4 h-4" />,
      tooltip: "Phosphorus content in soil (5–205 kg/ha)",
      min: 5,
      max: 205
    },
    {
      name: "potassium",
      placeholder: "Potassium (K) level",
      icon: <Shapes className="w-4 h-4" />,
      tooltip: "Potassium content in soil (5–205 kg/ha)",
      min: 5,
      max: 205
    },
    {
      name: "temperature",
      placeholder: "Temperature (°C)",
      icon: <Thermometer className="w-4 h-4" />,
      tooltip: "Recommended range: 8°C – 45°C",
      min: 8,
      max: 45,
      step: 0.1
    },
    {
      name: "humidity",
      placeholder: "Humidity (%)",
      icon: <Droplets className="w-4 h-4" />,
      tooltip: "Humidity percentage in air (14% – 100%)",
      min: 14,
      max: 100
    },
    {
      name: "ph",
      placeholder: "Soil pH level",
      tooltip: "Soil pH range: 3.5 – 9.5",
      icon: <Shapes className="w-4 h-4" />,
      min: 3.5,
      max: 9.5,
      step: 0.1
    },
    {
      name: "rainfall",
      placeholder: "Rainfall (mm)",
      icon: <CloudRain className="w-4 h-4" />,
      tooltip: "Rainfall range: 20 – 300 mm",
      min: 20,
      max: 300
    }
  ];

  const firstColumnFields = inputFields.slice(0, 4);
  const secondColumnFields = inputFields.slice(4);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-4xl">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4 shadow-inner">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 font-playfair">
            Crop Recommendation System
          </h2>
          <p className="text-gray-600 text-sm">
            Enter your soil and weather parameters for AI-powered crop suggestions
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5">
              {firstColumnFields.map((field) => (
                <div key={field.name} className="relative group">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600 mr-2">{field.icon}</span>
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {field.name}
                    </label>
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      onMouseEnter={() => setShowTooltip(field.name)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step || 1}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                    required
                  />
                  
                  {showTooltip === field.name && (
                    <div className="absolute z-10 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg -top-10 left-0 right-0">
                      {field.tooltip}
                      <div className="absolute bottom-0 left-4 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Min: {field.min}</span>
                    <span>Max: {field.max}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              {secondColumnFields.map((field) => (
                <div key={field.name} className="relative group">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600 mr-2">{field.icon}</span>
                    <label className="text-sm font-medium text-gray-700 capitalize">
                      {field.name}
                    </label>
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      onMouseEnter={() => setShowTooltip(field.name)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step || 1}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                    required
                  />
                  
                  {showTooltip === field.name && (
                    <div className="absolute z-10 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg -top-10 left-0 right-0">
                      {field.tooltip}
                      <div className="absolute bottom-0 left-4 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Min: {field.min}</span>
                    <span>Max: {field.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              <span>{isSubmitting ? "ANALYZING..." : "🌿 PREDICT CROP"}</span>
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
        </form>

        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
          {[
            { icon: <Target className="w-5 h-5 text-green-600" />, label: "Accurate", desc: "Prediction" },
            { icon: <Zap className="w-5 h-5 text-amber-600" />, label: "Instant", desc: "Results" },
            { icon: <BarChart3 className="w-5 h-5 text-blue-600" />, label: "Smart", desc: "Farming" }
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
            Our AI analyzes multiple parameters to recommend the best crops for your specific conditions
          </p>
        </div>
      </div>
    </div>
  );
}

export default CropRecommendationForm