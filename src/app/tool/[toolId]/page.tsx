"use client"; // 'usePathname' ve 'AnimatePresence' için 'use client' GEREKLİ
import WorkspaceLayout from "@/components/layout/WorkspaceLayout"; // YENİ ÇERÇEVEYİ import et
import { motion, AnimatePresence } from 'framer-motion';
import { notFound, usePathname } from 'next/navigation';

// Araç Haritasını (tools map) 'Adım 73'ten kopyala (GEREKLİ)
import EmailSubjectGenerator from '@/components/tools/EmailSubjectGenerator';
import ParaphraserTool from '@/components/tools/ParaphraserTool';
import SocialPostGenerator from '@/components/tools/SocialPostGenerator';
import MetaDescriptionGenerator from '@/components/tools/MetaDescriptionGenerator';
import GrammarChecker from '@/components/tools/GrammarChecker';
import ProductDescriptionGenerator from '@/components/tools/ProductDescriptionGenerator';
import BlogIdeaGenerator from '@/components/tools/BlogIdeaGenerator';
import YoutubeIdeaGenerator from '@/components/tools/YoutubeIdeaGenerator';
import HashtagGenerator from '@/components/tools/HashtagGenerator';
import BusinessNameGenerator from '@/components/tools/BusinessNameGenerator';
import CodeExplainer from '@/components/tools/CodeExplainer';
import TextSummarizer from '@/components/tools/TextSummarizer';
import InstagramCaptionGenerator from '@/components/tools/InstagramCaptionGenerator';
// UGA Chatbot'u BURADAN SİL (artık bir "araç" değil)

// Araç Haritası (UGA olmadan)
const tools = {
  'email-generator': { component: EmailSubjectGenerator, title: 'AI Email Subject Generator', desc: 'Generate catchy email subject lines instantly.' },
  'paraphraser': { component: ParaphraserTool, title: 'AI Paraphrasing Tool', desc: 'Rewrite text professionally with AI.' },
  'social-post': { component: SocialPostGenerator, title: 'Social Media Post Generator', desc: 'Create viral posts for Twitter and LinkedIn.' },
  'meta-description': { component: MetaDescriptionGenerator, title: 'SEO Meta Description Generator', desc: 'Boost your SEO with AI-generated meta descriptions.' },
  'grammar-check': { component: GrammarChecker, title: 'Free Grammar Checker', desc: 'Correct grammar and spelling errors automatically.' },
  'product-description': { component: ProductDescriptionGenerator, title: 'Product Description Generator', desc: 'Write persuasive product descriptions for e-commerce.' },
  'blog-ideas': { component: BlogIdeaGenerator, title: 'Blog Post Idea Generator', desc: 'Get creative blog post ideas and titles.' },
  'youtube-ideas': { component: YoutubeIdeaGenerator, title: 'YouTube Video Idea Generator', desc: 'Generate viral video ideas and titles for YouTube.' },
  'hashtag-generator': { component: HashtagGenerator, title: 'AI Hashtag Generator', desc: 'Generate trending hashtags for Instagram, TikTok, and Twitter.' },
  'business-name': { component: BusinessNameGenerator, title: 'AI Business Name Generator', desc: 'Generate unique and catchy business names for your brand.' },
  'code-explainer': { component: CodeExplainer, title: 'AI Code Explainer', desc: 'Understand complex code snippets instantly with AI explanations.' },
  'text-summarizer': { component: TextSummarizer, title: 'AI Text Summarizer', desc: 'Instantly summarize long articles and texts into concise key points.' },
  'instagram-caption': { component: InstagramCaptionGenerator, title: 'AI Instagram Caption Generator', desc: 'Create engaging Instagram captions with emojis instantly.' },
};
type ToolId = keyof typeof tools;

export default function ToolPage() {
  const pathname = usePathname();
  const toolId = pathname.split('/').pop() as ToolId; // URL'den toolId'yi al

  const tool = tools[toolId];

  if (!tool) {
    // 404 hatasını manuel olarak tetikle
    notFound();
  }
  const ActiveComponent = tool.component;

  // Not: Dinamik SEO (generateMetadata) 'use client' dosyasında çalışmaz.
  // Bu, Adsense onayı için BÜYÜK bir sorundur.
  // "Adım 78"de buna DÖNMEK ZORUNDAYIZ.

  return (
    // DÜZELTME: 'WorkspaceLayout' (Sol Menü + Footer) ile sarmala
    <WorkspaceLayout>
      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={toolId} // Animasyonun değişmesi için 'key'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </WorkspaceLayout>
  );
}
