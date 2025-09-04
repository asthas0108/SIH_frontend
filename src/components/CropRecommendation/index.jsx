import React, { useState } from "react";
import { Info } from "lucide-react";

export default function CropRecommendationForm() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Call your prediction API here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          🌱 Crop Recommendation System
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nitrogen */}
          <div className="relative">
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              placeholder="Nitrogen (N)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="absolute right-3 top-3 group">
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
              <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 right-0 whitespace-nowrap">
                Nitrogen content in soil (0–140 kg/ha)
              </span>
            </div>
          </div>

          {/* Phosphorus */}
          <div className="relative">
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              placeholder="Phosphorus (P)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="absolute right-3 top-3 group">
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
              <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 right-0 whitespace-nowrap">
                Phosphorus content in soil (5–205 kg/ha)
              </span>
            </div>
          </div>

          {/* Potassium */}
          <div className="relative">
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              placeholder="Potassium (K)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="absolute right-3 top-3 group">
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
              <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 right-0 whitespace-nowrap">
                Potassium content in soil (5–205 kg/ha)
              </span>
            </div>
          </div>

          {/* Temperature */}
          <div className="relative">
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="Temperature (°C)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="absolute right-3 top-3 group">
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
              <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 right-0 whitespace-nowrap">
                Recommended range: 8°C – 45°C
              </span>
            </div>
          </div>

          {/* Humidity */}
          <div className="relative">
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              placeholder="Humidity (%)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="absolute right-3 top-3 group">
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
              <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 right-0 whitespace-nowrap">
                Humidity percentage in air (14% – 100%)
              </span>
            </div>
          </div>

          {/* pH */}
          <div className="relative">
            <input
              type="number"
              step="0.1"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              placeholder="pH"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="absolute right-3 top-3 group">
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
              <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 right-0 whitespace-nowrap">
                Soil pH range: 3.5 – 9.5
              </span>
            </div>
          </div>

          {/* Rainfall */}
          <div className="relative">
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              placeholder="Rainfall (mm)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="absolute right-3 top-3 group">
              <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
              <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md -top-8 right-0 whitespace-nowrap">
                Rainfall range: 20 – 300 mm
              </span>
            </div>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
          >
            🌿 PREDICT CROP
          </button>

          <button
            type="button"
            onClick={() => console.log("Back to main clicked")}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
          >
            ⬅ BACK TO MAIN
          </button>
        </form>

        {/* Bottom features */}
        <div className="flex justify-around text-gray-500 text-sm mt-6">
          <div className="text-center">
            🎯 <p>Accurate Prediction</p>
          </div>
          <div className="text-center">
            ⚡ <p>Instant Results</p>
          </div>
          <div className="text-center">
            🌱 <p>Smart Farming</p>
          </div>
        </div>
      </div>
    </div>
  );
}
