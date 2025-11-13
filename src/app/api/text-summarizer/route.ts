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
    const textToSummarize =
      typeof body.topic === "string" && body.topic.trim().length > 0
        ? body.topic
        : "Please provide the text to summarize.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are an expert editor and summarizer. Summarize the provided text into a concise, easy-to-understand overview. Use bullet points for key takeaways if appropriate. Respond with JSON in the format {"summary": "Your summary here..."}.',
        },
        {
          role: "user",
          content: `Summarize this text:\n\n${textToSummarize}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const content = completion.choices[0]?.message?.content ?? "";
    let summary = "";

    try {
      const parsed = JSON.parse(content);
      if (typeof parsed === "string") {
        summary = parsed;
      } else if (typeof parsed?.summary === "string") {
        summary = parsed.summary;
      }
    } catch (jsonError) {
      console.error("OpenAI text summarizer JSON parse error:", jsonError);
    }

    if (!summary) {
      summary = content.trim();
    }

    if (!summary) {
      summary = "We could not summarize the text at this time.";
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Text summarizer error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to summarize text" }, { status: 500 });
  }
}

