import type { Metadata, ResolvingMetadata } from 'next';
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

// Metadata Haritası - Tüm araçlar için benzersiz meta veriler
const TOOL_METADATA_MAP = {
  'email-generator': {
    title: 'Free AI Email Subject Line Generator | UtilityGenAI',
    description: 'Instantly generate catchy, high-converting email subject lines with our free AI tool. Boost your open rates for marketing and sales.'
  },
  'paraphraser': {
    title: 'Free AI Paraphraser Tool (Paraphrasing Tool) | UtilityGenAI',
    description: 'Rewrite and rephrase your text instantly. Our free AI paraphraser helps you avoid plagiarism and improve writing clarity.'
  },
  'social-post': {
    title: 'Free AI Social Media Post Generator (LinkedIn/Twitter) | UtilityGenAI',
    description: 'Generate engaging posts for LinkedIn, Twitter (X), and Facebook. Overcome writer\'s block with our free AI social post generator.'
  },
  'meta-description': {
    title: 'Free AI Meta Description Generator (SEO) | UtilityGenAI',
    description: 'Create compelling, SEO-friendly meta descriptions in seconds. Boost your search engine click-through rate (CTR) for free.'
  },
  'grammar-check': {
    title: 'Free AI Grammar Checker & Corrector | UtilityGenAI',
    description: 'Check your text for grammar, spelling, and punctuation errors. Our AI-powered tool helps you write clear, professional, error-free text.'
  },
  'product-description': {
    title: 'Free AI Product Description Generator (E-commerce) | UtilityGenAI',
    description: 'Generate persuasive, high-converting product descriptions for your e-commerce store (Shopify, Amazon, etc.) with our free AI tool.'
  },
  'blog-ideas': {
    title: 'Free AI Blog Post Idea Generator | UtilityGenAI',
    description: 'Never run out of content ideas. Get a list of viral, relevant, and SEO-friendly blog post topics for your niche.'
  },
  'youtube-ideas': {
    title: 'Free AI YouTube Video Idea Generator | UtilityGenAI',
    description: 'Find viral and engaging video ideas for your YouTube channel. Get titles and concepts that attract viewers.'
  },
  'hashtag-generator': {
    title: 'Free AI Hashtag Generator (Instagram/Twitter) | UtilityGenAI',
    description: 'Find the best hashtags to boost your post\'s reach and engagement. Get relevant hashtags for Instagram, Twitter, and more.'
  },
  'business-name': {
    title: 'Free AI Business Name Generator | UtilityGenAI',
    description: 'Find a creative, catchy, and brandable name for your new business, startup, or project with our free AI tool.'
  },
  'code-explainer': {
    title: 'Free AI Code Explainer (Python, JS, C++) | UtilityGenAI',
    description: 'Understand any code snippet in plain English. Our AI tool explains complex code from Python, JavaScript, and more.'
  },
  'text-summarizer': {
    title: 'Free AI Text Summarizer Tool | UtilityGenAI',
    description: 'Condense long articles, reports, or documents into key bullet points. Get the main idea in seconds with our free summarizer.'
  },
  'instagram-caption': {
    title: 'Free AI Instagram Caption Generator | UtilityGenAI',
    description: 'Write captivating captions for your Instagram posts. Get the perfect mix of storytelling, emojis, and hashtags for your photos.'
  }
};

// Sayfa component'inin Props tipini tanımla
type ToolPageProps = {
  params: Promise<{
    toolId: string;
  }>;
};

// Dinamik Metadata - Tüm araçlar için benzersiz meta veriler
export async function generateMetadata(
  { params }: ToolPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // toolId'yi al
  const { toolId } = await params;
  const toolMeta = TOOL_METADATA_MAP[toolId as keyof typeof TOOL_METADATA_MAP];

  // Eğer bu toolId için özel bir meta veri yoksa (hata durumu), varsayılanı kullan
  if (!toolMeta) {
    return {
      title: 'AI Tool | UtilityGenAI',
      description: 'A free AI-powered tool to boost your productivity.',
    };
  }

  // Benzersiz title ve description'ı ayarla
  const title = toolMeta.title;
  const description = toolMeta.description;
  const url = `https://utilitygenai.com/tool/${toolId}`;

  return {
    title: title,
    description: description,
    // Open Graph ve Twitter kartları için de ayarla
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'UtilityGenAI',
    },
    twitter: {
      title: title,
      description: description,
      card: 'summary_large_image',
    },
    // Canonical URL ekleyerek kopya içeriği önle
    alternates: {
      canonical: url,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId } = await params;
  const tool = tools[toolId as ToolId];

  if (!tool) {
    notFound();
  }

  return <ToolPageClient toolId={toolId as ToolId} />;
}
