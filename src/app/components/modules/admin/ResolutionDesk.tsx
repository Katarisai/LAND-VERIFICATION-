import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, AlertTriangle, CheckCircle2, XCircle, 
  ZoomIn, ZoomOut, Eye, Scan, FileText, ShieldAlert 
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

interface ResolutionDeskProps {
  onBack: () => void;
}

export function ResolutionDesk({ onBack }: ResolutionDeskProps) {
  const [zoom, setZoom] = useState(100);
  const [activeLayer, setActiveLayer] = useState<'original' | 'heatmap'>('original');

  return (
    <div className="flex flex-col h-screen bg-[#F4F5F7] dark:bg-[#050505]">
      
      {/* 1. HEADER: CASE DETAILS */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
                <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    Case #MAN-9921
                    <Badge variant="destructive" className="animate-pulse">AI FAILED</Badge>
                </h1>
                <p className="text-xs text-gray-500">Seller: Sarah Seller • Doc Type: Sale Deed • Reason: <span className="font-mono text-red-500">OCR_CONFIDENCE_LOW (42%)</span></p>
            </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50">
                <XCircle className="w-4 h-4 mr-2" /> Reject Doc
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Force Approve
            </Button>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE (SPLIT VIEW) */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        
        {/* LEFT: THE DOCUMENT (Forensic View) */}
        <div className="col-span-8 bg-gray-100 dark:bg-black/50 relative overflow-hidden flex flex-col">
            
            {/* Toolbar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 dark:bg-black/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1 hover:text-indigo-600"><ZoomOut size={16}/></button>
                <span className="text-xs font-mono w-12 text-center">{zoom}%</span>
                <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1 hover:text-indigo-600"><ZoomIn size={16}/></button>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <button 
                    onClick={() => setActiveLayer('original')}
                    className={`text-xs font-bold px-2 py-1 rounded ${activeLayer === 'original' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
                >
                    Original
                </button>
                <button 
                    onClick={() => setActiveLayer('heatmap')}
                    className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${activeLayer === 'heatmap' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}
                >
                    <Scan size={12} /> AI Heatmap
                </button>
            </div>

            {/* Document Canvas */}
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
                <div 
                    className="relative shadow-2xl transition-transform duration-200 ease-out origin-center"
                    style={{ transform: `scale(${zoom / 100})` }}
                >
                    <img 
                        src="https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=800" 
                        alt="Scanned Doc"
                        className="rounded-lg max-w-[800px]" 
                    />
                    
                    {/* AI ERROR HIGHLIGHT (The "Spectacular" part) */}
                    {activeLayer === 'heatmap' && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute top-[20%] left-[20%] w-[40%] h-[15%] bg-red-500/20 border-2 border-red-500 rounded cursor-help"
                            >
                                <div className="absolute -top-3 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <AlertTriangle size={10} /> Unreadable Text
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute bottom-[10%] right-[10%] w-[20%] h-[10%] bg-yellow-500/20 border-2 border-yellow-500 rounded cursor-help"
                            >
                                <div className="absolute -top-3 left-0 bg-yellow-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <ShieldAlert size={10} /> Missing Stamp
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </div>

        {/* RIGHT: AI INSIGHTS PANEL */}
        <div className="col-span-4 bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-gray-800 p-6 overflow-y-auto">
            
            <div className="mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">AI Diagnostics</h3>
                <Card className="bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-orange-800 dark:text-orange-400">Low Confidence Score</p>
                                <p className="text-xs text-orange-700 dark:text-orange-500 leading-relaxed">
                                    The "Seller Name" field is blurry. AI detected "Srh Sllr" instead of "Sarah Seller". Human verification required.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Extracted Data</h4>
                    <div className="space-y-3">
                        <DataField label="Document No." value="8821 / 2018" status="verified" />
                        <DataField label="Survey No." value="42/A" status="verified" />
                        <DataField label="Seller Name" value="Srh Sllr (?)" status="error" />
                        <DataField label="Stamp Duty" value="Paid" status="warning" />
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Manual Override</h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                         <label className="text-sm font-medium">Corrected Seller Name</label>
                         <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-sm"
                            placeholder="Type correct name..."
                         />
                         <div className="flex items-center gap-2 text-xs text-gray-500">
                            <input type="checkbox" id="stampCheck" />
                            <label htmlFor="stampCheck">I confirm the official stamp is visible</label>
                         </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}

// Helper Component
function DataField({ label, value, status }: { label: string, value: string, status: 'verified' | 'error' | 'warning' }) {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500">{label}</span>
            <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${
                    status === 'verified' ? 'text-gray-900 dark:text-white' : 
                    status === 'error' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                    {value}
                </span>
                {status === 'verified' && <CheckCircle2 size={14} className="text-green-500" />}
                {status === 'error' && <XCircle size={14} className="text-red-500" />}
                {status === 'warning' && <AlertTriangle size={14} className="text-yellow-500" />}
            </div>
        </div>
    )
}