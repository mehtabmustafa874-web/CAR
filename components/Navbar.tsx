
import React from 'react';

interface NavbarProps {
  onNav: (view: 'home' | 'listings' | 'bookings') => void;
  currentView: string;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNav, currentView, isAuthenticated, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onNav('home')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-700 transition-colors">
              <span className="text-white font-black text-xl italic">S</span>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">SwiftDrive</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => onNav('home')}
              className={`text-sm font-semibold transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNav('listings')}
              className={`text-sm font-semibold transition-colors ${currentView === 'listings' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Browse Cars
            </button>
            <button 
              onClick={() => onNav('bookings')}
              className={`text-sm font-semibold transition-colors ${currentView === 'bookings' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              My Bookings
            </button>
            
            {isAuthenticated ? (
              <button 
                onClick={onLogout}
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-red-600 transition-all shadow-md shadow-gray-200"
              >
                Sign Out
              </button>
            ) : (
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
             <button className="text-gray-600 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
