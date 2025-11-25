"use client"; 
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <WorkspaceLayout>
      <motion.div
        key="contact"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md my-8 text-slate-800">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Contact Us</h1>
          <div className="prose prose-slate max-w-none">
            <p>
              If you have any questions, suggestions, or feedback regarding our AI tools, please feel free to reach out to us.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Email</h3>
            <p>
              You can contact us via email at: <br />
              <a href="mailto:support@utilitygenai.com" className="text-indigo-600 hover:underline">
                support@utilitygenai.com
              </a>
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2">Support</h3>
            <p>
              We try to respond to all inquiries within 24-48 hours.
            </p>
          </div>
        </div>
      </motion.div>
    </WorkspaceLayout>
  );
}



