"use client"; 
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <WorkspaceLayout>
      <motion.div
        key="about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md my-8 text-slate-800">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">About UtilityGenAI</h1>
          <div className="prose prose-slate max-w-none text-left">
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission (Amacımız)</h2>
            <p>
              Our mission at UtilityGenAI is simple: to build a free, powerful, and easy-to-use suite of AI tools that can help everyone—from students to professionals, from 7 to 70. We believe productivity and creativity should be accessible to all, not locked behind expensive subscriptions.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">What We Do (Ne Yaptığımız)</h2>
            <p>
              We provide a &quot;Workspace&quot; of over a dozen AI tools, all accessible from a single, fast, and modern interface. Whether you need to generate catchy email subjects, paraphrase a difficult text, check your grammar, or even get ideas for your next YouTube video, our tools are designed to be fast, reliable, and get the job done.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Our Vision (Vizyonumuz)</h2>
            <p>
              We are constantly working to add more high-demand tools to our platform. Our vision is for UtilityGenAI to be the &quot;go-to&quot; (giren çıkamasın) toolbox for anyone looking to leverage the power of artificial intelligence in their daily tasks.
            </p>
          </div>
        </div>
      </motion.div>
    </WorkspaceLayout>
  );
}

