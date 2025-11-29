export const newsItems = [
  {
    id: 1,
    slug: "openai-gpt-5-beta",
    date: "Nov 25, 2025",
    category: "Industry",
    title: "OpenAI Announces GPT-5 Beta Waitlist",
    excerpt: "The highly anticipated model promises faster reasoning and multimodal capabilities. Here is what we know so far about the release date and features.",
    readTime: "3 min read",
    content: `
## GPT-5 is Coming

OpenAI has officially opened the waitlist for its next-generation model, GPT-5. Rumors suggest a massive leap in reasoning capabilities and a "memory" feature that persists across all chats indefinitely.

### Key Features Expected
1. **True Multimodality:** Native understanding of audio, video, and text.
2. **Agentic Behavior:** The ability to perform multi-step tasks (e.g., "Plan a trip and book the flights") without constant user input.
3. **Reduced Hallucinations:** A reported 50% reduction in factual errors compared to GPT-4.

Stay tuned as we get access to the beta.
    `
  },
  {
    id: 2,
    slug: "midjourney-v7-release",
    date: "Nov 24, 2025",
    category: "Tools",
    title: "Midjourney v7: Photorealism Reimagined",
    excerpt: "The latest update brings stunning lighting effects and better text rendering. Designers are calling it a game changer for stock photography.",
    readTime: "2 min read",
    content: `
## Midjourney v7 is Here

The new update focuses heavily on "Text Rendering". Previously, AI struggled to write words on signs or t-shirts. v7 solves this.

### What's New?
* **Perfect Text:** You can now generate a logo with specific text, and it will be spelled correctly.
* **Lighting Engine:** A new ray-tracing inspired lighting model makes skin tones look 100% real.
* **Web Interface:** Finally, Midjourney is moving away from Discord with a standalone web app.
    `
  },
  {
    id: 3,
    slug: "eu-ai-act-update",
    date: "Nov 22, 2025",
    category: "Regulation",
    title: "EU AI Act: What It Means for Developers",
    excerpt: "New regulations are coming into effect next month. Find out how compliance will affect your AI applications and data privacy strategies.",
    readTime: "5 min read",
    content: `
## The EU AI Act: A Developer's Brief

The European Union has finalized its landmark AI legislation. For developers building AI wrappers or fine-tuning models, compliance is now mandatory.

### High-Risk Categories
Apps used in healthcare, education, or employment screening are now classified as "High Risk" and require rigorous transparency reports.

### What You Need to Do
* **Disclosure:** You must clearly label AI-generated content.
* **Copyright:** You must disclose if your model was trained on copyrighted data.
* **Transparency:** Users must know they are talking to a bot.
    `
  }
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((n) => n.slug === slug);
}
