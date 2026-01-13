import React from 'react';
import { Sparkles } from "lucide-react";

// FIX: Go up one level (..) to find the 'ui' folder
import { Card, CardHeader, CardTitle, CardContent } from "../../../ui/card";
import { Button } from "../../../ui/button";

export function AiInsightCard() {
  return (
    <Card className="col-span-3 relative overflow-hidden border-0 shadow-lg text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 z-0" />
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-pink-500 opacity-20 rounded-full blur-2xl pointer-events-none" />

      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" /> 
          AI Market Insight
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <p className="text-lg font-medium leading-relaxed">
          "Based on recent market trends in Visakhapatnam, your 'Sunset Valley' plot has appreciated by <span className="font-bold text-yellow-300">12%</span> in the last quarter."
        </p>
        <Button variant="secondary" className="w-full font-semibold text-indigo-700 hover:bg-white/90">
          View Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
}