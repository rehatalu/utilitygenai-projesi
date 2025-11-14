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
      typeof body.topic === "string" && body.topic.trim().length > 0
        ? body.topic
        : "Please provide the text to check.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert English editor. Correct all grammar and spelling mistakes in the provided text. Respond with JSON in the format {"correctedText": "Your fully corrected text here..."}. Do not include any additional text or explanations.',
        },
        {
          role: "user",
          content: `Correct this text: ${originalText}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? "";
    let correctedText = "";

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === "string") {
        correctedText = parsed;
      } else if (typeof parsed?.correctedText === "string") {
        correctedText = parsed.correctedText;
      }
    } catch (jsonError) {
      console.error("OpenAI grammar check JSON parse error:", jsonError);
    }

    if (!correctedText) {
      correctedText = content.trim();
    }

    if (!correctedText) {
      correctedText = "We could not check the grammar at this time.";
    }

    return NextResponse.json({ correctedText });
  } catch (error) {
    console.error("Grammar check error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to check grammar" }, { status: 500 });
  }
}



