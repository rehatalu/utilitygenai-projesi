"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';
import { HiBriefcase, HiAcademicCap, HiShoppingBag, HiCode, HiPencilAlt, HiTrendingUp } from 'react-icons/hi';

const guides = [
  { id: 1, icon: HiShoppingBag, title: "AI for E-commerce", desc: "How to automate product descriptions and customer support.", steps: "5 Steps" },
  { id: 2, icon: HiBriefcase, title: "AI for Real Estate", desc: "Write listing descriptions that sell faster using AI tools.", steps: "3 Steps" },
  { id: 3, icon: HiAcademicCap, title: "AI for Students", desc: "Using grammar checkers and summarizers to study smarter.", steps: "7 Steps" },
  { id: 4, icon: HiCode, title: "AI for Developers", desc: "Best practices for using AI code explainers and debuggers.", steps: "4 Steps" },
  { id: 5, icon: HiPencilAlt, title: "AI for Writers", desc: "Overcoming writer's block with idea generators.", steps: "6 Steps" },
  { id: 6, icon: HiTrendingUp, title: "AI for Marketing", desc: "Creating viral social media posts at scale.", steps: "8 Steps" },
];

export default function GuidesPage() {
  return (
    <WorkspaceLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Sector Guides</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Practical playbooks for using AI in your specific industry.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide, idx) => (
            <motion.div 
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 cursor-pointer hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 ring-1 ring-indigo-100 dark:ring-indigo-500/30">
                <guide.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{guide.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 min-h-[40px]">{guide.desc}</p>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1">
                {guide.steps} TO MASTERY
                <span className="text-lg leading-none">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
