import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Calendar, 
  Droplet, 
  Sprout, 
  TrendingUp, 
  Target,
  Clock,
  ArrowRight,
  TestTube,
  Bug,
  Scissors,
  Warehouse,
  Scale,
  ClipboardCheck,
  BarChart3,
  MapPin,
  Cloud,
  Sun
} from "lucide-react";

const PlannerIntro = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Crop Prediction & Suitability",
      desc: "AI recommends optimal crops based on soil analysis, climate data, and regional conditions with precise suitability scoring.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Optimal Planting Timing",
      desc: "Precision scheduling for planting windows tailored to your specific geographic and climatic conditions.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <TestTube className="w-8 h-8" />,
      title: "Soil Testing & Preparation",
      desc: "Comprehensive soil analysis and scientifically-backed land preparation methodologies.",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "Seed Selection & Treatment",
      desc: "Expert guidance on varietal selection and pretreatment protocols for maximum germination rates.",
      color: "text-lime-600",
      bgColor: "bg-lime-50"
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Smart Irrigation Scheduling",
      desc: "Water optimization strategies based on evapotranspiration rates and crop water requirements.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Fertilizer Planning",
      desc: "Precision nutrient management with customized application schedules and dosage recommendations.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Bug className="w-8 h-8" />,
      title: "Pest & Disease Management",
      desc: "Integrated pest management strategies and disease prevention protocols for crop protection.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Pruning & Training",
      desc: "Advanced canopy management techniques for optimal light penetration and air circulation.",
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Growth Stage Monitoring",
      desc: "Phenological stage tracking with targeted interventions for each developmental phase.",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Yield & Market Predictions",
      desc: "Data-driven yield forecasting and market analysis for informed decision making.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: <Warehouse className="w-8 h-8" />,
      title: "Harvest & Storage Solutions",
      desc: "Optimal harvest timing protocols and post-harvest management strategies.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Economic Analysis",
      desc: "Comprehensive ROI calculations and risk assessment for agricultural investments.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
  ];

  const stats = [
    { value: "30%", label: "Yield Increase", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "40%", label: "Resource Efficiency", icon: <Droplet className="w-5 h-5" /> },
    { value: "25%", label: "Cost Reduction", icon: <Scale className="w-5 h-5" /> },
    { value: "AI-Driven", label: "Precision", icon: <Target className="w-5 h-5" /> },
  ];

  const processSteps = [
    { 
      step: "1", 
      title: "Input Farm Parameters", 
      description: "Enter soil characteristics, location data, and resource availability",
      icon: <MapPin className="w-6 h-6" />
    },
    { 
      step: "2", 
      title: "AI Analysis", 
      description: "Advanced algorithms process your data for optimal recommendations",
      icon: <ClipboardCheck className="w-6 h-6" />
    },
    { 
      step: "3", 
      title: "Comprehensive Plan", 
      description: "Receive detailed guidance for every stage of cultivation",
      icon: <BarChart3 className="w-6 h-6" />
    },
    { 
      step: "4", 
      title: "Implementation", 
      description: "Execute with confidence using step-by-step instructions",
      icon: <Sprout className="w-6 h-6" />
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-green-50 px-6 py-12 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 opacity-5">
          <Leaf className="w-60 h-60 text-green-600" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-5">
          <Sprout className="w-60 h-60 text-emerald-600" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16 relative z-10 max-w-5xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-gradient-to-r from-green-600 rounded-full to-emerald-600 p-4 shadow-lg">
            <Target className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Advanced <span className="text-green-700">Agricultural Intelligence</span>
        </h1>
        <p className="text-lg text-gray-700 mx-auto leading-relaxed max-w-3xl mb-10">
          Transform your farming operations with AI-powered precision agriculture. 
          Our system delivers comprehensive crop management solutions based on scientific data and machine learning.
        </p>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md rounded-full transition-shadow"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="text-green-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 text-center">{stat.value}</div>
              <div className="text-sm text-gray-600 text-center mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className="mb-16 w-full max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <h4 className="text-2xl font-semibold text-center text-gray-900 mb-10">Implementation Process</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 p-6 hover:shadow-md transition-all rounded-3xl"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold mr-3 rounded-full">
                  {step.step}
                </div>
                <div className="text-green-600">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mb-16 relative z-10"
      >
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            className="bg-white border border-gray-200 p-6 hover:shadow-md rounded-3xl transition-all h-full"
            variants={{ 
              hidden: { opacity: 0, y: 15 }, 
              visible: { opacity: 1, y: 0 } 
            }}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.2 }
            }}
          >
            <div className={`p-3 ${f.bgColor} inline-flex rounded-full mb-4`}>
              <div className={f.color}>
                {f.icon}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{f.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-4" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="text-center relative z-10 max-w-2xl"
      >
        <div className="bg-white border border-gray-200 p-8 shadow-sm mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Optimize Your Agriculture Operations?</h3>
          <p className="text-gray-600 mb-6">
            Our AI-driven platform provides scientifically-validated recommendations for maximum yield and efficiency.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => navigate("/planner")}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 transition-colors flex items-center justify-center space-x-2 mx-auto cursor-pointer"
            >
              <span>Begin Planning</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
        
        <p className="text-gray-600 flex items-center justify-center text-sm">
          <Clock className="w-4 h-4 mr-2" /> 
          Comprehensive analysis delivered in minutes
        </p>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-10% top-25% opacity-10"
      >
        <Cloud className="w-20 h-20 text-blue-400" />
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute right-12% bottom-20% opacity-10"
      >
        <Sun className="w-16 h-16 text-yellow-400" />
      </motion.div>
    </div>
  );
};

export default PlannerIntro;