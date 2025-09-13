import React, { useState } from "react";
import { Send } from "lucide-react";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      console.log("Feedback submitted:", feedback);
      setSubmitted(true);
      setFeedback("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-50 text-gray-800 p-6">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row md:justify-between md:items-center transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-bold mb-2 md:mb-0 tracking-tight">
          KisanMitra Feedback
        </h1>
        <p className="text-sm md:text-base max-w-md">
          Your thoughts shape the future of KisanMitra. Help us improve by sharing your feedback!
        </p>
      </div>

      {/* Feedback Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Share your feedback
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            className="border border-gray-300 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 resize-none transition-all duration-200 hover:shadow-inner hover:border-green-400"
            rows={6}
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5 mr-2 rotate-90" />
            Submit Feedback
          </button>

          {submitted && (
            <p className="text-green-600 font-medium mt-2 animate-pulse">
              ✅ Thank you for your feedback!
            </p>
          )}
        </form>
      </div>

      {/* Info Section */}
      <div className="mt-10 max-w-3xl mx-auto bg-green-50 border-l-4 border-green-700 p-6 rounded-2xl shadow-inner transition-transform duration-300 hover:scale-[1.01]">
        <h3 className="text-green-800 font-semibold mb-3 text-lg">Why your feedback matters</h3>
        <p className="text-green-700 text-sm leading-relaxed">
          Your input helps us enhance KisanMitra and provide better AI-driven farming solutions, crop recommendations, and tools for farmers. Every piece of feedback brings us closer to smarter and more sustainable agriculture.
        </p>
      </div>
    </div>
  );
}