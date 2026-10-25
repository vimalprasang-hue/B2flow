export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL SENT'
  | 'WON'
  | 'LOST';

export type LeadSource =
  | 'Website'
  | 'Google'
  | 'Facebook'
  | 'Instagram'
  | 'Referral'
  | 'Other';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  business: string;
  businessType: string;
  location: string;
  source: LeadSource;
  date: string;
  status: LeadStatus;
  notes: string;
  assignedStaff: string;
  budget?: string;
  website?: string;
  instagram?: string;
  message?: string;
}

export interface ClientProgress {
  website: number;
  google: number;
  social: number;
  seo: number;
  content: number;
  leadGen: number;
}

export interface ClientMetrics {
  totalLeads: number;
  newEnquiries: number;
  websiteVisitors: number;
  googleCalls: number;
  googleClicks: number;
  socialReach: number;
  conversionRate: number;
  estimatedPipeline: number;
}

export interface Client {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  location: string;
  packageId: string;
  startDate: string;
  status: 'ACTIVE' | 'ONBOARDING' | 'PAUSED';
  progress: ClientProgress;
  metrics: ClientMetrics;
  avatarUrl: string;
  websiteDomain: string;
  websiteLiveUrl?: string;
  assignedManager: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  deliverables: string[];
  features: string[];
  stat: string;
  statLabel: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  oneTimePrice: number;
  billingType: 'monthly' | 'one-time';
  description: string;
  features: string[];
  services: string[];
  ctaText: string;
  popular?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  location: string;
  category:
    | 'Construction'
    | 'Builders'
    | 'Plumbing'
    | 'Electrical'
    | 'Fitness'
    | 'Hospitality'
    | 'Other';
  servicesProvided: string[];
  beforeImage: string;
  afterImage: string;
  coverImage: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    growth: string;
  }[];
  date: string;
  clientQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

export type ContentStatus =
  | 'Draft'
  | 'Pending Client Approval'
  | 'Approved'
  | 'Changes Requested'
  | 'Published';

export interface ContentItem {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  caption: string;
  platform: 'Instagram' | 'Facebook' | 'TikTok' | 'LinkedIn';
  mediaType: 'image' | 'reel' | 'carousel';
  mediaUrl: string;
  scheduledDate: string;
  status: ContentStatus;
  clientFeedback?: string;
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  items: InvoiceItem[];
  subtotal: number;
  gst: number;
  total: number;
  dueDate: string;
  issueDate: string;
  status: 'PAID' | 'UNPAID' | 'OVERDUE';
}

export interface MonthlyReport {
  id: string;
  clientId: string;
  clientName: string;
  period: string;
  websiteTraffic: number;
  trafficGrowth: string;
  googlePerformance: {
    impressions: number;
    clicks: number;
    calls: number;
    directionRequests: number;
    mapRank: number;
  };
  seoGrowth: string;
  socialGrowth: string;
  leadsGenerated: number;
  enquiries: number;
  conversionRate: string;
  topPerformingContent: string;
  recommendations: string[];
  executiveSummary: string;
}

export interface Message {
  id: string;
  clientId: string;
  sender: 'client' | 'agency';
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  type: 'lead' | 'approval' | 'invoice' | 'message' | 'report';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}

export interface StrategyCallBooking {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  businessType: string;
  budget: string;
  message: string;
  status: 'NEW' | 'CONFIRMED' | 'COMPLETED';
  createdAt: string;
}

export type ActiveRole = 'PUBLIC' | 'CLIENT' | 'ADMIN';
