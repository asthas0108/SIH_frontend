import React from "react";

export default function CropBestPractices() {
  const practices = [
    {
      title: "Rice (SRI Method)",
      icon: "🍚",
      description:
        "Transplant young seedlings at 8–12 days with optimized wide spacing. Use intermittent wetting techniques to dramatically reduce water consumption while enhancing robust root development and grain quality.",
    },
    {
      title: "Millets",
      icon: "🌾",
      description:
        "Cultivate these hardy, drought-resistant, low-input crops. Strategically intercrop with nitrogen-fixing legumes to naturally improve soil fertility and create sustainable farming ecosystems.",
    },
    {
      title: "Guar (Cluster Bean)",
      icon: "🫘",
      description:
        "Grow this exceptional heat-tolerant crop using farmyard manure (25 tonnes per hectare) combined with beneficial biofertilizers at sowing. Requires minimal post-establishment care.",
    },
    {
      title: "Organic Cotton",
      icon: "🧵",
      description:
        "Integrate natural pest-repellent companion plants and apply targeted biofertilizers. Success story from Chhindwara, Madhya Pradesh demonstrates restored soil health and improved profitability.",
    },
    {
      title: "Multi-Crop Systems",
      icon: "🌱",
      description:
        "Adopt traditional intercropping systems like 'Barahnaja' (featuring 12+ complementary species) to dramatically boost biodiversity, enhance ecosystem resilience, and optimize land use efficiency.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 max-w-6xl w-full">
        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-8">
          🌿 Crop-Specific Organic Best Practices
        </h2>

        {/* Practices Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-lg">{practice.icon}</span>
                {practice.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {practice.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
