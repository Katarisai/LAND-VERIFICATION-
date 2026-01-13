import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scan, AlertTriangle, CheckCircle2, XCircle, FileText, 
  Map, Fingerprint, Search, ShieldAlert, Loader2 
} from 'lucide-react';
import { Progress } from '../../../ui/progress';
import { Card } from '../../../ui/card';
import { Button } from '../../../ui/button';

interface DocumentScannerProps {
  file: File | null;
  onComplete: (status: 'success' | 'failed' | 'manual', data?: any) => void;
}

export function DocumentScanner({ file, onComplete }: DocumentScannerProps) {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'analyzing' | 'verifying' | 'complete' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  useEffect(() => {
    if (file && scanState === 'idle') {
      startScan();
    }
  }, [file]);

  const startScan = async () => {
    setScanState('scanning');
    
    // PHASE 1: OCR & BASIC CHECK (0-30%)
    addLog("Initiating Optical Character Recognition (OCR)...");
    await wait(1000);
    setProgress(15);
    addLog("Extracting Survey Number and Owner Name...");
    await wait(1000);
    setProgress(30);

    // PHASE 2: GEO-SPATIAL RISK CHECK (30-70%) - The "Spectacular" Part
    setScanState('analyzing');
    addLog("Cross-referencing with Satellite Data...");
    await wait(800);
    addLog("Checking Proximity to Water Bodies (Riverbed Analysis)...");
    await wait(800);
    setProgress(50);
    
    // Simulate a check (Randomly pass or warn for demo)
    const isRisky = Math.random() > 0.9; // 10% chance of riverbed risk
    if (isRisky) {
       addLog("⚠️ WARNING: Proximity to Riverbed detected (<50m)");
    } else {
       addLog("✅ Riverbed Clearance: Safe");
    }

    addLog("Checking Railway Track Buffer Zones...");
    await wait(800);
    setProgress(70);

    // PHASE 3: LEGAL CHECK (70-100%)
    setScanState('verifying');
    addLog("Verifying B-Form Status with Gov Database...");
    await wait(1000);
    
    // PHASE 4: DECISION
    const isUnreadable = Math.random() > 0.9; // 10% chance AI fails to read
    
    if (isUnreadable) {
        setScanState('error');
        addLog("❌ ERROR: Document quality too low for AI.");
        onComplete('manual');
    } else {
        setScanState('complete');
        setProgress(100);
        addLog("✅ Verification Successful. Trust Score Updated.");
        onComplete('success', { 
            risk: isRisky ? 'medium' : 'low',
            extractedData: { surveyNo: '42/A', owner: 'User' }
        });
    }
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <Card className="w-full bg-black/5 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden relative">
      
      {/* SCANNING ANIMATION LAYER */}
      {scanState !== 'idle' && scanState !== 'complete' && scanState !== 'error' && (
        <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-indigo-500 z-20 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="p-8">
        {scanState === 'idle' && (
           <div className="text-center text-gray-500">
              <Scan className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Waiting for document...</p>
           </div>
        )}

        {(scanState === 'scanning' || scanState === 'analyzing' || scanState === 'verifying') && (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                         <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Fingerprint className="w-5 h-5 text-indigo-600" />
                         </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">AI Analysis in Progress</h3>
                        <p className="text-sm text-gray-500">
                            {scanState === 'scanning' && "Reading document structure..."}
                            {scanState === 'analyzing' && "Checking Geo-Spatial Risks..."}
                            {scanState === 'verifying' && "Confirming Legal Status..."}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                <div className="bg-black/80 text-green-400 p-4 rounded-lg font-mono text-xs h-32 overflow-y-auto space-y-1 shadow-inner">
                    {logs.map((log, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                            {log}
                        </motion.div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </div>
        )}

        {scanState === 'complete' && (
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Document Verified</h3>
                <p className="text-gray-500 mb-6">No critical risks found. Authorized for public view.</p>
                <div className="flex justify-center gap-2">
                    <Button variant="outline">View Report</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Continue</Button>
                </div>
            </div>
        )}

        {scanState === 'error' && (
            <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldAlert className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Verification Failed</h3>
                <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                    We couldn't clearly read this document. It has been sent to the <strong>Admin Queue</strong> for manual priority review.
                </p>
                <div className="p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm mb-6 border border-yellow-100">
                    Ticket #MAN-9921 created. Admin will verify in 2-4 hours.
                </div>
                <Button className="bg-gray-900 text-white" onClick={() => onComplete('manual')}>
                    Acknowledge & Continue
                </Button>
            </div>
        )}
      </div>
    </Card>
  );
}