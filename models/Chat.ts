import mongoose from "mongoose";

const chat = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    title: {
        type: String,
        default: "New Chat",

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.models.Chat || mongoose.model('Chat', chat);

export default Chat;