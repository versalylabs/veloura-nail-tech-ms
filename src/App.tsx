import React, { useState } from 'react';
import { NailStudioProvider, useNailStudio } from './context/NailStudioContext';
import { StudioNavBar } from './components/common/StudioNavBar';
import { HeroSection } from './components/website/HeroSection';
import { NailDesignsSection } from './components/website/NailDesignsSection';
import { ServicesPricingSection } from './components/website/ServicesPricingSection';
import { PortfolioSection } from './components/website/PortfolioSection';
import { AboutArtistSection } from './components/website/AboutArtistSection';
import { ReviewsSection } from './components/website/ReviewsSection';
import { InstagramSection } from './components/website/InstagramSection';
import { PublicFooter } from './components/website/PublicFooter';
import { OnlineBookingModal } from './components/website/OnlineBookingModal';

import { ManagementSidebar } from './components/management/ManagementSidebar';
import { DashboardOverview } from './components/management/DashboardOverview';
import { CalendarModule } from './components/management/CalendarModule';
import { ClientsHistoryModule } from './components/management/ClientsHistoryModule';
import { DesignCatalogModule } from './components/management/DesignCatalogModule';
import { ServicesPricingModule } from './components/management/ServicesPricingModule';
import { PaymentsModule } from './components/management/PaymentsModule';
import { InventoryModule } from './components/management/InventoryModule';
import { LoyaltyModule } from './components/management/LoyaltyModule';
import { StaffModule } from './components/management/StaffModule';
import { ReportsModule } from './components/management/ReportsModule';
import { PortfolioManagerModule } from './components/management/PortfolioManagerModule';
import { RemindersModule } from './components/management/RemindersModule';
import { StudioSettingsModule } from './components/management/StudioSettingsModule';
import { TestimonialsManagerModule } from './components/management/TestimonialsManagerModule';
import { QuickWalkinModal } from './components/management/QuickWalkinModal';
import { ReceiptModal } from './components/management/ReceiptModal';
import { FullLookbookPage } from './components/website/FullLookbookPage';
import { NailTechLoginPage } from './components/auth/NailTechLoginPage';
import { Menu } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, dashboardTab, setDashboardTab, startBookingFlow, isAuthenticated, settings } = useNailStudio();
  const [selectedClientNameForHistory, setSelectedClientNameForHistory] = useState<string>('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleSelectClient = (clientName: string) => {
    setSelectedClientNameForHistory(clientName);
    setDashboardTab('clients');
  };

  // If attempting to access management while unauthenticated, show login
  const showLoginView = currentView === 'login' || (currentView === 'management' && !isAuthenticated);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B] flex flex-col font-sans">
      
      {/* Top Bar with Mode Switcher (hidden when on login page for clean focused login) */}
      {!showLoginView && <StudioNavBar />}

      {/* VIEW 0: AUTHENTICATION LOGIN PAGE */}
      {showLoginView && (
        <NailTechLoginPage />
      )}

      {/* VIEW 1: PUBLIC CUSTOMER-FACING NAIL STUDIO WEBSITE */}
      {!showLoginView && currentView === 'website' && (
        <main className="flex-1">
          <HeroSection />
          <NailDesignsSection />
          <ServicesPricingSection />
          <PortfolioSection />
          <AboutArtistSection />
          <ReviewsSection />
          <InstagramSection />
          <PublicFooter />
        </main>
      )}

      {/* VIEW 2: ARCHIVAL LOOKBOOK FULL PAGE (ACCESSED VIA EXPLORE MORE) */}
      {!showLoginView && currentView === 'lookbook' && (
        <main className="flex-1">
          <FullLookbookPage />
        </main>
      )}

      {/* VIEW 3: PRIVATE NAIL TECH BUSINESS MANAGEMENT SYSTEM */}
      {!showLoginView && currentView === 'management' && isAuthenticated && (
        <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)]">
          
          {/* Mobile Management Header Bar (shown on screens < md) */}
          <div className="md:hidden bg-[#1F1D1B] border-b border-[#2E2A27] px-4 py-3 flex items-center justify-between text-white sticky top-[37px] z-30 shadow-md">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] p-1 rounded-lg hover:bg-[#2A2624]"
            >
              <Menu className="w-5 h-5" />
              <span className="capitalize">{dashboardTab} View</span>
            </button>

            <span className="text-[11px] text-[#A8A096] uppercase tracking-wider font-medium">
              Atelier OS
            </span>
          </div>

          {/* Side Navigation (Desktop + Mobile Drawer) */}
          <ManagementSidebar
            onOpenNewDesignModal={() => setDashboardTab('designs')}
            onOpenNewBookingModal={() => startBookingFlow()}
            isMobileOpen={isMobileNavOpen}
            onCloseMobile={() => setIsMobileNavOpen(false)}
          />

          {/* Main Dashboard Canvas */}
          <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl overflow-y-auto">
            {dashboardTab === 'overview' && (
              <DashboardOverview
                onOpenNewDesignModal={() => setDashboardTab('designs')}
                onOpenNewBookingModal={() => startBookingFlow()}
                onSelectClient={handleSelectClient}
              />
            )}

            {dashboardTab === 'calendar' && (
              <CalendarModule
                onOpenNewBookingModal={() => startBookingFlow()}
              />
            )}

            {dashboardTab === 'clients' && (
              <ClientsHistoryModule
                initialSelectedClientName={selectedClientNameForHistory}
              />
            )}

            {dashboardTab === 'designs' && (
              <DesignCatalogModule />
            )}

            {dashboardTab === 'services' && (
              <ServicesPricingModule />
            )}

            {dashboardTab === 'payments' && (
              <PaymentsModule />
            )}

            {dashboardTab === 'inventory' && (
              <InventoryModule />
            )}

            {dashboardTab === 'loyalty' && (
              <LoyaltyModule />
            )}

            {dashboardTab === 'staff' && (
              <StaffModule />
            )}

            {dashboardTab === 'reports' && (
              <ReportsModule />
            )}

            {dashboardTab === 'portfolio' && (
              <PortfolioManagerModule />
            )}

            {dashboardTab === 'reminders' && (
              <RemindersModule />
            )}

            {dashboardTab === 'settings' && (
              <StudioSettingsModule />
            )}

            {dashboardTab === 'testimonials' && (
              <TestimonialsManagerModule />
            )}
          </main>
        </div>
      )}

      {/* Global Interactive Booking Flow Modal */}
      <OnlineBookingModal />

      {/* Quick Walk-in In-Studio Modal */}
      <QuickWalkinModal />

      {/* Printable Digital Receipt Modal */}
      <ReceiptModal />

    </div>
  );
};

export default function App() {
  return (
    <NailStudioProvider>
      <MainAppContent />
    </NailStudioProvider>
  );
}
