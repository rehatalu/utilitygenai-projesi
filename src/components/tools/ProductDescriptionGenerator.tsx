"use client";
import { useState, useRef, useEffect } from 'react';
import { useHistory } from '@/hooks/useHistory';
import { SparklesIcon } from '@heroicons/react/24/solid';
import ClipboardButton from '@/components/ui/ClipboardButton';
export default function ProductDescriptionGenerator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const { saveResult } = useHistory();

  // SONUÇLARA OTOMATİK KAYDIRMA
  useEffect(() => {
    if (result) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/product-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      // API 'descriptions' array döndürüyor, ilkini al veya hepsini birleştir
      let resultText = '';
      if (Array.isArray(data.descriptions) && data.descriptions.length > 0) {
        resultText = data.descriptions.join('\n\n');
        setResult(resultText);
      } else {
        resultText = data.description || '';
        setResult(resultText);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate descriptions';
      setResult(errorMessage); // Assuming setResult is intended here, as 'result' is a string state.
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
      <h1 className="text-2xl font-semibold text-white mb-4 text-left">Product Description Generator</h1>
      <p className="text-sm text-slate-400 mb-6 text-left">Write persuasive product descriptions for e-commerce.</p>

      <form onSubmit={handleSubmit} className="text-left">
        <label htmlFor="input" className="block text-sm font-medium text-slate-300 mb-2 text-left">
          Product name or details:
        </label>
        <textarea
          id="input"
          className="w-full p-3 border border-slate-700 rounded-lg shadow-sm bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left h-40"
          placeholder="e.g., Wireless Bluetooth Headphones, Premium Coffee Maker..."
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
          {isLoading ? 'Generating...' : 'Generate Description'}
        </button>
      </form>

      {isLoading && (
        <div className="mt-6 p-4 bg-slate-800 rounded-lg text-slate-400 text-left">
          Generating description...
        </div>
      )}

      {/* --- YENİ SONUÇ ALANI (KOPYALAMA BUTONLU) --- */}
      {result && (
        <div ref={resultsRef} className="mt-6 space-y-3 text-left">
          <h2 className="text-lg font-semibold text-white mb-3">Generated Description:</h2>
          {(result.split('\n').filter(line => line.trim() !== '').length > 0
            ? result.split('\n').filter(line => line.trim() !== '')
            : [result]
          ).map((line, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between 
                         p-4 bg-slate-800 rounded-lg 
                         transition-all group"
            >
              {/* Sonuç Metni (Ana içerik) */}
              <p className="pr-12 text-slate-200 whitespace-pre-wrap">
                {line}
              </p>

              {/* Kopyalama Butonu (Sağ üst köşe) */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ClipboardButton textToCopy={line} />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* --- YENİ SONUÇ ALANI BİTİŞİ --- */}
    </div>
  );
}

