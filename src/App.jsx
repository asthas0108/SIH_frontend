import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeatureGrid from "./components/FeatureGrid";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SolutionsSection from "./components/SolutionsSection";
import CropRecommendationForm from "./components/CropRecommendation";
import YieldPrediction from "./components/YieldPrediction";
import WeatherCheck from "./components/WeatherCheck";
import OrganicFarming from "./components/OrganicFarming/index";
import PlantDiseaseDetection from "./components/PlantDisease";

function Home() {
  return (
    <>
      <FeatureGrid />
      <SolutionsSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cropRecommendation" element={<CropRecommendationForm />} />
            <Route path="/yieldPredict" element={<YieldPrediction />} />
            <Route path="/diseasePrediction" element={<PlantDiseaseDetection />} />
            <Route path="/organicFarming" element={<OrganicFarming />} />
            <Route path="/weatherCheck" element={<WeatherCheck />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
