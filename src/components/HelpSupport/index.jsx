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
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  // Video Tutorials Data
  const videoTutorials = [
    {
      id: 1,
      title: "Getting Started with KisanMitra",
      description: "Complete introduction to using KisanMitra platform",
      duration: "10:30",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      category: "basics",
    },
    {
      id: 2,
      title: "Crop Disease Detection Guide",
      description: "Learn how to use AI-powered disease detection",
      duration: "8:45",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      category: "disease",
    },
    {
      id: 3,
      title: "Weather Monitoring & Alerts",
      description: "Set up weather alerts for your farm",
      duration: "6:20",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      category: "weather",
    },
    {
      id: 4,
      title: "Market Price Tracking",
      description: "Track commodity prices and market trends",
      duration: "7:15",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      category: "market",
    },
    {
      id: 5,
      title: "Smart Irrigation Setup",
      description: "IoT-based irrigation system configuration",
      duration: "12:40",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/Vof1GmL2DAQ?si=c44bqgmcgJSQIO7M",
      category: "irrigation",
    },
    {
      id: 6,
      title: "Crop Recommendation System",
      description: "Get AI-powered crop recommendations",
      duration: "9:25",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      category: "crops",
    },
    {
      id: 7,
      title: "Yield Prediction Analysis",
      description: "Predict crop yield using data analytics",
      duration: "11:10",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      category: "yield",
    },
    {
      id: 8,
      title: "Organic Farming Best Practices",
      description: "Sustainable and organic farming methods",
      duration: "15:30",
      thumbnail: "/api/placeholder/320/180",
      videoUrl: "https://youtu.be/dQw4w9WgXcQ",
      category: "organic",
    },
  ];

  // Documentation Articles Data
  const documentationArticles = [
    {
      id: 1,
      title: "User Account Management",
      excerpt: "Complete guide to managing your KisanMitra account",
      content: `
        <h3>Creating Your Account</h3>
        <p>To get started with KisanMitra, you'll need to create an account...</p>
        
        <h3>Profile Setup</h3>
        <p>Complete your farmer profile with accurate information...</p>
        
        <h3>Security Settings</h3>
        <p>Protect your account with strong passwords and two-factor authentication...</p>
      `,
      category: "account",
      readTime: "5 min",
      lastUpdated: "2025-09-10",
    },
    {
      id: 2,
      title: "Crop Disease Detection API",
      excerpt: "Technical documentation for integrating disease detection",
      content: `
        <h3>API Overview</h3>
        <p>The Disease Detection API allows you to analyze crop images...</p>
        
        <h3>Authentication</h3>
        <p>All API requests require authentication using API keys...</p>
        
        <h3>Upload Image</h3>
        <p>Send POST request to /api/disease-detection with image data...</p>
      `,
      category: "api",
      readTime: "8 min",
      lastUpdated: "2025-09-12",
    },
    {
      id: 3,
      title: "Weather Data Integration",
      excerpt:
        "How to integrate and use weather data in your farming decisions",
      content: `
        <h3>Weather Sources</h3>
        <p>KisanMitra integrates with multiple weather data providers...</p>
        
        <h3>Setting Location</h3>
        <p>Configure your farm location for accurate weather forecasts...</p>
        
        <h3>Alert Configuration</h3>
        <p>Set up custom weather alerts for critical conditions...</p>
      `,
      category: "weather",
      readTime: "6 min",
      lastUpdated: "2025-09-08",
    },
    {
      id: 4,
      title: "Market Price Analytics",
      excerpt: "Understanding market trends and price predictions",
      content: `
        <h3>Price Data Sources</h3>
        <p>Our market data comes from government mandis and private markets...</p>
        
        <h3>Trend Analysis</h3>
        <p>Use historical data to understand price patterns...</p>
        
        <h3>Price Alerts</h3>
        <p>Set up alerts for commodity price changes...</p>
      `,
      category: "market",
      readTime: "7 min",
      lastUpdated: "2025-09-14",
    },
  ];

  // External Resources
  const externalResources = [
    {
      title: "PM-Kisan Scheme",
      description: "Government financial support for farmers",
      url: "https://pmkisan.gov.in/",
      category: "government",
      type: "scheme",
    },
    {
      title: "Kisan Credit Card",
      description: "Agricultural credit scheme for farmers",
      url: "https://www.nabard.org/content1.aspx?to=Agriculture%20and%20Rural%20Development&id=25&catid=23",
      category: "government",
      type: "credit",
    },
    {
      title: "Indian Council of Agricultural Research",
      description: "Latest agricultural research and publications",
      url: "https://icar.org.in/",
      category: "research",
      type: "institution",
    },
    {
      title: "Soil Health Card Scheme",
      description: "Check soil health and get recommendations",
      url: "https://www.soilhealth.dac.gov.in/",
      category: "government",
      type: "scheme",
    },
    {
      title: "Agricultural Marketing Division",
      description: "Market information and price data",
      url: "https://agmarknet.gov.in/",
      category: "market",
      type: "data",
    },
    {
      title: "Central Research Institute for Dryland Agriculture",
      description: "Research on dryland farming techniques",
      url: "https://www.crida.in/",
      category: "research",
      type: "institution",
    },
  ];

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
      route: "/crop-management", // Route to crop management page
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
        "Navigate to the Crop Recommendation section and fill in your soil details, location, and season preferences. Our AI system will analyze your data and suggest the best crops for your farm conditions.",
      category: "crops",
    },
    {
      question: "How accurate are weather predictions?",
      answer:
        "Our weather data is sourced from reliable meteorological services and is updated every 6 hours for maximum accuracy. We achieve 85-90% accuracy for 7-day forecasts and 95% for 3-day forecasts.",
      category: "weather",
    },
    {
      question: "Can I export my farming data?",
      answer:
        "Yes, you can export your data from the Settings page under Privacy & Security section. Data is available in CSV, Excel, and PDF formats for your records and analysis.",
      category: "data",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page or change it from your profile settings. You'll receive a reset link via email that's valid for 24 hours.",
      category: "account",
    },
    {
      question: "How does disease detection work?",
      answer:
        "Upload a clear photo of affected plant parts. Our AI analyzes the image using computer vision to identify diseases, pests, and nutritional deficiencies with 92% accuracy.",
      category: "disease",
    },
    {
      question: "What crops are supported for recommendations?",
      answer:
        "We support over 50 major crops including cereals (rice, wheat, maize), pulses (chickpea, lentils), oilseeds (soybean, mustard), and cash crops (cotton, sugarcane).",
      category: "crops",
    },
    {
      question: "How do I set up weather alerts?",
      answer:
        "Go to Weather section > Alert Settings. You can set alerts for temperature, rainfall, humidity, wind speed, and severe weather warnings. Choose SMS, email, or app notifications.",
      category: "weather",
    },
    {
      question: "Are market prices updated in real-time?",
      answer:
        "Market prices are updated twice daily from major mandis across India. Premium users get hourly updates and advanced analytics features.",
      category: "market",
    },
    {
      question: "Can I use KisanMitra offline?",
      answer:
        "Basic features like viewing saved data and offline crop guides are available without internet. Real-time features like weather and market prices require internet connection.",
      category: "technical",
    },
    {
      question: "How do I contact technical support?",
      answer:
        "Use the Live Chat feature, email us at support@kisanmitra.com, or call our helpline at +91 7031678999. Support is available 24/7 for premium users and 9 AM - 6 PM for basic users.",
      category: "support",
    },
    {
      question: "What is yield prediction accuracy?",
      answer:
        "Our yield prediction model achieves 88% accuracy based on historical data, weather patterns, soil conditions, and farming practices. Accuracy improves with more farm-specific data.",
      category: "yield",
    },
    {
      question: "How do I upgrade to premium?",
      answer:
        "Go to Profile > Subscription and choose from our premium plans. Premium includes advanced analytics, priority support, real-time market data, and unlimited disease scans.",
      category: "account",
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

        {/* Section Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                {
                  id: "overview",
                  label: "Overview",
                  icon: <HelpCircle className="w-4 h-4" />,
                },
                {
                  id: "videos",
                  label: "Video Tutorials",
                  icon: <Video className="w-4 h-4" />,
                },
                {
                  id: "docs",
                  label: "Documentation",
                  icon: <FileText className="w-4 h-4" />,
                },
                {
                  id: "resources",
                  label: "External Resources",
                  icon: <ExternalLink className="w-4 h-4" />,
                },
                {
                  id: "faq",
                  label: "FAQ",
                  icon: <MessageSquare className="w-4 h-4" />,
                },
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
                  }`}
                >
                  {section.icon}
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video Tutorials Section */}
        {activeSection === "videos" && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Video Tutorials
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoTutorials.map((video) => (
                  <motion.div
                    key={video.id}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => window.open(video.videoUrl, "_blank")}
                  >
                    <div className="relative bg-gradient-to-br from-purple-400 to-blue-500 h-40 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {video.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          {video.category}
                        </span>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          Watch Now →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Documentation Section */}
        {activeSection === "docs" && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Documentation
              </h2>
              <div className="space-y-6">
                {documentationArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedArticle(article)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        Read More <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* External Resources Section */}
        {activeSection === "resources" && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                External Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {externalResources.map((resource, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          {resource.category}
                        </span>
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {resource.type}
                        </span>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
                      >
                        Visit <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Support */}
        {activeSection === "overview" && (
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
        )}

        {/* FAQ Section */}
        {(activeSection === "faq" || activeSection === "overview") && (
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Frequently Asked Questions
            </h2>

            {/* FAQ Categories */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {[
                "all",
                "crops",
                "weather",
                "disease",
                "market",
                "account",
                "technical",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSearchQuery(category === "all" ? "" : category)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    searchQuery === category ||
                    (category === "all" && !searchQuery)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-purple-100"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {faqItems
                .filter(
                  (faq) =>
                    !searchQuery ||
                    faq.category.includes(searchQuery) ||
                    faq.question
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((faq, index) => (
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
                      <span className="ml-auto text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
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
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedArticle.title}
                  </h2>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HelpSupportPage;
