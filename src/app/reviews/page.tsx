"use client";

import { useState, useEffect, Suspense } from 'react';
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { aiTools, AITool } from '@/data/ai-knowledge-base';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiX, HiSwitchHorizontal, HiSparkles, HiFilter } from 'react-icons/hi';
import { useSearchParams, useRouter } from 'next/navigation';

function ReviewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get categories dynamically
  const categories = Array.from(new Set(aiTools.map(t => t.category)));
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  
  // Filter tools by category
  const filteredTools = aiTools.filter(t => t.category === selectedCategory);

  // State for selected tools
  const [toolAId, setToolAId] = useState<string>("");
  const [toolBId, setToolBId] = useState<string>("");

  // Initialize from URL or defaults
  useEffect(() => {
    const paramA = searchParams.get('toolA');
    const paramB = searchParams.get('toolB');
    const catParam = searchParams.get('category');

    if (catParam && categories.includes(catParam as any)) {
        setSelectedCategory(catParam);
    }

    if (paramA) {
        const tool = aiTools.find(t => t.id === paramA);
        if (tool) {
            setToolAId(tool.id);
            // If category mismatch, switch category to tool A's category
            if (tool.category !== selectedCategory) setSelectedCategory(tool.category);
        }
    } 
    
    if (paramB) {
        setToolBId(paramB);
    }
  }, [searchParams, categories, selectedCategory]);

  // Set defaults if empty after filtering
  useEffect(() => {
      const currentTools = aiTools.filter(t => t.category === selectedCategory);
      if (!currentTools.find(t => t.id === toolAId)) setToolAId(currentTools[0]?.id || "");
      if (!currentTools.find(t => t.id === toolBId)) setToolBId(currentTools[1]?.id || currentTools[0]?.id || "");
  }, [selectedCategory]);

  const toolA = aiTools.find(t => t.id === toolAId);
  const toolB = aiTools.find(t => t.id === toolBId);

  const handleCategoryChange = (cat: string) => {
      setSelectedCategory(cat);
      // Update URL without refreshing
      router.replace(`/reviews?category=${cat}`, { scroll: false });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
          <HiSwitchHorizontal className="w-4 h-4" />
          Database of {aiTools.length}+ Tools
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          The Great AI Showdown
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Filter by category, select two champions, and see who wins. Unbiased, technical, and brutal.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedCategory === cat 
                        ? 'bg-indigo-600 text-white shadow-lg scale-105' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Tool Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          {/* Selector A */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contender A</label>
            <select 
              value={toolAId}
              onChange={(e) => setToolAId(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg font-bold appearance-none cursor-pointer"
            >
              {filteredTools.map(m => (
                <option key={m.id} value={m.id} disabled={m.id === toolBId}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* VS Badge */}
          <div className="flex justify-center py-4 md:py-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30 z-10 ring-4 ring-white dark:ring-slate-900">
              VS
            </div>
          </div>

          {/* Selector B */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contender B</label>
            <select 
              value={toolBId}
              onChange={(e) => setToolBId(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg font-bold appearance-none cursor-pointer"
            >
              {filteredTools.map(m => (
                <option key={m.id} value={m.id} disabled={m.id === toolAId}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <AnimatePresence mode="wait">
        {toolA && toolB && (
            <motion.div 
                key={`${toolA.id}-${toolB.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                <ToolCard tool={toolA} />
                <ToolCard tool={toolB} />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolCard({ tool }: { tool: AITool }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="p-8 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start justify-between mb-4">
            <div>
                <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1 block">{tool.category}</span>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                tool.pricingModel === 'Free' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                tool.pricingModel === 'Paid' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
                {tool.pricingModel}
            </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
            Starts at <strong className="text-slate-900 dark:text-white">{tool.startingPrice}</strong>
        </p>
      </div>

      <div className="p-8 flex-1 space-y-8">
        
        {/* Context / Specs */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Context Window</h3>
                <p className="font-bold text-slate-800 dark:text-slate-200">{tool.contextWindow}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Best Use Case</h3>
                <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{tool.bestFor}</p>
            </div>
        </div>

        {/* Features */}
        <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <HiSparkles className="w-4 h-4" /> Key Features
            </h3>
            <div className="flex flex-wrap gap-2">
                {tool.keyFeatures.map((f, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium">
                        {f}
                    </span>
                ))}
            </div>
        </div>

        {/* Pros & Cons */}
        <div className="space-y-4">
            <div>
                <h3 className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">Why it wins</h3>
                <ul className="space-y-2">
                    {tool.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <HiCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {pro}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2">The downsides</h3>
                <ul className="space-y-2">
                    {tool.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <HiX className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            {con}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

      </div>
    </div>
  );
}

export default function ReviewsPage() {
    return (
        <WorkspaceLayout>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading comparison engine...</div>}>
                <ReviewsContent />
            </Suspense>
        </WorkspaceLayout>
    )
}
