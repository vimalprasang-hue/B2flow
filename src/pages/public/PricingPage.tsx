import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { packages, setIsStrategyModalOpen, setRole, setAdminTab } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'one-time'>('monthly');

  return (
    <div className="bg-[#080D16] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            TRANSPARENT COMMERCIAL PRICING
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Predictable Investment. <br />
            Exponential Growth.
          </h1>
          <p className="text-base text-white/70 leading-relaxed">
            Choose the package engineered for your current business scale. All packages are 100% custom-tailored with zero lock-in contracts after initial launch.
          </p>

          {/* Billing Toggle (Monthly vs One-Time / Upfront) */}
          <div className="pt-4 inline-flex items-center p-1.5 rounded-xl bg-[#121A27] border border-white/10 text-xs font-bold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#E5B94F] text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Monthly Growth Retainer
            </button>
            <button
              onClick={() => setBillingCycle('one-time')}
              className={`px-5 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
                billingCycle === 'one-time'
                  ? 'bg-[#E5B94F] text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span>One-Time Project Build</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Pricing Cards (Pulled from editable context) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const price =
              billingCycle === 'monthly' ? pkg.monthlyPrice : pkg.oneTimePrice;
            const priceLabel =
              billingCycle === 'monthly' ? '/ month + GST' : ' upfront + GST';

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-[#121C2C] to-[#0A101A] border-2 border-[#E5B94F] shadow-2xl shadow-[#E5B94F]/10 transform -translate-y-2'
                    : 'bg-[#0D1420] border border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E5B94F] text-black text-[10px] font-black uppercase tracking-widest shadow-md">
                    MOST POPULAR FOR BUILDERS & TRADES
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                    <p className="text-xs text-white/60 mt-1 min-h-[32px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="border-y border-white/10 py-5">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xs text-white/50 font-bold">$ AUD</span>
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        {price.toLocaleString()}
                      </span>
                      <span className="text-xs text-white/50">{priceLabel}</span>
                    </div>
                    <p className="text-[11px] text-[#E5B94F] font-semibold mt-1">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block">
                      Package Includes:
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#E5B94F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 space-y-3">
                  <button
                    onClick={() => setIsStrategyModalOpen(true)}
                    className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#E5B94F] text-black hover:bg-[#d6aa3f] shadow-lg shadow-[#E5B94F]/25'
                        : 'bg-[#121A27] text-white hover:bg-[#1a2538] border border-white/10'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-white/40">
                    Includes dedicated Australian Account Director
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin notice regarding dynamic package editing */}
        <div className="p-4 rounded-xl bg-[#121A27] border border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#E5B94F]" />
            <span>
              Agency Admin Notice: Package names, monthly pricing, features and CTAs are dynamically managed in real time via the Admin Portal.
            </span>
          </div>
          <button
            onClick={() => {
              setRole('ADMIN');
              setAdminTab('pricing');
            }}
            className="px-3 py-1.5 rounded-lg bg-[#080D16] text-[#E5B94F] hover:text-white border border-[#E5B94F]/30 font-bold text-[11px] uppercase tracking-wider whitespace-nowrap"
          >
            Edit Packages in Admin →
          </button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6 pt-10">
          <h3 className="text-2xl font-bold text-center text-white">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              {
                q: 'How fast will my business start seeing leads and calls?',
                a: 'Most Australian clients see their Google Business Profile ranking climb into the 3-Pack within 30 to 60 days. Our lead generation funnels go live within 14 days of onboarding.',
              },
              {
                q: 'Do you take a percentage of the jobs I win?',
                a: 'No. Never. You keep 100% of your build contract revenue. We charge a flat monthly retainer with zero hidden fees.',
              },
              {
                q: 'Who owns the website and digital assets?',
                a: 'You do. You own 100% of your website, domain, customer leads database, and photography/video assets.',
              },
              {
                q: 'What if I am outside Sydney or Melbourne?',
                a: 'We work with trades across all of Australia, including Brisbane, Gold Coast, Perth, Adelaide, Newcastle, and regional hubs.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0D1420] border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-[#E5B94F] shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-white/70 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
