import React, { useState, useEffect } from "react";
import {
  Cpu,
  Droplets,
  Thermometer,
  Zap,
  Drone,
  Smartphone,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Wifi,
  Battery,
  MapPin,
  Eye,
  Activity,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Play,
  Pause,
  Settings,
  BarChart3,
  Leaf,
} from "lucide-react";

const SoilSensorImage = () => (
  <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl transform hover:scale-105 transition-all duration-300">
    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
    <Cpu className="w-16 h-16 relative z-10" />
    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
      <Wifi className="w-3 h-3 text-white" />
    </div>
  </div>
);

const IrrigationImage = () => (
  <div className="relative w-32 h-32 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl transform hover:scale-105 transition-all duration-300">
    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
    <Droplets className="w-16 h-16 relative z-10" />
    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
      <Zap className="w-3 h-3 text-white" />
    </div>
  </div>
);

const DroneImage = () => (
  <div className="relative w-32 h-32 bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl transform hover:scale-105 transition-all duration-300">
    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
    <Drone className="w-16 h-16 relative z-10" />
    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
      <Eye className="w-3 h-3 text-white" />
    </div>
  </div>
);

const AppImage = () => (
  <div className="relative w-32 h-32 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl transform hover:scale-105 transition-all duration-300">
    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
    <Smartphone className="w-16 h-16 relative z-10" />
    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
      <Activity className="w-3 h-3 text-white" />
    </div>
  </div>
);

