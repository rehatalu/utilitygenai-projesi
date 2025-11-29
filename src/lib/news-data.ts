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
## GPT-5 is Coming: What We Know So Far

The AI world is buzzing with rumors and official teasers about OpenAI's next frontier model, GPT-5. While an official release date hasn't been set, the opening of a beta waitlist suggests launch is imminent.

### What to Expect
Sam Altman has hinted that the jump from GPT-4 to GPT-5 will be significant.
*   **Reasoning Capabilities:** GPT-5 is expected to solve complex multi-step problems (math, coding, logic) with much higher accuracy.
*   **Personalization:** The model will remember user preferences and context over much longer periods.
*   **Multimodality:** Seamless integration of text, audio, image, and video generation in real-time.

### The "Strawberry" Project
Leaks suggest a new reasoning engine code-named "Strawberry" (formerly Q*) is integrated into GPT-5, allowing it to "think" before it speaks, reducing hallucinations significantly.

### When can we use it?
The beta is currently rolling out to select enterprise partners and Red Team testers. A public release is expected in early 2026.
    `
  },
  {
    id: 2,
    slug: "midjourney-v7-update",
    date: "Nov 24, 2025",
    category: "Tools",
    title: "Midjourney v7: Photorealism Reimagined",
    excerpt: "The latest update brings stunning lighting effects and better text rendering. Designers are calling it a game changer for stock photography.",
    readTime: "2 min read",
    content: `
## Midjourney v7 Takes the Crown

Just when we thought AI images couldn't get any better, Midjourney v7 has dropped.

### Key Features
*   **Perfect Text:** Previous versions struggled with spelling. v7 can render complex typography on signs, logos, and book covers perfectly.
*   **3D Model Consistency:** You can now generate a character and rotate them in 3D space while maintaining their facial features.
*   **Web Interface:** Finally, Midjourney is moving away from Discord! The new standalone web app makes organizing and generating images much faster.

### Impact on Design
Stock photographers are worried. The ability to generate specific, high-resolution, branded imagery in seconds is making traditional stock photo subscriptions obsolete for many agencies.
    `
  },
  {
    id: 3,
    slug: "eu-ai-act-compliance",
    date: "Nov 22, 2025",
    category: "Regulation",
    title: "EU AI Act: What It Means for Developers",
    excerpt: "New regulations are coming into effect next month. Find out how compliance will affect your AI applications and data privacy strategies.",
    readTime: "5 min read",
    content: `
## Navigating the EU AI Act

The European Union has passed the world's first comprehensive AI law. If you are building or deploying AI in Europe, you need to pay attention.

### Risk Categories
The Act classifies AI into tiers:
1.  **Unacceptable Risk:** Social scoring systems, biometric manipulation. (Banned).
2.  **High Risk:** AI in healthcare, recruitment, critical infrastructure. (Strict compliance required).
3.  **General Purpose AI:** LLMs like GPT-4. (Must follow transparency rules).

### What Developers Need to Do
*   **Transparency:** You must clearly label AI-generated content.
*   **Data Governance:** You must document the data used to train your models.
*   **Copyright:** You must respect EU copyright laws.

Failure to comply can result in fines of up to 7% of global turnover. It's time to audit your AI stack.
    `
  },
  {
    id: 4,
    slug: "nvidia-h200-chips",
    date: "Nov 20, 2025",
    category: "Hardware",
    title: "NVIDIA Reveals New H200 AI Chips",
    excerpt: "Benchmarks show a 2x performance increase for LLM inference. This could significantly lower the cost of running AI models.",
    readTime: "4 min read",
    content: `
## NVIDIA Powers the AI Revolution

NVIDIA has unveiled its latest GPU, the H200, designed specifically to power the next generation of Large Language Models.

### Specs that Matter
*   **Memory:** 141GB of HBM3e memory (nearly double the H100).
*   **Bandwidth:** 4.8 TB/s.

### Why This Matters for You
You might not buy these chips, but you will benefit from them.
*   **Cheaper API Costs:** More efficient chips mean it costs OpenAI and Anthropic less to run their models. These savings will eventually trickle down to developers.
*   **Faster Models:** The latency of generating text will drop significantly, making real-time voice AI much smoother.
    `
  }
];

export function getNewsBySlug(slug: string) {
  return newsItems.find(n => n.slug === slug);
}

