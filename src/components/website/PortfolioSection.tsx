import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Sparkles, ArrowUpRight, Camera, ArrowRight, Grid } from 'lucide-react';
import { LiquidGlassSurface } from '../ui/LiquidGlassSurface';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'Chrome' | 'Extensions' | 'BIAB' | 'Art';
  image: string;
  technician: string;
  shape: string;
  notes: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Liquid Platinum French Almond Set',
    category: 'Chrome',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    technician: 'Michelle Mwangi',
    shape: 'Medium Almond',
    notes: 'Apres Gel-X extensions with mirror chrome French cuffs.',
  },
  {
    id: 'p2',
    title: 'Blush Airbrushed Aura with Star Accents',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    technician: 'Michelle Mwangi',
    shape: 'Long Coffin',
    notes: 'Dual gradient aura with fine silver micro-crystals.',
  },
  {
    id: 'p3',
    title: 'Deep Magnetic Emerald Crushed Velvet',
    category: 'Chrome',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    technician: 'Michelle Mwangi',
    shape: 'Sculpted Coffin',
    notes: 'Multi-angle cat-eye magnetic gel with 18k gold leaf.',
  },
  {
    id: 'p4',
    title: 'Glazed Hailey Pearl Clean Manicure',
    category: 'BIAB',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
    technician: 'Claire Achieng',
    shape: 'Short Squoval',
    notes: 'Structured natural nail overlay with iridescent glaze powder.',
  },
  {
    id: 'p5',
    title: 'Bordeaux High-Shine Stiletto Acrylics',
    category: 'Extensions',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    technician: 'Michelle Mwangi',
    shape: 'Extra Long Stiletto',
    notes: 'Full hand-sculpted acrylics in rich cherry bordeaux.',
  },
  {
    id: 'p6',
    title: 'Hand-Painted Wildflower Botanical Stems',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    technician: 'Michelle Mwangi',
    shape: 'Medium Oval',
    notes: 'Micro-brush floral artistry on semi-sheer milky canvas.',
  },
];

export const PortfolioSection: React.FC = () => {
  const { startBookingFlow, beforeAfterPortfolio, setCurrentView } = useNailStudio();
  const [filter, setFilter] = useState<'All' | 'Chrome' | 'Extensions' | 'BIAB' | 'Art' | 'BeforeAfter'>('All');

  const publicBeforeAfter = beforeAfterPortfolio.filter((item) => item.featuredInPublicGallery);

  const filteredItems = filter === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#F6F3EE] border-b border-[#E8E2D9] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8C6D46] font-semibold mb-2">
              <span className="w-6 h-[1px] bg-[#8C6D46]"></span>
              <span>Client Transformations</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#1F1D1B] font-normal tracking-tight">
              Atelier Portfolio & Gallery
            </h2>
            <p className="mt-2 text-sm text-[#6E6761] font-light max-w-lg">
              A curated lookbook of recent sets completed in studio. Every shape, apex, and finish is customized to client preference.
            </p>
          </div>

          {/* Interactive filter segmented controls (Zero-Pill discipline compliant) */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E8E2D9] self-start md:self-auto flex-wrap">
            {(['All', 'Chrome', 'Extensions', 'BIAB', 'Art', 'BeforeAfter'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filter === tab
                    ? 'bg-[#1F1D1B] text-[#FAF8F5] shadow-xs font-semibold'
                    : 'text-[#6E6761] hover:text-[#1F1D1B]'
                }`}
              >
                {tab === 'All' ? 'All Sets' : tab === 'BeforeAfter' ? '✦ Before & After' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Before & After Tab Rendering */}
        {filter === 'BeforeAfter' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {publicBeforeAfter.map((ba) => (
              <div
                key={ba.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#E8E2D9] text-left flex flex-col justify-between"
              >
                <div className="grid grid-cols-2 relative bg-stone-100">
                  <div className="relative aspect-[4/5] overflow-hidden border-r border-white">
                    <img src={ba.beforePhoto} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] uppercase px-1.5 py-0.5 rounded font-bold">
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={ba.afterPhoto} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-[#8C6D46] text-white text-[9px] uppercase px-1.5 py-0.5 rounded font-bold">
                      After
                    </span>
                  </div>
                </div>

                <div className="p-4 border-t border-[#F0EBE3]">
                  <div className="flex items-center justify-between text-xs text-[#8C6D46] font-semibold">
                    <span>{ba.shape} ({ba.length})</span>
                    <span className="text-[#8A827A] font-light">{ba.serviceName}</span>
                  </div>
                  <h4 className="font-editorial text-lg text-[#1F1D1B] mt-1 font-normal leading-tight">
                    {ba.title}
                  </h4>
                  <p className="text-[11px] text-[#6E6761] mt-1 line-clamp-2 font-light">
                    {ba.transformationNotes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Standard Gallery Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#E8E2D9] text-left flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Overlay details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#E8D7C8] font-medium">{item.shape}</span>
                    <p className="text-xs text-white/90 mt-1 font-light">{item.notes}</p>
                    
                    <button
                      type="button"
                      onClick={() => startBookingFlow()}
                      className="mt-4 bg-white text-[#1F1D1B] px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-[#FAF8F5]"
                    >
                      <span>Request Similar Style</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 border-t border-[#F0EBE3]">
                  <div className="flex items-center justify-between text-xs text-[#8C6D46]">
                    <span className="font-semibold">{item.shape}</span>
                    <span className="text-[#8A827A] font-light">By {item.technician}</span>
                  </div>
                  <h4 className="font-editorial text-lg text-[#1F1D1B] mt-1 font-normal leading-tight group-hover:text-[#8C6D46] transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Explore More Designs Banner with Liquid Glass Effect */}
        <div className="mt-14 pt-8 border-t border-[#E8E2D9] flex justify-center">
          <LiquidGlassSurface
            tint="champagne"
            blur={16}
            backgroundOpacity={0.65}
            distortionScale={12}
            className="w-full max-w-xl p-6 sm:p-8 rounded-2xl text-center shadow-lg border border-white/60"
          >
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C6D46] font-semibold block">
                Atelier Catalog · Continuous Archive
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1F1D1B] font-normal leading-tight">
                Curated Haute Nail Artistry
              </h3>
              <p className="text-xs text-[#6E6761] font-light max-w-md mx-auto">
                Explore every hand-sculpted set, chrome variation, and custom French nuance in our full archival lookbook.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentView('lookbook');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A880] group-hover:rotate-12 transition-transform" />
                  <span>Explore Archival Lookbook</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </LiquidGlassSurface>
        </div>

      </div>
    </section>
  );
};
