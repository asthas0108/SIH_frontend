import React, { useState } from "react";

// Dummy data for demo (replace with API response from OpenWeather/WeatherAPI)
const demoWeather = {
  city: "New Delhi",
  region: "Delhi",
  country: "India",
  condition: "Mist",
  temp: 27.4,
  hourly: [
    { hour: "22", icon: "🌙", temp: 28.1 },
    { hour: "23", icon: "🌙", temp: 27.8 },
  ],
  daily: [
    { date: "2025-09-04", icon: "🌧️", max: 32, min: 25.5 },
    { date: "2025-09-05", icon: "🌤️", max: 34.5, min: 26.7 },
    { date: "2025-09-06", icon: "🌦️", max: 33.8, min: 27.1 },
  ],
};

export default function WeatherCheck() {
  const [city, setCity] = useState("New Delhi");
  const [weather, setWeather] = useState(demoWeather);

  const handleSearch = () => {
    console.log("Searching weather for:", city);
    // Replace with API call (setWeather with response data)
    setWeather(demoWeather);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center"
         style={{ backgroundImage: "" }}>
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-full max-w-5xl">
        {/* Search bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city (by default, New Delhi)"
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Current weather */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">{weather.city}</h2>
          <p className="text-gray-700">
            {weather.region}, {weather.country}
          </p>
          <p className="mt-2 text-lg text-gray-600">{weather.condition}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-5xl font-bold">{weather.temp}°C</span>
            <span className="text-4xl">☁️</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hourly forecast */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">Hourly forecast</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {weather.hourly.map((h, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-medium">{h.hour}</span>
                  <span className="text-2xl">{h.icon}</span>
                  <span className="text-sm text-gray-600">{h.temp}°C</span>
                </div>
              ))}
            </div>
          </div>

          {/* 10 days forecast */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3">10 days forecast</h3>
            <div className="space-y-3">
              {weather.daily.map((d, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium">{d.date}</span>
                  <span className="text-2xl">{d.icon}</span>
                  <span className="text-gray-700">
                    {d.max}°C / {d.min}°C
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
