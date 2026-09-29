import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Settings, Save, Download, ShieldCheck, MapPin, Phone, Mail, Clock, CreditCard, RotateCcw } from 'lucide-react';

export const StudioSettingsModule: React.FC = () => {
  const { settings, updateSettings, exportDataToCSV, resetToDefaults } = useNailStudio();

  const [businessName, setBusinessName] = useState(settings.businessName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [leadArtist, setLeadArtist] = useState(settings.leadArtist);
  const [depositPercentage, setDepositPercentage] = useState(settings.depositPercentage);
  const [cancellationHours, setCancellationHours] = useState(settings.cancellationHours || 24);
  const [gracePeriodMinutes, setGracePeriodMinutes] = useState(settings.gracePeriodMinutes || 15);
  const [mpesaTillNumber, setMpesaTillNumber] = useState(settings.mpesaTillNumber || '589214');
  const [address, setAddress] = useState(settings.address);
  const [city, setCity] = useState(settings.city);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [openTime, setOpenTime] = useState(settings.openTime);
  const [closeTime, setCloseTime] = useState(settings.closeTime);
  const [aftercareAdvice, setAftercareAdvice] = useState(settings.aftercareAdvice || '');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      businessName,
      tagline,
      leadArtist,
      depositPercentage: Number(depositPercentage),
      cancellationHours: Number(cancellationHours),
      gracePeriodMinutes: Number(gracePeriodMinutes),
      mpesaTillNumber,
      address,
      city,
      phone,
      email,
      instagram,
      openTime,
      closeTime,
      aftercareAdvice,
    });
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Atelier Governance & Compliance
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Studio Policies & Business Settings
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Configure deposit rules, M-Pesa till credentials, operating hours, client aftercare, and accounting data exports.
          </p>
        </div>

        {/* Data Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => exportDataToCSV('appointments')}
            className="bg-white hover:bg-stone-50 border border-[#E8E2D9] text-[#1F1D1B] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>Export Bookings CSV</span>
          </button>

          <button
            type="button"
            onClick={() => exportDataToCSV('clients')}
            className="bg-white hover:bg-stone-50 border border-[#E8E2D9] text-[#1F1D1B] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>Export Clients CSV</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Section 1: Deposit & Cancellation Policies */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE3]">
            <CreditCard className="w-4 h-4 text-[#8C6D46]" />
            <h3 className="font-editorial text-xl font-normal text-[#1F1D1B]">
              Deposit & Booking Rules (KES)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                Required Online Deposit %
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={depositPercentage}
                  onChange={(e) => setDepositPercentage(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                />
                <span className="text-xs font-bold text-[#8C6D46]">%</span>
              </div>
              <span className="text-[10px] text-[#7A726A] mt-1 block">Standard luxury salon rate is 30%</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                Cancellation Window (Hours)
              </label>
              <input
                type="number"
                min={0}
                value={cancellationHours}
                onChange={(e) => setCancellationHours(Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
              <span className="text-[10px] text-[#7A726A] mt-1 block">Cutoff for penalty-free reschedule</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                Late Arrival Grace Period
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={5}
                  max={45}
                  value={gracePeriodMinutes}
                  onChange={(e) => setGracePeriodMinutes(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                />
                <span className="text-xs font-medium text-[#7A726A]">Mins</span>
              </div>
              <span className="text-[10px] text-[#7A726A] mt-1 block">Before slot is offered to standby</span>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                Safaricom M-Pesa Buy Goods / Till Number
              </label>
              <input
                type="text"
                value={mpesaTillNumber}
                onChange={(e) => setMpesaTillNumber(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
              <span className="text-[10px] text-emerald-800 font-medium mt-1 block">Used on client deposit receipts</span>
            </div>
          </div>
        </div>

        {/* Section 2: Studio Information & Contacts */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE3]">
            <MapPin className="w-4 h-4 text-[#8C6D46]" />
            <h3 className="font-editorial text-xl font-normal text-[#1F1D1B]">
              Studio Information & Location
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Lead Artist / Founder</label>
              <input
                type="text"
                value={leadArtist}
                onChange={(e) => setLeadArtist(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Studio Phone (WhatsApp)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">City / Country</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Operating Start Time</label>
              <input
                type="text"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Operating End Time</label>
              <input
                type="text"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Instagram Handle</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Aftercare Instructions */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0EBE3]">
            <ShieldCheck className="w-4 h-4 text-[#8C6D46]" />
            <h3 className="font-editorial text-xl font-normal text-[#1F1D1B]">
              Client Aftercare Guidance (Sent via WhatsApp / Email)
            </h3>
          </div>

          <div>
            <textarea
              rows={3}
              value={aftercareAdvice}
              onChange={(e) => setAftercareAdvice(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B]"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={resetToDefaults}
            className="text-xs text-stone-500 hover:text-[#8C6D46] underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset all studio demo data
          </button>

          <button
            type="submit"
            className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-7 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4 text-[#C5A880]" />
            <span>Save Studio Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
