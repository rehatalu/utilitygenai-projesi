"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <WorkspaceLayout>
      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <motion.div
          key="about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full px-4"
        >
          {/* "prose" teması metni otomatik stillendirecektir */}
          <article className="prose prose-invert max-w-none rounded-xl bg-slate-900/90 p-6 md:p-8 my-4">
            <h1>About UtilityGenAI</h1>
            <h2>Our Mission: Making AI Simple for Everyone.</h2>
            <p>Welcome to UtilityGenAI, your new home for everyday productivity. We believe that the power of artificial intelligence (AI) shouldn&apos;t be complicated. You shouldn&apos;t need to be a &quot;prompt engineer&quot; or understand complex models to get simple tasks done.</p>
            <p>Our mission is to democratize access to AI tools, making them accessible to everyone. We believe that AI should be a tool for empowerment, not a barrier. That&apos;s why we&apos;ve built a platform that is easy to use, yet powerful enough to handle complex tasks. Whether you&apos;re a student, a marketing professional, an e-commerce store owner, or a content creator, our &quot;workspace&quot; is designed to be your trusted assistant.</p>
            <h2>Why We Built This</h2>
            <p>Whether you&apos;re a marketer, developer, or content creator, UtilityGenAI has something for you. We noticed many &quot;AI wrapper&quot; sites were either too complex, too expensive, or focused on only one task. We wanted to create the &quot;7-to-70&quot; platform—a place you can go to for a dozen different needs in one spot:</p>
            <ul>
              <li>Need a catchy <strong>email subject line</strong>? We have a tool for that.</li>
              <li>Need to <strong>paraphrase</strong> a difficult text? It&apos;s designed to be intuitive, efficient, and versatile&mdash;helping you create high-quality content in seconds. We have a tool for that.</li>
              <li>Need <strong>social media post ideas</strong>? We have a tool for that.</li>
            </ul>
            <p>UtilityGenAI (utilitygenai.com) is a project built to provide immediate value. No sign-ups for core tools, no complex pricing. Just simple, effective AI utilities.</p>
            <p>This project is independently operated and funded through on-page advertising (like Google AdSense) to keep the tools 100% free for you.</p>
            <p>Thank you for being here. We hope our tools boost your productivity and give you back your most valuable asset: <strong>time</strong>.</p>
          </article>
        </motion.div>
      </div>
    </WorkspaceLayout>
  );
}
