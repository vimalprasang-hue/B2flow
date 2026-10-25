import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Send,
  Sparkles,
  Smartphone,
  Laptop,
} from 'lucide-react';

export const ClientWebsiteTab: React.FC = () => {
  const { currentClient, showToast } = useApp();

  const [revisionNote, setRevisionNote] = useState('');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');

  const handleRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNote.trim()) return;
    showToast('Website revision request logged with BUILD2FLOW engineering.');
    setRevisionNote('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            HIGH-CONVERTING DIGITAL ASSET
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            My Website Architecture
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Domain: <span className="text-[#E5B94F] font-bold">{currentClient.websiteDomain}</span> • Custom Australian Infrastructure
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={currentClient.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-colors"
          >
            <span>Visit Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Website Vitals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-white/40">Load Performance</span>
          <div className="text-2xl font-black text-emerald-400">0.82s</div>
          <span className="text-[10px] text-white/50 block">Google Core Web Vitals Pass</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-white/40">Platform Uptime</span>
          <div className="text-2xl font-black text-white">99.98%</div>
          <span className="text-[10px] text-emerald-400 font-bold block">Sydney AWS Cloud Edge</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-white/40">SSL Security</span>
          <div className="text-2xl font-black text-white">256-bit</div>
          <span className="text-[10px] text-emerald-400 font-bold block">A+ Australian Banking Grade</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1420] border border-white/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-white/40">Lead Capture Rate</span>
          <div className="text-2xl font-black text-[#E5B94F]">{currentClient.metrics.conversionRate}%</div>
          <span className="text-[10px] text-white/50 block">28 New Forms This Month</span>
        </div>
      </div>

      {/* Live Visual Showcase Mockup */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Interactive Web View</h3>
          <div className="flex items-center space-x-1 p-1 bg-[#121A27] rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`p-1.5 rounded-lg flex items-center space-x-1 ${
                devicePreview === 'desktop' ? 'bg-[#E5B94F] text-black font-bold' : 'text-white/60'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`p-1.5 rounded-lg flex items-center space-x-1 ${
                devicePreview === 'mobile' ? 'bg-[#E5B94F] text-black font-bold' : 'text-white/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>

        <div
          className={`mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 ${
            devicePreview === 'mobile' ? 'max-w-sm' : 'w-full'
          }`}
        >
          {/* Browser chrome bar */}
          <div className="bg-[#121A27] px-4 py-2 flex items-center space-x-2 border-b border-white/10">
            <div className="flex space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex-1 bg-[#080D16] rounded-md px-3 py-1 text-[11px] text-white/50 text-center truncate">
              https://{currentClient.websiteDomain}
            </div>
          </div>

          {/* Simulated Web View */}
          <div className="relative aspect-[16/9] bg-[#080D16] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Website preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <span className="text-[10px] tracking-widest uppercase text-[#E5B94F] font-black">
                LUXURY ARCHITECTURAL BUILDERS SYDNEY
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {currentClient.businessName}
              </h4>
              <p className="text-xs text-white/70 max-w-md">
                Bespoke architectural residences and high-end renovations. Designed and built by master craftsmen.
              </p>
              <div className="px-4 py-2 rounded-xl bg-[#E5B94F] text-black font-extrabold text-xs uppercase">
                Instant Quote Calculator Online
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Website Revision Request Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-4">
        <h3 className="text-lg font-bold text-white">Request Website Edits or New Projects</h3>
        <p className="text-xs text-white/60">
          Want our web engineers to update your project photos, team details, or text? Enter details below for instant dispatch.
        </p>

        <form onSubmit={handleRequestRevision} className="space-y-3">
          <textarea
            rows={3}
            placeholder="e.g. Please upload our newly completed Mosman kitchen renovation photos to the portfolio page..."
            value={revisionNote}
            onChange={(e) => setRevisionNote(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E5B94F]"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Revision to Dev Team</span>
          </button>
        </form>
      </div>
    </div>
  );
};
