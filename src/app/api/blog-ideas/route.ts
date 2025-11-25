import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Çalışan doğru anahtar değişkeni: PRO_OPENAI_KEY
const openai = new OpenAI({
  apiKey: process.env.PRO_OPENAI_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const prompt = `Generate 5 creative and SEO-friendly blog post titles for the topic: "${topic}". 
    Return ONLY the titles as a simple list, not numbered. Ensure each title is on a new line.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative content strategist and SEO expert."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error("No content generated");
    }

    // Frontend expects an array of strings (string[]), so we split the content.
    const ideas = content.split('\n').filter(line => line.trim() !== '');

    // Çıktıyı (ideas) JSON formatında döndür
    return NextResponse.json({ ideas: ideas });

  } catch (error: any) {
    console.error('Error in blog-ideas API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate blog ideas' },
      { status: 500 }
    );
  }
}

