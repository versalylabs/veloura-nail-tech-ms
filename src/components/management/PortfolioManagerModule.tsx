import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { BeforeAfterPortfolioItem, NailShape, NailLength } from '../../types/nailStudio';
import { Camera, Plus, Check, Globe, Eye, Sparkles, X, ArrowRight } from 'lucide-react';

export const PortfolioManagerModule: React.FC = () => {
  const { beforeAfterPortfolio, addBeforeAfterPortfolioItem, toggleFeatureInPublicGallery, clients } = useNailStudio();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form
  const [clientName, setClientName] = useState(clients[0]?.fullName || 'Sarah Kamau');
  const [title, setTitle] = useState('');
  const [serviceName, setServiceName] = useState('Apres Gel-X Extensions');
  const [beforePhoto, setBeforePhoto] = useState('https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80');
  const [afterPhoto, setAfterPhoto] = useState('https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80');
  const [shape, setShape] = useState<NailShape>('Almond');
  const [length, setLength] = useState<NailLength>('Medium');
  const [transformationNotes, setTransformationNotes] = useState('');
  const [featuredInPublicGallery, setFeaturedInPublicGallery] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !beforePhoto.trim() || !afterPhoto.trim()) return;

    addBeforeAfterPortfolioItem({
      clientName,
      title,
      serviceName,
      beforePhoto,
      afterPhoto,
      shape,
      length,
      transformationNotes,
      featuredInPublicGallery,
    });

    setIsUploadModalOpen(false);
    setTitle('');
    setTransformationNotes('');
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Visual Proof & Case Studies
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Client Portfolio: Before & After Gallery
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Showcase cuticle rehabilitation, apex alignment, and sculpted transformations. Synchronizes directly to the public website lookbook.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Camera className="w-4 h-4 text-[#C5A880]" />
          <span>Upload Transformation</span>
        </button>
      </div>

      {/* Grid of Before / After Case Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {beforeAfterPortfolio.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Side-by-Side Photo Comparison */}
              <div className="grid grid-cols-2 bg-stone-100 relative">
                {/* Before Photo */}
                <div className="relative aspect-[4/5] overflow-hidden border-r border-white">
                  <img src={item.beforePhoto} alt="Before set" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                    Before
                  </span>
                </div>

                {/* After Photo */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={item.afterPhoto} alt="After set" className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-[#8C6D46] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
                    After Atelier Set
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 text-left">
                <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-semibold uppercase tracking-wider">
                  <span>{item.serviceName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.shape} ({item.length})</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1F1D1B]">{item.clientName}</span>
                </div>

                <h3 className="font-editorial text-2xl font-normal text-[#1F1D1B] mt-1.5 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5E564F] mt-2 font-light leading-relaxed">
                  {item.transformationNotes}
                </p>
              </div>
            </div>

            {/* Public Gallery Toggle Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#F0EBE3] flex items-center justify-between">
              <span className="text-xs text-[#7A726A]">
                Date: {item.date}
              </span>

              <label className="flex items-center gap-2 text-xs font-semibold text-[#1F1D1B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.featuredInPublicGallery}
                  onChange={() => toggleFeatureInPublicGallery(item.id)}
                  className="rounded text-[#1F1D1B]"
                />
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>Showcase on Website</span>
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">Add Before / After Transformation</h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Transformation Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brittle Damaged Nails to Glazed Chrome Almond Set"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Core Service</label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Before Photo URL *</label>
                  <input
                    type="url"
                    required
                    value={beforePhoto}
                    onChange={(e) => setBeforePhoto(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">After Photo URL *</label>
                  <input
                    type="url"
                    required
                    value={afterPhoto}
                    onChange={(e) => setAfterPhoto(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
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

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Transformation & Retention Notes</label>
                <textarea
                  rows={2}
                  placeholder="Detail cuticle prep, biological recovery, and formula notes..."
                  value={transformationNotes}
                  onChange={(e) => setTransformationNotes(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs text-[#1F1D1B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featuredInPublicGallery}
                    onChange={(e) => setFeaturedInPublicGallery(e.target.checked)}
                    className="rounded text-[#1F1D1B]"
                  />
                  <span>Publish in Public Website Portfolio</span>
                </label>

                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Save to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
