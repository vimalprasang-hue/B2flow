import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setIsStrategyModalOpen } = useApp();

  return (
    <div className="bg-[#080D16] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            ABOUT BUILD2FLOW DIGITAL
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            We Build Your Digital Presence. <br />
            <span className="text-[#E5B94F]">You Grow Your Business.</span>
          </h1>
          <p className="text-base text-white/70 leading-relaxed">
            BUILD2FLOW DIGITAL was founded on one clear observation: Australian builders and trades are among the most hard-working, skilled professionals in the world, yet most are let down by generic marketing agencies who have never stepped foot on a job site.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
              OUR MISSION
            </span>
            <h2 className="text-3xl font-black text-white leading-tight">
              To Make Australian Trades The Undisputed Market Leaders in Their Suburbs.
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              We eliminate the feast-and-famine cycle. Instead of relying solely on fickle word-of-mouth or paying exorbitant fees to lead-sharing platforms that sell the same enquiry to five competing contractors, we build an owned asset you control forever.
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Your website, your Google 3-Pack authority, and your CRM belong entirely to your company. We provide the technical fire-power, creative execution, and conversion optimization that keeps your vans and build schedule full year-round.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#E5B94F]">40+</span>
                <p className="text-xs text-white/60">Australian Trades Partnered</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#E5B94F]">$12M+</span>
                <p className="text-xs text-white/60">Tracked Client Contract Pipeline</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1000&q=80"
              alt="Australian Construction Job Site Precision"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#080D16]/90 backdrop-blur-md border border-white/10">
              <span className="text-[11px] font-bold text-[#E5B94F] uppercase tracking-wider block">
                The BUILD2FLOW Standard
              </span>
              <p className="text-xs text-white/80 mt-1">
                We speak Australian trade. We understand DAs, CCs, tender submissions, master electrical licencing, and plumbing compliance.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Principles */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-black text-white">Our 4 Guiding Pillars</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Exclusive Territory',
                desc: 'We never represent competing builders or plumbers in your direct geographical service radius.',
              },
              {
                title: 'No Vanity Fluff',
                desc: 'We don’t brag about impressions. We report on real phone calls, qualified quotes, and won job margin.',
              },
              {
                title: 'Speed & Conversion',
                desc: 'Websites engineered to load in under 0.8 seconds and convert mobile homeowners on the spot.',
              },
              {
                title: 'Australian Based',
                desc: 'Our strategists and copywriters are based in Sydney, Melbourne, Brisbane and Perth.',
              },
            ].map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0D1420] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#E5B94F]/10 border border-[#E5B94F]/30 flex items-center justify-center text-[#E5B94F] font-black text-xs">
                  0{i + 1}
                </div>
                <h4 className="text-base font-bold text-white">{p.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-10 rounded-3xl bg-[#0D1420] border border-white/10 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ready to partner with an agency that understands your trade?
          </h3>
          <p className="text-sm text-white/70 max-w-lg mx-auto">
            Book your free discovery call today. No high-pressure sales pitch. Just honest commercial insights.
          </p>
          <button
            onClick={() => setIsStrategyModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-[#E5B94F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6aa3f] transition-all"
          >
            Book Free Strategy Call →
          </button>
        </div>
      </div>
    </div>
  );
};
