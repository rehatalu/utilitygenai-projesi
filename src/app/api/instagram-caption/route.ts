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
        : "a generic Instagram photo";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an Instagram growth expert. Generate 5 engaging, catchy, and viral Instagram captions based on the user\'s photo description. Include relevant emojis. Respond with JSON in the format {"captions":["Caption 1... 📸", "Caption 2... ✨", ...]}. Do not include any additional text.',
        },
        {
          role: "user",
          content: `Photo Description: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    let captions: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        captions = parsed;
      } else if (Array.isArray(parsed?.captions)) {
        captions = parsed.captions;
      }
    } catch (jsonError) {
      console.error("OpenAI Instagram caption generator JSON parse error:", jsonError);
    }

    if (!captions.length) {
      captions = content
        .split("\n")
        .map((line) => line.trim().replace(/^\d+\.\s*/, ""))
        .filter((line) => line.length > 0)
        .slice(0, 5);
    }

    if (!captions.length) {
      captions = ["Beautiful moment captured! 📸✨", "Living my best life! 💫", "Grateful for this day! 🙏"];
    }

    return NextResponse.json({ captions });
  } catch (error) {
    console.error("Instagram caption generation error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to generate Instagram captions" }, { status: 500 });
  }
}


