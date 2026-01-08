import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { User } from '../App';

interface AIAssistantProps {
  user: User;
  onClose: () => void;
}

export function AIAssistant({ user, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', text: string}>>([
    { role: 'assistant', text: `Hello ${user.name}! I am your Real Estate AI. Ask me about land verification, document status, or market prices.` }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Simulate AI thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "I am analyzing the land documents... (This is a dummy response)" }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* 3. SCROLLABLE CARD CONTAINER */}
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[80vh] border border-white/20 animate-in zoom-in-95 duration-200">
        
        {/* HEADER (Fixed) */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Consultant</h2>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-xs text-gray-500 font-medium">Online • Powered by Gemini</p>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* MESSAGES AREA (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-blue-100'}`}>
                {msg.role === 'user' ? <UserIcon size={14} /> : <Sparkles size={14} className="text-blue-600" />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* FOOTER (Fixed) */}
        <div className="flex-none p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about legal risks, prices, or documents..."
              className="w-full pl-5 pr-14 py-4 bg-gray-50 dark:bg-slate-800 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 font-medium transition-all"
            />
            <Button 
              onClick={handleSend}
              className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}