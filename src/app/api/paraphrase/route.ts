import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
});

export async function POST(req: NextRequest) {
  if (!apiKey) {
    console.error("Missing OPENAI_API_KEY environment variable.");
    return NextResponse.json({ error: "API configuration error." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const originalText =
      typeof body.topic === "string" && body.topic.trim().length > 0 ? body.topic : "Please provide the text to paraphrase.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert editor specializing in paraphrasing text. Respond with JSON in the format {"paraphrasedText": "Your new text here"}. Do not include any additional text.',
        },
        {
          role: "user",
          content: `Paraphrase this text: ${originalText}`,
        },
      ],
      temperature: 0.6,
      max_tokens: 256,
    });

    const content = completion.choices[0]?.message?.content ?? "";
    let paraphrasedText = "";

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === "string") {
        paraphrasedText = parsed;
      } else if (typeof parsed?.paraphrasedText === "string") {
        paraphrasedText = parsed.paraphrasedText;
      }
    } catch (jsonError) {
      console.error("OpenAI paraphrase JSON parse error:", jsonError);
    }

    if (!paraphrasedText) {
      paraphrasedText = content.trim();
    }

    if (!paraphrasedText) {
      paraphrasedText = "We could not paraphrase the text at this time.";
    }

    return NextResponse.json({ paraphrasedText });
  } catch (error) {
    console.error("Paraphrasing error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to paraphrase text" }, { status: 500 });
  }
}

