// src/components/MarketPriceTracker/SearchableDropdown.jsx

import React, { useState, useEffect, useRef } from 'react';

const SearchableDropdown = ({ options, value, onChange, placeholder = "Select an option" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value === 'All' ? '' : value);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        setSearchTerm(value === 'All' ? '' : value);
    }, [value]);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectOption = (option) => {
        onChange(option);
        setSearchTerm(option === 'All' ? '' : option);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <ul>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <li
                                    key={option}
                                    onClick={() => handleSelectOption(option)}
                                    className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                                >
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;