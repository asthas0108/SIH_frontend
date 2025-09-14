import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Filter,
  Sprout,
  Scissors,
  Info,
  ChevronDown,
  Sun,
  CloudRain,
  Thermometer,
} from "lucide-react";
import "./CropCalendar.css";

// Enhanced crop data with additional metadata
const cropsData = [
  {
    crop: "Wheat",
    sowing: 11,
    harvesting: 3,
    type: "Cereal",
    duration: "120-150 days",
    season: "Rabi",
    color: "#FFA726",
    icon: "🌾",
  },
  {
    crop: "Rice",
    sowing: 6,
    harvesting: 10,
    type: "Cereal",
    duration: "90-120 days",
    season: "Kharif",
    color: "#66BB6A",
    icon: "🌾",
  },
  {
    crop: "Maize",
    sowing: 5,
    harvesting: 9,
    type: "Cereal",
    duration: "90-110 days",
    season: "Kharif",
    color: "#FFEE58",
    icon: "🌽",
  },
  {
    crop: "Barley",
    sowing: 11,
    harvesting: 4,
    type: "Cereal",
    duration: "110-140 days",
    season: "Rabi",
    color: "#D4AF37",
    icon: "🌾",
  },
  {
    crop: "Sugarcane",
    sowing: 2,
    harvesting: 12,
    type: "Cash Crop",
    duration: "300-365 days",
    season: "Year Round",
    color: "#8BC34A",
    icon: "🎋",
  },
  {
    crop: "Cotton",
    sowing: 6,
    harvesting: 11,
    type: "Cash Crop",
    duration: "150-180 days",
    season: "Kharif",
    color: "#E1F5FE",
    icon: "🤍",
  },
  {
    crop: "Groundnut",
    sowing: 6,
    harvesting: 10,
    type: "Oilseed",
    duration: "90-120 days",
    season: "Kharif",
    color: "#8D6E63",
    icon: "🥜",
  },
  {
    crop: "Soybean",
    sowing: 6,
    harvesting: 9,
    type: "Oilseed",
    duration: "90-110 days",
    season: "Kharif",
    color: "#9CCC65",
    icon: "🫘",
  },
  {
    crop: "Pulses",
    sowing: 10,
    harvesting: 3,
    type: "Legume",
    duration: "90-120 days",
    season: "Rabi",
    color: "#FF8A65",
    icon: "🫛",
  },
  {
    crop: "Mustard",
    sowing: 10,
    harvesting: 2,
    type: "Oilseed",
    duration: "90-120 days",
    season: "Rabi",
    color: "#FFD54F",
    icon: "🌻",
  },
  {
    crop: "Sunflower",
    sowing: 1,
    harvesting: 4,
    type: "Oilseed",
    duration: "90-110 days",
    season: "Summer",
    color: "#FFC107",
    icon: "🌻",
  },
  {
    crop: "Jute",
    sowing: 3,
    harvesting: 7,
    type: "Fiber",
    duration: "120-150 days",
    season: "Summer",
    color: "#A1887F",
    icon: "🌿",
  },
];

