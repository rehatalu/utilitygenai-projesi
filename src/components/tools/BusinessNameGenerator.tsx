"use client";
import { useState, useRef, useEffect } from 'react';
import { useHistory } from '@/hooks/useHistory';
import { SparklesIcon } from '@heroicons/react/24/solid';
import ClipboardButton from '@/components/ui/ClipboardButton';
import { ToolComponentProps } from '@/types/tool-props';
export default function BusinessNameGenerator({ toolId, toolName }: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const { saveResult } = useHistory();

  // SONUÇLARA OTOMATİK KAYDIRMA
  useEffect(() => {
    if (names.length > 0) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [names]);

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
      saveResult('business-name', 'Business Name Generator', (data.names || []).join('\n'));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate ideas';
      setNames([errorMessage]);
    }
    setIsLoading(false);
    setInput(""); // Kutu temizleme
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl 
                    bg-slate-900 
                    ring-1 ring-inset ring-slate-700 
                    shadow-2xl backdrop-blur-lg p-6 
                    transition-all duration-300 text-left">
      <h1 className="text-2xl font-semibold text-white mb-4 text-left">AI Business Name Generator</h1>
      <p className="text-sm text-slate-400 mb-6 text-left">Generate unique and catchy business names for your brand.</p>

      <form onSubmit={handleSubmit} className="text-left">
        <label htmlFor="input" className="block text-sm font-medium text-slate-300 mb-2 text-left">
          Business type or description:
        </label>
        <textarea
          id="input"
          className="w-full p-3 border border-slate-700 rounded-lg shadow-sm bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left h-40"
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

      {isLoading && (
        <div className="mt-6 p-4 bg-slate-800 rounded-lg text-slate-400 text-left">
          Generating names...
        </div>
      )}

      {/* --- YENİ SONUÇ ALANI (KOPYALAMA BUTONLU) --- */}
      {names.length > 0 && (
        <div ref={resultsRef} className="mt-6 space-y-3 text-left">
          <h2 className="text-lg font-semibold text-white mb-3">Business Name Suggestions:</h2>
          {names.map((name, idx) => (
            <div
              key={idx}
              className="relative flex items-center justify-between 
                         p-4 bg-slate-800 rounded-lg 
                         transition-all group"
            >
              {/* Sonuç Metni (Ana içerik) */}
              <p className="pr-12 text-slate-200">
                {name}
              </p>

              {/* Kopyalama Butonu (Sağ üst köşe) */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ClipboardButton textToCopy={name} />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* --- YENİ SONUÇ ALANI BİTİŞİ --- */}
    </div>
  );
}

