"use client";

import { useState, useRef, useEffect } from "react";
import { useHistory } from '@/hooks/useHistory';
import { SparklesIcon } from '@heroicons/react/24/outline';
import ClipboardButton from '@/components/ui/ClipboardButton';
import { ToolComponentProps } from '@/types/tool-props';

export default function EmailSubjectGenerator({ toolId, toolName }: ToolComponentProps) {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const { saveResult } = useHistory();

  useEffect(() => {
    if (results.length > 0) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [results]);

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

      setResults(data.subjects);
      saveResult('email-generator', 'Email Subject Generator', data.subjects.join('\n'));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    }

    setIsLoading(false);
    setTopic("");
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl 
                    bg-white text-slate-900
                    dark:bg-slate-900 dark:text-white
                    ring-1 ring-inset ring-slate-200 dark:ring-slate-700 
                    shadow-xl backdrop-blur-lg transition-colors duration-300">
      <div className="p-6">
        <div className="flex flex-col gap-2 border-b border-gray-200 dark:border-slate-700 pb-4 text-left">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            AI Email Subject Line Generator
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Enter the topic or main idea of your email, and we will generate
            compelling subject lines for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Topic or keywords:
            <textarea
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-sm transition 
                         focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 
                         dark:border-slate-700 dark:bg-slate-800 dark:text-white h-40"
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
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-400 dark:bg-red-900/30 dark:text-red-300">
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}

        {isLoading && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 text-left">
            Generating ideas...
          </div>
        )}

        {results.length > 0 && (
          <div ref={resultsRef} className="mt-6 space-y-3 text-left">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Results</h2>
            {results.map((result, index) => (
              <div 
                key={index}
                className="relative flex items-center justify-between 
                           p-4 rounded-lg transition-all group
                           bg-gray-50 border border-gray-200 
                           dark:bg-slate-800 dark:border-slate-700"
              >
                <p className="pr-12 text-slate-800 dark:text-slate-200">
                  {result}
                </p>
                
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ClipboardButton textToCopy={result} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
