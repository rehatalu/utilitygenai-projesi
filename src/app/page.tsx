"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import WelcomeHub from "@/components/tools/WelcomeHub";
import { motion } from 'framer-motion';
import Link from 'next/link';

// 13 aracın tamamı için veri
const toolList = [
  { slug: 'email-generator', name: 'Email Subject Generator', description: 'Catchy subject lines to boost open rates.' },
  { slug: 'paraphraser', name: 'Paraphraser Tool', description: 'Rewrite text to make it unique and clear.' },
  { slug: 'social-post', name: 'Social Post Generator', description: 'Create posts for LinkedIn, Twitter (X), etc.' },
  { slug: 'meta-description', name: 'Meta Description Generator', description: 'Write SEO-friendly meta descriptions.' },
  { slug: 'grammar-check', name: 'Grammar Checker', description: 'Check your text for grammar & spelling errors.' },
  { slug: 'product-description', name: 'Product Description Generator', description: 'Persuasive copy for e-commerce.' },
  { slug: 'blog-ideas', name: 'Blog Post Idea Generator', description: 'Find viral topics for your content.' },
  { slug: 'youtube-ideas', name: 'YouTube Video Idea Generator', description: 'Get engaging ideas for your channel.' },
  { slug: 'hashtag-generator', name: 'Hashtag Generator', description: 'Find relevant hashtags to boost reach.' },
  { slug: 'business-name', name: 'Business Name Generator', description: 'Creative names for your new venture.' },
  { slug: 'code-explainer', name: 'AI Code Explainer', description: 'Understand complex code in plain English.' },
  { slug: 'text-summarizer', name: 'Text Summarizer', description: 'Condense long articles into key points.' },
  { slug: 'instagram-caption', name: 'Instagram Caption Generator', description: 'Captivating captions for your photos.' }
];

export default function HomePage() {
  return (
    <WorkspaceLayout>
      {/* DÜZELTME: Mobilde içerik hamburger menü altında kalmaması için üst boşluk */}
      <div className="pt-20 md:pt-10 pb-10">
        
        {/* 1. Bölüm: Karşılama */}
        <div className="mx-auto flex w-full max-w-4xl justify-center px-4">
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

        {/* 2. Bölüm: Araç Vitrini */}
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <motion.div
            key="tool-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="w-full px-4 mt-12 mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Explore Your AI Workspace
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              We&apos;ve built 13 specialized AI tools to handle specific tasks. From writing email subjects to explaining complex code, your free utility belt is ready.
            </p>
            
            {/* Araçların Grid Listesi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolList.map((tool) => (
                <Link
                  href={`/tool/${tool.slug}`}
                  key={tool.slug}
                  className="block p-4 rounded-lg 
                             bg-white border border-slate-300 dark:border-slate-700 shadow-sm hover:shadow-md
                             dark:bg-slate-900/50
                             transition-all hover:bg-gray-50 dark:hover:bg-slate-800/70 
                             hover:ring-2 hover:ring-indigo-500"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
        
      </div>
    </WorkspaceLayout>
  );
}
