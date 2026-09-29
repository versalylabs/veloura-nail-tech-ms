import React, { useState, useEffect } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { 
  NailDesign, 
  ServiceItem, 
  NailShape, 
  NailLength, 
  Appointment 
} from '../../types/nailStudio';
import { 
  X, 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { LiquidGlassSurface } from '../ui/LiquidGlassSurface';

const SHAPES: { name: NailShape; desc: string }[] = [
  { name: 'Almond', desc: 'Slimming, softly tapered curve' },
  { name: 'Coffin', desc: 'Edgy tapered flat-top statement' },
  { name: 'Square', desc: 'Classic crisp 90° parallel edges' },
  { name: 'Squoval', desc: 'Natural square with softened corners' },
  { name: 'Stiletto', desc: 'Dramatic sharp pointed apex' },
  { name: 'Oval', desc: 'Classic timeless natural contour' },
];

const LENGTHS: { name: NailLength; desc: string }[] = [
  { name: 'Short', desc: 'At or just past fingertip, ultra functional' },
  { name: 'Medium', desc: 'Everyday elegance, optimal balance' },
  { name: 'Long', desc: 'Statement glamour, elongated proportions' },
  { name: 'Extra Long', desc: 'High-fashion editorial dramatic silhouette' },
];

const TIME_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '01:00 PM',
  '02:45 PM',
  '04:30 PM',
  '06:15 PM',
];

