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
        : "a generic product";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert E-commerce copywriter. You write persuasive and concise product descriptions. The user will provide a product name and/or key features. Generate 3 unique product descriptions. Respond with JSON in the format {"descriptions":["Description 1...","Description 2...","Description 3..."]}. Do not include any additional text.',
        },
        {
          role: "user",
          content: `Product Name/Features: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    let descriptions: string[] = [];

    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        descriptions = parsed;
      } else if (Array.isArray(parsed?.descriptions)) {
        descriptions = parsed.descriptions;
      }
    } catch (jsonError) {
      console.error("OpenAI product description JSON parse error:", jsonError);
    }

    if (!descriptions.length) {
      descriptions = content
        .split("\n")
        .map((line) => line.trim().replace(/^\d+\.\s*/, ""))
        .filter((line) => line.length > 0)
        .slice(0, 3);
    }

    if (!descriptions.length) {
      descriptions = ["We could not generate product descriptions at this time."];
    }

    return NextResponse.json({ descriptions });
  } catch (error) {
    console.error("Product description generation error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to generate product descriptions" }, { status: 500 });
  }
}

