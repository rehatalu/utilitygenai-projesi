export const reviews = [
  {
    id: 1,
    slug: "chatgpt-vs-claude-3-5",
    title: "ChatGPT vs. Claude 3.5",
    subtitle: "Which is better for coding?",
    verdict: "Winner: Claude 3.5 for Code",
    color: "from-orange-500 to-red-500",
    desc: "We tested both models on Python, React, and SQL tasks. While ChatGPT is faster, Claude provided more accurate and context-aware code snippets.",
    content: `
## ChatGPT-4o vs. Claude 3.5 Sonnet: The Ultimate Showdown

As of late 2025, the battle for the best AI coding assistant is hotter than ever. We put both models through a rigorous test.

### 1. Coding Capabilities
* **ChatGPT:** Excellent at boilerplate code and quick scripts. It's fast and integrates well with many IDEs.
* **Claude 3.5:** Shines in complex reasoning. It understands "context" much better. If you paste a 500-line file, Claude is less likely to hallucinate than ChatGPT.

### 2. Writing Style
Claude tends to sound more natural and "human-like" out of the box. ChatGPT often requires more prompting to shed its robotic tone.

### Verdict
For daily tasks, ChatGPT is a workhorse. But for **developers and complex problem solving**, Claude 3.5 takes the crown this year.
    `
  },
  {
    id: 2,
    slug: "jasper-vs-copy-ai",
    title: "Jasper vs. Copy.ai",
    subtitle: "Best for Marketing Copy?",
    verdict: "Winner: Jasper for Enterprise",
    color: "from-blue-500 to-indigo-500",
    desc: "If you are a solo founder, Copy.ai offers great value. However, for large marketing teams needing brand voice consistency, Jasper takes the lead.",
    content: `
## Marketing Giants: Jasper vs. Copy.ai

Both tools are built on top of GPT models, but their workflow is what sets them apart.

### Jasper
Jasper is built for **Teams**. Its "Brand Voice" feature is unmatched. You can upload your company's style guide, and Jasper will adhere to it strictly.
* **Best for:** Agencies, Enterprise Marketing Teams.

### Copy.ai
Copy.ai is the tool for **Speed**. It's perfect for solopreneurs who need a quick Instagram caption or a blog intro. It's less rigid and more creative.
* **Best for:** Freelancers, Social Media Managers.
    `
  },
  {
    id: 3,
    slug: "midjourney-vs-dalle-3",
    title: "Midjourney vs. DALL-E 3",
    subtitle: "The Battle of Image Gens",
    verdict: "Winner: Midjourney for Quality",
    color: "from-purple-500 to-pink-500",
    desc: "DALL-E 3 wins on ease of use and prompt adherence, but Midjourney v6 still holds the crown for photorealism and artistic texture.",
    content: `
## Visual Supremacy: Midjourney vs. DALL-E 3

### DALL-E 3 (via ChatGPT)
* **Pros:** Extremely easy to use. It understands conversational prompts perfectly. "Draw a cat on a skateboard" yields exactly that.
* **Cons:** Images can sometimes look "plasticky" or overly digital.

### Midjourney v6
* **Pros:** Stunning, artistic, and photorealistic results. The lighting and texture are superior.
* **Cons:** Requires Discord (clunky interface) and complex parameter tuning (--v 6.0 --ar 16:9 etc.).

### Winner?
If you want **Art**, go with Midjourney. If you want **Speed/Ease**, go with DALL-E 3.
    `
  }
];

export function getReviewBySlug(slug: string) {
  return reviews.find((r) => r.slug === slug);
}
