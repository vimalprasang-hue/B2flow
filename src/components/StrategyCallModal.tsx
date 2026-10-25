import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const StrategyCallModal: React.FC = () => {
  const { isStrategyModalOpen, setIsStrategyModalOpen, bookStrategyCall } = useApp();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: 'Builders & Construction',
    location: 'Sydney, NSW',
    currentWebsite: '',
    instagram: '',
    selectedServices: ['Website Design & Development', 'Google Business & Local SEO'],
    budget: '$3,000 - $5,000 / month',
    preferredDate: '2026-10-14',
    preferredTime: '10:00 AM AEST',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isStrategyModalOpen) return null;

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      bookStrategyCall({
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        businessType: formData.businessType,
        budget: formData.budget,
        message: `${formData.message} | Services: ${formData.selectedServices.join(', ')} | Website: ${formData.currentWebsite} | IG: ${formData.instagram}`,
      });
      setIsSubmitting(false);
      setStep('success');
    }, 600);
  };

  const resetAndClose = () => {
    setIsStrategyModalOpen(false);
    setStep('form');
  };

  const timeSlots = [
    '09:00 AM AEST',
    '10:30 AM AEST',
    '01:00 PM AEST',
    '02:30 PM AEST',
    '04:00 PM AEST',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D1420] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080D16]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5B94F] animate-pulse" />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white/90">
              BUILD2FLOW DIGITAL <span className="text-[#E5B94F]">• Discovery Session</span>
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            <div>
              <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
                FREE 30-MINUTE DIGITAL GROWTH AUDIT
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                Book Your Growth Strategy Call
              </h2>
              <p className="text-sm text-white/60 mt-2">
                We will analyze your current website, Google ranking, and local competition to show you exactly how to generate more high-margin jobs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E5B94F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vance Construction"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E5B94F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Phone (Mobile) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0412 884 921"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E5B94F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. marcus@vancebuild.com.au"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E5B94F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Trade / Industry *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E5B94F]"
                >
                  <option value="Builders & Construction">Builders & Custom Construction</option>
                  <option value="Plumber">Plumbing & Drainage</option>
                  <option value="Electrician">Electrician & Solar</option>
                  <option value="Gyms & Fitness">Gym & Fitness Studio</option>
                  <option value="Restaurants & Cafes">Restaurant & Cafe</option>
                  <option value="Concreting & Civil">Concreting & Civil</option>
                  <option value="Landscaping">Landscaping & Pools</option>
                  <option value="Other Trade">Other Local Business</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Primary Location in Australia *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sydney, NSW"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E5B94F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Current Website (If any)
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://mybuildsite.com.au"
                  value={formData.currentWebsite}
                  onChange={(e) => setFormData({ ...formData, currentWebsite: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E5B94F]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  placeholder="e.g. @vance_constructions"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E5B94F]"
                />
              </div>
            </div>

            {/* Services multi-select */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                What services are you interested in?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Website Design & Development',
                  'Google Business & Local SEO',
                  'Social Media Management',
                  'Content Creation (Video/Photo)',
                  'Lead Generation & Automation',
                ].map((service) => {
                  const selected = formData.selectedServices.includes(service);
                  return (
                    <button
                      type="button"
                      key={service}
                      onClick={() => handleServiceToggle(service)}
                      className={`text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between ${
                        selected
                          ? 'border-[#E5B94F] bg-[#E5B94F]/10 text-white font-medium'
                          : 'border-white/10 bg-[#121A27] text-white/60 hover:border-white/20'
                      }`}
                    >
                      <span>{service}</span>
                      {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B94F] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="bg-[#121A27] p-4 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#E5B94F]">
                <Calendar className="w-4 h-4" />
                <span>Select Your Preferred Date & Time</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="date"
                  value={formData.preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#080D16] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E5B94F]"
                />
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#080D16] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E5B94F]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Marketing Budget */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Estimated Monthly Marketing Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E5B94F]"
              >
                <option value="$1,500 - $3,000 / month">$1,500 - $3,000 / month (Starter)</option>
                <option value="$3,000 - $5,000 / month">$3,000 - $5,000 / month (Growth - Recommended)</option>
                <option value="$5,000 - $10,000 / month">$5,000 - $10,000 / month (Dominate)</option>
                <option value="$10,000+ / month">$10,000+ / month (Enterprise & Multi-Region)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Tell us about your current growth goal
              </label>
              <textarea
                rows={2}
                placeholder="What is the #1 problem in your digital pipeline right now?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E5B94F]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#E5B94F]/20 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Locking in Your Appointment...</span>
              ) : (
                <>
                  <span>BOOK MY FREE STRATEGY CALL →</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-4 text-xs text-white/40 pt-1">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5B94F]" />
                <span>100% Confidential</span>
              </span>
              <span>•</span>
              <span>No High-Pressure Sales</span>
              <span>•</span>
              <span>Australian Growth Experts</span>
            </div>
          </form>
        ) : (
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E5B94F]/20 border border-[#E5B94F] text-[#E5B94F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
                STRATEGY CALL CONFIRMED
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                Thank you. Your strategy call request has been received. We’ll be in touch shortly.
              </h2>
              <p className="text-sm text-white/70 max-w-md mx-auto mt-3">
                Thanks <span className="text-white font-semibold">{formData.name}</span>. Our lead growth strategist will review <span className="text-white font-semibold">{formData.businessName}</span> and reach out prior to your session on <span className="text-[#E5B94F] font-semibold">{formData.preferredDate} at {formData.preferredTime}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121A27] border border-white/10 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/50">Scheduled Slot:</span>
                <span className="text-white font-semibold">{formData.preferredDate} ({formData.preferredTime})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Primary Focus:</span>
                <span className="text-white font-semibold">{formData.selectedServices.slice(0, 2).join(', ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/50">Confirmation Sent To:</span>
                <span className="text-[#E5B94F]">{formData.email}</span>
              </div>
            </div>

            <div className="flex justify-center space-x-3 pt-4">
              <button
                onClick={resetAndClose}
                className="px-6 py-2.5 rounded-xl bg-[#E5B94F] text-black font-bold text-xs uppercase hover:bg-[#d6aa3f] transition-colors"
              >
                Close & Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
