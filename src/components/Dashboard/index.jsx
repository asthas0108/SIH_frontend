import React, { useState, useEffect } from 'react';
import './KisanMitraDashboard.css';

const KisanMitraDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
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

  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    forecast: [
      { day: 'Today', high: 30, low: 22, condition: 'Partly Cloudy' },
      { day: 'Wed', high: 31, low: 23, condition: 'Sunny' },
      { day: 'Thu', high: 29, low: 22, condition: 'Cloudy' },
      { day: 'Fri', high: 28, low: 21, condition: 'Rain' },
      { day: 'Sat', high: 27, low: 20, condition: 'Rain' },
    ]
  });

  // Mock data
  const predictions = [
    {
      id: 1,
      item: "Wheat",
      area: "5 acres",
      year: 2023,
      predicted_yield: "18-22 quintals/acre",
      unit: "quintals",
      predicted_crop: "Wheat",
      suitability_score: "7/10",
      best_planting_time: "Mid-October to Mid-November",
      harvest_period: "Late March to Mid-April",
      water_requirements: "6-7 light irrigations",
      fertilizer_recommendations: "N:P:K = 120:60:40 kg/hectare",
      soil_condition: "Sandy soil",
      expected_yield: "45-55 quintals/hectare",
      expected_market_price: "INR 2,200 - 2,500/quintal",
      summary: "Wheat cultivation on sandy soil requires careful management of irrigation and fertilization.",
      created_at: "2023-09-15T10:30:00Z"
    }
  ];

  const recommendations = [
    {
      id: 1,
      predicted_crop: "Wheat",
      suitability_score: "7/10",
      best_planting_time: "Mid-October to Mid-November",
      harvest_period: "Late March to Mid-April",
      water_requirements: "Sprinkler irrigation recommended",
      fertilizer_recommendations: "DAP: 100-110 kg/acre, Urea: 80-100 kg/acre",
      soil_condition: "Sandy soil - amend with organic matter",
      expected_yield: "18-22 quintals/acre",
      expected_market_price: "INR 2,200 - 2,500/quintal",
      risk_factors: [
        "Weather variability",
        "Sandy soil challenges",
        "Pest & disease outbreaks"
      ],
      summary: "Wheat is suitable but requires careful management of sandy soil.",
      created_at: "2023-09-10T14:45:00Z"
    }
  ];

  const guidance = {
    summary: "This guide provides a comprehensive framework for successful wheat cultivation on 5 acres of sandy soil in Gorakhpur, Uttar Pradesh.",
    risk_factors: [
      "*Weather Variability:* Unseasonal rains, hailstorms, cold waves, or terminal heat stress can significantly impact yield and quality.",
      "*Sandy Soil Challenges:* Low water and nutrient retention, requiring precise management.",
      "*Pest & Disease Outbreaks:* Can cause substantial yield losses if not managed effectively."
    ],
    expected_yield: {
      potential_yield: "With good management practices, suitable variety, and addressing sandy soil challenges, a yield of 45-55 quintals/hectare (approx. 18-22 quintals/acre) can be expected.",
      factors_affecting: "Variety, timely sowing, balanced nutrition, adequate irrigation, effective pest/weed control, and weather conditions."
    },
    predicted_crop: "Wheat (Triticum aestivum)",
    suitability_score: {
      score: "7/10",
      rationale: "Wheat is a suitable Rabi crop for Gorakhpur, Uttar Pradesh, known for its fertile Indo-Gangetic plains. However, the 'sandy' soil type is a significant limiting factor."
    },
    best_planting_time: "Mid-October to Mid-November (Optimal: First two weeks of November) for Gorakhpur, Uttar Pradesh."
  };

  const cropCalendarData = [
    { month: 'Jan', crops: 'Wheat (growing)', progress: 70 },
    { month: 'Feb', crops: 'Wheat (growing)', progress: 90 },
    { month: 'Mar', crops: 'Wheat (harvest)', progress: 30 },
    { month: 'Apr', crops: 'Rice (prep)', progress: 10 },
    { month: 'May', crops: 'Rice (planting)', progress: 40 },
    { month: 'Jun', crops: 'Rice (growing)', progress: 60 },
    { month: 'Jul', crops: 'Rice (growing)', progress: 80 },
    { month: 'Aug', crops: 'Rice (growing)', progress: 90 },
    { month: 'Sep', crops: 'Rice (harvest)', progress: 40 },
    { month: 'Oct', crops: 'Wheat (prep)', progress: 20 },
    { month: 'Nov', crops: 'Wheat (planting)', progress: 50 },
    { month: 'Dec', crops: 'Wheat (growing)', progress: 30 },
  ];

  const governmentSchemes = [
    { name: "PM-KISAN", description: "Income support scheme for farmers", status: "Active", link: "#" },
    { name: "PMFBY", description: "Crop insurance scheme", status: "Active", link: "#" },
    { name: "KCC", description: "Credit support for farmers", status: "Active", link: "#" },
    { name: "SMAM", description: "Sub-Mission on Agricultural Mechanization", status: "Active", link: "#" },
  ];

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

  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'sunny': return 'fa-sun';
      case 'partly cloudy': return 'fa-cloud-sun';
      case 'cloudy': return 'fa-cloud';
      case 'rain': return 'fa-cloud-rain';
      case 'snow': return 'fa-snowflake';
      case 'thunderstorm': return 'fa-bolt';
      case 'drizzle': return 'fa-cloud-drizzle';
      default: return 'fa-cloud';
    }
  };

  const renderOverview = () => (
    <div className="km-overview-grid">
      <div className="km-overview-card km-main-weather">
        <div className="km-weather-widget">
          <h3>
            <i className="fas fa-map-marker-alt"></i>
            Gorakhpur, UP
          </h3>
          
          <div className="km-current-weather">
            <div className="km-weather-icon">
              <i className={`fas ${getWeatherIcon(weatherData.condition)}`}></i>
            </div>
            <div className="km-weather-temp">
              {weatherData.temperature}°C
            </div>
            <div className="km-weather-condition">
              {weatherData.condition}
            </div>
            <div className="km-weather-details">
              <div className="km-detail">
                <i className="fas fa-tint"></i>
                <span>{weatherData.humidity}%</span>
              </div>
              <div className="km-detail">
                <i className="fas fa-wind"></i>
                <span>{weatherData.wind} km/h</span>
              </div>
            </div>
          </div>
          
          <div className="km-weather-forecast">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="km-forecast-day">
                <div className="km-day-name">{day.day}</div>
                <div className="km-day-icon">
                  <i className={`fas ${getWeatherIcon(day.condition)}`}></i>
                </div>
                <div className="km-day-temp">
                  <span className="km-high">{day.high}°</span>
                  <span className="km-low">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="km-overview-card km-sensor-data">
        <SensorDashboard sensorData={sensorData} droneData={droneData} />
      </div>
      
      <div className="km-overview-card km-government-schemes">
        <h3>Government Schemes</h3>
        <div className="km-schemes-list">
          {governmentSchemes.map((scheme, index) => (
            <div key={index} className="km-scheme-item">
              <div className="km-scheme-info">
                <h4>{scheme.name}</h4>
                <p>{scheme.description}</p>
              </div>
              <span className={`km-status km-${scheme.status.toLowerCase()}`}>
                {scheme.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="km-overview-card km-quick-stats">
        <h3>Farm Summary</h3>
        <div className="km-stats-grid">
          <div className="km-stat">
            <div className="km-stat-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="km-stat-info">
              <div className="km-stat-value">5</div>
              <div className="km-stat-label">Active Crops</div>
            </div>
          </div>
          
          <div className="km-stat">
            <div className="km-stat-icon">
              <i className="fas fa-seedling"></i>
            </div>
            <div className="km-stat-info">
              <div className="km-stat-value">12</div>
              <div className="km-stat-label">Total Acres</div>
            </div>
          </div>
          
          <div className="km-stat">
            <div className="km-stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="km-stat-info">
              <div className="km-stat-value">78%</div>
              <div className="km-stat-label">Yield Efficiency</div>
            </div>
          </div>
          
          <div className="km-stat">
            <div className="km-stat-icon">
              <i className="fas fa-tree"></i>
            </div>
            <div className="km-stat-info">
              <div className="km-stat-value">3</div>
              <div className="km-stat-label">Crop Cycles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPredictions = () => (
    <div className="km-predictions-view">
      <h2>Yield Predictions</h2>
      <div className="km-predictions-list">
        {predictions.map(prediction => (
          <div key={prediction.id} className="km-prediction-card">
            <div className="km-prediction-header">
              <h3>{prediction.predicted_crop} Prediction</h3>
              <span className="km-date">{new Date(prediction.created_at).toLocaleDateString()}</span>
            </div>
            
            <div className="km-prediction-details">
              <div className="km-detail">
                <span className="km-label">Expected Yield:</span>
                <span className="km-value">{prediction.predicted_yield}</span>
              </div>
              
              <div className="km-detail">
                <span className="km-label">Suitability Score:</span>
                <span className="km-value">{prediction.suitability_score}</span>
              </div>
              
              <div className="km-detail">
                <span className="km-label">Best Planting Time:</span>
                <span className="km-value">{prediction.best_planting_time}</span>
              </div>
              
              <div className="km-detail">
                <span className="km-label">Harvest Period:</span>
                <span className="km-value">{prediction.harvest_period}</span>
              </div>
              
              <div className="km-detail">
                <span className="km-label">Expected Market Price:</span>
                <span className="km-value">{prediction.expected_market_price}</span>
              </div>
            </div>
            
            <div className="km-prediction-summary">
              <h4>Summary</h4>
              <p>{prediction.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="km-recommendations-view">
      <h2>Crop Recommendations</h2>
      <div className="km-recommendations-list">
        {recommendations.map(recommendation => (
          <div key={recommendation.id} className="km-recommendation-card">
            <div className="km-recommendation-header">
              <h3>{recommendation.predicted_crop} Recommendation</h3>
              <span className="km-score">{recommendation.suitability_score}</span>
            </div>
            
            <div className="km-recommendation-details">
              <div className="km-detail-row">
                <div className="km-detail">
                  <span className="km-label">Best Planting Time:</span>
                  <span className="km-value">{recommendation.best_planting_time}</span>
                </div>
                
                <div className="km-detail">
                  <span className="km-label">Harvest Period:</span>
                  <span className="km-value">{recommendation.harvest_period}</span>
                </div>
              </div>
              
              <div className="km-detail-row">
                <div className="km-detail">
                  <span className="km-label">Water Requirements:</span>
                  <span className="km-value">{recommendation.water_requirements}</span>
                </div>
                
                <div className="km-detail">
                  <span className="km-label">Soil Condition:</span>
                  <span className="km-value">{recommendation.soil_condition}</span>
                </div>
              </div>
              
              <div className="km-detail">
                <span className="km-label">Fertilizer Recommendations:</span>
                <span className="km-value">{recommendation.fertilizer_recommendations}</span>
              </div>
              
              <div className="km-detail-row">
                <div className="km-detail">
                  <span className="km-label">Expected Yield:</span>
                  <span className="km-value">{recommendation.expected_yield}</span>
                </div>
                
                <div className="km-detail">
                  <span className="km-label">Expected Market Price:</span>
                  <span className="km-value">{recommendation.expected_market_price}</span>
                </div>
              </div>
            </div>
            
            <div className="km-risk-factors">
              <h4>
                <i className="fas fa-exclamation-triangle"></i>
                Risk Factors
              </h4>
              <ul>
                {recommendation.risk_factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
            
            <div className="km-recommendation-summary">
              <h4>Summary</h4>
              <p>{recommendation.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGuidance = () => (
    <div className="km-guidance-view">
      <h2>Crop Guidance</h2>
      <div className="km-guidance-card">
        <div className="km-guidance-header">
          <h3>{guidance.predicted_crop} Cultivation Guide</h3>
          <div className="km-suitability">
            <span className="km-label">Suitability Score:</span>
            <span className="km-score">{guidance.suitability_score.score}</span>
            <div className="km-tooltip">
              <i className="fas fa-info-circle"></i>
              <div className="km-tooltip-text">{guidance.suitability_score.rationale}</div>
            </div>
          </div>
        </div>
        
        <div className="km-guidance-section">
          <h4>Summary</h4>
          <p>{guidance.summary}</p>
        </div>
        
        <div className="km-guidance-section">
          <h4>Best Planting Time</h4>
          <p>{guidance.best_planting_time}</p>
        </div>
        
        <div className="km-guidance-section">
          <h4>Expected Yield</h4>
          <p>{guidance.expected_yield.potential_yield}</p>
          <p><strong>Factors affecting yield:</strong> {guidance.expected_yield.factors_affecting}</p>
        </div>
        
        <div className="km-guidance-section">
          <h4>Risk Factors</h4>
          <ul>
            {guidance.risk_factors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="km-calendar-view">
      <h2>Crop Calendar</h2>
      <div className="km-calendar-container">
        <div className="km-calendar-chart">
          <div className="km-chart-container">
            {cropCalendarData.map((month, index) => (
              <div key={index} className="km-chart-bar">
                <div className="km-bar-label">{month.month}</div>
                <div className="km-bar-container">
                  <div 
                    className="km-bar-fill" 
                    style={{ height: `${month.progress}%` }}
                  ></div>
                </div>
                <div className="km-bar-value">{month.progress}%</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="km-calendar-details">
          <h3>Monthly Activities</h3>
          <div className="km-activities-list">
            {cropCalendarData.map((month, index) => (
              <div key={index} className="km-activity-item">
                <span className="km-month">{month.month}</span>
                <span className="km-crops">{month.crops}</span>
                <div className="km-progress-bar">
                  <div 
                    className="km-progress-fill" 
                    style={{ width: `${month.progress}%` }}
                  ></div>
                </div>
                <span className="km-progress-value">{month.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SensorDashboard = ({ sensorData, droneData }) => {
    const moistureStatus = sensorData.moisture < 30 ? "Low" : sensorData.moisture < 60 ? "Optimal" : "High";
    const pHStatus = sensorData.pH < 6.3 ? "Acidic" : sensorData.pH < 6.8 ? "Slightly Acidic" : sensorData.pH < 7.2 ? "Neutral" : "Alkaline";
    const irrigationStatus = sensorData.irrigation < 30 ? "Needed" : sensorData.irrigation < 60 ? "Adequate" : "Excessive";

    return (
      <div className="km-sensor-dashboard">
        <h3>Field Monitoring</h3>
        <div className="km-sensor-grid">
          <div className="km-sensor-card">
            <div className="km-sensor-header">
              <i className="fas fa-tint"></i>
              <span>Soil Moisture</span>
            </div>
            <div className="km-sensor-value">{sensorData.moisture}%</div>
            <div className={`km-sensor-status km-${moistureStatus.toLowerCase()}`}>
              {moistureStatus}
            </div>
          </div>
          
          <div className="km-sensor-card">
            <div className="km-sensor-header">
              <i className="fas fa-thermometer-half"></i>
              <span>Temperature</span>
            </div>
            <div className="km-sensor-value">{sensorData.temperature}°C</div>
            <div className="km-sensor-status">
              {sensorData.temperature > 30 ? 'High' : 'Optimal'}
            </div>
          </div>
          
          <div className="km-sensor-card">
            <div className="km-sensor-header">
              <i className="fas fa-vial"></i>
              <span>Soil pH</span>
            </div>
            <div className="km-sensor-value">{sensorData.pH}</div>
            <div className={`km-sensor-status km-${pHStatus.toLowerCase().replace(' ', '-')}`}>
              {pHStatus}
            </div>
          </div>
          
          <div className="km-sensor-card">
            <div className="km-sensor-header">
              <i className="fas fa-faucet"></i>
              <span>Irrigation</span>
            </div>
            <div className="km-sensor-value">{sensorData.irrigation}%</div>
            <div className={`km-sensor-status km-${irrigationStatus.toLowerCase()}`}>
              {irrigationStatus}
            </div>
          </div>
        </div>
        
        <div className="km-nutrient-chart">
          <h4>Soil Nutrients</h4>
          <div className="km-nutrient-bars">
            <div className="km-nutrient-bar">
              <div className="km-nutrient-label">Nitrogen</div>
              <div className="km-nutrient-container">
                <div 
                  className="km-nutrient-fill km-nitrogen" 
                  style={{ width: `${sensorData.nitrogen}%` }}
                ></div>
              </div>
              <div className="km-nutrient-value">{sensorData.nitrogen}%</div>
            </div>
            <div className="km-nutrient-bar">
              <div className="km-nutrient-label">Phosphorus</div>
              <div className="km-nutrient-container">
                <div 
                  className="km-nutrient-fill km-phosphorus" 
                  style={{ width: `${sensorData.phosphorus}%` }}
                ></div>
              </div>
              <div className="km-nutrient-value">{sensorData.phosphorus}%</div>
            </div>
            <div className="km-nutrient-bar">
              <div className="km-nutrient-label">Potassium</div>
              <div className="km-nutrient-container">
                <div 
                  className="km-nutrient-fill km-potassium" 
                  style={{ width: `${sensorData.potassium}%` }}
                ></div>
              </div>
              <div className="km-nutrient-value">{sensorData.potassium}%</div>
            </div>
          </div>
        </div>
        
        <div className="km-drone-data">
          <h4>Drone Monitoring</h4>
          <div className="km-drone-stats">
            <div className="km-drone-stat">
              <span>Coverage</span>
              <span className="km-value">{droneData.coverage}%</span>
            </div>
            <div className="km-drone-stat">
              <span>Health Score</span>
              <span className="km-value">{droneData.healthScore}%</span>
            </div>
            <div className="km-drone-stat">
              <span>Issues</span>
              <span className="km-value">{droneData.issuesDetected}</span>
            </div>
            <div className="km-drone-stat">
              <span>Battery</span>
              <span className="km-value">{droneData.batteryLevel}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="kisan-mitra-dashboard">
      <div className="km-dashboard-header">
        <h1>Kisan Mitra Dashboard</h1>
        <p>Smart farming insights and recommendations</p>
      </div>

      <nav className="km-dashboard-nav">
        <button 
          className={activeTab === 'overview' ? 'km-active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'predictions' ? 'km-active' : ''} 
          onClick={() => setActiveTab('predictions')}
        >
          Yield Predictions
        </button>
        <button 
          className={activeTab === 'recommendations' ? 'km-active' : ''} 
          onClick={() => setActiveTab('recommendations')}
        >
          Crop Recommendations
        </button>
        <button 
          className={activeTab === 'guidance' ? 'km-active' : ''} 
          onClick={() => setActiveTab('guidance')}
        >
          Crop Guidance
        </button>
        <button 
          className={activeTab === 'calendar' ? 'km-active' : ''} 
          onClick={() => setActiveTab('calendar')}
        >
          Crop Calendar
        </button>
      </nav>

      <div className="km-dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'predictions' && renderPredictions()}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'guidance' && renderGuidance()}
        {activeTab === 'calendar' && renderCalendar()}
      </div>
    </div>
  );
};

export default KisanMitraDashboard;