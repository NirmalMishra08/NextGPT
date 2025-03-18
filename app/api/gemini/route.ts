import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const botReply = result.response.text();

    return NextResponse.json({ text: botReply }, { status: 200 });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
