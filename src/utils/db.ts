import { MongoClient } from "mongodb";

export async function connectToDB() {
  const uri = process.env.DB_CONN_STRING || "";
  const client = new MongoClient(uri);
  await client.connect();

  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  return client;
}
