"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

const newsItems = [
  {
    id: 1,
    date: "Nov 25, 2025",
    category: "Industry",
    title: "OpenAI Announces GPT-5 Beta Waitlist",
    excerpt: "The highly anticipated model promises faster reasoning and multimodal capabilities. Here is what we know so far about the release date and features.",
    readTime: "3 min read"
  },
  {
    id: 2,
    date: "Nov 24, 2025",
    category: "Tools",
    title: "Midjourney v7: Photorealism Reimagined",
    excerpt: "The latest update brings stunning lighting effects and better text rendering. Designers are calling it a game changer for stock photography.",
    readTime: "2 min read"
  },
  {
    id: 3,
    date: "Nov 22, 2025",
    category: "Regulation",
    title: "EU AI Act: What It Means for Developers",
    excerpt: "New regulations are coming into effect next month. Find out how compliance will affect your AI applications and data privacy strategies.",
    readTime: "5 min read"
  }
];

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
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-lg group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs font-medium mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{item.category}</span>
                <span className="text-slate-500">{item.date}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{item.excerpt}</p>
              <div className="text-sm text-slate-500 font-medium">Read more →</div>
            </motion.div>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}

