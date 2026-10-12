
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoDbUrl = process.env.BAZAR_DOR_DB_URL;

if (!mongoDbUrl) {
  throw new Error("BAZAR_DOR_DB_URL is not defined");
}

const client = new MongoClient(mongoDbUrl);
const db = client.db('bazar-dor-client');

export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
 
  database: mongodbAdapter(db, {
    client,
  }),
});