import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addLead, showToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;

    addLead({
      name: form.name,
      business: form.business || 'Local Australian Business',
      email: form.email,
      phone: form.phone,
      businessType: 'General Enquiry',
      location: 'Australia',
      source: 'Website',
      status: 'NEW',
      notes: `Contact page form inquiry: ${form.message}`,
      assignedStaff: 'Liam Hemsworth',
      message: form.message,
    });

    setSubmitted(true);
    showToast('Your message has been sent to BUILD2FLOW DIGITAL.');
  };

  return (
    <div className="bg-[#080D16] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Let’s Build Your Digital Growth.
          </h1>
          <p className="text-base text-white/70 leading-relaxed">
            Have a question or looking to scale your local Australian presence? Reach out to our team below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-8 bg-[#0D1420] p-8 rounded-3xl border border-white/10">
            <div>
              <span className="text-2xl font-black tracking-tight text-white block">
                BUILD<span className="text-[#E5B94F]">2</span>FLOW
              </span>
              <span className="text-[10px] font-extrabold tracking-[0.35em] text-white/70 uppercase">
                D I G I T A L
              </span>
              <p className="text-xs text-[#E5B94F] font-bold mt-1">
                Australia
              </p>
            </div>

            <div className="space-y-4 text-xs text-white/80">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#E5B94F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Headquarters:</span>
                  <span>International Towers, Barangaroo, Sydney NSW 2000</span>
                  <span className="text-white/50 block">Also serving Melbourne, Brisbane, Perth & Regional AU</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#E5B94F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Phone:</span>
                  <span>1300 284 532 (Toll Free)</span>
                  <span className="text-white/50 block">+61 412 884 921 (Direct Growth Line)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#E5B94F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Email:</span>
                  <span>enquiries@build2flowdigital.com.au</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#E5B94F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Operating Hours:</span>
                  <span>Monday – Friday: 7:00 AM – 6:00 PM AEST</span>
                  <span className="text-white/50 block">Urgent Lead Pipeline Support: 24/7 Monitoring</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#121A27] border border-white/5 text-xs text-white/60 space-y-1">
              <span className="font-bold text-white block">Direct Response Guarantee:</span>
              <p>All Australian trade enquiries are reviewed within 4 business hours.</p>
            </div>
          </div>

          {/* Right Contact Form (Exactly per requirements) */}
          <div className="lg:col-span-7 bg-[#0D1420] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E5B94F]/20 text-[#E5B94F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-xs text-white/70 max-w-sm mx-auto">
                  Thanks {form.name}. Our team at BUILD2FLOW DIGITAL will be in contact shortly to discuss {form.business}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', business: '', email: '', phone: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#121A27] text-white text-xs font-bold hover:bg-white/10"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#E5B94F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Business *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vance Construction Group"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#E5B94F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. marcus@vancebuild.com.au"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#E5B94F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0412 884 921"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#E5B94F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your current projects and what you would like to achieve..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-[#E5B94F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#E5B94F]/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>GET STARTED</span>
                  <Send className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-white/40 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E5B94F]" />
                  <span>No spam. Instant logging into secure CRM.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
