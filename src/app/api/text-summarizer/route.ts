import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.PRO_OPENAI_KEY;
const openai = new OpenAI({ apiKey });

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: 'API configuration error.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const text = typeof body.topic === 'string' && body.topic.trim().length > 0
      ? body.topic
      : 'Please provide text to summarize.';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content summarizer. Summarize the provided text into concise key points. Keep it brief but comprehensive. Respond with JSON in the format {"summary":"Your summary here..."}. Do not include any additional text.',
        },
        { role: 'user', content: `Summarize this text:\n${text}` },
      ],
      temperature: 0.3,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? '';
    let summary = '';

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === 'string') {
        summary = parsed;
      } else if (typeof parsed?.summary === 'string') {
        summary = parsed.summary;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
    }

    if (!summary) {
      summary = content.trim();
    }

    if (!summary) {
      summary = 'We could not summarize the text at this time.';
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Text summarization error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to summarize text' }, { status: 500 });
  }
}






