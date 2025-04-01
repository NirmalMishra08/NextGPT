import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDb from "@/config/db";
import Chat from "@/models/Chat";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        console.log(session)
        const userId = session?.user?.id;
        if (!userId) {
            return NextResponse.json({ message: "User not authenticated", success: false }, { status: 401 });

        }
        //Prepare chat data to be saved in the database
        const chatData = {
            userId,
            message: [],
            name: "New Chat"
        };
        await connectDb();

        await Chat.create(chatData);

        return NextResponse.json({ success:true,message:"Chat created"  })

    } catch (error) {
        return NextResponse.json({ message: `Error occurred while ${((error) as Error).message}` })
    }
}