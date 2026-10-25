import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Monitor,
  Search,
  Share2,
  Camera,
  Users,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/initialData';

export const ServicesPage: React.FC = () => {
  const { setIsStrategyModalOpen, setIsVoiceAdvisorOpen } = useApp();

  return (
    <div className="bg-[#080D16] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            A COMPLETE DIGITAL GROWTH SYSTEM
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Everything You Need To Attract More Customers & Grow Your Business.
          </h1>
          <p className="text-base text-white/70 leading-relaxed">
            We don’t sell fragmented services. We engineer an integrated digital acquisition engine tailored specifically for Australian builders, trades, and local businesses.
          </p>
        </div>

        {/* Deep Dive into all 5 Services */}
        <div className="space-y-16">
          {SERVICES_LIST.map((srv, index) => {
            const isEven = index % 2 === 0;
            const IconComponent =
              srv.id === 'service-web'
                ? Monitor
                : srv.id === 'service-google'
                ? Search
                : srv.id === 'service-social'
                ? Share2
                : srv.id === 'service-content'
                ? Camera
                : Users;

            return (
              <div
                key={srv.id}
                id={srv.id}
                className="p-8 sm:p-12 rounded-3xl bg-[#0D1422] border border-white/10 shadow-xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Service Text */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-[#121A27] border border-[#E5B94F]/40 flex items-center justify-center text-[#E5B94F]">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#E5B94F] tracking-widest uppercase">
                          SERVICE PILLAR {srv.number}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-white">
                          {srv.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm text-white/70 leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">
                        What We Deliver:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {srv.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start space-x-2 text-white/80">
                            <CheckCircle2 className="w-4 h-4 text-[#E5B94F] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={() => setIsStrategyModalOpen(true)}
                        className="px-6 py-3 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                      >
                        <span>Discuss This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setIsVoiceAdvisorOpen(true)}
                        className="px-5 py-3 rounded-xl bg-[#121A27] text-[#E5B94F] text-xs font-bold border border-[#E5B94F]/30 hover:bg-[#1a2538] transition-colors flex items-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI Strategy Assistant</span>
                      </button>
                    </div>
                  </div>

                  {/* Service Graphic / Stat Box */}
                  <div className="lg:col-span-5">
                    <div className="p-8 rounded-2xl bg-[#121A27] border border-white/10 space-y-6 text-center">
                      <div className="space-y-1">
                        <span className="text-4xl sm:text-5xl font-black text-[#E5B94F]">
                          {srv.stat}
                        </span>
                        <p className="text-xs text-white/70 font-semibold max-w-xs mx-auto">
                          {srv.statLabel}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#080D16] border border-white/5 text-left space-y-2 text-xs">
                        <div className="flex items-center space-x-2 text-[#E5B94F] font-bold">
                          <Zap className="w-4 h-4" />
                          <span>The BUILD2FLOW Advantage</span>
                        </div>
                        <p className="text-white/60 leading-relaxed">
                          We do not use offshore templates or low-effort AI copy. Every site, campaign, and SEO keyword is curated for Australian consumer psychology and local trade licensing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#0D1420] via-[#162132] to-[#0D1420] border border-[#E5B94F]/30 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Unsure Which Pillars Your Business Needs First?
          </h3>
          <p className="text-sm text-white/70 max-w-xl mx-auto">
            Book a complimentary 30-minute growth session. We’ll review your current setup and provide a free roadmap.
          </p>
          <button
            onClick={() => setIsStrategyModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-[#E5B94F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6aa3f] transition-all shadow-lg shadow-[#E5B94F]/25"
          >
            Schedule Discovery Session →
          </button>
        </div>
      </div>
    </div>
  );
};
