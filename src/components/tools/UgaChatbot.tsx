"use client";
import { useState, useEffect, useRef } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

type Message = { role: 'user' | 'assistant'; content: string; };

export default function UgaChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm UGA. How can I help you today? Ask me anything about our 13 tools!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput(""); 

    try {
      const response = await fetch('/api/uga-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input }),
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'API request failed');
      if (data.error) throw new Error(data.error);

      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (err: any) {
      const errorMessage: Message = { role: 'assistant', content: err.message || "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full text-left transition-all duration-300">
      <div 
        className={`rounded-3xl ${isLoading 
            ? 'animate-rgb-border p-[2px]' // Yüklenirken: RGB maskeleme + ince padding
            : 'bg-slate-900/80 ring-1 ring-slate-700 shadow-2xl backdrop-blur-lg'
          }`}
      >
        {/* İçerik maske üstünde görünmeli - z-index ile */}
        <div className="relative z-10 rounded-[1.4rem] bg-slate-900/90 p-4">
        <h1 className="text-base font-semibold text-white mb-3 text-left">Chat with UGA</h1>
      
        <div className="h-48 overflow-y-auto mb-3 space-y-3 p-3 bg-slate-800/50 rounded-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] px-3 py-2 rounded-lg text-xs text-left
                  ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'}
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> 
        </div>
        
        <form onSubmit={handleSubmit} className="text-left">
          <label htmlFor="chatInput" className="block text-xs font-medium text-slate-300 mb-1">
            Your message:
          </label>
          <textarea
            id="chatInput"
            className="w-full p-2 border rounded-lg shadow-sm bg-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={2}
            placeholder="Ask UGA about a tool..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading && input) handleSubmit(e as any);
              }
            }}
          />
          {/* "Düşünen Yıldız" (Bu zaten çalışıyordu) */}
          <button
            type="submit"
            className="mt-2 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-full hover:bg-indigo-500 disabled:bg-gray-400 flex items-center justify-center gap-2"
            disabled={isLoading || !input}
          >
            {isLoading ? (
              <>
                <SparklesIcon className="w-4 h-4 animate-spin" />
                <span>UGA is thinking...</span>
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}

