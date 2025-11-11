"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import EmailSubjectGenerator from "@/components/tools/EmailSubjectGenerator";

const toolComponents = {
  "email-generator": EmailSubjectGenerator,
  // "paraphraser": ParaphraserTool, // Future tool
};

const availableTools = [
  { id: "email-generator", name: "Email Subject Generator" },
  // { id: "paraphraser", name: "Paraphraser" }, // Future tool
];

type ToolId = keyof typeof toolComponents;

export default function Workspace() {
  const [activeToolId, setActiveToolId] = useState<ToolId>("email-generator");

  const ActiveToolComponent = toolComponents[activeToolId];

  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-900">
      <header className="z-10 w-full bg-white shadow-md">
        <nav className="mx-auto flex max-w-4xl items-center justify-center gap-2 px-4 py-3">
          {availableTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id as ToolId)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeToolId === tool.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tool.name}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-4xl justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeToolId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {ActiveToolComponent && <ActiveToolComponent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
 