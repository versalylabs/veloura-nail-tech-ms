import React from 'react';
import { NailDesign } from '../../types/nailStudio';
import { useNailStudio } from '../../context/NailStudioContext';
import { X, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';

interface DesignDetailModalProps {
  design: NailDesign | null;
  onClose: () => void;
  onBook: (design: NailDesign) => void;
}

export const DesignDetailModal: React.FC<DesignDetailModalProps> = ({
  design,
  onClose,
  onBook,
}) => {
  const { designs } = useNailStudio();

  if (!design) return null;

  // Find related designs in same category or matching tags
  const relatedDesigns = designs
    .filter((d) => d.id !== design.id && (d.category === design.category || d.tags.some(t => design.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#1F1D1B] flex items-center justify-center shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Photos Showcase (Left Column) */}
          <div className="md:col-span-6 bg-[#EFECE6] p-6 space-y-4">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-inner bg-[#E4DDD3]">
              <img
                src={design.photos[0]}
                alt={design.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Additional Photo Gallery if available */}
            {design.photos.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {design.photos.map((photo, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border-2 border-white shadow-sm">
                    <img src={photo} alt={`${design.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design Details & Booking Action (Right Column) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              {/* Category & Status metadata (Zero-Pill discipline: unboxed text with typographic separators) */}
              <div className="flex items-center gap-2 text-xs text-[#8C6D46] tracking-wider uppercase font-semibold">
                <span>{design.category}</span>
                <span aria-hidden="true">·</span>
                <span>{design.durationMinutes} mins</span>
                {design.isFeatured && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#1F1D1B]">Featured Set</span>
                  </>
                )}
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] mt-2 font-normal leading-tight">
                {design.title}
              </h2>

              {/* Price & Duration Bar */}
              <div className="mt-4 pb-4 border-b border-[#E8E2D9] flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7A726A] block">Estimated Investment</span>
                  <span className="text-2xl sm:text-3xl font-semibold text-[#1F1D1B]">
                    KES {design.priceKES.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-[#7A726A] block">Estimated Duration</span>
                  <span className="text-sm font-medium text-[#1F1D1B] flex items-center justify-end gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5 text-[#8C6D46]" />
                    {Math.floor(design.durationMinutes / 60)}h {design.durationMinutes % 60 ? `${design.durationMinutes % 60}m` : ''}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h4 className="text-xs uppercase tracking-wider text-[#7A726A] font-medium">Design Narrative</h4>
                <p className="text-sm text-[#4A443E] mt-1.5 leading-relaxed font-light">
                  {design.description}
                </p>
              </div>

              {/* Recommendation Badges */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs bg-white/70 p-3.5 rounded-xl border border-[#E8E2D9]">
                <div>
                  <span className="text-[#8C6D46] font-medium block">Recommended Shape</span>
                  <span className="text-[#1F1D1B] font-semibold text-sm">
                    {design.shapeRecommendation || 'Almond or Coffin'}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C6D46] font-medium block">Recommended Length</span>
                  <span className="text-[#1F1D1B] font-semibold text-sm">
                    {design.lengthRecommendation || 'Medium'}
                  </span>
                </div>
              </div>

              {/* Style Tags */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-[#7A726A] flex-wrap">
                <span className="text-[#8C6D46] font-medium">Style Tags:</span>
                {design.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    <span>#{tag}</span>
                    {i < design.tags.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-[#E8E2D9] space-y-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBook(design);
                }}
                className="w-full bg-[#1F1D1B] hover:bg-[#342F2C] text-white py-3.5 px-6 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>Book This Style</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-[#7A726A]">
                Requires 30% deposit via M-Pesa to secure date & time slot.
              </p>
            </div>

            {/* Related Designs preview if available */}
            {relatedDesigns.length > 0 && (
              <div className="mt-6 pt-4 border-t border-[#E8E2D9]">
                <span className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold block mb-3">
                  Related Designs You May Love
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {relatedDesigns.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onBook(rel)}
                      className="cursor-pointer group flex flex-col text-left"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-stone-200">
                        <img
                          src={rel.photos[0]}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-[#1F1D1B] truncate mt-1 group-hover:text-[#8C6D46]">
                        {rel.title}
                      </span>
                      <span className="text-[10px] text-[#7A726A]">
                        KES {rel.priceKES.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
