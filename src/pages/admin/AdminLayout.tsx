import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  Tag,
  CheckSquare,
  Search,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { AdminDashboardTab } from './AdminDashboardTab';
import { AdminClientsTab } from './AdminClientsTab';
import { AdminPricingTab } from './AdminPricingTab';
import { ClientLeadsTab } from '../client/ClientLeadsTab';
import { ClientApprovalsTab } from '../client/ClientApprovalsTab';
import { ClientGoogleSeoTab } from '../client/ClientGoogleSeoTab';
import { ClientReportsTab } from '../client/ClientReportsTab';
import { ClientInvoicesTab } from '../client/ClientInvoicesTab';
import { ClientMessagesTab } from '../client/ClientMessagesTab';

export const AdminLayout: React.FC = () => {
  const { adminTab, setAdminTab, setRole, setIsVoiceAdvisorOpen } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients & Accounts', icon: Users },
    { id: 'leads', label: 'Master Leads CRM', icon: Briefcase },
    { id: 'pricing', label: 'Pricing Packages', icon: Tag },
    { id: 'approvals', label: 'Content & Approvals', icon: CheckSquare },
    { id: 'seo', label: 'Live SEO Studio', icon: Search },
    { id: 'reports', label: 'Performance Reports', icon: FileText },
    { id: 'invoices', label: 'Invoices & Billing', icon: CreditCard },
    { id: 'messages', label: 'Client Messages', icon: MessageSquare },
  ];

  const renderActiveTab = () => {
    switch (adminTab) {
      case 'dashboard':
        return <AdminDashboardTab />;
      case 'clients':
        return <AdminClientsTab />;
      case 'pricing':
        return <AdminPricingTab />;
      case 'leads':
        return <ClientLeadsTab />;
      case 'approvals':
      case 'content':
        return <ClientApprovalsTab />;
      case 'seo':
        return <ClientGoogleSeoTab />;
      case 'reports':
        return <ClientReportsTab />;
      case 'invoices':
        return <ClientInvoicesTab />;
      case 'messages':
        return <ClientMessagesTab />;
      default:
        return <AdminDashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080D16] flex flex-col lg:flex-row text-white">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#0D1420] border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-[#121A27] text-white/80"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div>
            <span className="text-sm font-black text-white">
              BUILD<span className="text-[#E5B94F]">2</span>FLOW
            </span>
            <span className="text-[9px] text-[#E5B94F] block font-bold">ADMIN HQ</span>
          </div>
        </div>

        <button
          onClick={() => setRole('PUBLIC')}
          className="px-3 py-1.5 rounded-lg bg-[#121A27] text-xs font-bold text-white/80"
        >
          Exit Admin
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 bg-[#0A0F1A] border-r border-white/10 z-40 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Logo & Portal Header */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => setRole('PUBLIC')}
              className="cursor-pointer group flex flex-col"
            >
              <span className="text-xl font-black text-white group-hover:text-[#E5B94F] transition-colors">
                BUILD<span className="text-[#E5B94F]">2</span>FLOW
              </span>
              <span className="text-[9px] font-extrabold tracking-[0.3em] text-[#E5B94F] uppercase">
                ADMIN CONSOLE
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-[#121A27] border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-white/40 uppercase">Logged in as:</span>
            <h4 className="text-xs font-bold text-white">Liam Hemsworth (Super Admin)</h4>
            <span className="text-[10px] text-emerald-400 block font-semibold">Sydney HQ Active</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E5B94F] text-black font-extrabold shadow-md shadow-[#E5B94F]/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Exit to Public Website */}
        <div className="p-6 border-t border-white/10 space-y-2">
          <button
            onClick={() => setRole('PUBLIC')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#121A27] hover:bg-[#1c273a] text-white/80 hover:text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Pane */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
        {renderActiveTab()}
      </main>
    </div>
  );
};
