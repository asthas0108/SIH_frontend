import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const FarmerAuth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        password: '',
        full_name: '',
        aadhaar_number: '',
        confirmPassword: '',
        current_village: '',
        current_taluka: '',
        current_district: '',
        current_state: '',
        current_pincode: '',
        landArea: '',
        terms_and_condition_followed: false
    });

    const resetForm = () => {
        setFormData({
            phone: '',
            email: '',
            password: '',
            full_name: '',
            aadhaar_number: '',
            confirmPassword: '',
            current_village: '',
            current_taluka: '',
            current_district: '',
            current_state: '',
            current_pincode: '',
            landArea: '',
            terms_and_condition_followed: false
        });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');

        try {
            if (isLogin) {
                const res = await fetch("http://127.0.0.1:8000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phone_number: formData.phone,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    if (data.detail) {
                        if (typeof data.detail === "string") {
                            setErrors({ general: data.detail });
                        } else if (Array.isArray(data.detail)) {
                            const validationErrors = {};
                            data.detail.forEach(error => {
                                if (error.loc && error.loc.length > 1) {
                                    const field = error.loc[1];
                                    validationErrors[field] = error.msg;
                                }
                            });
                            setErrors(validationErrors);
                        }
                    } else {
                        setErrors({ general: "Login failed. Please try again." });
                    }
                    setIsLoading(false);
                    return;
                }

                console.log("Login successful:", data);

                localStorage.setItem("token", data.access_token);
                localStorage.setItem("userId", data.user_id);

                setSuccessMessage("Login successful! Redirecting...");
                resetForm();

                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);

            } else {
                if (formData.password !== formData.confirmPassword) {
                    setErrors({ confirmPassword: "Passwords do not match" });
                    setIsLoading(false);
                    return;
                }

                if (!formData.terms_and_condition_followed) {
                    setErrors({ terms_and_condition_followed: "You must agree to the terms and conditions" });
                    setIsLoading(false);
                    return;
                }

                const signupData = {
                    phone_number: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
                    full_name: formData.full_name,
                    aadhaar_number: formData.aadhaar_number,
                    current_village: formData.current_village,
                    current_taluka: formData.current_taluka,
                    current_district: formData.current_district,
                    current_state: formData.current_state,
                    current_pincode: formData.current_pincode,
                    total_land_holdings: parseFloat(formData.landArea),
                    terms_and_condition_followed: formData.terms_and_condition_followed
                };

                const res = await fetch("http://127.0.0.1:8000/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupData),
                });

                const data = await res.json();

                if (!res.ok) {
                    if (data.detail) {
                        if (typeof data.detail === 'string') {
                            setErrors({ general: data.detail });
                        } else if (Array.isArray(data.detail)) {
                            const validationErrors = {};
                            data.detail.forEach(error => {
                                if (error.loc && error.loc.length > 1) {
                                    const field = error.loc[1];
                                    validationErrors[field] = error.msg;
                                }
                            });
                            setErrors(validationErrors);
                        }
                    } else {
                        setErrors({ general: "Registration failed. Please try again." });
                    }
                    setIsLoading(false);
                    return;
                }

                console.log("Signup successful:", data);
                setSuccessMessage("Registration successful! Please login with your credentials.");
                resetForm();
                setTimeout(() => {
                    setIsLogin(true);
                }, 2000);
            }
        } catch (err) {
            console.error("Error:", err.message);
            setErrors({ general: err.message || "An unexpected error occurred" });
        } finally {
            setIsLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setSuccessMessage('');
        if (!isLogin) {
            resetForm();
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 120 }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-100 flex items-center justify-center pt-4 relative overflow-hidden">
            <div className='px-4'>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full opacity-10"
                            style={{
                                background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
                                width: Math.random() * 200 + 100,
                                height: Math.random() * 200 + 100,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, Math.random() * 40 - 20],
                                x: [0, Math.random() * 40 - 20],
                                scale: [1, 1 + Math.random() * 0.3],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className="w-full max-w-4xl bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="w-full md:w-2/5 bg-gradient-to-br from-emerald-900 to-cyan-900 p-8 text-white flex flex-col justify-center relative overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <motion.div
                                className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            <motion.div
                                className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-amber-300/20"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                }}
                            />
                        </div>

                        <motion.div
                            className="text-center md:text-left relative z-10"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants} className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-6 backdrop-blur-sm">
                                <img src='public\logo-no-background.png' alt="Kisan Mitra Logo" />
                            </motion.div>
                            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">Kisan Mitra</motion.h2>
                            <motion.p variants={itemVariants} className="text-emerald-100 mb-6">
                                {isLogin
                                    ? 'Empowering Indian farmers with technology-driven agricultural solutions'
                                    : 'Join thousands of farmers accessing expert advice, market prices, and government schemes'}
                            </motion.p>
                            <motion.div variants={itemVariants} className="hidden md:block space-y-3 mt-8">
                                {['Real-time market prices', 'Expert farming advice', 'Government scheme updates'].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <div className="w-full md:w-3/5 p-8">
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Farmer Account'}
                            </h1>
                            <p className="text-gray-600">
                                {isLogin ? 'Sign in to continue to your account' : 'Join the digital farming revolution'}
                            </p>
                        </motion.div>

                        {errors.general && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                            >
                                {errors.general}
                            </motion.div>
                        )}

                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                            >
                                {successMessage}
                            </motion.div>
                        )}

                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            variants={formVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Mobile Number <span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="10-digit mobile number"
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                    />
                                </div>
                                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    required
                                    minLength="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {!isLogin && (
                                    <motion.div
                                        key="signup-fields"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-6">
                                            <motion.div
                                                variants={itemVariants}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                            >
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        Full Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="full_name"
                                                        value={formData.full_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter your full name"
                                                        required={!isLogin}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                    />
                                                    {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        Aadhaar Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="aadhaar_number"
                                                        value={formData.aadhaar_number}
                                                        onChange={handleInputChange}
                                                        placeholder="12-digit Aadhaar"
                                                        required={!isLogin}
                                                        pattern="[0-9]{12}"
                                                        maxLength="12"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                    />
                                                    {errors.aadhaar_number && <p className="text-red-500 text-sm mt-1">{errors.aadhaar_number}</p>}
                                                </div>
                                            </motion.div>

                                            <motion.div variants={itemVariants} className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Confirm Password <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    placeholder="Re-enter your password"
                                                    required={!isLogin}
                                                    minLength="6"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                />
                                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                                {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
                                            </motion.div>

                                            <motion.div
                                                variants={itemVariants}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                            >
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        Village <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="current_village"
                                                        value={formData.current_village}
                                                        onChange={handleInputChange}
                                                        placeholder="Village name"
                                                        required={!isLogin}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                    />
                                                    {errors.current_village && <p className="text-red-500 text-sm mt-1">{errors.current_village}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        Taluka <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="current_taluka"
                                                        value={formData.current_taluka}
                                                        onChange={handleInputChange}
                                                        placeholder="Taluka name"
                                                        required={!isLogin}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
        placeholder-gray-400 text-gray-800
        transition-all duration-200 ease-in-out
        hover:border-emerald-400"
                                                    />
                                                    {errors.current_taluka && <p className="text-red-500 text-sm mt-1">{errors.current_taluka}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        District <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="current_district"
                                                        value={formData.current_district}
                                                        onChange={handleInputChange}
                                                        placeholder="District"
                                                        required={!isLogin}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                    />
                                                    {errors.current_district && <p className="text-red-500 text-sm mt-1">{errors.current_district}</p>}
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                variants={itemVariants}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                            >
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        State <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        name="current_state"
                                                        value={formData.current_state}
                                                        onChange={handleInputChange}
                                                        required={!isLogin}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                    >
                                                        <option>Andhra Pradesh</option>
                                                        <option>Arunachal Pradesh</option>
                                                        <option>Assam</option>
                                                        <option>Bihar</option>
                                                        <option>Chhattisgarh</option>
                                                        <option>Goa</option>
                                                        <option>Gujarat</option>
                                                        <option>Haryana</option>
                                                        <option>Himachal Pradesh</option>
                                                        <option>Jharkhand</option>
                                                        <option>Karnataka</option>
                                                        <option>Kerala</option>
                                                        <option>Madhya Pradesh</option>
                                                        <option>Maharashtra</option>
                                                        <option>Manipur</option>
                                                        <option>Meghalaya</option>
                                                        <option>Mizoram</option>
                                                        <option>Nagaland</option>
                                                        <option>Odisha</option>
                                                        <option>Punjab</option>
                                                        <option>Rajasthan</option>
                                                        <option>Sikkim</option>
                                                        <option>Tamil Nadu</option>
                                                        <option>Telangana</option>
                                                        <option>Tripura</option>
                                                        <option>Uttar Pradesh</option>
                                                        <option>Uttarakhand</option>
                                                        <option>West Bengal</option>
                                                    </select>
                                                    {errors.current_state && <p className="text-red-500 text-sm mt-1">{errors.current_state}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-sm font-semibold text-gray-700">
                                                        Pincode <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="current_pincode"
                                                        value={formData.current_pincode}
                                                        onChange={handleInputChange}
                                                        placeholder="6-digit pincode"
                                                        required={!isLogin}
                                                        pattern="[0-9]{6}"
                                                        maxLength="6"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                    />
                                                    {errors.current_pincode && <p className="text-red-500 text-sm mt-1">{errors.current_pincode}</p>}
                                                </div>
                                            </motion.div>

                                            <motion.div variants={itemVariants} className="space-y-2">
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Land Area (acres) <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="landArea"
                                                    value={formData.landArea}
                                                    onChange={handleInputChange}
                                                    placeholder="Total land area in acres"
                                                    required={!isLogin}
                                                    min="0"
                                                    step="0.1"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                                            focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                                        placeholder-gray-400 text-gray-800
                                        transition-all duration-200 ease-in-out
                                        hover:border-emerald-400"
                                                />
                                                {errors.total_land_holdings && <p className="text-red-500 text-sm mt-1">{errors.total_land_holdings}</p>}
                                            </motion.div>

                                            <motion.div
                                                variants={itemVariants}
                                                className="flex items-start space-x-3 bg-white p-3 rounded-lg border"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="agreeToTerms"
                                                    name="terms_and_condition_followed"
                                                    checked={formData.terms_and_condition_followed}
                                                    onChange={handleInputChange}
                                                    required={!isLogin}
                                                    className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                />
                                                <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                                                    I agree to the{" "}
                                                    <a href="#" className="text-emerald-600 hover:underline">
                                                        Terms and Conditions
                                                    </a>{" "}
                                                    and{" "}
                                                    <a href="#" className="text-emerald-600 hover:underline">
                                                        Privacy Policy
                                                    </a>
                                                </label>
                                                {errors.terms_and_condition_followed && <p className="text-red-500 text-sm mt-1">{errors.terms_and_condition_followed}</p>}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                variants={itemVariants}
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    isLogin ? "Sign In" : "Create Account"
                                )}
                            </motion.button>
                        </motion.form>

                        <motion.div
                            className="mt-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="text-gray-600">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    type="button"
                                    onClick={switchMode}
                                    className="text-emerald-600 font-medium hover:underline focus:outline-none cursor-pointer"
                                >
                                    {isLogin ? 'Register as Farmer' : 'Sign In'}
                                </button>
                            </p>

                            {isLogin && (
                                <button
                                    type="button"
                                    className="mt-3 text-sm text-gray-500 hover:text-emerald-600 focus:outline-none cursor-pointer"
                                >
                                    Forgot your password?
                                </button>
                            )}
                        </motion.div>

                        {isLogin && (
                            <motion.div
                                className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <p className="text-sm text-emerald-700 text-center">
                                    Demo: Use any 10-digit number and 6+ character password
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            <div className='bg-green-900 w-screen mt-10'>
                <div className="border-t border-green-800 pt-8 pb-10">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="text-center md:text-left">
                            <p className="text-green-100 mb-2">
                                Subscribe to our farming newsletter
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-4 py-2 rounded-l-lg bg-green-800 border border-green-700 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                                <button className="bg-amber-500 text-green-900 font-semibold px-4 py-2 rounded-r-lg hover:bg-amber-400 transition cursor-pointer">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-md text-green-100">
                                © {new Date().getFullYear()} KisanMitra | Driving Sustainable
                                Farming
                            </p>
                            <p className="text-green-200 mt-1">
                                Made with <FaHeart className="inline text-amber-400 mx-1" /> for
                                farmers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FarmerAuth;