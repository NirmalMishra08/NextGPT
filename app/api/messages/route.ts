import { getServerSession } from "next-auth";

export async function POST(req){
    const session = await getServerSession
}