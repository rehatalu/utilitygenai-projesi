"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import WelcomeHub from "@/components/tools/WelcomeHub";
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <WorkspaceLayout>
      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <motion.div
          key="welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <WelcomeHub />
        </motion.div>
      </div>
    </WorkspaceLayout>
  );
}

