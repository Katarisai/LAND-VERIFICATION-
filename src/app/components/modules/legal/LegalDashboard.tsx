import React from 'react';
import { FileText, Clock, CheckCircle2, AlertCircle, Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';

interface LegalCase {
  id: string;
  docName: string;
  type: string;
  submittedBy: string;
  aiScore: number;
  priority: 'high' | 'medium' | 'normal';
  status: 'pending' | 'reviewing';
}

const ASSIGNED_CASES: LegalCase[] = [
  { id: 'CS-102', docName: 'Sale Deed - Survey 44/B', type: 'Title Deed', submittedBy: 'Sarah Seller', aiScore: 88, priority: 'high', status: 'pending' },
  { id: 'CS-105', docName: 'Encumbrance Cert (2024)', type: 'EC', submittedBy: 'Mike Builder', aiScore: 95, priority: 'normal', status: 'pending' },
  { id: 'CS-109', docName: 'Land Tax Receipt', type: 'Tax Record', submittedBy: 'John Doe', aiScore: 65, priority: 'medium', status: 'reviewing' },
];

interface LegalDashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export function LegalDashboard({ user, onNavigate }: LegalDashboardProps) {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6 min-h-screen">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Legal Review</h2>
          <p className="text-gray-500">You have <span className="text-indigo-600 font-bold">3 pending documents</span> requiring review.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline">Case History</Button>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Start Next Review</Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-l-4 border-l-orange-500 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-full text-orange-600"><Clock size={24} /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Pending Review</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-l-4 border-l-green-500 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full text-green-600"><CheckCircle2 size={24} /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Approved Today</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-l-4 border-l-red-500 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full text-red-600"><AlertCircle size={24} /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Flagged Risks</p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* CASE LIST */}
      <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border-white/20">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
            <div className="flex items-center justify-between">
                <CardTitle>Assigned Documents</CardTitle>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search case ID..." className="pl-8 h-9" />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {ASSIGNED_CASES.map((doc) => (
                    <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    {doc.docName}
                                    {doc.priority === 'high' && <Badge variant="destructive" className="h-5 text-[10px]">URGENT</Badge>}
                                </h4>
                                <p className="text-sm text-gray-500">Submitted by {doc.submittedBy} • {doc.type}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold text-gray-400">AI Confidence</p>
                                <p className={`text-sm font-bold ${doc.aiScore > 90 ? 'text-green-600' : doc.aiScore > 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {doc.aiScore}% Match
                                </p>
                            </div>
                            <Button onClick={() => onNavigate('review')} className="bg-gray-900 dark:bg-white text-white dark:text-black">
                                Review <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}