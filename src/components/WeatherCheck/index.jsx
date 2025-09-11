import React, { useState, useEffect } from "react";
import { Search, MapPin, Droplets, Wind, Sun, Cloud, CloudRain, CloudSnow, Zap } from "lucide-react";

const demoWeatherData = {
  sunny: {
    city: "New Delhi",
    region: "Delhi",
    country: "India",
    condition: "Sunny",
    temp: 32.4,
    feelsLike: 34.2,
    humidity: 45,
    wind: 12,
    uv: 8,
    hourly: [
      { hour: "Now", icon: "☀️", temp: 32.4 },
      { hour: "13", icon: "☀️", temp: 33.1 },
      { hour: "14", icon: "🌤️", temp: 33.8 },
      { hour: "15", icon: "🌤️", temp: 34.2 },
      { hour: "16", icon: "🌤️", temp: 33.5 },
    ],
    daily: [
      { date: "Today", icon: "☀️", max: 34.2, min: 25.5 },
      { date: "Fri", icon: "🌤️", max: 33.5, min: 26.7 },
      { date: "Sat", icon: "⛅", max: 32.8, min: 27.1 },
      { date: "Sun", icon: "🌦️", max: 31.2, min: 26.3 },
      { date: "Mon", icon: "🌧️", max: 29.8, min: 25.1 },
    ],
  },
  rainy: {
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    condition: "Rainy",
    temp: 26.8,
    feelsLike: 28.3,
    humidity: 85,
    wind: 18,
    uv: 3,
    hourly: [
      { hour: "Now", icon: "🌧️", temp: 26.8 },
      { hour: "13", icon: "🌧️", temp: 27.1 },
      { hour: "14", icon: "🌦️", temp: 27.5 },
      { hour: "15", icon: "🌦️", temp: 27.8 },
      { hour: "16", icon: "⛅", temp: 28.2 },
    ],
    daily: [
      { date: "Today", icon: "🌧️", max: 28.2, min: 24.5 },
      { date: "Fri", icon: "🌦️", max: 29.5, min: 25.7 },
      { date: "Sat", icon: "⛅", max: 30.8, min: 26.1 },
      { date: "Sun", icon: "☀️", max: 32.2, min: 26.3 },
      { date: "Mon", icon: "☀️", max: 33.8, min: 27.1 },
    ],
  },
  cloudy: {
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    condition: "Cloudy",
    temp: 28.3,
    feelsLike: 29.1,
    humidity: 65,
    wind: 10,
    uv: 5,
    hourly: [
      { hour: "Now", icon: "☁️", temp: 28.3 },
      { hour: "13", icon: "☁️", temp: 28.7 },
      { hour: "14", icon: "⛅", temp: 29.2 },
      { hour: "15", icon: "⛅", temp: 29.5 },
      { hour: "16", icon: "🌤️", temp: 29.8 },
    ],
    daily: [
      { date: "Today", icon: "☁️", max: 29.8, min: 22.5 },
      { date: "Fri", icon: "⛅", max: 30.5, min: 23.7 },
      { date: "Sat", icon: "🌤️", max: 31.8, min: 24.1 },
      { date: "Sun", icon: "☀️", max: 32.2, min: 24.3 },
      { date: "Mon", icon: "☀️", max: 33.8, min: 25.1 },
    ],
  }
};

const WeatherCheck = () => {
  const [city, setCity] = useState("New Delhi");
  const [weather, setWeather] = useState(demoWeatherData.sunny);
  const [weatherType, setWeatherType] = useState("sunny");

  const getWeatherBackground = () => {
    switch(weatherType) {
      case "sunny":
        return "bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100";
      case "rainy":
        return "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100";
      case "cloudy":
        return "bg-gradient-to-br from-gray-100 via-blue-gray-100 to-slate-100";
      default:
        return "bg-gradient-to-br from-blue-100 to-cyan-100";
    }
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      "Sunny": <Sun className="w-8 h-8 text-amber-500" />,
      "Rainy": <CloudRain className="w-8 h-8 text-blue-500" />,
      "Cloudy": <Cloud className="w-8 h-8 text-gray-500" />,
      "Mist": <Cloud className="w-8 h-8 text-gray-400" />,
      "Snow": <CloudSnow className="w-8 h-8 text-blue-200" />,
      "Thunderstorm": <Zap className="w-8 h-8 text-yellow-400" />
    };
    return iconMap[condition] || <Cloud className="w-8 h-8 text-gray-400" />;
  };

  const handleSearch = () => {
    console.log("Searching weather for:", city);
    
    if (city.toLowerCase().includes("mumbai")) {
      setWeather(demoWeatherData.rainy);
      setWeatherType("rainy");
    } else if (city.toLowerCase().includes("bengaluru") || city.toLowerCase().includes("bangalore")) {
      setWeather(demoWeatherData.cloudy);
      setWeatherType("cloudy");
    } else {
      setWeather(demoWeatherData.sunny);
      setWeatherType("sunny");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (city && city !== "New Delhi") {
        handleSearch();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div className={`min-h-screen flex justify-center items-center p-4 transition-all duration-500 ${getWeatherBackground()}`}>
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-4xl">
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800">{weather.city}</h2>
          </div>
          <p className="text-gray-600 mb-4">
            {weather.region}, {weather.country}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-6xl font-bold text-gray-800">{weather.temp}°C</div>
            <div className="text-4xl">
              {getWeatherIcon(weather.condition)}
            </div>
          </div>
          
          <p className="text-xl text-gray-700 capitalize mb-4">{weather.condition.toLowerCase()}</p>
          
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-4 h-4 text-green-500" />
              <span>Wind: {weather.wind} km/h</span>
            </div>
            <div className="flex items-center gap-1">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>UV: {weather.uv}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mt-2">Feels like {weather.feelsLike}°C</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/90 rounded-2xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-500" />
              Today's Forecast
            </h3>
            <div className="grid grid-cols-5 gap-3 text-center">
              {weather.hourly.map((h, idx) => (
                <div key={idx} className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <span className="font-medium text-sm text-gray-700">{h.hour}</span>
                  <span className="text-2xl my-1">{h.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">{h.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              5-Day Forecast
            </h3>
            <div className="space-y-3">
              {weather.daily.map((d, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <span className="font-medium text-gray-700">{d.date}</span>
                  <span className="text-2xl">{d.icon}</span>
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-800">{d.max}°</span>
                    <span className="text-gray-500">{d.min}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">🌱 Farming Advisory</h4>
          <p className="text-sm text-blue-700">
            {weatherType === "sunny" && "Perfect day for irrigation and crop maintenance. Consider morning watering to reduce evaporation."}
            {weatherType === "rainy" && "Good time for rainwater harvesting. Monitor for waterlogging in sensitive crops."}
            {weatherType === "cloudy" && "Ideal conditions for transplanting. Moderate temperature helps reduce plant stress."}
          </p>
        </div>
      </div>
    </div>
  );
};

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default WeatherCheck;