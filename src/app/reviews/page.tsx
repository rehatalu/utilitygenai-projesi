"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    title: "ChatGPT vs. Claude 3.5",
    subtitle: "Which is better for coding?",
    verdict: "Winner: Claude 3.5 for Code",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 2,
    title: "Jasper vs. Copy.ai",
    subtitle: "Best for Marketing Copy?",
    verdict: "Winner: Jasper for Enterprise",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Midjourney vs. DALL-E 3",
    subtitle: "The Battle of Image Gens",
    verdict: "Winner: Midjourney for Quality",
    color: "from-purple-500 to-pink-500"
  }
];

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
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all group cursor-pointer h-80 flex flex-col"
            >
              <div className={`h-2 bg-gradient-to-r ${item.color}`} />
              <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">{item.subtitle}</p>
                <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                  {item.verdict}
                </span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 border-t border-slate-100 dark:border-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                Read Full Review
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}

