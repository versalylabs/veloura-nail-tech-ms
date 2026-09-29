import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Technician } from '../../types/nailStudio';
import { Users, UserCheck, Plus, Check, Shield, MapPin, Percent, X } from 'lucide-react';

export const StaffModule: React.FC = () => {
  const { technicians, addTechnician, toggleTechnicianStatus, settings, updateSettings } = useNailStudio();
  const [isAddTechModalOpen, setIsAddTechModalOpen] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [role, setRole] = useState('Senior Nail Artist');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80');
  const [specialtiesInput, setSpecialtiesInput] = useState('Russian Manicure, Nail Art, BIAB');
  const [commissionRate, setCommissionRate] = useState(45);

  const handleToggleSoloMode = () => {
    updateSettings({ multiStaffMode: !settings.multiStaffMode });
  };

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addTechnician({
      name,
      role,
      avatar,
      specialties: specialtiesInput.split(',').map((s) => s.trim()).filter(Boolean),
      active: true,
      commissionRate,
    });

    setIsAddTechModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Organization & Staff Scalability
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Staff & Studio Mode Configuration
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Toggle seamlessly between Solo Nail Tech operation and Multi-Staff Nail Studio with commissions.
          </p>
        </div>

        {settings.multiStaffMode && (
          <button
            type="button"
            onClick={() => setIsAddTechModalOpen(true)}
            className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#C5A880]" />
            <span>Add Nail Technician</span>
          </button>
        )}
      </div>

      {/* Mode Switcher Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold">
              Current Operating Architecture
            </span>
          </div>
          <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal mt-0.5">
            {settings.multiStaffMode ? 'Multi-Technician Studio Mode' : 'Solo Nail Tech Mode (Michelle Only)'}
          </h3>
          <p className="text-xs text-[#6E6761] mt-1 font-light max-w-xl">
            {settings.multiStaffMode
              ? 'Appointments can be booked with individual nail artists, each with custom commission payouts, individual schedules, and client rosters.'
              : 'Streamlined single-operator system. All bookings, client histories, and notifications route directly to Michelle Mwangi.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleSoloMode}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
            settings.multiStaffMode
              ? 'bg-stone-100 hover:bg-stone-200 text-[#1F1D1B]'
              : 'bg-[#C5A880] hover:bg-[#D5B990] text-[#191716]'
          }`}
        >
          {settings.multiStaffMode ? 'Switch to Solo Tech Mode' : 'Enable Studio Staff Mode'}
        </button>
      </div>

      {/* Technicians Grid */}
      <div className="space-y-4">
        <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
          Registered Artists ({technicians.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className={`bg-white p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                tech.active ? 'border-[#E8E2D9] shadow-xs' : 'border-stone-200 opacity-60 bg-stone-50'
              }`}
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-200 border border-[#E8E2D9] shrink-0">
                    <img src={tech.avatar} alt={tech.name} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h4 className="font-editorial text-2xl font-normal text-[#1F1D1B]">{tech.name}</h4>
                    <span className="text-xs text-[#8C6D46] font-medium block">{tech.role}</span>
                    <span className="text-[11px] text-[#7A726A] mt-0.5 block">
                      Commission: <strong className="text-[#1F1D1B]">{tech.commissionRate}%</strong> per completed set
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EBE3] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">
                    Specialties:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#5E564F]">
                    {tech.specialties.map((spec, i) => (
                      <span key={i} className="bg-[#FAF8F5] border border-[#E8E2D9] px-2 py-0.5 rounded text-[11px]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {settings.multiStaffMode && tech.id !== 'tech_michelle' && (
                <div className="mt-5 pt-3 border-t border-[#F0EBE3] flex items-center justify-between">
                  <span className="text-xs text-[#7A726A]">
                    Status: {tech.active ? 'Accepting Bookings' : 'Paused / Off-Duty'}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleTechnicianStatus(tech.id)}
                    className="text-xs font-semibold text-[#8C6D46] hover:underline"
                  >
                    {tech.active ? 'Pause Bookings' : 'Reactivate'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddTechModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">Add Staff Member</h3>
              <button
                type="button"
                onClick={() => setIsAddTechModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTech} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Claire Achieng"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Role Title</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Commission %</label>
                  <input
                    type="number"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Avatar Photo URL</label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Specialties (Comma separated)</label>
                <input
                  type="text"
                  value={specialtiesInput}
                  onChange={(e) => setSpecialtiesInput(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTechModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Save Artist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
