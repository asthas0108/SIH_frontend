import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Card = ({ image, title, description, tag, onClick }) => {
  return (
    <div className="relative group bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-lg overflow-hidden flex flex-col transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
      
     
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
      </div>

     
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        
        <div className="flex items-center justify-between mt-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 shadow-sm">
            {tag}
          </span>
          <button className="p-3 rounded-full bg-green-600 text-white shadow-md hover:bg-green-700 hover:shadow-lg transition cursor-pointer">
            <ArrowRight className="w-5 h-5" onClick={onClick}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