const months = [
  "Crop",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const cropTypes = ["All", "Cereal", "Cash Crop", "Oilseed", "Legume", "Fiber"];
const seasons = ["All", "Kharif", "Rabi", "Summer", "Year Round"];

const CropCalendar = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const getFilteredCrops = () => {
    return cropsData.filter((crop) => {
      const typeMatch =
        selectedFilter === "All" || crop.type === selectedFilter;
      const seasonMatch =
        selectedSeason === "All" || crop.season === selectedSeason;
      return typeMatch && seasonMatch;
    });
  };

  const getCropPhase = (crop, monthIndex) => {
    const start = crop.sowing;
    const end =
      crop.harvesting < start ? crop.harvesting + 12 : crop.harvesting;

    for (let i = start; i <= end; i++) {
      const currentMonth = i > 12 ? i - 12 : i;
      if (currentMonth === monthIndex) {
        if (i === start) return "sowing";
        if (i === end) return "harvesting";
        return "growing";
      }
    }
    return null;
  };

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case "sowing":
        return <Sprout className="w-4 h-4" />;
      case "harvesting":
        return <Scissors className="w-4 h-4" />;
      case "growing":
        return <div className="w-3 h-3 bg-green-400 rounded-full" />;
      default:
        return null;
    }
  };

  const getPhaseColor = (phase, crop) => {
    switch (phase) {
      case "sowing":
        return "bg-green-100 border-green-300 text-green-700";
      case "harvesting":
        return "bg-amber-100 border-amber-300 text-amber-700";
      case "growing":
        return `bg-green-50 border-green-200 text-green-600`;
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const LoadingState = () => (
    <div className="loading-container">
      <div className="loading-spinner" />
      <motion.p
        className="text-green-600 font-medium text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Loading crop calendar...
      </motion.p>
    </div>
  );

  if (isLoading) return <LoadingState />;

  const filteredCrops = getFilteredCrops();

  return (
    <div className="crop-calendar min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Crop Calendar</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your farming activities with our interactive crop calendar.
            Track sowing and harvesting seasons for optimal yields.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-700">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="filter-dropdown"
                >
                  {cropTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="filter-dropdown"
                  style={{
                    background:
                      "linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)",
                    borderColor: "#f59e0b",
                    color: "#92400e",
                  }}
                >
                  {seasons.map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-700">Legend</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="legend-item">
              <div className="legend-icon bg-green-100 border-2 border-green-300">
                <Sprout className="w-4 h-4 text-green-700" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Sowing Season
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-icon bg-green-50 border-2 border-green-200">
                <div className="growing-indicator" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Growing Period
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-icon bg-amber-100 border-2 border-amber-300">
                <Scissors className="w-4 h-4 text-amber-700" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Harvesting Season
              </span>
            </div>
          </div>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="overflow-x-auto">
            <div className="calendar-grid">
              {/* Header Row */}
              {months.map((month, index) => (
                <motion.div
                  key={month}
                  className={`month-header ${
                    index === 0 ? "crop-name-cell" : ""
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {month}
                </motion.div>
              ))}

              {/* Crop Rows */}
              {filteredCrops.map((crop, cropIndex) => (
                <React.Fragment key={crop.crop}>
                  {/* Crop Name Cell */}
                  <motion.div
                    className="crop-name-cell"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: cropIndex * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="crop-icon"
                        style={{ backgroundColor: crop.color + "40" }}
                      >
                        {crop.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">
                          {crop.crop}
                        </div>
                        <div className="text-xs text-gray-500">{crop.type}</div>
                        <div className="text-xs text-blue-600 font-medium">
                          {crop.season}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Month Cells */}
                  {Array.from({ length: 12 }, (_, monthIndex) => {
                    const month = monthIndex + 1;
                    const phase = getCropPhase(crop, month);
                    const cellKey = `${crop.crop}-${month}`;

                    return (
                      <motion.div
                        key={cellKey}
                        className={`calendar-cell ${
                          phase
                            ? `phase-${phase}`
                            : "bg-gray-50 hover:bg-gray-100"
                        } ${
                          hoveredCell === cellKey
                            ? "transform scale-105 shadow-lg z-20"
                            : ""
                        }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: cropIndex * 0.1 + monthIndex * 0.02,
                        }}
                        onMouseEnter={() => setHoveredCell(cellKey)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={() =>
                          setSelectedCrop(
                            phase
                              ? { ...crop, phase, month: months[month] }
                              : null
                          )
                        }
                      >
                        <div className="phase-icon">
                          {phase === "sowing" && <Sprout className="w-5 h-5" />}
                          {phase === "harvesting" && (
                            <Scissors className="w-5 h-5" />
                          )}
                          {phase === "growing" && (
                            <div className="growing-indicator" />
                          )}
                          {phase && (
                            <span className="text-xs font-medium capitalize mt-1">
                              {phase === "growing" ? "Growing" : phase}
                            </span>
                          )}
                        </div>

                        {/* Tooltip */}
                        <AnimatePresence>
                          {hoveredCell === cellKey && phase && (
                            <motion.div
                              className="calendar-tooltip"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                            >
                              <div className="text-center">
                                <div className="font-semibold flex items-center gap-2">
                                  <span>{crop.icon}</span>
                                  {crop.crop}
                                </div>
                                <div className="text-sm">
                                  {phase === "sowing" && "🌱 Sowing season"}
                                  {phase === "growing" && "🌿 Growing period"}
                                  {phase === "harvesting" &&
                                    "✂️ Harvesting season"}
                                </div>
                                <div className="text-xs text-gray-300 mt-1">
                                  Duration: {crop.duration}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Crop Details Modal */}
        <AnimatePresence>
          {selectedCrop && (
            <motion.div
              className="modal-backdrop fixed inset-0 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCrop(null)}
            >
              <motion.div
                className="modal-content rounded-xl shadow-2xl p-8 max-w-md w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="crop-detail-icon w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                    style={{ backgroundColor: selectedCrop.color + "40" }}
                  >
                    {selectedCrop.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {selectedCrop.crop}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {selectedCrop.type} • {selectedCrop.season}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Current Phase:</span>
                    <span className="capitalize text-green-600 font-semibold">
                      {selectedCrop.phase} in {selectedCrop.month}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">Duration:</span>
                    <span>{selectedCrop.duration}</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedCrop(null)}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CropCalendar;
