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
        : "a generic social media post";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are a social media growth expert. Generate 15 trending and relevant hashtags for the given topic. Mix high-volume and niche hashtags. Respond with JSON in the format {"hashtags":["#tag1","#tag2","#tag3", ...]}. Do not include any additional text.',
        },
        {
          role: "user",
          content: `Topic/Post Content: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    let hashtags: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        hashtags = parsed;
      } else if (Array.isArray(parsed?.hashtags)) {
        hashtags = parsed.hashtags;
      }
    } catch (jsonError) {
      console.error("OpenAI hashtag generator JSON parse error:", jsonError);
    }

    if (!hashtags.length) {
      hashtags = content
        .split("\n")
        .map((line) => line.trim().replace(/^\d+\.\s*/, "").replace(/^#/, "#"))
        .filter((line) => line.startsWith("#") && line.length > 1)
        .slice(0, 15);
    }

    if (!hashtags.length) {
      hashtags = ["#socialmedia", "#trending", "#viral"];
    }

    return NextResponse.json({ hashtags });
  } catch (error) {
    console.error("Hashtag generation error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to generate hashtags" }, { status: 500 });
  }
}


