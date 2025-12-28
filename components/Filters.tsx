
import React from 'react';
import { CarType, FuelType, FilterState } from '../types';
import { BRANDS } from '../constants';

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onChange }) => {
  const toggleType = (type: CarType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types: newTypes });
  };

  const toggleFuel = (fuel: FuelType) => {
    const newFuels = filters.fuelTypes.includes(fuel)
      ? filters.fuelTypes.filter(f => f !== fuel)
      : [...filters.fuelTypes, fuel];
    onChange({ ...filters, fuelTypes: newFuels });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: newBrands });
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24">
      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Car Category</h4>
        <div className="space-y-2">
          {Object.values(CarType).map(type => (
            <label key={type} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={filters.types.includes(type)}
                onChange={() => toggleType(type)}
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Price Range</h4>
        <div className="space-y-4">
           <input 
              type="range" 
              min="0" 
              max="500" 
              step="10"
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
           />
           <div className="flex justify-between text-sm font-bold text-gray-700">
             <span>$0</span>
             <span>Up to ${filters.maxPrice}</span>
           </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Fuel Type</h4>
        <div className="space-y-2">
          {Object.values(FuelType).map(fuel => (
            <label key={fuel} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={filters.fuelTypes.includes(fuel)}
                onChange={() => toggleFuel(fuel)}
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{fuel}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Brands</h4>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map(brand => (
            <button
              key={brand}
              onClick={() => toggleBrand(brand)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.brands.includes(brand) 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => onChange({ types: [], fuelTypes: [], minPrice: 0, maxPrice: 500, brands: [] })}
        className="w-full py-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default Filters;
