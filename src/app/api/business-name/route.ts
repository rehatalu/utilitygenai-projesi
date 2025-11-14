import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: 'API configuration error.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const topic = typeof body.topic === 'string' && body.topic.trim().length > 0
      ? body.topic
      : 'a new business';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert brand naming consultant. Generate 10 unique and catchy business names. Respond with JSON in the format {"names":["Name 1","Name 2",...]}. Do not include any additional text.',
        },
        { role: 'user', content: `Generate business names for: ${topic}` },
      ],
      temperature: 0.9,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let names: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        names = parsed;
      } else if (Array.isArray(parsed?.names)) {
        names = parsed.names;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!names.length) {
      names = content
        .split('\n')
        .map((line) => line.trim().replace(/^\d+\.\s*/, ''))
        .filter((line) => line.length > 0)
        .slice(0, 10);
    }

    if (!names.length) {
      names = ['We could not generate business names at this time.'];
    }

    return NextResponse.json({ names });
  } catch (error) {
    console.error('Business name generation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to generate business names' }, { status: 500 });
  }
}

