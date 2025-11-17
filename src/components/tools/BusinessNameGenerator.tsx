"use client";
import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function BusinessNameGenerator() {
  const [input, setInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/business-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setNames(data.names || []);
    } catch (err: any) {
      setNames([err.message || 'Failed to generate names']);
    }
    setIsLoading(false);
    setInput(""); // Kutu temizleme
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-slate-900 ring-1 ring-slate-700 shadow-2xl backdrop-blur-lg p-6 transition-all duration-300 text-left">
      <h1 className="text-2xl font-semibold text-white mb-4 text-left">AI Business Name Generator</h1>
      <p className="text-sm text-slate-400 mb-6 text-left">Generate unique and catchy business names for your brand.</p>

      <form onSubmit={handleSubmit} className="text-left">
        <label htmlFor="input" className="block text-sm font-medium text-slate-300 mb-2 text-left">
          Business type or description:
        </label>
        <textarea
          id="input"
          className="w-full p-3 border rounded-lg shadow-sm bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left"
          rows={3}
          placeholder="e.g., Coffee shop, Tech startup, Fitness studio..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault(); 
              if (e.currentTarget.form) {
                e.currentTarget.form.requestSubmit();
              }
            }
          }}
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:bg-gray-400 flex items-center gap-2"
          disabled={isLoading || !input.trim()}
        >
          {isLoading && <SparklesIcon className="w-5 h-5 animate-spin" />}
          {isLoading ? 'Generating...' : 'Generate Names'}
        </button>
      </form>

      {names.length > 0 && (
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-white mb-3 text-left">Business Name Suggestions:</h2>
          <ul className="space-y-2 text-left">
            {names.map((name, idx) => (
              <li key={idx} className="p-3 bg-slate-800 rounded-lg text-slate-200 text-left">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

