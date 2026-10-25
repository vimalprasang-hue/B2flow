import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  DollarSign,
  TrendingUp,
  FileCheck,
  AlertCircle,
  Briefcase,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const AdminDashboardTab: React.FC = () => {
  const { clients, leads, contentItems, invoices, setAdminTab, setRole, setCurrentClientId } = useApp();

  const activeClients = clients.filter((c) => c.status === 'ACTIVE').length;
  const newLeadsCount = leads.filter((l) => l.status === 'NEW').length;
  const pendingApprovals = contentItems.filter((c) => c.status === 'Pending Client Approval').length;
  const unpaidInvoices = invoices.filter((i) => i.status === 'UNPAID');
  const outstandingAmount = unpaidInvoices.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            BUILD2FLOW DIGITAL AGENCY HEADQUARTERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Agency Operations Command
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Monitoring client growth metrics, pipeline volume, revenue collection, and creative approvals across Australia.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#E5B94F]/10 border border-[#E5B94F]/30 text-[#E5B94F] text-xs font-bold">
          <span>SUPER_ADMIN ACCESS • LEVEL 4</span>
        </div>
      </div>

      {/* Agency KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">Total Clients</span>
          <div className="text-2xl font-black text-white">{clients.length}</div>
          <span className="text-[10px] text-white/40 block">All Accounts</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">Active Clients</span>
          <div className="text-2xl font-black text-emerald-400">{activeClients}</div>
          <span className="text-[10px] text-emerald-400 font-bold block">Active Retainers</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">New Leads</span>
          <div className="text-2xl font-black text-[#E5B94F]">{newLeadsCount}</div>
          <span className="text-[10px] text-[#E5B94F] font-semibold block">Requires Follow-Up</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">Monthly Revenue</span>
          <div className="text-2xl font-black text-white">$42,800</div>
          <span className="text-[10px] text-emerald-400 font-bold block">+18% MoM</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">Outstanding Invoices</span>
          <div className="text-2xl font-black text-amber-400">${outstandingAmount.toLocaleString()}</div>
          <span className="text-[10px] text-white/50 block">{unpaidInvoices.length} Invoices</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">Pending Approvals</span>
          <div className="text-2xl font-black text-rose-400">{pendingApprovals}</div>
          <span className="text-[10px] text-white/50 block">Client Review</span>
        </div>
      </div>

      {/* Client Overview Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Active Retainer Clients</h3>
            <p className="text-xs text-white/50">Manage accounts, assign packages, or switch view</p>
          </div>
          <button
            onClick={() => setAdminTab('clients')}
            className="text-xs font-bold text-[#E5B94F] hover:underline flex items-center space-x-1"
          >
            <span>Open Client Directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-bold uppercase text-[10px]">
                <th className="pb-3">Client / Business</th>
                <th className="pb-3">Industry</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Package</th>
                <th className="pb-3">Total Leads</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">View Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={client.avatarUrl}
                        alt={client.businessName}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="font-bold text-white">{client.businessName}</h4>
                        <span className="text-[11px] text-white/50">{client.ownerName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-white/70">{client.industry}</td>
                  <td className="py-4 text-white/70">{client.location}</td>
                  <td className="py-4 font-bold text-[#E5B94F] uppercase">
                    {client.packageId.replace('package-', '')}
                  </td>
                  <td className="py-4 font-bold text-white">{client.metrics.totalLeads} leads</td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => {
                        setCurrentClientId(client.id);
                        setRole('CLIENT');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#121A27] hover:bg-[#1c273a] text-white text-xs font-bold border border-white/10"
                    >
                      Login as Client →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
