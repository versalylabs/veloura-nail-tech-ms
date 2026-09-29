import React from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Clock, Check, ArrowRight, Sparkles } from 'lucide-react';

export const ServicesPricingSection: React.FC = () => {
  const { services, startBookingFlow } = useNailStudio();

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAF8F5] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8C6D46] font-semibold mb-2">
            <span className="w-6 h-[1px] bg-[#8C6D46]"></span>
            <span>Atelier Menu & Investment</span>
            <span className="w-6 h-[1px] bg-[#8C6D46]"></span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#1F1D1B] font-normal tracking-tight">
            Services & Transparent Pricing
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E6761] font-light">
            All appointments include rigorous medical-grade sanitary protocol, thorough e-file cuticle detailing, and long-wear protective bonding.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                service.isPopular
                  ? 'bg-white shadow-xl border-2 border-[#8C6D46]/40 relative ring-1 ring-[#8C6D46]/20'
                  : 'bg-white/70 hover:bg-white shadow-sm hover:shadow-md border border-[#E8E2D9]'
              }`}
            >
              {service.isPopular && (
                <div className="absolute -top-3 left-6 bg-[#8C6D46] text-[#FAF8F5] text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full shadow-sm">
                  Client Favorite
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold">
                    {service.category}
                  </span>
                  <span className="text-xs text-[#7A726A] flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#8C6D46]" />
                    {service.durationMinutes} mins
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-normal text-[#1F1D1B] mt-2 text-left">
                  {service.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-xs uppercase tracking-wider text-[#7A726A]">From</span>
                  <span className="text-3xl font-semibold text-[#1F1D1B]">
                    KES {service.startingPriceKES.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5E564F] mt-3 font-light leading-relaxed text-left">
                  {service.description}
                </p>

                {/* What is Included Checklist */}
                <div className="mt-6 pt-5 border-t border-[#F0EBE3] space-y-2 text-left">
                  <span className="text-[11px] uppercase tracking-wider text-[#8C6D46] font-semibold block mb-2">
                    Session Inclusions:
                  </span>
                  {service.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#4A443E]">
                      <Check className="w-3.5 h-3.5 text-[#8C6D46] mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => startBookingFlow()}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                    service.isPopular
                      ? 'bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] shadow-md hover:shadow-lg'
                      : 'bg-[#FAF8F5] hover:bg-[#1F1D1B] text-[#1F1D1B] hover:text-[#FAF8F5] border border-[#DDD7CD]'
                  }`}
                >
                  <span>Select & Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Deposit Policy Notice Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-[#E8E2D9] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <h4 className="font-editorial text-lg text-[#1F1D1B] font-medium">30% Appointment Deposit Policy</h4>
            <p className="text-xs text-[#6E6761] mt-0.5 font-light">
              Deposits are processed securely via M-Pesa or Card and credited in full toward your final balance upon service completion.
            </p>
          </div>
          <button
            type="button"
            onClick={() => startBookingFlow()}
            className="shrink-0 text-xs font-semibold text-[#8C6D46] hover:text-[#1F1D1B] uppercase tracking-wider underline underline-offset-4"
          >
            Review Available Slots &rarr;
          </button>
        </div>

      </div>
    </section>
  );
};
