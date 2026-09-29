import React from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react';
import { LiquidGlassSurface } from '../ui/LiquidGlassSurface';

export const HeroSection: React.FC = () => {
  const { startBookingFlow, settings } = useNailStudio();

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Subtle warm champagne gradient backdrops */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#EAD8C7]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-[#DFD3C3]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8C6D46] font-semibold">
              <span className="w-8 h-[1px] bg-[#8C6D46]"></span>
              <span>Westlands · Nairobi · Haute Atelier</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1F1D1B] leading-[1.1]">
              Your nails. <br />
              <span className="italic font-light text-[#8C6D46]">Your style.</span> <br />
              Your statement.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#5E564F] max-w-xl font-light leading-relaxed">
              Precision Russian dry manicures, luxury Apres Gel-X sculpting, and bespoke editorial hand-painted nail art curated by Master Artist Michelle Mwangi.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-3">
              <button
                type="button"
                onClick={() => startBookingFlow()}
                className="bg-[#1F1D1B] text-[#FAF8F5] hover:bg-[#342F2C] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#designs"
                className="border border-[#1F1D1B]/20 hover:border-[#1F1D1B] bg-transparent text-[#1F1D1B] px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-medium tracking-wider uppercase transition-all text-center"
              >
                Explore Design Catalog
              </a>
            </div>

            {/* Studio Key Attributes with Liquid Glass */}
            <LiquidGlassSurface 
              tint="champagne" 
              blur={14} 
              backgroundOpacity={0.45}
              className="mt-6 p-4 rounded-2xl max-w-lg"
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <div className="font-editorial text-xl sm:text-2xl font-normal text-[#1F1D1B]">4.98 ★</div>
                  <div className="text-[10px] sm:text-xs text-[#7A726A] mt-0.5">Over 1,200+ Sets</div>
                </div>
                <div>
                  <div className="font-editorial text-xl sm:text-2xl font-normal text-[#1F1D1B]">100%</div>
                  <div className="text-[10px] sm:text-xs text-[#7A726A] mt-0.5">Medical Autoclave</div>
                </div>
                <div>
                  <div className="font-editorial text-xl sm:text-2xl font-normal text-[#1F1D1B]">4+ Wks</div>
                  <div className="text-[10px] sm:text-xs text-[#7A726A] mt-0.5">Zero-Lift Guarantee</div>
                </div>
              </div>
            </LiquidGlassSurface>

          </div>

          {/* Right Column: High-End Photography Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Signature Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#E8E1D9]">
                <img
                  src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85"
                  alt="Haute Chrome French Almond Gel Manicure at Veloura Nails"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Liquid Glass Signature Card */}
                <LiquidGlassSurface
                  tint="champagne"
                  blur={18}
                  backgroundOpacity={0.7}
                  distortionScale={12}
                  className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 p-3.5 sm:p-4 rounded-xl text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#8C6D46] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#C5A880]" />
                        <span>Signature Set</span>
                      </div>
                      <h4 className="font-editorial text-base sm:text-lg text-[#1F1D1B] font-medium leading-tight">Mirrored Chrome French</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-bold text-[#1F1D1B]">KES 2,500</div>
                      <div className="text-[10px] text-[#7A726A]">~1h 45m</div>
                    </div>
                  </div>
                </LiquidGlassSurface>
              </div>

              {/* Secondary Floating Accent Photo */}
              <div className="hidden sm:block absolute -top-6 -left-8 w-36 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=400&q=80"
                  alt="Blush Pink Aura Nails"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
