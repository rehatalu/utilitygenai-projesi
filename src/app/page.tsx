"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import WelcomeHub from "@/components/tools/WelcomeHub";
import EmailSubjectGenerator from "@/components/tools/EmailSubjectGenerator";
import ParaphraserTool from "@/components/tools/ParaphraserTool";
import SocialPostGenerator from "@/components/tools/SocialPostGenerator";
import MetaDescriptionGenerator from "@/components/tools/MetaDescriptionGenerator";
import GrammarChecker from "@/components/tools/GrammarChecker";
import ProductDescriptionGenerator from "@/components/tools/ProductDescriptionGenerator";

const toolComponents = {
  "email-generator": EmailSubjectGenerator,
  paraphraser: ParaphraserTool,
  "social-post": SocialPostGenerator,
  "meta-description": MetaDescriptionGenerator,
  "grammar-check": GrammarChecker,
  "product-description": ProductDescriptionGenerator,
};

type ToolId = keyof typeof toolComponents;

export default function Workspace() {
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null);
  const handleToolSelect = (toolId: string | null) => {
    setActiveToolId(toolId as ToolId | null);
  };

  const ActiveToolComponent = activeToolId ? toolComponents[activeToolId] : null;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar activeToolId={activeToolId} onToolSelect={handleToolSelect} />

        <main className="flex-1 w-full px-4 py-8 sm:px-8 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-4xl justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeToolId ?? "welcome"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {ActiveToolComponent ? <ActiveToolComponent /> : <WelcomeHub />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
 