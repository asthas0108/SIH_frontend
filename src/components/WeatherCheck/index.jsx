import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Droplets,
  Wind,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  Loader2,
  AlertCircle,
  Navigation,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import {
  searchIndianCities,
  getIndianCityCoordinates,
  handleWeatherAPIError,
  getFarmingAdviceByCondition,
} from "../../utils/weatherUtils";

// OpenWeatherMap API configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const WeatherCheck = () => {
  const [city, setCity] = useState("New Delhi");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Check if API key is configured
  const isAPIConfigured = API_KEY && API_KEY.trim() !== "";
  
  // Debug logging (remove in production)
  useEffect(() => {
    console.log('API Key loaded:', API_KEY ? 'Present' : 'Missing');
    console.log('API Key length:', API_KEY ? API_KEY.length : 0);
    console.log('Is API Configured:', isAPIConfigured);
    
    // Test API key validity
    if (API_KEY) {
      testAPIKey();
    }
  }, []);

  // Test API key function
  const testAPIKey = async () => {
    try {
      const testResponse = await axios.get(
        `${BASE_URL}/weather?q=Delhi,IN&appid=${API_KEY}&units=metric`
      );
      console.log('API Key test successful:', testResponse.status);
    } catch (error) {
      console.error('API Key test failed:', error.response?.status, error.response?.data?.message);
    }
  };

  // Function to get weather icon based on OpenWeatherMap icon code
  const getWeatherIconFromCode = (iconCode, isLarge = false) => {
    const size = isLarge ? "w-16 h-16" : "w-8 h-8";

    const iconMap = {
      "01d": <Sun className={`${size} text-amber-500`} />, // clear sky day
      "01n": <Sun className={`${size} text-amber-400`} />, // clear sky night
      "02d": <Cloud className={`${size} text-gray-400`} />, // few clouds day
      "02n": <Cloud className={`${size} text-gray-500`} />, // few clouds night
      "03d": <Cloud className={`${size} text-gray-500`} />, // scattered clouds
      "03n": <Cloud className={`${size} text-gray-600`} />,
      "04d": <Cloud className={`${size} text-gray-600`} />, // broken clouds
      "04n": <Cloud className={`${size} text-gray-700`} />,
      "09d": <CloudRain className={`${size} text-blue-500`} />, // shower rain
      "09n": <CloudRain className={`${size} text-blue-600`} />,
      "10d": <CloudRain className={`${size} text-blue-500`} />, // rain
      "10n": <CloudRain className={`${size} text-blue-600`} />,
      "11d": <Zap className={`${size} text-yellow-500`} />, // thunderstorm
      "11n": <Zap className={`${size} text-yellow-600`} />,
      "13d": <CloudSnow className={`${size} text-blue-200`} />, // snow
      "13n": <CloudSnow className={`${size} text-blue-300`} />,
      "50d": <Cloud className={`${size} text-gray-400`} />, // mist
      "50n": <Cloud className={`${size} text-gray-500`} />,
    };

    return iconMap[iconCode] || <Cloud className={`${size} text-gray-400`} />;
  };

  // Function to get emoji icon for forecast
  const getEmojiIcon = (iconCode) => {
    const emojiMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "🌤️",
      "02n": "🌙",
      "03d": "⛅",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌦️",
      "09n": "🌧️",
      "10d": "🌧️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "🌨️",
      "13n": "🌨️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return emojiMap[iconCode] || "☁️";
  };

  // Function to get current location
  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          setError(
            "Unable to get your location. Please search for a city manually."
          );
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  // Fetch weather data by coordinates
  const fetchWeatherByCoordinates = async (lat, lon) => {
    if (!isAPIConfigured) {
      setError(
        "API key not configured. Please add your OpenWeatherMap API key to the .env file."
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('Making API call with key:', API_KEY ? `${API_KEY.substring(0, 8)}...` : 'undefined');

      // Current weather
      const currentResponse = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      // 5-day forecast
      const forecastResponse = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setWeather(currentResponse.data);
      setForecast(forecastResponse.data);
      setCity(currentResponse.data.name);
    } catch (err) {
      console.error("Detailed API Error:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        message: err.response?.data?.message,
        url: err.config?.url
      });
      setError(handleWeatherAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data by city name
  const fetchWeatherByCity = async (cityName) => {
    if (!isAPIConfigured) {
      setError(
        "API key not configured. Please add your OpenWeatherMap API key to the .env file."
      );
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Try to get coordinates from Indian cities first
      const cityCoords = getIndianCityCoordinates(cityName);

      let currentResponse, forecastResponse;

      if (cityCoords) {
        // Use coordinates for more accurate results
        currentResponse = await axios.get(
          `${BASE_URL}/weather?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${API_KEY}&units=metric`
        );
        forecastResponse = await axios.get(
          `${BASE_URL}/forecast?lat=${cityCoords.lat}&lon=${cityCoords.lon}&appid=${API_KEY}&units=metric`
        );
      } else {
        // Fallback to city name search
        currentResponse = await axios.get(
          `${BASE_URL}/weather?q=${cityName},IN&appid=${API_KEY}&units=metric`
        );
        forecastResponse = await axios.get(
          `${BASE_URL}/forecast?q=${cityName},IN&appid=${API_KEY}&units=metric`
        );
      }

      setWeather(currentResponse.data);
      setForecast(forecastResponse.data);
      setCoordinates({
        lat: currentResponse.data.coord.lat,
        lon: currentResponse.data.coord.lon,
      });
      setShowSuggestions(false);
    } catch (err) {
      setError(handleWeatherAPIError(err));
      console.error("Weather API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle city input change with suggestions
  const handleCityChange = (value) => {
    setCity(value);

    if (value.length > 1) {
      const citySuggestions = searchIndianCities(value);
      setSuggestions(citySuggestions);
      setShowSuggestions(citySuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Select suggestion
  const selectSuggestion = (suggestion) => {
    setCity(suggestion.name);
    setShowSuggestions(false);
    fetchWeatherByCity(suggestion.name);
  };

  const getWeatherBackground = () => {
    if (!weather) return "bg-gradient-to-br from-blue-100 to-cyan-100";

    const iconCode = weather.weather[0].icon;
    const mainCondition = weather.weather[0].main.toLowerCase();

    if (iconCode.includes("01")) {
      return "bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100";
    } else if (
      mainCondition.includes("rain") ||
      mainCondition.includes("drizzle")
    ) {
      return "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100";
    } else if (mainCondition.includes("cloud")) {
      return "bg-gradient-to-br from-gray-100 via-blue-gray-100 to-slate-100";
    } else if (mainCondition.includes("thunder")) {
      return "bg-gradient-to-br from-gray-200 via-purple-100 to-indigo-100";
    } else {
      return "bg-gradient-to-br from-blue-100 to-cyan-100";
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherByCity(city.trim());
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-IN", { weekday: "short" });
    }
  };

  const getDailyForecast = () => {
    if (!forecast) return [];

    const dailyData = {};
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          date: item.dt,
          temps: [],
          icon: item.weather[0].icon,
          condition: item.weather[0].main,
        };
      }
      dailyData[date].temps.push(item.main.temp);
    });

    return Object.values(dailyData)
      .slice(0, 5)
      .map((day) => ({
        date: formatDate(day.date),
        icon: getEmojiIcon(day.icon),
        max: Math.round(Math.max(...day.temps)),
        min: Math.round(Math.min(...day.temps)),
      }));
  };

  const getHourlyForecast = () => {
    if (!forecast) return [];

    return forecast.list.slice(0, 5).map((item) => ({
      hour: formatTime(item.dt),
      icon: getEmojiIcon(item.weather[0].icon),
      temp: Math.round(item.main.temp),
    }));
  };

  const getFarmingAdvice = () => {
    if (!weather) return "Loading weather data...";
    return getFarmingAdviceByCondition(weather);
  };

  // Click outside handler for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Load weather for Delhi by default if API is configured
    if (isAPIConfigured) {
      fetchWeatherByCity("New Delhi");
    } else {
      setError(
        "Please configure your OpenWeatherMap API key in the .env file to get real-time weather data."
      );
    }
  }, []);

  // Show API configuration notice if not configured
  if (!isAPIConfigured) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-blue-100 to-cyan-100">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            API Configuration Required
          </h2>
          <p className="text-gray-600 mb-6">
            To get real-time weather data for Indian locations, you need to
            configure your OpenWeatherMap API key.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">
              Setup Instructions:
            </h3>
            <ol className="text-sm text-gray-600 space-y-2">
              <li>
                1. Get a free API key from{" "}
                <a
                  href="https://openweathermap.org/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  OpenWeatherMap
                </a>
              </li>
              <li>
                2. Open the{" "}
                <code className="bg-gray-200 px-1 rounded">.env</code> file in
                your project root
              </li>
              <li>
                3. Replace{" "}
                <code className="bg-gray-200 px-1 rounded">
                  your_api_key_here
                </code>{" "}
                with your actual API key
              </li>
              <li>4. Restart your development server</li>
            </ol>
          </div>
          <p className="text-sm text-gray-500">
            Once configured, you'll have access to real-time weather data for
            all Indian cities with location-based services.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-blue-100 to-cyan-100">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-4 transition-all duration-500 ${getWeatherBackground()}`}
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-4xl">
        {/* Search Section */}
        <div className="flex gap-3 mb-8" ref={searchRef}>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder="Enter Indian city name (e.g., Mumbai, Delhi, Bangalore)..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />

            {/* City Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 border-b last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-800">{suggestion.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {suggestion.lat.toFixed(2)}, {suggestion.lon.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Search
          </button>
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50"
            title="Get current location weather"
          >
            <Navigation className="w-4 h-4" />
            Location
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <>
            {/* Current Weather */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {weather.name}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                {weather.sys.country === "IN"
                  ? `${weather.name}, India`
                  : `${weather.name}, ${weather.sys.country}`}
              </p>

              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-6xl font-bold text-gray-800">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="text-4xl">
                  {getWeatherIconFromCode(weather.weather[0].icon, true)}
                </div>
              </div>

              <p className="text-xl text-gray-700 capitalize mb-4">
                {weather.weather[0].description}
              </p>

              <div className="flex justify-center gap-6 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Humidity: {weather.main.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4 text-green-500" />
                  <span>Wind: {Math.round(weather.wind.speed * 3.6)} km/h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Pressure: {weather.main.pressure} hPa</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span>
                    Visibility:{" "}
                    {weather.visibility
                      ? `${(weather.visibility / 1000).toFixed(1)} km`
                      : "N/A"}
                  </span>
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Feels like {Math.round(weather.main.feels_like)}°C
              </p>

              {/* Additional Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-600 font-medium">Min Temp</p>
                  <p className="text-blue-800 font-bold">
                    {Math.round(weather.main.temp_min)}°C
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-red-600 font-medium">Max Temp</p>
                  <p className="text-red-800 font-bold">
                    {Math.round(weather.main.temp_max)}°C
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-600 font-medium">Sunrise</p>
                  <p className="text-green-800 font-bold">
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                      "en-IN",
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-orange-600 font-medium">Sunset</p>
                  <p className="text-orange-800 font-bold">
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                      "en-IN",
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Forecast Sections */}
            {forecast && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Hourly Forecast */}
                <div className="bg-white/90 rounded-2xl shadow-md p-5">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <Wind className="w-5 h-5 text-blue-500" />
                    Hourly Forecast
                  </h3>
                  <div className="grid grid-cols-5 gap-3 text-center">
                    {getHourlyForecast().map((h, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-medium text-sm text-gray-700">
                          {h.hour}
                        </span>
                        <span className="text-2xl my-1">{h.icon}</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {h.temp}°
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Forecast */}
                <div className="bg-white/90 rounded-2xl shadow-md p-5">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    5-Day Forecast
                  </h3>
                  <div className="space-y-3">
                    {getDailyForecast().map((d, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <span className="font-medium text-gray-700 w-20">
                          {d.date}
                        </span>
                        <span className="text-2xl">{d.icon}</span>
                        <div className="flex gap-2">
                          <span className="font-semibold text-gray-800">
                            {d.max}°
                          </span>
                          <span className="text-gray-500">{d.min}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Farming Advisory */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                🌱 Smart Farming Advisory
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                  Live Data
                </span>
              </h4>
              <p className="text-sm text-blue-700">{getFarmingAdvice()}</p>
            </div>

            {/* Data Source Info */}
            <div className="mt-4 text-center text-xs text-gray-500">
              <p>
                Last updated:{" "}
                {new Date(weather.dt * 1000).toLocaleString("en-IN")} | Data
                source: OpenWeatherMap | Coordinates:{" "}
                {weather.coord.lat.toFixed(2)}, {weather.coord.lon.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Calendar = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default WeatherCheck;
