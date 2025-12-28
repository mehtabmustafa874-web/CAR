
import React, { useState, useMemo } from 'react';
import { Car, SearchParams } from '../types';

interface BookingModalProps {
  car: Car;
  params: SearchParams;
  onClose: () => void;
  onConfirm: (name: string, email: string, time: { pickup: string; return: string }, finalPrice: number) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ car, params, onClose, onConfirm }) => {
  const [step, setStep] = useState<'details' | 'form'>('details');
  const [activeImage, setActiveImage] = useState(car.image);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pickupTime, setPickupTime] = useState(params.pickupTime || '09:00');
  const [returnTime, setReturnTime] = useState(params.returnTime || '17:00');
  const [paymentInput, setPaymentInput] = useState('');

  // Enhanced duration calculation including time
  const { total, totalDays, totalHours } = useMemo(() => {
    const start = new Date(`${params.pickupDate}T${pickupTime}`);
    const end = new Date(`${params.returnDate}T${returnTime}`);
    
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.max(0, diffMs / (1000 * 60 * 60));
    
    const fractionalDays = Math.max(0.5, parseFloat((hours / 24).toFixed(2)));
    const finalTotal = Math.round(fractionalDays * car.pricePerDay);
    
    return {
      total: finalTotal,
      totalDays: fractionalDays,
      totalHours: hours.toFixed(1)
    };
  }, [params.pickupDate, params.returnDate, pickupTime, returnTime, car.pricePerDay]);

  const isPaymentCorrect = paymentInput.trim() === total.toString();

  const galleryImages = [
    { url: car.image, label: 'Main' },
    { url: car.gallery.front, label: 'Front' },
    { url: car.gallery.back, label: 'Rear' },
    { url: car.gallery.interior, label: 'Inside' },
    { url: car.gallery.exterior, label: 'Detail' }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-12 duration-500 max-h-[90vh]">
        {/* Left Side: Interactive Gallery */}
        <div className="md:w-1/2 bg-gray-50 p-6 md:p-8 flex flex-col relative overflow-y-auto custom-scrollbar">
          <button 
            onClick={onClose} 
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors z-20 shadow-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="space-y-6">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-2">Elite Visual Inspection</h3>
            
            {/* Main Hero Image */}
            <div className="relative h-64 md:h-80 rounded-[32px] overflow-hidden shadow-2xl bg-gray-200 group">
              <img 
                key={activeImage}
                src={activeImage} 
                alt="Active View" 
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-5 gap-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    activeImage === img.url ? 'border-blue-600 ring-2 ring-blue-100 scale-105 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent"></div>
                </button>
              ))}
            </div>
            
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-1 block">Vehicle Grade: {car.condition}</span>
                  <h2 className="text-3xl font-black text-gray-900 leading-tight">{car.brand} {car.name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rate</p>
                  <p className="text-3xl font-black text-blue-600">${car.pricePerDay}<span className="text-sm text-gray-400">/d</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Transmission</p>
                  <p className="font-bold text-gray-900">{car.transmission}</p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Fueling</p>
                  <p className="font-bold text-gray-900">{car.fuelType}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                 <div className="flex justify-between items-center text-gray-600 font-bold text-sm">
                   <div className="flex flex-col">
                     <span>Duration</span>
                     <span className="text-[10px] text-blue-600 uppercase font-black">{totalHours} Total Hours</span>
                   </div>
                   <span className="text-gray-900 font-black">{totalDays} Net Days</span>
                 </div>
                 <div className="flex justify-between items-center mt-3 text-2xl font-black">
                   <span className="text-gray-900">Checkout Price</span>
                   <span className="text-blue-600">${total}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details or Form */}
        <div className="md:w-1/2 p-10 flex flex-col bg-white overflow-y-auto custom-scrollbar">
          {step === 'details' ? (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Technical Specifications</h3>
              
              <div className="space-y-6 flex-1">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Power Unit', value: car.specs.engine, icon: '⚡' },
                    { label: '0-100 Launch', value: car.specs.acceleration, icon: '💨' },
                    { label: 'V-Max Limit', value: car.specs.topSpeed, icon: '🏁' }
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl">{spec.icon}</div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{spec.label}</p>
                        <p className="font-black text-gray-900 text-sm">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Elite Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map(f => (
                      <span key={f} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black border border-blue-100">{f}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900/5 p-6 rounded-[32px] border border-gray-900/5">
                   <p className="text-gray-600 italic text-sm leading-relaxed">
                     "{car.description}"
                   </p>
                </div>
              </div>

              <div className="pt-10 mt-auto">
                <button 
                  onClick={() => setStep('form')}
                  className="w-full bg-blue-600 text-white font-black py-5 rounded-3xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 transform hover:-translate-y-1"
                >
                  Finalize Booking Detail
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-500">
               <div className="flex justify-between items-center mb-8">
                 <button onClick={() => setStep('details')} className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                   Specs
                 </button>
                 <h3 className="text-2xl font-black text-gray-900">Secure Identity</h3>
               </div>

               <div className="space-y-5 flex-1">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pickup Time</label>
                     <input type="time" value={pickupTime} onChange={(e) => {setPickupTime(e.target.value); setPaymentInput('');}} className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Return Time</label>
                     <input type="time" value={returnTime} onChange={(e) => {setReturnTime(e.target.value); setPaymentInput('');}} className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                   </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl py-3 px-5 font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>

                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                    <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border-none rounded-2xl py-3 px-5 font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                 </div>

                 <div className="pt-4 border-t border-gray-100">
                    <div className="bg-blue-600/5 p-5 rounded-[28px] border border-blue-600/10 mb-5">
                       <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Final Payment Settlement</p>
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-gray-500">Due Now:</span>
                          <span className="text-xl font-black text-gray-900">${total}</span>
                       </div>
                       <p className="text-[10px] text-gray-400 font-bold mb-3 italic">Verification required: {totalHours} hour window.</p>
                       <input 
                         type="number" 
                         placeholder={`Enter ${total} to verify`} 
                         value={paymentInput}
                         onChange={(e) => setPaymentInput(e.target.value)}
                         className={`w-full ${isPaymentCorrect ? 'bg-green-50 ring-2 ring-green-500' : 'bg-white ring-1 ring-gray-200'} border-none rounded-2xl py-3 px-4 font-black text-gray-900 focus:outline-none transition-all`}
                       />
                       
                       {isPaymentCorrect && (
                         <div className="mt-4 p-4 bg-green-500/10 rounded-2xl border border-green-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
                           <div className="flex items-start gap-3">
                             <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                             <div>
                               <p className="text-[11px] font-black text-green-700 uppercase tracking-tight">Security Cleared</p>
                               <p className="text-[10px] text-green-600 font-bold leading-tight">Your payment method is authorized via SwiftShield. Bank security assured.</p>
                             </div>
                           </div>
                         </div>
                       )}
                    </div>
                 </div>
               </div>

               <div className="pt-6 mt-auto">
                <button 
                  onClick={() => {
                    if (!name || !email) return alert('Please complete your information');
                    if (!isPaymentCorrect) return alert('Please confirm the exact payment amount');
                    onConfirm(name, email, { pickup: pickupTime, return: returnTime }, total);
                  }}
                  disabled={!isPaymentCorrect}
                  className={`w-full font-black py-5 rounded-3xl transition-all shadow-xl transform hover:-translate-y-1 ${isPaymentCorrect ? 'bg-gray-900 text-white hover:bg-blue-600 shadow-gray-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'}`}
                >
                  Finalize Elite Reservation
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-[0.4em]">Verified Bank Terminal</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
