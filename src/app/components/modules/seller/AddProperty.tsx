import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Upload, DollarSign, FileText, CheckCircle2, 
  Sparkles, ArrowRight, ChevronLeft, Image as ImageIcon 
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { DocumentScanner } from './dashboard/DocumentScanner';

interface AddPropertyProps {
  onBack: () => void;
  onComplete: () => void;
}

const STEPS = [
  { id: 1, title: "Basic Details", icon: MapPin },
  { id: 2, title: "Media & Visuals", icon: ImageIcon },
  { id: 3, title: "AI Pricing", icon: DollarSign },
];

export function AddProperty({ onBack, onComplete }: AddPropertyProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    size: '',
    price: '',
    description: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);
  };

  // AI Generator Simulator
  const generateDescription = () => {
    setFormData(prev => ({
      ...prev,
      description: "Generating AI description..."
    }));
    
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        description: `Premium ${prev.size || 'plot'} located in the heart of ${prev.location || 'the city'}. This property offers excellent ROI potential with R1 Zoning clearance. Ideal for residential villa construction or long-term investment. Features include 40ft wide road access and groundwater availability.`
      }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#050505] p-6 flex flex-col items-center">
      
      {/* HEADER */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack} className="gap-2">
            <ChevronLeft size={16} /> Back
        </Button>
        <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={18} />
            <span className="font-bold text-gray-900 dark:text-white">AI Listing Creator</span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10" />
            <div 
                className="absolute top-1/2 left-0 h-1 bg-indigo-600 -z-10 transition-all duration-500" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            {STEPS.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2 bg-[#F4F5F7] dark:bg-[#050505] px-2">
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                        ${step >= s.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 text-gray-400'}
                    `}>
                        <s.icon size={16} />
                    </div>
                    <span className={`text-xs font-medium ${step >= s.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                        {s.title}
                    </span>
                </div>
            ))}
        </div>
      </div>

      {/* FORM CARD */}
      <Card className="w-full max-w-2xl border-0 shadow-xl bg-white dark:bg-slate-900">
        <CardContent className="p-8">
            <AnimatePresence mode="wait">
                
                {/* STEP 1: BASICS */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold">Property Details</h2>
                        
                        <div className="space-y-2">
                            <Label>Property Title</Label>
                            <Input 
                                placeholder="e.g. Green Valley Plot 4B" 
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input 
                                    placeholder="City, Area" 
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Plot Size (sq.ft)</Label>
                                <Input 
                                    placeholder="2400" 
                                    value={formData.size}
                                    onChange={e => setFormData({...formData, size: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Description</Label>
                                <button 
                                    onClick={generateDescription}
                                    className="text-xs text-indigo-600 flex items-center gap-1 hover:underline"
                                >
                                    <Sparkles size={12} /> Auto-Generate with AI
                                </button>
                            </div>
                            <textarea 
                                className="w-full h-32 p-3 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                                placeholder="Describe your property..."
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    </motion.div>
                )}

                

                {/* STEP 3: PRICING */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold">Price Estimation</h2>
                        
                        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl text-white text-center">
                            <p className="text-indigo-200 text-sm mb-2">AI RECOMMENDED PRICE</p>
                            <h3 className="text-4xl font-bold">$45,000 - $48,000</h3>
                            <p className="text-xs text-indigo-300 mt-2">Based on 14 similar sales in {formData.location || 'this area'}</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Your Asking Price ($)</Label>
                            <Input 
                                className="text-lg font-bold" 
                                placeholder="45000"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <Button variant="ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>
                    Back
                </Button>
                <Button 
                    onClick={handleNext}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]"
                >
                    {loading ? (
                        "Creating..." 
                    ) : step === 3 ? (
                        "Publish Listing" 
                    ) : (
                        <>Next Step <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                </Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}