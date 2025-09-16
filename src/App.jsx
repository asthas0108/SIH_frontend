import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import SoilHealthAnalysis from "./components/SoilHealth";
import ChatBot from "./components/ChatBot";
import EnhancedFarmerProfile from "./components/Profile";
import FeedbackForm from "./components/FeedbackForm";
import Notification from "./components/Notification";
import CropCalendar from "./components/CropCalendar";
import SettingsPage from "./components/Settings";
import HelpSupportPage from "./components/HelpSupport";
import AboutPage from "./components/About";
import CropManagementPage from "./components/CropManagement";
import FarmerChatbot from "./components/FarmerChatbot";
import SmartFarming from "./components/SmartFarming/SmartFarmingEnhanced";
import FarmerAuth from "./components/FarmerAuth";

function Home() {
  return (
    <>
      <FeatureGrid />
      <SolutionsSection />
    </>
  );
}

function FooterConditional() {
  const location = useLocation();

  if (location.pathname === "/chatbot" || location.pathname === "/signup") {
    return null;
  }

  return <Footer />;
}

function NavBarConditional() {
  const location = useLocation();

  if (location.pathname === "/chatbot") {
    return null;
  }

  return <Navbar />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBarConditional />
        {/* <FarmerChatbot /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cropRecommendation"
              element={<CropRecommendationForm />}
            />
            <Route path="/yieldPredict" element={<YieldPrediction />} />
            <Route
              path="/diseasePrediction"
              element={<PlantDiseaseDetection />}
            />
            <Route path="/organicFarming" element={<OrganicFarming />} />
            <Route path="/weatherCheck" element={<WeatherCheck />} />
            <Route path="/soilHealth" element={<SoilHealthAnalysis />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/profile" element={<EnhancedFarmerProfile />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/calendar" element={<CropCalendar />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpSupportPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/crop-management" element={<CropManagementPage />} />
            <Route path="/smartfarming" element={<SmartFarming />} />
            <Route path="/signup" element={<FarmerAuth />} />
          </Routes>
        </main>

        <FooterConditional />
      </div>
    </Router>
  );
}

export default App;
