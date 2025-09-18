import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Thermometer,
  Droplets,
  CloudRain,
  BarChart3,
  Zap,
  Target,
  Sparkles,
  Info,
  Shapes,
  AlertTriangle,
  Calendar,
  Cloud,
  Package,
  AlertCircle,
  TrendingDown,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CropRecommendationSystem = () => {
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    Ph: "",
    Rainfall: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch("http://localhost:8000/crop_recommendation/recommendations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      fetchRecommendations();
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8000/crop_recommendation/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setResults(data);

      // Refresh recommendations after new prediction
      const recRes = await fetch("http://localhost:8000/recommendations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (recRes.ok) {
        const recData = await recRes.json();
        setRecommendations(recData.recommendations || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get crop recommendation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewAnalysis = () => {
    setResults(null);
    setError(null);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SuitabilityBadge = ({ score }) => {
    const scoreText = String(score);
    let bgColor, textColor, icon;
    if (scoreText.includes("Very Low")) {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      icon = <AlertTriangle className="w-5 h-5" />;
    } else if (scoreText.includes("Low")) {
      bgColor = "bg-orange-100";
      textColor = "text-orange-800";
      icon = <AlertCircle className="w-5 h-5" />;
    } else if (scoreText.includes("Medium")) {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      icon = <TrendingDown className="w-5 h-5" />;
    } else {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      icon = <Sparkles className="w-5 h-5" />;
    }

    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`inline-flex items-center px-4 py-2 rounded-full ${bgColor} ${textColor} font-semibold`}
      >
        {icon}
        <span className="ml-2">{scoreText}</span>
      </motion.div>
    );
  };

  const inputFields = [
    {
      name: "Nitrogen",
      placeholder: "Nitrogen (N) level",
      icon: <Shapes className="w-4 h-4" />,
      tooltip: "Nitrogen content in soil (0–140 kg/ha)",
      min: 0,
      max: 140,
    },
    {
      name: "Phosphorus",
      placeholder: "Phosphorus (P) level",
      icon: <Shapes className="w-4 h-4" />,
      tooltip: "Phosphorus content in soil (5–205 kg/ha)",
      min: 5,
      max: 205,
    },
    {
      name: "Potassium",
      placeholder: "Potassium (K) level",
      icon: <Shapes className="w-4 h-4" />,
      tooltip: "Potassium content in soil (5–205 kg/ha)",
      min: 5,
      max: 205,
    },
    {
      name: "Temperature",
      placeholder: "Temperature (°C)",
      icon: <Thermometer className="w-4 h-4" />,
      tooltip: "Recommended range: 8°C – 45°C",
      min: 8,
      max: 45,
      step: 0.1,
    },
    {
      name: "Humidity",
      placeholder: "Humidity (%)",
      icon: <Droplets className="w-4 h-4" />,
      tooltip: "Humidity percentage in air (14% – 100%)",
      min: 14,
      max: 100,
    },
    {
      name: "Ph",
      placeholder: "Soil pH level",
      icon: <Shapes className="w-4 h-4" />,
      tooltip: "Soil pH range: 3.5 – 9.5",
      min: 3.5,
      max: 9.5,
      step: 0.1,
    },
    {
      name: "Rainfall",
      placeholder: "Rainfall (mm)",
      icon: <CloudRain className="w-4 h-4" />,
      tooltip: "Rainfall range: 20 – 300 mm",
      min: 20,
      max: 300,
    },
  ];

  const firstColumnFields = inputFields.slice(0, 4);
  const secondColumnFields = inputFields.slice(4);

  const PastRecommendations = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 mt-10"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-green-600" />
        Past Recommendations
      </h2>
      {recommendations.length === 0 ? (
        <p className="text-gray-500">No past recommendations found.</p>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-600" />
                    {rec.predicted_crop}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(rec.created_at).toLocaleString()}
                  </p>
                </div>
                <SuitabilityBadge score={rec.suitability_score} />
              </div>

              <div className="mt-3">
                <button
                  onClick={() => toggleSection(`rec-${rec.id}`)}
                  className="flex items-center gap-1 text-sm text-green-600 hover:underline"
                >
                  {expandedSections[`rec-${rec.id}`]
                    ? "Hide Details"
                    : "View Details"}
                  {expandedSections[`rec-${rec.id}`] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {expandedSections[`rec-${rec.id}`] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-2 text-sm text-gray-600"
                  >
                    <p>
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Planting: {rec.best_planting_time}
                    </p>
                    <p>
                      <Cloud className="inline w-4 h-4 mr-1" />
                      Harvest: {rec.harvest_period}
                    </p>
                    <p>
                      <Droplets className="inline w-4 h-4 mr-1" />
                      Water: {rec.water_requirements}
                    </p>
                    <p>
                      <Zap className="inline w-4 h-4 mr-1" />
                      Fertilizer: {rec.fertilizer_recommendations}
                    </p>
                    <p>
                      <Thermometer className="inline w-4 h-4 mr-1" />
                      Soil: {rec.soil_condition}
                    </p>
                    <p>
                      <Sparkles className="inline w-4 h-4 mr-1" />
                      Summary: {rec.summary}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-4xl"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4 shadow-inner"
            >
              <Leaf className="w-8 h-8 text-green-600" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Crop Recommendation System
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your soil and weather parameters for AI-powered crop suggestions
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
            >
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-5">
                {firstColumnFields.map((field) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative group"
                  >
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
                  </motion.div>
                ))}
              </div>

              <div className="space-y-5">
                {secondColumnFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="relative group"
                  >
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
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4 pt-6 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="rounded-full h-5 w-5 border-b-2 border-white"
                  ></motion.div>
                ) : (
                  <Sparkles className="w-5 h-5 cursor-pointer" />
                )}
                <span className="cursor-pointer">
                  {isSubmitting ? "ANALYZING..." : "PREDICT CROP"}
                </span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {recommendations.length > 0 && <PastRecommendations />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full p-3 mr-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Crop Analysis Result</h1>
                <p className="text-gray-600">Detailed assessment for your selected parameters</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SuitabilityBadge score={results.suitability_score} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewAnalysis}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Analysis
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 rounded-full p-3 mr-4">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Recommended Crop</h2>
                <p className="text-emerald-100">Based on your soil and climate parameters</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold">{results.predicted_crop}</div>
              <div className="text-emerald-100 text-sm">Predicted with AI Analysis</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                Input Parameters
              </h2>
              <div className="space-y-4">
                {Object.entries(formData).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{key}</span>
                      <span className="text-sm font-semibold text-gray-900">{value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {["planting", "harvest", "water", "fertilizer", "soil"].map((section) => {
              const titles = {
                planting: "Planting Time",
                harvest: "Harvest Period",
                water: "Water Requirements",
                fertilizer: "Fertilizer Recommendations",
                soil: "Soil Condition",
              };
              const icons = {
                planting: <Calendar className="w-5 h-5 mr-3 text-blue-600" />,
                harvest: <Cloud className="w-5 h-5 mr-3 text-green-600" />,
                water: <Droplets className="w-5 h-5 mr-3 text-teal-600" />,
                fertilizer: <Zap className="w-5 h-5 mr-3 text-yellow-600" />,
                soil: <Thermometer className="w-5 h-5 mr-3 text-orange-600" />,
              };
              const values = {
                planting: results.best_planting_time,
                harvest: results.harvest_period,
                water: results.water_requirements,
                fertilizer: results.fertilizer_recommendations,
                soil: results.soil_condition,
              };
              const colors = {
                planting: "border-blue-500 bg-blue-50",
                harvest: "border-green-500 bg-green-50",
                water: "border-teal-500 bg-teal-50",
                fertilizer: "border-yellow-500 bg-yellow-50",
                soil: "border-orange-500 bg-orange-50",
              };

              return (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  key={section}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer ${colors[section]} ${expandedSections[section] ? "bg-opacity-70" : ""
                    }`}
                  onClick={() => toggleSection(section)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {icons[section]}
                      <h3 className="font-semibold text-gray-700">{titles[section]}</h3>
                    </div>
                    {expandedSections[section] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                  <AnimatePresence>
                    {expandedSections[section] && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-600 mt-2"
                      >
                        {values[section]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden my-8"
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-3">
            <Sparkles className="w-6 h-6 text-white" />
            <h2 className="text-lg md:text-xl font-semibold text-white">Expert Summary</h2>
          </div>
          <div className="p-6">
            <div className="relative bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="absolute -top-3 -left-3 bg-amber-500 text-white p-2 rounded-full shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-gray-700 leading-relaxed italic">{results.summary}</p>
            </div>
          </div>
        </motion.div>

        {/* Risk Factors */}
        {results.risk_factors && results.risk_factors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              Risk Factors
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {results.risk_factors.map((risk, idx) => (
                <li key={idx}>{risk}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {recommendations.length > 0 && <PastRecommendations />}
      </div>
    </div>
  );
};

export default CropRecommendationSystem;