"use client";
import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function UgaChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm UGA. How can I help you today? Ask me anything about our 13 tools!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput(""); // Kutuyu temizle

    try {
      const response = await fetch('/api/uga-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input }), // 'topic' olarak gönder
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (err: any) {
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-slate-900/80 p-6 shadow-2xl ring-1 ring-slate-700 backdrop-blur-lg">
      <h1 className="text-2xl font-semibold text-white mb-4">Chat with UGA</h1>
      
      {/* Sohbet Geçmişi */}
      <div className="h-80 overflow-y-auto mb-4 space-y-4 p-4 bg-slate-800/50 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'}
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Yazma Alanı */}
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded-lg shadow-sm bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:bg-gray-400"
          disabled={isLoading || !input}
        >
          {isLoading ? "UGA is thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}

