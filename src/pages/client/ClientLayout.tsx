import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Globe,
  Share2,
  Search,
  Users,
  CheckSquare,
  FolderKanban,
  FileText,
  CreditCard,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Sparkles,
  Shield,
  ChevronDown,
} from 'lucide-react';
import { ClientDashboardTab } from './ClientDashboardTab';
import { ClientWebsiteTab } from './ClientWebsiteTab';
import { ClientApprovalsTab } from './ClientApprovalsTab';
import { ClientGoogleSeoTab } from './ClientGoogleSeoTab';
import { ClientLeadsTab } from './ClientLeadsTab';
import { ClientReportsTab } from './ClientReportsTab';
import { ClientInvoicesTab } from './ClientInvoicesTab';
import { ClientMessagesTab } from './ClientMessagesTab';

export const ClientLayout: React.FC = () => {
  const {
    clientTab,
    setClientTab,
    setRole,
    currentClient,
    clients,
    projects,
    setCurrentClientId,
    setIsVoiceAdvisorOpen,
    notifications,
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'website', label: 'My Website', icon: Globe },
    { id: 'seo', label: 'Google & SEO', icon: Search },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'leads', label: 'Leads CRM', icon: Users },
    { id: 'content', label: 'Content', icon: CheckSquare },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'invoices', label: 'Invoices', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderActiveTab = () => {
    switch (clientTab) {
      case 'dashboard':
        return <ClientDashboardTab />;
      case 'website':
        return <ClientWebsiteTab />;
      case 'seo':
        return <ClientGoogleSeoTab />;
      case 'social':
      case 'content':
        return <ClientApprovalsTab />;
      case 'leads':
        return <ClientLeadsTab />;
      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Featured Portfolio Projects</h2>
                <p className="text-xs text-white/50">Your active showcase builds displayed across Google and your website</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="rounded-2xl bg-[#0D1420] border border-white/10 overflow-hidden space-y-3 p-4">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black">
                    <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#E5B94F] uppercase tracking-wider">{proj.industry}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{proj.title}</h3>
                    <p className="text-xs text-white/60 line-clamp-2 mt-1">{proj.description}</p>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/50">
                    <span>{proj.location}</span>
                    <span className="text-emerald-400 font-bold">{proj.results[0]?.value} {proj.results[0]?.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return <ClientReportsTab />;
      case 'invoices':
        return <ClientInvoicesTab />;
      case 'messages':
        return <ClientMessagesTab />;
      case 'settings':
        return (
          <div className="p-8 rounded-3xl bg-[#0D1420] border border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white">Client Portal Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#121A27] border border-white/5 space-y-1">
                <span className="text-white/40 block">Business Legal Name</span>
                <span className="text-sm font-bold text-white">{currentClient.businessName}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#121A27] border border-white/5 space-y-1">
                <span className="text-white/40 block">Primary Account Holder</span>
                <span className="text-sm font-bold text-white">{currentClient.ownerName}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#121A27] border border-white/5 space-y-1">
                <span className="text-white/40 block">Notification Mobile</span>
                <span className="text-sm font-bold text-white">{currentClient.phone}</span>
              </div>
              <div className="p-4 rounded-xl bg-[#121A27] border border-white/5 space-y-1">
                <span className="text-white/40 block">Billing Email</span>
                <span className="text-sm font-bold text-white">{currentClient.email}</span>
              </div>
            </div>
            <p className="text-xs text-white/50">
              Need to modify your bank direct debit or primary contact? Message Liam via the Agency Chat tab.
            </p>
          </div>
        );
      default:
        return <ClientDashboardTab />;
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
            <span className="text-[9px] text-[#E5B94F] block font-bold">CLIENT PORTAL</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsVoiceAdvisorOpen(true)}
            className="p-2 rounded-xl bg-[#121A27] text-[#E5B94F]"
            title="AI Advisor"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-white/80">{currentClient.ownerName.split(' ')[0]}</span>
        </div>
      </div>

      {/* Sidebar (Desktop & Collapsible Mobile) */}
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
              <span className="text-[9px] font-extrabold tracking-[0.3em] text-white/70 uppercase">
                CLIENT PORTAL
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Business Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
              className="w-full p-3 rounded-2xl bg-[#121A27] border border-white/10 flex items-center justify-between text-left hover:border-[#E5B94F]/40 transition-colors"
            >
              <div className="flex items-center space-x-3 truncate">
                <img
                  src={currentClient.avatarUrl}
                  alt={currentClient.businessName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/15"
                />
                <div className="truncate">
                  <h4 className="text-xs font-bold text-white truncate">
                    {currentClient.businessName}
                  </h4>
                  <span className="text-[10px] text-[#E5B94F] block">
                    {currentClient.location}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
            </button>

            {clientDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-[#121A27] border border-white/10 shadow-2xl z-50 space-y-1">
                <span className="text-[9px] font-bold text-white/40 uppercase px-2 block mb-1">
                  Demo Client Accounts:
                </span>
                {clients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentClientId(c.id);
                      setClientDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors ${
                      c.id === currentClient.id
                        ? 'bg-[#E5B94F] text-black font-bold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{c.businessName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = clientTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setClientTab(item.id);
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

        {/* Bottom Sidebar: Logout & Switch to Admin / Website */}
        <div className="p-6 border-t border-white/10 space-y-2">
          <button
            onClick={() => setIsVoiceAdvisorOpen(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#121A27] hover:bg-[#1c273a] text-[#E5B94F] border border-[#E5B94F]/30 text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Voice Growth Advisor</span>
          </button>

          <button
            onClick={() => setRole('PUBLIC')}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full pb-24 lg:pb-10">
        {renderActiveTab()}
      </main>

      {/* Mobile Bottom Navigation (Section 23 requirement) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0A0F1A]/95 backdrop-blur-md border-t border-white/10 px-2 py-2 flex items-center justify-around">
        {[
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'content', label: 'Approve', icon: CheckSquare },
          { id: 'leads', label: 'Leads', icon: Users },
          { id: 'seo', label: 'Google', icon: Search },
          { id: 'messages', label: 'Chat', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = clientTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setClientTab(tab.id)}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-bold ${
                isActive ? 'text-[#E5B94F]' : 'text-white/50'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
