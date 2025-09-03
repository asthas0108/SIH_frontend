import React from "react";
import {
  Sprout,
  BarChart,
  Microscope,
  Leaf,
  Users,
  CloudSun,
  Store,
  Bot,
  TreePine,
  Calendar,
  AlertTriangle,
} from "lucide-react";

const features = [
  { icon: <Sprout className="w-5 h-5 text-green-600" />, label: "Crop Recommendation" },
  { icon: <BarChart className="w-5 h-5 text-blue-500" />, label: "Yield Prediction" },
  { icon: <Microscope className="w-5 h-5 text-indigo-500" />, label: "Disease Prediction" },
  { icon: <Leaf className="w-5 h-5 text-green-500" />, label: "Organic Farming" },
  { icon: <Users className="w-5 h-5 text-purple-600" />, label: "Farmer Network" },
  { icon: <CloudSun className="w-5 h-5 text-yellow-500" />, label: "Weather Check" },
  { icon: <Store className="w-5 h-5 text-pink-500" />, label: "Shopkeeper Listings" },
  { icon: <Bot className="w-5 h-5 text-red-500" />, label: "ChatBot" },
  { icon: <TreePine className="w-5 h-5 text-green-700" />, label: "Plantation" },
  { icon: <Calendar className="w-5 h-5 text-blue-500" />, label: "Crop Planning" },
  { icon: <AlertTriangle className="w-5 h-5 text-orange-500" />, label: "Labour Alerts" },
];

const FeatureGrid = () => {
  return (
    <div className="w-full mb-15 flex flex-wrap justify-center gap-4 p-6 bg-gradient-to-b from-green-50 to-white shadow-[0_12px_20px_-1px_rgba(0,0,0,0.25)] relative z-10">
      {features.map((feature, index) => (
        <button
          key={index}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-green-200 shadow-sm hover:shadow-md hover:bg-green-50 transition"
        >
          {feature.icon}
          <span className="font-medium text-gray-800">{feature.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FeatureGrid;
