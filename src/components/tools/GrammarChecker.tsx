"use client";
import { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

export default function GrammarChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/grammar-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.correctedText || data.suggestions || '');
    } catch (err: any) {
      setResult(err.message || 'Failed to check grammar');
    }
    setIsLoading(false);
    setInput(""); // Kutu temizleme
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl p-6 transition-all duration-300 text-left bg-slate-900/80 ring-1 ring-slate-700 shadow-2xl backdrop-blur-lg">
      <h1 className="text-2xl font-semibold text-white mb-4 text-left">Free Grammar Checker</h1>
      <p className="text-sm text-slate-400 mb-6 text-left">Correct grammar and spelling errors automatically.</p>

      <form onSubmit={handleSubmit} className="text-left">
        <label htmlFor="input" className="block text-sm font-medium text-slate-300 mb-2 text-left">
          Text to check:
        </label>
        <textarea
          id="input"
          className="w-full p-3 border rounded-lg shadow-sm bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left"
          rows={5}
          placeholder="Enter text to check for grammar and spelling errors..."
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
          {isLoading ? 'Checking...' : 'Check Grammar'}
        </button>
      </form>

      {result && (
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-white mb-3 text-left">Corrected Text:</h2>
          <div className="p-4 bg-slate-800 rounded-lg text-slate-200 whitespace-pre-wrap text-left">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

