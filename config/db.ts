import mongoose from "mongoose"

export default async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error instanceof Error ? error.message : error);
        throw error;
    }
}