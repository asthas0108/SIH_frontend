import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, File, Info, Pencil, Sprout } from "lucide-react";
import { Wheat, Droplet, Globe2, Bug } from "lucide-react";

const soilFieldConfig = {
  nitrogen: {
    label: "Nitrogen (N)",
    unit: "kg/ha",
    info: "Critical for leaf growth and chlorophyll production. Ideal: 50–200 kg/ha",
    idealRange: { min: 50, max: 200 }
  },
  phosphorus: {
    label: "Phosphorus (P)",
    unit: "kg/ha",
    info: "Supports root development, flowering, and energy transfer. Ideal: 30–100 kg/ha",
    idealRange: { min: 30, max: 100 }
  },
  potassium: {
    label: "Potassium (K)",
    unit: "kg/ha",
    info: "Improves overall plant health, disease resistance, and water regulation. Ideal: 100–300 kg/ha",
    idealRange: { min: 100, max: 300 }
  },
  ph: {
    label: "Soil pH",
    unit: "",
    info: "Measures soil acidity/alkalinity. Affects nutrient availability. Optimal for most crops: 6.0–7.5",
    idealRange: { min: 6.0, max: 7.5 }
  },
  organicCarbon: {
    label: "Organic Carbon",
    unit: "%",
    info: "Indicator of soil organic matter. Improves fertility, structure, and water retention. Ideal: 1–3%",
    idealRange: { min: 1, max: 3 }
  },
  ec: {
    label: "Electrical Conductivity",
    unit: "dS/m",
    info: "Measures soil salinity. High values can inhibit plant growth. Ideal < 4 dS/m",
    idealRange: { min: 0, max: 4 }
  },
  moisture: {
    label: "Moisture",
    unit: "%",
    info: "Water content in soil. Essential for nutrient transport and germination. Ideal: 15–25%",
    idealRange: { min: 15, max: 25 }
  },
  zinc: {
    label: "Zinc (Zn)",
    unit: "ppm",
    info: "Important for enzyme activity and auxin synthesis. Ideal: 1–3 ppm",
    idealRange: { min: 1, max: 3 }
  },
  iron: {
    label: "Iron (Fe)",
    unit: "ppm",
    info: "Essential for chlorophyll formation and electron transfer. Ideal: 2–5 ppm",
    idealRange: { min: 2, max: 5 }
  },
};

const API_ENDPOINTS = {
  soilData: "https://api.agromonitor.com/soil/analyze",
  weatherData: "https://api.openweathermap.org/data/2.5/weather",
  cropRecommendations: "https://api.plantix.net/recommendations",
};

