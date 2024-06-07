import React, { useState } from 'react';
import './TopComponent.css';

const TopComponent = ({ onFilterChange, setCity, setTransmission }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = () => {
    onFilterChange(searchTerm);
  };

  return (
    <div className="top-component">
      <div className="overlay">
        <h1>Find Your Perfect Rental Car</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by brand or model"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleFilterChange}
          />
          <select
            className="filter-select"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="San Francisco">San Francisco</option>
            <option value="New York">New York</option>
          </select>
          <select
            className="filter-select"
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option value="">All Transmissions</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default TopComponent;
