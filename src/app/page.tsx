import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">UtilityGenAI - Free AI Tools</h1>
      <p className="mb-4">Welcome to our collection of free AI and utility tools.</p>

      <h2 className="mb-3 text-2xl font-semibold">AI Tools</h2>
      <ul className="list-disc pl-5">
        <li>
          <Link href="/tools/email-subject-generator" className="text-blue-600 hover:underline">
            Email Subject Line Generator
          </Link>
        </li>
      </ul>
    </main>
  );
}

