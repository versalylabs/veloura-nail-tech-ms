import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { 
  Globe, 
  LayoutDashboard, 
  RotateCcw, 
  Bell, 
  CheckCircle2,
  Menu,
  X,
  Lock,
  LogOut,
  Sparkles,
  Phone,
  MapPin
} from 'lucide-react';
import { LiquidGlassSurface } from '../ui/LiquidGlassSurface';

export const StudioNavBar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    settings,
    resetToDefaults,
    appointments,
    startBookingFlow,
    notification,
    isAuthenticated,
    logout
  } = useNailStudio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count today's pending/confirmed appointments
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysAppointmentsCount = appointments.filter(
    (a) => a.date === todayStr && a.status !== 'cancelled'
  ).length;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentView !== 'website') {
      setCurrentView('website');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePortalClick = () => {
    setMobileMenuOpen(false);
    if (!isAuthenticated) {
      setCurrentView('login');
    } else {
      setCurrentView('management');
    }
  };

  return (
    <>
      {/* System Mode Switcher Header Bar */}
      <aside aria-label="System Mode Switcher" className="bg-[#191716] text-[#EFE9E1] px-3 sm:px-4 py-2 text-xs border-b border-[#2E2A27] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="flex items-center gap-1.5 font-medium text-[#C5A880] shrink-0 text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden xs:inline">LIVE ATELIER SYSTEM</span>
              <span className="xs:hidden">LIVE</span>
            </span>
            <span className="text-[#6E6761] hidden sm:inline">|</span>
            <span className="hidden md:inline text-[#A8A096] truncate">
              {settings.businessName} · Nairobi, KE
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap">
            {/* View Mode Switcher Toggle with Liquid Glass - Strictly Side by Side */}
            <LiquidGlassSurface 
              tint="dark" 
              blur={12} 
              backgroundOpacity={0.65} 
              className="p-0.5 rounded-lg border border-[#3E3834] shrink-0"
              contentClassName="flex flex-row items-center flex-nowrap whitespace-nowrap"
            >
              <button
                type="button"
                onClick={() => setCurrentView('website')}
                className={`flex flex-row items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
                  currentView === 'website'
                    ? 'bg-[#C5A880] text-[#191716] shadow-sm font-semibold'
                    : 'text-[#D5CFC7] hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Public Website</span>
                <span className="sm:hidden">Web</span>
              </button>

              <button
                type="button"
                onClick={handlePortalClick}
                className={`flex flex-row items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
                  currentView === 'management' || currentView === 'login'
                    ? 'bg-[#C5A880] text-[#191716] shadow-sm font-semibold'
                    : 'text-[#D5CFC7] hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Nail Tech Portal</span>
                <span className="sm:hidden">Portal</span>
                {!isAuthenticated && <Lock className="w-3 h-3 text-[#A8A096] shrink-0 ml-0.5" />}
                {isAuthenticated && todaysAppointmentsCount > 0 && (
                  <span className="ml-1 bg-[#191716] text-[#C5A880] px-1.5 py-0.2 rounded-full text-[10px] font-bold shrink-0">
                    {todaysAppointmentsCount}
                  </span>
                )}
              </button>
            </LiquidGlassSurface>

            {/* If Authenticated: Quick Logout Button */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={logout}
                className="p-1.5 text-stone-400 hover:text-rose-400 transition-colors"
                title="Lock / Sign Out of Nail Tech Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Quick Demo Reset */}
            <button
              type="button"
              onClick={resetToDefaults}
              className="p-1.5 text-[#8F877E] hover:text-[#C5A880] transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Floating System Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-[#1F1D1B] text-white p-4 rounded-xl shadow-2xl border border-[#3E3834] transition-all transform animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#C5A880]/20 rounded-lg text-[#C5A880] mt-0.5">
              {notification.type === 'bell' ? (
                <Bell className="w-4 h-4 animate-bounce" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-semibold text-[#F5F2EB]">{notification.message}</h4>
              {notification.submessage && (
                <p className="text-xs text-[#B8B0A5] mt-1 leading-relaxed">{notification.submessage}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Public Site Navigation Header (Visible when in website mode) */}
      {currentView === 'website' && (
        <header className="bg-[#FAF8F5]/90 backdrop-blur-md sticky top-[37px] z-40 border-b border-[#E8E2D9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            {/* Brand Logo */}
            <a 
              href="#hero" 
              onClick={(e) => scrollToSection(e, 'hero')}
              className="group text-left"
            >
              <span className="block font-editorial text-2xl sm:text-3xl tracking-tight text-[#1F1D1B] group-hover:text-[#8C6D46] transition-colors">
                Veloura Nails
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8C6D46] -mt-1 font-semibold">
                Haute Atelier · Nairobi
              </span>
            </a>

            {/* Desktop Editorial Nav Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#4A443E]">
              <a href="#designs" onClick={(e) => scrollToSection(e, 'designs')} className="hover:text-[#1F1D1B] transition-colors">Nail Designs</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-[#1F1D1B] transition-colors">Services & Pricing</a>
              <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="hover:text-[#1F1D1B] transition-colors">Portfolio</a>
              <a href="#artist" onClick={(e) => scrollToSection(e, 'artist')} className="hover:text-[#1F1D1B] transition-colors">About Michelle</a>
              <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="hover:text-[#1F1D1B] transition-colors">Reviews</a>
              <a href="#location" onClick={(e) => scrollToSection(e, 'location')} className="hover:text-[#1F1D1B] transition-colors">Studio & Contact</a>
            </nav>

            {/* Primary Action Button & Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => startBookingFlow()}
                className="bg-[#1F1D1B] text-[#FAF8F5] hover:bg-[#342F2C] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="hidden sm:inline">Book an Appointment</span>
                <span className="sm:hidden">Book Now</span>
              </button>

              {/* Hamburger Button for mobile/tablet */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#1F1D1B] hover:bg-stone-200 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-xl text-left">
              <nav className="flex flex-col space-y-3 text-sm font-medium text-[#4A443E] tracking-wider uppercase">
                <a 
                  href="#designs" 
                  onClick={(e) => scrollToSection(e, 'designs')} 
                  className="py-1.5 hover:text-[#8C6D46] border-b border-[#E8E2D9]/60 flex items-center justify-between"
                >
                  <span>Nail Designs</span>
                  <span className="text-xs text-[#8C6D46]">&rarr;</span>
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => scrollToSection(e, 'services')} 
                  className="py-1.5 hover:text-[#8C6D46] border-b border-[#E8E2D9]/60 flex items-center justify-between"
                >
                  <span>Services & Pricing</span>
                  <span className="text-xs text-[#8C6D46]">&rarr;</span>
                </a>
                <a 
                  href="#portfolio" 
                  onClick={(e) => scrollToSection(e, 'portfolio')} 
                  className="py-1.5 hover:text-[#8C6D46] border-b border-[#E8E2D9]/60 flex items-center justify-between"
                >
                  <span>Portfolio & Transformations</span>
                  <span className="text-xs text-[#8C6D46]">&rarr;</span>
                </a>
                <a 
                  href="#artist" 
                  onClick={(e) => scrollToSection(e, 'artist')} 
                  className="py-1.5 hover:text-[#8C6D46] border-b border-[#E8E2D9]/60 flex items-center justify-between"
                >
                  <span>About Michelle & Philosophy</span>
                  <span className="text-xs text-[#8C6D46]">&rarr;</span>
                </a>
                <a 
                  href="#reviews" 
                  onClick={(e) => scrollToSection(e, 'reviews')} 
                  className="py-1.5 hover:text-[#8C6D46] border-b border-[#E8E2D9]/60 flex items-center justify-between"
                >
                  <span>Client Acclaim & Reviews</span>
                  <span className="text-xs text-[#8C6D46]">&rarr;</span>
                </a>
                <a 
                  href="#location" 
                  onClick={(e) => scrollToSection(e, 'location')} 
                  className="py-1.5 hover:text-[#8C6D46] border-b border-[#E8E2D9]/60 flex items-center justify-between"
                >
                  <span>Studio Location & Hours</span>
                  <span className="text-xs text-[#8C6D46]">&rarr;</span>
                </a>
              </nav>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('lookbook');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full bg-white hover:bg-stone-50 border border-[#E8E2D9] text-[#1F1D1B] py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>Explore Archival Lookbook</span>
                </button>

                <button
                  type="button"
                  onClick={handlePortalClick}
                  className="w-full bg-[#191716] text-[#C5A880] hover:text-white py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{isAuthenticated ? 'Open Nail Tech Portal' : 'Nail Tech Portal Login'}</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-[#7A726A] flex items-center gap-3">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#8C6D46]" /> Westlands, Nairobi</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#8C6D46]" /> {settings.phone}</span>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
};
