import { AuthOptions, getServerSession } from "next-auth";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        console.log(session)
        // const userId = session.user.id;

        // if (!userId) {
        //     return NextResponse.json({
        //         message: "User not authenticated",
        //         success: false
        //     }, { status: 401 });
        // }
        // const { prompt , chatId } = await req.json();
        // if (!prompt) {
        //     return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        // }

        // await connectDb();

        // const chatData = await Chat.findOne({ userId,_id: chatId})

        // if (!chatData) {
        //     return NextResponse.json({
        //         message: "Chat not found",
        //         success: false
        //     }, { status: 404 });
        // }

        // const userPrompt = {
        //     role: "user",
        //     content: prompt,
        //     timeStamp: Date.now(),
        // };

        // chatData.messages.push(userPrompt);


        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

        const data = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Hello",
        });
        const response = data?.candidates.length
            ? data?.candidates[0].content?.parts?.[0]?.text || "No text found."
            : "No response received.";
        return NextResponse.json({ response: response, session }, { status: 200 });
    } catch (error) {
        console.error("Together AI Error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
