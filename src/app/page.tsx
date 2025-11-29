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
                             bg-white border border-slate-300/80 dark:border-slate-700 
                             shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none
                             dark:bg-slate-900/50
                             transition-all duration-300
                             hover:bg-gray-50 dark:hover:bg-slate-800/70 
                             hover:ring-2 hover:ring-indigo-500
                             hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-slate-800/50
                             hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- SEO & INFO BÖLÜMÜ --- */}
        <div className="mt-20 mb-10 max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Your All-in-One AI Productivity Workspace
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
              <p>
                Welcome to <strong>UtilityGenAI</strong>, the ultimate collection of free artificial intelligence tools designed to streamline your digital workflow. In an era where efficiency is key, we provide a unified platform where students, developers, marketers, and content creators can access powerful AI models without the complexity.
              </p>
              
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-2">Why Choose UtilityGenAI?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>100% Free Access:</strong> No subscriptions, no credit cards, no hidden fees. Democratizing AI for everyone.</li>
                <li><strong>Privacy First:</strong> We do not store your inputs. Your data is processed securely and discarded instantly.</li>
                <li><strong>Specialized Tools:</strong> Unlike generic chatbots, our tools are fine-tuned for specific tasks—from <a href="/tool/email-generator" className="text-indigo-600 hover:underline">email writing</a> to <a href="/tool/code-explainer" className="text-indigo-600 hover:underline">code debugging</a>.</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-2">Our Mission</h3>
              <p>
                We believe that the future of work is a collaboration between human creativity and artificial intelligence. Our mission is to build the most accessible "utility belt" for the modern web, helping you save hours every week on repetitive tasks so you can focus on what truly matters.
              </p>
            </div>
          </div>
        </div>
        {/* --- SEO BÖLÜMÜ SONU --- */}
        
      </div>
    </WorkspaceLayout>
  );
}
