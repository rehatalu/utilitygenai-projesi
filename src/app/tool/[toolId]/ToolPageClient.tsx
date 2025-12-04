"use client";

// CACHE REFRESH: v1.0.7 - Force Vercel to refresh API cache (OPENAI_API_KEY fix)
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getToolData } from "@/lib/tools-data";
import Accordion from "@/components/ui/Accordion";

import {
  EnvelopeIcon,
  DocumentDuplicateIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  TagIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  LightBulbIcon,
  VideoCameraIcon,
  HashtagIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentTextIcon,
  CameraIcon,
  CheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// --- LAZY LOADING COMPONENTS ---
const LoadingTool = () => (
  <div className="w-full h-64 flex items-center justify-center text-slate-500 animate-pulse bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
    Loading tool interface...
  </div>
);

const EmailSubjectGenerator = dynamic(() => import('@/components/tools/EmailSubjectGenerator'), { loading: () => <LoadingTool /> });
const ParaphraserTool = dynamic(() => import('@/components/tools/ParaphraserTool'), { loading: () => <LoadingTool /> });
const SocialPostGenerator = dynamic(() => import('@/components/tools/SocialPostGenerator'), { loading: () => <LoadingTool /> });
const MetaDescriptionGenerator = dynamic(() => import('@/components/tools/MetaDescriptionGenerator'), { loading: () => <LoadingTool /> });
const GrammarChecker = dynamic(() => import('@/components/tools/GrammarChecker'), { loading: () => <LoadingTool /> });
const ProductDescriptionGenerator = dynamic(() => import('@/components/tools/ProductDescriptionGenerator'), { loading: () => <LoadingTool /> });
const BlogIdeaGenerator = dynamic(() => import('@/components/tools/BlogIdeaGenerator'), { loading: () => <LoadingTool /> });
const YoutubeIdeaGenerator = dynamic(() => import('@/components/tools/YoutubeIdeaGenerator'), { loading: () => <LoadingTool /> });
const HashtagGenerator = dynamic(() => import('@/components/tools/HashtagGenerator'), { loading: () => <LoadingTool /> });
const BusinessNameGenerator = dynamic(() => import('@/components/tools/BusinessNameGenerator'), { loading: () => <LoadingTool /> });
const CodeExplainer = dynamic(() => import('@/components/tools/CodeExplainer'), { loading: () => <LoadingTool /> });
const TextSummarizer = dynamic(() => import('@/components/tools/TextSummarizer'), { loading: () => <LoadingTool /> });
const InstagramCaptionGenerator = dynamic(() => import('@/components/tools/InstagramCaptionGenerator'), { loading: () => <LoadingTool /> });

// --- TOOL CONFIGURATION ---
import { ToolComponentProps } from '@/types/tool-props';

const toolConfig: Record<string, { component: React.ComponentType<ToolComponentProps>, icon: React.ElementType, title: string }> = {
  'email-generator': { component: EmailSubjectGenerator, icon: EnvelopeIcon, title: 'Email Subject Generator' },
  'paraphraser': { component: ParaphraserTool, icon: DocumentDuplicateIcon, title: 'Paraphraser Tool' },
  'social-post': { component: SocialPostGenerator, icon: ChatBubbleOvalLeftEllipsisIcon, title: 'Social Post Generator' },
  'meta-description': { component: MetaDescriptionGenerator, icon: TagIcon, title: 'Meta Description Generator' },
  'grammar-check': { component: GrammarChecker, icon: CheckCircleIcon, title: 'Grammar Checker' },
  'product-description': { component: ProductDescriptionGenerator, icon: ShoppingCartIcon, title: 'Product Description Generator' },
  'blog-ideas': { component: BlogIdeaGenerator, icon: LightBulbIcon, title: 'Blog Idea Generator' },
  'youtube-ideas': { component: YoutubeIdeaGenerator, icon: VideoCameraIcon, title: 'YouTube Idea Generator' },
  'hashtag-generator': { component: HashtagGenerator, icon: HashtagIcon, title: 'Hashtag Generator' },
  'business-name': { component: BusinessNameGenerator, icon: BriefcaseIcon, title: 'Business Name Generator' },
  'code-explainer': { component: CodeExplainer, icon: CommandLineIcon, title: 'Code Explainer' },
  'text-summarizer': { component: TextSummarizer, icon: DocumentTextIcon, title: 'Text Summarizer' },
  'instagram-caption': { component: InstagramCaptionGenerator, icon: CameraIcon, title: 'Instagram Caption Generator' },
};

type ToolId = keyof typeof toolConfig;

interface ToolPageClientProps {
  toolId: ToolId;
}

export default function ToolPageClient({ toolId }: ToolPageClientProps) {
  const config = toolConfig[toolId];
  const data = getToolData(toolId);

  if (!config || !data) {
    return (
        <WorkspaceLayout>
             <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tool Not Found</h2>
                <Link href="/" className="mt-4 text-indigo-600 hover:underline">Go Back Home</Link>
             </div>
        </WorkspaceLayout>
    )
  }

  const ActiveComponent = config.component;
  const ToolIcon = config.icon;

  return (
    <WorkspaceLayout>
      <div className="mx-auto w-full max-w-5xl px-4 pt-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={toolId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            
            {/* --- SECTION 1: HEADER & INTERACTIVE TOOL --- */}
            <div className="mb-16">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 shadow-lg mb-6">
                        <ToolIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        {data.title}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        {data.description}
                    </p>
                </div>

                {/* THE TOOL ITSELF */}
                <div className="relative z-10">
                    <ActiveComponent toolId={toolId} toolName={config.title} />
                </div>
            </div>

            {/* --- SECTION 2: FEATURES & USAGE GRID --- */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Features */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <SparklesIcon className="w-6 h-6 text-yellow-500" />
                        Key Features
                    </h3>
                    <ul className="space-y-4">
                        {data.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <CheckIcon className="w-3 h-3" />
                                </div>
                                <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Use Cases */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <LightBulbIcon className="w-6 h-6 text-indigo-500" />
                        Common Use Cases
                    </h3>
                     <ul className="space-y-3">
                        {data.useCases.map((useCase, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                {useCase}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* --- SECTION 3: SEO CONTENT (Markdown) --- */}
            <div className="mb-16 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                    <ReactMarkdown>{data.content}</ReactMarkdown>
                </div>
            </div>

            <div className="mt-12 mb-8 p-6 bg-slate-50/50 border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💡</span>
                <h3 className="font-bold text-slate-900">Pro Tip for Marketers</h3>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Generating content is just the first step. Learn how to optimize your workflow and increase your conversion rates in our latest guides.
                <Link 
                  href="/blog" 
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline ml-1 inline-flex items-center gap-1 transition-colors"
                >
                  Read AI Guides &rarr;
                </Link>
              </p>
            </div>

            {/* --- SECTION 4: FAQ --- */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <Accordion items={data.faq} />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </WorkspaceLayout>
  );
}
