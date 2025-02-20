import React, { useState } from 'react';
import './SearchFilters.css';

export default function SearchFilter({ show, onClose, onApplyFilters }) {
  const [filters, setFilters] = useState({
    specialty: 'all',
    location: 'all',
    rating: 'all',
    name: '',
    price: 'all',
    sort: 'rating',
    order: 'asc'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    const defaultFilters = {
      specialty: 'all',
      location: 'all',
      rating: 'all',
      name: '',
      price: 'all',
      sort: 'rating',
      order: 'asc'
    };
    setFilters(defaultFilters);
    onApplyFilters(defaultFilters);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content dark:bg-gray-800">
        <button className="modal-close dark:text-white" onClick={onClose}>&times;</button>
        
        <form onSubmit={handleSubmit} className="search-filter-container">
          <div className="search-filter-item">
            <label htmlFor="specialty" className="dark:text-white">Specialty</label>
            <select 
              name="specialty" 
              id="specialty"
              value={filters.specialty}
              onChange={handleChange}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="all">All Specialties</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="pediatrician">Pediatrician</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="gynecologist">Gynecologist</option>
              <option value="orthopedic">Orthopedic</option>
              <option value="dentist">Dentist</option>
			  <option value="Psychiatrist">Psychiatrist</option>
            </select>
          </div>

          <div className="search-filter-item">
            <label htmlFor="name" className="dark:text-white">Doctor Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              value={filters.name}
              onChange={handleChange}
              placeholder="Search by name" 
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="search-filter-item">
            <label htmlFor="rating" className="dark:text-white">Rating</label>
            <select 
              name="rating" 
              id="rating"
              value={filters.rating}
              onChange={handleChange}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="all">All Ratings</option>
              <option value="4">⭐️⭐️⭐️⭐️ & above</option>
              <option value="3">⭐️⭐️⭐️ & above</option>
              <option value="2">⭐️⭐️ & above</option>
            </select>
          </div>

          <div className="search-filter-item">
            <label htmlFor="price" className="dark:text-white">Price Range</label>
            <select 
              name="price" 
              id="price"
              value={filters.price}
              onChange={handleChange}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="all">All Prices</option>
              <option value="100">Under $100</option>
              <option value="200">$100 - $200</option>
              <option value="300">$200 - $300</option>
              <option value="301">Above $300</option>
            </select>
          </div>

          <div className="search-filter-item">
            <label htmlFor="sort" className="dark:text-white">Sort By</label>
            <select 
              name="sort" 
              id="sort"
              value={filters.sort}
              onChange={handleChange}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className="search-filter-actions">
            <button type="submit" className="filter-button apply-button">
              Apply Filters
            </button>
            <button 
              type="button"
              onClick={handleReset}
              className="filter-button reset-button"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}