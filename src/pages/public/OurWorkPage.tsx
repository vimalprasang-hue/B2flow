import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Calendar, ArrowUpRight, TrendingUp, Filter } from 'lucide-react';
import { HeroBeforeAfter } from '../../components/HeroBeforeAfter';

export const OurWorkPage: React.FC = () => {
  const { projects, setSelectedProject, setRole, setAdminTab, setIsStrategyModalOpen } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = [
    'All',
    'Construction',
    'Builders',
    'Plumbing',
    'Electrical',
    'Fitness',
    'Hospitality',
    'Other',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-[#080D16] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            CASE STUDIES & TRANSFORMATIONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Our Work. Real Australian Results.
          </h1>
          <p className="text-base text-white/70 leading-relaxed">
            Explore verified digital transformations for builders, electricians, plumbers, and high-performance local companies across Australia.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#E5B94F] text-black shadow-md'
                  : 'bg-[#121A27] text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group rounded-3xl bg-[#0D1420] border border-white/10 hover:border-[#E5B94F]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer shadow-xl"
            >
              <div>
                {/* Cover Image with Before & After Tag */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1420] via-black/30 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#080D16]/85 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#E5B94F] border border-[#E5B94F]/30">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-white/80 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.date}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs text-white/50 flex items-center mb-1">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#E5B94F]" />
                      {project.location}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E5B94F] transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Results preview */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                    {project.results.slice(0, 2).map((res, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-[#121A27] border border-white/5">
                        <span className="text-[10px] text-white/50 block">{res.label}</span>
                        <div className="text-base font-bold text-white">{res.value}</div>
                        <span className="text-[10px] text-[#E5B94F] font-bold">{res.growth}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#E5B94F] group-hover:underline">
                  <span>View Full Transformation & Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Project notice */}
        <div className="p-6 rounded-2xl bg-[#121A27] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div>
            <span className="font-bold text-white block">
              Dynamic Portfolio System
            </span>
            <span>
              New projects, Before & After photos, and verified metrics can be uploaded anytime via the BUILD2FLOW Agency Admin portal.
            </span>
          </div>
          <button
            onClick={() => {
              setRole('ADMIN');
              setAdminTab('projects');
            }}
            className="px-4 py-2 rounded-xl bg-[#080D16] text-[#E5B94F] hover:text-white border border-[#E5B94F]/30 font-bold text-xs uppercase whitespace-nowrap"
          >
            Manage Projects in Admin →
          </button>
        </div>
      </div>
    </div>
  );
};
