"use client";

import { useState } from "react";

export default function ParaphraserTool() {
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
      const response = await fetch("/api/paraphrase", {
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

      setResult(data.paraphrasedText);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-semibold text-slate-900">AI Paraphrasing Tool</h1>
        <p className="text-sm text-slate-600">
          Enter the text you want to rewrite, and we will provide a polished paraphrased version in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          Original text
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            rows={5}
            placeholder="e.g., The quick brown fox jumps over the lazy dog."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={isLoading || !inputText}
        >
          {isLoading ? "Paraphrasing..." : "Paraphrase Text"}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <strong className="font-semibold text-red-700">Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Paraphrased Text</h2>
          <textarea
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            rows={5}
            readOnly
            value={result}
          />
        </div>
      )}
    </div>
  );
}

