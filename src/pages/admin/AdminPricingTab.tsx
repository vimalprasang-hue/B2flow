import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PricingPackage } from '../../types';
import { CheckCircle2, Edit3, Save, Plus, Trash2, ArrowRight } from 'lucide-react';

export const AdminPricingTab: React.FC = () => {
  const { packages, updatePackage, showToast } = useApp();

  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PricingPackage>>({});

  const startEdit = (pkg: PricingPackage) => {
    setEditingPkgId(pkg.id);
    setEditForm({ ...pkg });
  };

  const handleSave = (id: string) => {
    updatePackage(id, editForm);
    setEditingPkgId(null);
    showToast('Package configuration saved! Changes live on public pricing page.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D1420] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#E5B94F] text-xs font-bold tracking-widest uppercase">
            DYNAMIC COMMERCIAL PACKAGES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Pricing & Packages Manager
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Edit package names, prices, features, and CTAs dynamically. Changes update immediately across the website and client onboarding forms.
          </p>
        </div>
      </div>

      {/* Package Edit Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isEditing = editingPkgId === pkg.id;

          return (
            <div
              key={pkg.id}
              className="p-6 rounded-3xl bg-[#0D1420] border border-white/10 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E5B94F]">
                    PACKAGE ID: {pkg.id}
                  </span>
                  <button
                    onClick={() => (isEditing ? handleSave(pkg.id) : startEdit(pkg))}
                    className="px-3 py-1.5 rounded-lg bg-[#121A27] text-white hover:bg-[#1c273a] text-xs font-bold border border-white/10 flex items-center space-x-1"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Save Changes</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5 text-[#E5B94F]" />
                        <span>Edit Package</span>
                      </>
                    )}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-white/50 mb-1">Package Name</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-white/50 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editForm.tagline || ''}
                        onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-white/50 mb-1">Monthly Price ($AUD)</label>
                        <input
                          type="number"
                          value={editForm.monthlyPrice || 0}
                          onChange={(e) =>
                            setEditForm({ ...editForm, monthlyPrice: parseFloat(e.target.value) || 0 })
                          }
                          className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white font-black"
                        />
                      </div>
                      <div>
                        <label className="block text-white/50 mb-1">One-Time ($AUD)</label>
                        <input
                          type="number"
                          value={editForm.oneTimePrice || 0}
                          onChange={(e) =>
                            setEditForm({ ...editForm, oneTimePrice: parseFloat(e.target.value) || 0 })
                          }
                          className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white font-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/50 mb-1">CTA Button Text</label>
                      <input
                        type="text"
                        value={editForm.ctaText || ''}
                        onChange={(e) => setEditForm({ ...editForm, ctaText: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white font-bold"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                      <p className="text-xs text-white/60">{pkg.tagline}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#121A27] border border-white/5 space-y-1">
                      <div className="text-2xl font-black text-[#E5B94F]">
                        ${pkg.monthlyPrice.toLocaleString()}{' '}
                        <span className="text-xs text-white/50 font-normal">/ mo + GST</span>
                      </div>
                      <span className="text-[11px] text-white/40 block">
                        One-Time Build: ${pkg.oneTimePrice.toLocaleString()} AUD
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase text-white/40 block">
                        Active Inclusions:
                      </span>
                      {pkg.features.map((feat, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-white/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B94F] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] text-white/40 block">CTA: "{pkg.ctaText}"</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
