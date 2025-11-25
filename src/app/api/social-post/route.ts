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
      : 'a generic topic';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert social media copywriter. Generate 3 engaging social media posts (suitable for Twitter/X and LinkedIn). Each post should be concise, engaging, and include relevant hashtags. Respond with JSON in the format {"posts":["Post 1...","Post 2...","Post 3..."]}. Do not include any additional text.',
        },
        { role: 'user', content: `The topic is: ${topic}` },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let posts: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        posts = parsed;
      } else if (Array.isArray(parsed?.posts)) {
        posts = parsed.posts;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!posts.length) {
      posts = content
        .split('\n\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .slice(0, 3);
    }

    if (!posts.length) {
      posts = ['We could not generate social media posts at this time.'];
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Social post generation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to generate posts' }, { status: 500 });
  }
}


