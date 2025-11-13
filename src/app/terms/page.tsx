import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | UtilityGenAI",
  description: "Terms and Conditions for using UtilityGenAI.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md my-8 text-slate-800">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Terms of Service</h1>
      <div className="prose prose-slate max-w-none">
        <h3 className="text-xl font-semibold mt-4 mb-2">1. Terms</h3>
        <p>
          By accessing this Website, accessible from utilitygenai.com, you are agreeing to be bound by these Website
          Terms and Conditions of Use.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the materials on UtilityGenAI&apos;s Website for
          personal, non-commercial transitory viewing only.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">3. Disclaimer</h3>
        <p>All the materials on UtilityGenAI&apos;s Website are provided &quot;as is&quot;.</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">4. Limitations</h3>
        <p>
          In no event shall UtilityGenAI or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on UtilityGenAI&apos;s Website.
        </p>
      </div>
    </div>
  );
}

