import React from "react";
import { ArrowRight } from "lucide-react";

const Card = ({ image, title, description, tag }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
    
      <div className="relative">
        <img src={image} alt={title} className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-green-800 font-semibold text-xl mb-2 tracking-wide">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm flex-grow">
          {description}
        </p>
  
        <div className="flex items-center justify-between mt-5">
          <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-medium shadow-sm">
            {tag}
          </span>
          <button className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-700 transition">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
