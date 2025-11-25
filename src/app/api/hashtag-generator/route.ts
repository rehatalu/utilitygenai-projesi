import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.UTILITY_AI_KEY;
const openai = new OpenAI({ apiKey });

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: 'API configuration error.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const topic = typeof body.topic === 'string' && body.topic.trim().length > 0
      ? body.topic
      : 'general content';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert social media strategist. Generate 10 trending hashtags (without # symbol) for Instagram, TikTok, and Twitter. Respond with JSON in the format {"hashtags":["hashtag1","hashtag2",...]}. Do not include any additional text.',
        },
        { role: 'user', content: `Generate hashtags for: ${topic}` },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let hashtags: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        hashtags = parsed;
      } else if (Array.isArray(parsed?.hashtags)) {
        hashtags = parsed.hashtags;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!hashtags.length) {
      hashtags = content
        .split('\n')
        .map((line) => line.trim().replace(/^#?\s*/, '').replace(/^\d+\.\s*/, ''))
        .filter((line) => line.length > 0)
        .slice(0, 10);
    }

    if (!hashtags.length) {
      hashtags = ['We could not generate hashtags at this time.'];
    }

    return NextResponse.json({ hashtags });
  } catch (error) {
    console.error('Hashtag generation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to generate hashtags' }, { status: 500 });
  }
}


