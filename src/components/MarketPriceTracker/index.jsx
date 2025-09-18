// src/components/CropPriceTracker.jsx

import React, { useState, useEffect, useMemo } from 'react';
import SearchableDropdown from './SearchableDropdown'; // Import the new component

// --- CONFIGURATION ---
const API_KEY = '579b464db66ec23bdd0000012eaa9540dbd5485859fa2c2345ad6342'; // Your API key
const API_URL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1000`;
const ITEMS_PER_PAGE = 25;

// --- STATIC DATA ---
const ALL_INDIAN_STATES = [
    'All', 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 
    'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 
    'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];


// ... (Loader and ErrorMessage components remain the same)
const Loader = () => <div className="flex justify-center items-center py-10"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-600"></div></div>;
const ErrorMessage = ({ message }) => <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4" role="alert"><strong className="font-bold">Error: </strong><span className="block sm:inline">{message}</span></div>;


const CropPriceTracker = () => {
    const [allPrices, setAllPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedState, setSelectedState] = useState('All');
    const [selectedCrop, setSelectedCrop] = useState('All');
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchCropPrices = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`API request failed: ${response.status}`);
                const data = await response.json();
                if (data.records && data.records.length > 0) {
                    setAllPrices(data.records);
                } else {
                    throw new Error("No records found.");
                }
            } catch (err) {
                console.error("Error fetching crop prices:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCropPrices();
    }, []);

    const uniqueCrops = useMemo(() => {
        const crops = new Set(allPrices.map(p => p.commodity));
        return ['All', ...Array.from(crops).sort()];
    }, [allPrices]);

    const filteredPrices = useMemo(() => {
        setVisibleCount(ITEMS_PER_PAGE); 
        return allPrices
            .filter(item => selectedState === 'All' || item.state === selectedState)
            .filter(item => selectedCrop === 'All' || item.commodity === selectedCrop);
    }, [allPrices, selectedState, selectedCrop]);

    const paginatedPrices = filteredPrices.slice(0, visibleCount);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-green-800">🌾 Agricultural Commodities Prices</h1>
                    <p className="mt-2 text-gray-600">Daily prices from major markets across India.</p>
                </div>

                {!loading && !error && (
                    <div className="p-6 bg-gray-50 border-y grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="state-filter" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <SearchableDropdown
                                options={ALL_INDIAN_STATES}
                                value={selectedState}
                                onChange={setSelectedState}
                                placeholder="Type to search for a state..."
                            />
                        </div>
                        <div>
                            <label htmlFor="crop-filter" className="block text-sm font-medium text-gray-700 mb-1">Crop / Commodity</label>
                            <select
                                id="crop-filter"
                                value={selectedCrop}
                                onChange={(e) => setSelectedCrop(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            >
                                {uniqueCrops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    {loading && <Loader />}
                    {error && <div className="p-6"><ErrorMessage message={error} /></div>}
                    {!loading && !error && (
                        <>
                            <table className="min-w-full text-sm text-left text-gray-700">
                                {/* ... table thead and tbody remain exactly the same as before ... */}
                                <thead className="bg-green-600 text-xs text-white uppercase tracking-wider">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Commodity</th>
                                        <th scope="col" className="px-6 py-3">Market (Mandi)</th>
                                        <th scope="col" className="px-6 py-3">State</th>
                                        <th scope="col" className="px-6 py-3">Price (₹ / Quintal)</th>
                                        <th scope="col" className="px-6 py-3">Arrival Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedPrices.length > 0 ? (
                                        paginatedPrices.map((record, index) => (
                                            <tr key={`${record.market}-${record.commodity}-${index}`} className="bg-white border-b hover:bg-green-50 transition-colors duration-200">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{record.commodity}</td>
                                                <td className="px-6 py-4">{record.market}</td>
                                                <td className="px-6 py-4">{record.state}</td>
                                                <td className="px-6 py-4 font-semibold text-gray-800">
                                                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(record.modal_price)}
                                                </td>
                                                <td className="px-6 py-4">{record.arrival_date}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="text-center py-10 text-gray-500">No data available for the selected filters.</td></tr>
                                    )}
                                </tbody>
                            </table>

                            {/* --- PAGINATION & COUNTER --- */}
                            <div className="p-4 text-center">
                                <p className="text-sm text-gray-600 mb-4">
                                    Showing <span className="font-bold">{paginatedPrices.length}</span> of <span className="font-bold">{filteredPrices.length}</span> results
                                </p>
                                {visibleCount < filteredPrices.length && (
                                    <button
                                        onClick={() => setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE)}
                                        className="bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    >
                                        Load More
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
                 <footer className="p-4 text-center text-xs text-gray-500 bg-gray-50">
                    Powered by <a href="https://data.gov.in/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">data.gov.in</a>
                </footer>
            </div>
        </div>
    );
};

export default CropPriceTracker;