import React, { useState } from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { CreditCard, CheckCircle2, Clock, DollarSign, Download, Filter, Receipt } from 'lucide-react';

export const PaymentsModule: React.FC = () => {
  const { appointments, updateAppointmentStatus, setReceiptModalAppointment } = useNailStudio();
  const [filter, setFilter] = useState<'all' | 'deposit_paid' | 'fully_paid'>('all');

  const filteredAppointments = appointments.filter((a) => {
    if (filter === 'all') return true;
    return a.paymentStatus === filter;
  });

  const totalRevenue = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + (a.paymentStatus === 'fully_paid' ? a.totalPriceKES : a.depositPaidKES), 0);

  const pendingCollection = appointments
    .filter((a) => a.status !== 'cancelled' && a.paymentStatus !== 'fully_paid')
    .reduce((sum, a) => sum + a.remainingBalanceKES, 0);

  const totalDeposits = appointments
    .filter((a) => a.status !== 'cancelled')
    .reduce((sum, a) => sum + a.depositPaidKES, 0);

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
            Financial Ledger & Invoicing
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
            Payments, Deposits & Balances
          </h1>
          <p className="text-sm text-[#6E6761] font-light mt-1">
            Track 30% online booking deposits, in-studio M-Pesa settlement, and outstanding client balances.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A] font-medium">Total Collected Revenue</span>
          <div className="font-editorial text-3xl font-normal text-emerald-800 mt-2">
            KES {totalRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#7A726A] mt-1 block">Deposits + studio completions</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A] font-medium">Pending Studio Balances</span>
          <div className="font-editorial text-3xl font-normal text-amber-700 mt-2">
            KES {pendingCollection.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#7A726A] mt-1 block">Due upon appointment checkout</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9]">
          <span className="text-xs text-[#7A726A] font-medium">Total 30% Online Deposits</span>
          <div className="font-editorial text-3xl font-normal text-[#1F1D1B] mt-2">
            KES {totalDeposits.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#7A726A] mt-1 block">Pre-paid security deposits</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'deposit_paid', 'fully_paid'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === tab
                  ? 'bg-[#1F1D1B] text-[#FAF8F5]'
                  : 'text-[#6E6761] hover:text-[#1F1D1B]'
              }`}
            >
              {tab === 'all' ? 'All Transactions' : tab === 'deposit_paid' ? 'Pending Balance' : 'Fully Settled'}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#8C6D46] uppercase tracking-wider font-semibold border-b border-[#E8E2D9]">
              <tr>
                <th className="px-5 py-3.5">Ref / Client</th>
                <th className="px-5 py-3.5">Session / Set</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Total (KES)</th>
                <th className="px-5 py-3.5">Deposit Paid</th>
                <th className="px-5 py-3.5">Remaining Bal</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE3]">
              {filteredAppointments.map((apt) => {
                const isPaid = apt.paymentStatus === 'fully_paid';
                return (
                  <tr key={apt.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-semibold text-[#1F1D1B] block">{apt.clientName}</span>
                      <span className="text-[10px] text-[#7A726A]">#{apt.bookingCode} · {apt.clientPhone}</span>
                    </td>
                    <td className="px-5 py-4 text-[#5E564F]">
                      {apt.designName || apt.serviceName}
                    </td>
                    <td className="px-5 py-4 text-[#7A726A]">
                      {apt.date}
                    </td>
                    <td className="px-5 py-4 font-bold text-[#1F1D1B]">
                      KES {apt.totalPriceKES.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-emerald-700 font-medium">
                      KES {apt.depositPaidKES.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 font-medium text-amber-700">
                      {isPaid ? 'KES 0' : `KES ${apt.remainingBalanceKES.toLocaleString()}`}
                    </td>
                    <td className="px-5 py-4">
                      {isPaid ? (
                        <span className="text-emerald-800 font-semibold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                        </span>
                      ) : (
                        <span className="text-amber-800 font-medium text-[11px] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Deposit Only
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setReceiptModalAppointment(apt)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                          title="View Official Receipt"
                        >
                          <Receipt className="w-4 h-4 text-[#8C6D46]" />
                        </button>

                        {!isPaid && (
                          <button
                            type="button"
                            onClick={() => updateAppointmentStatus(apt.id, 'completed', 'fully_paid')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-lg text-xs font-semibold"
                          >
                            Mark Settled
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
