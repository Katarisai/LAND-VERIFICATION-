import React, { useState, useEffect } from 'react';
// 1. IMPORT THE NEW TOGGLE
import { ExplainModeToggle } from '../common/ExplainModeToggle';
import { Home, Map, FileText, Settings, LogOut, Menu, X, Search, Sun, Moon, PieChart, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MacLayoutProps {
  children: React.ReactNode;
  user: any;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onChatToggle: () => void;
}

export function MacLayout({ children, user, activePage, onNavigate, onLogout, onChatToggle }: MacLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // 2. ADD STATE FOR EXPLAIN MODE
  const [isExplainMode, setIsExplainMode] = useState(false);
  
  // --- SUPERB PHYSICS CURSOR ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - 300);
    mouseY.set(e.clientY - 300);
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'listings', icon: Map, label: 'Properties' },
    { id: 'analytics', icon: PieChart, label: 'Analytics' },
    { id: 'documents', icon: FileText, label: 'Documents' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div 
        onMouseMove={handleMouseMove}
        className="flex h-screen w-full bg-[#E0E2E8] dark:bg-[#050505] transition-colors duration-300 overflow-hidden relative font-sans selection:bg-red-500/30"
    >
      
      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.3] dark:opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(#9CA3AF 1px, transparent 1px), linear-gradient(to right, #9CA3AF 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div 
            className="absolute rounded-full blur-[100px] opacity-40 dark:opacity-20"
            style={{
                width: 600,
                height: 600,
                x: springX,
                y: springY,
                background: isDarkMode 
                    ? 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(0,0,0,0) 70%)' 
                    : 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(255,255,255,0) 70%)',
                zIndex: 0
            }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50 flex items-center justify-between px-4">
        <span className="font-bold text-lg text-gray-900 dark:text-white">CM Platform</span>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed lg:static inset-y-0 left-0 z-[70]
          flex flex-col justify-between
          bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-white/40 dark:border-white/10
          transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isMobileMenuOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0'} 
          ${isHovered ? 'lg:w-64' : 'lg:w-20'} 
          pt-0 lg:pt-4
        `}
      >
        <div className="flex flex-col h-full px-3">
             <div className="flex lg:hidden justify-end p-4">
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className={`hidden lg:flex items-center h-16 px-2 mb-4 overflow-hidden whitespace-nowrap ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-600">CM Platform</span>
            </div>
            <nav className="flex-1 space-y-2 mt-4 px-2">
                {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }}
                    className={`relative w-full flex items-center h-12 rounded-2xl transition-all duration-300 group
                      ${activePage === item.id 
                        ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-orange-500/20" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"}
                      ${(isHovered || isMobileMenuOpen) ? 'justify-start px-4' : 'justify-center px-0'}
                    `}
                >
                    <item.icon 
                        size={20} 
                        strokeWidth={2}
                        className={`flex-shrink-0 transition-transform duration-300 ${activePage === item.id ? 'scale-110' : ''}`}
                    />
                    <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${(isHovered || isMobileMenuOpen) ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
                        {item.label}
                    </span>
                </button>
                ))}
            </nav>
            <div className="p-2 mt-auto mb-4">
                <div className={`flex items-center gap-3 p-2 rounded-2xl transition-all ${isHovered ? 'bg-gray-100 dark:bg-white/5' : 'justify-center bg-transparent'}`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-orange-500 shadow-md flex-shrink-0"></div>
                    <div className={`overflow-hidden transition-all duration-300 ${isHovered || isMobileMenuOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>
                        <p className="text-sm font-bold truncate text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate capitalize">{user.role}</p>
                    </div>
                    <button onClick={onLogout} className={`ml-auto text-gray-400 hover:text-red-500 ${isHovered || isMobileMenuOpen ? 'block' : 'hidden'}`}>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative pt-16 lg:pt-0 bg-transparent z-10">
        
        {/* HEADER */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/20 dark:border-white/5 sticky top-0 z-20">
            <div className="flex items-center bg-white/50 dark:bg-gray-800/50 rounded-full px-4 py-2 w-96 border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-sm transition-all focus-within:ring-2 focus-within:ring-red-500/20">
                <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                <input type="text" placeholder="Search properties..." className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-gray-900 dark:text-white placeholder:text-gray-500" />
            </div>
            
            <div className="flex items-center gap-4">
               <button 
                 onClick={onChatToggle}
                 className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-white/10 rounded-full px-4 py-2 flex items-center transition-all hover:scale-105 active:scale-95 z-50"
                 >
                   <Sparkles className="mr-2 h-4 w-4 animate-pulse text-yellow-300" />
                   Ask AI Assistant
               </button>

                <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth relative z-10">
           {children}
        </div>
      </main>

      {/* 3. PLACE THE TOGGLE HERE (Global Overlay) */}
      <ExplainModeToggle 
        isActive={isExplainMode} 
        onToggle={() => setIsExplainMode(!isExplainMode)} 
      />

    </div>
  );
}