import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/card";

const landValueData = [
  { name: 'Jan', value: 40000 }, { name: 'Feb', value: 30000 }, { name: 'Mar', value: 55000 },
  { name: 'Apr', value: 48000 }, { name: 'May', value: 65000 }, { name: 'Jun', value: 78000 },
];

const inquiryData = [
  { name: 'Mon', calls: 4, emails: 2 }, { name: 'Tue', calls: 3, emails: 5 },
  { name: 'Wed', calls: 7, emails: 1 }, { name: 'Thu', calls: 2, emails: 4 },
  { name: 'Fri', calls: 6, emails: 8 },
];

// FIX: Increased opacity (bg-white/80) and stronger shadow
const glassCardClass = "bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-lg hover:shadow-indigo-500/5 transition-all duration-300";

export function OverviewChart() {
  return (
    <Card className={`col-span-1 lg:col-span-4 ${glassCardClass}`}>
      <CardHeader>
        <CardTitle className="text-slate-800 dark:text-white">Asset Value Trends</CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">Your portfolio appreciation over 6 months.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={landValueData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} stroke="currentColor" className="text-slate-400 dark:text-slate-600"/>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function InquiryChart() {
  return (
    <Card className={`col-span-1 lg:col-span-3 ${glassCardClass}`}>
      <CardHeader>
        <CardTitle className="text-slate-800 dark:text-white">Inquiries</CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">Traffic sources this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={inquiryData}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{fill: 'transparent'}} 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="calls" fill="#a3e635" radius={[4, 4, 0, 0]} />
            <Bar dataKey="emails" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}