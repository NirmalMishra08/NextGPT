
import mongoose from "mongoose";

const chat = new mongoose.Schema({

    name: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    messages:[{
        role:{ type: String, required: true},
        content:{ type: String, required: true},
        timestamp:{ type: Number, required: true},
    }]
   

}, { timestamps: true })

const Chat = mongoose.models.Chat || mongoose.model('Chat', chat);

export default Chat;