import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MessageSquare,
  Globe,
  PhoneCall,
  MousePointerClick,
  Share2,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const ClientDashboardTab: React.FC = () => {
  const { currentClient, timeFilter, setTimeFilter, setClientTab, leads, contentItems } = useApp();

  const pendingApprovals = contentItems.filter(
    (c) => c.status === 'Pending Client Approval' && c.clientId === currentClient.id
  );

  const recentLeads = leads
    .filter((l) => l.source !== undefined)
    .slice(0, 4);

  // Time multiplier factor for chart simulation based on filter
  const multiplier =
    timeFilter === '7D' ? 0.25 : timeFilter === '30D' ? 1 : timeFilter === '90D' ? 2.8 : 10.5;

  const totalLeads = Math.round(currentClient.metrics.totalLeads * multiplier);
  const newEnquiries = Math.round(currentClient.metrics.newEnquiries * multiplier);
  const websiteVisitors = Math.round(currentClient.metrics.websiteVisitors * multiplier);
  const googleCalls = Math.round(currentClient.metrics.googleCalls * multiplier);
  const googleClicks = Math.round(currentClient.metrics.googleClicks * multiplier);
  const socialReach = Math.round(currentClient.metrics.socialReach * multiplier);

  return (
    <div className="space-y-8">
      {/* Welcome & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0D1420] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E5B94F]/20 text-[#E5B94F] text-[10px] font-black uppercase tracking-wider border border-[#E5B94F]/40">
              DEMO DATA
            </span>
            <span className="text-xs text-white/50">•</span>
            <span className="text-xs text-white/60">{currentClient.industry}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Good morning, {currentClient.ownerName}
          </h1>
          <p className="text-sm font-semibold text-[#E5B94F]">
            Your Digital Growth Overview
          </p>
          <p className="text-xs text-white/50">
            Client: {currentClient.businessName} (Sydney Construction Company) • Pipeline: $184,500 Estimated
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center space-x-1 p-1 bg-[#121A27] rounded-xl border border-white/10 self-start md:self-center text-xs font-bold">
          {(['7D', '30D', '90D', '12M'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeFilter === t
                  ? 'bg-[#E5B94F] text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {t === '7D' ? '7 DAYS' : t === '30D' ? '30 DAYS' : t === '90D' ? '90 DAYS' : '12 MONTHS'}
            </button>
          ))}
        </div>
      </div>

      {/* Pending Approval Urgent Banner if any */}
      {pendingApprovals.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#E5B94F]/20 via-[#121A27] to-[#121A27] border border-[#E5B94F]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5B94F] text-black flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Action Required: {pendingApprovals.length} Content Item Waiting For Approval
              </h4>
              <p className="text-xs text-white/70">
                "{pendingApprovals[0].title}" is ready for your sign-off before social scheduling.
              </p>
            </div>
          </div>
          <button
            onClick={() => setClientTab('content')}
            className="px-4 py-2 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Review & Approve →
          </button>
        </div>
      )}

      {/* ========================================================
          BUSINESS OVERVIEW WITH PROGRESS BARS (Requested in Section 8)
      ======================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
              GROWTH SYSTEM STATUS
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Business Overview & Channel Health
            </h3>
          </div>
          <span className="text-xs text-white/40">Real-time sync</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Website Status */}
          <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center">
                <Globe className="w-4 h-4 mr-1.5 text-[#E5B94F]" />
                Website Status
              </span>
              <span className="font-extrabold text-[#E5B94F]">{currentClient.progress.website}%</span>
            </div>
            {/* Visual ASCII / Bar representation */}
            <div className="w-full h-2.5 rounded-full bg-[#080D16] overflow-hidden">
              <div
                className="h-full bg-[#E5B94F] rounded-full transition-all duration-700"
                style={{ width: `${currentClient.progress.website}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50">
              Live at {currentClient.websiteDomain} • 0.8s load speed
            </p>
          </div>

          {/* Google Business Status */}
          <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center">
                <PhoneCall className="w-4 h-4 mr-1.5 text-[#E5B94F]" />
                Google Business
              </span>
              <span className="font-extrabold text-[#E5B94F]">{currentClient.progress.google}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#080D16] overflow-hidden">
              <div
                className="h-full bg-[#E5B94F] rounded-full transition-all duration-700"
                style={{ width: `${currentClient.progress.google}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50">
              Ranking #1 in local 3-pack for primary postcodes
            </p>
          </div>

          {/* Social Media Status */}
          <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center">
                <Share2 className="w-4 h-4 mr-1.5 text-[#E5B94F]" />
                Social Media
              </span>
              <span className="font-extrabold text-[#E5B94F]">{currentClient.progress.social}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#080D16] overflow-hidden">
              <div
                className="h-full bg-[#E5B94F] rounded-full transition-all duration-700"
                style={{ width: `${currentClient.progress.social}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50">
              8 custom posts & reels scheduled this month
            </p>
          </div>

          {/* SEO Status */}
          <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center">
                <TrendingUp className="w-4 h-4 mr-1.5 text-[#E5B94F]" />
                Local SEO
              </span>
              <span className="font-extrabold text-[#E5B94F]">{currentClient.progress.seo}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#080D16] overflow-hidden">
              <div
                className="h-full bg-[#E5B94F] rounded-full transition-all duration-700"
                style={{ width: `${currentClient.progress.seo}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50">
              38 suburb keywords indexed in Top 3 Google positions
            </p>
          </div>

          {/* Content Status */}
          <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-[#E5B94F]" />
                Content Status
              </span>
              <span className="font-extrabold text-[#E5B94F]">{currentClient.progress.content}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#080D16] overflow-hidden">
              <div
                className="h-full bg-[#E5B94F] rounded-full transition-all duration-700"
                style={{ width: `${currentClient.progress.content}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50">
              4K job site shoots & drone footage processed
            </p>
          </div>

          {/* Lead Generation Status */}
          <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-[#E5B94F]" />
                Lead Generation
              </span>
              <span className="font-extrabold text-[#E5B94F]">{currentClient.progress.leadGen}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#080D16] overflow-hidden">
              <div
                className="h-full bg-[#E5B94F] rounded-full transition-all duration-700"
                style={{ width: `${currentClient.progress.leadGen}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50">
              Automated SMS quote notifications active
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          7 CORE METRIC CARDS (Exact prompt requirements)
      ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* 1. TOTAL LEADS */}
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">
            TOTAL LEADS
          </span>
          <div className="text-2xl font-black text-white">{totalLeads}</div>
          <span className="text-[10px] text-emerald-400 font-bold block">+310%</span>
        </div>

        {/* 2. NEW ENQUIRIES */}
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">
            NEW ENQUIRIES
          </span>
          <div className="text-2xl font-black text-[#E5B94F]">{newEnquiries}</div>
          <span className="text-[10px] text-emerald-400 font-bold block">+28%</span>
        </div>

        {/* 3. WEBSITE VISITORS */}
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">
            WEBSITE VISITORS
          </span>
          <div className="text-2xl font-black text-white">{websiteVisitors.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400 font-bold block">+24.5%</span>
        </div>

        {/* 4. GOOGLE CALLS */}
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">
            GOOGLE CALLS
          </span>
          <div className="text-2xl font-black text-white">{googleCalls}</div>
          <span className="text-[10px] text-[#E5B94F] font-bold block">Direct</span>
        </div>

        {/* 5. GOOGLE WEBSITE CLICKS */}
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">
            GOOGLE CLICKS
          </span>
          <div className="text-2xl font-black text-white">{googleClicks}</div>
          <span className="text-[10px] text-emerald-400 font-bold block">+42%</span>
        </div>

        {/* 6. SOCIAL REACH */}
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">
            SOCIAL REACH
          </span>
          <div className="text-2xl font-black text-white">{(socialReach / 1000).toFixed(1)}K</div>
          <span className="text-[10px] text-emerald-400 font-bold block">Local AU</span>
        </div>

        {/* 7. CONVERSION RATE */}
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1 col-span-2 md:col-span-1">
          <span className="text-[10px] font-extrabold uppercase text-white/50 tracking-wider">
            CONVERSION RATE
          </span>
          <div className="text-2xl font-black text-emerald-400">{currentClient.metrics.conversionRate}%</div>
          <span className="text-[10px] text-white/40 block">Benchmark 1.8%</span>
        </div>
      </div>

      {/* ========================================================
          INTERACTIVE CHARTS (Leads, Traffic, Social, Google)
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Over Time Chart */}
        <div className="p-6 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                PIPELINE VELOCITY
              </span>
              <h3 className="text-lg font-bold text-white">Leads Generated Over Time</h3>
            </div>
            <span className="text-xs font-bold text-[#E5B94F]">+{totalLeads} Total</span>
          </div>

          {/* Clean SVG visual bar chart */}
          <div className="h-48 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-white/10">
            {[24, 38, 45, 62, 58, 79, 94, 88, 105, 114, 127].map((val, idx) => {
              const heightPct = Math.min(100, Math.round((val / 130) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#B4831D] to-[#E5B94F] group-hover:brightness-125 transition-all relative"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black text-[9px] font-bold text-[#E5B94F] pointer-events-none transition-opacity whitespace-nowrap">
                      {val} leads
                    </div>
                  </div>
                  <span className="text-[9px] text-white/40">W{idx + 1}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/50">
            <span>Consistent 3.4x lift since site redesign</span>
            <span className="text-emerald-400 font-semibold">+18 Won Contracts</span>
          </div>
        </div>

        {/* Website Traffic & Google Searches Chart */}
        <div className="p-6 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                ORGANIC DISCOVERY
              </span>
              <h3 className="text-lg font-bold text-white">Google Map Searches & Site Visits</h3>
            </div>
            <span className="text-xs font-bold text-white">{websiteVisitors.toLocaleString()} Visitors</span>
          </div>

          <div className="h-48 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-white/10">
            {[620, 890, 1240, 1680, 2100, 2600, 2980, 3400, 3842].map((val, idx) => {
              const heightPct = Math.min(100, Math.round((val / 4000) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#1E293B] to-[#38BDF8] group-hover:brightness-125 transition-all relative"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black text-[9px] font-bold text-[#38BDF8] pointer-events-none transition-opacity whitespace-nowrap">
                      {val}
                    </div>
                  </div>
                  <span className="text-[9px] text-white/40">M{idx + 1}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/50">
            <span>Google 3-Pack impressions: 14.2K</span>
            <span className="text-[#38BDF8] font-semibold">489 Direct Website Clicks</span>
          </div>
        </div>
      </div>

      {/* Recent CRM Leads quick snippet */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Recent Customer Enquiries & Quotes</h3>
            <p className="text-xs text-white/50">Direct from website and Google Business Profile</p>
          </div>
          <button
            onClick={() => setClientTab('leads')}
            className="text-xs font-bold text-[#E5B94F] hover:underline flex items-center space-x-1"
          >
            <span>Open Kanban CRM Pipeline</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-2 hover:border-[#E5B94F]/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E5B94F]/10 text-[#E5B94F]">
                  {lead.status}
                </span>
                <span className="text-[10px] text-white/40">{lead.date}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{lead.name}</h4>
              <p className="text-xs text-white/70">{lead.business}</p>
              <div className="text-[11px] text-white/50 pt-1 border-t border-white/5">
                <span>Source: {lead.source}</span>
                {lead.budget && <span className="block text-[#E5B94F] font-semibold">{lead.budget}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
