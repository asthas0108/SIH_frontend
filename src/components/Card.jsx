import React from "react";
import { ArrowRight } from "lucide-react";

const Card = ({ image, title, description, tag }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
      
      <img src={image} alt={title} className="h-48 w-full object-cover" />

      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-green-800 font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>

        
        <div className="flex items-center justify-between mt-4">
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-medium">
            {tag}
          </span>
          <ArrowRight className="w-5 h-5 text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default Card;
