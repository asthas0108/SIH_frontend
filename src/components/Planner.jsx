import { useState, useEffect } from "react";
import { InputField, SelectField } from "./reusableFields";
import {
  MapPin,
  Calendar,
  Droplets,
  Sprout,
  CloudRain,
  Sun,
  Clock,
  ChevronRight,
  X,
  Leaf,
  BarChart3
} from "lucide-react";

const CropForm = () => {
  const [formData, setFormData] = useState({
    crop: "",
    land_size: "",
    soil_type: "",
    location: "",
    irrigation: "",
    fertilizer: {
      type: "",
      amount: "",
      schedule: "",
    },
    equipment: "",
    planting_date: "",
    growing_season: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  const [guidances, setGuidances] = useState([]);
  const [expandedGuidance, setExpandedGuidance] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("fertilizer.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        fertilizer: {
          ...formData.fertilizer,
          [key]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.crop) newErrors.crop = "Crop name is required";
    if (!formData.land_size || formData.land_size <= 0)
      newErrors.land_size = "Valid land size is required";
    if (!formData.soil_type) newErrors.soil_type = "Soil type is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.irrigation)
      newErrors.irrigation = "Irrigation method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const cleanText = (text) => {
    if (typeof text !== "string") return text;
    return text.replace(/\*\*/g, "");
  };

  const formatValue = (value) => {
    if (!value) return "—";

    if (typeof value === "string") {
      return value.split("\n").map((line, idx) => (
        <p key={idx} className="mb-1">
          {cleanText(line.trim())}
        </p>
      ));
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {value.map((item, idx) => (
            <li key={idx}>{formatValue(item)}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="ml-4">
          {Object.entries(value).map(([subKey, subValue], idx) => (
            <div key={idx} className="mb-2">
              <h4 className="font-semibold text-gray-700">
                {subKey.replace(/_/g, " ")}
              </h4>
              <div className="text-gray-600">{formatValue(subValue)}</div>
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  const DisplayData = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
      return <p className="text-gray-500">No guidance summary available.</p>;
    }

    return (
      <div className="space-y-6 p-6 bg-gray-50 rounded-2xl">
        {Object.entries(data).map(([key, value], idx) => (
          <div key={idx} className="p-4 bg-white shadow rounded-xl">
            <h2 className="text-lg font-bold capitalize mb-2 text-gray-800">
              {key.replace(/_/g, " ")}
            </h2>
            <div className="text-gray-700 leading-relaxed">
              {formatValue(value)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setResult(null);

    const token = localStorage.getItem("token");

    const payload = {
      ...formData,
      land_size: parseFloat(formData.land_size),
      fertilizer: {
        type: formData.fertilizer.type || undefined,
        amount: formData.fertilizer.amount
          ? parseFloat(formData.fertilizer.amount)
          : undefined,
        schedule: formData.fertilizer.schedule || undefined,
      },
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/crop_guidance/getting_guidance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (err) {
        console.error("Failed to parse JSON:", text);
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok) {
        const errorMsg = data?.detail || "Failed to get guidance";
        throw new Error(errorMsg);
      }

      if (!data || !data.guidance) {
        throw new Error("No guidance received from server");
      }

      setResult(data.guidance);
      setActiveTab("overview");

      fetchUserGuidances();
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserGuidances = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://127.0.0.1:8000/crop_guidance/user_guidance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setGuidances(data || []);
    } catch (err) {
      console.error("Error fetching user guidances:", err);
    }
  };

  useEffect(() => {
    fetchUserGuidances();
  }, []);

  const openGuidanceModal = (guidance) => {
    setExpandedGuidance(guidance);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setExpandedGuidance(null);
  };

  const parseGuidanceResponse = (guidance) => {
    try {
      const text = guidance?.guidance_response;
      console.log(text);
      return { text };
    } catch {
      return {};
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col items-center p-4 py-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-5">
          <Leaf className="w-40 h-40 text-green-600" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-5">
          <Sprout className="w-40 h-40 text-emerald-600" />
        </div>
      </div>

      {showModal && expandedGuidance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-2xl font-bold text-green-800">
                  Guidance for {expandedGuidance.crop_name}
                </h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {expandedGuidance.location}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Basic Information
                  </h4>
                  <div className="space-y-2">
                    <p><span className="font-medium text-gray-700">Soil Type:</span> {expandedGuidance.soil_type}</p>
                    <p><span className="font-medium text-gray-700">Land Size:</span> {expandedGuidance.land_size} acres</p>
                    <p><span className="font-medium text-gray-700">Season:</span> {expandedGuidance.growing_season}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                    <Droplets className="w-5 h-5 mr-2" />
                    Cultivation Details
                  </h4>
                  <div className="space-y-2">
                    <p><span className="font-medium text-gray-700">Irrigation:</span> {expandedGuidance.irrigation_method}</p>
                    <p><span className="font-medium text-gray-700">Planting Date:</span> {expandedGuidance.planting_date}</p>
                    {expandedGuidance.equipment && (
                      <p><span className="font-medium text-gray-700">Equipment:</span> {expandedGuidance.equipment}</p>
                    )}
                  </div>
                </div>

                {expandedGuidance.fertilizer && (
                  <div className="bg-amber-50 p-5 rounded-xl border border-amber-100 md:col-span-2">
                    <h4 className="font-semibold text-amber-700 mb-3 flex items-center">
                      <Sprout className="w-5 h-5 mr-2" />
                      Fertilizer Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Type</p>
                        <p className="text-gray-800">{expandedGuidance.fertilizer.type || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Amount</p>
                        <p className="text-gray-800">{expandedGuidance.fertilizer.amount} kg</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Schedule</p>
                        <p className="text-gray-800">{expandedGuidance.fertilizer.schedule}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-green-700 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  AI Guidance Summary
                </h4>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed bg-white p-4 rounded-lg">
                  <div className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg">
                    {expandedGuidance && Object.keys(parseGuidanceResponse(expandedGuidance)).length > 0 ? (
                      <DisplayData data={parseGuidanceResponse(expandedGuidance)} />
                    ) : (
                      "No guidance summary available."
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-b-2xl flex justify-end">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center cursor-pointer"
              >
                Close Guidance
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="my-8 bg-white shadow-2xl rounded-2xl p-6 md:p-8 max-w-4xl w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <Sprout className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            Crop Guidance Form
          </h2>
          <p className="text-gray-600 text-lg">
            Enter your farm details to receive AI-powered farming recommendations
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <InputField
            label="Crop Name"
            name="crop"
            type="text"
            value={formData.crop}
            onChange={handleChange}
            placeholder="e.g. Wheat, Rice, Corn"
            error={errors.crop}
            icon={<Leaf className="w-5 h-5 text-gray-400" />}
            required
          />

          <InputField
            label="Land Size (acres)"
            name="land_size"
            type="number"
            value={formData.land_size}
            onChange={handleChange}
            placeholder="e.g. 5"
            error={errors.land_size}
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
            required
          />

          <SelectField
            label="Soil Type"
            name="soil_type"
            value={formData.soil_type}
            onChange={handleChange}
            options={["Clay", "Sandy", "Loamy", "Silty", "Peaty", "Chalky"]}
            error={errors.soil_type}
            icon={<span className="text-lg">🌱</span>}
            required
          />

          <InputField
            label="Location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Punjab, India"
            error={errors.location}
            icon={<MapPin className="w-5 h-5 text-gray-400" />}
            required
          />

          <SelectField
            label="Irrigation Method"
            name="irrigation"
            value={formData.irrigation}
            onChange={handleChange}
            options={["Drip", "Sprinkler", "Canal", "Manual", "Rainfed"]}
            error={errors.irrigation}
            icon={<Droplets className="w-5 h-5 text-gray-400" />}
            required
          />

          <InputField
            label="Fertilizer Type"
            name="fertilizer.type"
            type="text"
            value={formData.fertilizer.type}
            onChange={handleChange}
            placeholder="e.g. Urea, DAP, NPK"
            icon={<Sprout className="w-5 h-5 text-gray-400" />}
          />

          <InputField
            label="Fertilizer Amount (kg/acre)"
            name="fertilizer.amount"
            type="number"
            value={formData.fertilizer.amount}
            onChange={handleChange}
            placeholder="e.g. 50"
            icon={<span className="text-lg">⚖️</span>}
          />

          <InputField
            label="Fertilizer Schedule"
            name="fertilizer.schedule"
            type="text"
            value={formData.fertilizer.schedule}
            onChange={handleChange}
            placeholder="e.g. Before sowing, 30 days after planting"
            fullWidth
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
          />

          <InputField
            label="Equipment Availability"
            name="equipment"
            type="text"
            value={formData.equipment}
            onChange={handleChange}
            placeholder="e.g. Tractor, Sprayer, Plough"
            fullWidth
          />

          <InputField
            label="Planting Date"
            name="planting_date"
            type="date"
            value={formData.planting_date}
            onChange={handleChange}
            icon={<Calendar className="w-5 h-5 text-gray-400" />}
          />

          <SelectField
            label="Growing Season"
            name="growing_season"
            value={formData.growing_season}
            onChange={handleChange}
            options={["Kharif", "Rabi", "Zaid", "Perennial"]}
            icon={<CloudRain className="w-5 h-5 text-gray-400" />}
          />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full md:w-2/3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Your Crop Plan...
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Generate Crop Guidance
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-4xl mt-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-green-800 flex items-center">
            <Clock className="w-6 h-6 mr-2" />
            Your Previous Guidances
          </h3>
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            {guidances.length} saved
          </span>
        </div>

        {guidances.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
              <Sprout className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">No guidances yet</h4>
            <p className="text-gray-600 mb-4">Submit the form above to get your first personalized crop guidance!</p>
            <div className="inline-flex items-center text-sm text-green-600">
              <Sun className="w-4 h-4 mr-1" />
              Start your farming journey today
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guidances.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-green-200 group"
                onClick={() => openGuidanceModal(g)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-green-800 group-hover:text-green-700 transition-colors">
                      {g.crop_name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {g.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full">
                        {g.soil_type}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full">
                        {g.land_size} acres
                      </span>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full">
                        {g.growing_season || "Season"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-green-100 text-green-800 p-2 rounded-lg">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Click to view full guidance
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(g.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropForm;