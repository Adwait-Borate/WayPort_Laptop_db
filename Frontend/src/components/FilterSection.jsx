import React from 'react';

const FilterSection = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <select
            onChange={(e) => onFilterChange('company', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Companies</option>
            <option value="Apple">Apple</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Asus">Asus</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              onChange={(e) => onFilterChange('priceMin', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Max"
              onChange={(e) => onFilterChange('priceMax', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="ram_desc">RAM (High to Low)</option>
            <option value="company_asc">Company (A to Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;