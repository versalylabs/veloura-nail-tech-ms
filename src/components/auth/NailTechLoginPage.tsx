import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { LiquidGlassSurface } from '../ui/LiquidGlassSurface';

export const NailTechLoginPage: React.FC = () => {
  const { login, setCurrentView, settings } = useNailStudio();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (!success) {
        setErrorMessage('Invalid credentials. Please verify your studio email and password.');
      }
    }, 350);
  };

  const handleFillDemoCredentials = () => {
    setEmail('versalylabs@gmail.com');
    setPassword('labversaly-16');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#141211] text-[#EFE9E1] flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8C6D46]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      {/* Top Navbar */}
      <header className="px-6 py-4 flex items-center justify-between z-10 border-b border-[#2A2624]/60">
        <button
          type="button"
          onClick={() => setCurrentView('website')}
          className="flex items-center gap-2 text-xs font-medium text-[#C5A880] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to {settings.businessName} Website</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-[#A8A096]">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Encrypted Studio Gateway</span>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 my-8">
        <LiquidGlassSurface 
          tint="dark" 
          blur={22} 
          backgroundOpacity={0.65} 
          distortionScale={12} 
          className="w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-left relative border border-[#3E3834]/80"
        >
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C5A880] to-[#8C6D46] text-[#191716] flex items-center justify-center mx-auto shadow-lg font-editorial font-bold text-2xl">
              V
            </div>

            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
              Private Management Portal
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
              {settings.businessName} OS
            </h1>
            <p className="text-xs text-[#A8A096] font-light max-w-xs mx-auto">
              Please enter your authorized technician credentials to access appointments, client ledger, and finances.
            </p>
          </div>

          {/* Quick autofill helper */}
          <div className="bg-[#2A2624] border border-[#3E3834] rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <KeyRound className="w-4 h-4 shrink-0" />
              <div className="text-[11px] text-[#D5CFC7]">
                <span className="text-white font-medium block">Authorized Studio Account</span>
                versalylabs@gmail.com
              </div>
            </div>
            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="bg-[#C5A880] hover:bg-[#D5B990] text-[#191716] px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs"
            >
              Fill In
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-950/60 border border-red-800 text-red-200 p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#D5CFC7] block mb-1.5">
                Technician Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8F877E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="versalylabs@gmail.com"
                  className="w-full bg-[#141211] border border-[#3E3834] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-[#D5CFC7]">
                  Password
                </label>
                <span className="text-[10px] text-[#8F877E]">Key: labversaly-16</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8F877E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter studio password"
                  className="w-full bg-[#141211] border border-[#3E3834] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8F877E] hover:text-[#C5A880] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C5A880] hover:bg-[#D5B990] text-[#191716] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 mt-6 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Nail Tech Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security details */}
          <div className="pt-2 border-t border-[#2E2A27] flex items-center justify-center gap-2 text-[11px] text-[#8F877E]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>256-bit Encrypted Session · Westlands Studio</span>
          </div>

        </LiquidGlassSurface>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#7A726A] border-t border-[#2A2624]/60 z-10">
        &copy; {new Date().getFullYear()} {settings.businessName} · Haute Nail Artistry Business System
      </footer>

    </div>
  );
};
