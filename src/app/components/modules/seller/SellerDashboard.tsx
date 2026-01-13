import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, ShieldCheck, Users } from "lucide-react";

// --- FIXED IMPORTS ---
// Change from "../../common/ui/..." to "../../ui/..."
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

// These should work if you moved the 'dashboard' folder inside 'seller'
import { RecentActivity } from "./dashboard/RecentActivity";
import { OverviewChart, InquiryChart } from "./dashboard/DashboardCharts";
import { AiInsightCard } from "./dashboard/AiInsightCard";

interface DashboardProps {
  user?: any;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
  onToggleAI?: () => void;
}

export const SellerDashboard = ({ user, onNavigate, onToggleAI }: DashboardProps) => {
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
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Seller Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, {user?.name || 'User'}.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200 dark:border-slate-700">Download Report</Button>
          <Button onClick={() => onNavigate?.('add-property')} className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 text-white">Add New Property</Button>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Revenue" value="$45,231.89" icon={<ArrowUpRight className="text-green-500" />} subtext="+20.1% from last month" />
          <StatCard title="Active Listings" value="5" icon={<MapPin className="text-blue-500" />} subtext="2 pending verification" />
          <StatCard title="Trust Score" value="98%" icon={<ShieldCheck className="text-purple-500" />} subtext="Top 5% of sellers" />
          <StatCard title="Pending Inquiries" value="12" icon={<Users className="text-orange-500" />} subtext="+4 since yesterday" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start">
          <OverviewChart />
          <InquiryChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start">
          <RecentActivity />
          <AiInsightCard />
        </div>

      </motion.div>
    </div>
  );
};

const StatCard = ({ title, value, icon, subtext }: { title: string, value: string, icon: any, subtext: string }) => (
  <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
    <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</CardTitle>
        <div className="p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>
      </CardContent>
    </Card>
  </motion.div>
);