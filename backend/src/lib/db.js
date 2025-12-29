import mongoose from "mongoose";
import { ENV } from "../lib/env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URL } = ENV; 

    if (!MONGO_URL) {
      throw new Error("MONGO_URI is not set properly");
    }

    const connection = await mongoose.connect(MONGO_URL);

    console.log(
      "MongoDB Connected:",
      connection.connection.host
    );
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};
