import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Appointment } from '../../types/nailStudio';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Filter,
  User,
  ChevronLeft,
  ChevronRight,
  Receipt
} from 'lucide-react';

interface CalendarModuleProps {
  onOpenNewBookingModal: () => void;
}

export const CalendarModule: React.FC<CalendarModuleProps> = ({ onOpenNewBookingModal }) => {
  const { appointments, updateAppointmentStatus, cancelAppointment, technicians, setReceiptModalAppointment } = useNailStudio();

  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filterTech, setFilterTech] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = !filterDate || apt.date === filterDate;
    const matchesTech = filterTech === 'all' || apt.technicianId === filterTech;
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesDate && matchesTech && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Scheduling & Roster
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Appointments & Calendar
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Real-time schedule of online customer bookings and walk-in appointments.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenNewBookingModal}
          className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Date & Filter Controls (Zero-Pill discipline compliant) */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#8C6D46]" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-1.5 text-xs text-[#1F1D1B] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setFilterDate(new Date().toISOString().split('T')[0])}
            className="text-xs text-[#8C6D46] hover:underline font-medium ml-1"
          >
            Today
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Tech Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#5E564F]">
            <span>Artist:</span>
            <select
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-2.5 py-1 text-xs text-[#1F1D1B]"
            >
              <option value="all">All Technicians</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#5E564F]">
            <span>Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg px-2.5 py-1 text-xs text-[#1F1D1B]"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

      </div>

      {/* Appointment Slots List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-dashed border-[#DDD7CD] text-center max-w-md mx-auto">
            <Clock className="w-8 h-8 text-[#8C6D46]/50 mx-auto mb-2" />
            <h4 className="font-editorial text-lg text-[#1F1D1B]">No appointments found</h4>
            <p className="text-xs text-[#7A726A] mt-1">No appointments match the selected date and filters.</p>
            <button
              type="button"
              onClick={onOpenNewBookingModal}
              className="mt-3 text-xs font-semibold text-[#8C6D46] hover:underline"
            >
              Book an appointment for this day &rarr;
            </button>
          </div>
        ) : (
          filteredAppointments.map((apt) => {
            const isCompleted = apt.status === 'completed';
            const isCancelled = apt.status === 'cancelled';
            const isPaid = apt.paymentStatus === 'fully_paid';

            return (
              <div
                key={apt.id}
                className={`bg-white p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCancelled
                    ? 'border-stone-200 opacity-60 bg-stone-50'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-[#E8E2D9] hover:shadow-sm'
                }`}
              >
                {/* Time & Session */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FAF8F5] border border-[#E8E2D9] px-3.5 py-2.5 rounded-xl text-center shrink-0">
                    <span className="text-sm font-bold text-[#1F1D1B] block">{apt.timeSlot.split(' ')[0]}</span>
                    <span className="text-[10px] uppercase font-semibold text-[#8C6D46]">{apt.timeSlot.split(' ')[1]}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-editorial text-xl font-normal text-[#1F1D1B]">{apt.clientName}</h3>
                      <span className="text-stone-300">·</span>
                      <span className="text-xs text-[#5E564F] font-medium">{apt.designName || apt.serviceName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#7A726A] mt-1 flex-wrap">
                      <span>Ref: #{apt.bookingCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>Shape: {apt.shape} ({apt.length})</span>
                      <span aria-hidden="true">·</span>
                      <span>Artist: {apt.technicianName}</span>
                      <span aria-hidden="true">·</span>
                      <span>Phone: {apt.clientPhone}</span>
                    </div>

                    {apt.specialNotes && (
                      <p className="text-xs text-[#8C6D46] mt-1 font-light italic">
                        "{apt.specialNotes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing & Control Triggers */}
                <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#F0EBE3]">
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#1F1D1B] block">
                      KES {apt.totalPriceKES.toLocaleString()}
                    </span>
                    <span className={`text-[10px] font-semibold ${isPaid ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {isPaid ? 'Fully Paid ✓' : `Deposit: KES ${apt.depositPaidKES.toLocaleString()} (Bal: KES ${apt.remainingBalanceKES.toLocaleString()})`}
                    </span>
                  </div>

                  {/* Actions */}
                  {!isCancelled && (
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
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Collect Balance
                        </button>
                      )}

                      {isPaid && !isCompleted && (
                        <button
                          type="button"
                          onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium px-3 py-1.5 rounded-lg"
                        >
                          Complete
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => cancelAppointment(apt.id)}
                        className="text-stone-400 hover:text-red-600 p-1.5 rounded"
                        title="Cancel Appointment"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
