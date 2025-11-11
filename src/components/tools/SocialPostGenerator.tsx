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
    <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-semibold text-slate-900">AI Social Media Post Generator</h1>
        <p className="text-sm text-slate-600">
          Enter a topic, and we will generate posts tailored for both X (Twitter) and LinkedIn.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          Post topic
          <textarea
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            rows={4}
            placeholder="e.g., Launching our new AI-powered analytics suite..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={isLoading || !topic}
        >
          {isLoading ? "Generating..." : "Generate Posts"}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <strong className="font-semibold text-red-700">Error:</strong> {error}
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Tweet</h2>
            <textarea
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              rows={3}
              readOnly
              value={results.tweet}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">LinkedIn Post</h2>
            <textarea
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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

