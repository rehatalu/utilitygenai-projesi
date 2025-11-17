import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ToolPageClient from './ToolPageClient';

// Araç Haritası
const tools = {
  'email-generator': { 
    component: 'EmailSubjectGenerator', 
    title: 'AI Email Subject Generator', 
    desc: 'Generate catchy email subject lines instantly.' 
  },
  'paraphraser': { 
    component: 'ParaphraserTool', 
    title: 'AI Paraphrasing Tool', 
    desc: 'Rewrite text professionally with AI.' 
  },
  'social-post': { 
    component: 'SocialPostGenerator', 
    title: 'Social Media Post Generator', 
    desc: 'Create viral posts for Twitter and LinkedIn.' 
  },
  'meta-description': { 
    component: 'MetaDescriptionGenerator', 
    title: 'SEO Meta Description Generator', 
    desc: 'Boost your SEO with AI-generated meta descriptions.' 
  },
  'grammar-check': { 
    component: 'GrammarChecker', 
    title: 'Free Grammar Checker', 
    desc: 'Correct grammar and spelling errors automatically.' 
  },
  'product-description': { 
    component: 'ProductDescriptionGenerator', 
    title: 'Product Description Generator', 
    desc: 'Write persuasive product descriptions for e-commerce.' 
  },
  'blog-ideas': { 
    component: 'BlogIdeaGenerator', 
    title: 'Blog Post Idea Generator', 
    desc: 'Get creative blog post ideas and titles.' 
  },
  'youtube-ideas': { 
    component: 'YoutubeIdeaGenerator', 
    title: 'YouTube Video Idea Generator', 
    desc: 'Generate viral video ideas and titles for YouTube.' 
  },
  'hashtag-generator': { 
    component: 'HashtagGenerator', 
    title: 'AI Hashtag Generator', 
    desc: 'Generate trending hashtags for Instagram, TikTok, and Twitter.' 
  },
  'business-name': { 
    component: 'BusinessNameGenerator', 
    title: 'AI Business Name Generator', 
    desc: 'Generate unique and catchy business names for your brand.' 
  },
  'code-explainer': { 
    component: 'CodeExplainer', 
    title: 'AI Code Explainer', 
    desc: 'Understand complex code snippets instantly with AI explanations.' 
  },
  'text-summarizer': { 
    component: 'TextSummarizer', 
    title: 'AI Text Summarizer', 
    desc: 'Instantly summarize long articles and texts into concise key points.' 
  },
  'instagram-caption': { 
    component: 'InstagramCaptionGenerator', 
    title: 'AI Instagram Caption Generator', 
    desc: 'Create engaging Instagram captions with emojis instantly.' 
  },
};

type ToolId = keyof typeof tools;

// Dinamik Metadata - email-generator için özel
export async function generateMetadata({ params }: { params: Promise<{ toolId: string }> }): Promise<Metadata> {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];

  if (!tool) {
    return {
      title: 'Tool Not Found | UtilityGenAI',
      description: 'The requested tool could not be found.',
    };
  }

  // email-generator için özel metadata
  if (toolId === 'email-generator') {
    const title = 'Free AI Email Subject Line Generator | UtilityGenAI';
    const description = 'Instantly generate catchy, high-converting email subject lines with our free AI tool. Boost your open rates for marketing, sales, and newsletters.';

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: 'https://utilitygenai.com/tool/email-generator',
      },
      twitter: {
        title: title,
        description: description,
      },
    };
  }

  // Diğer araçlar için genel metadata
  return {
    title: `${tool.title} | UtilityGenAI`,
    description: tool.desc,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];

  if (!tool) {
    notFound();
  }

  return <ToolPageClient toolId={toolId as ToolId} />;
}
