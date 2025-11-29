"use client";

import { useState } from 'react';
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { aiModels } from '@/content/comparison-data';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiX, HiSwitchHorizontal, HiSparkles } from 'react-icons/hi';

export default function ReviewsPage() {
  const [modelAId, setModelAId] = useState(aiModels[0].id);
  const [modelBId, setModelBId] = useState(aiModels[1].id);

  const modelA = aiModels.find(m => m.id === modelAId) || aiModels[0];
  const modelB = aiModels.find(m => m.id === modelBId) || aiModels[1];

  return (
    <WorkspaceLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            <HiSwitchHorizontal className="w-4 h-4" />
            Interactive Comparison
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            AI Model Showdown
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Don&apos;t guess. Compare the top AI models side-by-side to find the perfect fit for your workflow.
          </p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center mb-12 bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Model A Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Model A</label>
            <select 
              value={modelAId}
              onChange={(e) => setModelAId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg font-bold"
            >
              {aiModels.map(m => (
                <option key={m.id} value={m.id} disabled={m.id === modelBId}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* VS Badge */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-500/30 transform rotate-12">
              VS
            </div>
          </div>

          {/* Model B Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Model B</label>
            <select 
              value={modelBId}
              onChange={(e) => setModelBId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-lg font-bold"
            >
              {aiModels.map(m => (
                <option key={m.id} value={m.id} disabled={m.id === modelAId}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${modelAId}-${modelBId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Card A */}
            <ModelCard model={modelA} />
            {/* Card B */}
            <ModelCard model={modelB} />
          </motion.div>
        </AnimatePresence>

      </div>
    </WorkspaceLayout>
  );
}

function ModelCard({ model }: { model: any }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="p-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{model.name}</h2>
          <span className="px-3 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase">
            {model.pricing.includes("Free") ? "Freemium" : "Paid"}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Best For</h3>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
              <HiSparkles className="w-5 h-5" />
              {model.bestFor}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Context Window</h3>
            <p className="text-slate-700 dark:text-slate-300 font-medium">{model.contextWindow}</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Pros</h3>
            <ul className="space-y-2">
              {model.pros.map((pro: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <HiCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Drawbacks</h3>
            <ul className="space-y-2">
              {model.cons.map((con: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <HiX className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
        <span className="text-xs text-slate-400">Last Updated: Nov 2025</span>
      </div>
    </div>
  );
}
