"use client"; 
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <WorkspaceLayout>
      <motion.div
        key="terms"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md my-8 text-slate-800">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Terms of Service</h1>
          <div className="prose prose-slate max-w-none">
            <h3 className="text-xl font-semibold mt-4 mb-2">1. Terms</h3>
            <p>By accessing this Website, accessible from utilitygenai.com, you are agreeing to be bound by these Website Terms and Conditions of Use.</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on UtilityGenAI&apos;s Website for personal, non-commercial transitory viewing only.</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">3. Disclaimer</h3>
            <p>All the materials on UtilityGenAI&apos;s Website are provided &quot;as is&quot;.</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">4. Limitations</h3>
            <p>In no event shall UtilityGenAI or its suppliers be liable for any damages...</p>
          </div>
        </div>
      </motion.div>
    </WorkspaceLayout>
  );
}

