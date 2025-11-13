"use client";

import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function TextSummarizer() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult("");

    try {
      const response = await fetch("/api/text-summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Request failed with status ${response.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data.summary);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    }

    setIsLoading(false);
    setInputText("");
  };

  return (
    <div
      className={`mx-auto max-w-2xl rounded-3xl p-6 transition-all duration-300 ${
        isLoading
          ? "animate-rgb-border"
          : "bg-slate-900/80 ring-1 ring-slate-700 backdrop-blur-lg shadow-2xl"
      }`}
    >
      <div className="flex flex-col gap-2 border-b border-slate-700 pb-4">
        <h1 className="text-left text-2xl font-semibold text-white">AI Text Summarizer</h1>
        <p className="text-left text-sm text-slate-300">
          Paste any long text, article, or report below, and we will summarize the key points for you in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <label className="block text-left text-sm font-medium text-slate-200">
          Text to Summarize
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900/60 p-3 text-sm text-slate-100 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            rows={8}
            placeholder="e.g., Paste your article, research paper, or long text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading && inputText && e.currentTarget.form) {
                  e.currentTarget.form.requestSubmit();
                }
              }
            }}
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-600"
          disabled={isLoading || !inputText}
        >
          {isLoading ? (
            <>
              <SparklesIcon className="h-4 w-4 animate-spin" />
              <span>Summarizing...</span>
            </>
          ) : (
            "Summarize Text"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
          <strong className="font-semibold text-red-100">Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-3">
          <h2 className="text-left text-lg font-semibold text-white">Summary</h2>
          <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-200 shadow-sm whitespace-pre-wrap text-left">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

