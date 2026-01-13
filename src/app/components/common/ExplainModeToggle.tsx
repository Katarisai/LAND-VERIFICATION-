import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Baby, Zap } from 'lucide-react';
import { Button } from '../ui/button';

export function ExplainModeToggle({ isActive, onToggle }: { isActive: boolean, onToggle: () => void }) {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className={`
            relative flex items-center gap-3 pl-2 pr-6 py-2 rounded-full shadow-2xl transition-all duration-300 border-2
            ${isActive 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 border-white text-white' 
                : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-700'}
        `}
      >
        <div className={`
            w-10 h-10 rounded-full flex items-center justify-center shadow-sm
            ${isActive ? 'bg-white text-rose-500' : 'bg-gray-100 dark:bg-slate-800'}
        `}>
             {isActive ? <Baby size={20} strokeWidth={2.5} /> : <Brain size={20} />}
        </div>
        
        <div className="text-left">
            <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                {isActive ? 'Explain Mode' : 'Standard Mode'}
            </p>
            <p className={`text-sm font-bold leading-none ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {isActive ? 'Like I\'m 10' : 'Expert View'}
            </p>
        </div>

        {isActive && (
            <motion.div 
                layoutId="sparkles"
                className="absolute -top-1 -right-1"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
            >
                <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            </motion.div>
        )}
      </motion.button>
    </div>
  );
}