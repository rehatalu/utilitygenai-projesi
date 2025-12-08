import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// PRO_OPENAI_KEY kullanıyoruz (Çalışan anahtar)
const openai = new OpenAI({
  apiKey: process.env.PRO_OPENAI_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // MODEL DEĞİŞİKLİĞİ: "gpt-4o-mini" (En ucuz ve hızlı)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: "You are a helpful SEO blog post title generator." },
        { role: "user", content: `Generate 5 catchy blog titles for: "${topic}". Return only the titles.` }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const content = completion.choices[0].message.content;
    return NextResponse.json({ output: content });

  } catch (error: any) {
    console.error('Error in generate-blog API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate' },
      { status: 500 }
    );
  }
}







