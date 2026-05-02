import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is required for Better Auth.");
}

const mongoClient =
  globalForMongo.__suncartMongoClient || new MongoClient(mongoUri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.__suncartMongoClient = mongoClient;
}

const db = mongoClient.db(process.env.MONGODB_DB || "suncart");

const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
});
