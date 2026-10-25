import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  ArrowRight,
  Bell,
  Sparkles,
  User,
  Shield,
  Layers,
  PhoneCall,
} from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    publicPage,
    setPublicPage,
    setIsStrategyModalOpen,
    setIsVoiceAdvisorOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    notifications,
    currentClient,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'our-work', label: 'Our Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#080D16]/95 backdrop-blur-md border-b border-white/10 transition-all">
        {/* Top announcement bar */}
        <div className="bg-[#0D1422] px-4 py-1.5 text-center text-[11px] font-medium text-white/70 border-b border-white/5 flex items-center justify-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>
            Australian Digital Growth Engine • Sydney, Melbourne, Brisbane & Perth
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline text-[#E5B94F] font-semibold">
            High-Margin Enquiries & Google 3-Pack Dominance
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo on Left */}
          <div
            onClick={() => {
              setRole('PUBLIC');
              setPublicPage('home');
            }}
            className="cursor-pointer group flex flex-col justify-center select-none"
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#E5B94F] transition-colors">
                BUILD<span className="text-[#E5B94F]">2</span>FLOW
              </span>
            </div>
            <span className="text-[9px] font-extrabold tracking-[0.35em] text-white/70 uppercase">
              D I G I T A L
            </span>
          </div>

          {/* Desktop Nav Links */}
          {role === 'PUBLIC' && (
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setPublicPage(link.id)}
                  className={`text-sm font-semibold transition-colors cursor-pointer ${
                    publicPage === link.id
                      ? 'text-[#E5B94F]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* AI Advisor Button */}
            <button
              onClick={() => setIsVoiceAdvisorOpen(true)}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#121A27] hover:bg-[#1a2538] border border-[#E5B94F]/40 text-[#E5B94F] text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="Open Gemini AI Voice Growth Advisor"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Advisor</span>
            </button>

            {/* Notification bell */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-2 rounded-xl bg-[#121A27] hover:bg-[#1c273a] text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E5B94F] text-black text-[9px] font-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* CLIENT LOGIN BUTTON */}
            {role === 'PUBLIC' ? (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => {
                    setAuthModalMode('client');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#121A27] hover:bg-[#1a2436] border border-white/15 text-white/90 hover:text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#E5B94F]" />
                  <span>CLIENT LOGIN</span>
                </button>

                <button
                  onClick={() => {
                    setAuthModalMode('admin');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-2.5 py-2 rounded-xl bg-transparent hover:bg-white/5 text-white/50 hover:text-white/80 text-[11px] font-semibold transition-all flex items-center space-x-1 cursor-pointer"
                  title="Agency Admin"
                >
                  <Shield className="w-3 h-3 text-[#E5B94F]/70" />
                  <span>Admin</span>
                </button>
              </div>
            ) : (
              /* Active Portal Badge when logged in */
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1.5 rounded-xl bg-[#121A27] border border-[#E5B94F]/40 flex items-center space-x-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">
                    {role === 'CLIENT' ? currentClient.businessName : 'Admin HQ'}
                  </span>
                </div>
                <button
                  onClick={() => setRole('PUBLIC')}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold"
                >
                  Exit
                </button>
              </div>
            )}

            {/* Strategy Call Button */}
            <button
              onClick={() => setIsStrategyModalOpen(true)}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#E5B94F]/20 flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <span>Book a Free Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#121A27] text-white/80 hover:text-white border border-white/10 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D1420] border-b border-white/10 px-4 py-5 space-y-4 shadow-2xl">
            {/* Quick public navigation */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/40 px-2 block">
                NAVIGATION
              </span>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setRole('PUBLIC');
                    setPublicPage(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                    publicPage === link.id
                      ? 'bg-[#E5B94F]/10 text-[#E5B94F]'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </button>
              ))}
            </div>

            {/* Client & Admin Login Actions inside mobile drawer */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/40 px-2 block">
                PORTALS
              </span>
              <button
                onClick={() => {
                  setAuthModalMode('client');
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#121A27] border border-white/15 text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                <User className="w-4 h-4 text-[#E5B94F]" />
                <span>CLIENT LOGIN</span>
              </button>

              <button
                onClick={() => {
                  setAuthModalMode('admin');
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#121A27] border border-white/10 text-white/80 font-bold text-xs flex items-center justify-center space-x-2"
              >
                <Shield className="w-4 h-4 text-[#E5B94F]" />
                <span>ADMIN HQ LOGIN</span>
              </button>
            </div>

            {/* Gold CTA button inside mobile menu */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsStrategyModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#E5B94F] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#E5B94F]/20 cursor-pointer"
              >
                <span>Book a Free Strategy Call →</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};
