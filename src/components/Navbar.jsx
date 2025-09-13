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
  Sprout,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navigate = useNavigate();

  const handleMobileMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const navigateUser = () => {
    navigate("/profile");
  }

  const navigateNotification = () => {
    navigate("/notifications");
  }

  const gotoSetting = () => {
    navigate("/settings");
  }

  const gotoHelp = () => {
    navigate("/help");
  }

  const navigateFeedback = () => {
    navigate('/feedback');
  }

  const handleHome = () => {
    navigate("/");
    console.log("Navigate to home page!");
  }

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const notifications = [
    { id: 1, text: "Your soil analysis report is ready", time: "10 mins ago", read: false },
    { id: 2, text: "New crop recommendations available", time: "1 hour ago", read: false },
    { id: 3, text: "Weather alert: Rain expected tomorrow", time: "2 hours ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const colors = {
    primary: "#2E7D32",
    primaryLight: "#4CAF50",
    primaryDark: "#1B5E20",
    accent: "#8BC34A",
    light: "#F1F8E9",
    dark: "#1B5E20",
    notification: "#FF9800",
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const navVariants = {
    initial: { y: -100 },
    animate: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleHome}
      >
        <div className="relative">
          <div className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-green-800 flex items-center justify-center shadow-sm">
            <img src="/logo-no-background.png" alt="" />
          </div>
          {/* <motion.div 
            className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sprout className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </motion.div> */}
        </div>
        <h1
          className="text-lg md:text-xl font-bold tracking-wide text-white"
        >
          KisanMitra
        </h1>
      </motion.div>

      <div className="hidden md:flex items-center gap-2 bg-green-100 px-3 py-1 rounded-lg">
        <Calendar className="w-4 h-4 text-green-700" />
        <span className="text-sm font-medium text-green-800">{currentDate}</span>
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
              } focus:outline-none focus:border-transparent`}
          />
        </div>
      </motion.div>

      <div className="hidden md:flex items-center gap-2 lg:gap-3">
        <div className="relative" ref={notificationsRef}>
          <motion.button
            className={`relative flex items-center justify-center w-10 h-10 rounded-lg ${scrolled
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-white/20 text-white hover:bg-white/30"
              } transition`}
            onClick={toggleNotifications}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 cursor-pointer" />
            {hasUnreadNotifications && (
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
                <div className="px-4 py-2 cursor-pointer border-b border-green-200">
                  <h3 className="font-semibold text-green-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-green-50 transition ${!notification.read ? 'bg-green-50' : ''}`}
                      whileHover={{ x: 5 }}
                    >
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-green-600 mt-1">{notification.time}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-green-200">
                  <button onClick={() => window.location.href = "/notifications"} className="text-sm text-green-600 font-medium w-full text-center hover:text-green-800 transition">
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
            } transition text-sm lg:text-base`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = "/feedback"}
        >
          <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
          <span className="font-medium cursor-pointer">Feedback</span>
        </motion.button>

        <motion.button
          className={`flex cursor-pointer items-center justify-center w-10 h-10 rounded-lg ${scrolled
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-white/20 text-white hover:bg-white/30"
            } transition`}
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        <div className="relative" ref={profileRef}>
          <motion.button
            className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-lg ${scrolled
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-white/20 text-white hover:bg-white/30"
              } transition`}
            onClick={toggleProfile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${scrolled ? "bg-green-600 text-white" : "bg-white text-green-700"
              }`}>
              JD
            </div>
            <span className="font-medium text-sm">John Doe</span>
            <motion.div
              animate={{ rotate: isProfileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-green-200 overflow-hidden"
                variants={dropdownVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))" }}
              >
                <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-sm">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 text-sm">John Doe</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-500 truncate">john.doe@example.com</p>
                </div>

                <div className="py-2 cursor-pointer">
                  <motion.button
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-all duration-200 group"
                    whileHover={{ x: 4, backgroundColor: "#f0fdf4" }}
                    onClick={() => navigateUser()}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-left cursor-pointer" onClick={() => navigateUser()}>
                      <p className="font-medium">Profile</p>
                      <p className="text-xs text-gray-500">View your account</p>
                    </div>
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-all duration-200 group"
                    whileHover={{ x: 4, backgroundColor: "#f0fdf4" }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Settings className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left cursor-pointer" onClick={() => gotoSetting()}>
                      <p className="font-medium cursor-pointer">Settings</p>
                      <p className="text-xs text-gray-500">Customize preferences</p>
                    </div>
                  </motion.button>

                  <motion.button
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-all duration-200 group"
                    whileHover={{ x: 4, backgroundColor: "#f0fdf4" }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-left cursor-pointer" onClick={() => gotoHelp()}>
                      <p className="font-medium cursor-pointer">Help & Support</p>
                      <p className="text-xs text-gray-500">Get assistance</p>
                    </div>
                  </motion.button>
                </div>

                <div className="border-t border-green-200 my-1"></div>

                <div className="py-2 cursor-pointer">
                  <motion.button
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group"
                    whileHover={{ x: 4, backgroundColor: "#fef2f2" }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <LogOut className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-left cursor-pointer">
                      <p className="font-medium">Logout</p>
                      <p className="text-xs text-red-500">Sign out of your account</p>
                    </div>
                  </motion.button>
                </div>

                <div className="px-4 py-2 bg-gray-50 border-t border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Status</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      Online
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        className={`md:hidden flex items-center justify-center w-10 h-10 rounded-md ${scrolled ? "text-green-700 hover:bg-green-100" : "text-white hover:bg-white/20"
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden z-50 border-t border-green-200"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-4 border-b border-green-200">
              <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg mb-3">
                <Calendar className="w-4 h-4 text-green-700" />
                <span className="text-sm font-medium text-green-800">{currentDate}</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search crops, analytics..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-green-50 text-green-800 placeholder-green-600 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div className="flex flex-col p-4 space-y-3">
              <motion.button
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 transition"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={
                  () => { 
                    handleMobileMenuItemClick(); 
                    navigateNotification(); 
                  }
                }
              >
                <Bell className="w-5 h-5 cursor-pointer" />
                <span className="font-medium">Notifications</span>
                {hasUnreadNotifications && (
                  <span className="ml-auto w-5 h-5 bg-amber-500 text-xs text-white rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 transition"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={
                  () => { 
                    handleMobileMenuItemClick(); 
                    navigateFeedback(); 
                  }
                }
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Feedback</span>
              </motion.button>

              <motion.button
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 transition"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  toggleProfile();
                  handleMobileMenuItemClick();
                  navigateUser();
                }}
              >
                <User className="w-5 h-5" />
                <span
                  className="font-medium"
                  onClick={() => navigateUser()}
                >
                  Profile
                </span>
              </motion.button>

              <motion.button
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 transition"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={
                  () => { 
                    handleMobileMenuItemClick(); 
                    gotoSetting(); 
                  }
                }
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium" onClick={() => gotoSetting()}>Settings</span>
              </motion.button>

              <motion.button
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 transition"
                onClick={() => {
                  toggleDarkMode();
                  handleMobileMenuItemClick();
                }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </motion.button>

              <div className="border-t border-green-200 my-2"></div>

              <motion.button
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMobileMenuItemClick}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;