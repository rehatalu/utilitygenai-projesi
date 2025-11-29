"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { guides } from '@/lib/guides-data';

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
            <Link key={guide.id} href={`/guides/${guide.slug}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 cursor-pointer hover:shadow-lg h-full flex flex-col"
              >
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 ring-1 ring-indigo-100 dark:ring-indigo-500/30">
                  <guide.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{guide.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">{guide.desc}</p>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1 mt-auto">
                  {guide.steps} TO MASTERY
                  <span className="text-lg leading-none">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
