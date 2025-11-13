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
    const topic =
      typeof body.topic === "string" && body.topic.trim().length > 0
        ? body.topic
        : "a generic topic";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert content strategist. You generate catchy and SEO-friendly blog post titles/ideas. The user will provide a topic or keyword. Generate 5 unique blog post ideas. Respond with JSON in the format {"ideas":["Idea 1...","Idea 2...","Idea 3...","Idea 4...","Idea 5..."]}. Do not include any additional text.',
        },
        {
          role: "user",
          content: `The topic/keyword is: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    let ideas: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        ideas = parsed;
      } else if (Array.isArray(parsed?.ideas)) {
        ideas = parsed.ideas;
      }
    } catch (jsonError) {
      console.error("OpenAI blog ideas JSON parse error:", jsonError);
    }

    if (!ideas.length) {
      ideas = content
        .split("\n")
        .map((line) => line.trim().replace(/^\d+\.\s*/, ""))
        .filter((line) => line.length > 0)
        .slice(0, 5);
    }

    if (!ideas.length) {
      ideas = ["We could not generate blog post ideas at this time."];
    }

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error("Blog ideas generation error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to generate blog post ideas" }, { status: 500 });
  }
}

