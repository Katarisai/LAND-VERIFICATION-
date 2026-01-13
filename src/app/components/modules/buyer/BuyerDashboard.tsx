import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, MapPin, TrendingUp, Bell, ChevronRight, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Badge } from '../../ui/badge';

interface BuyerDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function BuyerDashboard({ user, onNavigate }: BuyerDashboardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-[#F4F5F7] dark:bg-[#050505] overflow-y-auto">
      
      {/* 1. WELCOME SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-gray-500">Here's what's happening with your property search.</p>
        </div>
        <Button 
          onClick={() => onNavigate('listings')} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
        >
          <Search className="w-4 h-4 mr-2" /> Browse Properties
        </Button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        
        {/* 2. STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={Heart} 
            label="Saved Properties" 
            value="12" 
            sub="+2 this week" 
            color="text-pink-500" 
            bg="bg-pink-50 dark:bg-pink-900/10"
          />
          <StatCard 
            icon={Clock} 
            label="Recently Viewed" 
            value="28" 
            sub="History kept for 30 days" 
            color="text-blue-500" 
            bg="bg-blue-50 dark:bg-blue-900/10"
          />
          <StatCard 
            icon={Bell} 
            label="New Matches" 
            value="5" 
            sub="Based on your preferences" 
            color="text-orange-500" 
            bg="bg-orange-50 dark:bg-orange-900/10"
          />
        </div>

        {/* 3. CONTINUE SEARCHING (Horizontal Scroll) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Continue Searching</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('listings')} className="text-indigo-600">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-slate-900" onClick={() => onNavigate('detail')}>
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1500382017468-9049fed747ef' : i === 2 ? '1448630360428-65456885c650' : '1470071459604-3b5ec3a7fe05'}?auto=format&fit=crop&q=80&w=500`}
                    alt="Property"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-2 right-2 bg-white/90 text-black backdrop-blur">
                    {i === 1 ? '$45,000' : i === 2 ? '$120,000' : '$65,000'}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white truncate">Green Valley Plot {i}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3 mr-1" /> Visakhapatnam, Sector {i}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. RECENT ACTIVITY LIST */}
        <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
               <ActivityItem 
                 icon={Heart} 
                 title="You liked 'Lakeside Commercial Land'" 
                 time="2 hours ago" 
                 bg="bg-pink-100 text-pink-600"
               />
               <ActivityItem 
                 icon={TrendingUp} 
                 title="Price dropped for 'Seaview Heights'" 
                 time="5 hours ago" 
                 bg="bg-green-100 text-green-600"
               />
               <ActivityItem 
                 icon={Search} 
                 title="New search alert created for 'Madhurawada'" 
                 time="1 day ago" 
                 bg="bg-blue-100 text-blue-600"
               />
            </div>
          </CardContent>
        </Card>

      </motion.div>
    </div>
  );
}

// Helper Components
function StatCard({ icon: Icon, label, value, sub, color, bg }: any) {
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 hover:-translate-y-1 transition-transform">
      <CardContent className="p-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
          <p className={`text-xs mt-1 ${color}`}>{sub}</p>
        </div>
        <div className={`p-3 rounded-xl ${bg}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ icon: Icon, title, time, bg }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-full ${bg}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}