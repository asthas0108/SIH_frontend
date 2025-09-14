import React, { useState } from 'react';
import { Sun } from 'lucide-react';
import { PhoneCallIcon } from 'lucide-react';
import { PersonStanding } from 'lucide-react';
import { Bell } from 'lucide-react';
import { CurrencyIcon } from 'lucide-react';
import { GitGraphIcon } from 'lucide-react';
import { Trees } from 'lucide-react';
import { BookAIcon } from 'lucide-react';
import { BarChart } from 'lucide-react';
import { FcOk } from 'react-icons/fc';
import { GiRaining } from 'react-icons/gi';
import { LineChart } from 'lucide-react';
import { GiCaterpillar } from 'react-icons/gi';
import { Droplet } from 'lucide-react';
import { Building } from 'lucide-react';
import { div } from 'framer-motion/client';
import { BiDownArrow, BiLeftArrow } from 'react-icons/bi';

const EnhancedFarmerProfile = () => {
  const [farmerData, setFarmerData] = useState({
    name: "Rajesh Singh",
    phone: "+91 9876543210",
    language: "हिंदी (Hindi)",
    pincode: "413305",
    village: "Baramati",
    district: "Pune",
    state: "Maharashtra",
    landHolding: "4.5 Acres",
    farmingType: "Irrigated",
    soilType: "Black Cotton Soil (Regur Soil)",
    irrigationSource: "Well + Canal",
    experience: "15 years",
    plots: [
      { id: 1, name: "मुख्य शेत (Main Field)", area: "3.0", crop: "Sugarcane", sowingDate: "15 Feb 2024", status: "Growing" },
      { id: 2, name: "बाग (Orchard)", area: "1.0", crop: "Mango (Alphonso)", sowingDate: "N/A (Perennial)", status: "Fruiting" },
      { id: 3, name: "किचन गार्डन (Kitchen Garden)", area: "0.5", crop: "Tomato, Chili, Onion", sowingDate: "01 Mar 2024", status: "Vegetative" }
    ],
    alerts: {
      sms: true,
      voice: true,
      weather: true,
      pests: true,
      irrigation: true,
      market: false,
      schemes: true
    },
    recentQueries: [
      { id: 1, query: "Sugarcane में red rot के लक्षण क्या हैं?", date: "12 Apr 2023", status: "Answered" },
      { id: 2, query: "आज बारामती का मौसम कैसा रहेगा?", date: "15 Apr 2023", status: "Answered" },
      { id: 3, query: "Tomato का बाजार भाव क्या है?", date: "18 Apr 2023", status: "Answered" }
    ],
    yields: [
      { year: "2022", crop: "Sugarcane", yield: "72 tonnes", average: "68 tonnes" },
      { year: "2022", crop: "Mango", yield: "2.5 tonnes", average: "2.2 tonnes" },
      { year: "2023", crop: "Sugarcane", yield: "75 tonnes", average: "70 tonnes" }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [newPlot, setNewPlot] = useState({ name: "", area: "", crop: "", sowingDate: "" });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFarmerData(prev => ({
        ...prev,
        alerts: {
          ...prev.alerts,
          [name]: checked
        }
      }));
    } else {
      setFarmerData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePlotInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlot(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addNewPlot = () => {
    if (newPlot.name && newPlot.area && newPlot.crop) {
      setFarmerData(prev => ({
        ...prev,
        plots: [...prev.plots, {
          id: Date.now(),
          ...newPlot,
          status: "Planning",
          sowingDate: newPlot.sowingDate || "Not set"
        }]
      }));
      setNewPlot({ name: "", area: "", crop: "", sowingDate: "" });
    }
  };

  return (
    <div className="bg-green-50">
      <div className="max-w-6xl mx-auto p-4 font-sans bg-green-100 min-h-screen">
        <header className="bg-gradient-to-r from-green-800 to-green-700 text-white p-6 rounded-xl shadow-lg mb-6">
          <div className="flex items-center mb-5">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-3xl font-bold mr-5">
              RS
            </div>
            <div>
              <h1 className="text-3xl font-bold">नमस्ते, {farmerData.name}!</h1>
              <p className="text-green-100">Member since 2018 • {farmerData.village}, {farmerData.district}</p>
            </div>
          </div>

          <div className="flex justify-around my-6 py-4 border-t border-b border-green-600">
            <div className="text-center">
              <span className="block text-2xl font-bold">{farmerData.landHolding}</span>
              <span className="text-sm text-green-200">Land Holding</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">{farmerData.plots.length}</span>
              <span className="text-sm text-green-200">Plots</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">{farmerData.experience}</span>
              <span className="text-sm text-green-200">Experience</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="bg-white text-green-800 px-5 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300"
              onClick={toggleEdit}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button className="bg-transparent text-white border-2 border-white px-5 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download Report
            </button>
          </div>
        </header>

        <nav className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <button
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${activeSection === "overview"
                  ? "text-green-700 bg-green-50 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              onClick={() => setActiveSection("overview")}
            >
              <span className="text-lg"><GitGraphIcon /></span>
              <span>Overview</span>
            </button>
            <button
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${activeSection === "personal"
                  ? "text-green-700 bg-green-50 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              onClick={() => setActiveSection("personal")}
            >
              <span className="text-lg"><PersonStanding /></span>
              <span>Personal Info</span>
            </button>
            <button
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${activeSection === "farm"
                  ? "text-green-700 bg-green-50 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              onClick={() => setActiveSection("farm")}
            >
              <span className="text-lg"><Trees /></span>
              <span>Farm Details</span>
            </button>
            <button
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${activeSection === "alerts"
                  ? "text-green-700 bg-green-50 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              onClick={() => setActiveSection("alerts")}
            >
              <span className="text-lg"><Bell /></span>
              <span>Alerts</span>
            </button>
            <button
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${activeSection === "activity"
                  ? "text-green-700 bg-green-50 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              onClick={() => setActiveSection("activity")}
            >
              <span className="text-lg"><BookAIcon /></span>
              <span>Activity</span>
            </button>
          </div>

          <div className="md:hidden relative">
            <BiDownArrow className='absolute right-8 top-5'/>
            <select
              className="w-full p-4 text-gray-700 bg-white border-none rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none appearance-none"
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
            >
              <option value="overview">
                <span className="flex items-center gap-2">
                  <GitGraphIcon /> Overview
                </span>
              </option>
              <option value="personal">
                <span className="flex items-center gap-2">
                  <PersonStanding /> Personal Info
                </span>
              </option>
              <option value="farm">
                <span className="flex items-center gap-2">
                  <Trees /> Farm Details
                </span>
              </option>
              <option value="alerts">
                <span className="flex items-center gap-2">
                  <Bell /> Alerts
                </span>
              </option>
              <option value="activity">
                <span className="flex items-center gap-2">
                  <BookAIcon /> Activity
                </span>
              </option>
            </select>
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow-md p-6">
          {activeSection === "overview" && (
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-4 pb-3 border-b-2 border-green-100">Farm Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">Crop Distribution</h3>
                  <div className="space-y-4">
                    {farmerData.plots.map(plot => (
                      <div key={plot.id} className="flex items-center">
                        <span className="w-28 font-medium">{plot.crop}</span>
                        <div className="flex-grow h-5 bg-gray-200 rounded-full mx-4 overflow-hidden">
                          <div
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${(parseFloat(plot.area) / parseFloat(farmerData.landHolding)) * 100}%` }}
                          ></div>
                        </div>
                        <span className="w-20 text-right text-sm text-gray-600">{plot.area} Acres</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">Recent Yield History</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 bg-green-100 p-3 font-semibold text-green-800">
                      <div>Year</div>
                      <div>Crop</div>
                      <div>Your Yield</div>
                      <div>Region Average</div>
                    </div>
                    {farmerData.yields.map((yieldItem, index) => (
                      <div key={index} className="grid grid-cols-4 p-3 border-t border-gray-200 even:bg-gray-50">
                        <div>{yieldItem.year}</div>
                        <div>{yieldItem.crop}</div>
                        <div>{yieldItem.yield}</div>
                        <div>{yieldItem.average}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-green-700 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center justify-center p-5 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="text-2xl mb-2"><Sun /></span>
                    <span>Weather Forecast</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-5 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="text-2xl mb-2"><CurrencyIcon /></span>
                    <span>Market Prices</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-5 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="text-2xl mb-2"><PhoneCallIcon /></span>
                    <span>Expert Help</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-5 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="text-2xl mb-2"><BarChart /></span>
                    <span>Crop Advisory</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeSection === "personal" && (
            <section className="animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-800">Personal Information</h2>
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Profile 85% Complete
                </div>
              </div>

              <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden mb-6">
                <div className="bg-green-50 px-6 py-3 border-b border-green-100">
                  <h3 className="text-lg font-semibold text-green-700">Basic Details</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      Full Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={farmerData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      Phone Number
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={farmerData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 pr-10"
                        placeholder="+91 00000 00000"
                      />
                      <span className="absolute right-3 top-3.5 text-green-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                    <div className="relative">
                      <select
                        name="language"
                        value={farmerData.language}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-all duration-200"
                      >
                        <option>हिंदी (Hindi)</option>
                        <option>मराठी (Marathi)</option>
                        <option>English</option>
                        <option>ਪੰਜਾਬੀ (Punjabi)</option>
                        <option>বাংলা (Bengali)</option>
                        <option>தமிழ் (Tamil)</option>
                        <option>తెలుగు (Telugu)</option>
                        <option>ಕನ್ನಡ (Kannada)</option>
                        <option>മലയാളം (Malayalam)</option>
                        <option>ગુજરાતી (Gujarati)</option>
                        <option>ଓଡିଆ (Odia)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Farming Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={farmerData.experience}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Years of experience"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden">
                <div className="bg-green-50 px-6 py-3 border-b border-green-100">
                  <h3 className="text-lg font-semibold text-green-700">Location Details</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      value={farmerData.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter PIN code"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">Village/Taluka</label>
                    <input
                      type="text"
                      name="village"
                      value={farmerData.village}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter village name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">District</label>
                    <input
                      type="text"
                      name="district"
                      value={farmerData.district}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter district name"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <div className="relative">
                      <select
                        name="state"
                        value={farmerData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-all duration-200"
                      >
                        <option>Maharashtra</option>
                        <option>Uttar Pradesh</option>
                        <option>Punjab</option>
                        <option>Gujarat</option>
                        <option>Rajasthan</option>
                        <option>Karnataka</option>
                        <option>Tamil Nadu</option>
                        <option>Kerala</option>
                        <option>Andhra Pradesh</option>
                        <option>Telangana</option>
                        <option>Madhya Pradesh</option>
                        <option>West Bengal</option>
                        <option>Bihar</option>
                        <option>Odisha</option>
                        <option>Assam</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center"
                    onClick={() => setIsEditing(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Save Changes
                  </button>
                </div>
              )}
            </section>
          )}

          {activeSection === "farm" && (
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-6 pb-3 border-b-2 border-green-100">Farm & Land Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Land Holding</label>
                  <input
                    type="text"
                    name="landHolding"
                    value={farmerData.landHolding}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farming Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="farmingType"
                        value="Irrigated"
                        checked={farmerData.farmingType === "Irrigated"}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mr-2"
                      />
                      Irrigated
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="farmingType"
                        value="Rainfed"
                        checked={farmerData.farmingType === "Rainfed"}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mr-2"
                      />
                      Rainfed
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <select
                    name="soilType"
                    value={farmerData.soilType}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600"
                  >
                    <option>Black Cotton Soil (Regur Soil)</option>
                    <option>Red Soil</option>
                    <option>Laterite Soil</option>
                    <option>Alluvial Soil</option>
                    <option>Sandy Soil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Irrigation Source</label>
                  <input
                    type="text"
                    name="irrigationSource"
                    value={farmerData.irrigationSource}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-green-700 mb-4">Plot Details</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                <div className="grid grid-cols-5 bg-green-100 p-4 font-semibold text-green-800">
                  <div>Plot Name</div>
                  <div>Area (Acres)</div>
                  <div>Current Crop</div>
                  <div>Sowing Date</div>
                  <div>Status</div>
                </div>
                {farmerData.plots.map((plot) => (
                  <div key={plot.id} className="grid grid-cols-5 p-4 border-t border-gray-200 even:bg-gray-50">
                    <div>{plot.name}</div>
                    <div>{plot.area}</div>
                    <div>{plot.crop}</div>
                    <div>{plot.sowingDate}</div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${plot.status === "Growing" ? "bg-green-100 text-green-800" :
                        plot.status === "Fruiting" ? "bg-amber-100 text-amber-800" :
                          plot.status === "Vegetative" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                        }`}>
                        {plot.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-700 mb-4">Add New Plot</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Plot Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newPlot.name}
                        onChange={handlePlotInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area (Acres)</label>
                      <input
                        type="text"
                        name="area"
                        value={newPlot.area}
                        onChange={handlePlotInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
                      <input
                        type="text"
                        name="crop"
                        value={newPlot.crop}
                        onChange={handlePlotInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sowing Date</label>
                      <input
                        type="text"
                        name="sowingDate"
                        value={newPlot.sowingDate}
                        onChange={handlePlotInputChange}
                        placeholder="DD MMM YYYY"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    onClick={addNewPlot}
                  >
                    + Add Plot
                  </button>
                </div>
              )}
            </section>
          )}

          {activeSection === "alerts" && (
            <section className="animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-800">Notification Preferences</h2>
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  Alert Settings
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-green-800">Delivery Methods</h3>
                    </div>
                    <p className="text-sm text-green-600 mt-1">How would you like to receive alerts?</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <label className="flex items-start p-3 rounded-lg border border-gray-200 hover:bg-green-50 transition-colors duration-200 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          name="sms"
                          checked={farmerData.alerts.sms}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">SMS Alerts</span>
                          {farmerData.alerts.sms && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Receive important updates via text message</p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-lg ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 极速赛车开奖结果 极速赛车开奖记录 极速赛车开奖直播 极速赛车开奖直播 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                    </label>

                    <label className="flex items-start p-3 rounded-lg border border-gray-200 hover:bg-green-50 transition-colors duration-200 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          name="voice"
                          checked={farmerData.alerts.voice}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">Voice Call Alerts</span>
                          {farmerData.alerts.voice && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Get automated voice calls for critical alerts</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded-lg ml-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1A1.5 1.5 极速赛车开奖结果 极速赛车开奖记录 0 016 3.5v1A1.5 1.5 0 014.5 6h-1A1.5 1.5 0 012 4.5v-1zM3.5 10a1.5 1.5 0 01-1.5-1.5v-1A1.5 1.5 0 013.5 6h1A1.5 1.5 0 016 7.5v1A1.5 1.5 0 014.5 10h-1zM8 3.5A1.5 1.5 0 019.5 2h1A1.5 1.5 0 0112 3.5v1A1.5 1.5 0 0110.5 6h-1A1.5 1.5 0 018 4.5v-1zM9.5 10a1.5 1.5 0 01-1.5-1.5v-1A1.5 1.5 0 019.5 6h1a1.5 1.5 0 011.5 1.5v1A1.5 1.5 0 0110.5 10h-1zM16 7.5a1.5 1.5 0 00-3 0v5a1.5 1.5 0 003 0v-5z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-green-800">Alert Categories</h3>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Choose which types of alerts you want to receive</p>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { name: 'weather', label: 'Extreme Weather Warnings', icon: <GiRaining />, description: 'Storms, heavy rain, drought alerts' },
                      { name: 'pests', label: 'Pest/Disease Outbreaks', icon: <GiCaterpillar />, description: 'Local pest and disease notifications' },
                      { name: 'irrigation', label: 'Irrigation Reminders', icon: <Droplet />, description: 'Optimal watering schedules for your crops' },
                      { name: 'market', label: 'Market Price Updates', icon: <LineChart />, description: 'Daily commodity price information' },
                      { name: 'schemes', label: 'Government Schemes', icon: <Building />, description: 'New subsidies and support programs' }
                    ].map((alert) => (
                      <label key={alert.name} className="flex items-start p-3 rounded-lg border border-gray-200 hover:bg-green-50 transition-colors duration-200 cursor-pointer">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            name={alert.name}
                            checked={farmerData.alerts[alert.name]}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{alert.icon}</span>
                            <span className="text-sm font-medium text-gray-900">{alert.label}</span>
                            {farmerData.alerts[alert.name] && (
                              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 极速赛车开奖结果 极速赛车开奖记录 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800">Delivery Schedule</h3>
                  </div>
                  <p className="text-sm text-green-600 mt-1">When would you like to receive notifications?</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-blue-50 rounded-lg mb-4">
                    <div>
                      <p className="font-medium text-blue-800">Current Schedule</p>
                      <p className="text-sm text-blue-600">You receive alerts daily at 9:00 AM and 5:00 PM</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0">
                      Active
                    </div>
                  </div>

                  {isEditing && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Alert Times</label>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <select className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                          <option>9:00 AM & 5:00 PM</option>
                          <option>8:00 AM & 6:00 PM</option>
                          <option>7:00 AM & 7:00 PM</option>
                          <option>6:00 AM & 6:00 PM</option>
                          <option>Custom Schedule</option>
                        </select>
                        <button className="px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                          Save Schedule
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Alerts will be sent at your chosen times</p>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel Changes
                  </button>
                  <button
                    className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center"
                    onClick={() => setIsEditing(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0极速赛车开奖结果 极速赛车开奖记录 l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Save Preferences
                  </button>
                </div>
              )}
            </section>
          )}

          {activeSection === "activity" && (
            <section>
              <h2 className="text-2xl font-bold text-green-800 mb-6 pb-3 border-b-2 border-green-100">Activity & History</h2>

              <h3 className="text-xl font-semibold text-green-700 mb-4">Recent Queries</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                <div className="grid grid-cols-3 bg-green-100 p-4 font-semibold text-green-800">
                  <div>Date</div>
                  <div>Query</div>
                  <div>Status</div>
                </div>
                {farmerData.recentQueries.map((query) => (
                  <div key={query.id} className="grid grid-cols-3 p-4 border-t border-gray-200 even:bg-gray-50">
                    <div>{query.date}</div>
                    <div>{query.query}</div>
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {query.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                  <span><BookAIcon /></span> View Saved Advice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                  <span><BarChart /></span> Service History
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                  <span><LineChart /></span> Yield History
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-green-700 mb-4">Recent Activities</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 border-b border-gray-200">
                    <span className="text-2xl bg-green-100 p-2 rounded-full">
                      <FcOk />
                    </span>
                    <div>
                      <p className="font-medium">Updated plot information for Kitchen Garden</p>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 border-b border-gray-200">
                    <span className="text-2xl bg-blue-100 p-2 rounded-full"><GiRaining /></span>
                    <div>
                      <p className="font-medium">Received weather alert: Rain expected tomorrow</p>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4">
                    <span className="text-2xl bg-amber-100 p-2 rounded-full"><PhoneCallIcon /></span>
                    <div>
                      <p className="font-medium">Spoke with agricultural expert about fertilizer usage</p>
                      <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>

  );
};

export default EnhancedFarmerProfile;