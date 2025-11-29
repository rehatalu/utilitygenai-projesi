"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { reviews } from '@/lib/reviews-data';

export default function ReviewsPage() {
  return (
    <WorkspaceLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">AI Tools Reviews</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Honest comparisons to help you choose the right stack.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((item, idx) => (
            <Link key={item.id} href={`/reviews/${item.slug}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-4">
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                     <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.subtitle}</p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 flex-1 leading-relaxed">
                      {item.desc}
                  </p>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      {item.verdict}
                      </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
