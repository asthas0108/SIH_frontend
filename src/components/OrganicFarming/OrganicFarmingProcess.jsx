import React from "react";
import { CheckCircle, Leaf, Sprout, Trees, CloudRain, FileText, Store } from "lucide-react";

export default function OrganicFarmingProcess() {
  const steps = [
    {
      title: "Site Assessment & Soil Preparation",
      icon: <Leaf className="w-5 h-5" />,
      items: [
        "Analyze plot characteristics: drainage patterns, soil depth, erosion risk factors",
        "Comprehensive soil testing for pH levels, essential nutrients, organic matter content",
        "Enhance fertility using green manure, quality compost, and farmyard manure",
        "Minimize tillage operations to preserve soil structure and beneficial organisms",
      ],
    },
    {
      title: "Strategic Crop Planning & Rotation",
      icon: <Sprout className="w-5 h-5" />,
      items: [
        "Select diverse crop varieties based on local microclimate and soil characteristics",
        "Design comprehensive rotation cycles (3–8 years) to break pest cycles",
        "Integrate nitrogen-fixing legumes to naturally replenish soil nutrients",
        "Align crop selection with market demands and premium opportunities",
      ],
    },
    {
      title: "Soil & Nutrient Management",
      icon: <Trees className="w-5 h-5" />,
      items: [
        "Deploy cover crops like clover and mustard for erosion control",
        "Enrich soil biology with premium vermicompost and biofertilizers",
        "Implement conservation agriculture for sustainable soil health",
        "Build efficient rainwater harvesting systems and structures",
      ],
    },
    {
      title: "Integrated Pest Management (IPM)",
      icon: "🐞",
      items: [
        "Monitor pest populations systematically and establish action thresholds",
        "Apply cultural controls: crop hygiene, strategic trap crops, organic mulching",
        "Release beneficial insects and implement biological control methods",
        "Use botanical sprays from neem, garlic, and other natural sources",
      ],
    },
    {
      title: "Efficient Water Management",
      icon: <CloudRain className="w-5 h-5" />,
      items: [
        "Construct rainwater harvesting bunds, trenches, and retention structures",
        "Install precision drip irrigation systems for optimal water efficiency",
        "Maintain soil moisture using organic mulches and ground covers",
        "Prevent waterlogging issues and manage soil salinity effectively",
      ],
    },
    {
      title: "Documentation & Certification",
      icon: <FileText className="w-5 h-5" />,
      items: [
        "Develop comprehensive Organic System Plan (OSP) with detailed methods",
        "Maintain meticulous records of inputs, operations, harvests, and transitions",
        "Explore affordable Participatory Guarantee Systems (PGS) certification",
        "Establish buffer zones and implement contamination prevention measures",
      ],
    },
    {
      title: "Marketing & Value Addition",
      icon: <Store className="w-5 h-5" />,
      items: [
        "Target premium market segments: cooperatives, organic stores, export markets",
        "Differentiate products through transparency, farm visits, and authentic storytelling",
        "Explore value-added processing like cold-pressed oils to increase profit margins",
        "Build direct consumer relationships and establish brand recognition",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6 md:p-8 max-w-6xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 flex items-center justify-center gap-3 mb-3">
            <span className="bg-green-100 p-2 rounded-full">
              <Leaf className="w-7 h-7 text-green-600" />
            </span>
            Complete Organic Farming Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive guide to implementing sustainable organic farming practices from soil preparation to market success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-b from-white to-green-50 border border-green-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg text-green-700 group-hover:bg-green-200 transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-green-800">
                  <span className="text-green-600 mr-1">{index + 1}.</span>
                  {step.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {step.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-green-100 text-center">
          <p className="text-sm text-gray-500">
            Transitioning to organic farming typically takes 2-3 years. Document each step for certification.
          </p>
        </div>
      </div>
    </div>
  );
}