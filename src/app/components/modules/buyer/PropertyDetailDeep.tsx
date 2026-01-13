import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, MapPin, ShieldCheck, FileCheck, User, Share2, Heart, CheckCircle2, 
  School, Hospital, Bus, ShoppingBag, TrendingUp, Calculator, Compass, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { PlotVisualizer } from './PlotVisualizer';
import { TimelineSlider } from './TimelineSlider';

// Mock Data for Charts
const PRICE_DATA = [
  { year: '2020', price: 1200 },
  { year: '2021', price: 1350 },
  { year: '2022', price: 1500 },
  { year: '2023', price: 1680 },
  { year: '2024', price: 1875 }, // Current
  { year: '2025', price: 2100 }, // Projected
];

interface PropertyDetailDeepProps {
  onBack: () => void;
}

export function PropertyDetailDeep({ onBack }: PropertyDetailDeepProps) {
  // Construction Calculator State
  const [floors, setFloors] = useState(2);
  const baseRate = 1800; // Cost per sq ft construction
  const estimatedCost = floors * 2400 * baseRate;

  return (
    <div className="flex flex-col h-screen bg-[#F4F5F7] dark:bg-[#050505] overflow-y-auto">
      
      {/* 1. HERO HEADER */}
      <div className="relative h-[40vh] min-h-[350px]">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1920" 
          alt="Land" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
          <Button variant="secondary" size="icon" onClick={onBack} className="rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white border-white/20">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white border-white/20"><Share2 className="w-4 h-4" /></Button>
            <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white border-white/20"><Heart className="w-4 h-4" /></Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
          <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex gap-2 mb-3">
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 border-0 text-white px-3 py-1">RERA Approved</Badge>
                        <Badge variant="outline" className="border-white/50 text-white bg-white/10 backdrop-blur-md">Survey No. 42/A</Badge>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg">Green Valley Plot 4B</h1>
                    <div className="flex items-center text-gray-200 font-medium">
                        <MapPin className="w-4 h-4 mr-2 text-emerald-400" />
                        Madhurawada IT SEZ • <span className="text-emerald-300 ml-1">Safe Zone (R1)</span>
                    </div>
                </div>
                <div className="text-left md:text-right bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <p className="text-4xl font-bold text-white">$45,000</p>
                    <p className="text-sm text-gray-300 font-medium">$18.75 / sq.ft</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-6xl mx-auto w-full p-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- LEFT COLUMN (66%) --- */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Quick Vitals */}
                <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
                    <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Plot Area</p>
                            <p className="font-bold text-xl text-gray-900 dark:text-white">2,400</p>
                            <p className="text-xs text-gray-500">sq.ft</p>
                        </div>
                        <div className="text-center border-l border-gray-100 dark:border-gray-800">
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Dimensions</p>
                            <p className="font-bold text-xl text-gray-900 dark:text-white">40 x 60</p>
                            <p className="text-xs text-gray-500">ft</p>
                        </div>
                        <div className="text-center border-l border-gray-100 dark:border-gray-800">
                            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Facing</p>
                            <p className="font-bold text-xl text-gray-900 dark:text-white">N-East</p>
                            <p className="text-xs text-gray-500">Vastu</p>
                        </div>
                        <div className="text-center border-l border-gray-100 dark:border-gray-800">
                             <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Ownership</p>
                            <p className="font-bold text-xl text-gray-900 dark:text-white">Freehold</p>
                            <p className="text-xs text-gray-500">Clear Title</p>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Investment Analysis */}
                <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" /> Investment Growth
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={PRICE_DATA}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        <p className="text-center text-xs text-gray-500 mt-2">*Projected value based on neighborhood CAGR of 12.5%</p>
                    </CardContent>
                </Card>

                {/* 3. Construction Estimator */}
                <Card className="border-0 shadow-sm bg-white dark:bg-slate-900">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-orange-600" /> Construction Estimator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Estimated Cost</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">${(estimatedCost / 1000).toFixed(1)}k</p>
                            </div>
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Get Detailed Quote</Button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Number of Floors (G + {floors})</label>
                                    <span className="text-sm font-bold">{floors}</span>
                                </div>
                                <input 
                                    type="range" min="1" max="5" value={floors} 
                                    onChange={(e) => setFloors(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Location Highlights */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Location Highlights</h3>
                    <div className="space-y-4">
                        <LocationRow icon={School} title="Delhi Public School" dist="1.2 km" time="5 mins" />
                        <LocationRow icon={Hospital} title="Apollo Hospitals" dist="3.5 km" time="12 mins" />
                        <LocationRow icon={ShoppingBag} title="D-Mart Supermarket" dist="0.8 km" time="3 mins" />
                        <LocationRow icon={Bus} title="RTC Bus Complex" dist="5.0 km" time="18 mins" />
                    </div>
                </div>

                {/* 5. Ownership History */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Ownership History (Chain of Title)</h3>
                    <div className="border-l-2 border-indigo-100 dark:border-indigo-900 ml-3 space-y-8">
                        <TimelineItem year="2024" title="Legal Verification Passed" desc="Verified by CM Platform Legal Team. EC is clear." icon={ShieldCheck} active />
                        <TimelineItem year="2018" title="Purchased by Sarah Seller" desc="Acquired via Sale Deed Doc #8821/2018" icon={User} />
                    </div>
                </div>
                
                {/* 6. TIMELINE SLIDER (ADDED HERE) */}
                <TimelineSlider />

            </div>

            {/* --- RIGHT COLUMN (33%) --- */}
            <div className="space-y-6">
                
                {/* 1. Trust Score Card */}
                <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-0 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-24 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <CardContent className="p-8 text-center relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                             <ShieldCheck className="w-5 h-5 text-emerald-400" />
                             <span className="text-indigo-200 text-sm font-bold tracking-widest uppercase">CM Verified</span>
                        </div>
                        <div className="text-6xl font-bold mb-2 flex items-center justify-center gap-2 tracking-tighter">
                            98<span className="text-2xl opacity-50 font-medium">/100</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-xs text-indigo-100 border border-white/10 mt-4">
                            "This property has <strong>0 legal disputes</strong> and cleared all 5 checkpoints."
                        </div>
                    </CardContent>
                </Card>
                 
                {/* 2. 3D Plot Visualizer (ADDED HERE) */}
                 <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <MapPin size={16} /> 3D Plot Geometry
                    </h4>
                    <PlotVisualizer shape="rectangular" score={98} />
                </div>

                {/* 3. Vastu Compass */}
                <Card className="bg-white dark:bg-slate-900 border-0 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Compass className="w-4 h-4 text-purple-600" /> Vastu Compliance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full border-4 border-gray-100 flex items-center justify-center">
                            <div className="absolute top-0 text-[8px] font-bold">N</div>
                            <div className="absolute right-0 text-[8px] font-bold">E</div>
                            <div className="absolute bottom-0 text-[8px] font-bold">S</div>
                            <div className="absolute left-0 text-[8px] font-bold">W</div>
                            <div className="w-0.5 h-10 bg-purple-600 rotate-45 origin-bottom" />
                        </div>
                        <div>
                            <p className="font-bold text-green-600">Excellent</p>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                North-East Extension is highly auspicious for financial growth.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Verified Docs List (UPDATED WITH MONETIZATION) */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Verified Documents</h4>
                    <div className="space-y-2">
                        <DocumentRow name="Encumbrance Certificate (EC)" />
                        <DocumentRow name="Link Documents (30 yrs)" />
                        <DocumentRow name="Property Tax (2024)" />
                        <DocumentRow name="Land Use Certificate" />
                    </div>
                    {/* MONETIZATION BUTTON */}
                    <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold h-12 shadow-lg shadow-orange-500/20">
                        Unlock Premium Report ($49)
                    </Button>
                    <p className="text-[10px] text-center text-gray-400 mt-2">
                        Includes full legal history, 30-year satellite replay, and lawyer opinion.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

// Helper Components
function LocationRow({ icon: Icon, title, dist, time }: any) {
    return (
        <div className="flex items-center justify-between py-1 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-600 dark:text-gray-400">
                    <Icon size={16} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{title}</span>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{dist}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    )
}

function TimelineItem({ year, title, desc, icon: Icon, active }: any) {
    return (
        <div className="relative pl-8">
            <div className={`
                absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 
                ${active ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' : 'bg-white dark:bg-black border-gray-300 dark:border-gray-700'}
            `} />
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {year}
                </span>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
        </div>
    )
}

function DocumentRow({ name }: { name: string }) {
    return (
        <div className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 hover:border-indigo-500 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600">{name}</span>
            </div>
            <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-600" />
        </div>
    )
}