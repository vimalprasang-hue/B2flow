import React from 'react';
import { useApp } from '../context/AppContext';
import { X, MapPin, Calendar, CheckCircle2, TrendingUp, Quote, ArrowRight } from 'lucide-react';
import { HeroBeforeAfter } from './HeroBeforeAfter';

export const ProjectDetailModal: React.FC = () => {
  const { selectedProject, setSelectedProject, setIsStrategyModalOpen } = useApp();

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0D1420] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080D16]">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-[#E5B94F]/10 text-[#E5B94F] border border-[#E5B94F]/30">
              {selectedProject.industry}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-white/60 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#E5B94F]" />
              {selectedProject.location}
            </span>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Title & overview */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {selectedProject.title}
            </h2>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Interactive Before & After Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span className="font-semibold text-white uppercase tracking-wider">
                Digital & Visual Transformation
              </span>
              <span>Slide to compare Before & After</span>
            </div>
            <HeroBeforeAfter
              beforeImage={selectedProject.beforeImage}
              afterImage={selectedProject.afterImage}
              beforeLabel="Before Transformation"
              afterLabel="After Build2Flow Digital"
              aspectRatio="aspect-[16/9]"
            />
          </div>

          {/* Key Results Grid */}
          <div className="p-6 rounded-2xl bg-[#121A27] border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#E5B94F] mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              Verified Commercial Results
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedProject.results.map((res, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#080D16] border border-white/5">
                  <span className="text-xs text-white/50 block">{res.label}</span>
                  <div className="text-2xl font-black text-white mt-0.5">{res.value}</div>
                  <span className="text-[11px] font-bold text-[#E5B94F] block mt-1">
                    {res.growth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#121A27]/60 border border-white/5">
              <h4 className="text-sm font-bold text-white mb-2 text-red-400/90">
                The Challenge
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {selectedProject.challenge}
              </p>
            </div>
            <div className="p-5 rounded-xl bg-[#121A27]/60 border border-white/5">
              <h4 className="text-sm font-bold text-[#E5B94F] mb-2">
                The BUILD2FLOW Solution
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {selectedProject.solution}
              </p>
            </div>
          </div>

          {/* Services Provided */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
              Services Delivered
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.servicesProvided.map((serv, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[#121A27] border border-white/10 text-xs text-white font-medium flex items-center"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B94F] mr-1.5" />
                  {serv}
                </span>
              ))}
            </div>
          </div>

          {/* Client Quote if available */}
          {selectedProject.clientQuote && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#E5B94F]/10 via-[#121A27] to-[#121A27] border border-[#E5B94F]/30 relative">
              <Quote className="w-8 h-8 text-[#E5B94F]/30 absolute top-4 right-4" />
              <p className="text-sm italic text-white/90 leading-relaxed">
                "{selectedProject.clientQuote.text}"
              </p>
              <div className="mt-3 flex items-center space-x-2">
                <span className="font-bold text-xs text-[#E5B94F]">
                  {selectedProject.clientQuote.author}
                </span>
                <span className="text-white/40 text-xs">•</span>
                <span className="text-white/60 text-xs">
                  {selectedProject.clientQuote.role}
                </span>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <span className="text-xs text-white/60">
              Want similar results for your Australian business?
            </span>
            <button
              onClick={() => {
                setSelectedProject(null);
                setIsStrategyModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
            >
              <span>Book Strategy Call For My Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
