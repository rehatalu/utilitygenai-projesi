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
      : 'a generic product launch';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert copywriter specializing in catchy email subject lines. Generate exactly 5 short subject lines. Respond with JSON in the format {"subjects":["Subject 1","Subject 2","Subject 3","Subject 4","Subject 5"]}. Do not include any additional text.',
        },
        { role: 'user', content: `The topic is: ${topic}` },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let subjects: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        subjects = parsed;
      } else if (Array.isArray(parsed?.subjects)) {
        subjects = parsed.subjects;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!subjects.length) {
      subjects = content
        .split('\n')
        .map((line) => line.trim().replace(/^\d+\.\s*/, ''))
        .filter((line) => line.length > 0)
        .slice(0, 5);
    }

    if (!subjects.length) {
      subjects = ['We could not generate subject lines at this time.'];
    }

    return NextResponse.json({ subjects });
  } catch (error) {
    console.error('Email subject generation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to generate subjects' }, { status: 500 });
  }
}


