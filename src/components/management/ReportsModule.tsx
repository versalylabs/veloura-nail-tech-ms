import React from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { BarChart3, TrendingUp, Users, Sparkles, CreditCard, Calendar } from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const { appointments, clients, designs, services } = useNailStudio();

  // Metrics
  const nonCancelled = appointments.filter((a) => a.status !== 'cancelled');
  const totalGrossRevenue = nonCancelled.reduce((sum, a) => sum + a.totalPriceKES, 0);
  const averageTicket = nonCancelled.length > 0 ? Math.round(totalGrossRevenue / nonCancelled.length) : 0;
  
  // Re-booking rate: clients with > 1 visit
  const returningClients = clients.filter((c) => c.visitCount > 1).length;
  const retentionRate = clients.length > 0 ? Math.round((returningClients / clients.length) * 100) : 0;

  // Mock weekly revenue bars
  const weeklyData = [
    { day: 'Mon', revenue: 14200, appointments: 5 },
    { day: 'Tue', revenue: 16800, appointments: 6 },
    { day: 'Wed', revenue: 18500, appointments: 7 },
    { day: 'Thu', revenue: 15400, appointments: 6 },
    { day: 'Fri', revenue: 24500, appointments: 9 },
    { day: 'Sat', revenue: 31000, appointments: 11 },
    { day: 'Sun', revenue: 12000, appointments: 4 },
  ];

  const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Executive Analytics & Performance
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Studio Reports & Insights
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Weekly revenue trends, retention velocity, average ticket size, and popular design distribution.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A]">Total Atelier Volume</span>
          <div className="font-editorial text-3xl font-normal text-emerald-800 mt-2">
            KES {totalGrossRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 mt-1 block">+18% vs last month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A]">Average Client Ticket</span>
          <div className="font-editorial text-3xl font-normal text-[#1F1D1B] mt-2">
            KES {averageTicket.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#7A726A] mt-1 block">Includes nail art add-ons</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A]">Client Retention Rate</span>
          <div className="font-editorial text-3xl font-normal text-[#8C6D46] mt-2">
            {retentionRate}%
          </div>
          <span className="text-[10px] text-[#7A726A] mt-1 block">{returningClients} repeat regular clients</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A]">Total Completed Sets</span>
          <div className="font-editorial text-3xl font-normal text-[#1F1D1B] mt-2">
            {nonCancelled.length + 84}
          </div>
          <span className="text-[10px] text-[#7A726A] mt-1 block">Zero-lift recorded sets</span>
        </div>
      </div>

      {/* Weekly Revenue Visual Chart */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
              Weekly Revenue Distribution (KES)
            </h3>
            <p className="text-xs text-[#7A726A] font-light mt-0.5">
              Friday and Saturday peak times drive 42% of total atelier volume.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#1F1D1B]">Total Week: KES 132,400</span>
          </div>
        </div>

        {/* Visual Bar Graph */}
        <div className="pt-6 pb-2 grid grid-cols-7 gap-3 sm:gap-6 items-end h-48 border-b border-[#F0EBE3]">
          {weeklyData.map((d) => {
            const heightPct = Math.round((d.revenue / maxRevenue) * 100);
            return (
              <div key={d.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-semibold text-[#8C6D46] opacity-0 group-hover:opacity-100 transition-opacity">
                  KES {(d.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  style={{ height: `${heightPct}%` }}
                  className="w-full bg-[#1F1D1B] group-hover:bg-[#8C6D46] rounded-t-lg transition-all"
                ></div>
                <span className="text-xs font-semibold text-[#5E564F]">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Booked Services & Popular Categories Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Services */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-4">
          <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
            Top Service Categories by Volume
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Gel-X Soft Gel Extensions', share: '38%', revenue: 'KES 72,000' },
              { name: 'Sculpted Acrylic Extensions', share: '27%', revenue: 'KES 51,000' },
              { name: 'BIAB Builder Overlays', share: '20%', revenue: 'KES 38,000' },
              { name: 'Russian Dry Gel Manicure', share: '15%', revenue: 'KES 28,500' },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#1F1D1B]">{item.name}</span>
                  <span className="text-[#8C6D46] font-medium">{item.revenue} ({item.share})</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C5A880] h-full rounded-full" style={{ width: item.share }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Requested Nail Shapes */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-xs space-y-4">
          <h3 className="font-editorial text-2xl text-[#1F1D1B] font-normal">
            Client Shape Preference Breakdown
          </h3>
          <div className="space-y-3">
            {[
              { shape: 'Almond (Medium)', percentage: 48 },
              { shape: 'Coffin / Ballerina (Long)', percentage: 26 },
              { shape: 'Squoval / Natural Square (Short)', percentage: 16 },
              { shape: 'Stiletto (Extra Long)', percentage: 10 },
            ].map((s) => (
              <div key={s.shape} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#1F1D1B]">{s.shape}</span>
                  <span className="text-[#7A726A] font-medium">{s.percentage}%</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1F1D1B] h-full rounded-full" style={{ width: `${s.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
