import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

export async function POST(req: NextRequest) {
  if (!apiKey) {
    console.error('Missing OPENAI_API_KEY environment variable.');
    return NextResponse.json({ error: 'API configuration error.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const topic =
      typeof body.topic === 'string' && body.topic.trim().length > 0
        ? body.topic
        : 'Hello';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are UGA, the friendly and helpful AI mascot for UtilityGenAI.com. Your goal is to assist users, answer their questions about the 13 AI tools (like Email Generator, Paraphraser, Code Explainer, etc.), and be cheerful. Keep your answers concise and helpful. Respond with JSON in the format {"response": "Your friendly answer here..."}.',
        },
        {
          role: 'user',
          content: `User's question: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const content = completion.choices[0]?.message?.content ?? '';

    let response = '';

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed?.response === 'string') {
        response = parsed.response;
      } else if (typeof parsed === 'string') {
        response = parsed;
      }
    } catch (jsonError) {
      console.error('OpenAI JSON parse error:', jsonError);
      // Fallback: use content directly if JSON parsing fails
      response = content.replace(/^{"response":\s*"|"}$/g, '').trim();
    }

    if (!response) {
      response = content.trim() || "I'm here to help! Ask me about our tools.";
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('UGA chat error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to get response from UGA' }, { status: 500 });
  }
}

