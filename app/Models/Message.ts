import { timeStamp } from "console";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const messageSchema = new mongoose.Schema({
    Email: { type: String, required:true },
    content:{type:String ,required:true},
    sender:{type:String , enum:['user',"bot"],required:true},
    topic:{type:String , default:"general"},
    timestamp:{type:Date,default:Date.now()}

})

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
