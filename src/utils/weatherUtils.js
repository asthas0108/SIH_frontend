// Weather API utilities for Indian locations
import axios from "axios";

// Indian cities coordinates for quick access
export const INDIAN_CITIES = {
  "new delhi": { lat: 28.6139, lon: 77.209, name: "New Delhi" },
  delhi: { lat: 28.6139, lon: 77.209, name: "Delhi" },
  mumbai: { lat: 19.076, lon: 72.8777, name: "Mumbai" },
  bangalore: { lat: 12.9716, lon: 77.5946, name: "Bangalore" },
  bengaluru: { lat: 12.9716, lon: 77.5946, name: "Bengaluru" },
  hyderabad: { lat: 17.385, lon: 78.4867, name: "Hyderabad" },
  ahmedabad: { lat: 23.0225, lon: 72.5714, name: "Ahmedabad" },
  chennai: { lat: 13.0827, lon: 80.2707, name: "Chennai" },
  kolkata: { lat: 22.5726, lon: 88.3639, name: "Kolkata" },
  pune: { lat: 18.5204, lon: 73.8567, name: "Pune" },
  jaipur: { lat: 26.9124, lon: 75.7873, name: "Jaipur" },
  lucknow: { lat: 26.8467, lon: 80.9462, name: "Lucknow" },
  kanpur: { lat: 26.4499, lon: 80.3319, name: "Kanpur" },
  nagpur: { lat: 21.1458, lon: 79.0882, name: "Nagpur" },
  indore: { lat: 22.7196, lon: 75.8577, name: "Indore" },
  thane: { lat: 19.2183, lon: 72.9781, name: "Thane" },
  bhopal: { lat: 23.2599, lon: 77.4126, name: "Bhopal" },
  visakhapatnam: { lat: 17.6868, lon: 83.2185, name: "Visakhapatnam" },
  "pimpri chinchwad": { lat: 18.6298, lon: 73.7997, name: "Pimpri Chinchwad" },
  patna: { lat: 25.5941, lon: 85.1376, name: "Patna" },
  vadodara: { lat: 22.3072, lon: 73.1812, name: "Vadodara" },
  ghaziabad: { lat: 28.6692, lon: 77.4538, name: "Ghaziabad" },
  ludhiana: { lat: 30.901, lon: 75.8573, name: "Ludhiana" },
  agra: { lat: 27.1767, lon: 78.0081, name: "Agra" },
  nashik: { lat: 19.9975, lon: 73.7898, name: "Nashik" },
  faridabad: { lat: 28.4089, lon: 77.3178, name: "Faridabad" },
  meerut: { lat: 28.9845, lon: 77.7064, name: "Meerut" },
  rajkot: { lat: 22.3039, lon: 70.8022, name: "Rajkot" },
  "kalyan dombivali": { lat: 19.2403, lon: 73.1305, name: "Kalyan Dombivali" },
  "vasai virar": { lat: 19.4912, lon: 72.8054, name: "Vasai Virar" },
  varanasi: { lat: 25.3176, lon: 82.9739, name: "Varanasi" },
  srinagar: { lat: 34.0837, lon: 74.7973, name: "Srinagar" },
  aurangabad: { lat: 19.8762, lon: 75.3433, name: "Aurangabad" },
  dhanbad: { lat: 23.7957, lon: 86.4304, name: "Dhanbad" },
  amritsar: { lat: 31.634, lon: 74.8723, name: "Amritsar" },
  "navi mumbai": { lat: 19.033, lon: 73.0297, name: "Navi Mumbai" },
  allahabad: { lat: 25.4358, lon: 81.8463, name: "Allahabad" },
  ranchi: { lat: 23.3441, lon: 85.3096, name: "Ranchi" },
  howrah: { lat: 22.5958, lon: 88.2636, name: "Howrah" },
  coimbatore: { lat: 11.0168, lon: 76.9558, name: "Coimbatore" },
  jabalpur: { lat: 23.1815, lon: 79.9864, name: "Jabalpur" },
  gwalior: { lat: 26.2183, lon: 78.1828, name: "Gwalior" },
  vijayawada: { lat: 16.5062, lon: 80.648, name: "Vijayawada" },
  jodhpur: { lat: 26.2389, lon: 73.0243, name: "Jodhpur" },
  madurai: { lat: 9.9252, lon: 78.1198, name: "Madurai" },
  raipur: { lat: 21.2514, lon: 81.6296, name: "Raipur" },
  kota: { lat: 25.2138, lon: 75.8648, name: "Kota" },
  guwahati: { lat: 26.1445, lon: 91.7362, name: "Guwahati" },
  chandigarh: { lat: 30.7333, lon: 76.7794, name: "Chandigarh" },
  solapur: { lat: 17.6599, lon: 75.9064, name: "Solapur" },
  "hubli dharwad": { lat: 15.3647, lon: 75.124, name: "Hubli Dharwad" },
  bareilly: { lat: 28.367, lon: 79.4304, name: "Bareilly" },
  moradabad: { lat: 28.8386, lon: 78.7733, name: "Moradabad" },
  mysore: { lat: 12.2958, lon: 76.6394, name: "Mysore" },
  gurgaon: { lat: 28.4595, lon: 77.0266, name: "Gurgaon" },
  aligarh: { lat: 27.8974, lon: 78.088, name: "Aligarh" },
  jalandhar: { lat: 31.326, lon: 75.5762, name: "Jalandhar" },
  tiruchirappalli: { lat: 10.7905, lon: 78.7047, name: "Tiruchirappalli" },
  bhubaneswar: { lat: 20.2961, lon: 85.8245, name: "Bhubaneswar" },
  salem: { lat: 11.6643, lon: 78.146, name: "Salem" },
  warangal: { lat: 17.9689, lon: 79.5941, name: "Warangal" },
  "mira bhayandar": { lat: 19.2952, lon: 72.8544, name: "Mira Bhayandar" },
  thiruvananthapuram: { lat: 8.5241, lon: 76.9366, name: "Thiruvananthapuram" },
  bhiwandi: { lat: 19.3002, lon: 73.0685, name: "Bhiwandi" },
  saharanpur: { lat: 29.968, lon: 77.5552, name: "Saharanpur" },
  guntur: { lat: 16.3067, lon: 80.4365, name: "Guntur" },
  amravati: { lat: 20.9374, lon: 77.7796, name: "Amravati" },
  bikaner: { lat: 28.0229, lon: 73.3119, name: "Bikaner" },
  noida: { lat: 28.5355, lon: 77.391, name: "Noida" },
  jamshedpur: { lat: 22.8046, lon: 86.2029, name: "Jamshedpur" },
  "bhilai nagar": { lat: 21.1938, lon: 81.3509, name: "Bhilai Nagar" },
  cuttack: { lat: 20.4625, lon: 85.8828, name: "Cuttack" },
  firozabad: { lat: 27.1592, lon: 78.3957, name: "Firozabad" },
  kochi: { lat: 9.9312, lon: 76.2673, name: "Kochi" },
  bhavnagar: { lat: 21.7645, lon: 72.1519, name: "Bhavnagar" },
  dehradun: { lat: 30.3165, lon: 78.0322, name: "Dehradun" },
  durgapur: { lat: 23.5204, lon: 87.3119, name: "Durgapur" },
  asansol: { lat: 23.6739, lon: 86.9524, name: "Asansol" },
  "nanded waghala": { lat: 19.1383, lon: 77.2975, name: "Nanded Waghala" },
  kolhapur: { lat: 16.705, lon: 74.2433, name: "Kolhapur" },
  ajmer: { lat: 26.4499, lon: 74.6399, name: "Ajmer" },
  akola: { lat: 20.7002, lon: 77.0082, name: "Akola" },
  gulbarga: { lat: 17.3297, lon: 76.8343, name: "Gulbarga" },
  jamnagar: { lat: 22.4707, lon: 70.0577, name: "Jamnagar" },
  ujjain: { lat: 23.1765, lon: 75.7885, name: "Ujjain" },
  loni: { lat: 28.7333, lon: 77.2833, name: "Loni" },
  siliguri: { lat: 26.7271, lon: 88.3953, name: "Siliguri" },
  jhansi: { lat: 25.4484, lon: 78.5685, name: "Jhansi" },
  ulhasnagar: { lat: 19.2215, lon: 73.1645, name: "Ulhasnagar" },
  jammu: { lat: 32.7266, lon: 74.857, name: "Jammu" },
  "sangli miraj kupwad": {
    lat: 16.8524,
    lon: 74.5815,
    name: "Sangli Miraj Kupwad",
  },
  mangalore: { lat: 12.9141, lon: 74.856, name: "Mangalore" },
  erode: { lat: 11.341, lon: 77.7172, name: "Erode" },
  belgaum: { lat: 15.8497, lon: 74.4977, name: "Belgaum" },
  ambattur: { lat: 13.1143, lon: 80.1548, name: "Ambattur" },
  tirunelveli: { lat: 8.7139, lon: 77.7567, name: "Tirunelveli" },
  malegaon: { lat: 20.5579, lon: 74.5287, name: "Malegaon" },
  gaya: { lat: 24.7914, lon: 85.0002, name: "Gaya" },
  jalgaon: { lat: 21.0077, lon: 75.5626, name: "Jalgaon" },
  udaipur: { lat: 24.5854, lon: 73.7125, name: "Udaipur" },
  maheshtala: { lat: 22.5093, lon: 88.2482, name: "Maheshtala" },
};

