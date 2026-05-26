import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    const MONGO_URL = process.env.MONGO_URI;
    if (!MONGO_URL) throw new Error("MONGO_URI is missing");

    await mongoose.connect(MONGO_URL);
    console.log("✅MongoDB has connected successfully");

    // SyncIndexes Later
  } catch (err) {
    console.log("❌Failed to connect mongoDB", err);
    process.exit(1);
  }
}
