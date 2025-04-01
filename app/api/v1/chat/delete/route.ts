import Chat from "@/models/Chat";
import connectDb from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        console.log(session)
        const userId = session?.user?.id;
        const { chatId } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: "User not authenticated", success: false }, { status: 401 });

        }

        await connectDb();
        const chatData = await Chat.deleteOne({ userId, _id: chatId });
        return NextResponse.json({ success: true, message:"Chat deleted successfully"}, { status: 200 });


    } catch (error) {
        return NextResponse.json({ success: false, error: ((error) as Error).message });

    }
}