"use client";

import { useState } from 'react';
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiCode, 
  HiTrendingUp, 
  HiAcademicCap, 
  HiPencilAlt, 
  HiBriefcase,
  HiArrowRight 
} from 'react-icons/hi';

const sectors = [
  {
    id: "marketing",
    icon: HiTrendingUp,
    title: "Marketing & Social",
    color: "bg-pink-500",
    tools: [
      { name: "Social Post Generator", link: "/tool/social-post", reason: "Create viral LinkedIn & Twitter threads instantly." },
      { name: "Email Subject Generator", link: "/tool/email-generator", reason: "Boost open rates for your newsletters." },
      { name: "Hashtag Generator", link: "/tool/hashtag-generator", reason: "Maximize reach on Instagram & TikTok." }
    ]
  },
  {
    id: "dev",
    icon: HiCode,
    title: "Developers",
    color: "bg-blue-500",
    tools: [
      { name: "Code Explainer", link: "/tool/code-explainer", reason: "Understand complex legacy code in seconds." },
      { name: "Email Generator", link: "/tool/email-generator", reason: "Write professional client updates without overthinking." },
      { name: "Paraphraser", link: "/tool/paraphraser", reason: "Rewrite documentation to be more user-friendly." }
    ]
  },
  {
    id: "student",
    icon: HiAcademicCap,
    title: "Students & Research",
    color: "bg-green-500",
    tools: [
      { name: "Text Summarizer", link: "/tool/text-summarizer", reason: "Digest long research papers in minutes." },
      { name: "Grammar Checker", link: "/tool/grammar-check", reason: "Ensure your essays are error-free." },
      { name: "Blog Idea Generator", link: "/tool/blog-ideas", reason: "Brainstorm creative angles for your thesis." }
    ]
  },
  {
    id: "writer",
    icon: HiPencilAlt,
    title: "Writers & Bloggers",
    color: "bg-purple-500",
    tools: [
      { name: "Blog Idea Generator", link: "/tool/blog-ideas", reason: "Never run out of content ideas." },
      { name: "Paraphraser", link: "/tool/paraphraser", reason: "Overcome writer's block by rephrasing clunky sentences." },
      { name: "Meta Description Gen", link: "/tool/meta-description", reason: "Optimize your posts for Google ranking." }
    ]
  },
  {
    id: "business",
    icon: HiBriefcase,
    title: "Business & Startup",
    color: "bg-orange-500",
    tools: [
      { name: "Business Name Generator", link: "/tool/business-name", reason: "Find a memorable name for your new venture." },
      { name: "Product Description", link: "/tool/product-description", reason: "Launch your MVP with persuasive copy." },
      { name: "Email Generator", link: "/tool/email-generator", reason: "Draft cold outreach emails that get replies." }
    ]
  }
];

export default function SectorFinderPage() {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  return (
    <WorkspaceLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Find Your Perfect AI Stack
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tell us what you do, and we will recommend the exact tools you need to 10x your productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sectors.map((sector) => (
            <motion.button
              key={sector.id}
              onClick={() => setActiveSector(activeSector === sector.id ? null : sector.id)}
              className={`relative p-6 rounded-3xl text-left transition-all duration-300 border ${
                activeSector === sector.id 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-2xl scale-105 z-10' 
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
              }`}
              layout
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${sector.color} text-white shadow-lg`}>
                <sector.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{sector.title}</h3>
              <p className={`text-sm ${activeSector === sector.id ? 'text-slate-300 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                Click to reveal toolkit →
              </p>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeSector === sector.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-slate-700 dark:border-slate-200"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-70">Recommended Stack</h4>
                    <ul className="space-y-4">
                      {sector.tools.map((tool) => (
                        <li key={tool.name}>
                          <Link href={tool.link} className="group block">
                            <div className="font-bold flex items-center gap-2 group-hover:text-indigo-400 dark:group-hover:text-indigo-600 transition-colors">
                              {tool.name}
                              <HiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs opacity-80 mt-1">{tool.reason}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

      </div>
    </WorkspaceLayout>
  );
}

