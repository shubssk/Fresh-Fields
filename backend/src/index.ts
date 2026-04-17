import dotenv from "dotenv";
import { connectDb } from "./db";
import { startServer } from "./server";
dotenv.config();

async function main() {
  // connect to the db
  await connectDb();

  // then start the server
  startServer();
}

void main();
