import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Client,
  Lead,
  LeadStatus,
  PricingPackage,
  PortfolioProject,
  ContentItem,
  Invoice,
  MonthlyReport,
  Message,
  AppNotification,
  StrategyCallBooking,
  ActiveRole,
  ContentStatus,
} from '../types';
import {
  INITIAL_CLIENTS,
  INITIAL_LEADS,
  INITIAL_PACKAGES,
  INITIAL_PROJECTS,
  INITIAL_CONTENT_ITEMS,
  INITIAL_INVOICES,
  INITIAL_REPORTS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

interface AppContextType {
  role: ActiveRole;
  setRole: (role: ActiveRole) => void;
  publicPage: string;
  setPublicPage: (page: string) => void;
  clientTab: string;
  setClientTab: (tab: string) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;

  timeFilter: '7D' | '30D' | '90D' | '12M';
  setTimeFilter: (filter: '7D' | '30D' | '90D' | '12M') => void;

  clients: Client[];
  currentClient: Client;
  setCurrentClientId: (id: string) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;

  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => Lead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;

  packages: PricingPackage[];
  updatePackage: (id: string, updates: Partial<PricingPackage>) => void;

  projects: PortfolioProject[];
  addProject: (project: Omit<PortfolioProject, 'id'>) => void;
  updateProject: (id: string, updates: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;

  contentItems: ContentItem[];
  approveContent: (id: string) => void;
  requestContentChanges: (id: string, feedback: string) => void;
  rejectContent: (id: string, reason: string) => void;
  addContentItem: (item: Omit<ContentItem, 'id' | 'createdAt'>) => void;

  invoices: Invoice[];
  markInvoicePaid: (id: string) => void;

  reports: MonthlyReport[];
  messages: Message[];
  sendMessage: (text: string, sender?: 'client' | 'agency') => void;

  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  callBookings: StrategyCallBooking[];
  bookStrategyCall: (booking: Omit<StrategyCallBooking, 'id' | 'createdAt' | 'status'>) => StrategyCallBooking;

  // Selected project for detailed modal
  selectedProject: PortfolioProject | null;
  setSelectedProject: (proj: PortfolioProject | null) => void;

  // Global modals
  isStrategyModalOpen: boolean;
  setIsStrategyModalOpen: (open: boolean) => void;
  isVoiceAdvisorOpen: boolean;
  setIsVoiceAdvisorOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'client' | 'admin';
  setAuthModalMode: (mode: 'client' | 'admin') => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<ActiveRole>('PUBLIC');
  const [publicPage, setPublicPage] = useState<string>('home');
  const [clientTab, setClientTab] = useState<string>('dashboard');
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [timeFilter, setTimeFilter] = useState<'7D' | '30D' | '90D' | '12M'>('30D');

  // Modals & toast
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [isVoiceAdvisorOpen, setIsVoiceAdvisorOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'client' | 'admin'>('client');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Persistent / State collections with initial fallback
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('b2f_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [currentClientId, setCurrentClientId] = useState<string>('client-murs');

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('b2f_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [packages, setPackages] = useState<PricingPackage[]>(() => {
    const saved = localStorage.getItem('b2f_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('b2f_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem('b2f_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT_ITEMS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('b2f_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [reports] = useState<MonthlyReport[]>(INITIAL_REPORTS);

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('b2f_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('b2f_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [callBookings, setCallBookings] = useState<StrategyCallBooking[]>(() => {
    const saved = localStorage.getItem('b2f_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('b2f_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('b2f_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('b2f_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('b2f_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('b2f_content', JSON.stringify(contentItems));
  }, [contentItems]);

  useEffect(() => {
    localStorage.setItem('b2f_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('b2f_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('b2f_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('b2f_bookings', JSON.stringify(callBookings));
  }, [callBookings]);

  const currentClient =
    clients.find((c) => c.id === currentClientId) || clients[0] || INITIAL_CLIENTS[0];

  const addClient = (newClientData: Omit<Client, 'id'>) => {
    const newId = `client-${Date.now()}`;
    const newClient: Client = {
      id: newId,
      ...newClientData,
    };
    setClients((prev) => [newClient, ...prev]);
    showToast(`Client "${newClient.businessName}" created successfully!`);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Client details updated.');
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'date'>): Lead => {
    const newId = `lead-${Date.now()}`;
    const dateFormatted = new Date().toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const newLead: Lead = {
      id: newId,
      date: dateFormatted,
      ...leadData,
    };
    setLeads((prev) => [newLead, ...prev]);

    // Push notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'New Strategy Call Lead',
      description: `${newLead.name} (${newLead.business || 'New Lead'}) requested a strategy call.`,
      type: 'lead',
      timestamp: 'Just now',
      read: false,
      linkTab: 'leads',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Lead for ${newLead.name} logged into CRM!`);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
    showToast(`Lead moved to ${status}`);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
    showToast('Lead details updated.');
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
    showToast('Lead deleted from pipeline.');
  };

  const updatePackage = (id: string, updates: Partial<PricingPackage>) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updates } : pkg))
    );
    showToast('Pricing package updated.');
  };

  const addProject = (projectData: Omit<PortfolioProject, 'id'>) => {
    const newProj: PortfolioProject = {
      id: `proj-${Date.now()}`,
      ...projectData,
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast('Portfolio project published.');
  };

  const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj))
    );
    showToast('Project updated.');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
    showToast('Project removed.');
  };

  const approveContent = (id: string) => {
    setContentItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Approved' as ContentStatus } : item
      )
    );
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Content Approved by Client',
      description: `Marcus Vance approved scheduled social post.`,
      type: 'approval',
      timestamp: 'Just now',
      read: false,
      linkTab: 'content',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('Content approved! Scheduled for automatic publishing.');
  };

  const requestContentChanges = (id: string, feedback: string) => {
    setContentItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Changes Requested' as ContentStatus,
              clientFeedback: feedback,
            }
          : item
      )
    );
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Changes Requested on Creative',
      description: `Client requested modifications: "${feedback.slice(0, 45)}..."`,
      type: 'approval',
      timestamp: 'Just now',
      read: false,
      linkTab: 'content',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('Feedback sent to BUILD2FLOW production team.');
  };

  const rejectContent = (id: string, reason: string) => {
    setContentItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Draft' as ContentStatus,
              clientFeedback: `Rejected: ${reason}`,
            }
          : item
      )
    );
    showToast('Content declined and returned to draft.');
  };

  const addContentItem = (itemData: Omit<ContentItem, 'id' | 'createdAt'>) => {
    const newItem: ContentItem = {
      id: `content-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      ...itemData,
    };
    setContentItems((prev) => [newItem, ...prev]);
    showToast('New creative added to calendar.');
  };

  const markInvoicePaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'PAID' } : inv))
    );
    showToast('Invoice marked as PAID.');
  };

  const sendMessage = (text: string, sender: 'client' | 'agency' = 'client') => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      clientId: currentClientId,
      sender,
      senderName:
        sender === 'client'
          ? `${currentClient.ownerName} (${currentClient.businessName})`
          : 'Liam Hemsworth (BUILD2FLOW DIGITAL)',
      text,
      timestamp: 'Just now',
      read: true,
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulated agency auto-acknowledgement if client sent it
    if (sender === 'client') {
      setTimeout(() => {
        const agencyReply: Message = {
          id: `msg-${Date.now() + 1}`,
          clientId: currentClientId,
          sender: 'agency',
          senderName: 'BUILD2FLOW Growth Hotline',
          text: `Thanks Marcus! We received your message and our growth team is already looking into it. We'll update you shortly.`,
          timestamp: 'Just now',
          read: false,
        };
        setMessages((prev) => [...prev, agencyReply]);
      }, 1500);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications cleared.');
  };

  const bookStrategyCall = (
    bookingData: Omit<StrategyCallBooking, 'id' | 'createdAt' | 'status'>
  ): StrategyCallBooking => {
    const newBooking: StrategyCallBooking = {
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
      ...bookingData,
    };
    setCallBookings((prev) => [newBooking, ...prev]);

    // Also auto-create a CRM lead!
    addLead({
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email,
      business: bookingData.businessName,
      businessType: bookingData.businessType,
      location: 'Australia',
      source: 'Website',
      status: 'NEW',
      notes: `Strategy Call booked for ${bookingData.preferredDate} at ${bookingData.preferredTime}. Budget: ${bookingData.budget}`,
      assignedStaff: 'Liam Hemsworth',
      budget: bookingData.budget,
      message: bookingData.message,
    });

    return newBooking;
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        publicPage,
        setPublicPage,
        clientTab,
        setClientTab,
        adminTab,
        setAdminTab,
        timeFilter,
        setTimeFilter,

        clients,
        currentClient,
        setCurrentClientId,
        addClient,
        updateClient,

        leads,
        addLead,
        updateLeadStatus,
        updateLead,
        deleteLead,

        packages,
        updatePackage,

        projects,
        addProject,
        updateProject,
        deleteProject,

        contentItems,
        approveContent,
        requestContentChanges,
        rejectContent,
        addContentItem,

        invoices,
        markInvoicePaid,

        reports,
        messages,
        sendMessage,

        notifications,
        markNotificationRead,
        markAllNotificationsRead,

        callBookings,
        bookStrategyCall,

        selectedProject,
        setSelectedProject,

        isStrategyModalOpen,
        setIsStrategyModalOpen,
        isVoiceAdvisorOpen,
        setIsVoiceAdvisorOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
