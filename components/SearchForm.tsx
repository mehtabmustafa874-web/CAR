
import React, { useState } from 'react';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  initial?: SearchParams;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, initial }) => {
  // Fix: Added missing pickupTime and returnTime to satisfy SearchParams interface
  const [params, setParams] = useState<SearchParams>(initial || {
    location: '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '09:00',
    returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    returnTime: '17:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.location) return alert('Please enter a location');
    onSearch(params);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-end gap-4 max-w-5xl mx-auto -mt-12 md:-mt-16 relative z-10 border border-gray-100"
    >
      <div className="flex-1 w-full space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Location</label>
        <div className="relative">
          <input
            type="text"
            placeholder="City, Airport, or Station"
            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 font-medium text-gray-800"
            value={params.location}
            onChange={(e) => setParams({ ...params, location: e.target.value })}
          />
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
      </div>

      <div className="w-full md:w-48 space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Pickup Date</label>
        <input
          type="date"
          className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 font-medium text-gray-800"
          value={params.pickupDate}
          onChange={(e) => setParams({ ...params, pickupDate: e.target.value })}
        />
      </div>

      <div className="w-full md:w-48 space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Return Date</label>
        <input
          type="date"
          className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 font-medium text-gray-800"
          value={params.returnDate}
          onChange={(e) => setParams({ ...params, returnDate: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-200 transform hover:-translate-y-1"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
