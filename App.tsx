
import React, { useState, useEffect, useMemo } from 'react';
import { Car, SearchParams, FilterState, Booking, CarType } from './types';
import { MOCK_CARS } from './constants';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import CarCard from './components/CarCard';
import Filters from './components/Filters';
import BookingModal from './components/BookingModal';
import LoginPage from './components/LoginPage';
import { getCarRecommendation, askSwiftAI } from './services/geminiService';

type View = 'home' | 'listings' | 'bookings';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '09:00',
    returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    returnTime: '17:00'
  });
  
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    fuelTypes: [],
    minPrice: 0,
    maxPrice: 500,
    brands: []
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  
  // Interactive AI State
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Load auth and bookings from local storage
  useEffect(() => {
    const savedAuth = localStorage.getItem('swift_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);

    const savedBookings = localStorage.getItem('swift_bookings');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('swift_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('swift_auth');
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      const typeMatch = filters.types.length === 0 || filters.types.includes(car.type);
      const fuelMatch = filters.fuelTypes.length === 0 || filters.fuelTypes.includes(car.fuelType);
      const priceMatch = car.pricePerDay <= filters.maxPrice;
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(car.brand);
      return typeMatch && fuelMatch && priceMatch && brandMatch;
    });
  }, [filters]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setCurrentView('listings');
    fetchRecommendation(params);
  };

  const fetchRecommendation = async (params: SearchParams) => {
    setLoadingRecommendation(true);
    const rec = await getCarRecommendation(params, MOCK_CARS);
    setRecommendation(rec);
    setLoadingRecommendation(false);
  };

  const handleSwiftAIAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    setIsAiThinking(true);
    const response = await askSwiftAI(userQuery, MOCK_CARS);
    setAiResponse(response);
    setIsAiThinking(false);
    setUserQuery('');
  };

  const handleBookingConfirm = (customerName: string, customerEmail: string, times: { pickup: string; return: string }, finalPrice: number) => {
    if (!selectedCar) return;
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      carId: selectedCar.id,
      carName: `${selectedCar.brand} ${selectedCar.name}`,
      carImage: selectedCar.image,
      startDate: searchParams.pickupDate,
      startTime: times.pickup,
      endDate: searchParams.returnDate,
      endTime: times.return,
      totalPrice: finalPrice,
      status: 'Confirmed',
      customerName,
      customerEmail,
      timestamp: Date.now()
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('swift_bookings', JSON.stringify(updated));
    setSelectedCar(null);
    setCurrentView('bookings');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  const renderHome = () => (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative h-[650px] bg-gray-900 flex flex-col justify-center items-center text-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-50 blur-[1px] transform scale-110 animate-pulse duration-[5000ms]" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/20 to-gray-50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl animate-fade-in-up">
            Drive the <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Future</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-medium animate-fade-in-up stagger-1">
            Experience unparalleled luxury and performance with our curated collection of elite vehicles.
          </p>
          <div className="animate-fade-in-up stagger-2">
            <button 
              onClick={() => {
                const searchSec = document.getElementById('search-section');
                searchSec?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-gray-900 font-black px-10 py-5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-2 shadow-2xl"
            >
              Start Searching
            </button>
          </div>
        </div>
      </div>

      <div id="search-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up stagger-3">
          <SearchForm onSearch={handleSearch} />
        </div>

        <section className="py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="animate-slide-in-right">
              <h2 className="text-4xl font-black text-gray-900 mb-3">Popular Categories</h2>
              <p className="text-gray-500 font-medium text-lg">Curated selections for every lifestyle and journey.</p>
            </div>
            <button 
              onClick={() => setCurrentView('listings')}
              className="text-blue-600 font-bold hover:underline group flex items-center gap-2"
            >
              View all fleet <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                name: 'Luxury', 
                type: CarType.LUXURY,
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21l-8-4.5v-9L12 3l8 4.5v9L12 21zM12 12l8-4.5M12 12v9M12 12L4 7.5"></path></svg>
              },
              { 
                name: 'SUV', 
                type: CarType.SUV,
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              },
              { 
                name: 'Electric', 
                type: CarType.LUXURY,
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              },
              { 
                name: 'Convertible', 
                type: CarType.CONVERTIBLE,
                icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              }
            ].map((cat, i) => (
              <div 
                key={cat.name} 
                className={`group cursor-pointer bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all text-center animate-fade-in-up`}
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
                onClick={() => {
                  if (cat.name === 'Electric') {
                    setFilters({ ...filters, types: [], fuelTypes: [MOCK_CARS.find(c => c.fuelType === 'Electric')?.fuelType as any].filter(Boolean) });
                  } else {
                    setFilters({ ...filters, types: [cat.type], fuelTypes: [] });
                  }
                  setCurrentView('listings');
                }}
              >
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-all transform group-hover:rotate-6 group-hover:scale-110">
                  <div className="text-blue-600 group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                </div>
                <h3 className="font-black text-xl text-gray-900">{cat.name}</h3>
                <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">Explore Fleet</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="bg-gray-50 min-h-screen py-16 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header with Back Button */}
        <div className="flex items-center gap-4 mb-10 group">
           <button 
             onClick={() => setCurrentView('home')}
             className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all"
           >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
           </button>
           <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Back to Dashboard</h2>
        </div>

        {/* Interactive SwiftAI Section */}
        <div className="mb-8 bg-gradient-to-br from-gray-900 to-blue-900 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden animate-scale-in">
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-48 h-48 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 w-full">
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight flex items-center gap-4">
                <span className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </span>
                Ask SwiftAI
              </h3>
              <p className="text-blue-100/70 font-medium mb-8 text-lg">Your elite digital concierge. Ask about our fleet, car features, or app tips.</p>
              
              <form onSubmit={handleSwiftAIAsk} className="relative group">
                <input 
                  type="text" 
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Which car is best for a high-performance business trip?"
                  className="w-full bg-white/5 border border-white/10 rounded-[28px] py-6 px-8 text-white placeholder-white/30 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all pr-32 text-lg backdrop-blur-md"
                />
                <button 
                  type="submit"
                  disabled={isAiThinking}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-4 rounded-[20px] transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                >
                  {isAiThinking ? '...' : 'Inquire'}
                </button>
              </form>
            </div>

            {aiResponse && (
              <div className="w-full md:w-1/2 bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl animate-scale-in">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  SwiftAI Response
                </p>
                <p className="text-white text-lg font-medium leading-relaxed italic">
                  "{aiResponse}"
                </p>
                <button 
                  onClick={() => setAiResponse(null)}
                  className="mt-6 text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Dismiss Response
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Personalized Recommendation Banner */}
        {(recommendation || loadingRecommendation) && (
          <div className="mb-16 bg-white rounded-[40px] p-10 border border-blue-100 shadow-xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden animate-scale-in">
             <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-bl-3xl">
               Gemini Intelligence
             </div>
             <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-blue-200">
                <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             </div>
             <div>
               <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">AI Concierge Recommendation</h3>
               {loadingRecommendation ? (
                 <div className="flex space-x-3 items-center">
                   <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                   <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                   <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
                   <span className="text-gray-400 font-bold text-sm uppercase tracking-widest ml-2">Analyzing Fleet...</span>
                 </div>
               ) : (
                 <p className="text-gray-600 text-lg italic leading-relaxed">"{recommendation}"</p>
               )}
             </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 animate-slide-in-right">
             <div className="lg:sticky lg:top-28">
                <h2 className="text-3xl font-black text-gray-900 mb-8 px-1">Refine Selection</h2>
                <Filters filters={filters} onChange={setFilters} />
             </div>
          </aside>

          {/* Main List */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-4">
              <h2 className="text-3xl font-black text-gray-900">
                {filteredCars.length} Luxury Rides 
                <span className="text-sm font-bold text-gray-400 ml-6 uppercase tracking-widest">In {searchParams.location || 'Your Region'}</span>
              </h2>
            </div>

            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-[48px] p-24 text-center shadow-sm border-2 border-dashed border-gray-100 animate-scale-in">
                 <h3 className="text-2xl font-black text-gray-900 mb-3">No matches found</h3>
                 <button 
                  onClick={() => setFilters({ types: [], fuelTypes: [], minPrice: 0, maxPrice: 500, brands: [] })}
                  className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
                 >
                   Reset Filters
                 </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCars.map((car, idx) => (
                  <div key={car.id} className="animate-fade-in-up" style={{ animationDelay: `${0.05 * idx}s` }}>
                    <CarCard car={car} onBook={(car) => setSelectedCar(car)} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-10 group">
           <button 
             onClick={() => setCurrentView('home')}
             className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all"
           >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
           </button>
           <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Back to Dashboard</h2>
        </div>

      <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
        <div>
          <h2 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">Fleet Garage</h2>
          <p className="text-gray-500 font-medium text-lg italic">Your confirmed premium reservations.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-[64px] p-32 text-center shadow-sm border border-gray-100 animate-scale-in">
          <h3 className="text-3xl font-black text-gray-900 mb-6">Your garage is currently empty.</h3>
          <button 
            onClick={() => setCurrentView('listings')}
            className="text-blue-600 font-black text-2xl hover:underline group inline-flex items-center gap-3"
          >
            Explore the Fleet <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {bookings.map((booking, idx) => (
            <div key={booking.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="bg-white rounded-[48px] overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl transition-all group">
                 <div className="relative h-60">
                   <img src={booking.carImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={booking.carName} />
                   <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg">
                     {booking.status}
                   </div>
                 </div>
                 <div className="p-10">
                   <h4 className="text-2xl font-black text-gray-900 mb-1">{booking.carName}</h4>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">RES ID: #{booking.id}</p>

                   <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                         <div>
                           <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Pickup</p>
                           <p className="text-sm font-bold text-gray-900">{booking.startDate}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-sm font-black text-gray-900">{booking.startTime}</p>
                         </div>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                         <div>
                           <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Return</p>
                           <p className="text-sm font-bold text-gray-900">{booking.endDate}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-sm font-black text-gray-900">{booking.endTime}</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex justify-between items-center py-4 border-t border-gray-100 mb-6">
                      <span className="text-sm font-bold text-gray-500">Total Paid</span>
                      <span className="text-2xl font-black text-blue-600">${booking.totalPrice}</span>
                   </div>

                   <button className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-gray-200">
                     Access Digital Key
                   </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-blue-600 selection:text-white">
      <Navbar 
        currentView={currentView} 
        onNav={setCurrentView} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <main className="transition-all duration-500">
        {currentView === 'home' && renderHome()}
        {currentView === 'listings' && renderListings()}
        {currentView === 'bookings' && renderBookings()}
      </main>

      {selectedCar && (
        <BookingModal 
          car={selectedCar} 
          params={searchParams} 
          onClose={() => setSelectedCar(null)}
          onConfirm={handleBookingConfirm}
        />
      )}
      
      <footer className="bg-gray-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20">
                  <span className="text-white font-black text-2xl italic">S</span>
                </div>
                <span className="text-3xl font-black tracking-tighter">SwiftDrive</span>
              </div>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                The global benchmark in premium vehicle logistics and curated travel experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-black text-xl mb-8 tracking-tight">Ecosystem</h4>
              <ul className="space-y-5 text-gray-400 font-bold text-sm uppercase tracking-widest">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Elite Fleet</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Exotic Tier</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Corporate</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privileged Members</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8 tracking-tight">Concierge</h4>
              <ul className="space-y-5 text-gray-400 font-bold text-sm uppercase tracking-widest">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Help Terminal</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Trust Protocols</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Policy Center</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Luxury</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8 tracking-tight">The Architect</h4>
              <p className="text-blue-400 font-black text-sm uppercase tracking-widest mb-4">MEHTAB AMANWALA</p>
              <ul className="space-y-5 text-gray-400 font-bold text-sm uppercase tracking-widest">
                <li>
                  <a href="https://www.youtube.com/@MehtabMustafa-pz3el" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/mehtab.mustafa.2024" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/mehtabamanwala/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8 tracking-tight">Intelligence</h4>
              <p className="text-gray-400 mb-8 text-lg">Receive curated fleet updates and luxury travel insights.</p>
              <div className="flex gap-3">
                <input type="email" placeholder="Concierge Email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                <button className="bg-blue-600 px-6 py-4 rounded-2xl hover:bg-blue-700 transition-all font-black transform hover:scale-105">→</button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-bold uppercase tracking-widest">
            <p>© 2024 SwiftDrive Elite Systems. Performance Delivered.</p>
            <div className="flex gap-10 mt-8 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">Security</a>
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
