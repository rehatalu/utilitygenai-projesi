"use client";

import { useState } from 'react';

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
      const response = await fetch('/api/generate-subject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.subjects);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">
        AI Email Subject Line Generator
      </h1>
      <p className="mb-4">
        Enter the topic or main idea of your email, 
        and we will generate compelling subject lines for you.
      </p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="e.g., Announcing our new product launch..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isLoading || !topic}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Results:</h2>
          <ul className="list-disc pl-5 space-y-2 bg-gray-50 p-4 rounded">
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

