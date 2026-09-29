import React, { useState, useMemo } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { NailCategory, NailDesign, NailShape } from '../../types/nailStudio';
import { DesignDetailModal } from './DesignDetailModal';
import { 
  Sparkles, 
  ArrowLeft, 
  Search, 
  Filter, 
  Clock, 
  ArrowUpRight, 
  Heart, 
  ShieldCheck, 
  Calendar,
  Settings
} from 'lucide-react';

export const FullLookbookPage: React.FC = () => {
  const { 
    designs, 
    setCurrentView, 
    setDashboardTab, 
    startBookingFlow, 
    settings 
  } = useNailStudio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NailCategory>('All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [selectedDesignForDetail, setSelectedDesignForDetail] = useState<NailDesign | null>(null);

  const categories: NailCategory[] = [
    'All',
    'French',
    'Chrome',
    'Floral',
    'Luxury',
    'Minimal',
    'Custom Art',
    'Acrylic',
    'Gel',
  ];

  const shapes = ['All', 'Almond', 'Coffin', 'Square', 'Squoval', 'Stiletto', 'Oval'];

  const filteredDesigns = useMemo(() => {
    return designs.filter((d) => {
      // Category filter
      if (selectedCategory !== 'All' && d.category !== selectedCategory) {
        return false;
      }
      // Shape filter
      if (selectedShape !== 'All' && d.shapeRecommendation !== selectedShape) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = d.title.toLowerCase().includes(query);
        const matchesDesc = d.description.toLowerCase().includes(query);
        const matchesTag = d.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });
  }, [designs, selectedCategory, selectedShape, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B] flex flex-col text-left animate-in fade-in duration-300">
      
      {/* Top Banner Navigation */}
      <div className="bg-[#191716] text-[#EFE9E1] px-4 py-3 border-b border-[#2E2A27]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentView('website')}
            className="flex items-center gap-2 text-xs font-medium text-[#C5A880] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Main Website</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentView('management');
              setDashboardTab('designs');
            }}
            className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Nail Tech: Manage Designs in Portal</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="py-12 sm:py-16 bg-[#F6F3EE] border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D46] font-semibold block mb-2">
              Archival Portfolio & Client Sets
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1F1D1B] font-normal tracking-tight leading-tight">
              Complete Design Lookbook
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#6E6761] font-light leading-relaxed">
              Explore every hand-sculpted set and bespoke nail art created by {settings.businessName}. Every look can be tailored to your anatomical nail shape and length during your booking.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="sticky top-[37px] z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Pills (Zero-Pill discipline compliant) */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#1F1D1B] text-[#FAF8F5] font-semibold shadow-xs'
                      : 'bg-white text-[#6E6761] hover:text-[#1F1D1B] border border-[#E8E2D9]'
                  }`}
                >
                  {cat === 'All' ? 'All Collections' : cat}
                </button>
              ))}
            </div>

            {/* Search Input & Shape Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search styles, tags, colors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E8E2D9] rounded-lg text-[#1F1D1B] focus:outline-none focus:border-[#8C6D46]"
                />
              </div>

              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="bg-white border border-[#E8E2D9] text-xs text-[#1F1D1B] rounded-lg px-2.5 py-1.5"
              >
                {shapes.map((s) => (
                  <option key={s} value={s}>{s === 'All' ? 'All Shapes' : `${s} Shape`}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="text-xs text-[#7A726A] flex items-center justify-between">
            <span>Showing {filteredDesigns.length} archival sets</span>
            <span className="text-[11px] text-[#8C6D46]">✦ Click any design to view details & book</span>
          </div>

        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1">
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E2D9] max-w-lg mx-auto p-8">
            <Sparkles className="w-8 h-8 text-[#C5A880] mx-auto mb-3" />
            <h3 className="font-editorial text-2xl text-[#1F1D1B]">No matching designs found</h3>
            <p className="text-xs text-[#7A726A] mt-1 font-light">
              Try adjusting your category filter or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedShape('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#1F1D1B] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => setSelectedDesignForDetail(design)}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                    <img
                      src={design.photos[0] || 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white">
                      <span className="text-xs font-medium uppercase tracking-wider flex items-center gap-1">
                        <span>Inspect Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Category Label */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-[#8C6D46]">
                      {design.category}
                    </div>

                    {design.isFeatured && (
                      <div className="absolute top-3 right-3 bg-[#C5A880] text-[#1F1D1B] px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">
                        ★ Featured
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-[#8C6D46] font-semibold">
                      <span>KES {design.priceKES.toLocaleString()}</span>
                      <span className="text-[#7A726A] flex items-center gap-1 font-normal text-[11px]">
                        <Clock className="w-3 h-3 text-[#8C6D46]" />
                        ~{design.durationMinutes} mins
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-normal text-[#1F1D1B] mt-1 group-hover:text-[#8C6D46] transition-colors line-clamp-1">
                      {design.title}
                    </h3>

                    <p className="text-xs text-[#6E6761] mt-1 line-clamp-2 font-light">
                      {design.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-2.5 flex items-center gap-1 text-[10px] text-[#8A827A] flex-wrap">
                      {design.shapeRecommendation && (
                        <span>Rec: {design.shapeRecommendation} · </span>
                      )}
                      {design.tags.slice(0, 3).map((t) => (
                        <span key={t}>#{t} </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Book Action Footer */}
                <div className="p-3 bg-[#FAF8F5] border-t border-[#F0EBE3] flex items-center justify-between">
                  <span className="text-[11px] text-[#7A726A] font-light">
                    Available for Booking
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startBookingFlow(design);
                    }}
                    className="bg-[#1F1D1B] hover:bg-[#342F2C] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <span>Book Style</span>
                    <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Modal for Details */}
      {selectedDesignForDetail && (
        <DesignDetailModal
          design={selectedDesignForDetail}
          onClose={() => setSelectedDesignForDetail(null)}
          onBook={(design: NailDesign) => {
            setSelectedDesignForDetail(null);
            startBookingFlow(design);
          }}
        />
      )}

      {/* Footer Return */}
      <footer className="bg-[#191716] text-[#EFE9E1] py-8 border-t border-[#2A2624] text-center text-xs">
        <button
          type="button"
          onClick={() => setCurrentView('website')}
          className="text-[#C5A880] hover:text-white underline mb-2"
        >
          &larr; Back to {settings.businessName} Main Page
        </button>
        <p className="text-stone-500 font-light">
          {settings.address}, {settings.city} · {settings.phone}
        </p>
      </footer>

    </div>
  );
};
