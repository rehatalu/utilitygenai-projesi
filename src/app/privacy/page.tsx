"use client"; // 'WorkspaceLayout' (içinde Sidebar state'i var) 'use client' gerektirir
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <WorkspaceLayout>
      <motion.div
        key="privacy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md my-8 text-slate-800">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>At UtilityGenAI, accessible from utilitygenai.com, one of our main priorities is the privacy of our visitors.</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Log Files</h3>
            <p>UtilityGenAI follows a standard procedure of using log files...</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Cookies and Web Beacons</h3>
            <p>Like any other website, UtilityGenAI uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences.</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Google DoubleClick DART Cookie</h3>
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies...</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2">Consent</h3>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
          </div>
        </div>
      </motion.div>
    </WorkspaceLayout>
  );
}

