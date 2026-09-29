import React from 'react';
import { ShieldCheck, Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutArtistSection: React.FC = () => {
  return (
    <section id="artist" className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Artist Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#EFECE6]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Michelle Mwangi - Master Nail Artist & Founder"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Founder Signature Badge */}
              <div className="absolute -bottom-6 -right-4 bg-white p-5 rounded-2xl shadow-xl border border-[#E8E2D9] max-w-xs text-left">
                <span className="text-[10px] tracking-widest uppercase text-[#8C6D46] font-semibold block">Founder & Master Artist</span>
                <h4 className="font-editorial text-xl text-[#1F1D1B] font-medium leading-tight mt-0.5">Michelle Mwangi</h4>
                <p className="text-xs text-[#7A726A] mt-1 font-light">Certified International Master Nail Stylist & Russian Manicure Specialist</p>
              </div>
            </div>
          </div>

          {/* Philosophy & Credentials (Right Column) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8C6D46] font-semibold">
              <span className="w-8 h-[1px] bg-[#8C6D46]"></span>
              <span>The Artist & Atelier Philosophy</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl text-[#1F1D1B] font-normal tracking-tight leading-tight">
              Where anatomical precision meets editorial high-fashion.
            </h2>

            <p className="text-sm sm:text-base text-[#5E564F] font-light leading-relaxed">
              With over 7 years of specialized studio experience across Nairobi and London, Michelle founded Veloura Nails with a single non-negotiable principle: <strong className="font-semibold text-[#1F1D1B]">nail art should elevate your personal signature without compromising the biological health of your natural nail plate.</strong>
            </p>

            <p className="text-sm text-[#5E564F] font-light leading-relaxed">
              Every appointment is treated as an intimate one-on-one session. We reject rushed assembly-line nail salons in favor of dedicated Russian dry cuticle care, apex-balanced structural architecture, and micro-hand-painted artistry using hypoallergenic Japanese and European gels.
            </p>

            {/* Atelier Standards Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E8E2D9]">
                <ShieldCheck className="w-5 h-5 text-[#8C6D46] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1D1B]">Hospital-Grade Autoclave</h4>
                  <p className="text-[11px] text-[#7A726A] mt-0.5 font-light">100% sealed sterile instrument pouches opened directly before you.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#E8E2D9]">
                <Award className="w-5 h-5 text-[#8C6D46] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1D1B]">Anatomical Apex Sculpting</h4>
                  <p className="text-[11px] text-[#7A726A] mt-0.5 font-light">Custom stress-point balancing ensures 4+ weeks retention with zero breakage.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#8C6D46] font-medium">
              <span>✦ Westlands Atelier Studio</span>
              <span>✦ By Appointment Only</span>
              <span>✦ Complimented with Espresso & Herbal Tea</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
