import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Video,
  Book,
  Users,
  Search,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const HelpSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const helpCategories = [
    {
      icon: <Book className="w-6 h-6 text-blue-600" />,
      title: "Getting Started",
      description: "Learn the basics of KisanMitra",
      articles: 12,
      color: "blue",
      route: "/about", // Add route for Getting Started
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Crop Management",
      description: "Tips for better crop planning",
      articles: 18,
      color: "green",
      route: "/cropRecommendation", // Route to crop recommendation
    },
    {
      icon: <Video className="w-6 h-6 text-purple-600" />,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      articles: 8,
      color: "purple",
      route: "/help", // Stay on help page for videos
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "Documentation",
      description: "Detailed feature documentation",
      articles: 25,
      color: "orange",
      route: "/help", // Stay on help page for documentation
    },
  ];

  const contactOptions = [
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: true,
      route: "/chatbot",
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Support",
      description: "Get help via email",
      action: "Send Email",
      available: true,
      route: "/feedback",
    },
    {
      icon: <Phone className="w-6 h-6 text-purple-600" />,
      title: "Phone Support",
      description: "Call our helpline: +91 7031678999",
      action: "Call Now",
      available: true,
      route: "tel:+917031678999",
      isPhone: true,
    },
  ];

  const faqItems = [
    {
      question: "How do I get crop recommendations?",
      answer:
        "Navigate to the Crop Recommendation section and fill in your soil details, location, and season preferences.",
    },
    {
      question: "How accurate are weather predictions?",
      answer:
        "Our weather data is sourced from reliable meteorological services and is updated every 6 hours for maximum accuracy.",
    },
    {
      question: "Can I export my farming data?",
      answer:
        "Yes, you can export your data from the Settings page under Privacy & Security section.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page or change it from your profile settings.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <HelpCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Help & Support</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the help you need to make the most of KisanMitra. Search our
            knowledge base or contact support.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700 bg-white shadow-lg"
            />
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Browse Help Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(category.route)}
              >
                <div
                  className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {category.articles} articles
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Contact Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {option.description}
                </p>
                <button
                  onClick={() => {
                    if (option.isPhone) {
                      window.location.href = option.route;
                    } else {
                      navigate(option.route);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  {option.action}
                </button>
                {option.available && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">
                      Available now
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm ml-6">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium">
              View All FAQs
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