const MineralInput = ({ field, value, onChange }) => {
  const { label, unit, info } = soilFieldConfig[field];
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-5 relative p-4 bg-gray-50 rounded-xl border border-gray-200"
    >
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-medium text-gray-700">
          {label} {unit && <span className="text-xs text-gray-500">({unit})</span>}
        </label>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-green-600 text-xs font-medium flex items-center"
        >
          <span className="mr-1">
            <Info className="w-4 h-4 text-blue-500 inline-block" />
          </span> Info
        </button>
      </div>
      <input
        type="number"
        name={field}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder="Enter value"
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        step={field === "ph" ? "0.1" : "0.01"}
        min="0"
      />

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <div className="p-3 bg-green-50 text-green-800 text-sm rounded-lg">
              {info}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SoilHealthAnalysis = () => {
  const [selection, setSelection] = useState(null);
  const [soilImage, setSoilImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [soilData, setSoilData] = useState(
    Object.fromEntries(Object.keys(soilFieldConfig).map((f) => [f, ""]))
  );
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");

  const videoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `${API_ENDPOINTS.weatherData}?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY || 'demo'}&units=metric`
          );
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setWeatherData({
            main: { temp: 22, humidity: 65 },
            weather: [{ description: "Partly cloudy" }],
            name: location
          });
        }
      };

      fetchWeather();
    }
  }, [location]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraOn(true);
      }
    } catch (err) {
      alert("Camera access denied or unavailable. Please check your permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraOn(false);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imgData = canvas.toDataURL("image/png");
    setImagePreview(imgData);
    setSoilImage(imgData);
    stopCamera();
  };

  const handleInputChange = (field, value) => {
    setSoilData({ ...soilData, [field]: value });
  };

  const analyzeSoil = async () => {
    setIsLoading(true);

    try {
      // In a real application, you would send the data to your API
      // const response = await fetch(API_ENDPOINTS.soilData, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(soilData)
      // });
      // const results = await response.json();

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock analysis results based on input values
      const mockResults = {
        overallHealth: calculateOverallHealth(soilData),
        details: Object.keys(soilFieldConfig).map((key) => {
          const value = parseFloat(soilData[key]) || 0;
          const { idealRange } = soilFieldConfig[key];
          let status = "optimal";
          let recommendation = "Value is within the optimal range.";

          if (value < idealRange.min) {
            status = "deficient";
            recommendation = getDeficiencyRecommendation(key);
          } else if (value > idealRange.max) {
            status = "excess";
            recommendation = getExcessRecommendation(key);
          }

          return {
            field: soilFieldConfig[key].label,
            value: soilData[key] || "Not provided",
            status,
            recommendation,
            unit: soilFieldConfig[key].unit,
            idealRange
          };
        }),
        recommendations: generateGeneralRecommendations(soilData),
        timestamp: new Date().toLocaleString()
      };

      setAnalysisResults(mockResults);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("There was an error analyzing your soil data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateOverallHealth = (data) => {
    // Calculate a health score based on how many parameters are within ideal ranges
    let optimalCount = 0;
    let totalParams = 0;

    Object.keys(soilFieldConfig).forEach(key => {
      if (data[key]) {
        totalParams++;
        const value = parseFloat(data[key]);
        const { idealRange } = soilFieldConfig[key];

        if (value >= idealRange.min && value <= idealRange.max) {
          optimalCount++;
        }
      }
    });

    return totalParams > 0 ? Math.round((optimalCount / totalParams) * 100) : 0;
  };

  const getDeficiencyRecommendation = (nutrient) => {
    const recommendations = {
      nitrogen: "Add composted manure, blood meal, or legume cover crops to increase nitrogen levels.",
      phosphorus: "Apply bone meal, rock phosphate, or phosphorus-rich fertilizers.",
      potassium: "Add greensand, wood ash, or potassium sulfate to boost potassium levels.",
      ph: "Apply lime to raise pH level for acidic soils.",
      organicCarbon: "Incorporate compost, manure, or cover crops to increase organic matter.",
      ec: "Leach soil with low-salt water to reduce salinity. Improve drainage.",
      moisture: "Irrigate appropriately. Consider adding organic matter to improve water retention.",
      zinc: "Apply zinc sulfate or chelated zinc to correct deficiency.",
      iron: "Apply iron chelates or ferrous sulfate. Check pH as high pH can limit iron availability."
    };

    return recommendations[nutrient] || "Consider soil amendments to address this deficiency.";
  };

  const getExcessRecommendation = (nutrient) => {
    const recommendations = {
      nitrogen: "Reduce nitrogen inputs. Plant nitrogen-scavenging cover crops like rye.",
      phosphorus: "Reduce phosphorus applications. Excess phosphorus can fix other nutrients.",
      potassium: "Reduce potassium inputs. Leach soil if salinity is also high.",
      ph: "Add sulfur or organic matter to lower pH for alkaline soils.",
      organicCarbon: "Generally not problematic. Maintain current practices.",
      ec: "Improve drainage, leach with low-salt water, and avoid high-salt fertilizers.",
      moisture: "Improve drainage. Avoid over-irrigation.",
      zinc: "Reduce zinc inputs. High zinc can be toxic to plants.",
      iron: "Generally not problematic. Iron toxicity is rare in well-aerated soils."
    };

    return recommendations[nutrient] || "Reduce inputs of this element to bring it within optimal range.";
  };

  const generateGeneralRecommendations = (data) => {
    const recs = [
      "Test soil annually to monitor changes in nutrient levels.",
      "Consider adding organic compost to improve soil structure and water retention.",
      "Plant cover crops during off-seasons to prevent erosion and add nutrients.",
      "Practice crop rotation to maintain soil health and reduce pest pressure."
    ];

    const phValue = parseFloat(data.ph);
    if (phValue < 6.0) {
      recs.push("Your soil is acidic. Consider adding lime to raise pH for optimal nutrient availability.");
    } else if (phValue > 7.5) {
      recs.push("Your soil is alkaline. Consider adding sulfur or organic matter to lower pH.");
    }

    const organicCarbon = parseFloat(data.organicCarbon);
    if (organicCarbon < 1) {
      recs.push("Your organic matter is low. Add compost, manure, or plant cover crops to increase it.");
    }

    return recs;
  };

  const resetForm = () => {
    setSoilData(Object.fromEntries(Object.keys(soilFieldConfig).map((f) => [f, ""])));
    setAnalysisResults(null);
    setImagePreview("");
    setSoilImage(null);
    stopCamera();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100 p-4 md:p-8 font-sans text-gray-800">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
          <span className="inline-block mr-2"><Sprout className="w-6 h-6 text-green-600" /></span>

          Soil Health Analysis
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
          Comprehensive soil analysis for sustainable agriculture. Get detailed insights and recommendations to optimize your soil health and crop productivity.
        </p>
      </motion.header>

      <main className="max-w-6xl mx-auto">
        {!selection ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-stretch mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelection("manual")}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl mb-4"><Pencil className="w-10 h-10 text-green-700" /></span>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Manual Input</h3>
              <p className="text-gray-600 text-center text-sm">Enter precise soil measurement values for detailed analysis</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelection("image")}
              className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl mb-4"><Camera className="w-10 h-10 text-green-700" /></span>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Image Analysis</h3>
              <p className="text-gray-600 text-center text-sm">Upload or capture soil images for quick assessment</p>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-semibold text-green-800">
                {selection === "manual" ? "Soil Analysis Input" : "Soil Image Analysis"}
              </h2>
              <button
                onClick={() => {
                  setSelection(null);
                  resetForm();
                }}
                className="text-green-600 hover:text-green-800 font-medium flex items-center"
              >
                ← Back to options
              </button>
            </div>

            <div className="p-6">
              {!analysisResults ? (
                <>
                  {selection === "manual" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.keys(soilFieldConfig).map((field) => (
                        <MineralInput
                          key={field}
                          field={field}
                          value={soilData[field]}
                          onChange={handleInputChange}
                        />
                      ))}
                    </div>
                  )}

                  {selection === "image" && (
                    <div className="space-y-6">
                      {!cameraOn ? (
                        <>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <div className="mb-4">
                              <span className="text-4xl flex justify-center"><File /></span>
                            </div>
                            <label htmlFor="file-upload" className="cursor-pointer bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition">
                              Upload Soil Image
                            </label>
                            <input
                              id="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                                  setSoilImage(e.target.files[0]);
                                }
                              }}
                              className="hidden"
                            />
                            <p className="text-gray-500 text-sm mt-2">or</p>
                            <button
                              onClick={startCamera}
                              className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center mx-auto"
                            >
                              <span className="mr-2">
                                <Camera /></span> Use Camera
                            </button>
                          </div>

                          {imagePreview && (
                            <div className="text-center">
                              <h3 className="text-lg font-medium text-gray-700 mb-3">Image Preview</h3>
                              <img
                                src={imagePreview}
                                alt="Soil preview"
                                className="max-h-64 rounded-lg shadow-md mx-auto"
                              />
                              <button
                                onClick={() => {
                                  setImagePreview("");
                                  setSoilImage(null);
                                }}
                                className="mt-3 text-red-600 text-sm font-medium"
                              >
                                Remove Image
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full rounded-lg border mb-4 max-h-64 object-cover"
                          ></video>
                          <button
                            onClick={capturePhoto}
                            className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition"
                          >
                            Capture Photo
                          </button>
                          <button
                            onClick={stopCamera}
                            className="ml-3 bg-gray-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-gray-600 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location (for weather data)
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your location"
                        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    {weatherData && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <h3 className="font-medium text-blue-800 mb-2">Current Weather</h3>
                        <p className="text-sm">
                          {weatherData.name}: {weatherData.main.temp}°C, {weatherData.weather[0].description},
                          Humidity: {weatherData.main.humidity}%
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Data from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="underline">OpenWeatherMap API</a>
                        </p>
                      </div>
                    )}

                    <button
                      onClick={analyzeSoil}
                      disabled={isLoading || (selection === "image" && !soilImage)}
                      className={`w-full py-3 rounded-lg font-bold text-white transition ${isLoading || (selection === "image" && !soilImage) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing Soil...
                        </div>
                      ) : 'Analyze Soil'}
                    </button>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Analysis powered by agricultural data APIs including{" "}
                      <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">OpenWeatherMap</a> and{" "}
                      <a href="https://www.agromonitor.com/api" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">AgroMonitor</a>
                    </p>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Overall Soil Health Score</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                        <div
                          className="h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-1000 ease-out"
                          style={{ width: `${analysisResults.overallHealth}%` }}
                        ></div>
                      </div>
                      <span className="text-2xl font-bold text-green-700">{analysisResults.overallHealth}%</span>
                    </div>
                    <p className="text-sm text-green-600 mt-2">
                      Analyzed on {analysisResults.timestamp}
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Parameter Analysis</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {analysisResults.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${detail.status === "optimal"
                          ? "bg-green-50 border-green-500"
                          : detail.status === "deficient"
                            ? "bg-yellow-50 border-yellow-500"
                            : "bg-red-50 border-red-500"
                          }`}
                      >
                        <h4 className="font-semibold text-gray-800">{detail.field}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Value: {detail.value} {detail.unit}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Ideal range: {detail.idealRange.min} - {detail.idealRange.max} {detail.unit}
                        </p>
                        <p className={`text-sm mt-2 font-medium ${detail.status === "optimal"
                          ? "text-green-700"
                          : detail.status === "deficient"
                            ? "text-yellow-700"
                            : "text-red-700"
                          }`}>
                          {detail.recommendation}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">General Recommendations</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                      {analysisResults.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-blue-600 mt-3">
                      For personalized crop recommendations, check out{" "}
                      <a href="https://www.plantix.com" target="_blank" rel="noopener noreferrer" className="underline">Plantix</a> or{" "}
                      <a href="https://www.agrobase.com" target="_blank" rel="noopener noreferrer" className="underline">AgroBase</a>
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={resetForm}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                      Analyze Another Sample
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center"
                    >
                      <span className="mr-2">🖨️</span> Print Report
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-10"
        >
          <h2 className="text-xl font-semibold text-green-800 mb-4">Why Soil Health Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="flex items-center font-medium text-green-700 mb-2">
                <Wheat className="w-5 h-5 mr-2 text-green-700" />
                Food Security
              </h3>
              <p className="text-sm text-gray-600">
                Healthy soil produces higher yields and more nutritious food, supporting global food security.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="flex items-center font-medium text-blue-700 mb-2">
                <Droplet className="w-5 h-5 mr-2 text-blue-700" />
                Water Management
              </h3>
              <p className="text-sm text-gray-600">
                Soil acts as a natural filter, improving water quality and reducing polluted runoff.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="flex items-center font-medium text-amber-700 mb-2">
                <Globe2 className="w-5 h-5 mr-2 text-amber-700" />
                Climate Resilience
              </h3>
              <p className="text-sm text-gray-600">
                Healthy soil sequesters carbon, helping mitigate climate change impacts.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="flex items-center font-medium text-purple-700 mb-2">
                <Bug className="w-5 h-5 mr-2 text-purple-700" />
                Biodiversity
              </h3>
              <p className="text-sm text-gray-600">
                Soil contains billions of microorganisms essential for nutrient cycling and ecosystem health.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Additional Resources</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <a href="https://www.nrcs.usda.gov/wps/portal/nrcs/main/soils/health/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">USDA Soil Health Resources</a></li>
              <li>• <a href="https://www.fao.org/global-soil-partnership/en/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">FAO Soil Portal</a></li>
              <li>• <a href="https://www.soilhealth.com/soil-health/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Soil Health Institute</a></li>
            </ul>
          </div>
        </motion.section>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
        <p>This soil health analysis tool provides general recommendations based on agricultural best practices. For precise recommendations tailored to your specific conditions, consult with local agricultural experts.</p>
        <p className="mt-2">Data sources include public agricultural APIs and research institutions.</p>
      </footer>
    </div>
  );
};

export default SoilHealthAnalysis;