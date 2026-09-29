import React, { useState, useMemo } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { NailCategory, NailDesign } from '../../types/nailStudio';
import { DesignDetailModal } from './DesignDetailModal';
import { Sparkles, Clock, ArrowRight, Eye } from 'lucide-react';

const CATEGORIES: { label: string; value: NailCategory }[] = [
  { label: 'All Sets', value: 'All' },
  { label: '✨ French', value: 'French' },
  { label: '🌸 Floral', value: 'Floral' },
  { label: '💎 Luxury', value: 'Luxury' },
  { label: '🤍 Minimal', value: 'Minimal' },
  { label: '🎨 Custom Art', value: 'Custom Art' },
  { label: '✨ Chrome', value: 'Chrome' },
  { label: '💅 Acrylic', value: 'Acrylic' },
  { label: '🫧 Gel', value: 'Gel' },
];

export const NailDesignsSection: React.FC = () => {
  const { designs, startBookingFlow } = useNailStudio();
  const [selectedCategory, setSelectedCategory] = useState<NailCategory>('All');
  const [activeModalDesign, setActiveModalDesign] = useState<NailDesign | null>(null);

  // Filter only designs marked as available for booking or live showcase
  const filteredDesigns = useMemo(() => {
    return designs.filter((d) => {
      if (!d.isAvailableForBooking) return false;
      if (selectedCategory === 'All') return true;
      return d.category === selectedCategory;
    });
  }, [designs, selectedCategory]);

  return (
    <section id="designs" className="py-20 sm:py-28 bg-[#F6F3EE] border-y border-[#E8E2D9] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8C6D46] font-semibold mb-2">
            <span className="w-6 h-[1px] bg-[#8C6D46]"></span>
            <span>Digital Design Catalog</span>
            <span className="w-6 h-[1px] bg-[#8C6D46]"></span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#1F1D1B] font-normal tracking-tight">
            Curated Nail Collections
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6E6761] font-light">
            Every set is hand-crafted and tailored to your nail anatomy. Select any signature design below to inspect details or reserve your session.
          </p>
        </div>

        {/* Category Filter Segmented Control (Zero-Pill discipline compliant) */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#1F1D1B] text-[#FAF8F5] shadow-sm font-semibold'
                    : 'bg-white/80 hover:bg-white text-[#5E564F] hover:text-[#1F1D1B] border border-[#E8E2D9]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Designs Visual Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-dashed border-[#DDD7CD] max-w-md mx-auto">
            <Sparkles className="w-8 h-8 mx-auto text-[#8C6D46]/60 mb-3" />
            <h3 className="font-editorial text-xl text-[#1F1D1B]">No sets in this category yet</h3>
            <p className="text-xs text-[#7A726A] mt-1">Check back soon or explore other curated categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E2D9] flex flex-col justify-between"
              >
                {/* Photo Container with Hover Overlay */}
                <div
                  className="relative aspect-[4/5] bg-[#EFECE6] overflow-hidden cursor-pointer"
                  onClick={() => setActiveModalDesign(design)}
                >
                  <img
                    src={design.photos[0]}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle top metadata */}
                  {design.isFeatured && (
                    <div className="absolute top-3 left-3 bg-[#1F1D1B]/80 backdrop-blur-md text-[#FAF8F5] px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-medium">
                      Featured
                    </div>
                  )}

                  {/* Quick Inspect Hover Button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="bg-white/95 backdrop-blur-md text-[#1F1D1B] px-4 py-2 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    {/* Unboxed Metadata (Zero-pill compliant) */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8C6D46] tracking-wider uppercase font-semibold">
                      <span>{design.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>~{Math.floor(design.durationMinutes / 60)}h {design.durationMinutes % 60 ? `${design.durationMinutes % 60}m` : ''}</span>
                    </div>

                    <h3
                      onClick={() => setActiveModalDesign(design)}
                      className="font-editorial text-xl font-normal text-[#1F1D1B] mt-1 group-hover:text-[#8C6D46] transition-colors cursor-pointer leading-snug line-clamp-1"
                    >
                      {design.title}
                    </h3>

                    <p className="text-xs text-[#6E6761] mt-1.5 line-clamp-2 font-light leading-relaxed">
                      {design.description}
                    </p>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="mt-5 pt-4 border-t border-[#F0EBE3] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A827A] block">From</span>
                      <span className="text-base font-semibold text-[#1F1D1B]">
                        KES {design.priceKES.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => startBookingFlow(design)}
                      className="bg-[#FAF8F5] hover:bg-[#1F1D1B] text-[#1F1D1B] hover:text-[#FAF8F5] border border-[#DDD7CD] hover:border-[#1F1D1B] px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center gap-1 group/btn"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal View for detailed inspection */}
      <DesignDetailModal
        design={activeModalDesign}
        onClose={() => setActiveModalDesign(null)}
        onBook={(design) => {
          setActiveModalDesign(null);
          startBookingFlow(design);
        }}
      />
    </section>
  );
};
