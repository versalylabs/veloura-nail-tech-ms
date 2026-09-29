import React from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { testimonials, settings } = useNailStudio();

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#F6F3EE] border-t border-[#E8E2D9] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8C6D46] font-semibold mb-2">
            <span className="w-6 h-[1px] bg-[#8C6D46]"></span>
            <span>Client Acclaim</span>
            <span className="w-6 h-[1px] bg-[#8C6D46]"></span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl text-[#1F1D1B] font-normal tracking-tight">
            Loved by Nairobi's Discerning Women
          </h2>
          <p className="mt-3 text-sm text-[#6E6761] font-light">
            Real feedback from verified clients who trust {settings.businessName} for their milestone sets, events, and monthly maintenance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-[#E8E2D9] flex flex-col justify-between text-left relative"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#C5A880]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#4A443E] mt-4 font-light leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F0EBE3]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#1F1D1B]">{review.name}</h4>
                    <span className="text-[11px] text-[#7A726A] font-light">{review.role}</span>
                  </div>
                  <span className="text-[10px] text-[#8C6D46] font-medium">{review.date}</span>
                </div>
                <div className="mt-2 text-[11px] text-[#8C6D46] font-medium flex items-center gap-1">
                  <span>✦ Set:</span>
                  <span className="text-[#5E564F]">{review.set}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
