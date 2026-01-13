import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Map as MapIcon, List, Filter, MapPin, ShieldCheck, Droplets, Mountain, Ruler, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';

// Mock Data
const PROPERTIES = [
  {
    id: 1,
    title: "Green Valley Plots - Phase 1",
    location: "Visakhapatnam, Madhurawada",
    price: "$45,000",
    size: "2,400 sq.ft",
    type: "Residential (R1)",
    trustScore: 98,
    verified: true,
    vitals: { soil: "Red Loam", water: "40ft", zone: "Safe" },
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Lakeside Commercial Land",
    location: "Vijayawada, Benz Circle",
    price: "$120,000",
    size: "5,000 sq.ft",
    type: "Commercial (C2)",
    trustScore: 85,
    verified: true,
    vitals: { soil: "Black Cotton", water: "20ft", zone: "Warning" },
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Seaview Heights",
    location: "Bheemili Beach Road",
    price: "$65,000",
    size: "3,000 sq.ft",
    type: "Residential (R2)",
    trustScore: 95,
    verified: true,
    vitals: { soil: "Sandy Loam", water: "12ft", zone: "Safe" },
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    title: "Riverside Cottage Plot",
    location: "Rajahmundry Godavari Bank",
    price: "$55,000",
    size: "2,200 sq.ft",
    type: "Residential",
    trustScore: 99,
    verified: true,
    vitals: { soil: "Alluvial", water: "10ft", zone: "Safe" },
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000",
  }
];

interface BuyerLandListingsProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function BuyerLandListings({ user, onNavigate }: BuyerLandListingsProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] overflow-hidden">
      
      {/* 1. TOP BAR */}
      <div className="flex-none px-6 py-4 bg-white/50 dark:bg-black/20 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-4 items-center justify-between z-20">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Land Marketplace</h1>
          <p className="text-gray-500 text-xs">Verified plots with clear titles.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search location..." className="pl-9 h-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10"><Filter className="w-4 h-4" /></Button>
          <div className="bg-white dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-800 flex">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600' : 'text-gray-400'}`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 relative overflow-hidden">
        
        {/* VIEW 1: THE MAP */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-300 ${viewMode === 'map' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
             <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                 <div className="text-center">
                    <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold text-xl">Interactive Map Mode</p>
                    <p className="text-gray-500 text-sm">Showing {PROPERTIES.length} verified plots in this area</p>
                 </div>
             </div>
        </div>

        {/* VIEW 2: THE LIST */}
        <div className={`absolute inset-0 z-10 overflow-y-auto p-6 bg-[#F8FAFC] dark:bg-[#0B0F19] transition-transform duration-300 ${viewMode === 'map' ? 'translate-x-full' : 'translate-x-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {PROPERTIES.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="group overflow-hidden border-0 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onNavigate('detail')}>
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                      <ShieldCheck className={`w-3 h-3 ${property.trustScore > 90 ? 'text-green-500' : 'text-yellow-500'}`} />
                      {property.trustScore}%
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div onClick={() => onNavigate('detail')} className="cursor-pointer">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {property.location}
                      </div>
                    </div>
                    {/* Vitals */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-gray-100 dark:border-gray-800">
                      <div className="text-center">
                        <Mountain className="w-3 h-3 text-orange-500 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-400">Soil</p>
                        <p className="text-xs font-semibold">{property.vitals.soil}</p>
                      </div>
                      <div className="text-center border-l border-r border-gray-100 dark:border-gray-800">
                        <Droplets className="w-3 h-3 text-blue-500 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-400">Water</p>
                        <p className="text-xs font-semibold">{property.vitals.water}</p>
                      </div>
                      <div className="text-center">
                        <Ruler className="w-3 h-3 text-purple-500 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-400">Zone</p>
                        <p className="text-xs font-semibold">{property.type.split(' ')[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{property.price}</p>
                        <p className="text--[10px] text-gray-500">{property.size}</p>
                      </div>
                      <Button size="sm" className="bg-gray-900 hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 h-8 text-xs" onClick={() => onNavigate('detail')}>
                        Details <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}