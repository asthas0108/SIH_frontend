import React, { useState } from 'react';

// --- Reusable component for individual mineral input field ---
const MineralInput = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-1.5 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="number"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder="e.g., 120"
      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
    />
  </div>
);

// --- Component for the informational points ---
const InfoCard = ({ icon, title, children }) => (
    <div className="bg-white/60 p-4 rounded-lg shadow-sm">
        <h3 className="flex items-center text-lg font-semibold text-green-800 mb-2">
            <span className="text-2xl mr-3">{icon}</span>
            {title}
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
            {children}
        </p>
    </div>
);


// --- Main Page Component ---
const SoilHealthAnalysis = () => {
  // State to manage which input method is selected: 'image', 'manual', or null
  const [selection, setSelection] = useState(null);

  // State for the uploaded image file
  const [soilImage, setSoilImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // State for manually entered mineral values
  const [minerals, setMinerals] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
  });

  // Handler for image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSoilImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handler for form submission
  const handleSubmit = (event, type) => {
    event.preventDefault();
    if (type === 'image') {
      if (!soilImage) {
        alert("Please upload an image first!");
        return;
      }
      console.log("Submitting image:", soilImage.name);
      alert(`Analyzing image: ${soilImage.name}. Check console for details.`);
    } else if (type === 'manual') {
      console.log("Submitting mineral values:", minerals);
      alert(`Analyzing mineral values. Check console for details.`);
    }
  };

  const resetSelection = () => {
      setSelection(null);
      setSoilImage(null);
      setImagePreview('');
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-sans text-gray-800 flex flex-col items-center">
      {/* --- Header Section --- */}
      <header className="text-center mb-10 sm:mb-12 w-full max-w-5xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
          🌱 Welcome to the Soil Health Portal
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Soil is far more than just dirt; it's a living, dynamic ecosystem critical for life on Earth. <strong>Soil health</strong> is its capacity to function as a vital system—sustaining plants, animals, and humans while maintaining environmental quality.
        </p>

        {/* --- Detailed Info Section --- */}
        <div className="mt-8 text-left">
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
          This tool helps you analyze this invaluable resource. Choose an option below to begin.
        </p>
      </header>

      {/* --- Main Content Area (Buttons & Forms) --- */}
      <main className="w-full max-w-lg">
        {!selection ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in">
            <button
              onClick={() => setSelection('image')}
              className="px-6 py-4 text-lg font-semibold text-white bg-lime-600 rounded-lg shadow-md hover:bg-lime-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-75 flex items-center justify-center gap-2"
            >
              <span role="img" aria-label="camera">📷</span> Analyze by Image
            </button>
            <button
              onClick={() => setSelection('manual')}
              className="px-6 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-lg shadow-md hover:bg-emerald-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 flex items-center justify-center gap-2"
            >
              <span role="img" aria-label="pencil">📝</span> Enter Values Manually
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={resetSelection}
              className="mb-4 font-semibold text-green-700 hover:text-green-900 transition flex items-center gap-1 text-sm"
            >
              &larr; Back to Options
            </button>
            
            {selection === 'image' && (
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-green-800 border-b-2 border-gray-200 pb-2 mb-4">Analyze by Image</h2>
                <form onSubmit={(e) => handleSubmit(e, 'image')}>
                  <label htmlFor="file-upload" className="w-full text-center px-5 py-3 font-semibold text-white bg-emerald-500 rounded-md cursor-pointer hover:bg-emerald-600 transition block">
                    {soilImage ? 'Change Image' : 'Select an Image'}
                  </label>
                  <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {imagePreview && (
                    <div className="mt-4 text-center">
                      <img src={imagePreview} alt="Soil Preview" className="max-h-52 w-auto mx-auto rounded-lg border-2 border-dashed border-gray-300 p-1" />
                      <p className="text-sm text-gray-500 mt-2 truncate">{soilImage.name}</p>
                    </div>
                  )}
                  <button type="submit" className="w-full py-3 mt-6 text-lg font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Analyze Image
                  </button>
                </form>
              </div>
            )}
            
            {selection === 'manual' && (
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-green-800 border-b-2 border-gray-200 pb-2 mb-4">Enter Mineral Values</h2>
                <form onSubmit={(e) => handleSubmit(e, 'manual')}>
                  <MineralInput label="Nitrogen (N) kg/ha" name="nitrogen" value={minerals.nitrogen} onChange={(e) => setMinerals({...minerals, nitrogen: e.target.value})} />
                  <MineralInput label="Phosphorus (P) kg/ha" name="phosphorus" value={minerals.phosphorus} onChange={(e) => setMinerals({...minerals, phosphorus: e.target.value})} />
                  <MineralInput label="Potassium (K) kg/ha" name="potassium" value={minerals.potassium} onChange={(e) => setMinerals({...minerals, potassium: e.target.value})} />
                  <MineralInput label="pH Level" name="ph" value={minerals.ph} onChange={(e) => setMinerals({...minerals, ph: e.target.value})} />
                  <button type="submit" className="w-full py-3 mt-2 text-lg font-bold text-white bg-green-600 rounded-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Analyze Values
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SoilHealthAnalysis;