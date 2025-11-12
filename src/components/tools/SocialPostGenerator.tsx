"use client";

import { useState } from "react";

type SocialPosts = {
  tweet: string;
  linkedInPost: string;
};

export default function SocialPostGenerator() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<SocialPosts | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/social-post", {
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

      setResults({
        tweet: data.tweet,
        linkedInPost: data.linkedInPost,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-slate-900/80 p-6 shadow-2xl ring-1 ring-slate-700 backdrop-blur-lg">
      <div className="flex flex-col gap-2 border-b border-slate-700 pb-4">
        <h1 className="text-2xl font-semibold text-white">AI Social Media Post Generator</h1>
        <p className="text-sm text-slate-300">
          Enter a topic, and we will generate posts tailored for both X (Twitter) and LinkedIn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <label className="block text-sm font-medium text-slate-200">
          Post topic
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900/60 p-3 text-sm text-slate-100 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            rows={4}
            placeholder="e.g., Launching our new AI-powered analytics suite..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading && topic && e.currentTarget.form) {
                  e.currentTarget.form.requestSubmit();
                }
              }
            }}
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-600"
          disabled={isLoading || !topic}
        >
          {isLoading ? "Generating..." : "Generate Posts"}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
          <strong className="font-semibold text-red-100">Error:</strong> {error}
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Tweet</h2>
            <textarea
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              rows={3}
              readOnly
              value={results.tweet}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">LinkedIn Post</h2>
            <textarea
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              rows={5}
              readOnly
              value={results.linkedInPost}
            />
          </div>
        </div>
      )}
    </div>
  );
}

