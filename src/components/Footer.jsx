import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-600 shadow-lg text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
    
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-white p-2 rounded-2xl shadow-lg w-14 h-14 flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg">Agro</span>
          </div>
          <h2 className="text-xl font-semibold mt-4">AgroSmart</h2>
          <p className="mt-2 text-sm text-green-100 max-w-xs">
            Empowering farmers with modern technology for a sustainable future.
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="p-2 bg-green-800 rounded-full hover:bg-green-900 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-green-800 rounded-full hover:bg-green-900 transition"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="p-2 bg-green-800 rounded-full hover:bg-green-900 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

       
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-green-100">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
            <li><a href="#" className="hover:text-white transition">Reports</a></li>
            <li><a href="#" className="hover:text-white transition">Support</a></li>
          </ul>
        </div>

    
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-4">Tools</h3>
          <ul className="space-y-2 text-green-100">
            <li><a href="#" className="hover:text-white transition">Crop Advisor</a></li>
            <li><a href="#" className="hover:text-white transition">Weather Insights</a></li>
            <li><a href="#" className="hover:text-white transition">Soil Health</a></li>
            <li><a href="#" className="hover:text-white transition">Planner</a></li>
          </ul>
        </div>
      </div>

     
      <div className="border-t border-green-400/40 text-center py-6 text-md text-green-100">
        © {new Date().getFullYear()} AgroSmart | Driving Sustainable Farming
      </div>
    </footer>
  );
}
