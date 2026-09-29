import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { InventoryItem } from '../../types/nailStudio';
import { Package, AlertCircle, Plus, Minus, Search, Check, RefreshCw, X } from 'lucide-react';

export const InventoryModule: React.FC = () => {
  const { inventory, updateInventoryStock, addInventoryItem } = useNailStudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form
  const [name, setName] = useState('');
  const [category, setCategory] = useState<InventoryItem['category']>('Gel Polishes');
  const [brand, setBrand] = useState('OPI Pro');
  const [stockQuantity, setStockQuantity] = useState(5);
  const [unit, setUnit] = useState('bottles');
  const [minThreshold, setMinThreshold] = useState(2);
  const [costPerUnitKES, setCostPerUnitKES] = useState(2200);

  const filteredItems = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = inventory.filter((i) => i.stockQuantity <= i.minThreshold).length;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addInventoryItem({
      name,
      category,
      brand,
      stockQuantity,
      unit,
      minThreshold,
      costPerUnitKES,
    });

    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Stock Management & Supplies
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Products & Inventory Tracking
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Monitor polishes, Apres tips, acrylic powders, chrome pigments, and builder gels.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stock Health Banner if low stock */}
      {lowStockCount > 0 && (
        <div className="bg-amber-50/80 border border-amber-300 p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">
                {lowStockCount} Products Below Restock Threshold
              </h4>
              <p className="text-[11px] text-amber-800 font-light mt-0.5">
                Certain acrylic powders and chrome pigments require reordering to avoid appointment shortages.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className="text-xs font-semibold text-amber-900 underline underline-offset-2 shrink-0"
          >
            Show All
          </button>
        </div>
      )}

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C6D46] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products or brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1F1D1B] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['all', 'Gel Polishes', 'Acrylic Powders', 'Tips & Forms', 'Chrome & Glitters', 'Builder Gels'] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                    : 'bg-[#FAF8F5] text-[#6E6761] hover:text-[#1F1D1B]'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#8C6D46] uppercase tracking-wider font-semibold border-b border-[#E8E2D9]">
              <tr>
                <th className="px-5 py-3.5">Product & Brand</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">In Stock</th>
                <th className="px-5 py-3.5">Threshold</th>
                <th className="px-5 py-3.5">Unit Cost (KES)</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE3]">
              {filteredItems.map((item) => {
                const isLow = item.stockQuantity <= item.minThreshold;
                return (
                  <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-[#1F1D1B] block">{item.name}</span>
                      <span className="text-[10px] text-[#7A726A]">{item.brand}</span>
                    </td>
                    <td className="px-5 py-4 text-[#5E564F]">
                      {item.category}
                    </td>
                    <td className="px-5 py-4 font-bold text-[#1F1D1B]">
                      {item.stockQuantity} {item.unit}
                    </td>
                    <td className="px-5 py-4 text-[#7A726A]">
                      Min {item.minThreshold} {item.unit}
                    </td>
                    <td className="px-5 py-4 text-[#1F1D1B]">
                      KES {item.costPerUnitKES.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      {isLow ? (
                        <span className="text-amber-800 font-semibold text-[11px] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Low Stock
                        </span>
                      ) : (
                        <span className="text-emerald-800 font-medium text-[11px] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Optimal
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateInventoryStock(item.id, item.stockQuantity - 1)}
                          className="w-7 h-7 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center text-stone-800 font-bold"
                          title="Decrease stock (1 unit used in service)"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-semibold text-xs min-w-8 text-center">{item.stockQuantity}</span>
                        <button
                          type="button"
                          onClick={() => updateInventoryStock(item.id, item.stockQuantity + 1)}
                          className="w-7 h-7 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center text-stone-800 font-bold"
                          title="Add restocked unit"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">Add Stock Item</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kiara Sky Rose Glaze Chrome"
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
                    <option value="Gel Polishes">Gel Polishes</option>
                    <option value="Acrylic Powders">Acrylic Powders</option>
                    <option value="Tips & Forms">Tips & Forms</option>
                    <option value="Chrome & Glitters">Chrome & Glitters</option>
                    <option value="Tools & Hygiene">Tools & Hygiene</option>
                    <option value="Builder Gels">Builder Gels</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Unit Type</label>
                  <input
                    type="text"
                    placeholder="bottles, pots, boxes"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Min Threshold</label>
                  <input
                    type="number"
                    value={minThreshold}
                    onChange={(e) => setMinThreshold(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Cost Per Unit (KES)</label>
                <input
                  type="number"
                  value={costPerUnitKES}
                  onChange={(e) => setCostPerUnitKES(Number(e.target.value))}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Register Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
