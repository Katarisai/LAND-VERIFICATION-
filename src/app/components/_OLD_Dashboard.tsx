import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, ShieldCheck, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { RecentActivity } from "./dashboard/RecentActivity";
import { OverviewChart, InquiryChart } from "./dashboard/DashboardCharts";
import { AiInsightCard } from "./dashboard/AiInsightCard";

interface DashboardProps {
  user?: any;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
  onToggleAI?: () => void;
}

export const Dashboard = ({ user, onNavigate, onToggleAI }: DashboardProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-transparent min-h-screen">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, {user?.name || 'User'}.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">Download Report</Button>
          <Button onClick={() => onNavigate?.('listings')} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20 border-0">Add New Property</Button>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        
        {/* ROW 1: Summary Stats with SPOTLIGHT EFFECT */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SpotlightCard title="Total Revenue" value="$45,231.89" icon={<ArrowUpRight className="text-green-500" />} subtext="+20.1% from last month" delay={0.1} />
          <SpotlightCard title="Active Listings" value="5" icon={<MapPin className="text-blue-500" />} subtext="2 pending verification" delay={0.2} />
          <SpotlightCard title="Trust Score" value="98%" icon={<ShieldCheck className="text-purple-500" />} subtext="Top 5% of sellers" delay={0.3} />
          <SpotlightCard title="Pending Inquiries" value="12" icon={<Users className="text-orange-500" />} subtext="+4 since yesterday" delay={0.4} />
        </div>

        {/* ROW 2: Analytics - FORCED 7 COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start">
          <OverviewChart />
          <InquiryChart />
        </div>

        {/* ROW 3: Activity & AI */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start">
          <RecentActivity />
          <AiInsightCard />
        </div>

      </motion.div>
    </div>
  );
};

// --- NEW COMPONENT: SPOTLIGHT CARD ---
const SpotlightCard = ({ title, value, icon, subtext, delay }: { title: string, value: string, icon: any, subtext: string, delay: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay }}
      className="relative group"
    >
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-lg transition-transform duration-300 hover:-translate-y-1"
      >
        {/* The Spotlight Glow Layer */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,100,100,0.1), transparent 40%)`,
          }}
        />
        
        <Card className="bg-transparent border-0 relative z-10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</CardTitle>
            <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
              {icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};