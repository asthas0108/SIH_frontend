import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  LogOut,
  MessageSquare,
  Menu,
  X,
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
  Calendar,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [latestNotifications, setLatestNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          "http://localhost:8000/notifications/my_notifications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch notifications");

        const data = await res.json();
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setLatestNotifications(sorted.slice(0, 2));
        setUnreadCount(sorted.filter((n) => !n.is_read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHome = () => navigate("/");
  const handleCalendar = () => navigate("/calendar");
  const handleProfile = () => navigate("/profile");
  const handleFeedback = () => navigate("/feedback");
  const handleSettings = () => navigate("/settings");
  const handleHelp = () => navigate("/help");
  const handleNotifications = () => navigate("/notifications");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_id");
    localStorage.removeItem("access_token");
    window.location.href = "/";
    setShowLogoutConfirm(false);
  };

  const token = localStorage.getItem('token');

  const [farmerData, setFarmerData] = useState({
    name: "------ ------",
    logo: "--",
    role: "farmer",
    email: "xyz@email",
    language: "हिंदी (Hindi)",
  });

  const get_Profile = async (userId, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/get_profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const data = await get_Profile(userId, token);

        setFarmerData(prev => ({
          name: data.full_name || prev.name,
          logo: data.full_name[0],
          role: data.role,
          email: data.email,
          language: data.preferred_language
        }));

        console.log("Mapped farmer data:", data);
        console.log(data.isPhoneVerified);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleMobileMenuItemClick = () => { setIsMenuOpen(false) };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleNotifications = () =>
    setIsNotificationsOpen(!isNotificationsOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  const navVariants = {
    initial: { y: -100 },
    animate: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <>
      <motion.nav
        className={`flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sticky top-0 z-50 ${scrolled
          ? "bg-green-900 shadow-lg backdrop-blur-sm bg-opacity-100"
          : "bg-green-800 border-b border-green-900"
          }`}
        variants={navVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="flex items-center gap-2 md:gap-3 cursor-pointer"
          whileTap={{ scale: 0.98 }}
          onClick={handleHome}
        >
          <div className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-green-800 flex items-center justify-center shadow-sm cursor-pointer">
            <img src="/logo-no-background.png" alt="Logo" />
          </div>
          <h1 className="text-lg md:text-xl font-bold tracking-wide text-white cursor-pointer">
            KisanMitra
          </h1>
        </motion.div>

        <div
          className="hidden md:flex items-center gap-2 bg-green-100 px-3 py-1 rounded-lg cursor-pointer hover:bg-green-200 transition-colors duration-200"
          onClick={handleCalendar}
        >
          <Calendar className="w-4 h-4 text-green-700" />
          <span className="text-sm font-medium text-green-800 cursor-pointer">{currentDate}</span>
        </div>

        <motion.div
          className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search crops, analytics..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${scrolled
                ? "bg-green-50 text-green-800 placeholder-green-600 border border-green-200 focus:ring-2 focus:ring-green-400"
                : "bg-white/20 text-white placeholder-green-100 border border-green-300/30 focus:ring-2 focus:ring-green-200"
                } focus:outline-none focus:border-transparent cursor-pointer`}
            />
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <div className="relative" ref={notificationsRef}>
            <motion.button
              className={`relative cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg ${scrolled
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-white/20 text-white hover:bg-white/30"
                } transition`}
              onClick={toggleNotifications}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-xs text-white rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl py-2 z-50 border border-green-200"
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <div className="px-4 py-2 border-b border-green-200">
                    <h3 className="font-semibold text-green-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {latestNotifications.length === 0 && (
                      <p className="text-center text-gray-500 py-4 cursor-pointer">
                        No notifications
                      </p>
                    )}
                    {latestNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-green-50 transition ${!notification.is_read ? "bg-green-50" : ""
                          } cursor-pointer`}
                        whileHover={{ x: 5 }}
                      >
                        <p className="text-sm text-gray-800">{notification.title}</p>
                        <p className="text-xs text-green-600 mt-1">
                          {new Date(notification.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-green-200">
                    <button
                      className="text-sm text-green-600 font-medium w-full text-center hover:text-green-800 transition cursor-pointer"
                      onClick={handleNotifications}
                    >
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            className={`flex items-center gap-1 lg:gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg ${scrolled
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-white/20 text-white hover:bg-white/30"
              } transition text-sm lg:text-base cursor-pointer`}
            onClick={handleFeedback}
          >
            <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="font-medium">Feedback</span>
          </motion.button>

          <motion.button
            className={`flex items-center justify-center w-10 h-10 rounded-lg ${scrolled
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-white/20 text-white hover:bg-white/30"
              } transition cursor-pointer`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          <div className="relative" ref={profileRef}>
            {token ? <motion.button
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${scrolled
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-white/20 text-white hover:bg-white/30"
                } transition cursor-pointer`}
              onClick={toggleProfile}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${scrolled ? "bg-green-600 text-white" : "bg-white text-green-700"
                  }`}
              >
                {farmerData.logo}
              </div>
              <span className="font-medium text-sm cursor-pointer">{farmerData.name}</span>
              <motion.div
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 cursor-pointer" />
              </motion.div>
            </motion.button>
              :
              <motion.button
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-white shadow-md cursor-pointer
    bg-gradient-to-r from-green-500 to-green-600
    hover:from-green-600 hover:to-green-700
    active:scale-95
    transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfile}
              >
                <span>Get Started</span>
              </motion.button>

            }

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl py-3 z-50 border border-green-100 overflow-hidden"
                  variants={dropdownVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {token && <div className="px-5 py-4 border-b border-green-100 bg-gradient-to-r from-green-50 to-blue-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer">
                        {farmerData.logo}
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium cursor-pointer">Signed in as</p>
                        <p className="font-semibold text-gray-800 text-sm cursor-pointer">{farmerData.name}</p>
                        <p className="text-xs text-gray-500 cursor-pointer">{farmerData.email}</p>
                      </div>
                    </div>
                  </div>
                  }

                  <div className="py-2">
                    {token && <motion.button
                      className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 transition-all duration-200 group cursor-pointer"
                      onClick={handleProfile}
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium">Profile</span>
                        <p className="text-xs text-gray-500">Manage your account</p>
                      </div>
                    </motion.button>}


                    {token && <motion.button
                      className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group cursor-pointer"
                      onClick={handleSettings}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <Settings className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium">Settings</span>
                        <p className="text-xs text-gray-500">Application preferences</p>
                      </div>
                    </motion.button>}

                    <motion.button
                      className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-amber-100 transition-all duration-200 group cursor-pointer"
                      onClick={handleHelp}
                    >
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium">Help</span>
                        <p className="text-xs text-gray-500">FAQ & support</p>
                      </div>
                    </motion.button>

                    {token ? <motion.button
                      className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 group cursor-pointer"
                      onClick={() => setShowLogoutConfirm(true)}
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="font-medium">Logout</span>
                        <p className="text-xs text-gray-500">Sign out of your account</p>
                      </div>
                    </motion.button> :
                      <motion.button
                        className="flex items-center gap-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group cursor-pointer" onClick={() => window.location.href = '/signup'}
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <LogIn className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium">LogIn</span>
                          <p className="text-xs text-gray-500">Sign in to your account</p>
                        </div>
                      </motion.button>
                    }

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          className={`md:hidden flex items-center justify-center w-10 h-10 rounded-md ${scrolled
            ? "text-green-700 hover:bg-green-100"
            : "text-white hover:bg-white/20"
            } transition`}
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden fixed top-16 inset-x-4 
                 bg-white/80 backdrop-blur-xl 
                 shadow-2xl rounded-3xl z-50 
                 overflow-hidden border border-gray-200"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col divide-y divide-gray-100">
              {[
                ...(localStorage.getItem("token")
                  ? [
                    { label: "Home", onClick: handleHome },
                    { label: "Profile", onClick: handleProfile },
                    { label: "Settings", onClick: handleSettings },
                    { label: "Notifications", onClick: handleNotifications },
                    { label: "Help & Support", onClick: handleHelp },
                    { label: "Calendar", onClick: handleCalendar },
                    { label: "Feedback", onClick: handleFeedback },
                  ]
                  : [
                    { label: "Home", onClick: handleHome },
                    { label: "Help & Support", onClick: handleHelp },
                  ]
                ),
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    item.onClick();
                    handleMobileMenuItemClick();
                  }}
                  className="px-6 py-4 text-left 
                 text-gray-700 font-medium 
                 hover:bg-gradient-to-r 
                 hover:from-green-50 hover:to-green-100 
                 hover:text-green-700 
                 transition-all duration-300
                 flex items-center gap-3"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {item.label}
                </motion.button>
              ))}

              {localStorage.getItem('token') && <motion.button
                onClick={() => {
                  setShowLogoutConfirm(true);
                  handleMobileMenuItemClick();
                }}
                className="px-6 py-4 text-left 
                     text-red-600 font-semibold
                     hover:bg-gradient-to-r 
                     hover:from-red-50 hover:to-red-100 
                     transition-all duration-300
                     flex items-center gap-3 bg-red-100"
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.96 }}
              >
                Logout
              </motion.button>}

              {!localStorage.getItem('token') && <motion.button
                onClick={
                  () => {
                    handleMobileMenuItemClick();
                    navigate("/signup");
                  }}
                className="px-6 py-4 text-left 
                     text-blue-600 font-semibold
                     hover:bg-gradient-to-r 
                     hover:from-blue-500 hover:to-blue-100 
                     transition-all duration-300
                     flex items-center gap-3 bg-blue-100"
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.96 }}
              >
                Login
              </motion.button>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-green-100/90 rounded-2xl shadow-xl p-6 w-80 text-center relative"
            >
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>

              <LogOut className="w-10 h-10 text-red-600 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-800">
                Are you sure?
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                You will be signed out of your account.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