// Enhanced location search with Indian city suggestions
export const searchIndianCities = (query) => {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  return Object.entries(INDIAN_CITIES)
    .filter(
      ([key, city]) =>
        key.includes(normalizedQuery) ||
        city.name.toLowerCase().includes(normalizedQuery)
    )
    .map(([key, city]) => city)
    .slice(0, 5); // Return top 5 matches
};

// Get coordinates for Indian city
export const getIndianCityCoordinates = (cityName) => {
  const normalizedName = cityName.toLowerCase().trim();
  return INDIAN_CITIES[normalizedName] || null;
};

// Enhanced error handling for API calls
export const handleWeatherAPIError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || "";

    switch (status) {
      case 401:
        return "Invalid API key. Please check your OpenWeatherMap API key.";
      case 404:
        return "City not found. Please check the spelling and try again.";
      case 429:
        return "API rate limit exceeded. Please try again in a few minutes.";
      case 500:
        return "Weather service is temporarily unavailable. Please try again later.";
      default:
        return `Weather API error: ${message || "Unknown error occurred"}`;
    }
  } else if (error.request) {
    return "Network error. Please check your internet connection.";
  } else {
    return "An unexpected error occurred. Please try again.";
  }
};

// Air Quality Index mapping
export const getAQIDescription = (aqi) => {
  const aqiMap = {
    1: { level: "Good", color: "text-green-600", bg: "bg-green-50" },
    2: { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" },
    3: { level: "Moderate", color: "text-orange-600", bg: "bg-orange-50" },
    4: { level: "Poor", color: "text-red-600", bg: "bg-red-50" },
    5: { level: "Very Poor", color: "text-purple-600", bg: "bg-purple-50" },
  };
  return (
    aqiMap[aqi] || {
      level: "Unknown",
      color: "text-gray-600",
      bg: "bg-gray-50",
    }
  );
};

// Alternative weather APIs for backup
export const weatherAPIs = {
  openweather: {
    baseUrl: "https://api.openweathermap.org/data/2.5",
    key: import.meta.env.VITE_OPENWEATHER_API_KEY,
    name: "OpenWeatherMap",
  },
  weatherapi: {
    baseUrl: "https://api.weatherapi.com/v1",
    key: import.meta.env.VITE_WEATHERAPI_KEY,
    name: "WeatherAPI",
  },
};

// Farming advice based on weather conditions
export const getFarmingAdviceByCondition = (weather) => {
  const condition = weather.weather[0].main.toLowerCase();
  const temp = weather.main.temp;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed * 3.6; // Convert m/s to km/h
  const season = getCurrentSeason();

  let advice = "";

  // Temperature-based advice
  if (temp > 40) {
    advice +=
      "🌡️ Extreme heat warning! Provide shade nets for crops. Increase irrigation frequency. Avoid midday field work. ";
  } else if (temp > 35) {
    advice +=
      "🔥 High temperature alert! Early morning irrigation recommended. Monitor crops for heat stress. ";
  } else if (temp < 5) {
    advice +=
      "❄️ Cold wave warning! Protect sensitive crops with covers. Avoid watering in evening. ";
  }

  // Condition-based advice
  if (condition.includes("rain")) {
    advice +=
      "🌧️ Rainy conditions: Good for rainwater harvesting. Check drainage systems. Avoid spraying pesticides. Monitor for fungal diseases. ";
  } else if (condition.includes("clear") || condition.includes("sunny")) {
    advice +=
      "☀️ Clear weather: Perfect for field operations. Ideal time for spraying and fertilizer application. ";
  } else if (condition.includes("cloud")) {
    advice +=
      "☁️ Cloudy conditions: Good for transplanting. Reduced evaporation - adjust irrigation accordingly. ";
  } else if (condition.includes("thunder")) {
    advice +=
      "⛈️ Thunderstorm warning! Secure equipment and livestock. Avoid field work. ";
  }

  // Humidity-based advice
  if (humidity > 80) {
    advice +=
      "💧 High humidity: Monitor for fungal diseases. Ensure good air circulation in crops. ";
  } else if (humidity < 30) {
    advice +=
      "🏜️ Low humidity: Increase irrigation frequency. Mulch to retain soil moisture. ";
  }

  // Wind-based advice
  if (windSpeed > 25) {
    advice +=
      "💨 High wind conditions: Secure greenhouse structures. Avoid spraying. Good for pollination. ";
  }

  // Seasonal advice
  if (season === "monsoon") {
    advice +=
      "🌾 Monsoon season: Perfect time for Kharif sowing. Ensure proper drainage. ";
  } else if (season === "winter") {
    advice += "🌱 Winter season: Good for Rabi crops. Protect from frost. ";
  } else if (season === "summer") {
    advice +=
      "🌞 Summer season: Focus on irrigation management. Harvest ready crops early morning. ";
  }

  return (
    advice.trim() ||
    "Monitor your crops regularly. Adjust farming practices based on local conditions."
  );
};

// Get current season in India
const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1; // 1-12

  if (month >= 6 && month <= 9) {
    return "monsoon";
  } else if (month >= 10 && month <= 2) {
    return "winter";
  } else {
    return "summer";
  }
};

export default {
  INDIAN_CITIES,
  searchIndianCities,
  getIndianCityCoordinates,
  handleWeatherAPIError,
  getAQIDescription,
  weatherAPIs,
  getFarmingAdviceByCondition,
};
