import React from "react";
import { CheckCircle } from "lucide-react";

export default function OrganicFarmingProcess() {
  const steps = [
    {
      title: "1. 🌱 Site Assessment & Soil Preparation",
      items: [
        "Analyze plot characteristics: drainage patterns, soil depth, erosion risk factors",
        "Comprehensive soil testing for pH levels, essential nutrients, organic matter content",
        "Enhance fertility using green manure, quality compost, and farmyard manure",
        "Minimize tillage operations to preserve soil structure and beneficial organisms",
      ],
    },
    {
      title: "2. 📊 Strategic Crop Planning & Rotation",
      items: [
        "Select diverse crop varieties based on local microclimate and soil characteristics",
        "Design comprehensive rotation cycles (3–8 years) to break pest cycles",
        "Integrate nitrogen-fixing legumes to naturally replenish soil nutrients",
        "Align crop selection with market demands and premium opportunities",
      ],
    },
    {
      title: "3. 🌍 Soil & Nutrient Management",
      items: [
        "Deploy cover crops like clover and mustard for erosion control",
        "Enrich soil biology with premium vermicompost and biofertilizers",
        "Implement conservation agriculture for sustainable soil health",
        "Build efficient rainwater harvesting systems and structures",
      ],
    },
    {
      title: "4. 🐞 Integrated Pest Management (IPM)",
      items: [
        "Monitor pest populations systematically and establish action thresholds",
        "Apply cultural controls: crop hygiene, strategic trap crops, organic mulching",
        "Release beneficial insects and implement biological control methods",
        "Use botanical sprays from neem, garlic, and other natural sources",
      ],
    },
    {
      title: "5. 💧 Efficient Water Management",
      items: [
        "Construct rainwater harvesting bunds, trenches, and retention structures",
        "Install precision drip irrigation systems for optimal water efficiency",
        "Maintain soil moisture using organic mulches and ground covers",
        "Prevent waterlogging issues and manage soil salinity effectively",
      ],
    },
    {
      title: "6. 📑 Documentation & Certification",
      items: [
        "Develop comprehensive Organic System Plan (OSP) with detailed methods",
        "Maintain meticulous records of inputs, operations, harvests, and transitions",
        "Explore affordable Participatory Guarantee Systems (PGS) certification",
        "Establish buffer zones and implement contamination prevention measures",
      ],
    },
    {
      title: "7. 🛒 Marketing & Value Addition",
      items: [
        "Target premium market segments: cooperatives, organic stores, export markets",
        "Differentiate products through transparency, farm visits, and authentic storytelling",
        "Explore value-added processing like cold-pressed oils to increase profit margins",
        "Build direct consumer relationships and establish brand recognition",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 max-w-6xl w-full">
        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-6">
          ✅ Complete Organic Farming Process
        </h2>

       
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-5 bg-green-50 border border-green-100 rounded-xl shadow-sm"
            >
              <h3 className="font-semibold text-green-700 mb-3">
                {step.title}
              </h3>
              <ul className="space-y-2">
                {step.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
