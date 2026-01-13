import { useState } from 'react';
import { LogOut } from 'lucide-react';

// 1. LAYOUT & SHARED
import { MacLayout } from './components/layout/MacLayout';
import { LoginPage } from './components/public/LoginPage';
import { AIAssistant } from './components/common/AIAssistant';
import { SettingsPage } from './components/common/SettingsPage';

// 2. SELLER MODULES
import { SellerDashboard } from './components/modules/seller/SellerDashboard';
import { LandListings } from './components/modules/seller/LandListings';
import { LandDetail } from './components/modules/seller/LandDetail';
import { VerificationWizard } from './components/modules/seller/VerificationWizard';
import { AddProperty } from './components/modules/seller/AddProperty';
// Seller Construction Tools
import { ProjectsPage } from './components/modules/seller/ProjectsPage';
import { RawMaterialsPage } from './components/modules/seller/RawMaterialsPage';
import { WorkersPage } from './components/modules/seller/WorkersPage';
import { SchedulePage } from './components/modules/seller/SchedulePage';
import { DailyReportsPage } from './components/modules/seller/DailyReportsPage';

// 3. BUYER MODULES
import { BuyerDashboard } from './components/modules/buyer/BuyerDashboard';
import { BuyerLandListings } from './components/modules/buyer/BuyerLandListings';
import { PropertyDetailDeep } from './components/modules/buyer/PropertyDetailDeep';

// 4. ADMIN MODULES
import { AdminDashboard } from './components/modules/admin/AdminDashboard';
import { ResolutionDesk } from './components/modules/admin/ResolutionDesk';

// 5. LEGAL MODULES
import { LegalDashboard } from './components/modules/legal/LegalDashboard';
import { DocumentRedline } from './components/modules/legal/DocumentRedline';

export type UserRole = 'buyer' | 'seller' | 'legal' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedLandId, setSelectedLandId] = useState<string | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: '1',
      name: role === 'buyer' ? 'John Buyer' : role === 'seller' ? 'Sarah Seller' : role === 'admin' ? 'Admin User' : 'Legal Expert',
      email: `${role}@cm.com`,
      role
    });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setSelectedLandId(null);
  };

  const handleViewLand = (landId: string) => {
    setSelectedLandId(landId);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    if (currentPage === 'detail') {
      // If buyer, go to listings. If seller, go to listings.
      setCurrentPage('listings');
      setSelectedLandId(null);
    } else {
      setCurrentPage('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEBF0] dark:bg-[#050505]">
      
      {/* 1. LOGIN PAGE */}
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}

      {/* 2. AUTHENTICATED AREA */}
      {currentPage !== 'login' && user && (
        <MacLayout
          user={user}
          activePage={currentPage}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          onChatToggle={() => setShowAIAssistant(!showAIAssistant)}
        >
          
          {/* ================= SELLER MODULES ================= */}
          {user.role === 'seller' && (
            <>
              {currentPage === 'dashboard' && <SellerDashboard user={user} onNavigate={setCurrentPage} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
              {currentPage === 'listings' && <LandListings user={user} onLogout={handleLogout} onViewLand={handleViewLand} onBack={handleBack} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
              {currentPage === 'detail' && selectedLandId && <LandDetail user={user} landId={selectedLandId} onLogout={handleLogout} onBack={handleBack} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
              
              {/* Feature: Verification Wizard */}
              {currentPage === 'documents' && <VerificationWizard user={user} onBack={() => setCurrentPage('dashboard')} />}
              
              {/* Feature: Add Property Wizard */}
              {currentPage === 'add-property' && (
                <AddProperty 
                  onBack={() => setCurrentPage('dashboard')}
                  onComplete={() => setCurrentPage('listings')}
                />
              )}
              
              {/* Construction Tools */}
              {currentPage === 'projects' && <ProjectsPage user={user} onLogout={handleLogout} onBack={() => setCurrentPage('dashboard')} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
              {currentPage === 'materials' && <RawMaterialsPage user={user} onLogout={handleLogout} onBack={() => setCurrentPage('dashboard')} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
              {currentPage === 'workers' && <WorkersPage user={user} onLogout={handleLogout} onBack={() => setCurrentPage('dashboard')} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
              {currentPage === 'schedule' && <SchedulePage user={user} onLogout={handleLogout} onBack={() => setCurrentPage('dashboard')} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
              {currentPage === 'daily-reports' && <DailyReportsPage user={user} onLogout={handleLogout} onBack={() => setCurrentPage('dashboard')} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}
            </>
          )}

           {/* ================= ADMIN MODULES ================= */}
          {user.role === 'admin' && (
             <>
               {currentPage === 'dashboard' && <AdminDashboard user={user} onNavigate={setCurrentPage} />}
               {currentPage === 'resolution-desk' && <ResolutionDesk onBack={() => setCurrentPage('dashboard')} />}
             </>
          )}

          {/* ================= LEGAL MODULES ================= */}
          {user.role === 'legal' && (
            <>
              {currentPage === 'dashboard' && <LegalDashboard user={user} onNavigate={setCurrentPage} />}
              {currentPage === 'review' && <DocumentRedline onBack={() => setCurrentPage('dashboard')} />}
            </>
          )}

          {/* ================= BUYER MODULES ================= */}
          {user.role === 'buyer' && (
            <>
              {/* 1. HOME DASHBOARD (Stats & Welcome) */}
              {currentPage === 'dashboard' && <BuyerDashboard user={user} onNavigate={setCurrentPage} />}

              {/* 2. MARKETPLACE (Map & Search) */}
              {currentPage === 'listings' && <BuyerLandListings user={user} onNavigate={setCurrentPage} />}

              {/* 3. DEEP PROPERTY DETAIL */}
              {currentPage === 'detail' && <PropertyDetailDeep onBack={() => setCurrentPage('listings')} />}
            </>
          )}

          {/* ================= SHARED MODULES ================= */}
          {currentPage === 'settings' && <SettingsPage user={user} onLogout={handleLogout} onBack={() => setCurrentPage('dashboard')} onToggleAI={() => setShowAIAssistant(!showAIAssistant)} />}

          {/* GLOBAL AI */}
          {showAIAssistant && (
            <AIAssistant user={user} onClose={() => setShowAIAssistant(false)} />
          )}

        </MacLayout>
      )}
    </div>
  );
}