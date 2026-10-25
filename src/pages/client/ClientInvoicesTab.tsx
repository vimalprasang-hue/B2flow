import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice } from '../../types';
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  DollarSign,
  Printer,
  X,
} from 'lucide-react';

export const ClientInvoicesTab: React.FC = () => {
  const { invoices, currentClient, markInvoicePaid, showToast } = useApp();

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const clientInvoices = invoices.filter(
    (inv) => inv.clientId === currentClient.id || !inv.clientId
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            ACCOUNTING & BILLING
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Invoices & Statements
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Australian tax invoices compliant with ATO regulations (10% GST).
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="p-3 rounded-xl bg-[#121A27] border border-white/10 text-center">
            <span className="text-[10px] text-white/50 block">Current Balance</span>
            <span className="text-lg font-bold text-white">$3,674.00 AUD</span>
          </div>
        </div>
      </div>

      {/* Invoice list */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">Billing History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Invoice Number</th>
                <th className="pb-3">Issued Date</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3">Subtotal</th>
                <th className="pb-3">GST (10%)</th>
                <th className="pb-3">Total (AUD)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clientInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 font-bold text-white flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#E5B94F]" />
                    <span>{inv.invoiceNumber}</span>
                  </td>
                  <td className="py-4 text-white/60">{inv.issueDate}</td>
                  <td className="py-4 text-white/60">{inv.dueDate}</td>
                  <td className="py-4 text-white/80">${inv.subtotal.toFixed(2)}</td>
                  <td className="py-4 text-white/80">${inv.gst.toFixed(2)}</td>
                  <td className="py-4 font-bold text-white">${inv.total.toFixed(2)}</td>
                  <td className="py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        inv.status === 'PAID'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : inv.status === 'UNPAID'
                          ? 'bg-[#E5B94F]/20 text-[#E5B94F] border border-[#E5B94F]/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 rounded-lg bg-[#121A27] text-white hover:bg-[#1c273a] font-bold text-[11px] border border-white/10"
                    >
                      View Invoice
                    </button>
                    {inv.status === 'UNPAID' && (
                      <button
                        onClick={() => markInvoicePaid(inv.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#E5B94F] text-black font-extrabold text-[11px] uppercase hover:bg-[#d6aa3f]"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0D1420] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xl font-black text-white">
                  BUILD<span className="text-[#E5B94F]">2</span>FLOW
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/50 block">
                  DIGITAL PTY LTD
                </span>
                <span className="text-[10px] text-white/40">ABN: 49 618 902 441</span>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-lg text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-between items-start text-xs">
              <div>
                <span className="text-white/40 block font-bold uppercase text-[10px]">Billed To:</span>
                <h4 className="font-bold text-white text-sm">{selectedInvoice.clientName}</h4>
                <p className="text-white/60">{currentClient.email}</p>
                <p className="text-white/60">{currentClient.location}</p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-sm font-black text-[#E5B94F] block">
                  {selectedInvoice.invoiceNumber}
                </span>
                <p className="text-white/50">Issued: {selectedInvoice.issueDate}</p>
                <p className="text-white/50">Due: {selectedInvoice.dueDate}</p>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold text-[10px]">
                  STATUS: {selectedInvoice.status}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121A27] text-white/40 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {selectedInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3 text-white">{item.description}</td>
                      <td className="p-3 text-center text-white/60">{item.quantity}</td>
                      <td className="p-3 text-right text-white/80">${item.unitPrice.toFixed(2)}</td>
                      <td className="p-3 text-right font-bold text-white">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-xs text-right max-w-xs ml-auto pt-2">
              <div className="flex justify-between text-white/60">
                <span>Subtotal:</span>
                <span>${selectedInvoice.subtotal.toFixed(2)} AUD</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>GST (10%):</span>
                <span>${selectedInvoice.gst.toFixed(2)} AUD</span>
              </div>
              <div className="flex justify-between font-black text-sm text-[#E5B94F] border-t border-white/10 pt-2">
                <span>Total Due:</span>
                <span>${selectedInvoice.total.toFixed(2)} AUD</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-[11px] text-white/40">
                Bank Transfer: BSB 062-000 • ACC 1928 4819 • Ref: {selectedInvoice.invoiceNumber}
              </span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#121A27] text-white text-xs font-bold hover:bg-[#1c273a] flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
