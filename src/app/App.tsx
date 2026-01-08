import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { LandListings } from './components/LandListings';
import { LandDetail } from './components/LandDetail';
import { AIAssistant } from './components/AIAssistant';
import { ViewDocuments } from './components/ViewDocuments';
import { ProjectsPage } from './components/ProjectsPage';
import { RawMaterialsPage } from './components/RawMaterialsPage';
import { WorkersPage } from './components/WorkersPage';
import { SchedulePage } from './components/SchedulePage';
import { DailyReportsPage } from './components/DailyReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { MacLayout } from './components/layout/MacLayout';
import { LogOut } from 'lucide-react'; // Import icon for the placeholder page

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
      name: role === 'buyer' ? 'John Buyer' : role === 'seller' ? 'Sarah Seller' : 'Legal Expert',
      email: `${role}@cm.com`,
      role
    });
    // Always send them to dashboard first, the Role Guard will decide what they see
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
      setCurrentPage('listings');
      setSelectedLandId(null);
    } else if (currentPage === 'listings') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#EAEBF0] dark:bg-[#050505]">
      
      {/* 1. LOGIN PAGE (Public) */}
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} />
      )}

      {/* 2. AUTHENTICATED AREA */}
      {currentPage !== 'login' && user && (
        <>
          {/* =================================================================================
             🔒 SELLER PORTAL LOCK
             Only render the MacLayout and Dashboard if the user is explicitly a 'seller'.
             ================================================================================= */}
          {user.role === 'seller' ? (
            <MacLayout
              user={user}
              activePage={currentPage}
              onNavigate={setCurrentPage}
              onLogout={handleLogout}
              onChatToggle={() => setShowAIAssistant(!showAIAssistant)}
            >
              {/* --- SELLER ROUTES BUNDLE --- */}
              {currentPage === 'dashboard' && (
                <Dashboard
                  user={user}
                  onNavigate={setCurrentPage}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'listings' && (
                <LandListings
                  user={user}
                  onLogout={handleLogout}
                  onViewLand={handleViewLand}
                  onBack={handleBack}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'detail' && selectedLandId && (
                <LandDetail
                  user={user}
                  landId={selectedLandId}
                  onLogout={handleLogout}
                  onBack={handleBack}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'documents' && (
                <ViewDocuments
                  user={user}
                  onLogout={handleLogout}
                  onBack={() => setCurrentPage('dashboard')}
                />
              )}

              {/* Construction Management Pages */}
              {currentPage === 'projects' && (
                <ProjectsPage
                  user={user}
                  onLogout={handleLogout}
                  onBack={() => setCurrentPage('dashboard')}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'materials' && (
                <RawMaterialsPage
                  user={user}
                  onLogout={handleLogout}
                  onBack={() => setCurrentPage('dashboard')}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'workers' && (
                <WorkersPage
                  user={user}
                  onLogout={handleLogout}
                  onBack={() => setCurrentPage('dashboard')}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'schedule' && (
                <SchedulePage
                  user={user}
                  onLogout={handleLogout}
                  onBack={() => setCurrentPage('dashboard')}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'daily-reports' && (
                <DailyReportsPage
                  user={user}
                  onLogout={handleLogout}
                  onBack={() => setCurrentPage('dashboard')}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {currentPage === 'settings' && (
                <SettingsPage
                  user={user}
                  onLogout={handleLogout}
                  onBack={() => setCurrentPage('dashboard')}
                  onToggleAI={() => setShowAIAssistant(!showAIAssistant)}
                />
              )}

              {/* Placeholder for future Seller modules */}
              {['suppliers', 'work-reports', 'reports', 'analytics'].includes(currentPage) && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🚧</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 capitalize mb-2">
                    {currentPage.replace('-', ' ')}
                  </h2>
                  <p className="text-gray-500 max-w-md">
                    This module is currently under development.
                  </p>
                </div>
              )}

              {/* Global AI Assistant (Seller Only) */}
              {showAIAssistant && (
                <AIAssistant
                  isOpen={showAIAssistant}
                  onClose={() => setShowAIAssistant(false)}
                />
              )}
            </MacLayout>
          ) : (
            
            /* =================================================================================
               ⛔ UNAUTHORIZED / OTHER ROLES
               This is what Buyers or Legal Experts see for now.
               We will replace this with the 'BuyerLayout' in the next step.
               ================================================================================= */
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-center p-4">
               <div className="max-w-md w-full bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl">
                 <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">👤</span>
                 </div>
                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                   Welcome, {user.name}
                 </h1>
                 <p className="text-gray-500 dark:text-gray-400 mb-8">
                   You are logged in as a <strong className="capitalize text-indigo-600">{user.role}</strong>. <br/>
                   The Buyer & Legal portals are coming up next!
                 </p>
                 <button 
                   onClick={handleLogout}
                   className="flex items-center justify-center w-full px-4 py-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl transition-all font-medium"
                 >
                   <LogOut className="w-4 h-4 mr-2" />
                   Sign Out
                 </button>
               </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}