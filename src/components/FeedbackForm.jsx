import React, { useState, useEffect } from "react";
import {
  Send,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("crop-suggestions");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [userFeedbacks, setUserFeedbacks] = useState([]); 
  const [loading, setLoading] = useState(false);

  const fetchUserFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/feedbacks/my_feedbacks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${
            localStorage.getItem("token") || localStorage.getItem("access-token")
          }`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserFeedbacks(data.feedbacks || []);
      } else {
        setUserFeedbacks([]);
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setError("Please write some feedback before submitting.");
      return;
    }
    if (rating === 0) {
      setError("Please select a rating before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/feedbacks/add_feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${
            localStorage.getItem("token") || localStorage.getItem("access-token")
          }`,
        },
        body: JSON.stringify({
          rating,
          comment: feedback,
          category,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setError("");
        setFeedback("");
        setRating(0);
        setCategory("crop-suggestions");
        fetchUserFeedbacks();
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        const errorData = await res.json();
        setError(errorData.detail || "Failed to submit feedback. Try again.");
      }
    } catch (err) {
      setError("Network error: Could not connect to the server.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-50 text-gray-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-green-700 text-white p-6 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row md:justify-between md:items-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <h1 className="text-3xl font-bold mb-2 md:mb-0 tracking-tight">
          KisanMitra Feedback
        </h1>
        <p className="text-sm md:text-base max-w-md opacity-90">
          Your thoughts shape the future of KisanMitra. Help us improve by
          sharing your feedback!
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Share your feedback
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate your experience
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
                      (hoverRating || rating) >= star
                        ? "text-yellow-500 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 w-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition cursor-pointer"
            >
              <option value="crop-suggestions">Crop Suggestions</option>
              <option value="weather-alerts">Weather Alerts</option>
              <option value="farming-tools">Farming Tools</option>
              <option value="app-experience">App Experience</option>
              <option value="other">Other</option>
            </select>
          </div>

          <textarea
            className="border border-gray-300 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 resize-none transition-all duration-200 hover:shadow-inner hover:border-green-400"
            rows={6}
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <motion.button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center transition duration-300 shadow-md hover:shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5 mr-2 rotate-90" />
            Submit Feedback
          </motion.button>

          {submitted && (
            <motion.div
              className="flex items-center text-green-600 font-medium mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Thank you for your feedback!
            </motion.div>
          )}
          {error && (
            <motion.div
              className="flex items-center text-red-600 font-medium mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <XCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>

      <motion.div
        className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-green-800 font-semibold mb-4 text-xl">
          Your Feedbacks
        </h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : userFeedbacks.length === 0 ? (
          <p className="text-gray-500">You haven’t submitted any feedback yet.</p>
        ) : (
          <div className="space-y-4">
            {userFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="p-4 border border-gray-200 rounded-xl bg-green-50 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= fb.rating
                            ? "text-yellow-500 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(fb.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{fb.comment}</p>
                <span className="text-xs font-medium text-green-700 mt-1 inline-block">
                  {fb.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
