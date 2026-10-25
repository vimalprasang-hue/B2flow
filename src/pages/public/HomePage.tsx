import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Eye,
  Users,
  MessageSquare,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Monitor,
  Search,
  Share2,
  Camera,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Layers,
  Send,
  Star,
} from 'lucide-react';
import { HeroBeforeAfter } from '../../components/HeroBeforeAfter';
import heroBgImage from '../../assets/images/hero_australian_construction_1791258100799.jpg';
import builderImage from '../../assets/images/industry_builders_1791258123050.jpg';
import plumberImage from '../../assets/images/industry_plumbers_1791258133811.jpg';
import electricianImage from '../../assets/images/industry_electricians_1791258144413.jpg';
import renovationImage from '../../assets/images/before_after_renovation_1791258110748.jpg';

export const HomePage: React.FC = () => {
  const {
    setPublicPage,
    setIsStrategyModalOpen,
    packages,
    projects,
    setSelectedProject,
    setIsVoiceAdvisorOpen,
    addLead,
    showToast,
  } = useApp();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactBusiness, setContactBusiness] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Portfolio filter state
  const [portfolioFilter, setPortfolioFilter] = useState('ALL');

  const portfolioCategories = [
    'ALL',
    'CONSTRUCTION',
    'BUILDERS',
    'PLUMBING',
    'ELECTRICAL',
    'FITNESS',
    'HOSPITALITY',
  ];

  const filteredProjects =
    portfolioFilter === 'ALL'
      ? projects
      : projects.filter(
          (p) =>
            p.category.toUpperCase() === portfolioFilter ||
            p.industry.toUpperCase().includes(portfolioFilter)
        );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactPhone) return;

    addLead({
      name: contactName,
      business: contactBusiness || 'Australian Local Business',
      email: contactEmail,
      phone: contactPhone,
      businessType: 'Homepage Direct Contact',
      location: 'Australia',
      source: 'Website',
      status: 'NEW',
      notes: `Direct inquiry from homepage: ${contactMessage}`,
      assignedStaff: 'Liam Hemsworth',
      message: contactMessage,
    });

    setContactSubmitted(true);
    showToast('Thank you. Your message has been received. We’ll be in touch shortly.');
  };

  // Industries data
  const industries = [
    {
      id: 'ind-builders',
      title: 'Builders & Construction',
      image: builderImage,
      count: '42+ Completed Builds',
    },
    {
      id: 'ind-plumbers',
      title: 'Plumbers',
      image: plumberImage,
      count: '38+ Active Trade Accounts',
    },
    {
      id: 'ind-electricians',
      title: 'Electricians',
      image: electricianImage,
      count: '29+ Solar & Electrical Firms',
    },
    {
      id: 'ind-fitness',
      title: 'Gyms & Fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      count: '18+ Australian Studios',
    },
    {
      id: 'ind-restaurants',
      title: 'Restaurants & Cafés',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      count: '24+ Hospitality Venues',
    },
    {
      id: 'ind-more',
      title: 'And Many More',
      image: renovationImage,
      count: 'Roofing, Landscaping, HVAC & Legal',
    },
  ];

  return (
    <div className="bg-[#080D16] text-white">
      {/* ========================================================
          1. HERO SECTION (Recreated exactly from reference image)
      ======================================================== */}
      <section className="relative w-full min-h-[660px] lg:h-[720px] flex flex-col justify-between overflow-hidden">
        {/* Background Australian Construction Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="Modern Australian Residential Construction"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay over the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080D16] via-[#080D16]/90 to-[#080D16]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D16] via-transparent to-[#080D16]/40" />
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl lg:max-w-3xl space-y-6">
            {/* Small gold uppercase text */}
            <div className="inline-flex items-center space-x-2">
              <span className="text-[#E5B94F] text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase">
                DIGITAL GROWTH FOR LOCAL BUSINESSES
              </span>
            </div>

            {/* Large headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black text-white tracking-tight leading-[1.06]">
              We Build Your <br />
              Digital Presence. <br />
              <span className="text-[#E5B94F]">You Grow Your Business.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/80 max-w-xl font-normal leading-relaxed">
              Websites, social media, Google visibility and lead generation for builders, trades and other local businesses.
            </p>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsStrategyModalOpen(true)}
                className="px-8 py-4 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E5B94F]/25 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>BOOK A FREE STRATEGY CALL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('our-work-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-xl bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/80 hover:border-white transition-all flex items-center justify-center cursor-pointer"
              >
                <span>SEE OUR WORK</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. HERO BENEFITS (Dark horizontal benefit bar at bottom)
        ======================================================== */}
        <div className="relative z-10 w-full bg-[#080D16]/95 backdrop-blur-md border-t border-white/10 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 lg:gap-8 items-center">
              {/* Benefit 1 */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#121A27] border border-white/10 flex items-center justify-center text-[#E5B94F] shrink-0 group-hover:border-[#E5B94F]/50 transition-colors">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[11px] font-bold text-white/50 tracking-wider uppercase">MORE</span>
                  <span className="text-xs sm:text-sm font-black text-white tracking-wider uppercase">VISIBILITY</span>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#121A27] border border-white/10 flex items-center justify-center text-[#E5B94F] shrink-0 group-hover:border-[#E5B94F]/50 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[11px] font-bold text-white/50 tracking-wider uppercase">MORE</span>
                  <span className="text-xs sm:text-sm font-black text-white tracking-wider uppercase">LEADS</span>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#121A27] border border-white/10 flex items-center justify-center text-[#E5B94F] shrink-0 group-hover:border-[#E5B94F]/50 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[11px] font-bold text-white/50 tracking-wider uppercase">MORE</span>
                  <span className="text-xs sm:text-sm font-black text-white tracking-wider uppercase">ENQUIRIES</span>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#121A27] border border-white/10 flex items-center justify-center text-[#E5B94F] shrink-0 group-hover:border-[#E5B94F]/50 transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[11px] font-bold text-white/50 tracking-wider uppercase">MORE</span>
                  <span className="text-xs sm:text-sm font-black text-white tracking-wider uppercase">WORK</span>
                </div>
              </div>

              {/* Benefit 5 */}
              <div className="col-span-2 sm:col-span-1 flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#121A27] border border-white/10 flex items-center justify-center text-[#E5B94F] shrink-0 group-hover:border-[#E5B94F]/50 transition-colors">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="block text-[11px] font-bold text-white/50 tracking-wider uppercase">SUSTAINABLE</span>
                  <span className="text-xs sm:text-sm font-black text-white tracking-wider uppercase">GROWTH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SERVICES SECTION (White/light background as requested)
      ======================================================== */}
      <section id="services-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] text-slate-900">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[#B88926] text-xs font-black tracking-[0.25em] uppercase">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#080D16] tracking-tight">
              A Complete Digital Growth System
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Everything you need to attract more customers and grow your business — all in one place.
            </p>
          </div>

          {/* Five Premium Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-[#080D16] group-hover:bg-[#E5B94F] group-hover:text-black transition-colors mb-6">
                  <Monitor className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#080D16] mb-3 group-hover:text-[#B88926] transition-colors leading-snug">
                  Website Design <br />& Development
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Modern, high-performing websites that turn visitors into customers.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setPublicPage('services')}
                  className="text-xs font-black uppercase tracking-wider text-[#080D16] group-hover:text-[#B88926] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-[#080D16] group-hover:bg-[#E5B94F] group-hover:text-black transition-colors mb-6">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#080D16] mb-3 group-hover:text-[#B88926] transition-colors leading-snug">
                  Google Business <br />& Local SEO
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Get found locally and rank higher in search results.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setPublicPage('services')}
                  className="text-xs font-black uppercase tracking-wider text-[#080D16] group-hover:text-[#B88926] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-[#080D16] group-hover:bg-[#E5B94F] group-hover:text-black transition-colors mb-6">
                  <Share2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#080D16] mb-3 group-hover:text-[#B88926] transition-colors leading-snug">
                  Social Media <br />Management
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Consistent, high-quality content that builds trust and attracts customers.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setPublicPage('services')}
                  className="text-xs font-black uppercase tracking-wider text-[#080D16] group-hover:text-[#B88926] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-[#080D16] group-hover:bg-[#E5B94F] group-hover:text-black transition-colors mb-6">
                  <Camera className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#080D16] mb-3 group-hover:text-[#B88926] transition-colors leading-snug">
                  Content <br />Creation
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Professional photo and video content showcasing your work and expertise.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setPublicPage('services')}
                  className="text-xs font-black uppercase tracking-wider text-[#080D16] group-hover:text-[#B88926] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 5 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-[#080D16] group-hover:bg-[#E5B94F] group-hover:text-black transition-colors mb-6">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#080D16] mb-3 group-hover:text-[#B88926] transition-colors leading-snug">
                  Lead Generation <br />& Automation
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  Capture, follow up and convert more enquiries into real jobs.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setPublicPage('services')}
                  className="text-xs font-black uppercase tracking-wider text-[#080D16] group-hover:text-[#B88926] flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Agency Advisory CTA Card */}
            <div className="bg-[#080D16] text-white rounded-2xl p-8 border border-black shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-[#E5B94F] text-xs font-black tracking-widest uppercase block mb-3">
                  INTEGRATED APPROACH
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  Custom Strategy For Your Trade
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-normal">
                  We don’t believe in cookie-cutter tactics. We analyze your local Australian market and engineer a dominant presence.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => setIsStrategyModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. INDUSTRIES SECTION
      ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080D16] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Local Businesses. Real Results.
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              We work with builders, trades and a wide range of local businesses across Australia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.id}
                onClick={() => {
                  setPortfolioFilter(ind.title.toUpperCase().includes('BUILD') ? 'BUILDERS' : ind.title.toUpperCase().includes('PLUMB') ? 'PLUMBING' : ind.title.toUpperCase().includes('ELECTR') ? 'ELECTRICAL' : 'ALL');
                  const element = document.getElementById('our-work-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group cursor-pointer space-y-4"
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#121A27] border border-white/10 group-hover:border-[#E5B94F]/40 transition-all shadow-lg relative">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold text-white/90 bg-[#080D16]/80 px-2 py-1 rounded backdrop-blur-sm">
                    {ind.count}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5B94F] transition-colors flex items-center justify-between">
                    <span>{ind.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#E5B94F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR WORK (Portfolio Grid with Filters)
      ======================================================== */}
      <section id="our-work-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1420] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[#E5B94F] text-xs font-black tracking-[0.25em] uppercase">
              PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Our Work
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              Digital solutions designed to help local businesses grow.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setPortfolioFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  portfolioFilter === cat
                    ? 'bg-[#E5B94F] text-black shadow-md'
                    : 'bg-[#121A27] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-[#121A27] rounded-2xl overflow-hidden border border-white/10 hover:border-[#E5B94F]/40 transition-all shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#080D16]/90 border border-white/10 text-[#E5B94F] text-[10px] font-bold uppercase tracking-wider">
                      {p.industry}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">{p.location}</span>
                      <span className="text-xs font-semibold text-emerald-400">
                        {p.results[0]?.value} {p.results[0]?.label}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#E5B94F] transition-colors">
                      {p.clientName}
                    </h3>

                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {p.servicesProvided.slice(0, 3).map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/60"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#E5B94F] text-white hover:text-black font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-[#E5B94F] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. BEFORE / AFTER (Draggable interactive comparison slider)
      ======================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080D16] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[#E5B94F] text-xs font-black tracking-[0.25em] uppercase">
              TRANSFORMATION SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              See The Difference.
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              Drag the slider to compare standard outdated presence against the BUILD2FLOW bespoke growth engine.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0D1420] border border-white/10 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5B94F] block">
                  SYDNEY LUXURY BUILDER CASE
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Murs Projects Complete Digital Elevation
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  Before BUILD2FLOW, Murs Projects struggled with price-shopping clients and low-margin extensions. After our website relaunch and Google Local 3-Pack campaign, they secured $184,500 in qualified contracts within 90 days.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B94F]" />
                    <span>#1 Map Position for "Sydney Architectural Builders"</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B94F]" />
                    <span>127 Exclusive Inbound Enquiries</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B94F]" />
                    <span>Automated Lead SMS & Email Follow-up</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsStrategyModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-[#E5B94F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#d6aa3f] transition-all cursor-pointer"
                  >
                    Get This Result For Your Trade →
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/50 px-1 font-semibold">
                    <span>BEFORE</span>
                    <span>AFTER</span>
                  </div>
                  <HeroBeforeAfter
                    beforeImage="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80"
                    afterImage={heroBgImage}
                    beforeLabel="BEFORE"
                    afterLabel="AFTER"
                    aspectRatio="aspect-[16/10]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. PRICING SECTION
      ======================================================== */}
      <section id="pricing-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0D1420] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[#E5B94F] text-xs font-black tracking-[0.25em] uppercase">
              INVESTMENT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Choose Your Growth Plan.
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              Transparent, high-ROI packages engineered for Australian local businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              const isGrowth = pkg.name.toUpperCase().includes('GROWTH');
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    isGrowth
                      ? 'bg-[#121A27] border-2 border-[#E5B94F] shadow-2xl lg:-translate-y-2'
                      : 'bg-[#080D16] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {isGrowth && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E5B94F] text-black text-[11px] font-black uppercase tracking-wider shadow-md">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-black text-white">{pkg.name}</h3>
                    <p className="text-xs text-white/60 mt-1 mb-6">{pkg.description}</p>

                    <div className="mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          ${pkg.monthlyPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-white/50">/ month + GST</span>
                      </div>
                      <span className="text-[11px] text-[#E5B94F] block mt-1">
                        or ${pkg.oneTimePrice.toLocaleString()} one-time build
                      </span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-[#E5B94F] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => setIsStrategyModalOpen(true)}
                      className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        isGrowth
                          ? 'bg-[#E5B94F] hover:bg-[#d6aa3f] text-black shadow-lg shadow-[#E5B94F]/25'
                          : 'bg-[#121A27] hover:bg-white/10 text-white border border-white/15'
                      }`}
                    >
                      {pkg.ctaText || 'Get Started Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CONTACT SECTION
      ======================================================== */}
      <section id="contact-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080D16] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[#E5B94F] text-xs font-black tracking-[0.25em] uppercase">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Let’s Build Your Digital Growth.
            </h2>
            <p className="text-base text-white/70 leading-relaxed">
              Fill out the form below or reach our Sydney and Melbourne teams directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-8 bg-[#0D1420] p-8 rounded-3xl border border-white/10">
              <div>
                <span className="text-xl font-black text-white block">
                  BUILD<span className="text-[#E5B94F]">2</span>FLOW DIGITAL
                </span>
                <span className="text-xs text-[#E5B94F] font-bold tracking-widest block uppercase mt-0.5">
                  Australia
                </span>
              </div>

              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Partner with an Australian agency that understands trades, builders, council requirements, local postcodes, and commercial conversion.
              </p>

              <div className="space-y-4 pt-2 text-xs">
                <div className="flex items-center space-x-3 text-white/80">
                  <MapPin className="w-4 h-4 text-[#E5B94F] shrink-0" />
                  <span>Level 24, 300 Barangaroo Ave, Sydney NSW 2000</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Phone className="w-4 h-4 text-[#E5B94F] shrink-0" />
                  <span>1300 284 532 • +61 412 884 921</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Mail className="w-4 h-4 text-[#E5B94F] shrink-0" />
                  <span>enquiries@build2flowdigital.com.au</span>
                </div>
                <div className="flex items-center space-x-3 text-white/80">
                  <Clock className="w-4 h-4 text-[#E5B94F] shrink-0" />
                  <span>Mon – Fri: 7:00 AM – 6:00 PM AEST</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121A27] border border-white/5 space-y-2">
                <span className="text-[11px] font-bold text-[#E5B94F] block uppercase tracking-wider">
                  Interactive Strategy Session
                </span>
                <p className="text-xs text-white/70">
                  Need an immediate deep-dive into your competitors' SEO and Google Ads?
                </p>
                <button
                  onClick={() => setIsStrategyModalOpen(true)}
                  className="text-xs font-bold text-white hover:text-[#E5B94F] flex items-center space-x-1 cursor-pointer pt-1"
                >
                  <span>Open Strategy Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#0D1420] p-8 rounded-3xl border border-white/10 shadow-2xl">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E5B94F]/20 text-[#E5B94F] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Thank You</h3>
                  <p className="text-sm text-white/70 max-w-md mx-auto">
                    Your enquiry has been received. Our Australian digital growth team will be in touch shortly with your preliminary audit.
                  </p>
                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactBusiness('');
                      setContactEmail('');
                      setContactPhone('');
                      setContactMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#121A27] text-white text-xs font-bold border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-white/70 block">
                        Name <span className="text-[#E5B94F]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. John Henderson"
                        className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-[#E5B94F] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-white/70 block">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={contactBusiness}
                        onChange={(e) => setContactBusiness(e.target.value)}
                        placeholder="e.g. Henderson Custom Builds"
                        className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-[#E5B94F] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-white/70 block">
                        Email <span className="text-[#E5B94F]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@hendersonbuilds.com.au"
                        className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-[#E5B94F] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-white/70 block">
                        Phone <span className="text-[#E5B94F]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+61 400 000 000"
                        className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-[#E5B94F] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/70 block">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us about your trade, current website, and what you're looking to achieve..."
                      className="w-full px-4 py-3 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-[#E5B94F] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#E5B94F]/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>GET STARTED →</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
