import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { TestimonialItem } from '../../types/nailStudio';
import { 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  MessageSquareQuote, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const TestimonialsManagerModule: React.FC = () => {
  const { 
    testimonials, 
    addTestimonial, 
    updateTestimonial, 
    deleteTestimonial,
    setCurrentView 
  } = useNailStudio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState('');
  const [setInfo, setSetInfo] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName('');
    setRole('Client');
    setRating(5);
    setText('');
    setSetInfo('Chrome French Tips · Almond Gel-X');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingItem(t);
    setName(t.name);
    setRole(t.role);
    setRating(t.rating);
    setText(t.text);
    setSetInfo(t.set);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    if (editingItem) {
      updateTestimonial(editingItem.id, {
        name,
        role,
        rating,
        text,
        set: setInfo,
      });
    } else {
      addTestimonial({
        name,
        role,
        rating,
        text,
        set: setInfo,
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
            Social Proof & Client Acclaim
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Testimonials & Reviews Manager
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Manage the client feedback and 5-star ratings displayed on the public Veloura Nails website.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCurrentView('website')}
            className="bg-white hover:bg-stone-50 border border-[#E8E2D9] text-[#1F1D1B] px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>Preview on Website</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#C5A880]" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-xs flex flex-col justify-between relative group hover:border-[#C5A880] transition-colors"
          >
            <div>
              {/* Star rating & Action buttons */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE3]">
                <div className="flex items-center gap-1 text-[#C5A880]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 text-stone-500 hover:text-[#1F1D1B] hover:bg-stone-100 rounded-lg transition-colors"
                    title="Edit Review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete testimonial from ${t.name}?`)) {
                        deleteTestimonial(t.id);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs text-[#4A443E] mt-4 font-light leading-relaxed italic">
                "{t.text}"
              </p>
            </div>

            {/* Author info & Set details */}
            <div className="mt-6 pt-4 border-t border-[#F0EBE3]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1D1B]">{t.name}</h4>
                  <span className="text-[11px] text-[#7A726A]">{t.role}</span>
                </div>
                <span className="text-[10px] text-[#8C6D46]">{t.date}</span>
              </div>
              <div className="mt-2 text-[11px] text-[#8C6D46] flex items-center gap-1 font-medium">
                <span>✦ Set:</span>
                <span className="text-[#6E6761]">{t.set}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6 text-left">
            
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-lg text-[#8C6D46]">
                  <MessageSquareQuote className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
                  {editingItem ? 'Edit Testimonial' : 'Add Client Testimonial'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stephanie M."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Role / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Fashion Stylist"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Nail Set Done</label>
                  <input
                    type="text"
                    placeholder="e.g. Chrome French Tips · Almond Gel-X"
                    value={setInfo}
                    onChange={(e) => setSetInfo(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Review Quote *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Client review text..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  {editingItem ? 'Save Changes' : 'Publish Testimonial'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
