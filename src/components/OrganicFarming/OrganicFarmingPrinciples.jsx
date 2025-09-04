import React from "react";
import { CheckCircle } from "lucide-react";

export default function OrganicFarmingPrinciples() {
  const principles = [
    {
      title: "Ecology",
      description:
        "Work harmoniously with living systems and natural nutrient cycles",
    },
    {
      title: "Health",
      description:
        "Sustain soil vitality, ecosystem balance, climate stability, and human well-being",
    },
    {
      title: "Fairness",
      description:
        "Foster equitable relationships between people and the environment",
    },
    {
      title: "Care",
      description:
        "Practice responsible farming to protect future generations",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 max-w-2xl w-full">
        
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-6">
          🌿 Principles of Organic Farming
        </h2>

     
        <div className="space-y-4">
          {principles.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-green-50 p-4 rounded-lg"
            >
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-gray-700">
                <span className="font-semibold text-green-700">
                  {item.title}
                </span>{" "}
                : {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
