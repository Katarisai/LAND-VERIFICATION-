import React from 'react';
import { motion } from 'framer-motion';

export function PlotVisualizer({ shape = 'rectangular', score }: { shape: string, score: number }) {
  // ISOMETRIC 3D PATHS
  // These coordinates create a 3D Cube/Diamond effect
  const topFace = "M 100 20 L 180 80 L 100 140 L 20 80 Z";
  const leftFace = "M 20 80 L 100 140 L 100 180 L 20 120 Z";
  const rightFace = "M 100 140 L 180 80 L 180 120 L 100 180 Z";

  return (
    <div className="relative w-full aspect-square bg-[#F8FAFC] dark:bg-[#0B0F19] rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-800">
      
      {/* Background Grid for depth perception */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />
      
      <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-2xl">
        
        {/* 3D SIDE WALLS (Darker Shades) */}
        <motion.path
          d={leftFace}
          fill="#059669" // Dark Emerald
          stroke="#065F46"
          strokeWidth="1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.path
          d={rightFace}
          fill="#10B981" // Medium Emerald
          stroke="#065F46"
          strokeWidth="1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* TOP FACE (Lighter Shade) - The Land Surface */}
        <motion.path
          d={topFace}
          fill="rgba(52, 211, 153, 0.2)" // Light Emerald Tint
          stroke="#10B981"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* 3D GEO-MARKERS (Pins floating on corners) */}
        <circle cx="100" cy="20" r="3" fill="white" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="180" cy="80" r="3" fill="white" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="100" cy="140" r="3" fill="white" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="20" cy="80" r="3" fill="white" stroke="#3B82F6" strokeWidth="2" />
      </svg>

      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> 3D Geo-Fence
      </div>
    </div>
  );
}