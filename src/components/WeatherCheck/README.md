# Real-Time Weather Check for Indian Locations

This component provides real-time weather data for Indian cities using the OpenWeatherMap API. It includes smart farming advisories, location-based services, and comprehensive weather forecasts.

## Features

### 🌍 Real-Time Weather Data

- Current weather conditions for any Indian city
- 5-day detailed weather forecast
- Hourly weather predictions
- Real-time updates with automatic refresh

### 📍 Location Services

- **GPS Location Detection**: Get weather for your current location
- **Smart City Search**: Auto-complete suggestions for 100+ Indian cities
- **Coordinate-based Accuracy**: Uses lat/lon for precise weather data
- **Major Cities Database**: Pre-configured coordinates for accurate results

### 🌾 Smart Farming Advisory

- **Temperature-based advice**: Heat/cold wave warnings and recommendations
- **Condition-specific guidance**: Rain, sunny, cloudy weather farming tips
- **Seasonal recommendations**: Monsoon, winter, summer farming practices
- **Humidity & wind analysis**: Irrigation and crop protection advice
- **Real-time alerts**: Weather-based farming action items

### 🎨 Enhanced UI/UX

- **Dynamic backgrounds**: Changes based on weather conditions
- **Loading states**: Smooth loading animations
- **Error handling**: Comprehensive error messages and fallbacks
- **Responsive design**: Works on all device sizes
- **Accessibility**: Keyboard navigation and screen reader support

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "My API Keys" section
4. Copy your API key

### 2. Configure Environment Variables

Create or update the `.env` file in your project root:

```env
# OpenWeatherMap API Configuration
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

**Important**: Replace `your_actual_api_key_here` with your real API key from OpenWeatherMap.

### 3. Install Dependencies

Make sure you have the required dependencies installed:

```bash
npm install axios lucide-react
```

### 4. Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## Supported Indian Cities

The component includes pre-configured coordinates for 100+ major Indian cities including:

### Metropolitan Cities

- New Delhi, Mumbai, Bangalore, Hyderabad, Ahmedabad, Chennai, Kolkata, Pune

### State Capitals

- Jaipur, Lucknow, Bhopal, Gandhinagar, Thiruvananthapuram, Bhubaneswar, Chandigarh

### Major Cities

- Agra, Amritsar, Coimbatore, Guwahati, Indore, Kanpur, Kochi, Madurai, Nagpur, Patna, Rajkot, Salem, Surat, Varanasi, Vijayawada

### And many more...

## API Features

### Current Weather Data

- Temperature (°C)
- Feels like temperature
- Weather condition and description
- Humidity percentage
- Wind speed (km/h)
- Atmospheric pressure
- Visibility
- Sunrise/sunset times
- Min/max temperatures

### Forecast Data

- **Hourly Forecast**: Next 5 hours with temperature and conditions
- **Daily Forecast**: 5-day forecast with high/low temperatures
- **Weather Icons**: Visual representation of weather conditions

### Location Data

- City name and coordinates
- Country information
- Timezone data
- Geographic precision

## Error Handling

The component handles various error scenarios:

### API Errors

- **401 Unauthorized**: Invalid API key
- **404 Not Found**: City not found
- **429 Rate Limited**: API quota exceeded
- **500 Server Error**: Service unavailable

### Network Errors

- **Connection Issues**: No internet connectivity
- **Timeout Errors**: Slow network responses
- **CORS Issues**: Cross-origin request problems

### User Errors

- **Invalid City Names**: Spelling mistakes or non-existent cities
- **Location Access Denied**: GPS permission not granted
- **Empty Search**: No city name provided

## Performance Optimizations

### Efficient API Calls

- **Coordinate-based Queries**: More accurate than city name searches
- **Batch Requests**: Current weather + forecast in parallel
- **Caching Strategy**: Reduces unnecessary API calls
- **Smart Debouncing**: Delays search until user stops typing

### UI Optimizations

- **Progressive Loading**: Show data as it becomes available
- **Smooth Transitions**: CSS animations for better UX
- **Responsive Images**: Optimized weather icons
- **Lazy Loading**: Load forecast data on demand

## Farming Advisory System

### Weather-Based Recommendations

#### Temperature Alerts

- **>40°C**: Extreme heat warnings, shade net recommendations
- **35-40°C**: High temperature alerts, irrigation timing
- **<5°C**: Cold wave protection, frost warnings

#### Condition-Specific Advice

- **Rainy**: Drainage monitoring, pesticide application timing
- **Sunny**: Optimal field work conditions, irrigation scheduling
- **Cloudy**: Transplanting opportunities, reduced evaporation
- **Thunderstorm**: Equipment safety, livestock protection

#### Seasonal Guidance

- **Monsoon (June-September)**: Kharif crop sowing, drainage management
- **Winter (October-February)**: Rabi crop cultivation, frost protection
- **Summer (March-May)**: Irrigation management, heat stress prevention

### Advanced Features

- **Humidity Analysis**: Fungal disease risk assessment
- **Wind Speed Monitoring**: Spraying operation feasibility
- **Multi-factor Analysis**: Combined weather parameter evaluation

## Technical Implementation

### Component Structure

```
WeatherCheck/
├── index.jsx           # Main component
├── weatherUtils.js     # Utility functions
└── README.md          # Documentation
```

### Key Technologies

- **React Hooks**: useState, useEffect, useRef
- **Axios**: HTTP client for API calls
- **Lucide React**: Modern icon library
- **Tailwind CSS**: Utility-first styling
- **Vite Environment Variables**: Secure API key management

### Data Flow

1. User input (city search or location)
2. Coordinate resolution (city database or geocoding)
3. API calls (current weather + forecast)
4. Data processing and formatting
5. UI rendering with weather-specific styling
6. Farming advisory generation

## Troubleshooting

### Common Issues

#### "API key not configured" Error

- Check if `.env` file exists in project root
- Verify `VITE_OPENWEATHER_API_KEY` is set correctly
- Restart development server after adding API key

#### "City not found" Error

- Check spelling of city name
- Try searching with state name (e.g., "Pune, Maharashtra")
- Use the auto-complete suggestions

#### Location Access Denied

- Enable location permissions in browser
- Try manual city search instead
- Check if HTTPS is enabled (required for geolocation)

#### API Rate Limit Exceeded

- Free OpenWeatherMap accounts have 1000 calls/day limit
- Upgrade to paid plan for higher limits
- Implement caching to reduce API calls

### Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Features Required**: ES6+, Fetch API, Geolocation API

## Future Enhancements

### Planned Features

- **Air Quality Index**: Real-time pollution data
- **Soil Moisture Integration**: IoT sensor data
- **Crop-Specific Advice**: Customized recommendations by crop type
- **Weather Alerts**: Push notifications for severe weather
- **Historical Data**: Weather pattern analysis
- **Multi-language Support**: Regional language options

### API Integrations

- **Weather API**: Backup weather data source
- **Soil API**: Soil condition monitoring
- **Satellite Imagery**: Crop health assessment
- **Market Prices**: Weather impact on crop prices

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Add your enhancements
4. Test thoroughly with different cities
5. Submit a pull request

## License

This project is part of the Smart India Hackathon submission and follows the project's licensing terms.

## Support

For issues or questions:

- Check the troubleshooting section above
- Review OpenWeatherMap API documentation
- Contact the development team

---

**Note**: This component is designed specifically for Indian agricultural needs and includes comprehensive farming advisory features based on real-time weather data.