const SmartFarmingEnhanced = () => {
  const [sensorData, setSensorData] = useState({
    moisture: 65.42,
    temperature: 28.15,
    pH: 6.82,
    irrigation: 42.37,
    nitrogen: 78.3,
    phosphorus: 65.7,
    potassium: 82.1,
  });

  const [droneData, setDroneData] = useState({
    coverage: 78.56,
    healthScore: 92.18,
    issuesDetected: 2,
    batteryLevel: 87,
    lastFlight: "2 hours ago",
  });

  const [selectedProduct, setSelectedProduct] = useState("complete");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prevData) => ({
        moisture: parseFloat(
          Math.max(
            20,
            Math.min(80, prevData.moisture + (Math.random() * 2 - 1))
          ).toFixed(2)
        ),
        temperature: parseFloat(
          Math.max(
            25,
            Math.min(35, prevData.temperature + (Math.random() * 0.5 - 0.25))
          ).toFixed(2)
        ),
        pH: parseFloat(
          Math.max(
            6.0,
            Math.min(7.5, prevData.pH + (Math.random() * 0.1 - 0.05))
          ).toFixed(2)
        ),
        irrigation: parseFloat(
          Math.max(
            10,
            Math.min(90, prevData.irrigation + (Math.random() * 3 - 1.5))
          ).toFixed(2)
        ),
        nitrogen: parseFloat(
          Math.max(
            50,
            Math.min(100, prevData.nitrogen + (Math.random() * 2 - 1))
          ).toFixed(1)
        ),
        phosphorus: parseFloat(
          Math.max(
            40,
            Math.min(90, prevData.phosphorus + (Math.random() * 2 - 1))
          ).toFixed(1)
        ),
        potassium: parseFloat(
          Math.max(
            60,
            Math.min(100, prevData.potassium + (Math.random() * 2 - 1))
          ).toFixed(1)
        ),
      }));

      setDroneData((prevData) => ({
        ...prevData,
        coverage: parseFloat(
          Math.max(
            60,
            Math.min(95, prevData.coverage + (Math.random() * 2 - 1))
          ).toFixed(2)
        ),
        healthScore: parseFloat(
          Math.max(
            85,
            Math.min(98, prevData.healthScore + (Math.random() * 1 - 0.5))
          ).toFixed(2)
        ),
        issuesDetected: Math.max(
          0,
          Math.min(
            5,
            Math.round(prevData.issuesDetected + (Math.random() * 1 - 0.5))
          )
        ),
        batteryLevel: Math.max(
          20,
          Math.min(
            100,
            prevData.batteryLevel + Math.round(Math.random() * 2 - 1)
          )
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const moistureStatus =
    sensorData.moisture < 30
      ? "Low"
      : sensorData.moisture < 60
        ? "Optimal"
        : "High";
  const pHStatus =
    sensorData.pH < 6.3
      ? "Acidic"
      : sensorData.pH < 6.8
        ? "Slightly Acidic"
        : sensorData.pH < 7.2
          ? "Neutral"
          : "Alkaline";
  const irrigationStatus =
    sensorData.irrigation < 30
      ? "Needed"
      : sensorData.irrigation < 60
        ? "Adequate"
        : "Excessive";

  const productPrices = {
    complete: { original: 24999, discounted: 19999 },
    sensor: { original: 8999, discounted: 7499 },
    irrigation: { original: 12999, discounted: 10999 },
    drone: { original: 15999, discounted: 13999 },
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "sensors", name: "Sensors", icon: Cpu },
    { id: "irrigation", name: "Irrigation", icon: Droplets },
    { id: "analytics", name: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-green-200 shadow-sm">
              <Leaf className="w-4 h-4 mr-2" />
              Precision Agriculture Technology
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 pb-3">
              Smart Farming Solutions
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Transform your agricultural operations with cutting-edge IoT
              sensors, automated irrigation, and AI-powered drone technology for
              maximum yield and sustainability.
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-8 px-2">
          <div className="flex overflow-x-auto no-scrollbar bg-white/80 backdrop-blur-sm rounded-2xl p-1 sm:p-2 shadow-lg border border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
              >
                <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>


        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Solution
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive range of precision agriculture
              solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <button
              onClick={() => handleProductSelect("complete")}
              className={`group p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${selectedProduct === "complete"
                  ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl"
                  : "border-gray-200 hover:border-green-300 bg-white hover:shadow-lg"
                }`}
            >
              <div className="text-center">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${selectedProduct === "complete"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600"
                    }`}
                >
                  <Settings className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Complete System
                </h3>
                <p className="text-sm text-gray-600">
                  Full precision agriculture suite
                </p>
              </div>
            </button>

            <button
              onClick={() => handleProductSelect("sensor")}
              className={`group p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${selectedProduct === "sensor"
                  ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl"
                  : "border-gray-200 hover:border-green-300 bg-white hover:shadow-lg"
                }`}
            >
              <div className="text-center">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${selectedProduct === "sensor"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600"
                    }`}
                >
                  <Cpu className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Soil Sensors</h3>
                <p className="text-sm text-gray-600">
                  Advanced soil monitoring
                </p>
              </div>
            </button>

            <button
              onClick={() => handleProductSelect("irrigation")}
              className={`group p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${selectedProduct === "irrigation"
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl"
                  : "border-gray-200 hover:border-blue-300 bg-white hover:shadow-lg"
                }`}
            >
              <div className="text-center">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${selectedProduct === "irrigation"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-600 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}
                >
                  <Droplets className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Smart Irrigation
                </h3>
                <p className="text-sm text-gray-600">
                  Automated water management
                </p>
              </div>
            </button>

            <button
              onClick={() => handleProductSelect("drone")}
              className={`group p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${selectedProduct === "drone"
                  ? "border-purple-500 bg-gradient-to-br from-purple-50 to-violet-50 shadow-xl"
                  : "border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg"
                }`}
            >
              <div className="text-center">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${selectedProduct === "drone"
                      ? "bg-gradient-to-br from-purple-500 to-violet-600 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600"
                    }`}
                >
                  <Drone className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Drone Analytics
                </h3>
                <p className="text-sm text-gray-600">Aerial crop monitoring</p>
              </div>
            </button>
          </div>

          {/* Enhanced Product Details */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 p-8 rounded-2xl border border-green-200 shadow-inner">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="text-center lg:text-left mb-6 lg:mb-0 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedProduct === "complete" &&
                    "Complete Precision Agriculture System"}
                  {selectedProduct === "sensor" &&
                    "Advanced Soil Sensor Network"}
                  {selectedProduct === "irrigation" &&
                    "Intelligent Irrigation System"}
                  {selectedProduct === "drone" &&
                    "Professional Drone Analytics"}
                </h3>
                <p className="text-gray-700 mb-4">
                  {selectedProduct === "complete" &&
                    "Comprehensive solution with sensors, irrigation, drone monitoring, and AI analytics"}
                  {selectedProduct === "sensor" &&
                    "Real-time soil monitoring with NPK analysis and mobile app integration"}
                  {selectedProduct === "irrigation" &&
                    "Weather-adaptive automated watering with zone-based control"}
                  {selectedProduct === "drone" &&
                    "Multispectral imaging with AI-powered crop health analysis"}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    2-Year Warranty
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Free Installation
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Clock className="w-3 h-3 mr-1" />
                    30-Day Trial
                  </span>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="text-lg text-gray-500 line-through mb-1">
                  ₹{productPrices[selectedProduct].original.toLocaleString()}
                </div>
                <div className="text-4xl font-bold text-green-600 mb-1">
                  ₹{productPrices[selectedProduct].discounted.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 mb-4">
                  Save ₹
                  {(
                    productPrices[selectedProduct].original -
                    productPrices[selectedProduct].discounted
                  ).toLocaleString()}
                </div>
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                  Add to Cart
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Technology Showcase */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Technology Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Soil Sensor */}
              <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center mb-6">
                  <SoilSensorImage />
                  <h3 className="font-bold text-green-900 mt-4 text-xl text-center">
                    Smart Soil Sensors
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-center">
                  Laboratory-grade precision monitoring of soil conditions with
                  wireless connectivity and solar power
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Wireless & solar-powered with 2-year battery life
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      IP67 waterproof rating for all weather conditions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      NPK analysis with ±2% moisture accuracy
                    </span>
                  </li>
                </ul>
              </div>

              {/* Irrigation Control */}
              <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center mb-6">
                  <IrrigationImage />
                  <h3 className="font-bold text-blue-900 mt-4 text-xl text-center">
                    Smart Irrigation
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-center">
                  AI-powered irrigation system that optimizes water usage based
                  on real-time soil and weather data
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Reduces water usage by up to 40%
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Weather-adaptive scheduling with ML predictions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Multi-zone control for different crop requirements
                    </span>
                  </li>
                </ul>
              </div>

              {/* Drone Technology */}
              <div className="group bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center mb-6">
                  <DroneImage />
                  <h3 className="font-bold text-purple-900 mt-4 text-xl text-center">
                    Drone Analytics
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-center">
                  Advanced aerial imaging with multispectral cameras for
                  comprehensive crop health monitoring
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Multispectral NDVI health mapping technology
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      4K resolution with 30x optical zoom capability
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Automated flight paths with 45-minute operation
                    </span>
                  </li>
                </ul>
              </div>

              {/* Mobile App */}
              <div className="group bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center mb-6">
                  <AppImage />
                  <h3 className="font-bold text-amber-900 mt-4 text-xl text-center">
                    Mobile App Control
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-center">
                  Comprehensive farm management platform with intuitive mobile
                  interface and offline capabilities
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Real-time alerts and smart notifications
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Multilingual support for regional languages
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Offline functionality for remote farming areas
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  System Status
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">
                    Live
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <div className="text-xs text-gray-600">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {droneData.batteryLevel}%
                  </div>
                  <div className="text-xs text-gray-600">Battery</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Soil Analytics
                </h2>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Thermometer className="w-5 h-5 text-green-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-900">
                      Soil Moisture
                    </span>
                    <span className="text-sm font-medium text-green-700">
                      {moistureStatus}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-green-200 rounded-full h-3 mr-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${sensorData.moisture}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-green-800 min-w-fit">
                      {sensorData.moisture}%
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-amber-900">
                      Temperature
                    </span>
                    <span className="text-sm font-medium text-amber-700">
                      {sensorData.temperature > 32
                        ? "High"
                        : sensorData.temperature < 26
                          ? "Low"
                          : "Optimal"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-800">
                      {sensorData.temperature}°C
                    </span>
                    <Thermometer className="w-6 h-6 text-amber-600" />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-900">
                      pH Level
                    </span>
                    <span className="text-sm font-medium text-blue-700">
                      {pHStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-800">
                      {sensorData.pH}
                    </span>
                    <div className="w-16 h-3 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full relative">
                      <div
                        className="w-3 h-3 bg-blue-800 rounded-full absolute top-0 transform -translate-y-0"
                        style={{
                          left: `${((sensorData.pH - 6) / 2.5) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-3">
                    NPK Analysis
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">
                        Nitrogen (N)
                      </span>
                      <span className="font-bold text-purple-800">
                        {sensorData.nitrogen}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">
                        Phosphorus (P)
                      </span>
                      <span className="font-bold text-purple-800">
                        {sensorData.phosphorus}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">
                        Potassium (K)
                      </span>
                      <span className="font-bold text-purple-800">
                        {sensorData.potassium}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Drone Analytics
                </h2>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Drone className="w-5 h-5 text-purple-600" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-900">
                      Crop Health Score
                    </span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600">
                        Excellent
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-purple-200 rounded-full h-3 mr-3">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${droneData.healthScore}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-purple-800 min-w-fit">
                      {droneData.healthScore}%
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-900">
                      Field Coverage
                    </span>
                    <span className="text-sm font-medium text-green-700">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-green-200 rounded-full h-3 mr-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${droneData.coverage}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-green-800 min-w-fit">
                      {droneData.coverage}%
                    </span>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-red-900">
                      Issues Detected
                    </span>
                    <span className="text-sm font-medium text-red-700">
                      {droneData.issuesDetected > 3
                        ? "Critical"
                        : droneData.issuesDetected > 0
                          ? "Monitor"
                          : "None"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-800">
                      {droneData.issuesDetected}
                    </span>
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900 block">
                        Last Flight
                      </span>
                      <span className="text-sm text-gray-600">
                        {droneData.lastFlight}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Battery className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="font-bold text-gray-800">
                        {droneData.batteryLevel}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Kumar",
                location: "Punjab",
                crop: "Wheat & Rice Farmer",
                rating: 5,
                text: "The irrigation system reduced my water costs by 45% last season. The drone imaging detected a pest issue weeks before visible symptoms.",
                improvement: "45% water savings",
              },
              {
                name: "Priya Singh",
                location: "Maharashtra",
                crop: "Vegetable Grower",
                rating: 5,
                text: "My yield increased by 38% in the first year using KisanMitra. The mobile app makes complex data simple to understand.",
                improvement: "38% yield increase",
              },
              {
                name: "Vikram Patel",
                location: "Gujarat",
                crop: "Cotton & Groundnut",
                rating: 5,
                text: "The precision of soil sensors helped me optimize fertilizer use, saving costs while improving crop quality significantly.",
                improvement: "30% cost reduction",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.crop}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {testimonial.improvement}
                      </div>
                      <div className="text-xs text-gray-500">Improvement</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl"></div>
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative text-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join over 32,000 farmers who have increased their profits and
              sustainability with our precision agriculture solutions
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-green-700 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                Request Quote
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
              <button className="bg-green-800/80 border-2 border-green-700 text-white hover:bg-green-700/80 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Call Sales
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm opacity-90">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                30-day money-back guarantee
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                2-year comprehensive warranty
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Free installation & training
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartFarmingEnhanced;
