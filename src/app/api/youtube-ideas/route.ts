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
      : 'general topics';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert YouTube content strategist. Generate 5 viral video ideas with catchy titles. Respond with JSON in the format {"ideas":["Idea 1","Idea 2","Idea 3","Idea 4","Idea 5"]}. Do not include any additional text.',
        },
        { role: 'user', content: `Generate YouTube video ideas about: ${topic}` },
      ],
      temperature: 0.8,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let ideas: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        ideas = parsed;
      } else if (Array.isArray(parsed?.ideas)) {
        ideas = parsed.ideas;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!ideas.length) {
      ideas = content
        .split('\n')
        .map((line) => line.trim().replace(/^\d+\.\s*/, ''))
        .filter((line) => line.length > 0)
        .slice(0, 5);
    }

    if (!ideas.length) {
      ideas = ['We could not generate YouTube ideas at this time.'];
    }

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('YouTube ideas generation error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to generate YouTube ideas' }, { status: 500 });
  }
}


