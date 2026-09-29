import React from 'react';
import { INSTAGRAM_POSTS } from '../../data/initialData';
import { Instagram, Heart, ExternalLink } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs tracking-[0.2em] uppercase text-[#8C6D46] font-semibold mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>@michelle.nails.atelier</span>
            </div>
            <h3 className="font-editorial text-3xl text-[#1F1D1B] font-normal">
              Follow Our Daily Artistry
            </h3>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1F1D1B]/30 hover:border-[#1F1D1B] text-[#1F1D1B] px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <span>View on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 shadow-sm cursor-pointer"
            >
              <img
                src={post.image}
                alt="Instagram nail art post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white text-center">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[11px] mt-2 line-clamp-3 text-white/90 font-light">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
