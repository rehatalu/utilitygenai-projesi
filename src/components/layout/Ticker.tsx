"use client";

import { motion } from "framer-motion";

const toolNames = [
  "Email Subject Generator",
  "Paraphraser Tool",
  "Social Post Generator",
  "Meta Generator",
  "Grammar Checker",
  "Product Generator",
  "Blog Ideas",
  "YouTube Idea Generator",
  "Hashtag Generator",
  "Business Name Generator",
  "AI Code Explainer",
  "Text Summarizer",
  "Instagram Caption Generator",
];

export default function Ticker() {
  return (
    <div className="relative h-8 w-full overflow-hidden border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
      <motion.div
        className="flex h-full items-center gap-8 whitespace-nowrap font-mono text-xs font-medium text-slate-400"
        animate={{
          x: [0, -50 * toolNames.length * 2],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
      >
        {[...toolNames, ...toolNames, ...toolNames].map((name, index) => (
          <div key={index} className="flex items-center gap-8">
            <span>{name}</span>
            <span className="text-indigo-500">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

