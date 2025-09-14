import React, { useState, useEffect } from 'react';

// Import images (you'll need to add these to your project)
// For now using placeholder divs that would be replaced with actual images
const SoilSensorImage = () => (
  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white mx-auto">
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
    </svg>
  </div>
);

const IrrigationImage = () => (
  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto">
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
  </div>
);

const DroneImage = () => (
  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto">
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
    </svg>
  </div>
);

const Smart = () => {
    const [sensorData, setSensorData] = useState({
        moisture: 65.42,
        temperature: 28.15,
        pH: 6.82,
        irrigation: 42.37,
    });

    const [droneData, setDroneData] = useState({
        coverage: 78.56,
        healthScore: 92.18,
        issuesDetected: 2
    });

    const [selectedProduct, setSelectedProduct] = useState('complete'); // 'complete', 'sensor', 'irrigation', 'drone'

    useEffect(() => {
        const interval = setInterval(() => {
            setSensorData(prevData => ({
                moisture: parseFloat(Math.max(20, Math.min(80, prevData.moisture + (Math.random() * 2 - 1))).toFixed(2)),
                temperature: parseFloat(Math.max(25, Math.min(35, prevData.temperature + (Math.random() * 0.5 - 0.25))).toFixed(2)),
                pH: parseFloat(Math.max(6.0, Math.min(7.5, prevData.pH + (Math.random() * 0.1 - 0.05))).toFixed(2)),
                irrigation: parseFloat(Math.max(10, Math.min(90, prevData.irrigation + (Math.random() * 3 - 1.5))).toFixed(2)),
            }));

            setDroneData(prevData => ({
                coverage: parseFloat(Math.max(60, Math.min(95, prevData.coverage + (Math.random() * 2 - 1))).toFixed(2)),
                healthScore: parseFloat(Math.max(85, Math.min(98, prevData.healthScore + (Math.random() * 1 - 0.5))).toFixed(2)),
                issuesDetected: Math.max(0, Math.min(5, Math.round(prevData.issuesDetected + (Math.random() * 1 - 0.5)))),
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const moistureStatus = sensorData.moisture < 30 ? 'Low' : sensorData.moisture < 60 ? 'Optimal' : 'High';
    const pHStatus = sensorData.pH < 6.3 ? 'Acidic' : sensorData.pH < 6.8 ? 'Slightly Acidic' : sensorData.pH < 7.2 ? 'Neutral' : 'Alkaline';
    const irrigationStatus = sensorData.irrigation < 30 ? 'Needed' : sensorData.irrigation < 60 ? 'Adequate' : 'Excessive';

    const productPrices = {
        complete: { original: 24999, discounted: 19999 },
        sensor: { original: 8999, discounted: 7499 },
        irrigation: { original: 12999, discounted: 10999 },
        drone: { original: 15999, discounted: 13999 }
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
                        Precision Agriculture Solutions by <span className="text-green-600">KisanMitra</span>
                    </h1>
                    <p className="text-lg text-green-800 max-w-3xl mx-auto">
                        Advanced IoT sensors, automated irrigation systems, and drone technology for optimized farming
                    </p>
                </div>

                {/* Product Selection */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-green-200">
                    <h2 className="text-xl font-bold text-green-900 mb-4 text-center">Select Your Farming Solution</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <button 
                            onClick={() => handleProductSelect('complete')} 
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${selectedProduct === 'complete' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300'}`}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">Complete System</span>
                            </div>
                        </button>
                        <button 
                            onClick={() => handleProductSelect('sensor')} 
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${selectedProduct === 'sensor' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300'}`}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">Soil Sensor Only</span>
                            </div>
                        </button>
                        <button 
                            onClick={() => handleProductSelect('irrigation')} 
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${selectedProduct === 'irrigation' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300'}`}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">Irrigation System</span>
                            </div>
                        </button>
                        <button 
                            onClick={() => handleProductSelect('drone')} 
                            className={`p-4 rounded-lg border-2 transition-all duration-300 ${selectedProduct === 'drone' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300'}`}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-2">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium">Drone Imaging</span>
                            </div>
                        </button>
                    </div>

                    {/* Product Details */}
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-center md:text-left mb-4 md:mb-0">
                                <h3 className="text-lg font-bold text-green-900">
                                    {selectedProduct === 'complete' && 'Complete Farming System'}
                                    {selectedProduct === 'sensor' && 'Soil Sensor Package'}
                                    {selectedProduct === 'irrigation' && 'Smart Irrigation System'}
                                    {selectedProduct === 'drone' && 'Drone Imaging Package'}
                                </h3>
                                <p className="text-green-700 text-sm">
                                    {selectedProduct === 'complete' && 'Everything you need for precision agriculture'}
                                    {selectedProduct === 'sensor' && 'Real-time soil monitoring with mobile app'}
                                    {selectedProduct === 'irrigation' && 'Automated watering based on soil conditions'}
                                    {selectedProduct === 'drone' && 'Aerial crop analysis and health monitoring'}
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-green-700 line-through">₹{productPrices[selectedProduct].original.toLocaleString()}</div>
                                <div className="text-2xl font-bold text-green-900">₹{productPrices[selectedProduct].discounted.toLocaleString()}</div>
                                <div className="text-xs text-green-600">Special pricing</div>
                            </div>
                            <button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                                Add to Cart
                            </button>
                        </div>
                        <div className="text-xs text-green-700 mt-3 text-center md:text-left">
                            Free installation • 2-year warranty • 30-day trial
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    {/* Product Showcase */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-green-200">
                        <h2 className="text-xl font-bold text-green-900 mb-6">Technology Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Soil Sensor */}
                            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                                <div className="flex flex-col items-center mb-4">
                                    <SoilSensorImage />
                                    <h3 className="font-bold text-green-900 mt-3 text-center">Soil Sensor Technology</h3>
                                </div>
                                <p className="text-sm text-green-700 mb-3 text-center">Advanced sensors measure moisture, temperature, and pH levels with laboratory precision</p>
                                <ul className="text-xs text-green-600 space-y-2">
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Wireless & solar-powered with 2-year battery life
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        IP67 waterproof rating for all weather conditions
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Precision accuracy: ±2% moisture, ±0.3°C temperature
                                    </li>
                                </ul>
                            </div>

                            {/* Irrigation Control */}
                            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                                <div className="flex flex-col items-center mb-4">
                                    <IrrigationImage />
                                    <h3 className="font-bold text-blue-900 mt-3 text-center">Smart Irrigation System</h3>
                                </div>
                                <p className="text-sm text-blue-700 mb-3 text-center">Automated watering system that responds to real-time soil conditions</p>
                                <ul className="text-xs text-blue-600 space-y-2">
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Reduces water usage by up to 40%
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Weather-adaptive scheduling
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Zone-based control for different crop needs
                                    </li>
                                </ul>
                            </div>

                            {/* Drone Imaging */}
                            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                                <div className="flex flex-col items-center mb-4">
                                    <DroneImage />
                                    <h3 className="font-bold text-purple-900 mt-3 text-center">Drone Imaging Technology</h3>
                                </div>
                                <p className="text-sm text-purple-700 mb-3 text-center">Advanced aerial imaging for comprehensive crop health analysis</p>
                                <ul className="text-xs text-purple-600 space-y-2">
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Multispectral imaging for NDVI health mapping
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        4K resolution with 30x optical zoom
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Automated flight paths with 45-minute battery life
                                    </li>
                                </ul>
                            </div>

                            {/* Mobile App */}
                            <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                                <div className="flex flex-col items-center mb-4">
                                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white mx-auto">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-amber-900 mt-3 text-center">Mobile Application</h3>
                                </div>
                                <p className="text-sm text-amber-700 mb-3 text-center">Complete farm management from your smartphone</p>
                                <ul className="text-xs text-amber-600 space-y-2">
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Real-time alerts and notifications
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Multilingual support (Hindi, English, Regional languages)
                                    </li>
                                    <li className="flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Offline functionality for remote areas
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Data Column */}
                    <div className="space-y-6">
                        {/* Soil Analytics */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
                            <h2 className="text-xl font-bold text-green-900 mb-4">Live Soil Analytics</h2>
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                    <div className="flex-shrink-0 mr-3 bg-green-100 p-2 rounded-md">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-green-900">Soil Moisture</h3>
                                        <div className="flex items-center">
                                            <div className="w-full bg-green-200 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full"
                                                    style={{ width: `${sensorData.moisture}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-md font-bold text-green-800">{sensorData.moisture}%</span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-green-700">
                                        {moistureStatus}
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                                    <div className="flex-shrink-0 mr-3 bg-amber-100 p-2 rounded-md">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-amber-900">Soil Temperature</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-md font-bold text-amber-800">{sensorData.temperature}°C</span>
                                            <span className="text-sm font-semibold text-amber-700">
                                                {sensorData.temperature > 32 ? 'High' : sensorData.temperature < 26 ? 'Low' : 'Optimal'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                    <div className="flex-shrink-0 mr-3 bg-blue-100 p-2 rounded-md">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-blue-900">pH Level</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-md font-bold text-blue-800">{sensorData.pH.toFixed(2)}</span>
                                            <span className="text-sm font-semibold text-blue-700">
                                                {pHStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                                    <div className="flex-shrink-0 mr-3 bg-teal-100 p-2 rounded-md">
                                        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-teal-900">Irrigation Level</h3>
                                        <div className="flex items-center">
                                            <div className="w-full bg-teal-200 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-teal-600 h-2 rounded-full"
                                                    style={{ width: `${sensorData.irrigation}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-md font-bold text-teal-800">{sensorData.irrigation}%</span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-teal-700">
                                        {irrigationStatus}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Drone Analytics */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
                            <h2 className="text-xl font-bold text-purple-900 mb-4">Drone Imaging Analysis</h2>
                            <div className="space-y-4">
                                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                    <div className="flex-shrink-0 mr-3 bg-purple-100 p-2 rounded-md">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-purple-900">Crop Health Score</h3>
                                        <div className="flex items-center">
                                            <div className="w-full bg-purple-200 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-purple-600 h-2 rounded-full"
                                                    style={{ width: `${droneData.healthScore}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-md font-bold text-purple-800">{droneData.healthScore}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                    <div className="flex-shrink-0 mr-3 bg-green-100 p-2 rounded-md">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-green-900">Field Coverage</h3>
                                        <div className="flex items-center">
                                            <div className="w-full bg-green-200 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full"
                                                    style={{ width: `${droneData.coverage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-md font-bold text-green-800">{droneData.coverage}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center p-3 bg-red-50 rounded-lg">
                                    <div className="flex-shrink-0 mr-3 bg-red-100 p-2 rounded-md">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-red-900">Issues Detected</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-md font-bold text-red-800">{droneData.issuesDetected}</span>
                                            <span className="text-sm font-semibold text-red-700">
                                                {droneData.issuesDetected > 3 ? 'Critical' : droneData.issuesDetected > 0 ? 'Monitor' : 'None'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-green-900 text-center mb-6">Trusted by Farmers Across India</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-lg shadow border border-green-100">
                            <div className="text-amber-400 mb-3 text-sm">★★★★★</div>
                            <p className="text-green-800 text-sm italic mb-3">"The irrigation system reduced my water costs by 45% last season. The drone imaging detected a pest issue weeks before visible symptoms."</p>
                            <div className="font-semibold text-green-900 text-sm">Rajesh Kumar, Punjab</div>
                            <div className="text-xs text-green-600">Wheat & Rice Farmer</div>
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow border border-green-100">
                            <div className="text-amber-400 mb-3 text-sm">★★★★★</div>
                            <p className="text-green-800 text-sm italic mb-3">"My yield increased by 38% in the first year using KisanMitra. The mobile app makes complex data simple to understand."</p>
                            <div className="font-semibold text-green-900 text-sm">Priya Singh, Maharashtra</div>
                            <div className="text-xs text-green-600">Vegetable Grower</div>
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow border border-green-100">
                            <div className="text-amber-400 mb-3 text-sm">★★★★☆</div>
                            <p className="text-green-800 text-sm italic mb-3">"The precision of soil sensors helped me optimize fertilizer use, saving costs while improving crop quality significantly."</p>
                            <div className="font-semibold text-green-900 text-sm">Vikram Patel, Gujarat</div>
                            <div className="text-xs text-green-600">Cotton & Groundnut Farmer</div>
                        </div>
                    </div>
                </div>

                <div className="text-center bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-3">Ready to Transform Your Farming Operation?</h2>
                    <p className="mb-6 max-w-2xl mx-auto">Join over 32,000 farmers who have increased profits with KisanMitra's precision agriculture solutions</p>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                        <button className="bg-white text-green-800 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-green-50 transition duration-300">
                            Request Quote
                        </button>
                        <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-green-800 transition duration-300">
                            Schedule Demo
                        </button>
                        <button className="bg-green-800 border-2 border-green-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300">
                            Contact Sales
                        </button>
                    </div>
                    <p className="text-green-200 text-sm mt-4">30-day money-back guarantee • 2-year warranty • Free installation support</p>
                </div>
            </div>
        </div>
    )
};

export default Smart;