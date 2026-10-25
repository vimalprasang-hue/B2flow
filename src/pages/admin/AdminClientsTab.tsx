import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Search, User, Globe, Phone, Mail, MapPin, Trash2, Edit, ExternalLink } from 'lucide-react';
import { Client } from '../../types';

export const AdminClientsTab: React.FC = () => {
  const { clients, addClient, updateClient, setCurrentClientId, setRole, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    industry: 'Builders & Construction',
    location: 'Sydney, NSW',
    packageId: 'package-growth',
    websiteDomain: '',
    assignedManager: 'Liam Hemsworth',
  });

  const filtered = clients.filter(
    (c) =>
      c.businessName.toLowerCase().includes(search.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.ownerName) return;

    addClient({
      ...formData,
      startDate: new Date().toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      progress: {
        website: 60,
        google: 50,
        social: 40,
        seo: 40,
        content: 50,
        leadGen: 50,
      },
      metrics: {
        totalLeads: 0,
        newEnquiries: 0,
        websiteVisitors: 250,
        googleCalls: 0,
        googleClicks: 20,
        socialReach: 1200,
        conversionRate: 0,
        estimatedPipeline: 0,
      },
    });

    setShowAddModal(false);
    setFormData({
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      website: '',
      industry: 'Builders & Construction',
      location: 'Sydney, NSW',
      packageId: 'package-growth',
      websiteDomain: '',
      assignedManager: 'Liam Hemsworth',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            CLIENT DIRECTORY & ROSTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Client Management
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Onboard new Australian trade clients, assign service tiers, and configure digital parameters.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer shadow-md shadow-[#E5B94F]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Client</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#0D1420] p-4 rounded-2xl border border-white/10 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients by name, trade or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#E5B94F]"
          />
        </div>
        <span className="text-xs text-white/50">{filtered.length} Australian Accounts</span>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="p-6 rounded-3xl bg-[#0D1420] border border-white/10 hover:border-[#E5B94F]/30 transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={client.avatarUrl}
                    alt={client.businessName}
                    className="w-12 h-12 rounded-2xl object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {client.businessName}
                    </h4>
                    <span className="text-xs text-white/60">{client.ownerName}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {client.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-white/70">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E5B94F]" />
                  <span>{client.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-white/40" />
                  <span>{client.websiteDomain || client.website}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-white/40" />
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#121A27] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-white/50">Active Tier:</span>
                <span className="font-extrabold text-[#E5B94F] uppercase">
                  {client.packageId.replace('package-', '')}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setCurrentClientId(client.id);
                  setRole('CLIENT');
                }}
                className="w-full py-2.5 rounded-xl bg-[#E5B94F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6aa3f] transition-colors text-center"
              >
                Open Client Portal
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white">Onboard New Australian Client</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prestige Built NSW"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Owner Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Hunter"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0411 223 344"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@prestigebuilt.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Brisbane, QLD"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                  >
                    <option value="Builders & Construction">Builders & Construction</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Gyms & Fitness">Gyms & Fitness</option>
                    <option value="Restaurants & Cafes">Restaurants & Cafes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Package Tier</label>
                  <select
                    value={formData.packageId}
                    onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                  >
                    <option value="package-starter">STARTER ($1,490/mo)</option>
                    <option value="package-growth">GROWTH ($2,890/mo)</option>
                    <option value="package-dominate">DOMINATE ($4,990/mo)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-white/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#E5B94F] text-black font-extrabold uppercase"
                >
                  Save & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
