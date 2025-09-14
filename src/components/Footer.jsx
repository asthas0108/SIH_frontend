import { FaInstagram, FaHeart, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaH } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-900 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div className="md:col-span-2 flex flex-col items-center md:items-start">
          <div className="flex flex-col items-center md:flex-row md:items-end mb-5">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                src="/logo-no-background.png"
                width={120}
                className="drop-shadow-lg"
                alt="KisanMitra Logo"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-green-900">™</span>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              <Link to="/about" className="hover:text-amber-300 transition-colors duration-300">
                Kisan<span className="text-amber-300">Mitra</span>
              </Link>
            </h2>
          </div>

          <p className="text-lg text-green-100 max-w-md text-center md:text-left mb-5">
            Empowering farmers with modern technology for a sustainable future.
          </p>

          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="p-3 bg-green-800 rounded-full hover:bg-amber-500 hover:text-green-900 transition-all duration-300 transform hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="text-lg" />
            </a>
            <a
              href="#"
              className="p-3 bg-green-800 rounded-full hover:bg-amber-500 hover:text-green-900 transition-all duration-300 transform hover:scale-110"
              aria-label="Check our GitHub"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="#"
              className="p-3 bg-green-800 rounded-full hover:bg-amber-500 hover:text-green-900 transition-all duration-300 transform hover:scale-110"
              aria-label="Connect on LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-5 border-b-2 border-amber-400 pb-2">Quick Links</h3>
          <ul className="space-y-3 text-green-100">
            <li><a href="/about" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>KisanMitra</a></li>
            <li><a href="#" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Home</a></li>
            <li><a href="/dashboard" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Dashboard</a></li>
            <li><a href="#" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Reports</a></li>
            <li><a href="#" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Support</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-5 border-b-2 border-amber-400 pb-2">Our Tools</h3>
          <ul className="space-y-3 text-green-100">
            <li><a href="#" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Crop Advisor</a></li>
            <li><a href="#" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Weather Insights</a></li>
            <li><a href="#" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Soil Health</a></li>
            <li><a href="#" className="hover:text-amber-300 transition flex items-center"><span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>Planner</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-800 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <p className="text-green-100 mb-2">Subscribe to our farming newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-l-lg bg-green-800 border border-green-700 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="bg-amber-500 text-green-900 font-semibold px-4 py-2 rounded-r-lg hover:bg-amber-400 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-md text-green-100">
              © {new Date().getFullYear()} KisanMitra | Driving Sustainable Farming
            </p>
            <p className="text-green-200 mt-1">
              Made with <FaHeart className="inline text-amber-400 mx-1"/> for farmers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
