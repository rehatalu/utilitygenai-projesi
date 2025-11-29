"use client";

import { useState, useEffect, Suspense } from 'react';
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { aiTools, AITool } from '@/data/ai-knowledge-base';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiCheck, 
    HiX, 
    HiSwitchHorizontal, 
    HiSparkles, 
    HiGlobeAlt, 
    HiDeviceMobile, 
    HiCode,
    HiShieldCheck
} from 'react-icons/hi';
import { useSearchParams, useRouter } from 'next/navigation';

function ReviewsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categories = Array.from(new Set(aiTools.map(t => t.category)));
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const filteredTools = aiTools.filter(t => t.category === selectedCategory);

  const [toolAId, setToolAId] = useState<string>("");
  const [toolBId, setToolBId] = useState<string>("");

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
            if (tool.category !== selectedCategory) setSelectedCategory(tool.category);
        }
    } 
    
    if (paramB) {
        setToolBId(paramB);
    }
  }, [searchParams, categories, selectedCategory]);

  useEffect(() => {
      const currentTools = aiTools.filter(t => t.category === selectedCategory);
      if (!currentTools.find(t => t.id === toolAId)) setToolAId(currentTools[0]?.id || "");
      if (!currentTools.find(t => t.id === toolBId)) setToolBId(currentTools[1]?.id || currentTools[0]?.id || "");
  }, [selectedCategory]);

  const toolA = aiTools.find(t => t.id === toolAId);
  const toolB = aiTools.find(t => t.id === toolBId);

  const handleCategoryChange = (cat: string) => {
      setSelectedCategory(cat);
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
          Deep Tech Comparison
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Compare technical specs, API limits, and capabilities side-by-side.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
        
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

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tool A</label>
            <select 
              value={toolAId}
              onChange={(e) => setToolAId(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-bold cursor-pointer"
            >
              {filteredTools.map(m => (
                <option key={m.id} value={m.id} disabled={m.id === toolBId}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center py-4 md:py-0">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold">
                VS
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tool B</label>
            <select 
              value={toolBId}
              onChange={(e) => setToolBId(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-bold cursor-pointer"
            >
              {filteredTools.map(m => (
                <option key={m.id} value={m.id} disabled={m.id === toolAId}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
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
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      
      <div className="p-8 pb-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
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
        
        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3">
            <SpecBox label="Context" value={tool.contextWindow} />
            <SpecBox label="Max Output" value={tool.maxTokens} />
            <SpecBox label="Output Type" value={tool.outputTypes.join(", ")} />
            <SpecBox label="Best For" value={tool.bestFor} />
        </div>

        {/* Feature Toggles */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-1">
            <FeatureRow label="Internet Access" value={tool.internetAccess} icon={HiGlobeAlt} />
            <FeatureRow label="Mobile App" value={tool.mobileApp} icon={HiDeviceMobile} />
            <FeatureRow label="API Available" value={tool.apiAvailable} icon={HiCode} />
            <FeatureRow label="Privacy Focused" value={tool.privacyFocus} icon={HiShieldCheck} />
        </div>

        {/* Pros & Cons */}
        <div className="space-y-4">
            <div>
                <h3 className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">Pros</h3>
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
                <h3 className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2">Cons</h3>
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

function SpecBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</h3>
            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate" title={value}>{value}</p>
        </div>
    )
}

function FeatureRow({ label, value, icon: Icon }: { label: string, value: boolean, icon: any }) {
    return (
        <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800 last:border-0">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Icon className="w-4 h-4 text-slate-400" />
                {label}
            </div>
            {value ? (
                <HiCheck className="w-5 h-5 text-green-500" />
            ) : (
                <HiX className="w-5 h-5 text-slate-300 dark:text-slate-600" />
            )}
        </div>
    )
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
