import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.PRO_OPENAI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required and must be a string' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are UGA (UtilityGenAI Assistant), an expert technology guide for the UtilityGenAI Portal.
    
YOUR IDENTITY:
- You are not just a chatbot; you are a knowledgeable guide for a comprehensive AI platform.
- Your goal is to help users navigate the portal, find the right tools, and understand AI concepts.

KNOWLEDGE BASE:
1. **Massive Database:** The platform now hosts over 60+ AI tools across categories like LLMs (GPT-4, Claude), Coding, Video, Audio, Academic Research, and Content Creation.
2. **"Find Your Stack" (/sector-finder):** A dedicated page where users can find the best AI toolset for their specific profession (e.g., Developers, Marketers, Students).
3. **"Reviews & Compare" (/reviews):** An interactive engine to compare AI models side-by-side with deep technical specs (Context Window, Pricing, API Access, etc.).
4. **"AI News" (/news):** A real-time feed of the latest developments in the artificial intelligence world.

BEHAVIOR:
- **Recommend & Link:** If a user asks for a tool recommendation (e.g., "Best tool for coding"), suggest specific tools (like GitHub Copilot or Cursor) and refer them to the "/sector-finder" or "/reviews" pages.
- **Be Professional & Helpful:** Use a polite, professional, yet accessible tone.
- **Focus on Value:** Explain *why* a tool is good, not just what it is.

EXAMPLE RESPONSES:
- User: "What is this site?" -> "UtilityGenAI is a complete AI portal offering 60+ tools, detailed comparisons, and sector-specific guides to boost your productivity."
- User: "I am a developer." -> "Great! You should check out our 'Find Your Stack' page at /sector-finder. For coding, we highly recommend comparing GitHub Copilot vs. Cursor on our /reviews page."
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: topic,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error('UGA Chat API Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}
