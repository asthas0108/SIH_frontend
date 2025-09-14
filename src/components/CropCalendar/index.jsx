import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Search,
  Filter,
  Download,
  ChevronDown,
  Sprout,
  Wheat,
  Leaf,
  Sun,
  Droplets,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CropCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState("all");
  const navigate = useNavigate();

  // Comprehensive crop data with more details
  const crops = [
    {
      crop: "Wheat",
      sowing: 11,
      harvesting: 3,
      category: "cereal",
      season: "rabi",
      color: "#F59E0B",
      description: "Major winter crop, best sown in November",
    },
    {
      crop: "Rice",
      sowing: 6,
      harvesting: 10,
      category: "cereal",
      season: "kharif",
      color: "#10B981",
      description: "Main monsoon crop, requires adequate water",
    },
    {
      crop: "Maize",
      sowing: 5,
      harvesting: 9,
      category: "cereal",
      season: "kharif",
      color: "#F97316",
      description: "Versatile crop, can be grown in multiple seasons",
    },
    {
      crop: "Barley",
      sowing: 11,
      harvesting: 4,
      category: "cereal",
      season: "rabi",
      color: "#8B5CF6",
      description: "Hardy winter crop, drought resistant",
    },
    {
      crop: "Sugarcane",
      sowing: 2,
      harvesting: 12,
      category: "cash",
      season: "perennial",
      color: "#06B6D4",
      description: "Long duration crop, requires 12-18 months",
    },
    {
      crop: "Cotton",
      sowing: 6,
      harvesting: 11,
      category: "fiber",
      season: "kharif",
      color: "#EC4899",
      description: "Important cash crop, needs warm climate",
    },
    {
      crop: "Groundnut",
      sowing: 6,
      harvesting: 10,
      category: "oilseed",
      season: "kharif",
      color: "#84CC16",
      description: "Oil-rich legume, improves soil fertility",
    },
    {
      crop: "Soybean",
      sowing: 6,
      harvesting: 9,
      category: "oilseed",
      season: "kharif",
      color: "#14B8A6",
      description: "Protein-rich crop, good for monsoon season",
    },
    {
      crop: "Pulses",
      sowing: 10,
      harvesting: 3,
      category: "legume",
      season: "rabi",
      color: "#F43F5E",
      description: "Essential protein crops, nitrogen fixers",
    },
    {
      crop: "Mustard",
      sowing: 10,
      harvesting: 2,
      category: "oilseed",
      season: "rabi",
      color: "#EAB308",
      description: "Winter oilseed crop, yellow flowers",
    },
    {
      crop: "Sunflower",
      sowing: 1,
      harvesting: 4,
      category: "oilseed",
      season: "summer",
      color: "#F59E0B",
      description: "Summer crop, follows the sun",
    },
    {
      crop: "Jute",
      sowing: 3,
      harvesting: 7,
      category: "fiber",
      season: "summer",
      color: "#059669",
      description: "Fiber crop, requires humid climate",
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

  const seasons = [
    { value: "all", label: "All Seasons", icon: Calendar },
    { value: "kharif", label: "Kharif (Monsoon)", icon: Droplets },
    { value: "rabi", label: "Rabi (Winter)", icon: Leaf },
    { value: "summer", label: "Summer", icon: Sun },
  ];

  // Filter crops based on selection and search
  const filteredCrops = crops.filter((crop) => {
    const matchesCrop = selectedCrop === "all" || crop.crop === selectedCrop;
    const matchesSearch = crop.crop
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSeason =
      selectedSeason === "all" || crop.season === selectedSeason;
    return matchesCrop && matchesSearch && matchesSeason;
  });

  // Get unique crop names for dropdown
  const cropOptions = ["all", ...new Set(crops.map((crop) => crop.crop))];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getCellContent = (crop, monthIndex) => {
    const start = crop.sowing;
    const end =
      crop.harvesting < start ? crop.harvesting + 12 : crop.harvesting;

    for (let i = start; i <= end; i++) {
      const month = i > 12 ? i - 12 : i;
      if (month === monthIndex) {
        if (i === start) return "sow";
        if (i === end) return "harvest";
        return "grow";
      }
    }
    return "";
  };

  const getCellIcon = (type) => {
    switch (type) {
      case "sow":
        return <Sprout className="w-4 h-4" />;
      case "harvest":
        return <Wheat className="w-4 h-4" />;
      case "grow":
        return <div className="w-3 h-3 rounded-full bg-current opacity-60" />;
      default:
        return null;
    }
  };

  const getCellTooltip = (crop, type) => {
    switch (type) {
      case "sow":
        return `Sowing season for ${crop.crop}`;
      case "harvest":
        return `Harvesting season for ${crop.crop}`;
      case "grow":
        return `Growing period for ${crop.crop}`;
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Crop Calendar
          </h2>
          <p className="text-gray-500">
            Preparing your agricultural insights...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <motion.div
        className="bg-white shadow-lg border-b border-green-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Home</span>
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  Crop Calendar
                </h1>
                <p className="text-gray-600 mt-1">
                  Plan your farming activities with our comprehensive crop
                  calendar
                </p>
              </div>
            </div>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Export Calendar</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
          <div className="flex flex-col gap-4">
            {/* Search and Crop Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Crop Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="all">All Crops</option>
                  {crops.map((crop) => (
                    <option key={crop.crop} value={crop.crop}>
                      {crop.crop}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Season Filter Row */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {seasons.map((season) => {
                const Icon = season.icon;
                return (
                  <motion.button
                    key={season.value}
                    onClick={() => setSelectedSeason(season.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors flex-shrink-0 ${
                      selectedSeason === season.value
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{season.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Calendar */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
          <div
            className="calendar-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(13, 1fr)",
              gap: "1px",
              backgroundColor: "#e5e7eb",
            }}
          >
            {/* Header Row */}
            {months.map((month, index) => (
              <motion.div
                key={month}
                className={`p-4 font-bold text-center ${
                  index === 0
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {month}
              </motion.div>
            ))}

            {/* Crop Rows */}
            <AnimatePresence mode="wait">
              {filteredCrops.map((crop, cropIndex) => (
                <React.Fragment key={crop.crop}>
                  {/* Crop Name */}
                  <motion.div
                    className="p-4 bg-white font-semibold text-gray-800 flex items-center gap-3 border-r border-gray-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: cropIndex * 0.1 }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: crop.color }}
                    />
                    <div>
                      <div className="font-semibold">{crop.crop}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {crop.season}
                      </div>
                    </div>
                  </motion.div>

                  {/* Month Cells */}
                  {Array.from({ length: 12 }, (_, monthIndex) => {
                    const cellType = getCellContent(crop, monthIndex + 1);
                    return (
                      <motion.div
                        key={`${crop.crop}-${monthIndex}`}
                        className={`p-4 bg-white flex items-center justify-center relative group cursor-pointer transition-all duration-200 ${
                          cellType
                            ? "hover:scale-110 hover:z-10 hover:shadow-lg"
                            : ""
                        }`}
                        style={{
                          backgroundColor: cellType
                            ? `${crop.color}20`
                            : "white",
                          color: cellType ? crop.color : "transparent",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          delay: cropIndex * 0.1 + monthIndex * 0.02,
                        }}
                        whileHover={cellType ? { scale: 1.1 } : {}}
                      >
                        {getCellIcon(cellType)}

                        {/* Tooltip */}
                        {cellType && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                            {getCellTooltip(crop, cellType)}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Legend */}
        <motion.div
          className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-green-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-lg">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Sowing</div>
                <div className="text-sm text-gray-500">
                  Best time to plant seeds
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-current opacity-60" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Growing</div>
                <div className="text-sm text-gray-500">
                  Crop development period
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-600 rounded-lg">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Harvesting</div>
                <div className="text-sm text-gray-500">
                  Ready for collection
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        {filteredCrops.length > 0 && (
          <motion.div
            className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <div className="text-3xl font-bold text-green-600">
                {filteredCrops.length}
              </div>
              <div className="text-gray-600">Total Crops</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">
                {filteredCrops.filter((c) => c.season === "kharif").length}
              </div>
              <div className="text-gray-600">Kharif Crops</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600">
                {filteredCrops.filter((c) => c.season === "rabi").length}
              </div>
              <div className="text-gray-600">Rabi Crops</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
              <div className="text-3xl font-bold text-orange-600">
                {filteredCrops.filter((c) => c.season === "summer").length}
              </div>
              <div className="text-gray-600">Summer Crops</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CropCalendar;
