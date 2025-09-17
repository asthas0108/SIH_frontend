"use client";

import { useState } from "react";

export default function CropForm() {
  const [formData, setFormData] = useState({
    crop: "",
    landSize: "",
    soilType: "",
    location: "",
    irrigation: "",
    fertilizerType: "",
    fertilizerAmount: "",
    fertilizerSchedule: "",
    equipment: "",
    plantingDate: "",
    growingSeason: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // 👉 Dummy guide response
      const dummyGuide = {
        summary: `Guide for ${formData.crop || "Crop"} in ${
          formData.location || "your location"
        }`,
        location: formData.location || "Not specified",
        soil: formData.soilType || "Loamy",
        irrigation: formData.irrigation || "Drip Irrigation recommended",
        season: formData.growingSeason || "Kharif",
        plantingDate: formData.plantingDate || "Not specified",
        equipment: formData.equipment || "Tractor, Plough",

        fertilizer: {
          type: formData.fertilizerType || "Urea, DAP",
          amount: formData.fertilizerAmount || "50 kg/acre",
          schedule:
            formData.fertilizerSchedule ||
            "Basal dose at sowing + top dressing 30 days later",
        },

        irrigationSchedule: [
          "1st irrigation: 20–25 days after sowing",
          "2nd irrigation: 40–45 days (tillering stage)",
          "3rd irrigation: 70–75 days (flowering stage)",
          "Final irrigation: before grain filling stage",
        ],

        pestManagement: [
          "Rust: Spray Propiconazole @ 0.1% if symptoms appear",
          "Aphids: Use Imidacloprid 30 ml/acre with 200 liters water",
          "Weeds: Apply Isoproturon @ 500 g/acre, 30–35 DAS",
        ],

        yield: {
          expected: "20–25 quintals/acre",
          marketRate: "₹2000/quintal (approx.)",
          grossIncome: "₹40,000–50,000 per acre",
          netProfit: "₹25,000–30,000 per acre",
        },

        recommendations: [
          "Prepare land with 2–3 ploughings and add organic manure.",
          "Use certified, disease-resistant seed varieties.",
          "Ensure timely irrigation, especially at flowering.",
          "Rotate crops (e.g., Wheat → Moong → Rice) to improve soil fertility.",
          "Sell produce via FPOs/mandis for better pricing.",
        ],
      };

      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate small delay
      setResult(dummyGuide);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen flex items-center justify-center p-6">
      <div className="my-8 bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
          🌱 Crop Guidance Form
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your details to receive AI-powered farming recommendations
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Crop Name */}
          <InputField
            label="Crop Name"
            name="crop"
            type="text"
            value={formData.crop}
            onChange={handleChange}
            placeholder="e.g. Wheat, Rice"
            required
          />

          {/* Land Size */}
          <InputField
            label="Land Size (in acres)"
            name="landSize"
            type="number"
            value={formData.landSize}
            onChange={handleChange}
            placeholder="e.g. 5"
            required
          />

          {/* Soil Type */}
          <SelectField
            label="Soil Type"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            options={["Clay", "Sandy", "Loamy", "Silty"]}
            required
          />

          {/* Location */}
          <InputField
            label="Location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Punjab, India"
            required
          />

          {/* Irrigation */}
          <SelectField
            label="Irrigation Method"
            name="irrigation"
            value={formData.irrigation}
            onChange={handleChange}
            options={["Drip", "Sprinkler", "Canal", "Manual"]}
            fullWidth
            required
          />

          {/* Fertilizer */}
          <InputField
            label="Fertilizer Type"
            name="fertilizerType"
            type="text"
            value={formData.fertilizerType}
            onChange={handleChange}
            placeholder="e.g. Urea, DAP"
          />

          <InputField
            label="Fertilizer Amount (kg/acre)"
            name="fertilizerAmount"
            type="number"
            value={formData.fertilizerAmount}
            onChange={handleChange}
            placeholder="e.g. 50"
          />

          <InputField
            label="Fertilizer Schedule"
            name="fertilizerSchedule"
            type="text"
            value={formData.fertilizerSchedule}
            onChange={handleChange}
            placeholder="e.g. Before sowing, 30 days after planting"
            fullWidth
          />

          {/* Equipment */}
          <InputField
            label="Equipment Availability"
            name="equipment"
            type="text"
            value={formData.equipment}
            onChange={handleChange}
            placeholder="e.g. Tractor, Sprayer, Plough"
            fullWidth
          />

          {/* Planting Date */}
          <InputField
            label="Planting Date"
            name="plantingDate"
            type="date"
            value={formData.plantingDate}
            onChange={handleChange}
          />

          {/* Growing Season */}
          <InputField
            label="Growing Season"
            name="growingSeason"
            type="text"
            value={formData.growingSeason}
            onChange={handleChange}
            placeholder="e.g. Kharif, Rabi"
          />

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Loading..." : "Get Crop Guide"}
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-10 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
              📋 Your Crop Guide
            </h3>

            <p className="text-gray-700 leading-relaxed mb-6">
              {result.summary}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <QuickCard title="🌍 Location" value={result.location} />
              <QuickCard title="🪴 Soil" value={result.soil} />
              <QuickCard title="💧 Irrigation" value={result.irrigation} />
              <QuickCard title="🌱 Season" value={result.season} />
              <QuickCard title="📅 Planting Date" value={result.plantingDate} />
              <QuickCard title="🚜 Equipment" value={result.equipment} />
            </div>

            <Section title="🌿 Fertilizer Plan">
              <p className="text-gray-700">
                <span className="font-medium">{result.fertilizer.type}</span>,{" "}
                {result.fertilizer.amount} kg/acre <br />
                <span className="text-md font-semibold text-gray-600">
                  Schedule: {result.fertilizer.schedule}
                </span>
              </p>
            </Section>

            <Section title="💧 Irrigation Schedule">
              <List items={result.irrigationSchedule} />
            </Section>

            <Section title="🐛 Pest & Disease Management">
              <List items={result.pestManagement} />
            </Section>

            <Section title="✅ Recommendations">
              <List items={result.recommendations} />
            </Section>

            <Section title="📊 Yield & Profit Estimate">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickCard title="Expected Yield" value={result.yield.expected} />
                <QuickCard title="Market Rate" value={result.yield.marketRate} />
                <QuickCard title="Gross Income" value={result.yield.grossIncome} />
                <QuickCard title="Net Profit" value={result.yield.netProfit} />
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔹 Reusable Components */
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold text-green-800 mb-3">{title}</h4>
      {children}
    </div>
  );
}

function QuickCard({ title, value }) {
  return (
    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}

function List({ items }) {
  return (
    <ul className="list-disc ml-6 space-y-1 text-gray-700">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function InputField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  fullWidth,
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="block text-sm font-semibold text-green-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required,
  fullWidth,
}) {
  return (
    <div className={`relative ${fullWidth ? "md:col-span-2" : ""}`}>
      <label className="block text-sm font-semibold text-green-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-green-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 cursor-pointer shadow-sm appearance-none"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.toLowerCase()} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-10 text-green-600 pointer-events-none">
        ▼
      </span>
    </div>
  );
}
