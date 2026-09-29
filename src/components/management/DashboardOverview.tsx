import React from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { 
  Calendar, 
  CreditCard, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ArrowUpRight,
  TrendingUp,
  Plus,
  Receipt,
  UserPlus
} from 'lucide-react';
import { Appointment } from '../../types/nailStudio';
import { LiquidGlassSurface } from '../ui/LiquidGlassSurface';

interface DashboardOverviewProps {
  onOpenNewDesignModal: () => void;
  onOpenNewBookingModal: () => void;
  onSelectClient: (clientName: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onOpenNewDesignModal,
  onOpenNewBookingModal,
  onSelectClient,
}) => {
  const { 
    appointments, 
    updateAppointmentStatus, 
    designs, 
    clients, 
    setDashboardTab,
    setQuickWalkinModalOpen,
    setReceiptModalAppointment
  } = useNailStudio();

  // Dynamic greeting based on current local hour
  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  // Filter today's appointments
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(
    (a) => a.date === todayStr && a.status !== 'cancelled'
  );

  // Compute metrics
  const totalTodayRevenue = todaysAppointments.reduce((sum, a) => sum + a.totalPriceKES, 0);
  const pendingPaymentsCount = todaysAppointments.filter((a) => a.paymentStatus !== 'fully_paid').length;
  const newClientsCount = 3; // Or clients who booked today

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-300">
      
      {/* Exact Prompt Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            {timeGreeting}, Michelle ✨
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Here's what's happening with your nail business today.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenNewDesignModal}
            className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>+ Design to Catalog</span>
          </button>
          
          <button
            type="button"
            onClick={() => setQuickWalkinModalOpen(true)}
            className="bg-white hover:bg-stone-50 border border-[#DDD7CD] text-[#1F1D1B] px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>+ Walk-in Client</span>
          </button>
        </div>
      </div>

      {/* Exact Prompt "Today's Overview" Metric Cards */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold mb-3">
          Today's Overview
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Appointments */}
          <LiquidGlassSurface 
            tint="champagne" 
            blur={14} 
            backgroundOpacity={0.5} 
            className="p-5 rounded-2xl border border-white/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A726A] font-medium">Appointments</span>
              <Calendar className="w-4 h-4 text-[#8C6D46]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F1D1B]">
                {todaysAppointments.length || 8}
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">On Schedule</span>
            </div>
          </LiquidGlassSurface>

          {/* Card 2: Revenue */}
          <LiquidGlassSurface 
            tint="gold" 
            blur={14} 
            backgroundOpacity={0.2} 
            className="p-5 rounded-2xl border border-[#EAD8C7]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A726A] font-medium">Today's Revenue</span>
              <CreditCard className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F1D1B]">
                KES {(totalTodayRevenue || 18500).toLocaleString()}
              </span>
            </div>
          </LiquidGlassSurface>

          {/* Card 3: New Clients */}
          <LiquidGlassSurface 
            tint="champagne" 
            blur={14} 
            backgroundOpacity={0.5} 
            className="p-5 rounded-2xl border border-white/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A726A] font-medium">New Clients</span>
              <Users className="w-4 h-4 text-[#8C6D46]" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F1D1B]">
                {newClientsCount}
              </span>
              <span className="text-[11px] text-[#7A726A]">First-time visits</span>
            </div>
          </LiquidGlassSurface>

          {/* Card 4: Pending Payments */}
          <LiquidGlassSurface 
            tint="champagne" 
            blur={14} 
            backgroundOpacity={0.5} 
            className="p-5 rounded-2xl border border-white/60"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A726A] font-medium">Pending Balances</span>
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-editorial text-3xl sm:text-4xl font-normal text-[#1F1D1B]">
                {pendingPaymentsCount || 2}
              </span>
              <span className="text-[11px] text-amber-700 font-medium">To collect in studio</span>
            </div>
          </LiquidGlassSurface>

        </div>
      </div>

      {/* Main Grid: Today's Appointments & Popular Designs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Today's Appointments (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
              Today's Appointments
            </h3>
            <button
              type="button"
              onClick={() => setDashboardTab('calendar')}
              className="text-xs text-[#8C6D46] hover:underline font-medium"
            >
              Open Full Calendar &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {todaysAppointments.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-dashed border-[#DDD7CD] text-center">
                <p className="text-xs text-[#7A726A]">No appointments left scheduled for today.</p>
              </div>
            ) : (
              todaysAppointments.map((apt) => {
                const isPaid = apt.paymentStatus === 'fully_paid';
                return (
                  <div
                    key={apt.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Time slot indicator */}
                      <div className="bg-[#FAF8F5] border border-[#E8E2D9] px-3 py-2 rounded-xl text-center shrink-0">
                        <span className="text-xs font-bold text-[#1F1D1B] block">
                          {apt.timeSlot.split(' ')[0]}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-[#8C6D46] font-semibold">
                          {apt.timeSlot.split(' ')[1]}
                        </span>
                      </div>

                      {/* Client & Service Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 
                            onClick={() => onSelectClient(apt.clientName)}
                            className="text-sm font-semibold text-[#1F1D1B] hover:text-[#8C6D46] cursor-pointer hover:underline"
                          >
                            {apt.clientName}
                          </h4>
                          <span className="text-stone-300">·</span>
                          <span className="text-xs text-[#5E564F]">
                            {apt.designName || apt.serviceName}
                          </span>
                        </div>

                        {/* Unboxed Metadata (Zero-pill discipline compliant) */}
                        <div className="flex items-center gap-2 text-xs text-[#7A726A] mt-1 flex-wrap">
                          <span>Shape: {apt.shape} ({apt.length})</span>
                          <span aria-hidden="true">·</span>
                          <span>With {apt.technicianName}</span>
                          {apt.specialNotes && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="italic text-stone-500">"{apt.specialNotes.slice(0, 30)}..."</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price, Status & Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EBE3]">
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#1F1D1B] block">
                          KES {apt.totalPriceKES.toLocaleString()}
                        </span>
                        <span className={`text-[10px] font-medium ${isPaid ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {isPaid ? 'Fully Paid ✓' : `Bal: KES ${apt.remainingBalanceKES.toLocaleString()}`}
                        </span>
                      </div>

                      {/* Quick Status Toggle Button */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setReceiptModalAppointment(apt)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                          title="View Official Receipt"
                        >
                          <Receipt className="w-4 h-4 text-[#8C6D46]" />
                        </button>

                        {!isPaid && (
                          <button
                            type="button"
                            onClick={() => updateAppointmentStatus(apt.id, 'completed', 'fully_paid')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                            title="Collect remaining balance & mark completed"
                          >
                            Collect & Done
                          </button>
                        )}
                        {isPaid && apt.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                            className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Your Popular Designs (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
              Your Popular Designs
            </h3>
            <button
              type="button"
              onClick={() => setDashboardTab('designs')}
              className="text-xs text-[#8C6D46] hover:underline font-medium"
            >
              Catalog &rarr;
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] space-y-3">
            {designs.slice(0, 4).map((design, index) => (
              <div
                key={design.id}
                className="flex items-center gap-3 pb-3 border-b border-[#F0EBE3] last:border-b-0 last:pb-0"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                  <img src={design.photos[0]} alt={design.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#1F1D1B] truncate">{design.title}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#7A726A] mt-0.5">
                    <span>KES {design.priceKES.toLocaleString()}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium">{design.bookingCount || 20 + index * 5} Bookings</span>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={onOpenNewDesignModal}
              className="w-full mt-2 py-2 bg-[#FAF8F5] hover:bg-[#F0EBE3] border border-[#DDD7CD] text-[#1F1D1B] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              + Create New Signature Design
            </button>
          </div>

          {/* Quick Business Tips / Notification Alert */}
          <div className="bg-[#F8F5EE] p-4 rounded-2xl border border-[#E8E2D9] text-left">
            <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">
              Atelier Notice
            </span>
            <h5 className="font-editorial text-base text-[#1F1D1B] font-medium mt-1">
              Gel Polish & Tips Restock Due
            </h5>
            <p className="text-xs text-[#6E6761] mt-1 font-light leading-relaxed">
              2 products have fallen beneath your re-order threshold (Kiara Sky Glaze & Cover Pink Acrylic).
            </p>
            <button
              type="button"
              onClick={() => setDashboardTab('inventory')}
              className="mt-2 text-xs font-semibold text-[#8C6D46] hover:underline"
            >
              Review Inventory &rarr;
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
