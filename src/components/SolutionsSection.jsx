import { useState, useEffect } from "react";
import Card from "./Card";
import {
  MessageCircle,
  ArrowRight,
  Bot,
  Clock,
  Globe,
  BookOpen,
  Sparkles,
  CheckCircle
} from "lucide-react";

const SolutionsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const cards = [
    {
      image: "/recommendations.webp",
      title: "Crop Recommendation",
      description:
        "Leverage our advanced AI algorithms to determine the optimal crops for your specific soil composition, climate conditions, and regional market demands.",
      detailedDescription: "Our AI considers soil pH, nutrient levels, rainfall patterns, temperature ranges, elevation, and historical yield data to recommend crops that will thrive in your conditions.",
      tag: "AI Powered",
      category: "ai",
      stats: "92% accuracy in recommendations",
      onClick: () => {
        window.location.href = "/cropRecommendation";
      },
    },
    {
      image: "/yeild.jpg",
      title: "Yield Prediction",
      description:
        "Accurately forecast your harvest yields using machine learning models trained on thousands of farming datasets and local agricultural patterns.",
      detailedDescription: "Predict your harvest volume weeks or months in advance based on crop type, soil health metrics, weather forecasts, and your farming practices.",
      tag: "ML Analytics",
      category: "ai",
      stats: "85% prediction accuracy",
      onClick: () => {
        window.location.href = "/yieldPredict";
      },
    },
    {
      image: "/health.jpg",
      title: "Crop Health Monitoring",
      description:
        "Early detection system for plant diseases, nutrient deficiencies, and pest infestations with preventive measures and treatment advice.",
      detailedDescription: "Upload images of your crops or use our mobile scanning feature to identify issues before they spread.",
      tag: "Early Detection",
      category: "health",
      stats: "Identify 50+ common crop diseases",
      onClick: () => {
        window.location.href = "/diseasePrediction";
      },
    },
    {
      image: "/organic.jpg",
      title: "Organic Farming Guide",
      description:
        "Complete resource for transitioning to and maintaining organic farming practices with step-by-step guidance.",
      detailedDescription: "Access comprehensive guides on soil preparation, natural pest management, organic certification processes, and sustainable farming techniques.",
      tag: "Sustainable",
      category: "resources",
      stats: "300+ organic practices documented",
      onClick: () => {
        window.location.href = "/organicFarming";
      },
    },
    {
      image: "/weather.jpg",
      title: "Precision Weather Analytics",
      description:
        "Hyper-local weather forecasting specifically tailored for agricultural needs with actionable insights.",
      detailedDescription: "Get precise, field-level weather forecasts including rainfall probability, temperature fluctuations, and wind patterns.",
      tag: "Real-Time",
      category: "analytics",
      stats: "Location-specific forecasts",
      onClick: () => {
        window.location.href = "/weatherCheck";
      },
    },
    {
      image: "/soil_health.jpg",
      title: "Soil Health Analysis",
      description:
        "Comprehensive soil testing and improvement recommendations to maximize fertility and sustainable practices.",
      detailedDescription: "Understand your soil's nutrient profile, organic matter content, and texture characteristics.",
      tag: "Soil Science",
      category: "analytics",
      stats: "Personalized soil treatment plans",
      onClick: () => {
        window.location.href = "/soilHealth";
      },
    },
    {
      image: "/smart.jpg",
      title: "Smart Irrigation Planning",
      description:
        "Optimize water usage with AI-powered irrigation scheduling based on crop needs and weather conditions.",
      detailedDescription: "Maximize water efficiency while ensuring your crops receive optimal moisture levels.",
      tag: "Water Efficiency",
      category: "ai",
      stats: "Reduce water usage by up to 30%",
      onClick: () => {
        window.location.href = "/irrigation";
      },
    },
    {
      image: "/market.webp",
      title: "Market Price Tracker",
      description:
        "Real-time agricultural commodity prices, trend analysis, and optimal selling time recommendations.",
      detailedDescription: "Access current and historical price data for your crops across different markets and regions.",
      tag: "Market Intelligence",
      category: "resources",
      stats: "Track 100+ commodities",
      onClick: () => {
        window.location.href = "/marketPrices";
      },
    },
  ];

  const categories = [
    { id: "all", name: "All Solutions" },
    { id: "ai", name: "AI & ML" },
    { id: "analytics", name: "Analytics" },
    { id: "health", name: "Crop Health" },
    { id: "resources", name: "Resources" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredCards = activeFilter === "all"
    ? cards
    : cards.filter(card => card.category === activeFilter);

  return (
    <section className="bg-[#f5f5dc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative bg-[#f5f5dc] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 md:mb-8 border border-amber-200 shadow-sm">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            Transforming Agriculture with Technology
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4 md:mb-6 font-playfair">
            Intelligent <span className="text-green-700">Farming Solutions</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto font-light px-2">
            Discover our comprehensive suite of tools designed to empower farmers with{" "}
            <span className="text-green-700 font-medium">data-driven insights</span>,{" "}
            <span className="text-green-700 font-medium">AI-powered recommendations</span>, and{" "}
            <span className="text-green-700 font-medium">actionable intelligence</span>.
          </p>
        </div>

        <div className="flex justify-center mb-12 md:mb-16 px-2">
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-green-100/50 max-w-full overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${activeFilter === category.id
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                  : "text-gray-700 hover:text-green-700 hover:bg-green-50/50"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-12 md:mb-16 max-w-5xl mx-auto px-2">
          {[
            { value: "500+", label: "Active Farmers", color: "text-green-700" },
            { value: "92%", label: "Accuracy Rate", color: "text-amber-700" },
            { value: "30%", label: "Yield Increase", color: "text-emerald-700" },
            { value: "24/7", label: "Support", color: "text-teal-700" },
          ].map((stat, index) => (
            <div key={index} className="bg-white/30 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg md:rounded-xl shadow-sm border border-green-100/50 text-center transition-transform hover:scale-105">
              <div className={`text-xl sm:text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12 md:mb-16 px-2">
          {filteredCards.map((card, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                {...card}
                isHovered={hoveredCard === index}
              />
            </div>
          ))}
        </div>

        <div className="w-full mx-auto px-5 pt-16 pb-16 mb-15 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 rounded-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-20 blur-lg"></div>
                <img
                  src="/bot.png"
                  alt="AI Assistant for Farmers"
                  className={`relative rounded-2xl shadow-2xl w-full h-auto transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                />
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-3 shadow-lg">
                  <Bot className="w-7 h-7 text-white" />
                </div>

                <div className="absolute -top-3 -left-3 bg-white rounded-full p-2 shadow-md animate-float">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className={`transform transition-all duration-700 delay-150 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 leading-tight">
                  Your 24/7 <span className="text-emerald-600">Farming Assistant</span>
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Our AI-powered chatbot is specifically designed to help farmers with agricultural queries,
                  crop management advice, weather information, and troubleshooting common farming challenges.
                </p>

                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-4 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Instant Responses</h3>
                      <p className="text-gray-600 text-sm">Get answers to your farming questions anytime, day or night</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Globe className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Localized Advice</h3>
                      <p className="text-gray-600 text-sm">Region-specific guidance based on your location and soil conditions</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Expert Knowledge</h3>
                      <p className="text-gray-600 text-sm">Access information from agricultural experts and research databases</p>
                    </div>
                  </div>
                </div>

                <a
                  href="/chatbot"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chatting Now</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <div className="mt-2 flex items-center gap-1 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completely free for farmers</span>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </div>

        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-green-100 to-amber-100 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-5 md:p-6 shadow-md border border-green-200/60 hover:border-green-300/70 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-5">
                <div className="relative">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 md:p-4 rounded-full shadow-inner">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586m-7.614 2.828a4 4 0 010-5.656M15 10h-1.586m-7.614 2.828a4 4 0 005.656 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-3 h-3 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 font-playfair text-center sm:text-left">
                  Farmer Success Story
                </h3>

                <blockquote className="text-gray-700 italic text-center sm:text-left leading-relaxed">
                  <span className="text-2xl md:text-3xl text-green-500 font-serif leading-none">"</span>
                  Using these tools increased my profits by 35% in the first season alone. The yield prediction helped me plan my storage and the crop advisor suggested the perfect rotation.
                  <span className="text-2xl md:text-3xl text-green-500 font-serif leading-none">"</span>
                </blockquote>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      RS
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Rajesh Singh</p>
                      <p className="text-xs text-gray-500">Wheat & Rice Farmer</p>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Punjab, India
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center sm:justify-start">
                  <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center group">
                    Read more success stories
                    <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-900 pt-16 pb-16 md:pt-20 rounded-tl-[40px] md:rounded-tl-[80px] rounded-tr-[40px] md:rounded-tr-[80px]">
        <div className="text-center bg-gradient-to-r from-green-600/90 to-emerald-700/90 rounded-xl md:rounded-4xl p-6 sm:p-8 md:p-10 lg:p-12 text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl mx-auto shadow-xl border border-green-500/30 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-10 sm:-top-12 md:-top-16 lg:-top-20 -right-10 sm:-right-12 md:-right-16 lg:-right-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 -left-10 sm:-left-12 md:-left-16 lg:-left-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-white/10 rounded-full"></div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 font-playfair relative z-10">
            Ready to Transform Your Farming Practice?
          </h3>

          <p className="mb-6 sm:mb-7 md:mb-8 text-green-100 max-w-xs sm:max-w-sm md:max-w-xl mx-auto text-base sm:text-lg relative z-10">
            Join thousands of farmers who are already increasing their yields and profits with our AI-powered platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 relative z-10">
            <button
              onClick={() => window.location.href = "/signup"}
              className="bg-white text-green-700 hover:bg-green-50 font-semibold py-3 sm:py-3.5 px-6 sm:px-8 md:px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get Started Free
            </button>
            <button
              onClick={() => window.location.href = "/demo"}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 sm:py-3.5 px-6 sm:px-8 md:px-10 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Request Demo
            </button>
          </div>

          <p className="mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm text-green-200 relative z-10">
            No credit card required • Setup in minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;