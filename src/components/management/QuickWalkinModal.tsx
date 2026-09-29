import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { NailShape, NailLength } from '../../types/nailStudio';
import { X, UserPlus, Sparkles, Check, Clock } from 'lucide-react';

export const QuickWalkinModal: React.FC = () => {
  const { 
    quickWalkinModalOpen, 
    setQuickWalkinModalOpen, 
    services, 
    technicians, 
    createBooking 
  } = useNailStudio();

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+254 ');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [shape, setShape] = useState<NailShape>('Almond');
  const [length, setLength] = useState<NailLength>('Medium');
  const [techId, setTechId] = useState(technicians[0]?.id || 'tech_michelle');
  const [priceKES, setPriceKES] = useState(2500);
  const [paymentOption, setPaymentOption] = useState<'fully_paid' | 'deposit_only'>('fully_paid');
  const [notes, setNotes] = useState('In-studio walk-in client');

  if (!quickWalkinModalOpen) return null;

  const handleSaveWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const srv = services.find((s) => s.id === selectedServiceId) || services[0];
    const tech = technicians.find((t) => t.id === techId) || technicians[0];
    const todayStr = new Date().toISOString().split('T')[0];
    const currentHour = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const depositPaid = paymentOption === 'fully_paid' ? priceKES : Math.round(priceKES * 0.3);

    createBooking({
      clientName,
      clientPhone,
      clientEmail: `${clientName.toLowerCase().replace(/\s+/g, '')}@walkin.ke`,
      serviceId: srv.id,
      serviceName: srv.name,
      shape,
      length,
      date: todayStr,
      timeSlot: currentHour,
      technicianId: tech.id,
      technicianName: tech.name,
      totalPriceKES: Number(priceKES),
      depositPaidKES: depositPaid,
      status: 'confirmed',
      paymentStatus: paymentOption === 'fully_paid' ? 'fully_paid' : 'deposit_paid',
      specialNotes: notes,
    });

    setQuickWalkinModalOpen(false);
    setClientName('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6 text-left">
        
        <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg text-[#8C6D46]">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal leading-none">
                Quick Walk-in Booking
              </h3>
              <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold">
                Fast In-Studio Entry (Today's Schedule)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setQuickWalkinModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#1F1D1B]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveWalkin} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Client Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Halima Abdalla"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Service</label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} (KES {s.startingPriceKES})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Assigned Artist</label>
              <select
                value={techId}
                onChange={(e) => setTechId(e.target.value)}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              >
                {technicians.filter(t => t.active).map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Shape</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as any)}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              >
                <option value="Almond">Almond</option>
                <option value="Coffin">Coffin</option>
                <option value="Square">Square</option>
                <option value="Squoval">Squoval</option>
                <option value="Stiletto">Stiletto</option>
                <option value="Oval">Oval</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value as any)}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              >
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
                <option value="Extra Long">Extra Long</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Agreed Price (KES)</label>
              <input
                type="number"
                value={priceKES}
                onChange={(e) => setPriceKES(Number(e.target.value))}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Payment Status</label>
              <select
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value as any)}
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
              >
                <option value="fully_paid">Settled in Full (KES {priceKES})</option>
                <option value="deposit_only">30% Deposit Paid (KES {Math.round(priceKES * 0.3)})</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Notes / Style requests</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
            />
          </div>

          <div className="pt-3 border-t border-[#E8E2D9] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setQuickWalkinModalOpen(false)}
              className="px-4 py-2 text-xs text-stone-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
            >
              Add to Today's Queue
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
