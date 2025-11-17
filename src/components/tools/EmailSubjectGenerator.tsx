"use client";

import { useState } from "react";
import { SparklesIcon } from '@heroicons/react/24/outline'; // "Düşünen Yıldız" için import et
import ClipboardButton from '@/components/ui/ClipboardButton';

export default function EmailSubjectGenerator() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch("/api/generate-subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Request failed with status ${response.status}`);
      }
      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.subjects); // "Sonuç Gösterme"
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    }

    setIsLoading(false);
    setTopic(""); // "Kutu Temizleme"
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl 
                    bg-slate-900 
                    ring-1 ring-slate-700 
                    shadow-2xl backdrop-blur-lg">
      <div className="p-6">
        {/* YENİ (KOYU TEMA + SOLA DAYALI) */}
        <div className="flex flex-col gap-2 border-b border-slate-700 pb-4 text-left">
          <h1 className="text-2xl font-semibold text-white">
            AI Email Subject Line Generator
          </h1>
          <p className="text-sm text-slate-400">
            Enter the topic or main idea of your email, and we will generate
            compelling subject lines for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left">
          <label className="block text-sm font-medium text-slate-300">
            Topic or keywords:
            {/* YENİ (KOYU TEMA + ENTER İLE GÖNDER) */}
            <textarea
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-sm text-white shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              rows={3}
              placeholder="e.g., Product launch, Newsletter, Sale announcement..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (e.currentTarget.form) {
                    e.currentTarget.form.requestSubmit();
                  }
                }
              }}
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-500"
            disabled={isLoading || !topic}
          >
            {/* YENİ (DÜŞÜNEN YILDIZ) */}
            {isLoading ? (
              <>
                <SparklesIcon className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              'Generate Subjects'
            )}
          </button>
        </form>

        {error && (
          // YENİ (KOYU TEMA HATA RENKLERİ)
          <div className="mt-6 rounded-xl border border-red-400 bg-red-900/30 p-4 text-sm text-red-300">
            <strong className="font-semibold text-red-200">Error:</strong> {error}
          </div>
        )}

        {isLoading && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg text-slate-400 text-left">
            Generating ideas...
          </div>
        )}

        {/* --- YENİ SONUÇ ALANI (KOPYALAMA BUTONLU) --- */}
        {results.length > 0 && (
          <div className="mt-6 space-y-3 text-left">
            <h2 className="text-lg font-semibold text-white">Results</h2>
            {results.map((result, index) => (
              <div 
                key={index}
                className="relative flex items-center justify-between 
                           p-4 bg-slate-800 rounded-lg 
                           transition-all group"
              >
                {/* Sonuç Metni (Ana içerik) */}
                <p className="pr-12 text-slate-200">
                  {result}
                </p>
                
                {/* Kopyalama Butonu (Sağ üst köşe) */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ClipboardButton textToCopy={result} />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* --- YENİ SONUÇ ALANI BİTİŞİ --- */}
      </div>
    </div>
  );
}
