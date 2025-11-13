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
    const codeSnippet =
      typeof body.topic === "string" && body.topic.trim().length > 0
        ? body.topic
        : "Please provide the code to explain.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert senior developer and coding instructor. Explain the provided code snippet simply and clearly. Break down what it does step-by-step. Respond with JSON in the format {"explanation": "Your explanation here..."}. Use Markdown formatting in your explanation if needed.',
        },
        {
          role: "user",
          content: `Explain this code:\n\n${codeSnippet}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const content = completion.choices[0]?.message?.content ?? "";
    let explanation = "";

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === "string") {
        explanation = parsed;
      } else if (typeof parsed?.explanation === "string") {
        explanation = parsed.explanation;
      }
    } catch (jsonError) {
      console.error("OpenAI code explainer JSON parse error:", jsonError);
    }

    if (!explanation) {
      explanation = content.trim();
    }

    if (!explanation) {
      explanation = "We could not explain the code at this time.";
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Code explainer error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to explain code" }, { status: 500 });
  }
}


