import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lead,
  LeadStatus,
  LeadSource,
} from '../../types';
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  CheckCircle2,
  DollarSign,
  User,
  Trash2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ClientLeadsTab: React.FC = () => {
  const { leads, updateLeadStatus, addLead, deleteLead, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New lead form state
  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    businessType: 'Custom Builder',
    location: 'Sydney, NSW',
    source: 'Website' as LeadSource,
    notes: '',
    assignedStaff: 'Liam Hemsworth',
    budget: '$3,000 - $5,000 / mo',
  });

  const columns: { status: LeadStatus; label: string; color: string }[] = [
    { status: 'NEW', label: 'NEW', color: 'border-blue-500/40 text-blue-400 bg-blue-500/10' },
    { status: 'CONTACTED', label: 'CONTACTED', color: 'border-purple-500/40 text-purple-400 bg-purple-500/10' },
    { status: 'QUALIFIED', label: 'QUALIFIED', color: 'border-[#E5B94F]/40 text-[#E5B94F] bg-[#E5B94F]/10' },
    { status: 'PROPOSAL SENT', label: 'PROPOSAL SENT', color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
    { status: 'WON', label: 'WON', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
    { status: 'LOST', label: 'LOST', color: 'border-red-500/40 text-red-400 bg-red-500/10' },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);

    const matchesSource =
      sourceFilter === 'All' ? true : lead.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name) return;
    addLead({
      ...newLead,
      status: 'NEW',
    });
    setShowAddModal(false);
    setNewLead({
      name: '',
      phone: '',
      email: '',
      business: '',
      businessType: 'Custom Builder',
      location: 'Sydney, NSW',
      source: 'Website',
      notes: '',
      assignedStaff: 'Liam Hemsworth',
      budget: '$3,000 - $5,000 / mo',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            TRADE PIPELINE CRM
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Leads & Enquiry Pipeline
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Manage incoming phone enquiries, quote requests, and won build contracts across all channels.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md shadow-[#E5B94F]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0D1420] p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone or business..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#E5B94F]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          <span className="text-xs text-white/50">Source:</span>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E5B94F]"
          >
            <option value="All">All Sources</option>
            <option value="Website">Website</option>
            <option value="Google">Google</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
        {columns.map((col) => {
          const colLeads = filteredLeads.filter((l) => l.status === col.status);

          return (
            <div
              key={col.status}
              className="rounded-2xl bg-[#0D1420] border border-white/10 p-3.5 space-y-3 min-w-[240px] flex flex-col justify-between"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded border ${col.color}`}>
                  {col.label}
                </span>
                <span className="text-xs font-bold text-white/60">{colLeads.length}</span>
              </div>

              {/* Leads cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                {colLeads.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-[11px] text-white/30">
                    No leads in this stage
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-[#121A27] border border-white/5 hover:border-[#E5B94F]/40 transition-all space-y-2.5 shadow-sm group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                          <p className="text-[11px] text-white/60">{lead.business}</p>
                        </div>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="text-white/30 hover:text-red-400 p-1 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-1 text-[11px] text-white/70">
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3 h-3 text-[#E5B94F]" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Mail className="w-3 h-3 text-white/40" />
                          <span className="truncate">{lead.email}</span>
                        </div>
                      </div>

                      {lead.notes && (
                        <p className="text-[10px] text-white/50 bg-[#080D16] p-2 rounded-lg line-clamp-2">
                          {lead.notes}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-white/40">
                        <span className="px-1.5 py-0.5 rounded bg-black/40 text-white/70">
                          {lead.source}
                        </span>
                        <span>{lead.date}</span>
                      </div>

                      {/* Move status picker */}
                      <div className="pt-1">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="w-full text-[10px] py-1 px-2 rounded-lg bg-[#080D16] text-[#E5B94F] border border-white/10 font-bold focus:outline-none"
                        >
                          {columns.map((c) => (
                            <option key={c.status} value={c.status}>
                              Move to: {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white">Add New Customer Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Business</label>
                  <input
                    type="text"
                    value={newLead.business}
                    onChange={(e) => setNewLead({ ...newLead, business: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/70 mb-1">Source</label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value as LeadSource })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-xs text-white"
                  >
                    <option value="Website">Website</option>
                    <option value="Google">Google</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/70 mb-1">Budget</label>
                  <input
                    type="text"
                    placeholder="$3,000 - $5,000"
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E5B94F] text-black font-extrabold text-xs uppercase"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
