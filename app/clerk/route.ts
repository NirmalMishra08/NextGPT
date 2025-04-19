// import { Webhook } from 'svix'

// import connectDb from '@/config/db'
// import User from '@/models/User'
// import { headers } from 'next/headers';

// import { NextRequest, NextResponse } from 'next/server';


// export async function POST(req:NextRequest) {
//     const wh = new Webhook(process.env.SIGNING_SECRET as string);
//     const headerPayload = await headers();
//     const svixHeaders = {
//         "svix-id": headerPayload.get("svix-id"),
//         "svix-signature": headerPayload.get("svix-signature"),

//     }

//     const payload = await req.json();
//     const body = JSON.stringify(payload);



//     const { data, type } = wh.verify(payload.toString(), svixHeaders);

//     const userData = {
//         _id: data._id,
//         email: data.email_addresses[0].email_address,
//         name: `${data.first_name} ${data.last_name} `,
//         image: data.image_url

//     }


//     await connectDb();

//     switch (type) {
//         case 'user-created':
//             await User.create(userData)
//             break;
//         case 'user-updated':
//             await User.findByIdAndUpdate(data.id, userData)
//             break;
//         case 'user-deleted':
//             await User.findByIdAndDelete(data.id)
//             break;
//         default:
//     }


//     return NextResponse.json({ message: "Event received successfully" })




// }


import connectDb from "@/config/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface ClerkWebhookPayload {
  type: 'user-created' | 'user-updated' | 'user-deleted';
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as ClerkWebhookPayload;
    const { type, data } = payload;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || "Anonymous",
      image: data.image_url || ""
    };

    await connectDb();

    switch (type) {
      case 'user-created':
        await User.create(userData);
        break;
      case 'user-updated':
        await User.findByIdAndUpdate(data.id, userData);
        break;
      case 'user-deleted':
        await User.findByIdAndDelete(data.id);
        break;
      default:
        return NextResponse.json({ message: 'Unhandled event type' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Event received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Invalid request payload' },
      { status: 400 }
    );
  }
}
