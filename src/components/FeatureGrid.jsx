import React from "react";
import { useNavigate } from "react-router-dom";
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
  Crop,
} from "lucide-react";

const features = [
  {
    icon: <Sprout className="w-5 h-5 text-green-400" />,
    label: "Crop Recommendation",
    path: "/cropRecommendation",
  },
  {
    icon: <BarChart className="w-5 h-5 text-green-300" />,
    label: "Yield Prediction",
    path: "/yieldPredict",
  },
  {
    icon: <Microscope className="w-5 h-5 text-green-200" />,
    label: "Disease Prediction",
    path: "/diseasePrediction",
  },
  {
    icon: <Leaf className="w-5 h-5 text-green-400" />,
    label: "Organic Farming",
    path: "/organicFarming",
  },
  {
    icon: <Users className="w-5 h-5 text-green-300" />,
    label: "Farmer Network",
    path: "/profile",
  },
  {
    icon: <CloudSun className="w-5 h-5 text-green-200" />,
    label: "Weather Check",
    path: "/weatherCheck",
  },
  {
    icon: <Store className="w-5 h-5 text-green-300" />,
    label: "Shopkeeper Listings",
    path: "/",
  },
  {
    icon: <Bot className="w-5 h-5 text-green-200" />,
    label: "ChatBot",
    path: "/chatbot",
  },
  {
    icon: <TreePine className="w-5 h-5 text-green-400" />,
    label: "Plantation",
    path: "/",
  },
  {
    icon: <Calendar className="w-5 h-5 text-green-300" />,
    label: "Crop Planning",
    path: "/calendar",
  },
  {
    icon: <Crop className="w-5 h-5 text-green-200" />,
    label: "Crop Planner",
    path: "/plannerIntro",
  },
];

const FeatureGrid = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (path) => {
    if (path !== "/") {
      navigate(path);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 p-6 bg-gradient-to-b from-green-900 to-green-800 shadow-[0_12px_20px_-1px_rgba(0,0,0,0.5)] relative z-10">
      {features.map((feature, index) => (
        <button
          key={index}
          onClick={() => handleFeatureClick(feature.path)}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-950 border border-green-700 shadow-sm hover:shadow-md hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-float"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: "3s",
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
