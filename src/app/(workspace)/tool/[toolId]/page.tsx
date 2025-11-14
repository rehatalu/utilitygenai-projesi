import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Araç Haritasını (tools map) 'Adım 50'den kopyala (GEREKLİ)
// Not: Component'ler henüz oluşturulmadığı için şimdilik sadece UGA Chat aktif
// import EmailSubjectGenerator from '@/components/tools/EmailSubjectGenerator';
// import ParaphraserTool from '@/components/tools/ParaphraserTool';
// import SocialPostGenerator from '@/components/tools/SocialPostGenerator';
// import MetaDescriptionGenerator from '@/components/tools/MetaDescriptionGenerator';
// import GrammarChecker from '@/components/tools/GrammarChecker';
// import ProductDescriptionGenerator from '@/components/tools/ProductDescriptionGenerator';
// import BlogIdeaGenerator from '@/components/tools/BlogIdeaGenerator';
// import YoutubeIdeaGenerator from '@/components/tools/YoutubeIdeaGenerator';
// import HashtagGenerator from '@/components/tools/HashtagGenerator';
// import BusinessNameGenerator from '@/components/tools/BusinessNameGenerator';
// import CodeExplainer from '@/components/tools/CodeExplainer';
// import TextSummarizer from '@/components/tools/TextSummarizer';
// import InstagramCaptionGenerator from '@/components/tools/InstagramCaptionGenerator';
import UgaChatbot from '@/components/tools/UgaChatbot'; // Artık var olduğu için import edebiliriz

type Props = {
  params: Promise<{ toolId: string }>;
};

// Araç Haritası
const tools: Record<string, { component: React.ComponentType; title: string; desc: string }> = {
  // 'email-generator': { component: EmailSubjectGenerator, title: 'AI Email Subject Generator', desc: 'Generate catchy email subject lines instantly.' },
  // 'paraphraser': { component: ParaphraserTool, title: 'AI Paraphrasing Tool', desc: 'Rewrite text professionally with AI.' },
  // 'social-post': { component: SocialPostGenerator, title: 'Social Media Post Generator', desc: 'Create viral posts for Twitter and LinkedIn.' },
  // 'meta-description': { component: MetaDescriptionGenerator, title: 'SEO Meta Description Generator', desc: 'Boost your SEO with AI-generated meta descriptions.' },
  // 'grammar-check': { component: GrammarChecker, title: 'Free Grammar Checker', desc: 'Correct grammar and spelling errors automatically.' },
  // 'product-description': { component: ProductDescriptionGenerator, title: 'Product Description Generator', desc: 'Write persuasive product descriptions for e-commerce.' },
  // 'blog-ideas': { component: BlogIdeaGenerator, title: 'Blog Post Idea Generator', desc: 'Get creative blog post ideas and titles.' },
  // 'youtube-ideas': { component: YoutubeIdeaGenerator, title: 'YouTube Video Idea Generator', desc: 'Generate viral video ideas and titles for YouTube.' },
  // 'hashtag-generator': { component: HashtagGenerator, title: 'AI Hashtag Generator', desc: 'Generate trending hashtags for Instagram, TikTok, and Twitter.' },
  // 'business-name': { component: BusinessNameGenerator, title: 'AI Business Name Generator', desc: 'Generate unique and catchy business names for your brand.' },
  // 'code-explainer': { component: CodeExplainer, title: 'AI Code Explainer', desc: 'Understand complex code snippets instantly with AI explanations.' },
  // 'text-summarizer': { component: TextSummarizer, title: 'AI Text Summarizer', desc: 'Instantly summarize long articles and texts into concise key points.' },
  // 'instagram-caption': { component: InstagramCaptionGenerator, title: 'AI Instagram Caption Generator', desc: 'Create engaging Instagram captions with emojis instantly.' },
  'uga-chat': { component: UgaChatbot, title: 'Chat with UGA', desc: 'Chat with our AI mascot UGA about our tools.' },
};

type ToolId = keyof typeof tools;

// Adım 50'deki "Dinamik SEO" fonksiyonu
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];
  if (!tool) return { title: 'Tool Not Found' };
  return { title: `${tool.title} | UtilityGenAI`, description: tool.desc };
}

// "Adım 50"deki "Dinamik Sayfa"
export default async function ToolPage({ params }: Props) {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];

  if (!tool) {
    notFound();
  }
  const ActiveComponent = tool.component;

  // Düzeltme: 'use client' olan `AnimatePresence`
  // 'async' (sunucu) bir sayfada çalışmaz. 
  // 'motion.div'i ekleyelim (Animasyon için)
  return (
    <div className="mx-auto flex w-full max-w-4xl justify-center">
        {/* 'motion.div' 'use client' gerektirebilir, 
            eğer bu da hata verirse, 'motion.div'i kaldırıp 
            sadece '<ActiveComponent />' yazacağız. 
            Şimdilik animasyonu deneyelim:
        */}
        {/* Düzeltme: Animasyon (motion.div) 'use client' gerektirdiği için 
            ve bu sayfa 'async' (sunucu) olduğu için ÇALIŞMAZ. 
            Animasyonu kaldırıp SADECE bileşeni çağırıyoruz:
        */}
        <ActiveComponent />
    </div>
  );
}

