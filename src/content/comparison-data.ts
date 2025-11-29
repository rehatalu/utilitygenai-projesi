export interface AIModel {
  id: string;
  name: string;
  bestFor: string;
  pricing: string;
  contextWindow: string;
  features: string[];
  pros: string[];
  cons: string[];
}

export const aiModels: AIModel[] = [
  {
    id: "gpt-4o",
    name: "ChatGPT-4o",
    bestFor: "General Purpose & Speed",
    pricing: "Free / $20/mo",
    contextWindow: "128k Tokens",
    features: ["Multimodal (Voice/Image)", "Web Browsing", "DALL-E 3 Integration", "Custom GPTs"],
    pros: ["Extremely fast", "Best general knowledge", "Huge plugin ecosystem", "Native mobile app is superior"],
    cons: ["Can be 'lazy' with code", "Strict safety filters", "Privacy concerns for enterprise (unless Enterprise plan)"]
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    bestFor: "Coding & Writing",
    pricing: "Free / $20/mo",
    contextWindow: "200k Tokens",
    features: ["Artifacts UI (Live Preview)", "Project Knowledge", "Vision Analysis", "Human-like Tone"],
    pros: ["Best coding ability currently", "Most natural writing style", "Excellent instruction following", "Artifacts feature is a game changer"],
    cons: ["No native web browsing (yet)", "No image generation", "Rate limits can be strict"]
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    bestFor: "Long Context Analysis",
    pricing: "Free / $20/mo",
    contextWindow: "2 Million Tokens",
    features: ["Deep Integration with Google Workspace", "Video Analysis", "Huge Context Window", "Fast Inference"],
    pros: ["Can read entire books/codebases", "Natively understands video", "Great for G-Suite users", "Fast response times"],
    cons: ["Prone to hallucinations", "Search results can be cluttered", "History of launch issues"]
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    bestFor: "Research & Search",
    pricing: "Free / $20/mo",
    contextWindow: "Variable",
    features: ["Real-time Web Search", "Source Citations", "Model Switching (Use GPT-4 or Claude)", "Pro Search"],
    pros: ["Best replacement for Google", "Always cites sources", "Access to multiple models in one sub", "Clean UI"],
    cons: ["Not great for creative writing", "Limited context retention", "Mobile app is search-focused only"]
  },
  {
    id: "jasper",
    name: "Jasper",
    bestFor: "Enterprise Marketing",
    pricing: "$39/mo+ (No Free Plan)",
    contextWindow: "Standard",
    features: ["Brand Voice Learning", "SEO Mode (Surfer Integration)", "Campaign Workflows", "Team Collaboration"],
    pros: ["Best for marketing teams", "Strict brand voice adherence", "Enterprise-grade security", "Templates for everything"],
    cons: ["Expensive", "Overkill for individuals", "Base models are similar to ChatGPT"]
  }
];

