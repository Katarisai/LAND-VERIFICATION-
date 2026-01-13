
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User as UserIcon, Sparkles, FileText, AlertCircle, TrendingUp, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { User } from '../../App';

interface AIAssistantProps {
  user: User;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AIAssistant({ user, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      text: `Hello ${user.name}! I am your Real Estate AI. I can help you with:\n\n• Document Verification\n• Market Price Analysis\n• Legal Risk Assessment\n\nWhat would you like to check today?`,
      timestamp: new Date(),
      suggestions: [
        'Check document status',
        'What documents do I need?',
        'Analyze construction feasibility',
        'Risk assessment'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend) return;

    // 1. Add User Message immediately
    const newUserMsg: Message = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: textToSend, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 2. Call the Real AI Backend
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend,
          // Send previous messages as history so it remembers context
          history: messages.map(m => ({ role: m.role, text: m.text })) 
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error('Network response was not ok');

      // 3. Add AI Response
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAiMsg]);

    } catch (error) {
      console.error("AI Error:", error);
      // Fallback Error Message
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I'm having trouble connecting to the server. Please check if the backend is running.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = (userMessage: string, history: Message[]): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('document') || lowerMessage.includes('what do i need')) {
        response = `For complete land verification, you'll need:\n\n📄 **ESSENTIAL DOCUMENTS**\n• Title Deed / Ownership Certificate\n• Link Documents (30 Years)\n• Encumbrance Certificate (EC)\n• Latest Tax Receipts\n\nWould you like me to check if you have all these uploaded?`;
        suggestions = ['Check my uploaded docs', 'How to get EC?', 'Upload new document'];
    } 
    else if (lowerMessage.includes('risk') || lowerMessage.includes('legal')) {
        response = `Our Risk Assessment looks for:\n\n⚠️ **Red Flags:**\n• Ownership disputes\n• Government land encroachment\n• Water body proximity (Lake beds)\n• Mortgage liens\n\nI can scan your current documents for these risks instantly.`;
        suggestions = ['Scan for risks now', 'Legal opinion timeline', 'Government prohibited lands'];
    }
    else {
        response = `I understand you're asking about "${userMessage}".\n\nI can help verify documents, check legal risks, or estimate market value. Could you be more specific?`;
        suggestions = ['Verify my documents', 'Check market value', 'Legal risks'];
    }

    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: response,
      timestamp: new Date(),
      suggestions
    };
  };

  return (
    // 1. CONTAINER: 'pt-24' keeps it fixed top, but safe from header collision.
    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-24 bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* 2. CARD: Reduced Height to 480px (Trimmed Bottom). Added shadow-2xl. */}
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] border border-white/20 animate-in zoom-in-95 duration-200">
        
        {/* 3. HEADER */}
        <div className="flex-none flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Bot className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">AI Consultant</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-[10px] text-gray-500 font-medium">Online • Powered by Gemini</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* 4. MESSAGES: Applied FONT FIX (font-medium, text-gray-900) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC] dark:bg-[#0B0F19]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-gradient-to-br from-violet-600 to-indigo-600'
              }`}>
                {msg.role === 'user' ? <UserIcon size={12} className="text-gray-600" /> : <Sparkles size={12} className="text-white" />}
              </div>

              <div className="flex flex-col gap-1.5 max-w-[85%]">
                {/* BUBBLE: Added 'font-medium' and 'text-gray-900' for visibility */}
                <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm whitespace-pre-line font-medium ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>

                {/* Suggestions */}
                {msg.suggestions && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {msg.suggestions.map((sug, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleSend(sug)}
                                className="text-[10px] px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-md border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-semibold"
                            >
                                {sug}
                            </button>
                        ))}
                    </div>
                )}
                
                <span className={`text-[9px] ${msg.role === 'user' ? 'text-right' : 'text-left'} text-gray-400 font-medium`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
             <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={12} className="text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-2xl rounded-tl-none border border-gray-100 dark:border-slate-700 shadow-sm flex gap-1 items-center">
                    <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-100" />
                    <div className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-200" />
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 5. FOOTER */}
        <div className="flex-none p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
            
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
             {[
                { label: 'Documents', icon: FileText, text: 'What documents do I need?' },
                { label: 'Risks', icon: AlertCircle, text: 'Analyze legal risks' },
                { label: 'Construction', icon: TrendingUp, text: 'Construction feasibility' },
                { label: 'Location', icon: MapPin, text: 'Check location details' },
             ].map((action, i) => (
                <button
                    key={i}
                    onClick={() => handleSend(action.text)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-[10px] font-semibold text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 hover:text-indigo-600 transition-all whitespace-nowrap"
                >
                    <action.icon size={12} />
                    {action.label}
                </button>
             ))}
          </div>

          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about legal risks, prices, or documents..."
              className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900 dark:text-white placeholder:text-gray-400 text-xs font-semibold transition-all"
            />
            <Button 
              onClick={() => handleSend()}
              className="absolute right-2 top-1.5 bottom-1.5 aspect-square rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-500/20 h-auto w-auto p-2"
            >
              <Send size={16} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}