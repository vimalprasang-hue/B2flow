import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, Shield, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    setRole,
    setCurrentClientId,
    clients,
    showToast,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (authModalMode === 'client') {
        // Find client by email or default to first client
        const matchedClient = clients.find(
          (c) => c.email.toLowerCase() === email.toLowerCase().trim()
        );

        if (matchedClient) {
          setCurrentClientId(matchedClient.id);
          setRole('CLIENT');
          setIsAuthModalOpen(false);
          showToast(`Welcome back, ${matchedClient.ownerName}! Client portal loaded.`);
        } else {
          // If custom email entered, associate with Murs Projects demo or show quick notice
          setCurrentClientId('client-murs');
          setRole('CLIENT');
          setIsAuthModalOpen(false);
          showToast('Logged in as Murs Projects client portal.');
        }
      } else {
        // Admin login
        setRole('ADMIN');
        setIsAuthModalOpen(false);
        showToast('Welcome to BUILD2FLOW DIGITAL Admin HQ.');
      }
    }, 400);
  };

  const handleQuickDemoClient = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId) || clients[0];
    setCurrentClientId(client.id);
    setEmail(client.email);
    setPassword('••••••••••••');
    setRole('CLIENT');
    setIsAuthModalOpen(false);
    showToast(`Logged in as ${client.businessName} (${client.ownerName}).`);
  };

  const handleQuickDemoAdmin = () => {
    setEmail('liam@build2flowdigital.com.au');
    setPassword('••••••••••••');
    setRole('ADMIN');
    setIsAuthModalOpen(false);
    showToast('Logged in as Agency Admin (Liam Hemsworth).');
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address to receive password reset instructions.');
      return;
    }
    setError(null);
    setForgotPasswordSent(true);
    showToast(`Password reset link sent to ${email}`);
    setTimeout(() => setForgotPasswordSent(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0D1420] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080D16]">
          <div className="flex items-center space-x-2">
            <span className="text-base font-black text-white">
              BUILD<span className="text-[#E5B94F]">2</span>FLOW
            </span>
            <span className="text-[10px] font-extrabold tracking-widest text-white/50 uppercase">
              PORTAL LOGIN
            </span>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Client vs Admin */}
        <div className="grid grid-cols-2 p-1 m-4 bg-[#121A27] rounded-xl border border-white/5 text-xs font-bold">
          <button
            onClick={() => {
              setAuthModalMode('client');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              authModalMode === 'client'
                ? 'bg-[#E5B94F] text-black shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Client Login</span>
          </button>
          <button
            onClick={() => {
              setAuthModalMode('admin');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              authModalMode === 'admin'
                ? 'bg-[#E5B94F] text-black shadow-sm'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Login</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 pt-2 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              {authModalMode === 'client' ? 'Client Growth Portal' : 'Agency Administration HQ'}
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              {authModalMode === 'client'
                ? 'Access your live website metrics, Google rankings, CRM leads and content approvals.'
                : 'Manage agency clients, leads pipeline, proposals, invoices and platform settings.'}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {forgotPasswordSent && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Reset link sent! Please check your inbox.</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-white/70 block">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  authModalMode === 'client'
                    ? 'marcus@mursprojects.com.au'
                    : 'liam@build2flowdigital.com.au'
                }
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-[#E5B94F] focus:outline-none transition-colors"
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white/70">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] text-[#E5B94F] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#121A27] border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-[#E5B94F] focus:outline-none transition-colors"
              />
              <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/70">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 text-[#E5B94F] focus:ring-[#E5B94F] bg-[#121A27]"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-[#E5B94F] hover:bg-[#d6aa3f] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#E5B94F]/20 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>LOGIN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick Demo Credentials */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block">
              1-Click Demo Login (Pre-configured Data)
            </span>
            {authModalMode === 'client' ? (
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoClient('client-murs')}
                  className="w-full py-2 px-3 rounded-lg bg-[#121A27] hover:bg-[#1a2538] text-left text-xs text-white flex items-center justify-between border border-white/5 transition-colors"
                >
                  <span className="font-semibold text-white/90">
                    Murs Projects <span className="text-white/40 text-[11px]">(Sydney Construction)</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E5B94F]/10 text-[#E5B94F] font-bold">
                    Demo Client
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoClient('client-apex')}
                  className="w-full py-2 px-3 rounded-lg bg-[#121A27] hover:bg-[#1a2538] text-left text-xs text-white flex items-center justify-between border border-white/5 transition-colors"
                >
                  <span className="font-semibold text-white/90">
                    Apex Electrical <span className="text-white/40 text-[11px]">(Melbourne Electrical)</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E5B94F]/10 text-[#E5B94F] font-bold">
                    Demo Client
                  </span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="w-full py-2 px-3 rounded-lg bg-[#121A27] hover:bg-[#1a2538] text-left text-xs text-white flex items-center justify-between border border-white/5 transition-colors"
              >
                <span className="font-semibold text-white/90">
                  Liam Hemsworth <span className="text-white/40 text-[11px]">(Growth Director)</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E5B94F]/10 text-[#E5B94F] font-bold">
                  Demo Admin
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
