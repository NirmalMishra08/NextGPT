import { authOptions } from "@/app/api/auth/[...nextauth]/auth.config";
import connectDb from "@/config/db";
import Chat from "@/models/Chat";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        console.log(session)
        const userId = session?.user?.id;

        if (!userId) {
            return NextResponse.json({ message: "User not authenticated", success: false }, { status: 401 });

        }

        await connectDb();



        const data = await Chat.find({
            userId,  // Use the converted ObjectId
        });

        return NextResponse.json({ success: true, data }, { status: 200 })

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: `Error occurred: ${errorMessage}` });
    }
} 