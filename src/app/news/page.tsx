"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { newsItems } from '@/lib/news-data';

export default function NewsPage() {
  return (
    <WorkspaceLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">AI Industry News</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Stay updated with the latest breakthroughs in Artificial Intelligence.</p>
        </div>
        <div className="grid gap-6">
          {newsItems.map((item, idx) => (
            <Link key={item.id} href={`/news/${item.slug}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-lg group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-xs font-medium mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">{item.category}</span>
                  <span className="text-slate-500">{item.date}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{item.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{item.excerpt}</p>
                <div className="text-sm text-slate-500 font-medium group-hover:translate-x-1 transition-transform inline-block text-indigo-600 dark:text-indigo-400">Read full story →</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
