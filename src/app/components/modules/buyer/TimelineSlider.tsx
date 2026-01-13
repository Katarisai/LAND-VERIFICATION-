import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'ownership' | 'legal' | 'satellite' | 'construction';
}

const HISTORY: TimelineEvent[] = [
  { year: 2015, title: "Agricultural Land", description: "Classified as wet-land (farming).", type: 'satellite' },
  { year: 2018, title: "Ownership Change", description: "Purchased by Sarah Seller from Farmer.", type: 'ownership' },
  { year: 2020, title: "Land Conversion", description: "Converted to Residential Zone (R1).", type: 'legal' },
  { year: 2022, title: "Layout Approval", description: "VMRDA Layout approved with 40ft roads.", type: 'construction' },
  { year: 2024, title: "Current State", description: "Ready for construction. Clear Title.", type: 'satellite' },
];

export function TimelineSlider() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play logic
  React.useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentYear(prev => {
          const currentIndex = HISTORY.findIndex(h => h.year === prev);
          if (currentIndex < HISTORY.length - 1) return HISTORY[currentIndex + 1].year;
          setIsPlaying(false); // Stop at end
          return prev;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeEvent = HISTORY.find(h => h.year === currentYear) || HISTORY[HISTORY.length - 1];
  const progress = ((HISTORY.findIndex(h => h.year === currentYear)) / (HISTORY.length - 1)) * 100;

  return (
    <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 mt-6">
      
      {/* HEADER INFO */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                <Clock size={20} />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Timeline Replay</h4>
                <p className="text-xs text-gray-500">Visualizing changes from 2015 - 2024</p>
            </div>
        </div>
        <div className="text-right">
            <span className="text-2xl font-bold text-indigo-600 font-mono">{currentYear}</span>
        </div>
      </div>

      {/* VISUALIZER WINDOW (Placeholder for Satellite Map) */}
      <div className="relative h-48 bg-gray-100 dark:bg-black rounded-xl overflow-hidden mb-6 border border-gray-200 dark:border-gray-800 group">
         {/* Simulated Satellite Image Changes */}
         <img 
            src={`https://images.unsplash.com/photo-${
                currentYear < 2018 ? '1500382017468-9049fed747ef' : // Green field
                currentYear < 2022 ? '1464822759023-fed622ff2c3b' : // Cleared land
                '1448630360428-65456885c650' // Developed
            }?auto=format&fit=crop&q=80&w=800`}
            alt="Satellite View"
            className="w-full h-full object-cover transition-opacity duration-1000"
         />
         
         <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
            <motion.div 
                key={currentYear}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20"
            >
                <p className="text-white font-bold text-sm">{activeEvent.title}</p>
                <p className="text-white/80 text-xs">{activeEvent.description}</p>
            </motion.div>
         </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-4">
        <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10 shrink-0"
            onClick={() => setIsPlaying(!isPlaying)}
        >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </Button>

        <div className="relative flex-1 h-8 flex items-center">
            {/* Track Line */}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
            
            {/* Progress Line */}
            <motion.div 
                className="absolute left-0 h-1 bg-indigo-600 rounded-full" 
                animate={{ width: `${progress}%` }}
            />

            {/* Dots */}
            <div className="absolute inset-0 flex justify-between items-center">
                {HISTORY.map((event) => (
                    <button
                        key={event.year}
                        onClick={() => { setCurrentYear(event.year); setIsPlaying(false); }}
                        className={`
                            w-3 h-3 rounded-full transition-all z-10 
                            ${currentYear >= event.year ? 'bg-indigo-600 scale-110' : 'bg-gray-300 dark:bg-gray-600'}
                            ${currentYear === event.year ? 'ring-4 ring-indigo-100 dark:ring-indigo-900' : ''}
                        `}
                    />
                ))}
            </div>
        </div>
      </div>

    </Card>
  );
}