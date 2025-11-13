import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | UtilityGenAI",
  description: "Terms and Conditions for using UtilityGenAI.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
      <h1 className="text-3xl font-bold mb-6 text-white">Terms of Service</h1>
      <div className="prose prose-slate prose-invert max-w-none">
        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">1. Terms</h3>
        <p>
          By accessing this Website, accessible from utilitygenai.com, you are agreeing to be bound by these Website
          Terms and Conditions of Use.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the materials on UtilityGenAI's Website for
          personal, non-commercial transitory viewing only.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">3. Disclaimer</h3>
        <p>All the materials on UtilityGenAI's Website are provided "as is".</p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">4. Limitations</h3>
        <p>
          In no event shall UtilityGenAI or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on UtilityGenAI's Website.
        </p>
      </div>
    </div>
  );
}

