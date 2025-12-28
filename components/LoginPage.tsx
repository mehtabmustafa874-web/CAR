
import React, { useState, useEffect } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const CAR_IMAGES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920', // Porsche
  'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1920', // Tesla
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1920', // BMW
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1920'  // Mercedes
];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % CAR_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      if (username === 'swiftdriveclone' && password === '7777') {
        onLogin();
      } else {
        setError('Invalid credentials. Please try again.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Dynamic Background Slideshow */}
      {CAR_IMAGES.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentImgIndex ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt="Luxury Car"
            className="w-full h-full object-cover transform scale-110 animate-[zoom_20s_infinite_alternate]"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>

      <style>{`
        @keyframes zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>

      {/* Back Option Button (Floating Top Left) */}
      <button 
        onClick={() => window.location.reload()}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-all font-bold group"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </div>
        <span className="text-sm uppercase tracking-widest">Back</span>
      </button>

      <div className="relative z-10 w-full max-w-md p-8 animate-scale-in">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[48px] shadow-2xl overflow-hidden relative">
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/30 rounded-full blur-[80px]"></div>
          
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/40 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <span className="text-white font-black text-4xl italic">S</span>
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">SwiftDrive Elite</h1>
            <p className="text-white/60 font-medium tracking-tight">Enter your secure terminal credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="swiftdriveclone"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] ml-1">Secure Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs font-bold text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20 animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Initializing...
                </>
              ) : 'Authenticate Access'}
            </button>
          </form>

          <div className="mt-10 text-center relative">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Protected by SwiftDrive AI</p>
            <div className="flex justify-center gap-4">
               <div className="w-1 h-1 rounded-full bg-white/20"></div>
               <div className="w-1 h-1 rounded-full bg-white/20"></div>
               <div className="w-1 h-1 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">
          Global Luxury Logistics • Secure Terminal
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
