import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sprout,
  Calendar,
  Droplets,
  Sun,
  CloudRain,
  Thermometer,
  BarChart3,
  Clock,
  MapPin,
  ChevronRight,
  Search,
  Filter,
  BookOpen,
  Play,
  Download,
  Star,
  ArrowLeft,
  Leaf,
  Bug,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  Users,
  Video,
  FileText,
  Heart,
} from "lucide-react";

const CropManagementPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedArticles, setLikedArticles] = useState(new Set());
  const navigate = useNavigate();

  const handleArticleClick = (article) => {
    if (article.type === "video" && article.videoUrl) {
      window.open(article.videoUrl, "_blank");
    } else {
      // For now, we'll just show an alert for articles
      // In a real app, this would navigate to the full article page
      alert(`Opening article: ${article.title}`);
    }
  };

  const categories = [
    {
      id: "all",
      name: "All Topics",
      icon: <BookOpen className="w-4 h-4" />,
      count: 18,
    },
    {
      id: "planning",
      name: "Crop Planning",
      icon: <Calendar className="w-4 h-4" />,
      count: 5,
    },
    {
      id: "irrigation",
      name: "Irrigation",
      icon: <Droplets className="w-4 h-4" />,
      count: 4,
    },
    {
      id: "nutrients",
      name: "Nutrient Management",
      icon: <Leaf className="w-4 h-4" />,
      count: 3,
    },
    {
      id: "protection",
      name: "Crop Protection",
      icon: <Shield className="w-4 h-4" />,
      count: 4,
    },
    {
      id: "harvesting",
      name: "Harvesting",
      icon: <Target className="w-4 h-4" />,
      count: 2,
    },
  ];

  const articles = [
    {
      id: 1,
      title: "Complete Guide to Seasonal Crop Planning",
      category: "planning",
      type: "article",
      readTime: "8 min read",
      difficulty: "Beginner",
      likes: 156,
      excerpt:
        "Learn how to plan your crops according to seasons for maximum yield and profit.",
      image: "/crop-planning.jpg",
      tags: ["Kharif", "Rabi", "Zaid", "Planning"],
      featured: true,
    },
    {
      id: 2,
      title: "Drip Irrigation Setup and Management",
      category: "irrigation",
      type: "video",
      readTime: "12 min watch",
      difficulty: "Intermediate",
      likes: 234,
      excerpt:
        "Step-by-step guide to installing and maintaining drip irrigation systems.",
      image: "/irrigation.jpg",
      tags: ["Water", "Efficiency", "Setup"],
      featured: true,
      videoUrl: "https://youtu.be/Vof1GmL2DAQ?si=c44bqgmcgJSQIO7M",
    },
    {
      id: 3,
      title: "Soil Testing and Nutrient Analysis",
      category: "nutrients",
      type: "article",
      readTime: "6 min read",
      difficulty: "Beginner",
      likes: 189,
      excerpt:
        "Understanding soil health and nutrient requirements for optimal crop growth.",
      image: "/soil-testing.jpg",
      tags: ["NPK", "Soil Health", "Testing"],
    },
    {
      id: 4,
      title: "Integrated Pest Management Strategies",
      category: "protection",
      type: "article",
      readTime: "10 min read",
      difficulty: "Advanced",
      likes: 267,
      excerpt:
        "Comprehensive approach to managing pests using biological and chemical methods.",
      image: "/pest-management.jpg",
      tags: ["IPM", "Pesticides", "Natural"],
    },
    {
      id: 5,
      title: "Optimal Harvesting Techniques",
      category: "harvesting",
      type: "video",
      readTime: "15 min watch",
      difficulty: "Intermediate",
      likes: 198,
      excerpt:
        "Learn when and how to harvest crops for maximum quality and shelf life.",
      image: "/harvesting.jpg",
      tags: ["Timing", "Quality", "Post-harvest"],
    },
    {
      id: 6,
      title: "Crop Rotation Benefits and Planning",
      category: "planning",
      type: "article",
      readTime: "7 min read",
      difficulty: "Intermediate",
      likes: 145,
      excerpt:
        "Maximize soil health and crop yield through strategic crop rotation.",
      image: "/crop-rotation.jpg",
      tags: ["Rotation", "Sustainability", "Yield"],
    },
    {
      id: 7,
      title: "Smart Irrigation Scheduling",
      category: "irrigation",
      type: "article",
      readTime: "5 min read",
      difficulty: "Beginner",
      likes: 112,
      excerpt: "Use technology and data to optimize your irrigation schedule.",
      image: "/smart-irrigation.jpg",
      tags: ["Technology", "Water", "Scheduling"],
    },
    {
      id: 8,
      title: "Organic Fertilizer Preparation",
      category: "nutrients",
      type: "video",
      readTime: "18 min watch",
      difficulty: "Beginner",
      likes: 278,
      excerpt: "Create nutrient-rich organic fertilizers using farm waste.",
      image: "/organic-fertilizer.jpg",
      tags: ["Organic", "Composting", "Sustainable"],
    },
    {
      id: 9,
      title: "Disease Prevention in Crop Management",
      category: "protection",
      type: "article",
      readTime: "9 min read",
      difficulty: "Intermediate",
      likes: 201,
      excerpt: "Identify and prevent common crop diseases before they spread.",
      image: "/disease-prevention.jpg",
      tags: ["Disease", "Prevention", "Symptoms"],
    },
    {
      id: 10,
      title: "Post-Harvest Storage Solutions",
      category: "harvesting",
      type: "article",
      readTime: "6 min read",
      difficulty: "Intermediate",
      likes: 167,
      excerpt:
        "Proper storage techniques to maintain crop quality and reduce losses.",
      image: "/storage.jpg",
      tags: ["Storage", "Quality", "Loss Prevention"],
    },
  ];

  const quickTips = [
    {
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: "Plan Ahead",
      tip: "Start planning your next season while current crops are growing",
    },
    {
      icon: <Droplets className="w-6 h-6 text-cyan-600" />,
      title: "Water Wisely",
      tip: "Monitor soil moisture levels before irrigation",
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Soil First",
      tip: "Healthy soil is the foundation of successful crop management",
    },
    {
      icon: <Bug className="w-6 h-6 text-orange-600" />,
      title: "Monitor Regularly",
      tip: "Weekly field inspections can prevent major pest outbreaks",
    },
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter((article) => article.featured);

  const toggleLike = (articleId) => {
    setLikedArticles((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(articleId)) {
        newLiked.delete(articleId);
      } else {
        newLiked.add(articleId);
      }
      return newLiked;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate("/help")}
              className="flex items-center gap-2 text-green-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Help & Support
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Users className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Crop Management
                </h1>
                <p className="text-xl text-green-100">
                  Tips for better crop planning
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{articles.length}</div>
                <div className="text-green-100">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">6</div>
                <div className="text-green-100">Video Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-green-100">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">12K+</div>
                <div className="text-green-100">Farmers Helped</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Tips */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Tips for Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{tip.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-sm">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Articles */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        article.difficulty
                      )}`}
                    >
                      {article.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      {article.type === "video" ? (
                        <Video className="w-4 h-4 text-white" />
                      ) : (
                        <FileText className="w-4 h-4 text-white" />
                      )}
                      <span className="text-white text-sm">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => toggleLike(article.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedArticles.has(article.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                      <span className="text-sm">{article.likes}</span>
                    </button>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <button
                    onClick={() => handleArticleClick(article)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {article.type === "video" ? (
                      <Play className="w-4 h-4" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                    {article.type === "video" ? "Watch Now" : "Read Article"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Search and Filter */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, guides, and tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs opacity-75">
                      ({category.count})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Articles Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Articles{" "}
              {selectedCategory !== "all" && `(${filteredArticles.length})`}
            </h2>
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="text-sm">
                Showing {filteredArticles.length} results
              </span>
            </div>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-40 bg-gradient-to-r from-green-400 to-emerald-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          article.difficulty
                        )}`}
                      >
                        {article.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        {article.type === "video" ? (
                          <Video className="w-4 h-4 text-white" />
                        ) : (
                          <FileText className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        {article.readTime}
                      </span>
                      <button
                        onClick={() => toggleLike(article.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedArticles.has(article.id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                        <span className="text-sm">{article.likes}</span>
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleArticleClick(article)}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-green-600 group-hover:text-white"
                    >
                      {article.type === "video" ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                      {article.type === "video" ? "Watch" : "Read"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Implement These Strategies?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Use KisanMitra's tools to put these crop management tips into
              practice
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/cropRecommendation")}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Crop Recommendations
              </button>
              <button
                onClick={() => navigate("/calendar")}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Crop Calendar
              </button>
              <button
                onClick={() => navigate("/chatbot")}
                className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors"
              >
                Ask AI Assistant
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CropManagementPage;
