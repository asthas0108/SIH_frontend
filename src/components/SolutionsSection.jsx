import Card from "./Card";

const cards = [
  {
    image: "/image.png", 
    title: "Crop Recommendation",
    description:
      "Find the best crop to cultivate based on your soil and weather conditions using advanced AI algorithms.",
    tag: "AI Powered",
    onClick: () => {
      window.location.href = "/cropRecommendation";
    },
  },
  {
    image: "/image.png",
    title: "Yield Prediction",
    description:
      "Predict the expected yield for different crops using advanced machine learning models and historical data.",
    tag: "ML Analytics",
    onClick: () => {
      window.location.href = "/yieldPredict";
    },
  },
  {
    image: "/image.png",
    title: "Disease Prediction",
    description:
      "Detect plant diseases early and get preventive measures and treatment advice to protect your crops.",
    tag: "Early Detection",
    onClick: () => {
      window.location.href = "/diseasePrediction";
    },
  },
  {
    image: "/image.png",
    title: "Organic Farming Guide",
    description:
      "Learn sustainable organic practices—from soil preparation to eco-friendly pest control and certification processes.",
    tag: "Sustainable",
    onClick: () => {
      window.location.href = "/organicFarming";
    },
  },
  {
    image: "/image.png",
    title: "Weather Check",
    description:
      "Stay updated with real-time weather information and forecasts to make informed farming decisions.",
    tag: "Real-Time",
    onClick: () => {
      window.location.href = "/weatherCheck";
    },
  },
];

const SolutionsSection = () => {
  return (
    <section className="px-6 md:px-12 lg:px-16 py-16 bg-gray-50">
      
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
          Comprehensive Agricultural Solutions
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explore our cutting-edge tools designed to revolutionize your farming
          experience with{" "}
          <span className="text-green-700 font-medium">AI-powered insights</span>{" "}
          and{" "}
          <span className="text-green-700 font-medium">community collaboration</span>.
        </p>
      </div>

      
      <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default SolutionsSection;
