import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDb from "@/config/db";
import Chat from "@/models/Chat";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
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
        return NextResponse.json({ success:false, message: `Error occurred while ${((error) as Error).message}` })

    }
} 