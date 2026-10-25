import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, ArrowUpRight, Shield, Award, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPublicPage, setRole, setIsStrategyModalOpen } = useApp();

  return (
    <footer className="bg-[#05080E] border-t border-white/10 text-white/70 text-sm">
      {/* Pre-footer CTA banner */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0D1420] via-[#121A27] to-[#0D1420] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
              READY TO SCALE YOUR LOCAL JOBS?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Stop Competing On Price. Start Winning High-Margin Builds.
            </h3>
            <p className="text-sm text-white/60 mt-1 max-w-xl">
              Join leading Australian builders and trades who dominate their local Google 3-Pack and generate automated enquiries every month.
            </p>
          </div>
          <button
            onClick={() => setIsStrategyModalOpen(true)}
            className="px-8 py-4 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#E5B94F]/25 shrink-0"
          >
            Book Free Strategy Call →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black tracking-tight text-white">
              BUILD<span className="text-[#E5B94F]">2</span>FLOW
            </span>
            <span className="text-[10px] font-extrabold tracking-[0.35em] text-white/70 uppercase">
              D I G I T A L
            </span>
          </div>

          <p className="text-xs text-white/60 leading-relaxed max-w-sm">
            “We Build Your Digital Presence. You Grow Your Business.”
            <br />
            Australia’s premier digital growth platform engineering bespoke websites, Google Business dominance, and lead automation for custom home builders, electricians, plumbers, and high-performing local trades.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center space-x-2 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#E5B94F]" />
              <span>Barangaroo, Sydney NSW • Collins St, Melbourne VIC</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Phone className="w-3.5 h-3.5 text-[#E5B94F]" />
              <span>1300 284 532 (1300 BUILD2) • +61 412 884 921</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Mail className="w-3.5 h-3.5 text-[#E5B94F]" />
              <span>enquiries@build2flowdigital.com.au</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Our Services
          </h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <button
                onClick={() => setPublicPage('services')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Website Design & Development
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('services')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Google Business & Local SEO
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('services')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Social Media Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('services')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Content Creation (Photo & 4K Video)
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('services')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Lead Generation & CRM Automation
              </button>
            </li>
          </ul>
        </div>

        {/* Industries */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Trades & Sectors
          </h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <button
                onClick={() => setPublicPage('our-work')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Builders & Construction
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('our-work')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Master Electricians
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('our-work')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Residential & Commercial Plumbers
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('our-work')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Gyms & Fitness Studios
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('our-work')}
                className="hover:text-[#E5B94F] transition-colors"
              >
                Restaurants & Cafés
              </button>
            </li>
          </ul>
        </div>

        {/* Portals & Trust */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Client Access
          </h4>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <button
                onClick={() => setRole('CLIENT')}
                className="text-[#E5B94F] hover:underline flex items-center font-semibold"
              >
                <span>Client Dashboard Login</span>
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setRole('ADMIN')}
                className="hover:text-white flex items-center"
              >
                <span>Agency Staff Admin</span>
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('pricing')}
                className="hover:text-white"
              >
                Pricing Packages
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('about')}
                className="hover:text-white"
              >
                About BUILD2FLOW
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublicPage('contact')}
                className="hover:text-white"
              >
                Contact Our Team
              </button>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-white/40 block uppercase">
              ABN 49 618 902 441
            </span>
            <span className="text-[10px] text-white/40">
              100% Australian Owned & Operated
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-white/40 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <p>© 2026 BUILD2FLOW DIGITAL PTY LTD. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          Crafted for high-performing Australian businesses.
        </p>
      </div>
    </footer>
  );
};
