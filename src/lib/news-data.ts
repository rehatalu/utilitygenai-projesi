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
  },
  {
    id: 4,
    slug: "google-gemini-update",
    date: "Nov 21, 2025",
    category: "Industry",
    title: "Google Gemini Ultra 1.5 Released",
    excerpt: "Google's answer to GPT-5 is here. Gemini Ultra 1.5 boasts a 10 million token context window, allowing it to process entire codebases or hours of video.",
    readTime: "4 min read",
    content: `
## Google Strikes Back with Gemini Ultra 1.5

The AI arms race continues. Google has just released Gemini Ultra 1.5, and the specs are mind-blowing.

### Infinite Context?
The most headline-worthy feature is the **10 Million Token Context Window**.
*   **What this means:** You can upload an entire series of books, a full movie, or a massive codebase, and ask questions about specific details.
*   **Recall:** It has near-perfect recall, finding a "needle in a haystack" with 99.9% accuracy.

### Performance
Benchmarks show it outperforming GPT-4 Turbo on math and coding tasks. It is also natively multimodal, meaning it understands video as natively as it understands text.
    `
  },
  {
    id: 5,
    slug: "apple-ai-siri",
    date: "Nov 20, 2025",
    category: "Consumer",
    title: "Apple Integrates Generative AI into Siri",
    excerpt: "The new iOS update finally gives Siri a brain. On-device processing ensures privacy while offering GPT-like conversational abilities.",
    readTime: "3 min read",
    content: `
## Siri Finally Gets Smart

After years of stagnation, Apple has unveiled "Apple Intelligence" in the latest iOS update, giving Siri a massive overhaul.

### On-Device Privacy
Unlike ChatGPT, which sends data to the cloud, Apple's model runs locally on your iPhone's neural engine.
*   **Benefit:** Your data never leaves your device.
*   **Speed:** Responses are instant, even without internet.

### Capabilities
Siri can now summarize your emails, generate images in Messages, and understand complex, multi-part requests like "Show me photos from my trip to Tokyo and email the best ones to Mom."
    `
  }
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((n) => n.slug === slug);
}
