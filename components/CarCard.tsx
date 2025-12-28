
import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBook }) => {
  return (
    <div className="bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {/* Main Image */}
        <img 
          src={car.image} 
          alt={car.name} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
        />
        {/* Interior Reveal on Hover */}
        <img 
          src={car.gallery.interior} 
          alt={`${car.name} Interior`} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100"
        />
        
        <div className="absolute top-5 left-5 z-10">
          <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-blue-600 shadow-sm uppercase tracking-widest border border-white/20">
            {car.type}
          </span>
        </div>
        <div className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black shadow-lg border border-white/20">
          <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          {car.rating}
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-500">
           <span className="bg-blue-600/80 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">Inspect Interior</span>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{car.brand} {car.name}</h3>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{car.transmission} • {car.fuelType}</p>
          </div>
          <div className="text-right">
            <span className="block text-3xl font-black text-blue-600">${car.pricePerDay}</span>
            <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">base rate/d</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-6 py-6 border-y border-gray-50">
          <div className="flex items-center gap-3 text-gray-500 group-hover:text-blue-600 transition-colors">
             <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
             </div>
             <span className="text-xs font-black uppercase tracking-widest">{car.seats} PAX</span>
          </div>
          <div className="flex items-center gap-3 text-gray-500 group-hover:text-blue-600 transition-colors">
             <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
             </div>
             <span className="text-xs font-black uppercase tracking-widest">{car.reviews} FBK</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-8 flex-1 italic font-medium leading-relaxed">
          "{car.description}"
        </p>

        <button 
          onClick={() => onBook(car)}
          className="w-full bg-gray-900 text-white font-black py-5 rounded-[20px] hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-blue-200 transform hover:-translate-y-1 uppercase text-xs tracking-[0.2em]"
        >
          Book This Vehicle
        </button>
      </div>
    </div>
  );
};

export default CarCard;
