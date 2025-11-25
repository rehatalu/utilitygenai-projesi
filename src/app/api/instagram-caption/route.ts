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
      : 'a generic Instagram post';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Instagram copywriter. Generate 3 engaging Instagram captions with relevant emojis. Each caption should be engaging, authentic, and include appropriate emojis. Respond with JSON in the format {"captions":["Caption 1...","Caption 2...","Caption 3..."]}. Do not include any additional text.',
        },
        { role: 'user', content: `Generate Instagram captions for: ${topic}` },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let captions: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        captions = parsed;
      } else if (Array.isArray(parsed?.captions)) {
        captions = parsed.captions;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!captions.length) {
      captions = content
        .split('\n\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .slice(0, 3);
    }

    if (!captions.length) {
      captions = ['We could not generate Instagram captions at this time.'];
    }

    return NextResponse.json({ captions });
  } catch (error) {
    console.error('Instagram caption generation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to generate captions' }, { status: 500 });
  }
}


