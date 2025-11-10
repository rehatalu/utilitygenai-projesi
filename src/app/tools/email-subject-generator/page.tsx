"use client";

import { useState } from 'react';

export default function EmailSubjectGenerator() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Buraya OpenAI API çağrısı gelecek
    // Şimdilik sahte (fake) bir bekleme ve sonuç ekleyelim
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const fakeResults = [
      `Fake Result 1 (based on: ${topic})`,
      `Fake Result 2 (related to: ${topic})`,
      `Fake Result 3 (idea for: ${topic})`,
    ];
    setResults(fakeResults);
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

