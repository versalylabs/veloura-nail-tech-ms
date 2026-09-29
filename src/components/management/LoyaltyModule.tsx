import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { Gift, Plus, Award, Users, CheckCircle2, X } from 'lucide-react';

export const LoyaltyModule: React.FC = () => {
  const { loyaltyRewards, addLoyaltyReward, clients, redeemLoyaltyPoints } = useNailStudio();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [selectedRewardId, setSelectedRewardId] = useState<string>(loyaltyRewards[0]?.id || '');

  // Form
  const [rewardName, setRewardName] = useState('');
  const [pointsCost, setPointsCost] = useState(250);
  const [description, setDescription] = useState('');
  const [valueDescription, setValueDescription] = useState('Value KES 800');

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardName.trim()) return;

    addLoyaltyReward({
      name: rewardName,
      pointsCost: Number(pointsCost),
      description,
      valueDescription,
    });

    setIsAddModalOpen(false);
    setRewardName('');
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId || !selectedRewardId) return;
    redeemLoyaltyPoints(selectedClientId, selectedRewardId);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Client Retention & VIP Incentives
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Loyalty Program & Rewards
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Clients earn 10 points for every KES 100 spent on services and retail sets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>New Loyalty Tier / Reward</span>
        </button>
      </div>

      {/* Program Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A]">Earning Rule</span>
          <div className="font-editorial text-2xl font-normal text-[#1F1D1B] mt-1">
            10 Pts / KES 100
          </div>
          <span className="text-[10px] text-emerald-700 mt-1 block">Automatic sync with appointments</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A]">Enrolled VIP Clients</span>
          <div className="font-editorial text-2xl font-normal text-[#1F1D1B] mt-1">
            {clients.length} Members
          </div>
          <span className="text-[10px] text-[#8C6D46] mt-1 block">All registered clients accrue points</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A]">Welcome Bonus</span>
          <div className="font-editorial text-2xl font-normal text-[#1F1D1B] mt-1">
            50 Points Bonus
          </div>
          <span className="text-[10px] text-[#7A726A] mt-1 block">Credited upon first profile creation</span>
        </div>
      </div>

      {/* Main Grid: Rewards Catalog & In-Studio Redemption Station */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Rewards Catalog (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
            Active Redeemable Rewards ({loyaltyRewards.length})
          </h3>

          <div className="space-y-3">
            {loyaltyRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-xs flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-editorial text-xl font-normal text-[#1F1D1B]">{reward.name}</h4>
                    <span className="text-xs font-semibold text-[#8C6D46] bg-[#FAF8F5] border border-[#E8E2D9] px-2 py-0.5 rounded">
                      {reward.pointsCost} Pts
                    </span>
                  </div>
                  <p className="text-xs text-[#6E6761] mt-1 font-light leading-relaxed">
                    {reward.description}
                  </p>
                  <span className="text-[10px] text-[#8C6D46] font-medium mt-1.5 block">
                    ✦ {reward.valueDescription}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Redeem Station (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
            In-Studio Redemption
          </h3>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs">
            <p className="text-xs text-[#6E6761] font-light mb-4">
              Apply a reward directly to an in-studio client's set during checkout.
            </p>

            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Select Client</label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.loyaltyPoints} Pts)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Select Reward</label>
                <select
                  value={selectedRewardId}
                  onChange={(e) => setSelectedRewardId(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3 py-2 text-xs text-[#1F1D1B]"
                >
                  {loyaltyRewards.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.pointsCost} Pts
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Apply Reward to Visit
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Add Reward Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6">
            <div className="bg-white px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
              <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">Add Loyalty Incentive</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#1F1D1B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateReward} className="p-6 space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Reward Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Chrome Accent on 2 Nails"
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Points Required</label>
                  <input
                    type="number"
                    min={50}
                    step={25}
                    value={pointsCost}
                    onChange={(e) => setPointsCost(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Value Description</label>
                  <input
                    type="text"
                    value={valueDescription}
                    onChange={(e) => setValueDescription(e.target.value)}
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-3.5 py-2 text-xs text-[#1F1D1B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1F1D1B] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  Save Reward
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
