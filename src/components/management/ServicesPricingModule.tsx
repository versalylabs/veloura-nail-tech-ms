import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { ServiceItem } from '../../types/nailStudio';
import { Palette, Plus, Edit3, Trash2, Clock, Check, X } from 'lucide-react';

export const ServicesPricingModule: React.FC = () => {
  const { services, addService, updateService, deleteService } = useNailStudio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceItem['category']>('Manicure');
  const [startingPriceKES, setStartingPriceKES] = useState(1800);
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [description, setDescription] = useState('');
  const [includesInput, setIncludesInput] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  const handleOpenModal = (srv?: ServiceItem) => {
    if (srv) {
      setEditingService(srv);
      setName(srv.name);
      setCategory(srv.category);
      setStartingPriceKES(srv.startingPriceKES);
      setDurationMinutes(srv.durationMinutes);
      setDescription(srv.description);
      setIncludesInput(srv.includes.join(', '));
      setIsPopular(!!srv.isPopular);
    } else {
      setEditingService(null);
      setName('');
      setCategory('Manicure');
      setStartingPriceKES(2000);
      setDurationMinutes(60);
      setDescription('');
      setIncludesInput('Cuticle detailing, Nail plate prep, Strengthening base, Gloss finish');
      setIsPopular(false);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const includes = includesInput
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        name,
        category,
        startingPriceKES,
        durationMinutes,
        description,
        includes,
        isPopular,
      });
    } else {
      addService({
        name,
        category,
        startingPriceKES,
        durationMinutes,
        description,
        includes,
        isPopular,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Service Menu & Rate Cards
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Services & Pricing Architecture
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Configure manicure, gel extensions, acrylic sculpting, pedicures, and nail art pricing in Kenyan Shillings (KES).
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold">
                  {service.category}
                </span>
                <span className="text-xs text-[#7A726A] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {service.durationMinutes} mins
                </span>
              </div>

              <h3 className="font-editorial text-2xl font-normal text-[#1F1D1B] mt-1.5">
                {service.name}
              </h3>

              <div className="mt-2 text-xl font-bold text-[#1F1D1B]">
                KES {service.startingPriceKES.toLocaleString()}
              </div>

              <p className="text-xs text-[#5E564F] mt-2 font-light leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#F0EBE3] space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">
                  Included:
                </span>
                {service.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#4A443E]">
                    <Check className="w-3.5 h-3.5 text-[#8C6D46] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EBE3] flex items-center justify-between">
              {service.isPopular ? (
                <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold">
                  Featured on Menu
                </span>
              ) : (
                <span className="text-[10px] text-stone-400">Standard Service</span>
              )}

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenModal(service)}
                  className="p-1.5 text-stone-600 hover:text-stone-900 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete service "${service.name}"?`)) deleteService(service.id);
                  }}
                  className="p-1.5 text-stone-400 hover:text-red-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Classic Gel Manicure"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  >
                    <option value="Manicure">Manicure</option>
                    <option value="Extensions">Extensions</option>
                    <option value="Nail Art">Nail Art</option>
                    <option value="Pedicure">Pedicure</option>
                    <option value="Care & Removal">Care & Removal</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Starting Price (KES)</label>
                <input
                  type="number"
                  value={startingPriceKES}
                  onChange={(e) => setStartingPriceKES(Number(e.target.value))}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Inclusions (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Russian cuticle prep, Gel polish, Top coat"
                  value={includesInput}
                  onChange={(e) => setIncludesInput(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs text-[#1F1D1B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded text-[#1F1D1B]"
                  />
                  <span>Mark as Client Favorite / Popular</span>
                </label>

                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
