import React from "react";
import { Calendar, Sun, LogOut, MessageSquare } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-green-700 to-green-600 shadow-lg">
      
      <div className="flex items-center gap-3">
        <img
          src="/logo.png" 
          alt="Logo"
          className="w-10 h-10 rounded-full border-2 border-white shadow"
        />
        <h1 className="text-white text-xl font-semibold tracking-wide">
          AgriTech
        </h1>
      </div>

    
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">Calendar</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">Feedback</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-green-700 hover:bg-gray-100 shadow transition">
          <Sun className="w-5 h-5" />
          <span className="font-medium">Light</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
