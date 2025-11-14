import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: 'API configuration error.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const topic = body.topic || 'A user asked for help.';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: "You are UGA, the friendly and helpful AI mascot for UtilityGenAI.com. Your goal is to assist users, answer their questions about the 13 AI tools (like Email Generator, Paraphraser, Code Explainer, etc.), and be cheerful. Keep your answers concise and helpful. Respond with JSON in the format {\"response\": \"Your friendly answer here...\"}."
        },
        {
          role: "user",
          content: `User's question: ${topic}`
        }
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content ?? '';
    
    // Güvenli JSON parse
    try {
        const parsed = JSON.parse(content);
        return NextResponse.json({ response: parsed.response || "Sorry, I'm not sure how to respond to that." });
    } catch (e) {
        return NextResponse.json({ response: content }); // JSON değilse bile metni döndür
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}

