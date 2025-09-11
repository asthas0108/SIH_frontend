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
  { icon: <Sprout className="w-5 h-5 text-green-400" />, label: "Crop Recommendation" },
  { icon: <BarChart className="w-5 h-5 text-green-300" />, label: "Yield Prediction" },
  { icon: <Microscope className="w-5 h-5 text-green-200" />, label: "Disease Prediction" },
  { icon: <Leaf className="w-5 h-5 text-green-400" />, label: "Organic Farming" },
  { icon: <Users className="w-5 h-5 text-green-300" />, label: "Farmer Network" },
  { icon: <CloudSun className="w-5 h-5 text-green-200" />, label: "Weather Check" },
  { icon: <Store className="w-5 h-5 text-green-300" />, label: "Shopkeeper Listings" },
  { icon: <Bot className="w-5 h-5 text-green-200" />, label: "ChatBot" },
  { icon: <TreePine className="w-5 h-5 text-green-400" />, label: "Plantation" },
  { icon: <Calendar className="w-5 h-5 text-green-300" />, label: "Crop Planning" },
  { icon: <AlertTriangle className="w-5 h-5 text-green-200" />, label: "Labour Alerts" },
];

const FeatureGrid = () => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-4 p-6 bg-gradient-to-b from-green-900 to-green-800 shadow-[0_12px_20px_-1px_rgba(0,0,0,0.5)] relative z-10">
      {features.map((feature, index) => (
        <button
          key={index}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-950 border border-green-700 shadow-sm hover:shadow-md hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 animate-float"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '3s'
          }}
        >
          {feature.icon}
          <span className="font-medium text-green-100">{feature.label}</span>
        </button>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FeatureGrid;