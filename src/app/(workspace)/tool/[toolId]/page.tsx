import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import UgaChatbot from '@/components/tools/UgaChatbot';

type Props = {
  params: Promise<{ toolId: string }>;
};

// Araç Haritası (Şimdilik sadece UGA Chat mevcut, diğerleri sonra eklenecek)
const tools: Record<string, { component: React.ComponentType; title: string; desc: string }> = {
  'uga-chat': {
    component: UgaChatbot,
    title: 'Chat with UGA',
    desc: 'Chat with our AI mascot UGA about our tools.',
  },
  // Diğer araçlar sonra eklenecek:
  // 'email-generator': { component: EmailSubjectGenerator, title: 'AI Email Subject Generator', desc: '...' },
  // 'paraphraser': { component: ParaphraserTool, title: 'AI Paraphrasing Tool', desc: '...' },
  // 'social-post': { component: SocialPostGenerator, title: 'Social Media Post Generator', desc: '...' },
  // 'meta-description': { component: MetaDescriptionGenerator, title: 'SEO Meta Description Generator', desc: '...' },
  // 'grammar-check': { component: GrammarChecker, title: 'Free Grammar Checker', desc: '...' },
  // 'product-description': { component: ProductDescriptionGenerator, title: 'Product Description Generator', desc: '...' },
  // 'blog-ideas': { component: BlogIdeaGenerator, title: 'Blog Post Idea Generator', desc: '...' },
  // 'youtube-ideas': { component: YoutubeIdeaGenerator, title: 'YouTube Video Idea Generator', desc: '...' },
  // 'hashtag-generator': { component: HashtagGenerator, title: 'AI Hashtag Generator', desc: '...' },
  // 'business-name': { component: BusinessNameGenerator, title: 'AI Business Name Generator', desc: '...' },
  // 'code-explainer': { component: CodeExplainer, title: 'AI Code Explainer', desc: '...' },
  // 'text-summarizer': { component: TextSummarizer, title: 'AI Text Summarizer', desc: '...' },
  // 'instagram-caption': { component: InstagramCaptionGenerator, title: 'AI Instagram Caption Generator', desc: '...' },
};

type ToolId = keyof typeof tools;

// Dinamik SEO fonksiyonu
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];
  
  if (!tool) {
    return {
      title: 'Tool Not Found | UtilityGenAI',
      description: 'The requested tool could not be found.',
    };
  }

  return {
    title: `${tool.title} | UtilityGenAI`,
    description: tool.desc,
  };
}

// Dinamik Sayfa (Animasyon DAHİL)
export default async function ToolPage({ params }: Props) {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];

  if (!tool) {
    notFound();
  }

  const ActiveComponent = tool.component;

  return (
    <div className="mx-auto flex w-full max-w-4xl justify-center">
      <motion.div
        key={toolId} // Animasyonun değişmesi için 'key'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        <ActiveComponent />
      </motion.div>
    </div>
  );
}

