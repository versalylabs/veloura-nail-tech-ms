import React from 'react';
import { useNailStudio } from '../../context/NailStudioContext';
import { X, Printer, CheckCircle2, ShieldCheck, Download, Sparkles } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { receiptModalAppointment, setReceiptModalAppointment, settings, triggerNotification } = useNailStudio();

  if (!receiptModalAppointment) return null;

  const apt = receiptModalAppointment;
  const isPaid = apt.paymentStatus === 'fully_paid';
  const mpesaRef = `MPESA-${apt.bookingCode.replace('-', '')}X89`;

  const handlePrint = () => {
    try {
      window.print();
      triggerNotification('Print Dialog Triggered', 'Official receipt ready for printing or saving as PDF.', 'success');
    } catch (err) {
      console.error('Print Error:', err);
    }
  };

  const handleDownloadOfflineReceipt = () => {
    try {
      const receiptText = `
=====================================================
            ${settings.businessName.toUpperCase()}
          HAUTE NAIL ATELIER & DESIGN STUDIO
=====================================================
${settings.address}, ${settings.city}
Studio Phone: ${settings.phone}
Instagram: ${settings.instagram}

-----------------------------------------------------
OFFICIAL CLIENT RECEIPT & TRANSACTION LEDGER
-----------------------------------------------------
Booking Ref:         #${apt.bookingCode}
Date & Time:         ${apt.date} at ${apt.timeSlot}
Client Name:         ${apt.clientName}
Client Phone:        ${apt.clientPhone}
Lead Artist:         ${apt.technicianName}

-----------------------------------------------------
SERVICES & SPECIFICATIONS:
-----------------------------------------------------
Core Service:        ${apt.serviceName}
Design Artwork:      ${apt.designName || 'Classic Atelier Finish'}
Shape & Length:      ${apt.shape} (${apt.length})
Special Notes:       ${apt.specialNotes || 'None'}

-----------------------------------------------------
FINANCIAL BREAKDOWN:
-----------------------------------------------------
Subtotal:            KES ${apt.totalPriceKES.toLocaleString()}
Deposit Paid (30%):  KES ${apt.depositPaidKES.toLocaleString()} [PAID via M-Pesa ${mpesaRef}]
Remaining Balance:   KES ${isPaid ? '0 (Fully Settled)' : `${apt.remainingBalanceKES.toLocaleString()} DUE ON APPOINTMENT`}
Payment Status:      ${isPaid ? 'COMPLETED / FULLY PAID' : 'DEPOSIT SECURED / CONFIRMED'}

-----------------------------------------------------
LOYALTY & GUARANTEE:
-----------------------------------------------------
Loyalty Reward:      +${Math.floor(apt.totalPriceKES / 100) * 10} Atelier Points Credited
Warranty:            Complimentary 7-Day Retention & Apres Check
Aftercare:           ${settings.aftercareAdvice}

=====================================================
  Thank you for choosing ${settings.businessName}!
=====================================================
Generated electronically on: ${new Date().toLocaleString()}
`.trim();

      const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Veloura_Receipt_${apt.bookingCode}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      triggerNotification('Receipt Saved', `Downloaded Veloura_Receipt_${apt.bookingCode}.txt`, 'success');
    } catch (e) {
      console.error('Download Receipt Error:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 print:p-0 print:bg-white animate-in fade-in duration-200">
      <div 
        id="printable-receipt"
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E8E2D9] relative my-6 text-left print:shadow-none print:border-none print:w-full print:my-0"
      >
        
        {/* Header with Print, Download & Close controls (hidden during actual print) */}
        <div className="bg-[#FAF8F5] px-4 sm:px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between print:hidden">
          <div>
            <span className="text-xs font-semibold text-[#8C6D46] uppercase tracking-wider block">
              Official Atelier Receipt
            </span>
            <span className="text-[10px] text-stone-500">
              Ref: #{apt.bookingCode}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleDownloadOfflineReceipt}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-white border border-[#E8E2D9] hover:bg-stone-100 rounded-lg text-xs font-medium text-[#1F1D1B] flex items-center gap-1.5 shadow-xs"
              title="Download text copy"
            >
              <Download className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-[#1F1D1B] hover:bg-[#342F2C] text-[#FAF8F5] rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={() => setReceiptModalAppointment(null)}
              className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-700 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-5 sm:p-8 space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Studio Brand Header */}
          <div className="text-center pb-6 border-b border-[#E8E2D9] space-y-1">
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1F1D1B] font-normal leading-tight">
              {settings.businessName}
            </h2>
            <p className="text-xs text-[#8C6D46] tracking-widest uppercase font-semibold">
              {settings.tagline}
            </p>
            <p className="text-[11px] text-[#7A726A] font-light">
              {settings.address}, {settings.city} · {settings.phone}
            </p>
          </div>

          {/* Transaction Metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs text-[#5E564F]">
            <div>
              <span className="text-[10px] uppercase text-[#7A726A] block">Booking Ref:</span>
              <strong className="text-sm font-semibold text-[#1F1D1B]">#{apt.bookingCode}</strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-[#7A726A] block">Payment Gateway:</span>
              <span className="font-mono text-xs font-semibold text-emerald-800">{mpesaRef}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#7A726A] block">Client Name:</span>
              <span className="font-medium text-[#1F1D1B]">{apt.clientName}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-[#7A726A] block">Date & Time:</span>
              <span className="text-[#1F1D1B]">{apt.date} at {apt.timeSlot}</span>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border-t border-b border-[#E8E2D9] py-4 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#1F1D1B]">
              <span>Description</span>
              <span>Amount</span>
            </div>
            
            <div className="flex justify-between text-xs text-[#5E564F] pt-1">
              <div>
                <span className="block font-medium text-[#1F1D1B]">{apt.designName || apt.serviceName}</span>
                <span className="text-[11px] text-[#7A726A]">{apt.shape} Shape · {apt.length} Length · Artist {apt.technicianName}</span>
              </div>
              <span className="font-semibold text-[#1F1D1B]">KES {apt.totalPriceKES.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Breakdown Math */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#5E564F]">
              <span>Subtotal:</span>
              <span>KES {apt.totalPriceKES.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-emerald-800 font-semibold">
              <span>30% Online Deposit Paid (M-Pesa Till {settings.mpesaTillNumber}):</span>
              <span>- KES {apt.depositPaidKES.toLocaleString()} ✓</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#1F1D1B] pt-2 border-t border-[#E8E2D9]">
              <span>Remaining Balance:</span>
              <span className={isPaid ? 'text-emerald-800' : 'text-amber-800'}>
                {isPaid ? 'KES 0 (Settled in Full)' : `KES ${apt.remainingBalanceKES.toLocaleString()} Due`}
              </span>
            </div>
          </div>

          {/* Loyalty & Health Warranty */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E2D9] text-[11px] text-[#5E564F] space-y-1">
            <div className="flex items-center justify-between font-semibold text-[#8C6D46]">
              <span>Loyalty Points Credited:</span>
              <span>+{Math.floor(apt.totalPriceKES / 100) * 10} Points</span>
            </div>
            <p className="font-light text-[10px] text-[#7A726A]">
              Thank you for trusting Veloura Nails. All gel sets include our complimentary 7-day retention check guarantee.
            </p>
          </div>

          {/* Footer Notice */}
          <div className="text-center text-[10px] text-[#8C6D46] uppercase tracking-wider font-semibold pt-2">
            Veloura Nails · Mirage Towers Westlands · Nairobi
          </div>

        </div>

      </div>
    </div>
  );
};
