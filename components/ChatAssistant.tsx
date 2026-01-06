
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Cat as CatIcon, Minimize2 } from 'lucide-react';
import { Message } from '../types';
import { getCatAdvice } from '../services/geminiService';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Whisker, your feline expert. How can I help you find your new best friend today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getCatAdvice([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-rose-500 transition-all z-50 group"
      >
        <MessageSquare size={28} />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border">
          Talk to Whisker
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 w-96 bg-white rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-100 transition-all duration-300 ${isMinimized ? 'h-20' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="bg-slate-900 p-5 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="bg-rose-500 p-2 rounded-xl">
            <CatIcon size={20} />
          </div>
          <div>
            <h3 className="font-bold">Whisker</h3>
            <span className="text-[10px] text-rose-300 font-bold uppercase tracking-widest">Cat Expert</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Minimize2 size={18} />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-rose-500 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100">
                  <Loader2 className="animate-spin text-rose-500" size={20} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about breeds, care..."
                className="flex-grow bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-slate-900 text-white p-3 rounded-xl hover:bg-rose-500 transition-all disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatAssistant;
