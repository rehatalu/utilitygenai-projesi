"use client";
import { useState, useEffect, useRef } from 'react';

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
    // DÜZELTME (Adım 81): 'max-w-sm' (veya 'max-w-2xl') kaldırıldı. Artık 'w-full'.
    <div className={`w-full rounded-3xl p-4 shadow-2xl ring-1 ring-slate-700 backdrop-blur-lg transition-all duration-300 ${
      isLoading 
        ? 'animate-rgb-border' 
        : 'bg-slate-900/80'
    }`}> 
      
      {/* DÜZELTME (Adım 86): Başlık 'text-2xl' veya 'text-lg' yerine 'text-base' (daha küçük) */}
      <h1 className="text-base font-semibold text-white mb-3 text-left">Chat with UGA</h1>
      
      {/* DÜZELTME (Adım 86): Sohbet geçmişi 'h-96' veya 'h-64' veya 'h-56' yerine 'h-48' (daha kısa) */}
      <div className="h-48 overflow-y-auto mb-3 space-y-3 p-3 bg-slate-800/50 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {/* DÜZELTME (Adım 86): Font boyutu 'text-sm' yerine 'text-xs' (en küçük) */}
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
      
      {/* Yazma Alanı */}
      <form onSubmit={handleSubmit} className="text-left">
        {/* DÜZELTME (Adım 86): Font boyutu 'text-sm' yerine 'text-xs' (en küçük) */}
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
        {/* DÜZELTME (Adım 86): Font boyutu 'text-sm' yerine 'text-xs' (en küçük) */}
        <button
          type="submit"
          className="mt-2 px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-full hover:bg-indigo-500 disabled:bg-gray-400"
          disabled={isLoading || !input}
        >
          {isLoading ? "UGA is thinking..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