export const OnlineBookingModal: React.FC = () => {
  const {
    bookingModalOpen,
    setBookingModalOpen,
    preselectedDesign,
    services,
    designs,
    technicians,
    createBooking,
    setCurrentView,
    setDashboardTab,
    setReceiptModalAppointment,
  } = useNailStudio();

  // Multi-step progress (1: Service, 2: Design, 3: Shape & Length, 4: Date & Time, 5: Client Details, 6: Deposit & Confirm, 7: Success)
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<NailDesign | null>(null);
  const [selectedShape, setSelectedShape] = useState<NailShape>('Almond');
  const [selectedLength, setSelectedLength] = useState<NailLength>('Medium');
  
  // Date & Time
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [selectedTechId, setSelectedTechId] = useState<string>(technicians[0]?.id || 'tech_michelle');

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+254 ');
  const [clientEmail, setClientEmail] = useState('');
  const [clientInstagram, setClientInstagram] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Payment simulated state
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // When modal opens or preselected design changes, set up initial defaults
  useEffect(() => {
    if (bookingModalOpen) {
      if (preselectedDesign) {
        setSelectedDesign(preselectedDesign);
        // Find matching service or default to extensions/manicure
        const matchingSrv = services.find(s => s.name.toLowerCase().includes(preselectedDesign.category.toLowerCase())) || services[0];
        setSelectedService(matchingSrv);
        if (preselectedDesign.shapeRecommendation) setSelectedShape(preselectedDesign.shapeRecommendation);
        if (preselectedDesign.lengthRecommendation) setSelectedLength(preselectedDesign.lengthRecommendation);
        // If preselected design, jump to step 3 (shape & length)
        setStep(3);
      } else {
        setSelectedService(services[0] || null);
        setSelectedDesign(null);
        setStep(1);
      }
    }
  }, [bookingModalOpen, preselectedDesign, services]);

  if (!bookingModalOpen) return null;

  // Pricing calculations
  const baseServicePrice = selectedService?.startingPriceKES || 2000;
  const designPrice = selectedDesign?.priceKES || 0;
  const totalPriceKES = designPrice > 0 ? designPrice : baseServicePrice;
  const depositPaidKES = Math.round(totalPriceKES * 0.3); // 30% deposit
  const remainingBalanceKES = totalPriceKES - depositPaidKES;

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmAndPayDeposit = () => {
    if (!clientName || !clientPhone) {
      alert('Please fill in your name and phone number for booking confirmation.');
      return;
    }

    setIsProcessingPayment(true);

    setTimeout(() => {
      const activeTech = technicians.find(t => t.id === selectedTechId) || technicians[0];
      
      const newApt = createBooking({
        clientName,
        clientPhone,
        clientEmail: clientEmail || `${clientName.toLowerCase().replace(/\s+/g, '')}@atelier-client.com`,
        clientInstagram,
        serviceId: selectedService?.id || 'srv_custom',
        serviceName: selectedService?.name || 'Atelier Signature Session',
        designId: selectedDesign?.id,
        designName: selectedDesign?.title,
        designPhoto: selectedDesign?.photos[0],
        shape: selectedShape,
        length: selectedLength,
        date: selectedDate,
        timeSlot: selectedTime,
        technicianId: activeTech.id,
        technicianName: activeTech.name,
        totalPriceKES,
        depositPaidKES,
        status: 'confirmed',
        paymentStatus: 'deposit_paid',
        specialNotes,
      });

      setIsProcessingPayment(false);
      setConfirmedAppointment(newApt);
      setStep(7); // Success Step!
    }, 1200);
  };

  const handleClose = () => {
    setBookingModalOpen(false);
    setConfirmedAppointment(null);
    setStep(1);
  };

  const handleJumpToNailTechDashboard = () => {
    handleClose();
    setCurrentView('management');
    setDashboardTab('overview');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
        
        {/* Modal Top Header */}
        <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C6D46] font-semibold">
              Veloura Nails Booking Concierge
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl text-[#1F1D1B] font-normal">
              {step === 7 ? 'Appointment Reserved ✨' : 'Reserve Your Nail Session'}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-[#FAF8F5] hover:bg-stone-200 text-[#1F1D1B] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators (Zero-Pill discipline compliant) */}
        {step < 7 && (
          <div className="bg-[#F4EFEA] px-6 py-3 border-b border-[#E8E2D9] flex items-center justify-between text-xs text-[#7A726A] overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className={`font-semibold ${step >= 1 ? 'text-[#8C6D46]' : 'text-stone-400'}`}>1. Service</span>
              <span className="text-stone-300">/</span>
              <span className={`font-semibold ${step >= 2 ? 'text-[#8C6D46]' : 'text-stone-400'}`}>2. Design</span>
              <span className="text-stone-300">/</span>
              <span className={`font-semibold ${step >= 3 ? 'text-[#8C6D46]' : 'text-stone-400'}`}>3. Shape & Length</span>
              <span className="text-stone-300">/</span>
              <span className={`font-semibold ${step >= 4 ? 'text-[#8C6D46]' : 'text-stone-400'}`}>4. Date & Time</span>
              <span className="text-stone-300">/</span>
              <span className={`font-semibold ${step >= 5 ? 'text-[#8C6D46]' : 'text-stone-400'}`}>5. Client Details</span>
              <span className="text-stone-300">/</span>
              <span className={`font-semibold ${step >= 6 ? 'text-[#8C6D46]' : 'text-stone-400'}`}>6. Deposit</span>
            </div>
            <div className="text-[11px] text-[#8C6D46] font-medium hidden sm:block">
              Step {step} of 6
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 max-h-[75vh] overflow-y-auto text-left">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-wider text-[#8C6D46] font-semibold">
                Step 1: Choose Your Core Service
              </h4>
              <p className="text-xs text-[#6E6761] font-light">
                Select your foundational application. You can pair this with any nail art design in the next step.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {services.map((srv) => {
                  const isSelected = selectedService?.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#1F1D1B] bg-white shadow-sm ring-1 ring-[#1F1D1B]'
                          : 'border-[#E8E2D9] bg-white/70 hover:bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold">
                            {srv.category}
                          </span>
                          <h5 className="font-editorial text-lg text-[#1F1D1B] font-medium leading-tight mt-0.5">
                            {srv.name}
                          </h5>
                        </div>
                        <span className="text-xs font-bold text-[#1F1D1B]">
                          KES {srv.startingPriceKES.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6E6761] mt-2 line-clamp-2 font-light">
                        {srv.description}
                      </p>
                      <div className="mt-2 text-[10px] text-[#8A827A] flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-[#8C6D46]" />
                        <span>{srv.durationMinutes} mins</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Select Design from Catalog or Plain/Custom */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-[#8C6D46] font-semibold">
                    Step 2: Nail Art & Design Style
                  </h4>
                  <p className="text-xs text-[#6E6761] font-light">
                    Pick a signature design from Michelle's live digital catalog, or select solid color/consult in studio.
                  </p>
                </div>
                {selectedDesign && (
                  <button
                    type="button"
                    onClick={() => setSelectedDesign(null)}
                    className="text-xs text-[#8C6D46] hover:underline"
                  >
                    Clear Design
                  </button>
                )}
              </div>

              {/* Solid Color / In-Studio Consultation Option */}
              <div
                onClick={() => setSelectedDesign(null)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedDesign === null
                    ? 'border-[#1F1D1B] bg-white shadow-sm ring-1 ring-[#1F1D1B]'
                    : 'border-[#E8E2D9] bg-white/70 hover:bg-white'
                }`}
              >
                <div>
                  <h5 className="font-editorial text-base text-[#1F1D1B] font-medium">
                    Solid Color / Decide Style at Studio
                  </h5>
                  <p className="text-[11px] text-[#6E6761] font-light">
                    Included with your {selectedService?.name || 'service'}. Custom art upgrades can be added on the day.
                  </p>
                </div>
                <div className="text-xs font-semibold text-[#1F1D1B]">
                  No Design Surcharge
                </div>
              </div>

              {/* Design Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {designs.filter(d => d.isAvailableForBooking).map((dsg) => {
                  const isSelected = selectedDesign?.id === dsg.id;
                  return (
                    <div
                      key={dsg.id}
                      onClick={() => {
                        setSelectedDesign(dsg);
                        if (dsg.shapeRecommendation) setSelectedShape(dsg.shapeRecommendation);
                        if (dsg.lengthRecommendation) setSelectedLength(dsg.lengthRecommendation);
                      }}
                      className={`rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#1F1D1B] ring-2 ring-[#1F1D1B] bg-white shadow-md'
                          : 'border-[#E8E2D9] bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                        <img src={dsg.photos[0]} alt={dsg.title} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-[#1F1D1B] text-white p-1 rounded-full shadow">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="p-2.5">
                        <span className="text-[9px] uppercase tracking-wider text-[#8C6D46] font-semibold block truncate">
                          {dsg.category}
                        </span>
                        <h6 className="font-editorial text-sm font-medium text-[#1F1D1B] truncate">
                          {dsg.title}
                        </h6>
                        <span className="text-xs font-semibold text-[#1F1D1B] mt-0.5 block">
                          KES {dsg.priceKES.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Nail Shape & Length */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-[#8C6D46] font-semibold">
                  Step 3: Select Nail Shape & Length
                </h4>
                <p className="text-xs text-[#6E6761] font-light mt-0.5">
                  Michelle sculpts each nail to flatter your finger anatomy and daily lifestyle.
                </p>
              </div>

              {/* Shape Selector */}
              <div>
                <span className="text-xs font-semibold text-[#1F1D1B] block mb-2">
                  Preferred Nail Shape:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SHAPES.map((shape) => {
                    const isSelected = selectedShape === shape.name;
                    return (
                      <button
                        key={shape.name}
                        type="button"
                        onClick={() => setSelectedShape(shape.name)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#1F1D1B] bg-white shadow-sm ring-1 ring-[#1F1D1B]'
                            : 'border-[#E8E2D9] bg-white/70 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-editorial text-base font-medium text-[#1F1D1B]">
                            {shape.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#8C6D46]" />}
                        </div>
                        <span className="text-[10px] text-[#7A726A] font-light block mt-1">
                          {shape.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Length Selector */}
              <div>
                <span className="text-xs font-semibold text-[#1F1D1B] block mb-2">
                  Target Length:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {LENGTHS.map((len) => {
                    const isSelected = selectedLength === len.name;
                    return (
                      <button
                        key={len.name}
                        type="button"
                        onClick={() => setSelectedLength(len.name)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#1F1D1B] bg-white shadow-sm ring-1 ring-[#1F1D1B]'
                            : 'border-[#E8E2D9] bg-white/70 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-editorial text-sm font-semibold text-[#1F1D1B]">
                            {len.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#8C6D46]" />}
                        </div>
                        <span className="text-[10px] text-[#7A726A] font-light block mt-1">
                          {len.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Date, Time & Technician */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-[#8C6D46] font-semibold">
                  Step 4: Date, Time & Artist
                </h4>
                <p className="text-xs text-[#6E6761] font-light mt-0.5">
                  Choose your preferred artist and appointment slot at our Westlands atelier.
                </p>
              </div>

              {/* Technician Selection */}
              <div>
                <span className="text-xs font-semibold text-[#1F1D1B] block mb-2">
                  Nail Artist:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {technicians.filter(t => t.active).map((tech) => {
                    const isSelected = selectedTechId === tech.id;
                    return (
                      <div
                        key={tech.id}
                        onClick={() => setSelectedTechId(tech.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-[#1F1D1B] bg-white shadow-sm ring-1 ring-[#1F1D1B]'
                            : 'border-[#E8E2D9] bg-white/70 hover:bg-white'
                        }`}
                      >
                        <img src={tech.avatar} alt={tech.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h6 className="text-xs font-semibold text-[#1F1D1B]">{tech.name}</h6>
                          <span className="text-[10px] text-[#8C6D46]">{tech.role}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1.5">
                    Appointment Date:
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1.5">
                    Studio Location:
                  </label>
                  <div className="bg-white border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-xs text-[#5E564F]">
                    Mirage Tower 2, 4th Floor · Westlands
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <span className="text-xs font-semibold text-[#1F1D1B] block mb-2">
                  Available Atelier Slots ({selectedDate}):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {TIME_SLOTS.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg text-center transition-all ${
                          isSelected
                            ? 'bg-[#1F1D1B] text-[#FAF8F5] shadow font-semibold'
                            : 'bg-white border border-[#E8E2D9] text-[#5E564F] hover:border-stone-400'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Client Contact Details & History Sync */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-[#8C6D46] font-semibold">
                  Step 5: Client Details & Preferences
                </h4>
                <p className="text-xs text-[#6E6761] font-light mt-0.5">
                  Your information connects directly with Michelle's client history database to track sets, loyalty points, and care formulas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Kamau"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Phone / M-Pesa Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 722 000 000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="@sarah.k"
                    value={clientInstagram}
                    onChange={(e) => setClientInstagram(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                  Nail Health Notes, Allergies, or Desired Color Nuances
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sensitive cuticles, looking for high-gloss glazed finish for a Saturday photoshoot..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                />
              </div>
            </div>
          )}

          {/* STEP 6: 30% Deposit Payment & Summary */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-[#8C6D46] font-semibold">
                  Step 6: Review & Secure Deposit
                </h4>
                <p className="text-xs text-[#6E6761] font-light mt-0.5">
                  A 30% deposit guarantees your slot in the atelier calendar and is applied to your balance on arrival.
                </p>
              </div>

              {/* Order Summary Liquid Glass Box */}
              <LiquidGlassSurface 
                tint="champagne" 
                blur={14} 
                backgroundOpacity={0.55} 
                className="p-5 rounded-2xl border border-white/60 space-y-3"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE3]">
                  <div>
                    <h5 className="font-editorial text-lg text-[#1F1D1B] font-medium">
                      {selectedDesign ? selectedDesign.title : selectedService?.name}
                    </h5>
                    <span className="text-[11px] text-[#7A726A]">
                      {selectedShape} Shape · {selectedLength} Length · With {technicians.find(t=>t.id===selectedTechId)?.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#1F1D1B]">
                    KES {totalPriceKES.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#5E564F]">
                  <div className="flex justify-between">
                    <span>Scheduled Time:</span>
                    <span className="font-medium text-[#1F1D1B]">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Name:</span>
                    <span className="font-medium text-[#1F1D1B]">{clientName || 'Valued Guest'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Phone:</span>
                    <span className="font-medium text-[#1F1D1B]">{clientPhone}</span>
                  </div>
                </div>

                {/* Deposit Math */}
                <div className="pt-3 border-t border-[#F0EBE3] space-y-1.5">
                  <div className="flex justify-between text-xs text-[#8C6D46] font-semibold">
                    <span>Required Deposit (30% to confirm):</span>
                    <span>KES {depositPaidKES.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#7A726A]">
                    <span>Remaining Balance Due at Studio:</span>
                    <span>KES {remainingBalanceKES.toLocaleString()}</span>
                  </div>
                </div>
              </LiquidGlassSurface>

              {/* Payment Method Selector */}
              <div>
                <span className="text-xs font-semibold text-[#1F1D1B] block mb-2">
                  Select Deposit Method:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'mpesa'
                        ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-[#E8E2D9] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800">M-Pesa STK Push</span>
                      {paymentMethod === 'mpesa' && <Check className="w-4 h-4 text-emerald-700" />}
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-1">
                      Instant prompt sent to your mobile phone.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#1F1D1B] bg-white ring-1 ring-[#1F1D1B]'
                        : 'border-[#E8E2D9] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F1D1B]">Visa / Mastercard</span>
                      {paymentMethod === 'card' && <Check className="w-4 h-4 text-[#8C6D46]" />}
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-1">
                      Direct secure card processing.
                    </span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#EFECE6]/70 rounded-xl text-[11px] text-[#6E6761] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8C6D46] shrink-0" />
                <span>Zero cancellation fees when rescheduled at least 24 hours prior.</span>
              </div>
            </div>
          )}

          {/* STEP 7: Success & Inter-System Communication Proof */}
          {step === 7 && confirmedAppointment && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs tracking-[0.25em] uppercase text-[#8C6D46] font-semibold block">
                  Booking Confirmed & Synchronized
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] mt-1 font-normal">
                  We look forward to hosting you, {confirmedAppointment.clientName}!
                </h3>
                <p className="text-xs sm:text-sm text-[#5E564F] mt-2 max-w-md mx-auto font-light">
                  Your appointment code is <strong className="font-semibold text-[#1F1D1B]">{confirmedAppointment.bookingCode}</strong>.
                  A calendar invitation and WhatsApp reminder have been dispatched.
                </p>
              </div>

              {/* Synced Liquid Glass Summary Card */}
              <LiquidGlassSurface 
                tint="champagne" 
                blur={16} 
                backgroundOpacity={0.65} 
                className="p-5 rounded-2xl border border-white/60 max-w-md mx-auto text-left space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <span className="text-xs text-[#7A726A]">Session:</span>
                  <span className="text-xs font-semibold text-[#1F1D1B]">
                    {confirmedAppointment.designName || confirmedAppointment.serviceName}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <span className="text-xs text-[#7A726A]">Date & Time:</span>
                  <span className="text-xs font-semibold text-[#1F1D1B]">
                    {confirmedAppointment.date} at {confirmedAppointment.timeSlot}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EBE3]">
                  <span className="text-xs text-[#7A726A]">Shape & Length:</span>
                  <span className="text-xs font-semibold text-[#1F1D1B]">
                    {confirmedAppointment.shape} ({confirmedAppointment.length})
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#8C6D46] font-medium">Deposit Paid (30%):</span>
                  <span className="text-xs font-bold text-emerald-700">
                    KES {confirmedAppointment.depositPaidKES.toLocaleString()} ✓
                  </span>
                </div>
              </LiquidGlassSurface>

              {/* Bi-directional proof banner */}
              <div className="bg-[#FAF0E6] p-4 rounded-xl border border-[#E8D7C8] max-w-md mx-auto text-left">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#8C6D46] mt-0.5 shrink-0" />
                  <div>
                    <h6 className="text-xs font-semibold text-[#1F1D1B]">Bi-Directional Sync Active</h6>
                    <p className="text-[11px] text-[#5E564F] mt-0.5 leading-relaxed">
                      This reservation is now reflected inside the Veloura Nails Management System under Today's Appointments and Client History!
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-6 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Close & Return to Studio
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReceiptModalAppointment(confirmedAppointment);
                  }}
                  className="w-full sm:w-auto bg-white border border-[#DDD7CD] hover:bg-stone-50 text-[#1F1D1B] px-5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={handleJumpToNailTechDashboard}
                  className="w-full sm:w-auto border border-[#8C6D46] text-[#8C6D46] hover:bg-[#8C6D46] hover:text-white px-5 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Inspect in Tech Portal &rarr;</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Navigation Buttons */}
        {step < 7 && (
          <div className="bg-white px-6 py-4 border-t border-[#E8E2D9] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5E564F] hover:text-[#1F1D1B] px-3 py-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleConfirmAndPayDeposit}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-7 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Confirming M-Pesa...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay KES {depositPaidKES.toLocaleString()} Deposit</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
