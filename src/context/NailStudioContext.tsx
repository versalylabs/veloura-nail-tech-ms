import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  NailDesign, 
  ServiceItem, 
  Appointment, 
  ClientProfile, 
  ClientVisitRecord, 
  InventoryItem, 
  LoyaltyReward, 
  Technician, 
  StudioSettings,
  BeforeAfterPortfolioItem,
  ReminderItem,
  TestimonialItem
} from '../types/nailStudio';
import {
  INITIAL_SETTINGS,
  INITIAL_TECHNICIANS,
  INITIAL_SERVICES,
  INITIAL_DESIGNS,
  INITIAL_APPOINTMENTS,
  INITIAL_CLIENTS,
  INITIAL_INVENTORY,
  INITIAL_LOYALTY_REWARDS,
  INITIAL_BEFORE_AFTER_PORTFOLIO,
  INITIAL_REMINDERS,
  INITIAL_TESTIMONIALS,
  TODAY_STRING
} from '../data/initialData';

export type DashboardTab = 
  | 'overview' 
  | 'calendar' 
  | 'clients' 
  | 'designs' 
  | 'services' 
  | 'payments' 
  | 'inventory' 
  | 'loyalty' 
  | 'portfolio'
  | 'reminders'
  | 'testimonials'
  | 'staff'
  | 'reports'
  | 'settings';

interface NailStudioContextType {
  // App views
  currentView: 'website' | 'management' | 'lookbook' | 'login';
  setCurrentView: (view: 'website' | 'management' | 'lookbook' | 'login') => void;
  dashboardTab: DashboardTab;
  setDashboardTab: (tab: DashboardTab) => void;

  // Authentication for Nail Tech Portal
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  
  // Studio settings & staff
  settings: StudioSettings;
  updateSettings: (newSettings: Partial<StudioSettings>) => void;
  technicians: Technician[];
  addTechnician: (tech: Omit<Technician, 'id'>) => void;
  toggleTechnicianStatus: (id: string) => void;
  
  // Designs Catalog (bi-directionally synced!)
  designs: NailDesign[];
  addDesign: (design: Omit<NailDesign, 'id' | 'createdAt' | 'viewCount' | 'bookingCount'>) => NailDesign;
  updateDesign: (id: string, updates: Partial<NailDesign>) => void;
  deleteDesign: (id: string) => void;
  
  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  
  // Appointments
  appointments: Appointment[];
  createBooking: (booking: Omit<Appointment, 'id' | 'bookingCode' | 'createdAt' | 'remainingBalanceKES'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status'], paymentStatus?: Appointment['paymentStatus']) => void;
  cancelAppointment: (id: string) => void;
  
  // Clients & Nail History
  clients: ClientProfile[];
  addClient: (client: Omit<ClientProfile, 'id' | 'history' | 'visitCount' | 'totalSpendKES' | 'loyaltyPoints' | 'firstVisitDate' | 'lastVisitDate'>) => ClientProfile;
  updateClient: (id: string, updates: Partial<ClientProfile>) => void;
  addVisitRecord: (clientId: string, record: Omit<ClientVisitRecord, 'id'>) => void;
  
  // Inventory
  inventory: InventoryItem[];
  updateInventoryStock: (id: string, newQuantity: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'lastRestockedDate'>) => void;
  
  // Loyalty
  loyaltyRewards: LoyaltyReward[];
  addLoyaltyReward: (reward: Omit<LoyaltyReward, 'id'>) => void;
  redeemLoyaltyPoints: (clientId: string, rewardId: string) => boolean;

  // Before & After Transformation Portfolio
  beforeAfterPortfolio: BeforeAfterPortfolioItem[];
  addBeforeAfterPortfolioItem: (item: Omit<BeforeAfterPortfolioItem, 'id' | 'date'>) => void;
  toggleFeatureInPublicGallery: (id: string) => void;

  // Reminders & Client Follow-up Automation
  reminders: ReminderItem[];
  dispatchReminder: (id: string) => void;

  // Testimonials / Reviews (Live Website Management)
  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, 'id' | 'date'>) => void;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Quick Walkin & Receipt modals
  quickWalkinModalOpen: boolean;
  setQuickWalkinModalOpen: (open: boolean) => void;
  receiptModalAppointment: Appointment | null;
  setReceiptModalAppointment: (apt: Appointment | null) => void;

  // Export Data
  exportDataToCSV: (type: 'appointments' | 'clients') => void;
  
