import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  FileDown, 
  ArrowLeft, 
  RefreshCw, 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  Leaf,
  Droplets,
  Clock,
  IndianRupee,
  Sprout
} from "lucide-react";

const YieldPrediction = ({ 
  crop = "Wheat", 
  params = {}, 
  predictedYield = "5.2 tons/hectare", 
  confidence = "92%" 
}) => {

  const navigate = useNavigate();

  const handleDownload = () => {
    console.log("Downloading report...");
    // Implement PDF/CSV download logic here
  };

  const handleNewAnalysis = () => {
    console.log("Start new analysis...");
  };

  const handleBack = () => {
    navigate("/");
    console.log("Back to main...");
  };

  const additionalInfo = [
    { key: "Best Planting Time", value: "October - November", icon: Clock },
    { key: "Harvest Period", value: "March - April", icon: Calendar },
    { key: "Water Requirements", value: "Moderate (500-600mm)", icon: Droplets },
    { key: "Fertilizer Recommendation", value: "NPK 20:20:20", icon: Sprout },
    { key: "Expected Market Price", value: "₹2,100 - ₹2,400 per quintal", icon: IndianRupee }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-amber-50 to-emerald-50">
      <div className="bg-white/98 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-5 shadow-inner">
            <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 font-playfair">
            Crop Recommendation Analysis
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Based on comprehensive analysis of your soil parameters, local weather patterns, and historical agricultural data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <div className="space-y-7">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200/60 rounded-2xl p-7 text-center shadow-lg">
              <div className="text-6xl mb-4">🌾</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-3 tracking-wide">RECOMMENDED CROP</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-green-700 mb-4 font-playfair tracking-tight">
                {crop}
              </h3>
              <div className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                <Leaf className="w-4 h-4 mr-2" strokeWidth={2} />
                Optimized for your conditions
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-amber-100 p-2 rounded-full mr-3">
                  <BarChart3 className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 tracking-wide">YIELD PREDICTION</h3>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-700 mb-2">{predictedYield}</p>
                <div className="inline-flex items-center bg-amber-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-amber-800">Confidence: {confidence}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
              >
                <FileDown className="w-5 h-5" strokeWidth={2} /> 
                <span>Download Detailed Report</span>
              </button>

              <button
                onClick={handleNewAnalysis}
                className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-md text-base"
              >
                <RefreshCw className="w-5 h-5" strokeWidth={2} /> 
                <span>New Analysis</span>
              </button>

              <button
                onClick={handleBack}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg text-base"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} /> 
                <span>Back to Main</span>
              </button>
            </div>
          </div>

          <div className="space-y-7">
            <div className="bg-gray-50/80 rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center tracking-wide">
                <div className="bg-gray-200 p-2 rounded-full mr-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                </div>
                SOIL ANALYSIS PARAMETERS
              </h3>
              {Object.entries(params).length > 0 ? (
                <div className="grid gap-3">
                  {Object.entries(params).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-white/90 p-4 rounded-xl border border-gray-200/60 shadow-sm">
                      <span className="font-medium text-gray-700 text-sm capitalize tracking-wide">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-semibold text-green-700 text-sm bg-green-50 px-3 py-1 rounded-full">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/90 p-4 rounded-xl border border-gray-200/60 text-center">
                  <p className="text-gray-400 italic">No soil parameters available</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50/80 rounded-2xl p-6 shadow-lg border border-blue-200/50">
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center tracking-wide">
                <div className="bg-blue-200 p-2 rounded-full mr-3">
                  <Calendar className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                </div>
                FARMING RECOMMENDATIONS
              </h3>
              <div className="space-y-3">
                {additionalInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-center justify-between bg-white/90 p-3 rounded-lg border border-blue-200/40">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <IconComponent className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.key}:</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-full">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200/60 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Results based on comprehensive analysis of local soil conditions, weather patterns, and historical agricultural data. 
            Actual results may vary based on farming practices, environmental factors, and implementation quality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default YieldPrediction