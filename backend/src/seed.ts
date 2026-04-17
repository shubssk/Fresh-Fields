import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Logger } from "./Logger";
import { ApiClient } from "./client";
import { randomProduct, randomUser } from "./faker";
import { UserRole } from "./types";
import { NewProduct } from "./model/ProductModel";

dotenv.config();

const products: NewProduct[] = [
  {
    description: "Premium quality rice sourced from the finest farms.",
    imageUrl:
      "https://tiimg.tistatic.com/fp/1/007/609/delicious-aromatic-and-healthy-fresh-basmati-rice-bag-10kg-748.jpg",
    price: 24999,
    name: "Organic Basmati Rice",
    quantity: 50,
    units: "kg",
  },
  {
    description: "Freshly picked apples with a sweet and crisp flavor.",
    imageUrl:
      "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Adocortland_apples-as225320764.jpeg",
    price: 799,
    name: "Red Apple",
    quantity: 100,
    units: "kg",
  },
  // keep remaining products same...
];

async function connectDB() {
  const url = process.env.MONGODB_URL;
  if (!url) {
    throw new Error("MONGODB_URL not set in .env");
  }

  await mongoose.connect(url);
  console.log("✅ DB Connected");
}

async function clearDb() {
  const logger = new Logger("clearDb");

  try {
    // ✅ Ensure DB exists before using it
    if (!mongoose.connection.db) {
      throw new Error("Database not connected");
    }

    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();

    for (const collection of collections) {
      await db.collection(collection.name).deleteMany({});
      logger.info(`Cleared collection: ${collection.name}`);
    }

    logger.info("Database cleared successfully");
  } catch (e) {
    logger.error(e);
  }
}

async function main() {
  const logger = new Logger("seed");

  try {
    await connectDB(); // ✅ connect FIRST

    const axiosClient = axios.create({
      baseURL: "http://localhost:3024/api",
    });

    const client = new ApiClient(axiosClient);

    await clearDb();

    // ✅ Create seller
    const randomSeller = randomUser({
      email: "jack@seller.com",
      password: "Password123",
      role: UserRole.seller,
    });

    await client.signup(randomSeller);

    const loginResponse = await client.login({
      email: randomSeller.email,
      password: randomSeller.password,
    });

    logger.info("Created seller", loginResponse.data.data);

    // ✅ Create products
    for (const product of products) {
      await client.createProduct(
        product,
        loginResponse.data.data.token
      );
    }

    logger.info(`Created ${products.length} products`);

    // ✅ Create buyer
    const randomBuyer = randomUser({
      email: "jill@buyer.com",
      password: "Password123",
      role: UserRole.buyer,
    });

    await client.signup(randomBuyer);

    logger.info("Created buyer", randomBuyer);
  } catch (e) {
    logger.error(e);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 DB Disconnected");
  }
}

// ✅ Proper execution
main();