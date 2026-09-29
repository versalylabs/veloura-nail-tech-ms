import React from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { MapPin, Phone, Mail, Instagram, Clock, Heart } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { settings, startBookingFlow, setCurrentView } = useNailStudio();

  return (
    <footer id="location" className="bg-[#191716] text-[#EFE9E1] pt-16 pb-12 border-t border-[#2A2624] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#2E2A27]">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="font-editorial text-3xl font-normal text-[#FAF8F5]">
              {settings.businessName}
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A096] max-w-sm font-light leading-relaxed">
              Nairobi's premier atelier for Russian e-file care, sculpted Apres Gel-X, and haute chrome artistry. Private appointment-only sanctuary in Westlands.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => startBookingFlow()}
                className="bg-[#C5A880] hover:bg-[#D4BC98] text-[#191716] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Book Appointment
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('management')}
                className="text-xs text-[#A8A096] hover:text-[#C5A880] underline underline-offset-4"
              >
                Technician Sign In &rarr;
              </button>
            </div>
          </div>

          {/* Studio Hours */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Atelier Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#D5CFC7] font-light">
              <div className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-white font-medium">{settings.openTime} – {settings.closeTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white font-medium">09:00 – 18:00</span>
              </div>
              <div className="flex justify-between text-[#8F877E]">
                <span>Sunday</span>
                <span>By Special Request</span>
              </div>
            </div>
            <p className="text-[11px] text-[#8F877E] pt-2">
              Strictly appointment-only to preserve client confidentiality and focus.
            </p>
          </div>

          {/* Studio Location & Contacts */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Studio Location
            </h4>
            <div className="space-y-2 text-xs text-[#D5CFC7] font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] mt-0.5 shrink-0" />
                <span>{settings.address}, {settings.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{settings.phone} (Call / WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{settings.instagram}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F877E]">
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted for high-end beauty businesses</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#C5A880]">M-Pesa Integrated Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
