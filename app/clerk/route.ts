import { Webhook } from 'svix'

import connectDb from '@/config/db'
import User from '@/models/User'
import { headers } from 'next/headers';
import { request } from 'http';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req:NextRequest) {
    const wh = new Webhook(process.env.SIGNING_SECRET as string);
    const headerPayload = await headers();
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id"),
        "svix-signature": headerPayload.get("svix-signature"),

    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    //@ts-ignore

    const { data, type } = wh.verify(body, svixHeaders);

    const userData = {
        _id: data._id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name} `,
        image: data.image_url

    }


    await connectDb();

    switch (type) {
        case 'user-created':
            await User.create(userData)
            break;
        case 'user-updated':
            await User.findByIdAndUpdate(data.id, userData)
            break;
        case 'user-deleted':
            await User.findByIdAndDelete(data.id)
            break;
        default:
    }


    return NextResponse.json({ message: "Event received successfully" })


}
