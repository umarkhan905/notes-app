import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";
import { env } from "./env.config.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      dbName: DB_NAME,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
