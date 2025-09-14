import React, { useState, useEffect } from 'react';
import './MandiPrice.css';

function MandiPrice() {
  // Replace with your actual API key from data.gov.in
  const [apiKey] = useState('579b464db66ec23bdd000001dbb599719cc6425a7c2dccafdb40b1ae');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [grades, setGrades] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');

  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch dropdown options from real API
  useEffect(() => {
    async function fetchStates() {
      try {
        const resp = await fetch(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=1000`);
        const json = await resp.json();
        console.log('States API response:', json);
        if (json.records) {
          const stateList = [...new Set(json.records.map(r => r.state))].filter(Boolean);
          setStates(stateList);
        } else {
          setStates([]);
        }
      } catch (err) {
        console.error('Error fetching states:', err);
        setStates([]);
      }
    }
    fetchStates();
  }, [apiKey]);

  useEffect(() => {
    async function fetchCommodities() {
      if (!selectedState) {
        setCommodities([]);
        return;
      }
      try {
        const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&filters[state]=${selectedState}`;
        const resp = await fetch(url);
        const json = await resp.json();
        console.log('Commodities API response:', json);
        if (json.records) {
          const commodityList = [...new Set(json.records.map(r => r.commodity))].filter(Boolean);
          setCommodities(commodityList);
        } else {
          setCommodities([]);
        }
      } catch (err) {
        console.error('Error fetching commodities:', err);
        setCommodities([]);
      }
    }
    fetchCommodities();
  }, [selectedState, apiKey]);

  // Fetch districts when state changes
  useEffect(() => {
    async function fetchDistricts() {
      if (!selectedState || !selectedCommodity) {
        setDistricts([]);
        return;
      }
      try {
        const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&filters[state]=${selectedState}&filters[commodity]=${selectedCommodity}`;
        const resp = await fetch(url);
        const json = await resp.json();
        console.log('Districts API response:', json);
        if (json.records) {
          const districtList = [...new Set(json.records.map(r => r.district))].filter(Boolean);
          setDistricts(districtList);
        } else {
          setDistricts([]);
        }
      } catch (err) {
        console.error('Error fetching districts:', err);
        setDistricts([]);
      }
    }
    fetchDistricts();
  }, [selectedState, selectedCommodity, apiKey]);

  // Fetch varieties and grades when commodity changes
  useEffect(() => {
    async function fetchVarietyGrade() {
      if (!selectedCommodity) {
        setVarieties([]);
        setGrades([]);
        return;
      }
      try {
        const resp = await fetch(`https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&filters[commodity]=${selectedCommodity}`);
        const json = await resp.json();
        console.log('Varieties/Grades API response:', json);
        if (json.records) {
          const varietyList = [...new Set(json.records.map(r => r.variety))].filter(Boolean);
          const gradeList = [...new Set(json.records.map(r => r.grade))].filter(Boolean);
          setVarieties(varietyList);
          setGrades(gradeList);
        } else {
          setVarieties([]);
          setGrades([]);
        }
      } catch (err) {
        console.error('Error fetching varieties/grades:', err);
        setVarieties([]);
        setGrades([]);
      }
    }
    fetchVarietyGrade();
  }, [selectedCommodity, apiKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams({
      'api-key': apiKey,
      'filters[state]': selectedState,
      'filters[district]': selectedDistrict,
      'filters[commodity]': selectedCommodity,
      'filters[variety]': selectedVariety,
      'filters[grade]': selectedGrade,
      'limit': 1,
      'format': 'json'
    });
    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`;
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      console.log('Price API response:', json);
      if (json.records && json.records.length > 0) {
        setPriceData(json.records[0]);
      } else {
        setPriceData(null);
        alert('No data for this selection.');
      }
    } catch (err) {
      console.error('Error fetching price data:', err);
      setPriceData(null);
      alert('Error fetching price data');
    }
    setLoading(false);
  };

  return (
    <div className="mandi-price-container">
      <h1 className="mandi-title">Market Price Tracker</h1>
      <form className="mandi-form" onSubmit={handleSubmit}>
        <label>
          State:
          <select value={selectedState} onChange={e=>setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label>
          Commodity:
          <select value={selectedCommodity} onChange={e=>setSelectedCommodity(e.target.value)}>
            <option value="">Select Commodity</option>
            {commodities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          District:
          <select value={selectedDistrict} onChange={e=>setSelectedDistrict(e.target.value)}>
            <option value="">Select District</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label>
          Variety:
          <select value={selectedVariety} onChange={e=>setSelectedVariety(e.target.value)}>
            <option value="">Select Variety</option>
            {varieties.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label>
          Grade:
          <select value={selectedGrade} onChange={e=>setSelectedGrade(e.target.value)}>
            <option value="">Select Grade</option>
            {grades.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Get Price'}</button>
      </form>

      {priceData && (
        <div className="mandi-result">
          <h2>Prices for {selectedCommodity} in {selectedDistrict}</h2>
          <p>Min Price: {priceData.min_price}</p>
          <p>Max Price: {priceData.max_price}</p>
          <p>Modal Price: {priceData.modal_price}</p>
        </div>
      )}
    </div>
  );
}

export default MandiPrice;
