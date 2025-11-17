import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are UGA, a helpful AI assistant for UtilityGenAI, a platform with 13 free AI tools:
1. Email Subject Generator
2. Paraphraser Tool
3. Social Post Generator
4. Meta Description Generator
5. Grammar Checker
6. Product Description Generator
7. Blog Post Idea Generator
8. YouTube Video Idea Generator
9. Hashtag Generator
10. Business Name Generator
11. Code Explainer
12. Text Summarizer
13. Instagram Caption Generator

Help users understand and use these tools effectively. Be friendly, concise, and helpful.`,
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
  } catch (error: any) {
    console.error('UGA Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}

