import React from 'react';
import { useNailStudio, DashboardTab } from '../../context/NailStudioContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Sparkles, 
  Palette, 
  CreditCard, 
  Package, 
  Gift, 
  BarChart3, 
  UserCheck, 
  Settings, 
  Globe,
  Plus,
  Camera,
  Bell,
  UserPlus,
  MessageSquareQuote,
  LogOut,
  X
} from 'lucide-react';

interface ManagementSidebarProps {
  onOpenNewDesignModal: () => void;
  onOpenNewBookingModal: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const ManagementSidebar: React.FC<ManagementSidebarProps> = ({
  onOpenNewDesignModal,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { 
    dashboardTab, 
    setDashboardTab, 
    setCurrentView, 
    settings, 
    appointments, 
    reminders, 
    setQuickWalkinModalOpen,
    logout 
  } = useNailStudio();

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysAppointmentsCount = appointments.filter(
    (a) => a.date === todayStr && a.status !== 'cancelled'
  ).length;

  const pendingRemindersCount = reminders.filter((r) => r.status === 'pending').length;

  const navItems: { id: DashboardTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: todaysAppointmentsCount },
    { id: 'calendar', label: 'Calendar & Bookings', icon: Calendar },
    { id: 'clients', label: 'Clients & Nail History', icon: Users },
    { id: 'portfolio', label: 'Client Portfolio (B&A)', icon: Camera },
    { id: 'reminders', label: 'Reminders & Follow-ups', icon: Bell, badge: pendingRemindersCount },
    { id: 'designs', label: 'Design Catalog', icon: Sparkles },
    { id: 'services', label: 'Services & Pricing', icon: Palette },
    { id: 'payments', label: 'Payments & Balances', icon: CreditCard },
    { id: 'inventory', label: 'Inventory & Supplies', icon: Package },
    { id: 'loyalty', label: 'Loyalty & Rewards', icon: Gift },
    { id: 'testimonials', label: 'Client Testimonials', icon: MessageSquareQuote },
    { id: 'staff', label: 'Staff & Studio Mode', icon: UserCheck },
    { id: 'reports', label: 'Business Reports', icon: BarChart3 },
    { id: 'settings', label: 'Studio Policies & Setup', icon: Settings },
  ];

  const handleSelectTab = (id: DashboardTab) => {
    setDashboardTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full text-left overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="p-5 sm:p-6 border-b border-[#2E2A27] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880] text-[#191716] flex items-center justify-center font-editorial font-bold text-lg shrink-0">
              V
            </div>
            <div className="truncate">
              <h2 className="font-editorial text-lg text-white font-medium leading-none truncate">
                {settings.businessName}
              </h2>
              <span className="text-[10px] tracking-wider uppercase text-[#C5A880] font-medium block mt-1 truncate">
                Atelier Business OS
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-[#8F877E] hover:text-white hover:bg-[#2A2624]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="p-4 space-y-2">
          <button
            type="button"
            onClick={() => {
              onOpenNewDesignModal();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full bg-[#C5A880] hover:bg-[#D5B990] text-[#191716] py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Design</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setQuickWalkinModalOpen(true);
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full bg-[#2A2624] hover:bg-[#342F2C] text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 border border-[#3E3834]"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>+ Quick Walk-in</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#C5A880]/15 text-[#C5A880] font-semibold border-l-2 border-[#C5A880]'
                    : 'text-[#B8B0A5] hover:text-white hover:bg-[#2A2624]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A880]' : 'text-[#8F877E]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-[#C5A880] text-[#191716] text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Mode Jump */}
      <div className="p-4 border-t border-[#2E2A27] bg-[#191716]/60 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Michelle Mwangi"
            className="w-9 h-9 rounded-full object-cover border border-[#C5A880]/40 shrink-0"
          />
          <div className="truncate">
            <h4 className="text-xs font-semibold text-white truncate">Michelle Mwangi</h4>
            <span className="text-[10px] text-[#A8A096] block truncate">versalylabs@gmail.com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              setCurrentView('website');
            }}
            className="bg-[#2A2624] hover:bg-[#342F2C] text-[#C5A880] py-2 px-2 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1 border border-[#3E3834] truncate"
            title="Switch to Public Website"
          >
            <Globe className="w-3 h-3 shrink-0" />
            <span className="truncate">Website</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              logout();
            }}
            className="bg-[#2A2624] hover:bg-rose-950/40 text-stone-300 hover:text-rose-300 py-2 px-2 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1 border border-[#3E3834] truncate"
            title="Lock and sign out of Nail Tech Portal"
          >
            <LogOut className="w-3 h-3 shrink-0" />
            <span className="truncate">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Sticky, permanent on md+) */}
      <aside className="hidden md:flex w-64 bg-[#1F1D1B] text-[#EFE9E1] flex-col justify-between shrink-0 border-r border-[#2E2A27] min-h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Drawer (Shown when isMobileOpen is true on small screens) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs" 
            aria-hidden="true"
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#1F1D1B] text-[#EFE9E1] shadow-2xl h-full z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
