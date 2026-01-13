import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, CheckCircle2, XCircle, AlertTriangle, 
  ZoomIn, ZoomOut, Save, Eye, ScanSearch 
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';

interface DocumentRedlineProps {
  onBack: () => void;
}

export function DocumentRedline({ onBack }: DocumentRedlineProps) {
  // Mock AI Findings
  const [findings, setFindings] = useState([
    { id: 1, text: "Seller Name matches Title Deed", verified: false, risk: "low" },
    { id: 2, text: "Survey Number consistent with EC", verified: false, risk: "low" },
    { id: 3, text: "Registration Date Validity (1998)", verified: false, risk: "low" },
    { id: 4, text: "Signature Verification Confidence > 98%", verified: false, risk: "medium" },
    { id: 5, text: "No visible tampering or watermarks", verified: false, risk: "high" },
  ]);

  const verifiedCount = findings.filter(f => f.verified).length;
  const progress = (verifiedCount / findings.length) * 100;

  const toggleFinding = (id: number) => {
    setFindings(findings.map(f => f.id === id ? { ...f, verified: !f.verified } : f));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-4 gap-4">
      
      {/* TOP BAR */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
                <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Document Review: Sale Deed #8821</h1>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">AI Pre-Scanned</Badge>
                    <span>• Uploaded 2 hours ago</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block mr-2">
                <p className="text-xs font-bold text-gray-500 uppercase">Verification Progress</p>
                <div className="flex items-center gap-2">
                    <Progress value={progress} className="w-32 h-2" />
                    <span className="text-xs font-bold">{progress.toFixed(0)}%</span>
                </div>
            </div>
            <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200">
                <XCircle className="w-4 h-4 mr-2" /> Reject
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20" disabled={progress < 100}>
                <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
            </Button>
        </div>
      </div>

      {/* MAIN SPLIT VIEW */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT: DOCUMENT VIEWER (Col Span 7) */}
        <Card className="lg:col-span-7 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 relative overflow-hidden group flex items-center justify-center">
            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white rounded-full px-4 py-2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="hover:text-blue-400"><ZoomOut size={18} /></button>
                <span className="text-xs font-mono border-l border-r border-white/20 px-3">100%</span>
                <button className="hover:text-blue-400"><ZoomIn size={18} /></button>
            </div>

            {/* Simulated Document Image */}
            <div className="relative shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=1000" 
                    alt="Document" 
                    className="max-h-[70vh] w-auto object-contain rounded-lg border border-gray-300" 
                />
                
                {/* AI Overlay Box (Simulated Highlighting) */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                    className="absolute top-[20%] left-[20%] w-[40%] h-[10%] border-2 border-yellow-400 bg-yellow-400/20 rounded-sm cursor-pointer"
                >
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        AI Check
                    </div>
                </motion.div>
            </div>
        </Card>

        {/* RIGHT: ANALYSIS PANEL (Col Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4 overflow-y-auto">
            
            {/* AI Summary Card */}
            <Card className="bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30 p-4">
                <div className="flex items-start gap-3">
                    <ScanSearch className="w-8 h-8 text-indigo-600 mt-1" />
                    <div>
                        <h3 className="font-bold text-indigo-900 dark:text-indigo-300">AI Analysis Complete</h3>
                        <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                            The document structure matches standard Format 4B. No forgery detected. Please verify the 5 checkpoints below.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Checklist */}
            <Card className="flex-1 border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold">Verification Points</h3>
                </div>
                <div className="p-2 space-y-1">
                    {findings.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => toggleFinding(item.id)}
                            className={`
                                p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-all border
                                ${item.verified 
                                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' 
                                    : 'bg-white dark:bg-slate-800 border-transparent hover:bg-gray-50 dark:hover:bg-slate-800/50'}
                            `}
                        >
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                                item.verified ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-transparent'
                            }`}>
                                <CheckCircle2 size={14} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${item.verified ? 'text-green-800 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {item.text}
                                </p>
                                {!item.verified && (
                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1 block">Click to verify</span>
                                )}
                            </div>
                            {item.risk === 'high' && !item.verified && (
                                <AlertTriangle className="w-4 h-4 text-orange-500 animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
            </Card>

        </div>
      </div>

    </div>
  );
}