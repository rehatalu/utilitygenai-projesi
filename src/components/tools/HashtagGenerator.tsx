"use client";
import { useState, useRef, useEffect } from 'react';
import { useHistory } from '@/hooks/useHistory';
import { SparklesIcon } from '@heroicons/react/24/solid';
import ClipboardButton from '@/components/ui/ClipboardButton';
import { ToolComponentProps } from '@/types/tool-props';

export default function HashtagGenerator({ toolId, toolName }: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const { saveResult } = useHistory();

  useEffect(() => {
    if (hashtags.length > 0) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [hashtags]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/hashtag-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setHashtags(data.hashtags || []);
      saveResult('hashtag-generator', 'Hashtag Generator', (data.hashtags || []).map((tag: string) => `#${tag}`).join(' '));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate hashtags';
      setHashtags([errorMessage]);
    }
    setIsLoading(false);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl 
                    bg-white text-slate-900
                    dark:bg-slate-900 dark:text-white
                    ring-1 ring-inset ring-gray-300 dark:ring-slate-700 
                    shadow-xl backdrop-blur-lg p-6 
                    transition-all duration-300 text-left">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 text-left">AI Hashtag Generator</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 text-left">Generate trending hashtags for Instagram, TikTok, and Twitter.</p>

      <form onSubmit={handleSubmit} className="text-left">
        <label htmlFor="input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 text-left">
          Content topic:
        </label>
        <textarea
          id="input"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-left h-40
                     dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="e.g., Fitness motivation, Travel photography, Food recipes..."
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
          {isLoading ? 'Generating...' : 'Generate Hashtags'}
        </button>
      </form>

      {isLoading && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 text-left">
          Generating hashtags...
        </div>
      )}

      {hashtags.length > 0 && (
        <div ref={resultsRef} className="mt-6 space-y-3 text-left">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Generated Hashtags:</h2>
          <div className="relative flex items-center justify-between 
                         p-4 rounded-lg transition-all group
                         bg-gray-50 border border-gray-200 
                         dark:bg-slate-800 dark:border-slate-700">
            <div className="flex flex-wrap gap-2 pr-12">
              {hashtags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ClipboardButton textToCopy={hashtags.map(tag => `#${tag}`).join(' ')} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
