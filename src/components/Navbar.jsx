import React from "react";
import { Calendar, Sun, LogOut, MessageSquare } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-green-500 shadow-md">
      {/* Left section: Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png" // replace with your logo path
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <h1 className="text-white text-2xl font-semibold">
          Welcome to AgriTech
        </h1>
      </div>

      {/* Right section: Buttons */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-300 hover:bg-lime-400 transition">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">Calendar</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-300 hover:bg-yellow-400 transition">
          <MessageSquare className="w-5 h-5" />
          <span className="font-medium">Feedback</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-100 shadow transition">
          <Sun className="w-5 h-5 text-gray-700" />
          <span className="font-medium text-gray-700">Light</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