  // Booking modal trigger helper
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  preselectedDesign: NailDesign | null;
  startBookingFlow: (design?: NailDesign) => void;
  
  // Toast notifications for inter-system communication
  notification: { message: string; submessage?: string; type: 'success' | 'info' | 'bell' } | null;
  triggerNotification: (message: string, submessage?: string, type?: 'success' | 'info' | 'bell') => void;
  
  // Reset all to demo defaults
  resetToDefaults: () => void;
}

const NailStudioContext = createContext<NailStudioContextType | undefined>(undefined);

const STORAGE_KEY = 'VELOURA_NAILS_STATE_V1';

export const NailStudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View
  const [currentView, setCurrentView] = useState<'website' | 'management' | 'lookbook' | 'login'>('website');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedDesign, setPreselectedDesign] = useState<NailDesign | null>(null);
  const [notification, setNotification] = useState<{ message: string; submessage?: string; type: 'success' | 'info' | 'bell' } | null>(null);

  // Authentication for Nail Tech Portal (Credentials: versalylabs@gmail.com / labversaly-16)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('VELOURA_AUTH') === 'true';
  });

  const login = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === 'versalylabs@gmail.com' && pass === 'labversaly-16') {
      setIsAuthenticated(true);
      localStorage.setItem('VELOURA_AUTH', 'true');
      setCurrentView('management');
      triggerNotification('Authenticated Successfully', 'Welcome back, Master Artist Michelle (Versaly Labs).', 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('VELOURA_AUTH');
    setCurrentView('website');
    triggerNotification('Signed Out', 'Nail Tech Portal locked.', 'info');
  };

  // Core Data
  const [settings, setSettings] = useState<StudioSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [technicians, setTechnicians] = useState<Technician[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_technicians`);
    return saved ? JSON.parse(saved) : INITIAL_TECHNICIANS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [designs, setDesigns] = useState<NailDesign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_designs`);
    return saved ? JSON.parse(saved) : INITIAL_DESIGNS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_appointments`);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [clients, setClients] = useState<ClientProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_clients`);
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_inventory`);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_loyalty`);
    return saved ? JSON.parse(saved) : INITIAL_LOYALTY_REWARDS;
  });

  const [beforeAfterPortfolio, setBeforeAfterPortfolio] = useState<BeforeAfterPortfolioItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_before_after`);
    return saved ? JSON.parse(saved) : INITIAL_BEFORE_AFTER_PORTFOLIO;
  });

  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_reminders`);
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [quickWalkinModalOpen, setQuickWalkinModalOpen] = useState(false);
  const [receiptModalAppointment, setReceiptModalAppointment] = useState<Appointment | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
      localStorage.setItem(`${STORAGE_KEY}_technicians`, JSON.stringify(technicians));
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
      localStorage.setItem(`${STORAGE_KEY}_designs`, JSON.stringify(designs));
      localStorage.setItem(`${STORAGE_KEY}_appointments`, JSON.stringify(appointments));
      localStorage.setItem(`${STORAGE_KEY}_clients`, JSON.stringify(clients));
      localStorage.setItem(`${STORAGE_KEY}_inventory`, JSON.stringify(inventory));
      localStorage.setItem(`${STORAGE_KEY}_loyalty`, JSON.stringify(loyaltyRewards));
      localStorage.setItem(`${STORAGE_KEY}_before_after`, JSON.stringify(beforeAfterPortfolio));
      localStorage.setItem(`${STORAGE_KEY}_reminders`, JSON.stringify(reminders));
      localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }, [settings, technicians, services, designs, appointments, clients, inventory, loyaltyRewards, beforeAfterPortfolio, reminders, testimonials]);

  const triggerNotification = (message: string, submessage?: string, type: 'success' | 'info' | 'bell' = 'success') => {
    setNotification({ message, submessage, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 5000);
  };

  const startBookingFlow = (design?: NailDesign) => {
    setPreselectedDesign(design || null);
    setBookingModalOpen(true);
  };

  const updateSettings = (newSettings: Partial<StudioSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    triggerNotification('Studio Settings Updated', 'Changes applied across website & booking rules.');
  };

  const addTechnician = (tech: Omit<Technician, 'id'>) => {
    const newTech: Technician = {
      ...tech,
      id: `tech_${Date.now()}`,
    };
    setTechnicians((prev) => [...prev, newTech]);
    triggerNotification('New Staff Member Added', `${tech.name} added to booking roster.`);
  };

  const toggleTechnicianStatus = (id: string) => {
    setTechnicians((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  // Designs Catalog actions (Bi-directional communication feature!)
  const addDesign = (designData: Omit<NailDesign, 'id' | 'createdAt' | 'viewCount' | 'bookingCount'>): NailDesign => {
    const newDesign: NailDesign = {
      ...designData,
      id: `dsg_${Date.now()}`,
      createdAt: TODAY_STRING,
      viewCount: 1,
      bookingCount: 0,
    };
    setDesigns((prev) => [newDesign, ...prev]);
    triggerNotification(
      '✨ Design Added to Live Catalog!',
      `"${newDesign.title}" (KES ${newDesign.priceKES.toLocaleString()}) is now visible to customers online.`
    );
    return newDesign;
  };

  const updateDesign = (id: string, updates: Partial<NailDesign>) => {
    setDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
    triggerNotification('Design Updated', 'Changes synced to public website showcase.');
  };

  const deleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    triggerNotification('Design Removed', 'Removed from public website catalog.');
  };

  // Services
  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `srv_${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
    triggerNotification('New Service Added', `${newService.name} added to menu.`);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Appointments (Bi-directional Booking Engine!)
  const createBooking = (bookingData: Omit<Appointment, 'id' | 'bookingCode' | 'createdAt' | 'remainingBalanceKES'>): Appointment => {
    const bookingCode = `VLN-${Math.floor(1000 + Math.random() * 9000)}`;
    const remainingBalanceKES = Math.max(0, bookingData.totalPriceKES - bookingData.depositPaidKES);
    
    const newAppointment: Appointment = {
      ...bookingData,
      id: `apt_${Date.now()}`,
      bookingCode,
      remainingBalanceKES,
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // If design was booked, increment its booking count
    if (newAppointment.designId) {
      setDesigns((prev) =>
        prev.map((d) =>
          d.id === newAppointment.designId ? { ...d, bookingCount: (d.bookingCount || 0) + 1 } : d
        )
      );
    }

    // Auto-sync into or create client profile
    setClients((prev) => {
      const existing = prev.find(
        (c) => c.phone.replace(/\s+/g, '') === newAppointment.clientPhone.replace(/\s+/g, '') ||
               c.email.toLowerCase() === newAppointment.clientEmail.toLowerCase()
      );

      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                visitCount: c.visitCount + 1,
                totalSpendKES: c.totalSpendKES + newAppointment.depositPaidKES,
                loyaltyPoints: c.loyaltyPoints + Math.floor(newAppointment.depositPaidKES / 100) * 10,
                preferredShape: newAppointment.shape,
                preferredLength: newAppointment.length,
                lastVisitDate: newAppointment.date,
              }
            : c
        );
      } else {
        const newClient: ClientProfile = {
          id: `cli_${Date.now()}`,
          fullName: newAppointment.clientName,
          phone: newAppointment.clientPhone,
          email: newAppointment.clientEmail,
          instagram: newAppointment.clientInstagram || '',
          visitCount: 1,
          totalSpendKES: newAppointment.depositPaidKES,
          loyaltyPoints: Math.floor(newAppointment.depositPaidKES / 100) * 10,
          preferredTechnician: newAppointment.technicianName,
          preferredShape: newAppointment.shape,
          preferredLength: newAppointment.length,
          notes: newAppointment.specialNotes || 'New client booked via online atelier',
          firstVisitDate: newAppointment.date,
          lastVisitDate: newAppointment.date,
          history: [],
        };
        return [newClient, ...prev];
      }
    });

    triggerNotification(
      '📅 New Appointment Confirmed & Synced!',
      `${newAppointment.clientName} booked for ${newAppointment.date} at ${newAppointment.timeSlot}. Deposit: KES ${newAppointment.depositPaidKES.toLocaleString()}`,
      'bell'
    );

    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status'], paymentStatus?: Appointment['paymentStatus']) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === id) {
          const updated = { ...apt, status };
          if (paymentStatus) {
            updated.paymentStatus = paymentStatus;
            if (paymentStatus === 'fully_paid') {
              updated.depositPaidKES = updated.totalPriceKES;
              updated.remainingBalanceKES = 0;
            }
          }
          return updated;
        }
        return apt;
      })
    );
    triggerNotification('Appointment Status Updated', `Status changed to ${status}.`);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );
    triggerNotification('Appointment Cancelled', 'Slot is now freed up for other bookings.');
  };

  // Client Management
  const addClient = (clientData: Omit<ClientProfile, 'id' | 'history' | 'visitCount' | 'totalSpendKES' | 'loyaltyPoints' | 'firstVisitDate' | 'lastVisitDate'>): ClientProfile => {
    const newClient: ClientProfile = {
      ...clientData,
      id: `cli_${Date.now()}`,
      history: [],
      visitCount: 0,
      totalSpendKES: 0,
      loyaltyPoints: 50, // Welcome bonus points!
      firstVisitDate: TODAY_STRING,
      lastVisitDate: TODAY_STRING,
    };
    setClients((prev) => [newClient, ...prev]);
    triggerNotification('Client Profile Created', `${newClient.fullName} added with 50 loyalty points bonus.`);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<ClientProfile>) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    triggerNotification('Client Profile Updated', 'Client preferences and history saved.');
  };

  const addVisitRecord = (clientId: string, recordData: Omit<ClientVisitRecord, 'id'>) => {
    const newRecord: ClientVisitRecord = {
      ...recordData,
      id: `vis_${Date.now()}`,
    };
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            visitCount: c.visitCount + 1,
            totalSpendKES: c.totalSpendKES + recordData.priceKES,
            loyaltyPoints: c.loyaltyPoints + Math.floor(recordData.priceKES / 100) * 10,
            lastVisitDate: recordData.date,
            preferredShape: recordData.shape,
            preferredLength: recordData.length,
            history: [newRecord, ...c.history],
          };
        }
        return c;
      })
    );
    triggerNotification('Nail Set Recorded in Client History', `Set saved with shape ${recordData.shape}, color & photos.`);
  };

  // Inventory
  const updateInventoryStock = (id: string, newQuantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stockQuantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id' | 'lastRestockedDate'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv_${Date.now()}`,
      lastRestockedDate: TODAY_STRING,
    };
    setInventory((prev) => [newItem, ...prev]);
    triggerNotification('Inventory Item Added', `${newItem.name} registered.`);
  };

  // Loyalty
  const addLoyaltyReward = (rewardData: Omit<LoyaltyReward, 'id'>) => {
    const newReward: LoyaltyReward = {
      ...rewardData,
      id: `rew_${Date.now()}`,
    };
    setLoyaltyRewards((prev) => [...prev, newReward]);
    triggerNotification('New Loyalty Reward Added', `${newReward.name} is active.`);
  };

  const redeemLoyaltyPoints = (clientId: string, rewardId: string): boolean => {
    const client = clients.find((c) => c.id === clientId);
    const reward = loyaltyRewards.find((r) => r.id === rewardId);
    if (!client || !reward) return false;

    if (client.loyaltyPoints < reward.pointsCost) {
      triggerNotification('Insufficient Points', `${client.fullName} needs ${reward.pointsCost - client.loyaltyPoints} more points.`, 'info');
      return false;
    }

    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, loyaltyPoints: c.loyaltyPoints - reward.pointsCost } : c
      )
    );
    triggerNotification('🎁 Reward Redeemed!', `${reward.name} redeemed for ${client.fullName}!`);
    return true;
  };

  const addBeforeAfterPortfolioItem = (itemData: Omit<BeforeAfterPortfolioItem, 'id' | 'date'>) => {
    const newItem: BeforeAfterPortfolioItem = {
      ...itemData,
      id: `ba_${Date.now()}`,
      date: TODAY_STRING,
    };
    setBeforeAfterPortfolio((prev) => [newItem, ...prev]);
    triggerNotification('Transformation Set Published', `"${newItem.title}" added to client portfolio.`);
  };

  const toggleFeatureInPublicGallery = (id: string) => {
    setBeforeAfterPortfolio((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featuredInPublicGallery: !item.featuredInPublicGallery } : item
      )
    );
    triggerNotification('Gallery Display Updated', 'Visibility toggled on public website portfolio.');
  };

  const dispatchReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'sent' } : r))
    );
    const reminder = reminders.find((r) => r.id === id);
    triggerNotification('🔔 Reminder Dispatched via SMS / WhatsApp', `Sent to ${reminder?.clientName} (${reminder?.clientPhone}).`);
  };

  // Testimonials / Reviews (Bi-directional Live Studio Acclaim)
  const addTestimonial = (itemData: Omit<TestimonialItem, 'id' | 'date'>) => {
    const newTestimonial: TestimonialItem = {
      ...itemData,
      id: `rev_${Date.now()}`,
      date: 'Just now',
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
    triggerNotification('Testimonial Added', `Review by ${newTestimonial.name} published on live website.`);
  };

  const updateTestimonial = (id: string, updates: Partial<TestimonialItem>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    triggerNotification('Testimonial Updated', 'Changes reflected on public studio reviews.');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    triggerNotification('Testimonial Removed', 'Review removed from live website.');
  };

  const exportDataToCSV = (type: 'appointments' | 'clients') => {
    try {
      let csvContent = '';
      let filename = '';

      if (type === 'appointments') {
        filename = `michelle_atelier_appointments_${TODAY_STRING}.csv`;
        const headers = ['Ref Code', 'Date', 'Time', 'Client', 'Phone', 'Service', 'Design', 'Shape', 'Length', 'Price (KES)', 'Deposit Paid', 'Balance', 'Status', 'Payment Status'];
        const rows = appointments.map((a) => [
          a.bookingCode,
          a.date,
          a.timeSlot,
          `"${a.clientName}"`,
          a.clientPhone,
          `"${a.serviceName}"`,
          `"${a.designName || ''}"`,
          a.shape,
          a.length,
          a.totalPriceKES,
          a.depositPaidKES,
          a.remainingBalanceKES,
          a.status,
          a.paymentStatus,
        ]);
        csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      } else {
        filename = `michelle_atelier_clients_${TODAY_STRING}.csv`;
        const headers = ['Full Name', 'Phone', 'Email', 'Visits', 'Total Spend (KES)', 'Loyalty Points', 'Preferred Shape', 'Preferred Length', 'First Visit', 'Last Visit'];
        const rows = clients.map((c) => [
          `"${c.fullName}"`,
          c.phone,
          c.email,
          c.visitCount,
          c.totalSpendKES,
          c.loyaltyPoints,
          c.preferredShape,
          c.preferredLength,
          c.firstVisitDate,
          c.lastVisitDate,
        ]);
        csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      triggerNotification('📥 Ledger Export Complete', `Downloaded ${filename} successfully.`);
    } catch (err) {
      console.error('CSV Export Error:', err);
    }
  };

  const resetToDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setTechnicians(INITIAL_TECHNICIANS);
    setServices(INITIAL_SERVICES);
    setDesigns(INITIAL_DESIGNS);
    setAppointments(INITIAL_APPOINTMENTS);
    setClients(INITIAL_CLIENTS);
    setInventory(INITIAL_INVENTORY);
    setLoyaltyRewards(INITIAL_LOYALTY_REWARDS);
    setBeforeAfterPortfolio(INITIAL_BEFORE_AFTER_PORTFOLIO);
    setReminders(INITIAL_REMINDERS);
    setTestimonials(INITIAL_TESTIMONIALS);
    localStorage.clear();
    triggerNotification('Reset to Studio Demo Data', 'All original records and designs restored.');
  };

  return (
    <NailStudioContext.Provider
      value={{
        currentView,
        setCurrentView,
        dashboardTab,
        setDashboardTab,
        isAuthenticated,
        login,
        logout,
        settings,
        updateSettings,
        technicians,
        addTechnician,
        toggleTechnicianStatus,
        designs,
        addDesign,
        updateDesign,
        deleteDesign,
        services,
        addService,
        updateService,
        deleteService,
        appointments,
        createBooking,
        updateAppointmentStatus,
        cancelAppointment,
        clients,
        addClient,
        updateClient,
        addVisitRecord,
        inventory,
        updateInventoryStock,
        addInventoryItem,
        loyaltyRewards,
        addLoyaltyReward,
        redeemLoyaltyPoints,
        beforeAfterPortfolio,
        addBeforeAfterPortfolioItem,
        toggleFeatureInPublicGallery,
        reminders,
        dispatchReminder,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        quickWalkinModalOpen,
        setQuickWalkinModalOpen,
        receiptModalAppointment,
        setReceiptModalAppointment,
        exportDataToCSV,
        bookingModalOpen,
        setBookingModalOpen,
        preselectedDesign,
        startBookingFlow,
        notification,
        triggerNotification,
        resetToDefaults,
      }}
    >
      {children}
    </NailStudioContext.Provider>
  );
};

export const useNailStudio = () => {
  const context = useContext(NailStudioContext);
  if (!context) {
    throw new Error('useNailStudio must be used within a NailStudioProvider');
  }
  return context;
};
