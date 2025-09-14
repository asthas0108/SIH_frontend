import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import FeatureGrid from "./components/FeatureGrid";
import MandiPrice from "./components/MandiPrice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SolutionsSection from "./components/SolutionsSection";
import CropRecommendationForm from "./components/CropRecommendation";
import YieldPrediction from "./components/YieldPrediction";
import WeatherCheck from "./components/WeatherCheck";
import OrganicFarming from "./components/OrganicFarming/index";
import PlantDiseaseDetection from "./components/PlantDisease";
import ChatBot from "./components/ChatBot";
import EnhancedFarmerProfile from "./components/Profile";
import Smart from "./components/SmartFarming";
import FeedbackForm from "./components/FeedbackForm";
import Notification from "./components/Notification";
import KisanMitraAbout from "./components/About";

function Home() {
  return (
    <>
      <FeatureGrid />
      <SolutionsSection />
    </>
  );
}

function NavbarConditional() {
  const location = useLocation();
  
  if (location.pathname === "/chatbot") {
    return null;
  }
  
  return <Navbar />;
}

function FooterConditional() {
  const location = useLocation();
  
  if (location.pathname === "/chatbot") {
    return null;
  }
  
  return <Footer />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavbarConditional />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cropRecommendation" element={<CropRecommendationForm />} />
            <Route path="/yieldPredict" element={<YieldPrediction />} />
            <Route path="/diseasePrediction" element={<PlantDiseaseDetection />} />
            <Route path="/organicFarming" element={<OrganicFarming />} />
            <Route path="/weatherCheck" element={<WeatherCheck />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/smartfarming" element={<Smart />} />
            <Route path="/profile" element={<EnhancedFarmerProfile />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/about" element={<KisanMitraAbout />} />
            <Route path="/marketPrices" element={<MandiPrice />} />
          </Routes>
        </main>
        <FooterConditional />
      </div>
    </Router>
  );
}

export default App;