import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { ReminderItem } from '../../types/nailStudio';
import { 
  Bell, 
  Send, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  Smartphone, 
  ExternalLink,
  Sparkles,
  Filter
} from 'lucide-react';

export const RemindersModule: React.FC = () => {
  const { reminders, dispatchReminder, appointments } = useNailStudio();
  const [filterType, setFilterType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'queue' | 'templates'>('queue');

  const filteredReminders = reminders.filter((r) => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  const pendingCount = reminders.filter((r) => r.status === 'pending').length;

  const getWhatsAppLink = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Automated Client Communications
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Reminders & Follow-Up Automation
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            24h pre-appointment notices, 2h arrival alerts, 3-week maintenance infill reminders, and WhatsApp direct messaging.
          </p>
        </div>

        {/* View toggle (Zero-Pill discipline compliant) */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E8E2D9] rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('queue')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'queue' ? 'bg-[#1F1D1B] text-[#FAF8F5] font-semibold' : 'text-[#6E6761] hover:text-[#1F1D1B]'
            }`}
          >
            Dispatch Queue ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'templates' ? 'bg-[#1F1D1B] text-[#FAF8F5] font-semibold' : 'text-[#6E6761] hover:text-[#1F1D1B]'
            }`}
          >
            SMS & WhatsApp Templates
          </button>
        </div>
      </div>

      {activeTab === 'queue' && (
        <>
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
              <span className="text-xs text-[#7A726A]">Pending Dispatches</span>
              <div className="font-editorial text-3xl font-normal text-amber-700 mt-1">
                {pendingCount} Messages
              </div>
              <span className="text-[10px] text-amber-800 mt-1 block">Scheduled for today & tomorrow</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
              <span className="text-xs text-[#7A726A]">Dispatched Today</span>
              <div className="font-editorial text-3xl font-normal text-emerald-800 mt-1">
                {reminders.filter(r => r.status === 'sent').length + 5} Sent
              </div>
              <span className="text-[10px] text-emerald-700 mt-1 block">99.4% delivery rate</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
              <span className="text-xs text-[#7A726A]">Infill Rebooking Velocity</span>
              <div className="font-editorial text-3xl font-normal text-[#8C6D46] mt-1">
                74%
              </div>
              <span className="text-[10px] text-[#7A726A] mt-1 block">Return within 21-28 days</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {[
                { label: 'All Reminders', value: 'all' },
                { label: '24h Pre-Appointment', value: '24h_reminder' },
                { label: '2h Arrival Alert', value: '2h_alert' },
                { label: '3-Week Infill Follow-up', value: '3week_infill' },
              ].map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilterType(f.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    filterType === f.value ? 'bg-[#1F1D1B] text-[#FAF8F5]' : 'bg-[#FAF8F5] text-[#6E6761] hover:text-[#1F1D1B]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reminders List */}
          <div className="space-y-3">
            {filteredReminders.map((rem) => {
              const isSent = rem.status === 'sent';
              const typeLabels: Record<ReminderItem['type'], { name: string; color: string }> = {
                '24h_reminder': { name: '24h Confirmation', color: 'text-sky-800' },
                '2h_alert': { name: '2h Arrival Directions', color: 'text-amber-800' },
                '3week_infill': { name: '3-Week Maintenance Infill', color: 'text-[#8C6D46]' },
                'aftercare_followup': { name: 'Post-Care Instructions', color: 'text-emerald-800' },
              };

              const currentType = typeLabels[rem.type] || { name: 'Reminder', color: 'text-stone-800' };

              return (
                <div
                  key={rem.id}
                  className={`bg-white p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isSent ? 'border-stone-200 bg-stone-50/60' : 'border-[#E8E2D9] shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${currentType.color}`}>
                        {currentType.name}
                      </span>
                      <span className="text-stone-300">·</span>
                      <span className="text-xs font-bold text-[#1F1D1B]">{rem.clientName}</span>
                      <span className="text-stone-300">·</span>
                      <span className="text-xs text-[#7A726A]">{rem.clientPhone}</span>
                    </div>

                    <p className="text-xs text-[#5E564F] font-light leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
                      "{rem.messagePreview}"
                    </p>

                    <div className="text-[10px] text-[#7A726A] flex items-center gap-2 pt-0.5">
                      <Clock className="w-3 h-3 text-[#8C6D46]" />
                      <span>Scheduled: {rem.scheduledTime} ({rem.date} at {rem.timeSlot})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    {/* Direct WhatsApp link */}
                    <a
                      href={getWhatsAppLink(rem.clientPhone, rem.messagePreview)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      title="Open WhatsApp chat with preloaded message"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </a>

                    {/* In-system dispatch */}
                    {!isSent ? (
                      <button
                        type="button"
                        onClick={() => dispatchReminder(rem.id)}
                        className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Send SMS</span>
                      </button>
                    ) : (
                      <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-bold">Template 1</span>
            <h4 className="font-editorial text-xl font-normal text-[#1F1D1B]">24h Appointment Reminder</h4>
            <p className="text-xs text-[#5E564F] leading-relaxed font-light bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
              "Hi {'{ClientName}'}! Veloura Nails reminder: your {'{ServiceName}'} session is scheduled for tomorrow at {'{TimeSlot}'}. Studio: Mirage Tower 2, 4th Floor Westlands. Remaining balance: KES {'{Balance}'}. Reply to this message if you need directions or to adjust."
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-bold">Template 2</span>
            <h4 className="font-editorial text-xl font-normal text-[#1F1D1B]">2h Arrival & Parking Directions</h4>
            <p className="text-xs text-[#5E564F] leading-relaxed font-light bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
              "Hi {'{ClientName}'}, Veloura Nails is excited to see you in 2 hours! Free basement parking is available at Mirage Tower 2. Take the main elevator to 4th floor, suite 4B. Herbal tea & espresso will be ready ✨"
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-bold">Template 3</span>
            <h4 className="font-editorial text-xl font-normal text-[#1F1D1B]">3-Week Infill / Apex Maintenance</h4>
            <p className="text-xs text-[#5E564F] leading-relaxed font-light bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
              "Hi {'{ClientName}'}! It has been 3 weeks since your {'{DesignName}'} set. To avoid stress-point cracks and keep your natural nail beds healthy, let's schedule your refill: velouranails.co.ke"
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] space-y-3">
            <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-bold">Template 4</span>
            <h4 className="font-editorial text-xl font-normal text-[#1F1D1B]">Post-Appointment Care & Jojoba Routine</h4>
            <p className="text-xs text-[#5E564F] leading-relaxed font-light bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]">
              "Thank you for visiting Veloura Nails today, {'{ClientName}'}! ✨ Quick care tip: apply jojoba oil nightly, wear gloves with strong cleaning chemicals, and never peel your gel. You earned 250 loyalty points today!"
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
