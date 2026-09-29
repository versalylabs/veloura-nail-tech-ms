import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { NailCategory, NailDesign, NailShape, NailLength } from '../../types/nailStudio';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Clock, 
  Eye, 
  Check, 
  Globe, 
  X,
  Star,
  CalendarCheck
} from 'lucide-react';

interface DesignCatalogModuleProps {
  isModalOpenInitially?: boolean;
}

export const DesignCatalogModule: React.FC<DesignCatalogModuleProps> = ({ isModalOpenInitially = false }) => {
  const { 
    designs, 
    addDesign, 
    updateDesign, 
    deleteDesign, 
    setCurrentView 
  } = useNailStudio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NailCategory>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(isModalOpenInitially);
  const [editingDesign, setEditingDesign] = useState<NailDesign | null>(null);

  // Form fields for new or edited design
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<NailCategory, 'All'>>('Chrome');
  const [priceKES, setPriceKES] = useState<number>(2500);
  const [durationMinutes, setDurationMinutes] = useState<number>(105);
  const [photoUrl, setPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [shapeRecommendation, setShapeRecommendation] = useState<NailShape>('Almond');
  const [lengthRecommendation, setLengthRecommendation] = useState<NailLength>('Medium');
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [isAvailableForBooking, setIsAvailableForBooking] = useState<boolean>(true);

  const curatedPhotoPresets = [
    { label: 'Chrome Glaze', url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80' },
    { label: 'Blush Aura', url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Emerald Velvet', url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80' },
    { label: 'Clean Quartz', url: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80' },
    { label: 'Floral Botanicals', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80' },
    { label: 'Bordeaux Stiletto', url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleOpenCreateModal = (designToEdit?: NailDesign) => {
    if (designToEdit) {
      setEditingDesign(designToEdit);
      setTitle(designToEdit.title);
      setCategory(designToEdit.category);
      setPriceKES(designToEdit.priceKES);
      setDurationMinutes(designToEdit.durationMinutes);
      setPhotoUrl(designToEdit.photos[0] || '');
      setDescription(designToEdit.description);
      setTagsInput(designToEdit.tags.join(', '));
      setShapeRecommendation(designToEdit.shapeRecommendation || 'Almond');
      setLengthRecommendation(designToEdit.lengthRecommendation || 'Medium');
      setIsFeatured(designToEdit.isFeatured);
      setIsAvailableForBooking(designToEdit.isAvailableForBooking);
    } else {
      setEditingDesign(null);
      setTitle('');
      setCategory('Chrome');
      setPriceKES(2500);
      setDurationMinutes(105);
      setPhotoUrl(curatedPhotoPresets[0].url);
      setDescription('Custom bespoke nail design created at Michelle Atelier with high-gloss finish.');
      setTagsInput('Chrome, Pink, Aura, Gel');
      setShapeRecommendation('Almond');
      setLengthRecommendation('Medium');
      setIsFeatured(true);
      setIsAvailableForBooking(true);
    }
    setIsCreateModalOpen(true);
  };

  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const photos = photoUrl.trim() ? [photoUrl.trim()] : [curatedPhotoPresets[0].url];

    if (editingDesign) {
      updateDesign(editingDesign.id, {
        title,
        category,
        priceKES,
        durationMinutes,
        photos,
        description,
        tags,
        shapeRecommendation,
        lengthRecommendation,
        isFeatured,
        isAvailableForBooking,
      });
    } else {
      addDesign({
        title,
        category,
        priceKES,
        durationMinutes,
        photos,
        description,
        tags,
        shapeRecommendation,
        lengthRecommendation,
        isFeatured,
        isAvailableForBooking,
      });
    }

    setIsCreateModalOpen(false);
  };

  const filteredDesigns = designs.filter((d) => {
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Signature Asset System
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Digital Nail Design Catalog
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Build your signature library of sets. Designs published here appear live immediately on your public booking website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleOpenCreateModal()}
            className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#C5A880]" />
            <span>Create New Design</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar (Zero-Pill discipline compliant) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8E2D9]">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C6D46] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search designs or tags (e.g. Chrome, Aura)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Chrome', 'French', 'Floral', 'Luxury', 'Minimal', 'Custom Art', 'Acrylic', 'Gel'] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1F1D1B] text-[#FAF8F5] font-semibold shadow-xs'
                    : 'bg-[#FAF8F5] text-[#6E6761] hover:text-[#1F1D1B]'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Designs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo & Status Overlay */}
              <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                <img src={design.photos[0]} alt={design.title} className="w-full h-full object-cover" />
                
                {/* Live indicators */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {design.isAvailableForBooking ? (
                    <span className="bg-emerald-900/80 backdrop-blur-md text-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded">
                      Live for Booking
                    </span>
                  ) : (
                    <span className="bg-stone-900/80 backdrop-blur-md text-stone-300 text-[10px] font-medium px-2 py-0.5 rounded">
                      Draft / Paused
                    </span>
                  )}

                  {design.isFeatured && (
                    <span className="bg-[#C5A880] text-[#191716] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" /> Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded text-xs font-semibold">
                  KES {design.priceKES.toLocaleString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between text-[11px] text-[#8C6D46] uppercase font-semibold">
                  <span>{design.category}</span>
                  <span className="flex items-center gap-1 text-[#7A726A]">
                    <Clock className="w-3 h-3" />
                    {Math.floor(design.durationMinutes / 60)}h {design.durationMinutes % 60 ? `${design.durationMinutes % 60}m` : ''}
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-normal text-[#1F1D1B] mt-1 line-clamp-1">
                  {design.title}
                </h3>

                <p className="text-xs text-[#6E6761] mt-1.5 line-clamp-2 font-light">
                  {design.description}
                </p>

                {/* Style Tags (Zero-Pill discipline compliant) */}
                <div className="mt-3 flex items-center gap-1 text-[11px] text-[#7A726A] flex-wrap">
                  {design.tags.map((t, idx) => (
                    <React.Fragment key={t}>
                      <span>#{t}</span>
                      {idx < design.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#F0EBE3] flex items-center justify-between">
              {/* Quick toggles */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-[#5E564F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.isAvailableForBooking}
                    onChange={(e) => updateDesign(design.id, { isAvailableForBooking: e.target.checked })}
                    className="rounded text-[#1F1D1B] focus:ring-0"
                  />
                  <span>Bookable</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs text-[#5E564F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={design.isFeatured}
                    onChange={(e) => updateDesign(design.id, { isFeatured: e.target.checked })}
                    className="rounded text-[#1F1D1B] focus:ring-0"
                  />
                  <span>Featured</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenCreateModal(design)}
                  className="p-1.5 text-[#5E564F] hover:text-[#1F1D1B] hover:bg-stone-200 rounded-lg transition-colors"
                  title="Edit Design"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remove "${design.title}" from catalog?`)) {
                      deleteDesign(design.id);
                    }
                  }}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Design"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Creation / Edit Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
                {editingDesign ? 'Edit Signature Design' : 'Publish New Signature Design'}
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDesign} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-left">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Design Title * (e.g. Pink Chrome Aura)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pink Chrome Aura"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Design Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  >
                    <option value="Chrome">Chrome</option>
                    <option value="French">French</option>
                    <option value="Floral">Floral</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Minimal">Minimal</option>
                    <option value="Custom Art">Custom Art</option>
                    <option value="Acrylic">Acrylic</option>
                    <option value="Gel">Gel</option>
                  </select>
                </div>
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Client Price (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    min={500}
                    step={100}
                    value={priceKES}
                    onChange={(e) => setPriceKES(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Duration (Minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    min={30}
                    step={15}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                  />
                </div>
              </div>

              {/* Photo Showcase & Presets */}
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                  Primary Photo URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                />

                {/* Quick Presets */}
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[#7A726A] font-medium">Or pick sample atelier photo:</span>
                  {curatedPhotoPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setPhotoUrl(preset.url)}
                      className="px-2 py-0.5 text-[10px] bg-white border border-[#E8E2D9] hover:border-[#1F1D1B] rounded text-[#5E564F]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                  Description & Technique Details
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B] focus:outline-none focus:border-[#1F1D1B]"
                />
              </div>

              {/* Tags & Recommendations */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Chrome, Pink, Aura, Gel"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Best Shape
                  </label>
                  <select
                    value={shapeRecommendation}
                    onChange={(e) => setShapeRecommendation(e.target.value as any)}
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
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">
                    Best Length
                  </label>
                  <select
                    value={lengthRecommendation}
                    onChange={(e) => setLengthRecommendation(e.target.value as any)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  >
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                    <option value="Extra Long">Extra Long</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#1F1D1B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-[#1F1D1B]"
                  />
                  <span>⭐ Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-[#1F1D1B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailableForBooking}
                    onChange={(e) => setIsAvailableForBooking(e.target.checked)}
                    className="rounded text-[#1F1D1B]"
                  />
                  <span>📅 Available for Customer Online Booking</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#5E564F] hover:text-[#1F1D1B]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                >
                  {editingDesign ? 'Update Design' : 'Publish to Live Catalog'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
