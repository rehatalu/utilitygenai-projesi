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
  HiArrowRight,
  HiDesktopComputer,
  HiColorSwatch,
  HiChip
} from 'react-icons/hi';
import { aiTools } from '@/data/ai-knowledge-base';

// Helper to get top 3 tools for a sector
function getRecommendedTools(category: string, count: number = 3) {
    return aiTools.filter(t => t.category === category).slice(0, count);
}

const sectors = [
  {
    id: "dev",
    icon: HiCode,
    title: "Software Developer",
    color: "bg-blue-500",
    desc: "Coding assistants, debuggers, and documentation helpers.",
    recommendedCategory: "Coding",
    internalTools: [
        { name: "Code Explainer", link: "/tool/code-explainer", reason: "Understand legacy code instantly." },
        { name: "Paraphraser", link: "/tool/paraphraser", reason: "Rewrite technical docs for clients." }
    ]
  },
  {
    id: "marketer",
    icon: HiTrendingUp,
    title: "Digital Marketer",
    color: "bg-pink-500",
    desc: "Copywriting, social media management, and SEO tools.",
    recommendedCategory: "Writing",
    internalTools: [
        { name: "Social Post Gen", link: "/tool/social-post", reason: "Viral threads in seconds." },
        { name: "Email Subject Gen", link: "/tool/email-generator", reason: "Higher open rates." }
    ]
  },
  {
    id: "creator",
    icon: HiColorSwatch,
    title: "Content Creator",
    color: "bg-purple-500",
    desc: "Video generation, image editing, and script writing.",
    recommendedCategory: "Video",
    internalTools: [
        { name: "YouTube Idea Gen", link: "/tool/youtube-ideas", reason: "Never run out of topics." },
        { name: "Hashtag Gen", link: "/tool/hashtag-generator", reason: "Maximum reach." }
    ]
  },
  {
    id: "researcher",
    icon: HiAcademicCap,
    title: "Academic Researcher",
    color: "bg-green-500",
    desc: "Paper summarization, citation management, and data analysis.",
    recommendedCategory: "LLM", // LLMs are best for research
    internalTools: [
        { name: "Text Summarizer", link: "/tool/text-summarizer", reason: "Digest papers fast." },
        { name: "Grammar Checker", link: "/tool/grammar-check", reason: "Flawless thesis writing." }
    ]
  },
  {
    id: "entrepreneur",
    icon: HiBriefcase,
    title: "Entrepreneur",
    color: "bg-orange-500",
    desc: "Pitch decks, business naming, and productivity.",
    recommendedCategory: "Productivity",
    internalTools: [
        { name: "Business Name Gen", link: "/tool/business-name", reason: "Brand your startup." },
        { name: "Product Description", link: "/tool/product-description", reason: "Sell your MVP." }
    ]
  },
  {
    id: "designer",
    icon: HiDesktopComputer,
    title: "Graphic Designer",
    color: "bg-indigo-500",
    desc: "Asset generation, mockups, and creative inspiration.",
    recommendedCategory: "Image",
    internalTools: [
        { name: "Blog Idea Gen", link: "/tool/blog-ideas", reason: "Visual concept brainstorming." }
    ]
  }
];

export default function SectorFinderPage() {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  return (
    <WorkspaceLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            Curated Stacks
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Find Your Perfect AI Stack
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We have analyzed 40+ tools to build the ultimate productivity toolkit for your profession.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sectors.map((sector) => (
            <motion.button
              key={sector.id}
              onClick={() => setActiveSector(activeSector === sector.id ? null : sector.id)}
              className={`relative p-6 rounded-[2rem] text-left transition-all duration-300 border h-full flex flex-col ${
                activeSector === sector.id 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-2xl scale-105 z-10 ring-4 ring-indigo-500/20' 
                  : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl'
              }`}
              layout
            >
              <div className="flex items-start justify-between mb-4 w-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${sector.color} text-white shadow-lg`}>
                    <sector.icon className="w-7 h-7" />
                </div>
                <HiChip className={`w-6 h-6 opacity-20 ${activeSector === sector.id ? 'text-white dark:text-black' : 'text-slate-900 dark:text-white'}`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{sector.title}</h3>
              <p className={`text-sm mb-6 leading-relaxed ${activeSector === sector.id ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                {sector.desc}
              </p>

              <div className={`mt-auto text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${activeSector === sector.id ? 'text-indigo-300 dark:text-indigo-600' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {activeSector === sector.id ? 'Close Toolkit' : 'Reveal Stack'}
                <HiArrowRight className={`w-4 h-4 transition-transform ${activeSector === sector.id ? 'rotate-90' : ''}`} />
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeSector === sector.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full pt-6 mt-6 border-t border-white/20 dark:border-black/10 text-left"
                  >
                    
                    {/* External Tools Section */}
                    <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70">Top External Tools</h4>
                        <ul className="space-y-3">
                            {getRecommendedTools(sector.recommendedCategory).map(tool => (
                                <li key={tool.id} className="bg-white/10 dark:bg-black/5 p-3 rounded-xl flex items-center justify-between group">
                                    <div>
                                        <span className="font-bold block text-sm">{tool.name}</span>
                                        <span className="text-[10px] opacity-70">{tool.pricingModel} • {tool.startingPrice}</span>
                                    </div>
                                    <Link 
                                        href={`/reviews?category=${tool.category}&toolA=${tool.id}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold rounded-lg hover:scale-105 transition-transform shadow-sm"
                                    >
                                        Compare
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Internal Tools Section */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70">Free UtilityGenAI Tools</h4>
                        <ul className="space-y-2">
                            {sector.internalTools.map(tool => (
                                <li key={tool.name}>
                                    <Link href={tool.link} className="block hover:underline decoration-white/50 underline-offset-2" onClick={(e) => e.stopPropagation()}>
                                        <span className="font-bold text-sm">→ {tool.name}</span>
                                        <span className="block text-[10px] opacity-70 pl-4">{tool.reason}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

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
