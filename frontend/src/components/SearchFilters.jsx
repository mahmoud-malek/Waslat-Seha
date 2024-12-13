import React from 'react';
import './SearchFilters.css';

export default function SearchFilter({ show, onClose }) {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
		</button>
			  
        <div className="search-filter-container">
				<div className="search-filter-item">
					<label htmlFor="specialty">Specialty</label>
					<select name="specialty" id="specialty">
					<option value="all">All</option>
					<option value="cardiologist">Cardiologist</option>
					<option value="pediatrician">Pediatrician</option>
					<option value="dermatologist">Dermatologist</option>
					<option value="gynecologist">Gynecologist</option>
					</select>
				</div>
				<div className="search-filter-item">
					<label htmlFor="location">Location</label>
					<select name="location" id="location">
					<option value="all">All</option>
					<option value="new-york">New York</option>
					<option value="california">California</option>
					<option value="florida">Florida</option>
					<option value="texas">Texas</option>
					</select>
				</div>
				<div className="search-filter-item">
					<label htmlFor="rating">Rating</label>
					<select name="rating" id="rating">
					<option value="all">All</option>
					<option value="4">⭐️⭐️⭐️⭐️ & above</option>
					<option value="3">⭐️⭐️⭐️ & above</option>
					<option value="2">⭐️⭐️ & above</option>
					<option value="1">⭐️ & above</option>
					</select>
				</div>
				<div className="search-filter-item">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" placeholder="Search by name" />
				</div>
				<div className="search-filter-item">
					<label htmlFor="price">Price</label>
					<select name="price" id="price">
					<option value="all">All</option>
					<option value="100">$50 - $100</option>
					<option value="200">$100 - $200</option>
					<option value="300">$200 - $300</option>
					<option value="400">$300 - $400</option>
					<option value="500">$400 - $500</option>
					<option value="+500">$500 & above</option>
					</select>
				</div>
				<div className="search-filter-item">
					<label htmlFor="sort">Sort By</label>
					<select name="sort" id="sort">
					<option value="rating">Rating</option>
					<option value="price">Price</option>
					<option value="name">Name</option>
					</select>
				</div>
				<div className="search-filter-item">
					<label htmlFor="order">Order</label>
					<select name="order" id="order">
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
					</select>
				</div>
				<div className="search-filter-item">
					<button>Search</button>
				</div>
				<div className="search-filter-item">
					<button>Reset</button>
				</div>
        </div>
      </div>
    </div>
  );
}