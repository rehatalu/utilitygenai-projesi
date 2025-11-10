import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const topic = body.topic || 'a generic product launch';

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert copywriter specializing in catchy email subject lines. Generate 5 subject lines. Respond ONLY with a JSON array of strings, like ["Subject 1", "Subject 2"].',
        },
        {
          role: 'user',
          content: `The topic is: ${topic}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;

    let subjects: string[] = ['Failed to parse AI response.'];
    if (content) {
      try {
        subjects = JSON.parse(content);
      } catch (e) {
        console.error('OpenAI JSON parse error:', e);
        subjects = content.split('\n').filter((s) => s.length > 0);
      }
    }

    return NextResponse.json({ subjects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate subjects' }, { status: 500 });
  }
}

