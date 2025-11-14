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
          <div className="prose prose-slate max-w-none text-left">
            <p><strong>Last updated: 15.11.2025</strong></p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">1. Terms</h2>
            <p>By accessing this Website, accessible from utilitygenai.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on UtilityGenAI&apos;s Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-5">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose or for any public display;</li>
                <li>attempt to reverse engineer any software contained on UtilityGenAI&apos;s Website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transferring the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">3. Disclaimer</h2>
            <p>All the materials on UtilityGenAI&apos;s Website are provided &quot;as is&quot;. UtilityGenAI makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, UtilityGenAI does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">4. Limitations</h2>
            <p>In no event shall UtilityGenAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on UtilityGenAI&apos;s Website, even if UtilityGenAI or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">5. Revisions and Errata</h2>
            <p>The materials appearing on UtilityGenAI&apos;s Website may include technical, typographical, or photographic errors. UtilityGenAI will not promise that any of the materials in this Website are accurate, complete, or current.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">6. Governing Law</h2>
            <p>Any claim related to UtilityGenAI&apos;s Website shall be governed by the laws of our Country without regards to its conflict of law provisions.</p>
          </div>
        </div>
      </motion.div>
    </WorkspaceLayout>
  );
}

