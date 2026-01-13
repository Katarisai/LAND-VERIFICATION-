import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FileCheck, AlertTriangle, Activity, 
  CheckCircle2, XCircle, ChevronRight, Search 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

// --- LEARNING POINT 1: Interfaces ---
// TypeScript needs to know what a "VerificationRequest" looks like.
interface VerificationRequest {
  id: string;
  sellerName: string;
  propertyTitle: string;
  submittedDate: string;
  status: 'pending' | 'reviewing' | 'verified' | 'rejected';
  riskScore: 'low' | 'medium' | 'high';
}

// Mock Data (Updated to include a "reviewing" case for testing the Resolve button)
const INITIAL_REQUESTS: VerificationRequest[] = [
  { id: 'REQ-001', sellerName: 'Sarah Seller', propertyTitle: 'Green Valley Plot 4B', submittedDate: '2 hours ago', status: 'pending', riskScore: 'low' },
  { id: 'REQ-002', sellerName: 'Mike Builder', propertyTitle: 'Lakeside Commercial', submittedDate: '5 hours ago', status: 'reviewing', riskScore: 'medium' },
  { id: 'REQ-003', sellerName: 'John Doe', propertyTitle: 'Agri Land Survey 55', submittedDate: '1 day ago', status: 'rejected', riskScore: 'high' },
];

interface AdminDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 min-h-screen">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Control</h2>
          <p className="text-gray-500">Overview of platform integrity and verifications.</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-600">System Operational</span>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Pending Verifications" value="12" icon={FileCheck} color="text-blue-600" />
        <StatCard title="Active Users" value="2,350" icon={Users} color="text-indigo-600" />
        <StatCard title="Critical Alerts" value="3" icon={AlertTriangle} color="text-red-600" />
        <StatCard title="System Load" value="24%" icon={Activity} color="text-emerald-600" />
      </div>

      {/* MAIN CONTENT: The Verification Queue */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Left Side: The List (Col Span 4) */}
        <Card className="col-span-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle>Verification Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((req) => (
                <div 
                  key={req.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-black/40 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      req.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      req.status === 'verified' ? 'bg-green-100 text-green-600' : 
                      'bg-red-100 text-red-600'
                    }`}>
                      <FileCheck size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{req.propertyTitle}</p>
                      <p className="text-sm text-gray-500">{req.sellerName} • {req.submittedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`
                      ${req.riskScore === 'low' ? 'border-green-200 text-green-700 bg-green-50' : 
                        req.riskScore === 'medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' : 
                        'border-red-200 text-red-700 bg-red-50'}
                    `}>
                      {req.riskScore.toUpperCase()} RISK
                    </Badge>
                    
                    {/* --- THE RESOLVE BUTTON LOGIC --- */}
                    {/* If status is 'reviewing' or 'rejected', show RESOLVE button to open the Desk. */}
                    {req.status === 'rejected' || req.status === 'reviewing' ? (
                        <Button 
                            size="sm" 
                            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20"
                            onClick={() => onNavigate('resolution-desk')}
                        >
                            Resolve
                        </Button>
                    ) : (
                        <Button variant="ghost" size="icon">
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
                        </Button>
                    )}
                    {/* ------------------------------- */}

                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Quick Actions (Col Span 3) */}
        <Card className="col-span-3 bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Admin Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                <h4 className="font-semibold mb-1">Invite Legal Expert</h4>
                <p className="text-xs text-indigo-100 mb-3">Add a new lawyer to the verification panel.</p>
                <Button variant="secondary" size="sm" className="w-full bg-white text-indigo-700 hover:bg-indigo-50">
                    Send Invitation
                </Button>
            </div>
            
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                <h4 className="font-semibold mb-1">System Diagnostics</h4>
                <p className="text-xs text-indigo-100 mb-3">Run a full check on the AI models.</p>
                <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10">
                    Run Diagnostics
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple Helper Component for the top stats
function StatCard({ title, value, icon: Icon, color }: any) {
    return (
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-white/20 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} strokeWidth={2.5} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
            </CardContent>
        </Card>
    )
}