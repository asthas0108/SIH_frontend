import React, { useEffect, useState } from "react";
import {
  FaLeaf,
  FaSeedling,
  FaChartLine,
  FaThermometerHalf,
  FaCloudSunRain,
  FaShoppingCart,
  FaRobot,
  FaUserFriends,
  FaBullseye,
  FaHandHoldingHeart,
  FaMobileAlt,
  FaAward,
  FaUsers,
  FaGlobe,
  FaLightbulb,
  FaTractor,
  FaDatabase,
  FaHeartbeat,
  FaRocket,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const KisanMitraAbout = () => {
  const [counters, setCounters] = useState({
    farmers: 0,
    villages: 0,
    crops: 0,
    revenue: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".feature-card").forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animateCounters = () => {
      const targets = {
        farmers: 50000,
        villages: 2500,
        crops: 150,
        revenue: 30,
      };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setCounters({
          farmers: Math.floor(targets.farmers * progress),
          villages: Math.floor(targets.villages * progress),
          crops: Math.floor(targets.crops * progress),
          revenue: Math.floor(targets.revenue * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, increment);
    };

    animateCounters();
  }, []);

  const features = [
    {
      icon: <FaThermometerHalf className="text-3xl" />,
      title: "Smart Agricultural Sensors",
      description:
        "Real-time monitoring of soil conditions, temperature, and humidity for optimal crop growth.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: <FaSeedling className="text-3xl" />,
      title: "Crop Recommendation",
      description:
        "AI-powered suggestions for the best crops based on your soil type and regional climate.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Soil Analysis",
      description:
        "Detailed analysis of soil health and nutrient levels with personalized improvement plans.",
      color: "from-amber-700 to-amber-800",
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Crop Analysis & Yield Prediction",
      description:
        "Advanced analytics to monitor crop health and predict yields with high accuracy.",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: <FaCloudSunRain className="text-3xl" />,
      title: "Precision Weather Analysis",
      description:
        "Hyper-local weather forecasts and alerts to help you make informed farming decisions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: "Market Price Tracker",
      description:
        "Real-time market prices and trends to help you get the best value for your produce.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Organic Farming Guide",
      description:
        "Comprehensive resources and step-by-step guidance for transitioning to organic farming.",
      color: "from-lime-500 to-lime-600",
    },
    {
      icon: <FaRobot className="text-3xl" />,
      title: "KisanMitra Chatbot",
      description:
        "24/7 AI assistant to answer your farming queries in your local language.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaTractor className="text-3xl" />,
      title: "Smart Farming Equipment",
      description:
        "Connect and optimize your farming equipment with IoT sensors and automation.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaDatabase className="text-3xl" />,
      title: "Crop Calendar & Planning",
      description:
        "Personalized crop calendars with optimal sowing and harvesting schedules.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <FaHeartbeat className="text-3xl" />,
      title: "Plant Disease Detection",
      description:
        "Early detection of plant diseases using AI-powered image analysis.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <FaAward className="text-3xl" />,
      title: "Certification Support",
      description:
        "Guidance for organic certification and sustainable farming practices.",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const achievements = [
    {
      icon: <FaRocket className="text-4xl text-emerald-600" />,
      title: "Innovation Leader",
      description: "Recognized as one of India's top AgTech startups",
      highlight: "Award Winner 2024",
    },
    {
      icon: <FaLightbulb className="text-4xl text-amber-600" />,
      title: "Technology Pioneer",
      description: "First AI-powered farming assistant in regional languages",
      highlight: "Patent Pending",
    },
    {
      icon: <FaHandHoldingHeart className="text-4xl text-green-600" />,
      title: "Social Impact",
      description: "Improved livelihoods of thousands of farming families",
      highlight: "Lives Changed",
    },
  ];

  const teamMembers = [
    {
      name: "Astha Singh",
      role: "Developer",
      image: "/astha.jpeg",
      link1: "https://github.com/asthas0108",
      link2: "https://www.linkedin.com/in/astha-singh-001877294/",
    },
    {
      name: "Divyansh Garg",
      role: "AI Specialist",
      image: "/photo.jpg",
      link1: "https://github.com/gargdivyansh1",
      link2: "https://www.linkedin.com/in/divyansh-garg515/",
    },
    {
      name: "Ayush Singh",
      role: "ML Specialist",
      image: "/ayush.jpeg",
      link1: "https://github.com/ayusingh-54",
      link2: "https://www.linkedin.com/in/ayush-singh54/",
    },
    {
      name: "Udit Verma",
      role: "Developer",
      image: "/udit.jpeg",
      link1: "https://github.com/Udit0104",
      link2: "https://www.linkedin.com/in/uditverma145/",
    },
    {
      name: "Vishal",
      role: "Data Scientist",
      image: "/vishal.jpeg",
      link1: "#",
      link2: "https://www.linkedin.com/in/vishal-gupta-615877292/",
    },
    {
      name: "Ashwani",
      role: "Data Scientist",
      image: "/ashwani.jpeg",
      link1: "#",
      link2: "https://www.linkedin.com/in/ashwani-gupta-7aaabb293/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 to-white">
      <header className="relative bg-gradient-to-r from-green-700 to-green-800 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1970&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <FaHandHoldingHeart className="text-emerald-200 mr-2" />
              <span className="text-emerald-100 font-medium">
                Empowering Indian Farmers
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 to-white">
              KisanMitra
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing agriculture through technology-driven solutions
              for increased revenue and sustainable farming
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-white text-emerald-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-50 transition-all transform hover:-translate-y-1"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/chatbot")}
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all"
              >
                Try Our AI Assistant
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-white text-2xl" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
                {counters.farmers.toLocaleString()}+
              </div>
              <p className="text-emerald-600 font-medium">Farmers Helped</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
                {counters.villages.toLocaleString()}+
              </div>
              <p className="text-emerald-600 font-medium">Villages Reached</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FaSeedling className="text-white text-2xl" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
                {counters.crops}+
              </div>
              <p className="text-emerald-600 font-medium">Crop Varieties</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-800 mb-2">
                {counters.revenue}%
              </div>
              <p className="text-emerald-600 font-medium">Revenue Increase</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-72 bg-emerald-900/5 -skew-y-2 transform origin-top-right"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-3 px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Transforming Agriculture in India
            </h2>
            <p className="text-lg text-emerald-700/90 max-w-3xl mx-auto leading-relaxed">
              KisanMitra is dedicated to revolutionizing Indian agriculture by
              providing farmers with cutting-edge technology and data-driven
              insights to maximize productivity, reduce costs, and ultimately
              increase their revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                  <FaBullseye className="text-emerald-600 text-xl" />
                </div>
                <h3 className="text-2xl font-semibold text-emerald-800">
                  Our Aim
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Increase farmer revenue by 30% within 3 years
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Reduce farming input costs by 20% through precision
                    agriculture
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Promote sustainable farming practices across India
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Bridge the technology gap in Indian agriculture
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                  <FaUserFriends className="text-emerald-600 text-xl" />
                </div>
                <h3 className="text-2xl font-semibold text-emerald-800">
                  Our Goals
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Reach 1 million farmers by 2027
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Develop regional-specific solutions for diverse Indian
                    agriculture
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Create India's largest agricultural database
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  <span className="text-emerald-700">
                    Implement AI-driven solutions in 10,000 villages
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-3 px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Our Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              How We Increase Farmer Revenue
            </h2>
            <p className="text-lg text-emerald-700/90">
              Our comprehensive suite of tools and services helps farmers
              maximize their yield and profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-emerald-100 opacity-0 translate-y-10"
              >
                <div
                  className={`w-16 h-16 rounded-2xl mb-5 flex items-center justify-center bg-gradient-to-r ${feature.color} text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-emerald-700/90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-emerald-900 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block mb-3 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              Our Achievements
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recognition & Impact
            </h2>
            <p className="text-xl text-emerald-100">
              Leading the agricultural transformation across India with
              cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-6">{achievement.icon}</div>
                <div className="inline-block px-3 py-1 bg-emerald-500 rounded-full text-sm font-medium mb-4">
                  {achievement.highlight}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {achievement.title}
                </h3>
                <p className="text-emerald-100">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 mb-4 relative inline-block">
              Meet the Creators
              <span className="absolute left-1/2 -bottom-2 w-16 h-1 bg-emerald-500 rounded-full transform -translate-x-1/2"></span>
            </h2>
            <p className="text-base md:text-lg text-emerald-700/90 leading-relaxed">
              A passionate and diverse group of innovators committed to
              transforming Indian agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center group transform transition duration-300 hover:-translate-y-2"
              >
                <div className="w-80 h-80 mx-auto mb-6 overflow-hidden rounded-full shadow-lg relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex space-x-3">
                      <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer">
                        <a
                          href={member.link2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 text-emerald-700"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M19 0h-14c-2.761 0-5 2.239-5 
    5v14c0 2.761 2.239 5 5 5h14c2.761 
    0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 
    19h-3v-10h3v10zm-1.5-11.268c-.966 
    0-1.75-.79-1.75-1.764s.784-1.764 
    1.75-1.764 1.75.79 
    1.75 1.764-.784 1.764-1.75 
    1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.06-1.865-3.06-1.867 
    0-2.153 1.459-2.153 
    2.964v5.7h-3v-10h2.885v1.367h.041c.402-.762 
    1.385-1.565 2.85-1.565 3.048 
    0 3.614 2.006 3.614 
    4.615v5.583z"
                            />
                          </svg>
                        </a>
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200">
                        <a
                          href={member.link1}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 text-emerald-700"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 
    3.29 9.37 7.86 10.9.58.11.79-.25.79-.56 
    0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 
    1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 
    1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.72 
    0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.45.11-3.02 
    0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 2.87-.39c.97 0 1.95.13 
    2.87.39 2.19-1.49 3.15-1.18 
    3.15-1.18.62 1.57.23 2.73.11 
    3.02.73.81 1.18 1.85 1.18 3.11 
    0 4.45-2.69 5.43-5.25 5.72.41.35.77 1.04.77 
    2.1 0 1.52-.01 2.75-.01 3.12 
    0 .31.21.68.8.56A10.52 10.52 0 
    0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"
                            />
                          </svg>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-emerald-800">
                  {member.name}
                </h3>
                <p className="text-emerald-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 bg-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center mb-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <FaMobileAlt className="text-emerald-200 mr-2" />
              <span className="text-emerald-100 font-medium">
                Get Started Today
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Agricultural Revolution
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Start using KisanMitra today to maximize your farming revenue and
              embrace smart agriculture practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-white text-emerald-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-emerald-50 transition-all transform hover:-translate-y-1"
              >
                Start Your Journey
              </button>
              <button
                onClick={() => navigate("/chatbot")}
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all"
              >
                Talk to AI Assistant
              </button>
              <button
                onClick={() => navigate("/feedback")}
                className="bg-amber-500 text-emerald-900 font-semibold py-3 px-8 rounded-full hover:bg-amber-400 transition-all transform hover:-translate-y-1"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .feature-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .feature-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .feature-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .feature-card:nth-child(4) {
          animation-delay: 0.4s;
        }
        .feature-card:nth-child(5) {
          animation-delay: 0.5s;
        }
        .feature-card:nth-child(6) {
          animation-delay: 0.6s;
        }
        .feature-card:nth-child(7) {
          animation-delay: 0.7s;
        }
        .feature-card:nth-child(8) {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
};

export default KisanMitraAbout;
