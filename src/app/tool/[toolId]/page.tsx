import { notFound } from "next/navigation";
import type { Metadata } from "next";

import EmailSubjectGenerator from "@/components/tools/EmailSubjectGenerator";
import ParaphraserTool from "@/components/tools/ParaphraserTool";
import SocialPostGenerator from "@/components/tools/SocialPostGenerator";
import MetaDescriptionGenerator from "@/components/tools/MetaDescriptionGenerator";
import GrammarChecker from "@/components/tools/GrammarChecker";
import ProductDescriptionGenerator from "@/components/tools/ProductDescriptionGenerator";
import BlogIdeaGenerator from "@/components/tools/BlogIdeaGenerator";
import YoutubeIdeaGenerator from "@/components/tools/YoutubeIdeaGenerator";

const tools = {
  "email-generator": {
    component: EmailSubjectGenerator,
    title: "AI Email Subject Generator",
    desc: "Generate catchy email subject lines instantly with AI.",
  },
  paraphraser: {
    component: ParaphraserTool,
    title: "AI Paraphrasing Tool",
    desc: "Rewrite text professionally with AI-powered paraphrasing.",
  },
  "social-post": {
    component: SocialPostGenerator,
    title: "Social Media Post Generator",
    desc: "Create viral posts for Twitter and LinkedIn with AI.",
  },
  "meta-description": {
    component: MetaDescriptionGenerator,
    title: "SEO Meta Description Generator",
    desc: "Boost your SEO with AI-generated meta descriptions.",
  },
  "grammar-check": {
    component: GrammarChecker,
    title: "Free Grammar Checker",
    desc: "Correct grammar and spelling errors automatically with AI.",
  },
  "product-description": {
    component: ProductDescriptionGenerator,
    title: "Product Description Generator",
    desc: "Write persuasive product descriptions for e-commerce with AI.",
  },
  "blog-ideas": {
    component: BlogIdeaGenerator,
    title: "Blog Post Idea Generator",
    desc: "Get creative blog post ideas and titles with AI.",
  },
  "youtube-ideas": {
    component: YoutubeIdeaGenerator,
    title: "YouTube Video Idea Generator",
    desc: "Generate viral video ideas and titles for YouTube with AI.",
  },
};

type ToolId = keyof typeof tools;

export async function generateMetadata({ params }: { params: { toolId: string } }): Promise<Metadata> {
  const tool = tools[params.toolId as ToolId];
  if (!tool) {
    return { title: "Tool Not Found | UtilityGenAI" };
  }

  return {
    title: tool.title,
    description: tool.desc,
  };
}

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const tool = tools[params.toolId as ToolId];

  if (!tool) {
    notFound();
  }

  const ActiveComponent = tool.component;

  return (
    <div className="mx-auto flex w-full max-w-4xl justify-center pt-8">
      <ActiveComponent />
    </div>
  );
}

