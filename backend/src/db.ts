import { connect } from "mongoose";
import { Logger } from "./Logger";

export async function connectDb() {
  const logger = new Logger("connectDb");
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("env MONGODB_URL not set");
    }
    const db = await connect(url);
    logger.info("Connected to DB");
    return db;
  } catch (e) {
    logger.error("DB connection failed");
    logger.error(e);
  }
  return null;
}
