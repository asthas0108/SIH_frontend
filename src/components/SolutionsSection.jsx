import Card from "./Card";

const cards = [
  {
    image: "/image.png", 
    title: "Crop Recommendation",
    description:
      "Find the best crop to cultivate based on your soil and weather conditions using advanced AI algorithms.",
    tag: "AI Powered",
  },
  {
    image: "/image.png",
    title: "Yield Prediction",
    description:
      "Predict the expected yield for different crops using advanced machine learning models and historical data.",
    tag: "ML Analytics",
  },
  {
    image: "/image.png",
    title: "Disease Prediction",
    description:
      "Detect plant diseases early and get preventive measures and treatment advice to protect your crops.",
    tag: "Early Detection",
  },
  {
    image: "/image.png",
    title: "Organic Farming Guide",
    description:
      "Learn sustainable organic practices—from soil preparation to eco-friendly pest control and certification processes.",
    tag: "Sustainable",
  },
];

const SolutionsSection = () => {
  return (
    <section className="px-6 py-12 bg-gray-50">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
          Comprehensive Agricultural Solutions
        </h2>
        <p className="text-gray-600">
          Explore our cutting-edge tools designed to revolutionize your farming
          experience with AI-powered insights and community collaboration.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default SolutionsSection;
