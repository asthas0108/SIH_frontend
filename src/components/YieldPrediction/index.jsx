import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  FileDown,
  ArrowLeft,
  RefreshCw,
  BarChart3,
  Calendar,
  TrendingUp,
  Leaf,
  Droplets,
  Clock,
  IndianRupee,
  Sprout,
  Loader,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const YieldPrediction = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Year: "",
    average_rain_fall_mm_per_year: "",
    pesticides_tonnes: "",
    avg_temp: "",
    Area: "",
    Item: "",
  });
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const requestData = {
        Year: parseInt(formData.Year),
        average_rain_fall_mm_per_year: parseFloat(
          formData.average_rain_fall_mm_per_year
        ),
        pesticides_tonnes: parseFloat(formData.pesticides_tonnes),
        avg_temp: parseFloat(formData.avg_temp),
        Area: formData.Area,
        Item: formData.Item,
      };

      const response = await fetch(
        "http://127.0.0.1:8000/yeild_prediction/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setPredictionData(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching prediction");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    console.log("Downloading report...");
  };

  const handleNewAnalysis = () => {
    setPredictionData(null);
    setFormData({
      Year: "",
      average_rain_fall_mm_per_year: "",
      pesticides_tonnes: "",
      avg_temp: "",
      Area: "",
      Item: "",
    });
    setError("");
  };

  const handleBack = () => {
    navigate("/");
  };

  const getAdditionalInfo = () => {
    if (!predictionData) return [];
    return [
      { key: "Best Planting Time", value: predictionData.best_planting_time, icon: Clock },
      { key: "Harvest Period", value: predictionData.harvest_period, icon: Calendar },
      { key: "Water Requirements", value: predictionData.water_requirements, icon: Droplets },
      { key: "Fertilizer Recommendation", value: predictionData.fertilizer_recommendations, icon: Sprout },
      { key: "Expected Market Price", value: predictionData.expected_market_price, icon: IndianRupee },
    ];
  };

  if (!predictionData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-emerald-50 via-amber-50 to-teal-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-xl shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-lg md:max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-5 shadow-inner"
            >
              <BarChart3 className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-playfair">
              Crop Yield Prediction
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              Enter your agricultural data to receive accurate crop recommendations and yield predictions.
            </p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "Year *", name: "Year", type: "number", min: 1900, max: 2100 },
                { label: "Average Rainfall (mm/year) *", name: "average_rain_fall_mm_per_year", type: "number", step: "0.01", min: 0 },
                { label: "Pesticides (tonnes) *", name: "pesticides_tonnes", type: "number", step: "0.01", min: 0 },
                { label: "Average Temperature (°C) *", name: "avg_temp", type: "number", step: "0.01", min: -50, max: 60 },
                { label: "Area/Country *", name: "Area", type: "text", placeholder: "e.g., Albania" },
                { label: "Crop Item *", name: "Item", type: "text", placeholder: "e.g., Maize" },
              ].map((field, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    {...field}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    required
                  />
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-xl text-base disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" strokeWidth={2} />
                    <span>Analyzing Data...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" strokeWidth={2} />
                    <span>Get Prediction</span>
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleBack}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md text-base cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                <span>Back to Main</span>
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 via-amber-50 to-teal-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-6xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-5 shadow-inner"
          >
            <CheckCircle className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-playfair">
            Crop Recommendation Analysis
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Based on your soil parameters, local weather conditions, and historical agricultural data.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-10"
        >
          <div className="space-y-7">
            <motion.div variants={cardVariants} className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-2xl p-7 text-center shadow-lg">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                🌾
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2 tracking-wide">
                RECOMMENDED CROP
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4 font-playfair">
                {predictionData.predicted_crop}
              </h3>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
              >
                <Leaf className="w-4 h-4 mr-2" strokeWidth={2} />
                Optimized for your conditions
              </motion.div>
            </motion.div>

            <motion.div variants={cardVariants} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-lg text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <BarChart3 className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold mb-7 text-gray-800">YIELD PREDICTION</h3>
              </div>
              <p className="text-3xl font-bold text-amber-700 mb-2">
                {predictionData.predicted_yield} {predictionData.unit}
              </p>
              <span className="inline-flex items-center bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-800">
                Suitability: {predictionData.suitability_score}
              </span>
            </motion.div>

          </div>

          <div className="space-y-7">
            <motion.div variants={cardVariants} className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center tracking-wide">
                <div className="bg-gray-200 p-2 rounded-full mr-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                </div>
                INPUT PARAMETERS
              </h3>
              <div className="grid gap-3">
                {Object.entries(formData).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <span className="font-medium text-gray-700 text-sm capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="font-semibold text-emerald-700 text-sm bg-emerald-50 px-3 py-1 rounded-full">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-blue-50 mt-7 mb-7 rounded-2xl p-2 shadow-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center tracking-wide">
            <div className="bg-blue-200 p-2 rounded-full mr-3">
              <Calendar className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
            </div>
            FARMING RECOMMENDATIONS
          </h3>
          <div className="space-y-3">
            {getAdditionalInfo().map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center justify-between bg-white p-3 rounded-xl border border-blue-200"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <IconComponent className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.key}:</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-xl ml-2 text-right">
                    {item.value}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl text-base"
          >
            <FileDown className="w-5 h-5" strokeWidth={2} />
            <span>Download Detailed Report</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewAnalysis}
            className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 text-base cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" strokeWidth={2} />
            <span>New Analysis</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md text-base cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            <span>Back to Main</span>
          </motion.button>
        </motion.div>

        {predictionData.summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 bg-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center tracking-wide">
              <div className="bg-emerald-200 p-2 rounded-full mr-3">
                <Leaf className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
              </div>
              ANALYSIS SUMMARY
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed bg-white p-4 rounded-xl border border-emerald-200">
              {predictionData.summary}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 pt-6 border-t border-gray-200 text-center"
        >
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Results are based on AI-driven analysis of soil, weather patterns, and historical data.
            Actual outcomes may vary depending on farming practices and environmental factors.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default YieldPrediction;