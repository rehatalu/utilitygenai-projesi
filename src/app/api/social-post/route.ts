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
      typeof body.topic === "string" && body.topic.trim().length > 0 ? body.topic : "a noteworthy announcement";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert social media manager. You generate viral posts. The user will provide a topic. Generate one short, punchy Tweet (max 280 chars) and one slightly longer, professional LinkedIn post. Respond with JSON in the format {"tweet": "Your tweet here...", "linkedInPost": "Your LinkedIn post here..."}. Do not include any additional text.',
        },
        {
          role: "user",
          content: `The topic is: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 280,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    let tweet = "";
    let linkedInPost = "";

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed?.tweet === "string") {
        tweet = parsed.tweet;
      }
      if (typeof parsed?.linkedInPost === "string") {
        linkedInPost = parsed.linkedInPost;
      }
    } catch (jsonError) {
      console.error("OpenAI social post JSON parse error:", jsonError);
    }

    if (!tweet || !linkedInPost) {
      console.warn("Unexpected OpenAI response format for social posts:", content);
    }

    if (!tweet) {
      tweet = "We could not generate a tweet at this time.";
    }
    if (!linkedInPost) {
      linkedInPost = "We could not generate a LinkedIn post at this time.";
    }

    return NextResponse.json({ tweet, linkedInPost });
  } catch (error) {
    console.error("Social post generation error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to generate social posts" }, { status: 500 });
  }
}

