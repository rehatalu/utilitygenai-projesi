export interface AITool {
  id: string;
  name: string;
  category: 'LLM' | 'Coding' | 'Image' | 'Video' | 'Writing' | 'Productivity';
  pricingModel: 'Free' | 'Freemium' | 'Paid';
  startingPrice: string;
  contextWindow: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

export const aiTools: AITool[] = [
  // --- LLM GIANTS ---
  {
    id: "gpt-4o",
    name: "ChatGPT-4o",
    category: "LLM",
    pricingModel: "Freemium",
    startingPrice: "$20/mo",
    contextWindow: "128k Tokens",
    keyFeatures: ["Multimodal (Voice/Image)", "Web Browsing", "Data Analysis", "Custom GPTs"],
    pros: ["Fastest inference", "Best general reasoning", "Huge plugin ecosystem"],
    cons: ["Can be lazy with code", "Strict safety filters", "Privacy concerns"],
    bestFor: "General Purpose & Speed"
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    category: "LLM",
    pricingModel: "Freemium",
    startingPrice: "$20/mo",
    contextWindow: "200k Tokens",
    keyFeatures: ["Artifacts UI", "Project Knowledge", "Vision Analysis", "Human-like Tone"],
    pros: ["Best coding ability", "Natural writing style", "Follows complex instructions"],
    cons: ["No web browsing", "No image generation"],
    bestFor: "Coding & Writing"
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    category: "LLM",
    pricingModel: "Freemium",
    startingPrice: "$20/mo",
    contextWindow: "2 Million Tokens",
    keyFeatures: ["Google Workspace Integration", "Video Analysis", "Huge Context", "Code Execution"],
    pros: ["Can read entire books", "Understanding video natively", "Fast"],
    cons: ["Hallucinations", "UI can be cluttered"],
    bestFor: "Long Context Analysis"
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    category: "LLM",
    pricingModel: "Freemium",
    startingPrice: "$20/mo",
    contextWindow: "Variable",
    keyFeatures: ["Real-time Search", "Citations", "Model Switching", "Pro Search"],
    pros: ["Google replacement", "Trustworthy citations", "Access to GPT-4 & Claude"],
    cons: ["Not for creative writing", "Mobile app limited"],
    bestFor: "Research & Search"
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 (70B)",
    category: "LLM",
    pricingModel: "Free",
    startingPrice: "Open Source",
    contextWindow: "8k Tokens",
    keyFeatures: ["Open Weights", "Run Locally", "Fast", "Uncensored Options"],
    pros: ["Free to use/host", "Privacy", "Community fine-tunes"],
    cons: ["Requires hardware", "Lower reasoning than GPT-4"],
    bestFor: "Privacy & Local Use"
  },

  // --- CODING ---
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "Coding",
    pricingModel: "Paid",
    startingPrice: "$10/mo",
    contextWindow: "Context Aware",
    keyFeatures: ["IDE Integration", "Chat", "CLI Support", "Docs Search"],
    pros: ["Industry standard", "Works everywhere", "Massive training data"],
    cons: ["Can be repetitive", "Hard to debug deep logic"],
    bestFor: "General Autocomplete"
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Coding",
    pricingModel: "Freemium",
    startingPrice: "$20/mo",
    contextWindow: "Codebase Aware",
    keyFeatures: ["Native AI Editor", "Privacy Mode", "Copilot++", "Docs Integration"],
    pros: ["Best AI integration", "Codebase indexing", "Uses GPT-4/Claude"],
    cons: ["Requires switching IDE", "Subscription cost"],
    bestFor: "Full AI Development"
  },
  {
    id: "tabnine",
    name: "Tabnine",
    category: "Coding",
    pricingModel: "Freemium",
    startingPrice: "$12/mo",
    contextWindow: "Local Context",
    keyFeatures: ["Private Codebase Training", "Secure", "Jira Integration"],
    pros: ["Enterprise security", "Runs locally", "Team training"],
    cons: ["Not as 'smart' as GPT-4", "Slower updates"],
    bestFor: "Enterprise Security"
  },
  {
    id: "codeium",
    name: "Codeium",
    category: "Coding",
    pricingModel: "Freemium",
    startingPrice: "$0 (Individual)",
    contextWindow: "Context Aware",
    keyFeatures: ["Free for individuals", "Fast", "20+ IDEs"],
    pros: ["Generous free tier", "Very fast", "Good autocomplete"],
    cons: ["Chat is weaker than Copilot"],
    bestFor: "Free Alternative"
  },

  // --- IMAGE GENERATION ---
  {
    id: "midjourney-v6",
    name: "Midjourney v6",
    category: "Image",
    pricingModel: "Paid",
    startingPrice: "$10/mo",
    contextWindow: "N/A",
    keyFeatures: ["Photorealism", "Artistic Control", "Discord Interface", "Zoom/Pan"],
    pros: ["Best image quality", "Creative freedom", "Community"],
    cons: ["Discord only (mostly)", "Complex prompts", "No free trial"],
    bestFor: "Artistic High Quality"
  },
  {
    id: "dalle-3",
    name: "DALL-E 3",
    category: "Image",
    pricingModel: "Paid",
    startingPrice: "Included in ChatGPT Plus",
    contextWindow: "N/A",
    keyFeatures: ["Conversational Prompting", "Text Rendering", "Easy to Use"],
    pros: ["Easiest to use", "Good at following instructions", "Text looks good"],
    cons: ["Digital look", "Strict censorship"],
    bestFor: "Beginners & Specifics"
  },
  {
    id: "stable-diffusion-3",
    name: "Stable Diffusion 3",
    category: "Image",
    pricingModel: "Free",
    startingPrice: "Open Source",
    contextWindow: "N/A",
    keyFeatures: ["Local Generation", "ControlNet", "Inpainting", "LoRA"],
    pros: ["Uncensored", "Free", "Infinite customization"],
    cons: ["High hardware requirements", "Steep learning curve"],
    bestFor: "Power Users & Control"
  },
  {
    id: "leonardo-ai",
    name: "Leonardo.ai",
    category: "Image",
    pricingModel: "Freemium",
    startingPrice: "Free Daily Tokens",
    contextWindow: "N/A",
    keyFeatures: ["Game Assets", "Model Training", "Canvas Editor"],
    pros: ["Great free tier", "Asset consistency", "Easy UI"],
    cons: ["Can be slow", "Token limits"],
    bestFor: "Game Assets & Design"
  },

  // --- VIDEO ---
  {
    id: "runway-gen-3",
    name: "Runway Gen-3",
    category: "Video",
    pricingModel: "Paid",
    startingPrice: "$12/mo",
    contextWindow: "N/A",
    keyFeatures: ["Text to Video", "Image to Video", "Motion Brush", "Lip Sync"],
    pros: ["Industry leader", "High control", "Realistic motion"],
    cons: ["Expensive", "Short duration"],
    bestFor: "Professional Video"
  },
  {
    id: "pika-art",
    name: "Pika Art",
    category: "Video",
    pricingModel: "Freemium",
    startingPrice: "Free Credits",
    contextWindow: "N/A",
    keyFeatures: ["Animation", "Modify Region", "Sound Effects"],
    pros: ["Fun to use", "Good community", "Lip sync"],
    cons: ["Watermarks on free", "Lower resolution"],
    bestFor: "Social Media Content"
  },
  {
    id: "sora",
    name: "Sora (OpenAI)",
    category: "Video",
    pricingModel: "TBA",
    startingPrice: "Unreleased",
    contextWindow: "N/A",
    keyFeatures: ["1-minute videos", "Physics simulation", "High coherence"],
    pros: ["Unmatched realism", "Long duration"],
    cons: ["Not public yet", "High compute cost"],
    bestFor: "Future of Video"
  },
  {
    id: "heygen",
    name: "HeyGen",
    category: "Video",
    pricingModel: "Paid",
    startingPrice: "$29/mo",
    contextWindow: "N/A",
    keyFeatures: ["AI Avatars", "Video Translation", "Text to Speech"],
    pros: ["Best lip sync", "Realistic avatars", "Great for marketing"],
    cons: ["Very expensive", "Robotic movement sometimes"],
    bestFor: "Corporate Training/Marketing"
  },

  // --- WRITING & PRODUCTIVITY ---
  {
    id: "jasper-ai",
    name: "Jasper",
    category: "Writing",
    pricingModel: "Paid",
    startingPrice: "$39/mo",
    contextWindow: "Brand Voice",
    keyFeatures: ["Brand Voice", "SEO Mode", "Campaigns", "Art"],
    pros: ["Marketing focused", "Team collaboration", "Enterprise ready"],
    cons: ["Expensive", "Generic output without tuning"],
    bestFor: "Marketing Teams"
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    category: "Writing",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "Workflow",
    keyFeatures: ["Workflows", "Chat", "Brand Voice", "Scraping"],
    pros: ["Generous free tier", "Fast workflows", "Easy to use"],
    cons: ["Less structured than Jasper"],
    bestFor: "Freelancers & Speed"
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    category: "Productivity",
    pricingModel: "Paid",
    startingPrice: "$10/mo",
    contextWindow: "Page Context",
    keyFeatures: ["Summarization", "Translation", "Q&A", "Drafting"],
    pros: ["Integrated in workspace", "Convenient", "Good price"],
    cons: ["Basic model capabilities", "Locked to Notion"],
    bestFor: "Notion Users"
  },
  {
    id: "grammarly-go",
    name: "GrammarlyGO",
    category: "Writing",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "N/A",
    keyFeatures: ["Tone rewrite", "Ideation", "Email replies"],
    pros: ["Everywhere you type", "Trusted brand", "Good UX"],
    cons: ["Limited generations", "Can be intrusive"],
    bestFor: "Everyday Communication"
  },
  {
    id: "writesonic",
    name: "Writesonic",
    category: "Writing",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "Article",
    keyFeatures: ["SEO Writer", "Chatsonic", "Bots"],
    pros: ["SEO focused", "Up to date factual content"],
    cons: ["Credit system can be confusing"],
    bestFor: "SEO Bloggers"
  },
  {
    id: "quillbot",
    name: "QuillBot",
    category: "Writing",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "Paragraph",
    keyFeatures: ["Paraphrasing", "Summarizer", "Citation Gen"],
    pros: ["Best paraphraser", "Simple tool", "Academic focus"],
    cons: ["Limited generative capabilities"],
    bestFor: "Students & Academics"
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    category: "Productivity",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "Meeting",
    keyFeatures: ["Meeting transcription", "Summary", "Action Items"],
    pros: ["Saves time", "Searchable meetings", "Zoom/Meet integration"],
    cons: ["Transcription errors", "Privacy concerns"],
    bestFor: "Meetings"
  },
  {
    id: "descript",
    name: "Descript",
    category: "Video",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "Video Transcript",
    keyFeatures: ["Edit video by text", "Overdub", "Studio Sound"],
    pros: ["Revolutionary workflow", "Easy editing", "AI voice cloning"],
    cons: ["Can be buggy", "Learning curve"],
    bestFor: "Podcasters & YouTubers"
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "Video",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "N/A",
    keyFeatures: ["Text to Speech", "Voice Cloning", "Dubbing"],
    pros: ["Best voice quality", "Huge library", "Emotional range"],
    cons: ["Expensive for high volume"],
    bestFor: "Audio Content"
  },
  {
    id: "gamma",
    name: "Gamma",
    category: "Productivity",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "Presentation",
    keyFeatures: ["AI Presentations", "Websites", "Docs"],
    pros: ["Beautiful designs", "Fast", "Interactive"],
    cons: ["Limited layout customization"],
    bestFor: "Decks & Proposals"
  },
  {
    id: "beautiful-ai",
    name: "Beautiful.ai",
    category: "Productivity",
    pricingModel: "Paid",
    startingPrice: "$12/mo",
    contextWindow: "Slide",
    keyFeatures: ["Smart Slides", "Branding", "AI Designer"],
    pros: ["Impossible to make ugly slides", "Corporate ready"],
    cons: ["No free export", "Rigid templates"],
    bestFor: "Corporate Presentations"
  },
  {
    id: "synthesia",
    name: "Synthesia",
    category: "Video",
    pricingModel: "Paid",
    startingPrice: "$22/mo",
    contextWindow: "N/A",
    keyFeatures: ["AI Avatars", "120+ Languages", "Screen Recorder"],
    pros: ["Professional look", "Easy localization"],
    cons: ["Avatars can feel stiff"],
    bestFor: "Training Videos"
  },
  {
    id: "replit",
    name: "Replit",
    category: "Coding",
    pricingModel: "Freemium",
    startingPrice: "Free",
    contextWindow: "Project",
    keyFeatures: ["Cloud IDE", "Ghostwriter", "Deployments"],
    pros: ["Zero setup", "Collaborative", "AI built-in"],
    cons: ["Browser-based limitations"],
    bestFor: "Prototyping & Learning"
  },
  {
    id: "hugging-chat",
    name: "HuggingChat",
    category: "LLM",
    pricingModel: "Free",
    startingPrice: "Free",
    contextWindow: "Variable",
    keyFeatures: ["Open Source Models", "Privacy", "Customizable"],
    pros: ["Access to latest open models", "Free", "Transparent"],
    cons: ["Less polished UI", "Speed varies"],
    bestFor: "Open Source Enthusiasts"
  },
  {
    id: "poe",
    name: "Poe",
    category: "LLM",
    pricingModel: "Freemium",
    startingPrice: "$20/mo",
    contextWindow: "Variable",
    keyFeatures: ["All models in one", "User bots", "Fast"],
    pros: ["Convenient", "App is great", "Community bots"],
    cons: ["Points system limits"],
    bestFor: "Mobile Users"
  },
  {
    id: "groq",
    name: "Groq",
    category: "LLM",
    pricingModel: "Free",
    startingPrice: "Free (Beta)",
    contextWindow: "Variable",
    keyFeatures: ["LPU Inference", "Instant Speed", "Open Models"],
    pros: ["Fastest AI in the world", "Free currently"],
    cons: ["Limited to open models", "Beta status"],
    bestFor: "Speed Demons"
  }
];

