import mongoose from "mongoose";

const message = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.ObjectId,
        ref: "Chat",
        required: true
    },
    role: {
        type: String,
        enum: ["user", "model"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.models.Message || mongoose.model('Message', message);

export default Message;