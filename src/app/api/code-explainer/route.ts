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
    const code = typeof body.topic === 'string' && body.topic.trim().length > 0
      ? body.topic
      : '// Please provide code to explain';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert programming instructor. Explain the provided code in simple, clear terms. Break down what the code does, how it works, and any key concepts. Respond with JSON in the format {"explanation":"Your detailed explanation here..."}. Do not include any additional text.',
        },
        { role: 'user', content: `Explain this code:\n${code}` },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let explanation = '';

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === 'string') {
        explanation = parsed;
      } else if (typeof parsed?.explanation === 'string') {
        explanation = parsed.explanation;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!explanation) {
      explanation = content.trim();
    }

    if (!explanation) {
      explanation = 'We could not explain the code at this time.';
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error('Code explanation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to explain code' }, { status: 500 });
  }
}

