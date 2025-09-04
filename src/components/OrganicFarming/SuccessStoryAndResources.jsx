import React from "react";

export default function SuccessStoryAndResources() {
  const impacts = [
    {
      title: "Economic Impact",
      icon: "🔥",
      description:
        "Premium market price of ₹3,500 per quintal with approximately 50% improved profit margins compared to conventional farming methods.",
      border: "border-orange-200",
      hover: "hover:border-orange-400",
    },
    {
      title: "Environmental Benefits",
      icon: "🌱",
      description:
        "Significantly healthier soil microbiome, improved air quality, elimination of stubble burning practices, and enhanced ecosystem biodiversity.",
      border: "border-green-200",
      hover: "hover:border-green-400",
    },
    {
      title: "Cost Optimization",
      icon: "📉",
      description:
        "Substantial reduction in input costs through elimination of synthetic fertilizers and pesticides, replaced with sustainable organic alternatives.",
      border: "border-indigo-200",
      hover: "hover:border-indigo-400",
    },
  ];

  const resources = [
    {
      title: "Educational Video Content",
      icon: "🎥",
      link: "Organic Farming – Why & How",
      description:
        "Comprehensive video series covering fundamental principles, practical implementation strategies, and real-world success stories from organic farming pioneers.",
      border: "border-blue-200",
      hover: "hover:border-blue-400",
    },
    {
      title: "Interactive Simulation",
      icon: "🎮",
      link: "Cornucopia",
      description:
        "Advanced interactive simulation platform where you can explore complex soil-water-crop dynamics, experiment with different organic practices, and observe their long-term impacts on farm ecosystems.",
      border: "border-orange-200",
      hover: "hover:border-orange-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl w-full">
        {/* Success Story Card */}
        <div className="bg-white border border-yellow-300 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
            📘 Success Story: Organic Wheat Transformation in Punjab
          </h2>
          <p className="text-gray-700 text-sm mb-6">
            <span className="font-semibold text-green-600">
              Sucha Singh Pabla’s remarkable journey:
            </span>{" "}
            Successfully transitioned 27 acres to certified organic wheat
            production, achieving exceptional results that demonstrate the
            commercial viability and environmental benefits of organic
            agriculture.
          </p>

          
          <div className="grid gap-4">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${impact.border} bg-gray-50 shadow-sm transition ${impact.hover}`}
              >
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <span>{impact.icon}</span> {impact.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-white border border-blue-300 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-6">
            🎓 & 🎮 Interactive Learning Resources
          </h2>

          <div className="grid gap-4">
            {resources.map((resource, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${resource.border} bg-gray-50 shadow-sm transition ${resource.hover}`}
              >
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <span>{resource.icon}</span> {resource.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="text-green-600 font-medium cursor-pointer hover:underline">
                    “{resource.link}”
                  </span>{" "}
                  - {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
