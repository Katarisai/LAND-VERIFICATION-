import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, FileCheck, CheckCircle2, UploadCloud, AlertTriangle, Eye, ArrowRight, ChevronLeft } from 'lucide-react';

// --- FIXED IMPORTS ---
// Change from "../../common/ui/..." to "../../ui/..."
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Progress } from '../../ui/progress';

interface VerificationWizardProps {
  user: any;
  onBack: () => void;
}

const STEPS = [
  {
    id: 1,
    title: "Public Verification",
    desc: "Prove identity without revealing sensitive deeds.",
    icon: FileCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: 2,
    title: "Ownership Proof",
    desc: "Upload Encumbrance Certificate (EC).",
    icon: Shield,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: 3,
    title: "Secure Vault",
    desc: "Original Deed (Stored offline in Safe Vault).",
    icon: Lock,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

export function VerificationWizard({ user, onBack }: VerificationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        if (currentStep < 3) setCurrentStep(c => c + 1);
        setUploadProgress(0);
      }
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Verification Vault
              <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Stealth Mode
              </span>
            </h1>
            <p className="text-gray-500">Securely verify your land without public exposure.</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">Step {currentStep} of 3</p>
          <p className="text-xs text-gray-500">{(currentStep / 3 * 100).toFixed(0)}% Complete</p>
        </div>
      </div>

      {/* Progress Steps Visualizer */}
      <div className="relative flex justify-between items-center px-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 -z-10 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        />
        
        {STEPS.map((step) => {
          const isActive = currentStep >= step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center gap-3 bg-[#F5F5F7] dark:bg-[#050505] px-4 py-2">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300
                ${isActive ? 'border-white shadow-lg scale-110' : 'border-transparent grayscale opacity-50'}
                ${isActive && !isCompleted ? step.bg : ''}
                ${isCompleted ? 'bg-emerald-500 text-white' : ''}
              `}>
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className={`w-6 h-6 ${isActive ? step.color : 'text-gray-400'}`} />}
              </div>
              <p className={`text-xs font-bold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                {step.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Upload Area */}
      <Card className="border-0 shadow-2xl shadow-blue-900/5 overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500" />
        
        <CardContent className="p-12 text-center">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto space-y-6"
            >
              <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center ${STEPS[currentStep-1].bg}`}>
                {React.createElement(STEPS[currentStep-1].icon, { 
                  className: `w-10 h-10 ${STEPS[currentStep-1].color}` 
                })}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {STEPS[currentStep-1].title}
                </h2>
                <p className="text-gray-500 text-lg">
                  {STEPS[currentStep-1].desc}
                </p>
              </div>

              {/* Secure Notice Box */}
              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4 text-left flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  {currentStep === 3 
                    ? "This document will be encrypted with AES-256 and stored in an offline vault. No public access allowed."
                    : "This document is only used to verify your identity. It will not be shown to buyers."}
                </p>
              </div>

              {/* Upload Zone */}
              <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer group"
                onClick={handleUpload}
              >
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium text-blue-600">Encrypting & Uploading...</p>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-12 h-12 mx-auto text-gray-400 group-hover:text-blue-500 mb-4 transition-colors" />
                    <p className="font-medium text-gray-900 dark:text-white">Click to Upload Document</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, JPG or PNG (Max 10MB)</p>
                  </>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
      
      {/* Footer Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" className="text-gray-500">Skip for now</Button>
        <Button 
            className="bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black"
            disabled={isUploading}
        >
            {currentStep === 3 ? "Complete Verification" : "Verify & Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}