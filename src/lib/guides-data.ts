import { HiBriefcase, HiAcademicCap, HiShoppingBag, HiCode, HiPencilAlt, HiTrendingUp } from 'react-icons/hi';

export const guides = [
  { 
    id: 1, 
    slug: "ai-for-ecommerce",
    icon: HiShoppingBag, 
    title: "AI for E-commerce", 
    desc: "How to automate product descriptions and customer support.", 
    steps: "5 Steps",
    content: `
## AI in E-commerce
E-commerce is one of the fastest-growing industries for AI adoption. From personalized recommendations to automated customer service, AI is reshaping how we buy and sell online.

### 1. Product Descriptions
Writing unique descriptions for thousands of products is tedious. Use our [Product Description Generator](/tool/product-description) to create unique, SEO-friendly copy in seconds.
- **Benefit:** Saves time and improves SEO rankings.
- **How-to:** Input your product features and let the AI craft a persuasive description.

### 2. Customer Support Chatbots
AI-powered chatbots can handle up to 80% of routine queries instantly.
- **Tools:** Intercom, Drift, or custom AI solutions.

### 3. Personalized Recommendations
Analyze user behavior to suggest products they are most likely to buy.

### 4. Inventory Management
Predict demand using AI algorithms to avoid stockouts or overstocking.

### 5. Pricing Strategy
Dynamic pricing tools adjust prices in real-time based on competitor data and demand.
    `
  },
  { 
    id: 2, 
    slug: "ai-for-real-estate",
    icon: HiBriefcase, 
    title: "AI for Real Estate", 
    desc: "Write listing descriptions that sell faster using AI tools.", 
    steps: "3 Steps",
    content: `
## Real Estate Marketing with AI
In real estate, the listing description is often the first impression. AI can help agents write compelling narratives that highlight the best features of a property.

### 1. Listing Descriptions
Turn basic property details (3 bed, 2 bath, pool) into an engaging story.
- **Tool:** [Paraphraser Tool](/tool/paraphraser) or specialized AI writing assistants.

### 2. Virtual Staging
Use AI image tools to furnish empty rooms virtually, helping buyers visualize the potential.

### 3. Lead Qualification
AI chatbots can screen potential buyers on your website, scheduling viewings only with qualified leads.
    `
  },
  { 
    id: 3, 
    slug: "ai-for-students",
    icon: HiAcademicCap, 
    title: "AI for Students", 
    desc: "Using grammar checkers and summarizers to study smarter.", 
    steps: "7 Steps",
    content: `
## Study Smarter, Not Harder
AI is a powerful ally for students, helping with research, writing, and comprehension.

### 1. Summarizing Research Papers
Don't read every word. Use a [Text Summarizer](/tool/text-summarizer) to get the gist of long academic papers.

### 2. Grammar and Style Checks
Ensure your essays are error-free with a [Grammar Checker](/tool/grammar-check).

### 3. Brainstorming Topics
Stuck on a thesis idea? Use the [Blog Idea Generator](/tool/blog-ideas) to spark creativity.

### 4. Understanding Complex Concepts
Use the [Code Explainer](/tool/code-explainer) or general AI assistants to have complex topics explained in simple terms.

### 5. Citation Management
AI tools can help format citations correctly in APA, MLA, or Chicago style.

### 6. Language Learning
Practice new languages with AI conversation partners.

### 7. Time Management
AI scheduling tools can optimize your study plan.
    `
  },
  { 
    id: 4, 
    slug: "ai-for-developers",
    icon: HiCode, 
    title: "AI for Developers", 
    desc: "Best practices for using AI code explainers and debuggers.", 
    steps: "4 Steps",
    content: `
## AI-Assisted Development
AI isn't replacing developers; it's making them super-productive.

### 1. Code Explanation
Encountered a cryptic regex or a complex function? Use the [Code Explainer](/tool/code-explainer) to understand it instantly.

### 2. Debugging
Paste error logs into an AI tool to get suggestions on potential fixes.

### 3. Boilerplate Generation
Generate standard code structures (HTML skeletons, API endpoints) to save typing time.

### 4. Documentation
Automatically generate comments and documentation for your codebase.
    `
  },
  { 
    id: 5, 
    slug: "ai-for-writers",
    icon: HiPencilAlt, 
    title: "AI for Writers", 
    desc: "Overcoming writer's block with idea generators.", 
    steps: "6 Steps",
    content: `
## The Writer's New Best Friend
From bloggers to novelists, writers are using AI to overcome block and polish their prose.

### 1. Idea Generation
Never run out of topics with the [Blog Idea Generator](/tool/blog-ideas).

### 2. Outlining
Ask AI to create a structure for your article or chapter.

### 3. Rewriting and Polishing
Use the [Paraphraser Tool](/tool/paraphraser) to find better ways to express awkward sentences.

### 4. Character Development
Brainstorm character names and backstories.

### 5. Editing
Use the [Grammar Checker](/tool/grammar-check) as a first line of defense against typos.

### 6. SEO Optimization
Use the [Meta Description Generator](/tool/meta-description) to make your content discoverable.
    `
  },
  { 
    id: 6, 
    slug: "ai-for-marketing",
    icon: HiTrendingUp, 
    title: "AI for Marketing", 
    desc: "Creating viral social media posts at scale.", 
    steps: "8 Steps",
    content: `
## Scaling Marketing Efforts with AI
Marketing requires a constant stream of fresh content. AI automates the heavy lifting.

### 1. Social Media Posts
Generate captions for Instagram, LinkedIn, and Twitter using the [Social Post Generator](/tool/social-post).

### 2. Ad Copy Variations
Create dozens of ad headlines to test which one performs best.

### 3. Email Subject Lines
Boost open rates with catchy subjects from the [Email Subject Generator](/tool/email-generator).

### 4. Content Calendar
Ask AI to plan a month's worth of content topics.

### 5. Hashtag Research
Find trending tags with the [Hashtag Generator](/tool/hashtag-generator).

### 6. SEO Content
Generate blog post drafts optimized for specific keywords.

### 7. Video Scripts
Write scripts for YouTube or TikTok in minutes.

### 8. Competitor Analysis
Analyze competitor content to find gaps in the market.
    `
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find(g => g.slug === slug);
}

