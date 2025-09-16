import React, { useState } from 'react';

const MineralInput = ({ label, name, value, onChange, unit, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="mb-5 relative">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {unit && <span className="text-xs text-gray-500">({unit})</span>}
        </label>
        {info && (
          <button 
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
            aria-label="More information"
          >
            ℹ️ Info
          </button>
        )}
      </div>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="e.g., 120"
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        step={name === 'ph' ? '0.1' : '1'}
        min={name === 'ph' ? '0' : '0'}
        max={name === 'ph' ? '14' : undefined}
      />
      {showInfo && info && (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
          {info}
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ icon, title, children }) => (
  <div className="bg-white/70 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-white">
    <h3 className="flex items-center text-lg font-semibold text-green-800 mb-3">
      <span className="text-2xl mr-3">{icon}</span>
      {title}
    </h3>
    <p className="text-gray-700 text-sm leading-relaxed">
      {children}
    </p>
  </div>
);

const ResultCard = ({ title, value, status, recommendation }) => (
  <div className={`p-4 rounded-lg mb-4 border-l-4 ${
    status === 'optimal' ? 'bg-green-50 border-green-500' : 
    status === 'deficient' ? 'bg-yellow-50 border-yellow-500' : 
    'bg-red-50 border-red-500'
  }`}>
    <h4 className="font-semibold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600 mt-1">{value}</p>
    {recommendation && (
      <p className="text-sm mt-2 font-medium">{recommendation}</p>
    )}
  </div>
);

// Main Page Component
const SoilHealthAnalysis = () => {
  const [selection, setSelection] = useState(null);
  const [soilImage, setSoilImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [minerals, setMinerals] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
  });

  const mineralInfo = {
    nitrogen: "Nitrogen is essential for plant growth and leaf development. Ideal range: 50-200 kg/ha",
    phosphorus: "Phosphorus supports root development and flowering. Ideal range: 30-100 kg/ha",
    potassium: "Potassium helps with overall plant health and disease resistance. Ideal range: 100-300 kg/ha",
    ph: "pH affects nutrient availability. Most crops prefer slightly acidic soil (6.0-7.0)"
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        alert("Please upload an image file");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Please upload an image smaller than 5MB");
        return;
      }
      
      setSoilImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const simulateAnalysis = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const mockResults = {
        overallHealth: Math.floor(Math.random() * 40) + 60, // 60-100%
        nutrients: {
          nitrogen: {
            value: minerals.nitrogen || Math.floor(Math.random() * 200) + 50,
            status: minerals.nitrogen > 200 ? 'excess' : (minerals.nitrogen < 50 ? 'deficient' : 'optimal'),
          },
          phosphorus: {
            value: minerals.phosphorus || Math.floor(Math.random() * 100) + 30,
            status: minerals.phosphorus > 100 ? 'excess' : (minerals.phosphorus < 30 ? 'deficient' : 'optimal'),
          },
          potassium: {
            value: minerals.potassium || Math.floor(Math.random() * 200) + 100,
            status: minerals.potassium > 300 ? 'excess' : (minerals.potassium < 100 ? 'deficient' : 'optimal'),
          },
          ph: {
            value: minerals.ph || (Math.random() * 2 + 6).toFixed(1),
            status: minerals.ph > 7.5 ? 'alkaline' : (minerals.ph < 6.0 ? 'acidic' : 'optimal'),
          }
        },
        recommendations: [
          "Consider adding organic compost to improve soil structure",
          "Plant cover crops to prevent erosion and add nutrients",
          "Test soil annually to monitor changes in nutrient levels"
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = (event, type) => {
    event.preventDefault();
    
    if (type === 'image') {
      if (!soilImage) {
        alert("Please upload an image first!");
        return;
      }
      simulateAnalysis();
    } else if (type === 'manual') {
      // Basic validation
      const hasEmptyFields = Object.values(minerals).some(val => val === '');
      if (hasEmptyFields) {
        if (!window.confirm("Some fields are empty. Continue with default values for missing fields?")) {
          return;
        }
      }
      simulateAnalysis();
    }
  };

  const resetSelection = () => {
    setSelection(null);
    setSoilImage(null);
    setImagePreview('');
    setAnalysisResults(null);
  };

  const resetForm = () => {
    setMinerals({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      ph: '',
    });
    setAnalysisResults(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-green-50 min-h-screen p-4 sm:p-8 font-sans text-gray-800 flex flex-col items-center">
      {/* Header Section */}
      <header className="text-center mb-10 sm:mb-12 w-full max-w-6xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
          <span className="inline-block mr-2">🌱</span> 
          Soil Health Analysis
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Soil is far more than just dirt; it's a living, dynamic ecosystem critical for life on Earth. <strong className="text-green-700">Soil health</strong> is its capacity to function as a vital system—sustaining plants, animals, and humans while maintaining environmental quality.
        </p>

        {/* Detailed Info Section */}
        <div className="mt-10 text-left">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Why Soil Health Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard icon="🌾" title="Foundation for Food Security">
              Healthy soil provides essential nutrients and water, producing higher crop yields and more nutritious food to support global food security.
            </InfoCard>
            <InfoCard icon="💧" title="Water Quality and Regulation">
              Acting as a natural filter, healthy soil absorbs water, reducing polluted runoff and recharging groundwater supplies, which prevents erosion and protects our lakes and rivers.
            </InfoCard>
            <InfoCard icon="🌍" title="Climate Change Mitigation">
              Soil is one of the largest carbon reservoirs on the planet. Healthy soil practices pull CO₂ from the atmosphere and store it securely underground (carbon sequestration).
            </InfoCard>
            <InfoCard icon="🐛" title="Biodiversity Hotspot">
              A handful of healthy soil contains billions of microorganisms. This underground ecosystem is essential for cycling nutrients, suppressing diseases, and supporting all life above ground.
            </InfoCard>
          </div>
        </div>

        <p className="text-base text-gray-700 max-w-3xl mx-auto leading-relaxed mt-8 font-medium">
          Analyze your soil's health to make informed decisions about sustainable land management. Choose an option below to begin.
        </p>
      </header>

      {/* Main Content Area (Buttons & Forms) */}
      <main className="w-full max-w-2xl">
        {!selection ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in">
            <button
              onClick={() => setSelection('image')}
              className="flex flex-col items-center px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="text-3xl mb-2" role="img" aria-label="camera">📷</span> 
              <span>Analyze by Image</span>
              <span className="text-sm font-normal mt-1 opacity-90">Upload a soil sample photo</span>
            </button>
            <button
              onClick={() => setSelection('manual')}
              className="flex flex-col items-center px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="text-3xl mb-2" role="img" aria-label="pencil">📝</span> 
              <span>Enter Values Manually</span>
              <span className="text-sm font-normal mt-1 opacity-90">Input specific measurements</span>
            </button>
          </div>
        ) : (
          <div className="mb-10">
            <button
              onClick={resetSelection}
              className="mb-4 font-semibold text-green-700 hover:text-green-900 transition flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg hover:bg-green-50"
            >
              &larr; Back to Options
            </button>
            
            {!analysisResults ? (
              <>
                {selection === 'image' && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in">
                    <h2 className="text-2xl font-bold text-green-800 border-b-2 border-gray-100 pb-3 mb-5">Analyze by Image</h2>
                    <form onSubmit={(e) => handleSubmit(e, 'image')}>
                      <div className="mb-5">
                        <label htmlFor="file-upload" className="w-full text-center px-5 py-4 font-semibold text-white bg-emerald-500 rounded-lg cursor-pointer hover:bg-emerald-600 transition block shadow-md hover:shadow-lg">
                          {soilImage ? 'Change Image' : 'Select Soil Image'}
                        </label>
                        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        <p className="text-center text-sm text-gray-500 mt-2">Upload a clear photo of your soil sample</p>
                      </div>
                      
                      {imagePreview && (
                        <div className="mt-6 text-center">
                          <img src={imagePreview} alt="Soil Preview" className="max-h-64 w-auto mx-auto rounded-xl border-2 border-dashed border-gray-300 p-1 shadow-sm" />
                          <p className="text-sm text-gray-500 mt-2 truncate">{soilImage.name}</p>
                        </div>
                      )}
                      
                      <button 
                        type="submit" 
                        disabled={!soilImage || isLoading}
                        className="w-full py-3.5 mt-6 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : 'Analyze Image'}
                      </button>
                    </form>
                  </div>
                )}
                
                {selection === 'manual' && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in">
                    <h2 className="text-2xl font-bold text-green-800 border-b-2 border-gray-100 pb-3 mb-5">Enter Soil Mineral Values</h2>
                    <form onSubmit={(e) => handleSubmit(e, 'manual')}>
                      <MineralInput 
                        label="Nitrogen" 
                        name="nitrogen" 
                        value={minerals.nitrogen} 
                        onChange={(e) => setMinerals({...minerals, nitrogen: e.target.value})} 
                        unit="kg/ha"
                        info={mineralInfo.nitrogen}
                      />
                      <MineralInput 
                        label="Phosphorus" 
                        name="phosphorus" 
                        value={minerals.phosphorus} 
                        onChange={(e) => setMinerals({...minerals, phosphorus: e.target.value})} 
                        unit="kg/ha"
                        info={mineralInfo.phosphorus}
                      />
                      <MineralInput 
                        label="Potassium" 
                        name="potassium" 
                        value={minerals.potassium} 
                        onChange={(e) => setMinerals({...minerals, potassium: e.target.value})} 
                        unit="kg/ha"
                        info={mineralInfo.potassium}
                      />
                      <MineralInput 
                        label="pH Level" 
                        name="ph" 
                        value={minerals.ph} 
                        onChange={(e) => setMinerals({...minerals, ph: e.target.value})} 
                        info={mineralInfo.ph}
                      />
                      
                      <div className="flex gap-3 mt-2">
                        <button 
                          type="button" 
                          onClick={resetForm}
                          className="px-4 py-2.5 text-green-700 font-medium bg-green-50 rounded-lg hover:bg-green-100 transition flex-1"
                        >
                          Reset
                        </button>
                        <button 
                          type="submit" 
                          disabled={isLoading}
                          className="px-4 py-2.5 text-lg font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center"
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Analyzing...
                            </>
                          ) : 'Analyze Soil'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-green-800">Analysis Results</h2>
                  <button 
                    onClick={() => setAnalysisResults(null)}
                    className="text-sm font-medium text-green-700 hover:text-green-900 px-3 py-1 rounded-lg hover:bg-green-50"
                  >
                    Analyze Again
                  </button>
                </div>
                
                <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Overall Soil Health Score</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                      <div 
                        className="h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600" 
                        style={{ width: `${analysisResults.overallHealth}%` }}
                      ></div>
                    </div>
                    <span className="text-2xl font-bold text-green-700">{analysisResults.overallHealth}%</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Nutrient Levels</h3>
                
                <ResultCard 
                  title="Nitrogen (N)" 
                  value={`${analysisResults.nutrients.nitrogen.value} kg/ha`}
                  status={analysisResults.nutrients.nitrogen.status}
                  recommendation={analysisResults.nutrients.nitrogen.status !== 'optimal' ? 
                    (analysisResults.nutrients.nitrogen.status === 'deficient' ? 
                      "Consider adding composted manure or legume cover crops" : 
                      "Reduce nitrogen inputs to prevent runoff and pollution") : 
                    "Nitrogen levels are optimal for plant growth"}
                />
                
                <ResultCard 
                  title="Phosphorus (P)" 
                  value={`${analysisResults.nutrients.phosphorus.value} kg/ha`}
                  status={analysisResults.nutrients.phosphorus.status}
                  recommendation={analysisResults.nutrients.phosphorus.status !== 'optimal' ? 
                    (analysisResults.nutrients.phosphorus.status === 'deficient' ? 
                      "Add bone meal or rock phosphate to increase phosphorus" : 
                      "Excess phosphorus can fix other nutrients, reduce inputs") : 
                    "Phosphorus levels are optimal for root development"}
                />
                
                <ResultCard 
                  title="Potassium (K)" 
                  value={`${analysisResults.nutrients.potassium.value} kg/ha`}
                  status={analysisResults.nutrients.potassium.status}
                  recommendation={analysisResults.nutrients.potassium.status !== 'optimal' ? 
                    (analysisResults.nutrients.potassium.status === 'deficient' ? 
                      "Add greensand or wood ash to increase potassium levels" : 
                      "Reduce potassium inputs to optimal levels") : 
                    "Potassium levels are optimal for plant health"}
                />
                
                <ResultCard 
                  title="pH Level" 
                  value={analysisResults.nutrients.ph.value}
                  status={analysisResults.nutrients.ph.status === 'optimal' ? 'optimal' : 
                         analysisResults.nutrients.ph.value < 5.5 ? 'deficient' : 'excess'}
                  recommendation={analysisResults.nutrients.ph.status !== 'optimal' ? 
                    (analysisResults.nutrients.ph.status === 'acidic' ? 
                      "Add lime to raise pH level" : 
                      "Add sulfur or organic matter to lower pH level") : 
                    "pH level is optimal for nutrient availability"}
                />
                
                <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Recommendations</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  >
                    <span className="mr-2">🖨️</span> Print Results
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500 max-w-2xl">
        <p>This soil health analysis tool provides general recommendations. For precise agricultural advice, consult with a local soil expert.</p>
      </footer>
    </div>
  );
};

export default SoilHealthAnalysis;